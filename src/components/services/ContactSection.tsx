
"use client";

import React from "react";

export default function ContactSection() {
  return (
    <div
      className="w-full text-white px-18 pt-20 pb-8"
      style={{ backgroundColor: "#1f1f1f", fontFamily: "Gotham, sans-serif" }}
    >
      {/* TEXT BLOCK */}
      <h2
        className="leading-tight max-w-[70%]"
        style={{
          fontSize: "64px",
          fontWeight: 600,
        }}
      >
        What happens next usually <br /> starts with a conversation.
      </h2>

      {/* EMAIL + BUTTON INLINE */}
      <div className="flex items-center gap-125 mt-12">
        <p
          style={{
            fontSize: "55px",
            color: "#F4C016",
            fontWeight: 500,
          }}
        >
          info@kalolwala.com
        </p>

        {/* ----------------------------- */}
        {/* CONTACT BUTTON (CLICKABLE)    */}
        {/* ----------------------------- */}

        {/* OPTION 1 → Open contact page */}
        {/*
        <a
          href="/contact"
          className="flex items-center gap-3 px-7 py-3 rounded-full border"
          style={{
            borderColor: "#7a7a7a",
            fontSize: "31px",
            fontFamily: "Gotham, sans-serif",
          }}
        >
          <span
            className="w-4 h-4 rounded-full bg-white inline-block"
          />
          Contact us
        </a>
        */}

        {/* OPTION 2 → Send email */}
        <a
          href="mailto:info@kalolwala.com"
          className="flex items-center gap-3 px-7 py-3 rounded-full border"
          style={{
            borderColor: "#7a7a7a",
            fontSize: "31px",
            fontFamily: "Gotham, sans-serif",
          }}
        >
          <span className="w-4 h-4 rounded-full bg-white inline-block" />
          Contact us
        </a>
      </div>
      <div className="w-full mt-20 mb-6 border-t" style={{ borderColor: "#3a3a3a" }} />
      <div className="flex items-center justify-between text-sm opacity-70">
        <p>Kalolwala & Associates Private Limited © 2025. All rights reserved.</p>
          <div className="flex gap-4 text-gray-400">

    {/* Facebook */}
    <a
      href="https://www.facebook.com/kalolwalaassociates/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.03H8.08v-2.9h2.36V9.83c0-2.33 1.38-3.62 3.51-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.74 8.44-4.91 8.44-9.93z"/>
      </svg>
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/kalolwalaassociates/?igshid=1haq6e2igqh4l"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
      </svg>
    </a>

    {/* YouTube */}
    <a
      href="https://www.youtube.com/channel/UC6AxPH06zke5MGr7TQNYdfA"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.6 3.2H4.4A4.38 4.38 0 000 7.6v8.8a4.38 4.38 0 004.4 4.4h15.2a4.38 4.38 0 004.4-4.4V7.6a4.38 4.38 0 00-4.4-4.4zM9.6 16.2V7.8l6.8 4.2-6.8 4.2z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/company/kalolwala-associates-private-limited"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-8 7H8v10h3V10zm-.5-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM20 10h-3v1.39c-.69-.97-1.68-1.39-2.82-1.39C12.09 10 11 11.24 11 13v7h3v-6c0-.76.53-1.35 1.24-1.35.82 0 1.76.59 1.76 1.97V20h3v-8z"/>
      </svg>
    </a>

  </div>
      </div>
    </div>
  );
}
