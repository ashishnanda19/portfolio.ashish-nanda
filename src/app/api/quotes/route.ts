import { NextResponse } from "next/server";
import axios from "axios";

interface QuoteResponse {
  quote: string;
  author: string;
  work?: string;
  categories: string[];
}

// In-memory cache
let cachedQuote: {
  data: QuoteResponse;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    // Check if we have a valid cached quote
    if (cachedQuote && Date.now() - cachedQuote.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        quote: cachedQuote.data.quote,
        author: cachedQuote.data.author,
        work: cachedQuote.data.work || null,
        categories: cachedQuote.data.categories,
        cached: true,
      });
    }

    // Fetch new quote
    const response = await axios.get<QuoteResponse[]>(
      "https://api.api-ninjas.com/v2/randomquotes",
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY!,
        },
      }
    );

    const quotes: QuoteResponse[] = response.data;

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ error: "No quotes found" }, { status: 404 });
    }

    const selectedQuote = quotes[0];

    // Store in cache
    cachedQuote = {
      data: selectedQuote,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        quote: selectedQuote.quote,
        author: selectedQuote.author,
        work: selectedQuote.work || null,
        categories: selectedQuote.categories,
        cached: false,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error: unknown) {
    const errorData =
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
        ? (error.response as { data: unknown }).data
        : null;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Quote API Error:", errorData || errorMessage);

    // If we have a cached quote and API fails, return the cached one
    if (cachedQuote) {
      return NextResponse.json({
        quote: cachedQuote.data.quote,
        author: cachedQuote.data.author,
        work: cachedQuote.data.work || null,
        categories: cachedQuote.data.categories,
        cached: true,
        stale: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
