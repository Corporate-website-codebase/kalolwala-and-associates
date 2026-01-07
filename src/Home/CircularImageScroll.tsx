"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ImageData {
  src: string;
  url: string;
}

const CircularImageScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 🖼️ Replace with your own image URLs and destinations
  const images: ImageData[] = [
    { src: "/images/discover.png", url: "https://www.google.com" },
    { src: "/images/discover.png", url: "https://www.apple.com" },
    { src: "/images/discover.png", url: "https://www.microsoft.com" },
    { src: "/images/discover.png", url: "https://www.openai.com" },
    { src: "/images/discover.png", url: "https://www.tesla.com" },
    { src: "/images/discover.png", url: "https://www.nasa.gov" },
    { src: "/images/discover.png", url: "https://www.meta.com" },
    { src: "/images/discover.png", url: "https://www.spotify.com" },
  ];

  // 🌐 Generate random starting positions near viewport edges
  const [startPositions] = useState(() =>
    images.map(() => {
      const side = Math.floor(Math.random() * 4);
      const offset = 100; // push off-screen slightly
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      switch (side) {
        case 0:
          return { x: Math.random() * vw - vw / 2, y: -vh / 2 - offset };
        case 1:
          return { x: Math.random() * vw - vw / 2, y: vh / 2 + offset };
        case 2:
          return { x: -vw / 2 - offset, y: Math.random() * vh - vh / 2 };
        default:
          return { x: vw / 2 + offset, y: Math.random() * vh - vh / 2 };
      }
    })
  );

  // 🎯 Fixed circular arrangement (target positions)
  const circleRadius = 250;
  const circlePositions = images.map((_, i) => {
    const angle = (i / images.length) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * circleRadius,
      y: Math.sin(angle) * circleRadius,
    };
  });

  // 🎞️ Framer Motion interpolations
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-black flex items-center justify-center text-white overflow-hidden"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((img, i) => {
            const start = startPositions[i];
            const end = circlePositions[i];

            const x = useTransform(progress, [0, 1], [start.x, end.x]);
            const y = useTransform(progress, [0, 1], [start.y, end.y]);
            const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.2, 1, 1, 0.8]);
            const scale = useTransform(progress, [0, 1], [0.8, 1]);

            return (
              <motion.div
                key={i}
                style={{
                  x,
                  y,
                  opacity,
                  scale,
                  position: "absolute",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                onClick={() => window.open(img.url, "_blank")}
              >
                <motion.img
                  src={img.src}
                  alt={`Image ${i}`}
                  className="w-[120px] h-[120px] object-contain rounded-lg border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Text instructions */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-gray-400"
          style={{ opacity: useTransform(progress, [0, 0.1, 0.9, 1], [1, 0.6, 0.6, 1]) }}
        >
          Scroll to form the circle • Click any image
        </motion.div>
      </div>
    </section>
  );
};

export default CircularImageScroll;
