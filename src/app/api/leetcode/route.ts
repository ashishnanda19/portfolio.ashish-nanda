import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      LEETCODE_GRAPHQL_URL,
      body, // Graphql query
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Proxy Error:", errorMessage);

    // Type guard for axios error
    const status =
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "status" in error.response
        ? (error.response as { status: number }).status
        : 500;

    return NextResponse.json(
      { error: "Failed to fetch from LeetCode." },
      { status }
    );
  }
}
