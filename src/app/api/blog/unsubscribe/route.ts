import { NextResponse } from "next/server";
import sql from "@/lib/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL('/unsubscribe?status=invalid', request.url));
    }

    const result = await sql`
      DELETE FROM blog_subscribers
      WHERE unsubscribe_token = ${token}
      RETURNING email
    `;

    if (result.length === 0) {
      return NextResponse.redirect(new URL('/unsubscribe?status=invalid', request.url));
    }

    return NextResponse.redirect(new URL('/unsubscribe?status=success', request.url));
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.redirect(new URL('/unsubscribe?status=error', request.url));
  }
}