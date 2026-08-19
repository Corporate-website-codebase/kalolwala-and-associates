"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Navigation, ArrowUpRight } from "lucide-react";
import AestheticDot from "@/components/AestheticDot";
import Link from "next/link";

/* ----------------------------------------
   HELPER: WIPE REVEAL COMPONENT
---------------------------------------- */
const WipeReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0.2,
      filter: "blur(2px)",
      color: "#52525b",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      color: "#ffffff",
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-2xl md:text-3xl lg:text-4xl font-thin leading-snug tracking-wide flex flex-wrap gap-x-2.5 gap-y-1"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

/* ----------------------------------------
   ANIMATION VARIANTS (Layout)
---------------------------------------- */
const videoVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ----------------------------------------
   MAIN COMPONENT
---------------------------------------- */
const Locations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  const paragraphText =
    "From our upscale offices in Mumbai, Gurugram, Kolkata, Hyderabad and Bengaluru, we partner with businesses and brands across India and global markets to craft corporate communication strategies for enduring impact.";

  return (
    <section
      ref={ref}
      className="w-full  bg-black text-white overflow-hidden relative"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto px-6 lg:px-8"
      >
        {/* === CENTERED HEADER TEXT === */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-700 mb-16 leading-[0.9]"
        >
          K&A, India and beyond
        </motion.h1>

        {/* === MAIN CONTENT GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-20">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="relative z-10 flex flex-col justify-center items-start">
            
            {/* Label */}
            <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8 lg:mb-10 max-w-7xl">
              <AestheticDot />
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="uppercase tracking-widest font-noto-sans text-[10px] md:text-sm text-gray-400"
              >
                Our Presence
              </motion.h2>
            </div>

            {/* Paragraph Text */}
            {isInView && <WipeReveal text={paragraphText} />}
            
          </div>

          {/* ================= RIGHT SIDE: Video ================= */}
          <motion.div variants={videoVariant} className="relative w-full">
            <div className="aspect-square w-full relative rounded-[3rem] overflow-hidden z-10 border border-white/10 group">
              
              {/* Subtle White Glow */}
              <div className="absolute inset-0 bg-white/10 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 -z-10"></div>

              <video
                src="/videos/loc.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>

              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-black/10 pointer-events-none"></div> */}

              {/* Icon Overlay */}
              <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10">
                <Navigation className="text-white w-5 h-5 animate-pulse" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* === BOTTOM ACTION BAR === */}
        <Link href="/culture#team" scroll={false}> 
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
    transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
    className="w-full border-t border-b border-white/20 group cursor-pointer"
  >
    <div className="w-full py-8 md:py-10 flex items-center justify-between hover:px-4 transition-all duration-500 ease-out">
      
      {/* Left: Text */}
      <h2 className="text-2xl md:text-4xl font-thin tracking-widest text-white group-hover:text-white/80 transition-colors">
        Explore Our Team
      </h2>

      {/* Right: Interaction Dot (keep existing logic) */}
      <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
        <div className="absolute h-2 w-2 md:h-3 md:w-3 rounded-full bg-white transition-all duration-300 ease-out group-hover:h-full group-hover:w-full" />
        <ArrowUpRight 
          className="relative z-10 h-5 w-5 md:h-6 md:w-6 text-black 
                     opacity-0 translate-y-4 -translate-x-4 
                     transition-all duration-300 ease-out 
                     group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" 
        />
      </div>
    </div>
  </motion.div>
</Link>

      </motion.div>
    </section>
  );
};

export default Locations;