"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Header() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  return (
    <section
      ref={ref}
      // FIX 1: Convert to a single line string to avoid \r\n mismatches
      className="w-full flex items-end bg-black text-white m-0 pb-0 "
    >
      <div
        // FIX 2: Convert this to a single line as well
        className="w-full px-5 marginal"
      >

        <motion.h2 className=" text-white  font-thin font-noto-sans text-[clamp(32px,4.4vw,70px)] mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
              }
              : { opacity: 0, y: 20 }
          }
        >
          Where communication <br />
          becomes impact and ideas <br />
          become experiences
        </motion.h2>

      </div>
    </section>
  );
}