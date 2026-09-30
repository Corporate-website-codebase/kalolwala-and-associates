"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ---------- DATA ---------- */
const foundersData = [
  {
    id: "ceo",
    slug: "hussain-kalolwala",
    name: "Hussain Kalolwala",
    role: "CEO & Director",
    img: "/images/H.webp",
  },
  {
    id: "cso",
    slug: "jumana-vadnagarwala",
    name: "Jumana Vadnagarwala",
    role: "Chief Strategy Officer & Director",
    img: "/images/J.webp",
  },
];

/* ---------- CUSTOM CURSOR COMPONENT ---------- */
const CustomCursor = ({ active }: { active: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: -40,
        y: -40,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: active ? 1 : 0,
        opacity: active ? 1 : 0,
      }}
      className="fixed top-0 left-0 w-12 h-12 rounded-full bg-white z-[9999] pointer-events-none flex items-center justify-center shadow-lg"
    >
      <ArrowUpRight className="text-black w-4 h-4" strokeWidth={2.5} />
    </motion.div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
export default function Founders() {
  const [isHoveringFounder, setIsHoveringFounder] = useState(false);

  return (
    <div className="relative w-full bg-black font-noto-sans">
      {/* Hide Cursor on Mobile/Tablet/iPad (Visible only on XL screens) */}
      <div className="hidden xl:block">
        <CustomCursor active={isHoveringFounder} />
      </div>

      {/* ===== FOUNDERS GRID ===== */}
      <div className="relative z-20 bg-black pb-16 pt-16 md:pb-24 md:pt-24 border-t border-white/10">
        <div className="max-w-7x mx-auto px-4 sm:px-6">
          <div className="mb-10 font-noto-sans">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-light text-white">
                Meet the visionaries
              </h2>
            </div>
            <div className="max-w-m text-gray-400 text-lg md:text-xl">
              Introducing the visionaries whose leadership, insight and intent drive everything K&A stands for.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
            {foundersData.map((founder) => (
              <Link
                key={founder.id}
                href={`/about/${founder.slug}`}
                scroll={true}
                // Cursor logic: Pointer on iPad/Mobile, None on Desktop (uses custom cursor)
                className="block relative cursor-pointer xl:cursor-none group"
                onMouseEnter={() => setIsHoveringFounder(true)}
                onMouseLeave={() => setIsHoveringFounder(false)}
                aria-label={`View profile of ${founder.name}`}
              >
                <div className="w-full">
                  <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-sm bg-zinc-900 flex items-end justify-center">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 ${
                        founder.id === "ceo" ? "object-[center_30%]" : ""
                      }`}
                    />

                    {/* --- OVERLAY: Visible by default --- */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* --- TEXT DETAILS: Visible by default --- */}
                    <div className="absolute left-0 bottom-0 p-6 md:p-8 w-full z-20 pointer-events-none">
                      <div className="transform translate-y-0 opacity-100 transition-all duration-300">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 relative z-30">
                          {founder.name}
                        </h3>
                        <p className="text-yellow-400 font-bold tracking-wider text-[10px] md:text-xs uppercase relative z-30 mb-4">
                          {founder.role}
                        </p>

                        {/* --- VIEW PROFILE LINK --- */}
                        <div className="flex items-center gap-2 text-white/90 group-hover:text-yellow-400 transition-colors">
                          <span className="text-xs uppercase tracking-widest font-medium">View Profile</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}