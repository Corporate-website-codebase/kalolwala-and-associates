
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
        flex items-end 
        bg-black text-white
        m-0
        pt-[20vh]     /* responsive top spacing to clear navbar */
        pb-0
      "
    >
      <div className="w-full font-noto-sans">

        {/* LINE 1 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" },
                }
              : { opacity: 0, y: 20 }
          }
          className="
            font-thin
            leading-[1.1] 
            text-[clamp(32px,6vw,60px)]
          "
        >
          Access the Expertise of
        </motion.h2>

        {/* LINE 2 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
                }
              : { opacity: 0, y: 20 }
          }
          className="
            font-thin 
            leading-[1.1] 
            text-[clamp(32px,6vw,60px)]
            text-[#F4C016]
          "
        >
          K&A
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
                }
              : { opacity: 0, y: 20 }
          }
          className="
            pt-6
            font-light 
            max-w-3xl
            text-[clamp(16px,3vw,28px)]
            opacity-90
          "
        >
          At K&A, growth is a shared journey where thinking boldly and learning constantly 
          is celebrated. Here, every idea is heard, every voice matters and every day brings 
          a chance to grow, create and inspire.
        </motion.p>

      </div>
    </section>
  );
}
