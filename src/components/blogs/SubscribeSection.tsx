"use client";

import { FormEvent, useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setMessage("You're subscribed.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    }
  };

  return (
    <div className="w-full pt-1 lg:pt-3">

      {/* SMALL LABEL */}
      <p
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-neutral-500
          mb-4
        "
      >
        Stay informed
      </p>

      {/* HEADING */}
      <h2
        className="
          text-black
          font-noto-sans
          font-normal
          leading-[1.1]
          tracking-tight
        "
        style={{
          fontSize: "clamp(26px, 2.5vw, 38px)",
        }}
      >
        Subscribe to our
        <br />
        latest insights.
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          mt-4
          text-neutral-700
          font-noto-sans
          font-light
          leading-relaxed
        "
        style={{
          fontSize: "14px",
        }}
      >
        Get thoughtful articles, perspectives and insights from
        Kalolwala & Associates delivered directly to your inbox.
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-6"
      >
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2">

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading"}
            className="
              w-full
              h-12
              px-4
              bg-white/70
              border
              border-black/15
              text-black
              text-sm
              font-noto-sans
              placeholder:text-neutral-500
              outline-none
              transition-all
              duration-300
              focus:bg-white
              focus:border-black/40
              disabled:opacity-50
            "
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="
              h-12
              px-6
              shrink-0
              bg-black
              text-white
              text-[10px]
              font-noto-sans
              font-bold
              uppercase
              tracking-widest
              transition-all
              duration-300
              hover:bg-[#F4C016]
              hover:text-black
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {status === "loading"
              ? "Subscribing..."
              : "Subscribe"}
          </button>

        </div>
      </form>

      {/* STATUS MESSAGE */}
      {message && (
        <p
          className={`mt-3 text-xs ${
            status === "success"
              ? "text-neutral-700"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

    </div>
  );
}