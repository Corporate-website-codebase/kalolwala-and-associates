import { NextResponse } from "next/server";
import sql from "@/lib/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Unsubscribe token is required." },
        { status: 400 },
      );
    }

    const result = await sql`
      DELETE FROM blog_subscribers
      WHERE unsubscribe_token = ${token}
      RETURNING email
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Invalid or already used unsubscribe link." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "You have been unsubscribed successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}