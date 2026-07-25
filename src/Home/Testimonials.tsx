"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import AestheticDot from "@/components/AestheticDot";

declare global {
  interface Window {
    TagAppEmbed?: {
      init: () => void;
    };
  }
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  useEffect(() => {
    if (window.TagAppEmbed) {
      console.log("Calling TagAppEmbed.init()");
      window.TagAppEmbed.init();
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-black text-white overflow-hidden py-10 md:py-16 font-sans flex flex-col items-center"
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1, transition: { duration: 1.5 } } : { opacity: 0 }}
      />

      <div className="relative z-10 w-full max-w-8xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <AestheticDot />
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1, transition: { delay: 0.3 } } : { y: 10, opacity: 0 }}
              className="uppercase font-noto-sans tracking-widest text-sm md:text-xl text-gray-300 font-medium"
            >
              Client Stories
            </motion.h2>
          </div>

          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.5, ease: "easeOut" } } : { y: 40, opacity: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-noto-sans font-light leading-tight max-w-full md:max-w-3xl text-left"
          >
            <span className="font-medium">Trusted by leaders.</span> Hear how we turn complex challenges into compelling communication.
          </motion.h2>
        </div>

        {/* Widget Container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.7, ease: "easeOut" } } : { y: 50, opacity: 0 }}
          className="relative w-full p-2 md:p-4 overflow-hidden"
        >
          {/* 🔴 BRANDING PATCH: Covers "Powered by Tagembed" at top-right */}
          <div 
            className="absolute top-0 right-0 z-20 h-15 w-73 bg-black pointer-events-auto"
            aria-hidden="true"
          />

          <div
            className="tagembed-widget"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "400px",
              overflow: "auto",
            }}
            data-widget-id="330592"
            data-website="1"
          />

          <Script
            src="https://widget.tagembed.com/embed.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              console.log("Tagembed script loaded");

              if (window.TagAppEmbed) {
                window.TagAppEmbed.init();
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}