"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";
import AestheticDot from "@/components/AestheticDot";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

const StatsTop = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });
  const [highlight, setHighlight] = useState(false);
  const shapeRef = useRef<SVGPathElement | null>(null);

  // 🟡 GSAP Animation Logic (Kept exactly as is)
  useEffect(() => {
    if (!shapeRef.current) return;
    gsap.set(shapeRef.current, { y: -80, x: 0, scale: 1, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      repeat: -1, repeatDelay: 1, defaults: { ease: "power2.inOut" }, paused: true,
    });

    tl.to(shapeRef.current, { y: 0, scaleY: 0.7, scaleX: 1.2, duration: 0.5, ease: "power2.in" })
      .to(shapeRef.current, { scaleY: 1.1, scaleX: 0.9, duration: 0.2, ease: "power2.out" })
      .to(shapeRef.current, { scaleY: 1, scaleX: 1, duration: 0.2, ease: "power1.out" })
      .to(shapeRef.current, { duration: 0.6, morphSVG: "M50 10 Q90 10 90 50 Q90 90 50 90 Q10 90 10 50 Q10 10 50 10 Z", ease: "power2.inOut" })
      .to(shapeRef.current, { x: 150, rotation: 360, duration: 2, ease: "power1.inOut" })
      .to(shapeRef.current, { x: 0, rotation: 720, duration: 2, ease: "power1.inOut" })
      .to(shapeRef.current, { duration: 0.6, morphSVG: "M50 10 L90 35 L73 85 L27 85 L10 35 Z", ease: "power2.inOut" })
      .to(shapeRef.current, { y: -80, duration: 0.6, ease: "power2.in" });

    if (isInView) tl.play(); else tl.pause();
    return () => { tl.kill(); };
  }, [isInView]);

  return (
    <section
      ref={ref}
      // FIXED: Kept min-h-[90vh] on desktop to ensure full height feeling. Reduced only for mobile.
      // FIXED: 'items-end' ensures content stays at the bottom.
      className="relative w-full min-h-[70vh] md:min-h-[90vh] flex items-end bg-black text-white overflow-hidden font-sans"
    >
      {/* === BACKGROUND IMAGE === */}
      <motion.div
        className="absolute grayscale inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/teamwork.webp')" }}
        initial={{ scale: 1.1, x: 120 }} 
        animate={isInView ? { scale: 1, x: 0, transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] } } : { scale: 1.1, x: 120, transition: { duration: 1.2, ease: "easeInOut" } }}
      />

      {/* === GRADIENT OVERLAY === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 to-transparent"
        initial={{ x: -50 }} 
        animate={isInView ? { x: 0, transition: { duration: 1.6, delay: 0.3, ease: "easeOut" } } : { x: -50 }}
      />

      {/* === CONTENT === */}
      {/* FIXED: 
         - 'justify-end' guarantees bottom alignment.
         - 'items-start' keeps text left-aligned.
         - 'pb-12 md:pb-16' adds the necessary breathing room from the bottom edge.
      */}
      <div className="relative z-10 w-full flex flex-col items-start justify-end px-6 pb-12 md:pb-16">
        
        {/* Wrapper to constrain width on desktop, full width on mobile */}
        <div className="w-full max-w-8xl marginal mx-auto">

            <div className="flex items-center gap-3 mb-4">
              <AestheticDot/>
              <motion.h2
                initial={{ y: 10 }}
                animate={isInView ? { y: 0, transition: { delay: 0.6 } } : { y: 10 }}
                className="uppercase font-noto-sans tracking-widest text-sm md:text-2xl text-gray-300 font-medium"
              >
                Why K&A?
              </motion.h2>
            </div>

            <motion.h2
              initial={{ y: 40 }}
              animate={isInView ? { y: 0, transition: { duration: 1.2, delay: 0.8, ease: "easeOut" } } : { y: 40 }}
              // FIXED: Desktop text size restored to 3xl/4xl depending on your preference (kept at 3xl here as per original)
              className="text-sm sm:text-2xl font-noto-sans md:text-3xl leading-relaxe md:leading-[1.25] font-light max-w-full md:max-w-3xl text-left"
            >
              <span className="font-medium">K&A brings every capability in-house:</span> robust research, compelling communication, meticulous design and leading-edge digital execution — producing annual reports, coffee-table books and websites that speak with the same clarity, precision and impact.
            </motion.h2>

        </div>
      </div>
    </section>
  );
};

export default StatsTop;