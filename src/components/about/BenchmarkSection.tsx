"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function BenchmarkSection() {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  const [count, setCount] = useState(0);

  // Counter Logic
  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = 300;
      const duration = 1200;
      const step = 16;

      const counter = setInterval(() => {
        start += end / (duration / step);
        if (start >= end) {
          clearInterval(counter);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, step);

      return () => clearInterval(counter);
    } else {
      setCount(0);
    }
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      layout={false}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
      // Standardized padding and vertical gap to match screenshot
      className="w-full marginal bg-black border-b border-stone-600 text-white py-[clamp(60px,10vw,60px)] flex flex-col gap-16 lg:gap-32"
    >
      {/* --- TOP SECTION: HEADING --- */}
      <div className="w-full mt-20 md:mt-0 flex md:flex-row flex-col gap-6">
        <div className="md:w-1/2 flex flex-col gap-20">
          <motion.h1
            className="font-noto-sans font-light leading-tight"
            style={{
              fontSize: "clamp(28px,4.4vw,50px)", // Adjusted clamp for better fit
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {["We set the", "benchmark in", "integrated", "communication"].map(
              (line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.h2
                    className="block"
                    initial={{ y: "100%" }}
                    animate={inView ? { y: "0%" } : { y: "100%" }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                      delay: i * 0.1,
                    }}
                  >
                    {line}
                  </motion.h2>
                </span>
              )
            )}
          </motion.h1>
          {/* LEFT: COUNTER & LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className=" flex flex-col items-start gap-8"
          >
            {/* Number Wrapper - Changed to items-start for top alignment of + */}
            <div className="flex font-noto-sans items-start leading-none">
              <span
                className="tracking-tighte"
                style={{
                  fontSize: "clamp(80px,14vw,200px)",
                  fontWeight: 300,
                  lineHeight: "0.8", // Tighten line height to remove top whitespace
                }}
              >
                {count}
              </span>

              <span
                style={{
                  color: "#F4C016",
                  fontSize: "clamp(40px,6vw,100px)",
                  fontWeight: 300,
                  marginTop: "clamp(5px, 1vw, 15px)", // Minor optical adjustment
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </div>
            <p
              className="ml- font-light"
              style={{
                fontSize: "clamp(26px,1.5vw,34px)",
              }}
            >
              Clients served in FY25
            </p>
          </motion.div>
        </div>
        {/* --- BOTTOM SECTION: NUMBERS & TEXT --- */}
        <div className="md:w-1/2 flex flex-col justify-end items-end">
          <motion.div
            className="lg:w-[80%] pr-0 lg:pr-4 pt-2 lg:pt-4 flex flex-col gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          >
            <p
              className="leading-relaxed text-gray-200 font-noto-sans"
              style={{
                // fontFamily: "font-noto-sans",
                fontSize: "clamp(14px,1.2vw,18px)",
                fontWeight: 300,
              }}
            >
              We are both the voice and the engine behind brand communication,
              giving global businesses clarity, conviction and a message that
              moves their stakeholders.
            </p>
            <p
              className="leading-relaxed text-gray-200 font-noto-sans"
              style={{
                fontSize: "clamp(14px,1.2vw,18px)",
                fontWeight: 300,
              }}
            >
              Our storytelling is grounded in authenticity and crafted with
              intent. Across aviation, infrastructure, FMCG, IT, telecom, energy,
              pharmaceuticals, healthcare, hospitality, BFSI, alcobev, and
              premium retail, we help brands speak with clarity, earn trust and
              create impact that lasts.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}