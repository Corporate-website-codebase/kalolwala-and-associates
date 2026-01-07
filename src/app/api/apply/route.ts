import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const department = formData.get("department") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !location || !department || !resumeFile) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,         // Your Email
        pass: process.env.GMAIL_APP_PASSWORD, // Your App Password
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER, // From You
      to: process.env.GMAIL_USER,   // <--- CHANGED: To You (Sends to your own inbox)
      subject: `New Job Application: ${department} - ${name}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Department:</strong> ${department}</p>
        <br />
        <p><em>The resume is attached to this email.</em></p>
      `,
      attachments: [
        {
          filename: resumeFile.name,
          content: buffer,
        },
      ],
    });

    return NextResponse.json({ message: "Application sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json({ message: "Failed to send application" }, { status: 500 });
  }
}