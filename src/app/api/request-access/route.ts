import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, videoTitle } = await req.json();

    // 1. Setup Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 2. Configure Email
    const mailOptions = {
      from: process.env.GMAIL_USER, 
      to: process.env.GMAIL_USER,   
      replyTo: email,            
      subject: `🎥 Video Request: ${name} - ${videoTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px;">
          <h2 style="color: #000;">New Access Request</h2>
          <p><strong>Visitor:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Requested Video:</strong> ${videoTitle}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #666;">Action Required:</h3>
          <p>To approve this request:</p>
          <ol>
            <li>Click <strong>Reply</strong> (it will auto-address ${email})</li>
            <li>Paste the video link or password</li>
            <li>Click Send</li>
          </ol>
        </div>
      `,
    };

    // 3. Send
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Request sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ message: 'Failed to send request' }, { status: 500 });
  }
}