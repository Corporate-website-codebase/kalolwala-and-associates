
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Header() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  return (
    <section
      ref={ref}
      className="
        w-full 
        marginal
        flex 
        items-end 
        bg-black 
        text-white 
        font-noto-sans
      "
    >
      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
              }
              : { opacity: 0, y: 20 }
          }
          className=" text-white pt-32 sm:pt-40 font-thin text-[clamp(32px,4.4vw,60px)] mb-8 leading-tight">
          Propeling your <br />
          ambition into a <br />
          powerful brand.
        </motion.h1>

      </div>
    </section>
  );
}
