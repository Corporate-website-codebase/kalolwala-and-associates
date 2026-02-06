"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const ImpactBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const videoSrc = "/videos/Impact.mp4";
  const impact = "Impact";
  const text = "multiplied";

  return (
    <section
      ref={ref}
      className="relative w-full h-[33vh] bg-black overflow-hidden flex"
    >
      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {/* Left Side: Solid Black */}
        <div className="w-1/2 bg-black h-full" />

        {/* Right Side: Video */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale opacity-60"
            />
            {/* Gradient to smooth the edge between black and video */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-20" />
          </motion.div>
        </div>
      </div>

      {/* === TEXT LAYER (Overlaid on top to prevent clipping) === */}
      <div className="relative z-30 w-full h-full flex items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-noto-sans font-light text-white text-4xl md:text-6xl lg:text-8xl tracking-tight text-center px-4"
        >
            <span className="uppercase font-medium">{impact} </span>
          {text}
        </motion.h1>
      </div>
    </section>
  );
};

export default ImpactBanner;