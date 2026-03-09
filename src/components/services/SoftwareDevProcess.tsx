"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const PROCESS_STEPS = [
  { id: "01", title: "Requirement Analysis" },
  { id: "02", title: "Planning" },
  { id: "03", title: "Design" },
  { id: "04", title: "Development" },
  { id: "05", title: "Deployment" },
  { id: "06", title: "Maintenance" },
];

export default function SoftwareDevProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full pr-6 max-w-[320px] shrink-0 border-l border-black/10 pl-5 lg:border-l-0 lg:pl-0 self-start lg:mt-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="uppercase tracking-[0.2em] font-bold mb-10 text-[11px]  text-black"
      >
        Development Lifecycle
      </motion.p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 relative w-full pr-4">
        {PROCESS_STEPS.map((step, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col items-start gap-1 cursor-default"
            >
              {/* Top border line acting as the structural grid line */}
              <div className="absolute -top-3 left-0 w-full h-px bg-black/10 transition-colors duration-500" />
              {/* Animated highlight line on hover */}
              <div
                className={`absolute -top-3 left-0 h-[2px] bg-yellow-500 transition-all duration-500 ease-out origin-left ${isHovered ? "w-full" : "w-0"}`}
              />

              {/* Numbering */}
              <span
                className={`text-[11px] uppercase tracking-widest transition-colors duration-500 ease-out font-mono ${isHovered ? "text-yellow-600 font-bold" : "text-black/35 font-semibold"}`}
              >
                {step.id}
              </span>

              {/* Title */}
              <h4
                className={`text-[15px] leading-snug font-semibold tracking-tight transition-transform duration-500 ease-out mt-1 ${isHovered ? "text-black translate-x-1" : "text-neutral-700"}`}
              >
                {step.title}
              </h4>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
