"use client";

import React, { useState } from "react";

interface MarqueeLink {
  url: string;
  publisher: string;
  publisherLogo: string;
}

interface PublisherMarqueeProps {
  links: MarqueeLink[];
}

export default function PublisherMarquee({ links }: PublisherMarqueeProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // We duplicate the list to create a seamless loop
  const items = [...links, ...links];

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      {/* Label */}
      <span className="block text-xs font-mono text-yellow-400 uppercase tracking-[0.25em] mb-6">
        Read article on
      </span>

      {/* Marquee viewport */}
      <div
        className="
          relative w-full overflow-hidden
          before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:z-10
          before:bg-gradient-to-r before:from-[#050505] before:to-transparent
          after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:z-10
          after:bg-gradient-to-l after:from-[#050505] after:to-transparent
        "
      >
        {/* Scrolling track */}
        <div
          className="
            flex items-center gap-10
            w-max
            animate-marquee
          "
          style={{
            animationPlayState: hoveredIdx !== null ? "paused" : "running",
          }}
        >
          {items.map((link, idx) => (
            <a
              key={`${link.publisher}-${idx}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative flex-shrink-0
                group
                flex items-center justify-center
                h-20
                px-6
                rounded-lg
                bg-white/[0.03]
                border border-white/[0.06]
                hover:border-[#F4C016]/30
                hover:bg-[#F4C016]/[0.04]
                transition-all duration-300
                cursor-pointer
              "
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Publisher logo — doubled size (h-10 vs original h-5) */}
              <img
                src={link.publisherLogo}
                alt={link.publisher}
                className="
                  h-10 w-auto max-w-[160px] object-contain
                  brightness-75
                  group-hover:brightness-100 group-hover:grayscale-0
                  transition-all duration-400
                "
              />

              {/* Tooltip */}
              <span
                className="
                  pointer-events-none
                  absolute -top-9 left-1/2 -translate-x-1/2
                  px-3 py-1.5
                  bg-[#F4C016] text-[#050505]
                  text-[11px] font-semibold tracking-wide
                  rounded-md
                  whitespace-nowrap
                  opacity-0 translate-y-1
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-200
                  z-20

                  after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
                  after:border-4 after:border-transparent after:border-t-[#F4C016]
                "
              >
                {link.publisher}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
