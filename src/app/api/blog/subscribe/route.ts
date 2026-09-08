import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import sql from "@/lib/database";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const unsubscribeToken = randomUUID();

    // Save subscriber
    await sql`
      INSERT INTO blog_subscribers (
        email,
        unsubscribe_token
      )
      VALUES (
        ${normalizedEmail},
        ${unsubscribeToken}
      )
      ON CONFLICT (email)
      DO UPDATE SET
        unsubscribe_token = ${unsubscribeToken}
    `;

    const unsubscribeUrl =
      `https://www.kalolwala.com/api/blog/unsubscribe?token=${unsubscribeToken}`;

    // Notify K&A
    await resend.emails.send({
      from: "Kalolwala Blogs <info@kalolwala.com>",
      to: "info@kalolwala.com",
      subject: "New Blog Subscriber",
      html: `
        <h2>New Blog Subscriber</h2>

        <p>
          A new user has subscribed to the Kalolwala & Associates blog.
        </p>

        <p>
          <strong>Email:</strong> ${normalizedEmail}
        </p>
      `,
    });

    // Send confirmation to subscriber
    await resend.emails.send({
      from: "Kalolwala Blogs <info@kalolwala.com>",
      to: normalizedEmail,
      subject: "You're subscribed to Kalolwala & Associates",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>You're subscribed!</h2>

          <p>
            Thank you for subscribing to Kalolwala & Associates.
          </p>

          <p>
            You'll receive our latest articles, perspectives and
            insights directly in your inbox.
          </p>

          <p>
            — Kalolwala & Associates
          </p>

          <hr />

          <p style="font-size: 12px; color: #666;">
            If you no longer wish to receive emails from us,
            <a href="${unsubscribeUrl}">
              unsubscribe here
            </a>.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: "Successfully subscribed.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscribe error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}