import { NextRequest, NextResponse } from "next/server";

const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";
const NASA_LIBRARY_URL = "https://images-api.nasa.gov/search";
const APOD_TIMEOUT_MS = 6000;

// The APOD service is frequently down or slow, so the NASA Image Library
// (no key, much more reliable) is used as a fallback.
const FALLBACK_QUERIES = ["nebula", "galaxy", "earth from space", "aurora", "mars", "saturn", "supernova"];

interface Apod {
  url?: string;
  hdurl?: string;
  thumbnail_url?: string;
  media_type?: string;
  [key: string]: unknown;
}

// APOD often serves http:// links, which browsers block on an https page
const toHttps = (url?: string) => url?.replace(/^http:\/\//, "https://");

// An APOD is only usable in the card if it resolves to a real picture
const normalize = (apod: Apod): Apod | null => {
  const isVideo = apod.media_type === "video";
  const image = toHttps(isVideo ? apod.thumbnail_url : apod.url);
  if (!image || !/\.(jpe?g|png|webp|gif)(\?|$)/i.test(image)) return null;
  // Skip the generic NASA logo placeholder entries
  if (/nasa-logo/i.test(image)) return null;
  return { ...apod, url: image, hdurl: toHttps(apod.hdurl) };
};

const fetchApod = async (params: Record<string, string>) => {
  const search = new URLSearchParams(params).toString();
  const response = await fetch(`${NASA_APOD_URL}?${search}`, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(APOD_TIMEOUT_MS),
  });
  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    return { ok: false as const, status: response.status, details };
  }
  const data = await response.json();
  return { ok: true as const, data: (Array.isArray(data) ? data : [data]) as Apod[] };
};

const fetchFromLibrary = async (): Promise<Apod | null> => {
  const dayOfYear = Math.floor(Date.now() / 86_400_000);
  const q = FALLBACK_QUERIES[dayOfYear % FALLBACK_QUERIES.length];
  const response = await fetch(
    `${NASA_LIBRARY_URL}?${new URLSearchParams({ q, media_type: "image", page_size: "30" })}`,
    { next: { revalidate: 3600 }, signal: AbortSignal.timeout(APOD_TIMEOUT_MS) }
  );
  if (!response.ok) return null;
  const json = await response.json();
  const items: {
    data: { title: string; description?: string; date_created: string; photographer?: string }[];
    links?: { href: string }[];
  }[] = json?.collection?.items ?? [];
  const item = items.filter((i) => i.links?.[0]?.href)[dayOfYear % Math.max(items.length, 1)] ?? items[0];
  const href = toHttps(item?.links?.[0]?.href);
  if (!item || !href) return null;
  const meta = item.data[0];
  return {
    title: meta.title,
    explanation: meta.description ?? "",
    url: href,
    media_type: "image",
    date: meta.date_created.slice(0, 10),
    copyright: meta.photographer,
  };
};

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NASA_API_KEY;

    if (!apiKey) {
      console.error("NASA_API_KEY is not configured");
      return NextResponse.json(
        { error: "NASA API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    // Prefer a specific/today's APOD, then fall back to a batch of random
    // ones and pick the first that is an actual image.
    const base = { api_key: apiKey, thumbs: "true" };
    const attempts: Record<string, string>[] = date
      ? [{ ...base, date }]
      : [base, { ...base, count: "10" }];

    let lastError: { status: number; details: unknown } | null = null;

    for (const params of attempts) {
      const result = await fetchApod(params).catch((err: unknown) => {
        console.error("NASA APOD request failed:", err instanceof Error ? err.message : err);
        return null;
      });
      if (!result) continue;
      if (!result.ok) {
        console.error("NASA API error:", result.status, result.details);
        lastError = { status: result.status, details: result.details };
        continue;
      }
      const apod = result.data.map(normalize).find(Boolean);
      if (apod) {
        return NextResponse.json(apod, {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
          },
        });
      }
    }

    const fallback = await fetchFromLibrary().catch(() => null);
    if (fallback) {
      return NextResponse.json(fallback, {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
      });
    }

    return NextResponse.json(
      { error: "No NASA image available", details: lastError?.details },
      { status: lastError?.status ?? 502 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("NASA Proxy Error:", errorMessage);

    return NextResponse.json(
      { error: "Failed to fetch from NASA API" },
      { status: 500 }
    );
  }
}
