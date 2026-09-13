import { NextRequest, NextResponse } from "next/server";

const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

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

    // Get optional query parameters from the request
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const count = searchParams.get("count") || "1"; // Default to 1 random image
    const thumbs = searchParams.get("thumbs");

    // Build the NASA API URL with query parameters
    const params = new URLSearchParams();
    params.append("api_key", apiKey);

    // Use count for random image (cannot be used with date)
    if (date) {
      params.append("date", date);
    } else {
      params.append("count", count);
    }
    if (thumbs) params.append("thumbs", thumbs);

    const response = await fetch(`${NASA_APOD_URL}?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 1 hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("NASA API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Failed to fetch from NASA API", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Cache the response for 1 hour on the client side
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
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
