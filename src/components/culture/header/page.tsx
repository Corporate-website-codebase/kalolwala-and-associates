
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

        marginal
        w-full 
        flex items-end 
        bg-black text-white
        m-0
      "
    >
      <div className="w-full  pt-[20vh]">

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
            font-light 
            leading-[1.1] 
            text-[clamp(32px,6vw,64px)]
          "
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          The annual reboot that<br />powers extraordinary<br />possibilities.
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
            pt-4
            font-light 
            max-w-3xl
            text-[clamp(16px,3vw,22px)]
            opacity-90
            
          "
        >
          Our annual offsite is our moment to slow down, breathe deeper and reboot as one team. In that shared pause, we find the clarity and creativity that fuel our extraordinary work. It is where bonds strengthen, ideas spark and the next chapter takes shape.
        </motion.p>

      </div>
    </section>
  );
}
