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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Subscribed!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: system-ui, -apple-system, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <!-- Email Wrapper -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 0px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border: 1px solid #e5e7eb; overflow: hidden;">
          
          <!-- Header - Logo -->
          <tr>
            <td align="center" style="padding-top: 56px; padding-bottom: 24px;">
              <img src="https://www.kalolwala.com/images/kna.png" alt="Kalolwala & Associates" style="height: 64px; width: auto; display: block;" />
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td align="center" style="padding: 24px 48px 8px 48px;">
              
              <!-- Placeholder for uploaded illustration -->
              <img src="" alt="Email Illustration" style="width: 100%; max-width: 400px; height: auto; margin: 0 auto 32px auto; display: block; background-color: #f9fafb; min-height: 200px;" />

              <!-- Exact text -->
              <h1 style="color: #111827; font-size: 30px; font-weight: bold; letter-spacing: -0.025em; margin: 0 0 16px 0;">
                You're Subscribed!
              </h1>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.625; margin: 0 auto 40px auto; max-width: 480px;">
                Thank you for subscribing to K&A updates. You'll now receive our latest blog posts, insights and important updates directly in your inbox.
              </p>

              <!-- Brand yellow button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 32px auto;">
                <tr>
                  <td align="center" bgcolor="#f5c518">
                    <a href="https://www.kalolwala.com/blogs" style="display: inline-block; background-color: #f5c518; color: #000000; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 40px; border-radius: 0px;">
                      Visit our Blog
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #111111; padding: 32px; border-top: 1px solid #6b7280;">
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="https://www.kalolwala.com/" style="color: #9ca3af; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; margin: 0 12px;">Home</a>
                    <a href="https://www.kalolwala.com/about" style="color: #9ca3af; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; margin: 0 12px;">About</a>
                    <a href="https://www.kalolwala.com/services" style="color: #9ca3af; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; margin: 0 12px;">Offerings</a>
                    <a href="https://www.kalolwala.com/contact" style="color: #9ca3af; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; margin: 0 12px;">Contact</a>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <div style="width: 48px; height: 1px; background-color: #1f2937; margin: 0 auto;"></div>
                  </td>
                </tr>
              </table>

              <p style="color: #6b7280; font-size: 12px; font-weight: 300; margin: 0 0 8px 0;">
                &copy; ${new Date().getFullYear()} Kalolwala & Associates. All rights reserved.
              </p>
              <p style="color: #6b7280; font-size: 12px; font-weight: 300; margin: 0;">
                <a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> from these emails.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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