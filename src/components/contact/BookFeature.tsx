"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AestheticDot from "../AestheticDot";

export default function BookFeature() {
  const images = [
    "/images/book-cr1.webp",
    "/images/book-cr2.webp",
    "/images/book-cr3.webp",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* --------------------------------------------
     AUTO CAROUSEL
  ---------------------------------------------- */
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <div className="relative w-full max-w-[960px] mx-auto">
      {/* --------------------------------------------
          ANIMATED YELLOW BORDER
      ---------------------------------------------- */}
      <div
        className="
          absolute
          inset-0
          rounded-2xl
          border
          border-[#F4C016]
          animate-pulse
          pointer-events-none
          z-20
        "
      />

      {/* --------------------------------------------
          GLASSMORPHIC CARD
      ---------------------------------------------- */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
        "
      >
        {/* TOP RIGHT GLOW */}
        <div
          className="
            absolute
            -top-32
            -right-32
            w-64
            h-64
            rounded-full
            bg-[#F4C016]/10
            blur-3xl
            pointer-events-none
          "
        />

        {/* BOTTOM LEFT GLOW */}
        <div
          className="
            absolute
            -bottom-32
            -left-32
            w-64
            h-64
            rounded-full
            bg-[#F4C016]/5
            blur-3xl
            pointer-events-none
          "
        />

        {/* --------------------------------------------
            CONTENT
        ---------------------------------------------- */}
        <div
          className="
            relative
            z-10
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-10
            px-7
            py-9
            md:px-12
            md:py-10
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}
          <div className="flex-1 text-center sm:text-left">
            {/* EYEBROW */}
            <div
              className="
                flex
                items-center
                justify-center
                sm:justify-start
                gap-3
                mb-4
              "
            >
              <AestheticDot color="#F4C016" />

              <span
                className="
                  text-[#F4C016]
                  text-[11px]
                  md:text-xs
                  uppercase
                  tracking-[0.25em]
                  font-medium
                "
              >
                Featured Publication
              </span>
            </div>

            {/* TITLE */}
            <h2
              className="
                text-white
                text-2xl
                md:text-3xl
                lg:text-[34px]
                font-light
                tracking-tight
                leading-tight
                mb-5
              "
            >
              A Story of{" "}
              <span className="text-[#F4C016] font-normal">Influence</span> &{" "}
              <span className="text-[#F4C016] font-normal">Impact</span>
            </h2>

            {/* DECORATIVE LINE */}
            <div
              className="
    hidden
    sm:block
    h-px
    w-16
    bg-white/20
    mb-5
  "
            />

            {/* DESCRIPTION */}
            <p
              className="
                text-white/75
                text-base
                md:text-lg
                leading-relaxed
                max-w-[620px]
              "
            >
              Our Founders’ journey captured among India’s leading 30 PR and
              Corporate Communication professionals.
            </p>

            {/* CTA */}
            <a
              href="https://amzn.in/d/05BRR06k"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-3
                mt-6
                px-5
                py-2.5
                rounded-full
                border
                border-[#F4C016]/40
                bg-[#F4C016]/5
                text-[#F4C016]
                text-sm
                md:text-base
                font-medium
                transition-all
                duration-300
                hover:bg-[#F4C016]
                hover:text-black
                hover:border-[#F4C016]
                hover:shadow-[0_0_25px_rgba(244,192,22,0.2)]
              "
            >
              <span>Explore the book</span>

              <span
                className="
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </a>
          </div>

          {/* =====================================================
              RIGHT CAROUSEL
          ====================================================== */}
          <div
            className="
              relative
              w-full
              sm:w-[260px]
              md:w-[300px]
              lg:w-[340px]
              shrink-0
              select-none
            "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* IMAGE GLOW */}
            <div
              className="
                absolute
                inset-8
                rounded-full
                bg-[#F4C016]/15
                blur-3xl
                pointer-events-none
              "
            />

            {/* --------------------------------------------
                IMAGE CAROUSEL
            ---------------------------------------------- */}
            <div
              className="
                relative
                z-10
                w-full
                aspect-[12/8]
              "
            >
              {images.map((image, index) => {
                const isActive = index === currentImage;

                return (
                  <div
                    key={image}
                    className={`
                      absolute
                      inset-0
                      rounded-xl
                      overflow-hidden
                      transition-all
                      duration-1000
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${
                        isActive
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-[0.96] translate-y-2"
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={`Publication image ${index + 1}`}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 768px) 300px,
                        340px
                      "
                      className="
                        w-full
                        h-full
                        object-cover
                        rounded-xl
                        drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]
                      "
                    />
                  </div>
                );
              })}
            </div>

            {/* --------------------------------------------
                CAROUSEL DOTS
            ---------------------------------------------- */}
            {images.length > 1 && (
              <div
                className="
                  relative
                  z-20
                  flex
                  justify-center
                  items-center
                  gap-1.5
                  mt-3
                "
              >
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setCurrentImage(index)}
                    className={`
                      cursor-pointer
                      transition-all
                      duration-500
                      rounded-full
                      ${
                        currentImage === index
                          ? "w-6 h-1 bg-[#F4C016]"
                          : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
                      }
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
