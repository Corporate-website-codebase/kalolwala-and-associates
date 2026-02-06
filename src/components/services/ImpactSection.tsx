"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  "Motion Design.",
  "UX Design.",
  "Visual Design.",
  "Branding.",
  "Visual Front-End Development.",
  "Back-End Development.",
];

export default function ImpactSection() {
  return (
    <div className="w-full flex flex-col items-center text-white overflow-hidden">
      
      {/* GREY BOX SECTION */}
      <div className="marginal font-noto-sans w-full flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            w-full max-w-[1400px]
            rounded-xl 
            px-6 
            sm:px-10 
            py-10 
            sm:py-14 
            md:py-16 
            relative
            overflow-hidden
          "
          style={{ backgroundColor: "#474747" }}
        >
          <p
            className="
              leading-[1.3] 
              text-white 
              mb-16 
              text-[clamp(22px,4vw,48px)]
            "
            style={{
              fontWeight: 400,
            }}
          >
            We bring ideas to life with clarity, creativity and smart thinking.
            We believe in smart communication that cuts through the noise and
            creates enduring value.
            <br />
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
          </p>

          {/* MARQUEE */}
          <div className="w-full border-t border-white/20 pt-8 overflow-hidden flex">
            <motion.div
              className="flex items-center whitespace-nowrap"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...skills, ...skills].map((item, i) => (
                <span
                  key={i}
                  className="mr-12 sm:mr-24 inline-block text-[clamp(16px,2vw,24px)] text-white/90"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* TEXT SECTION (New Hierarchy) */}
      <div className="text-center mt-20 sm:mt-28 md:mt-32 mb-12 sm:mb-16 px-4 flex flex-col items-center">
        
        {/* 1. Small */}
        <p
          className="text-[clamp(18px,3vw,32px)] text-gray-400 mb-2"
        >
          What looks
        </p>

        {/* 2. BIG */}
        <h2
          className="text-[clamp(50px,11vw,160px)] leading-[0.9] font-bold text-white mb-6"
        >
          effortless
        </h2>

        {/* 3. Small */}
        <p
          className="text-[clamp(18px,3vw,32px)] text-gray-400 mb-2"
        >
          is never
        </p>

        {/* 4. BIG */}
        <h2
          className="text-[clamp(50px,11vw,160px)] leading-[0.9] font-bold text-white mb-8"
        >
          accidental.
        </h2>

        {/* 5. Final Paragraph */}
        <p
          className="mt-4 text-[clamp(16px,2.5vw,28px)] text-gray-300 max-w-4xl mx-auto leading-relaxed"
        >
          It is the result of skill, experience <br className="hidden md:block" />
          and relentless commitment.
        </p>

      </div>
    </div>
  );
}