"use client";

import { useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const lines = [
  <span key="main-text">
  For over a decade, these tenets have enabled us to emerge as India’s largest independent stakeholder communication consultancy. In an {" "}
  <span className="whitespace-nowrap">ever-evolving</span> world of branding and communication, we continue to create meaningful impact with innovation.
  </span>,
];

// Create a single string for mobile (join without extra space because lines already have trailing spaces)
const mobileParagraph = lines.join("");

const TextOverlay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const starRef = useRef<HTMLSpanElement | null>(null);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !starRef.current || !textWrapperRef.current) return;

    const starEl = starRef.current;
    // This selects both the mobile paragraph AND the desktop lines
    const textEls = Array.from(textWrapperRef.current.children) as HTMLElement[];

    gsap.set(starEl, { opacity: 0, scale: 0.8, rotation: -45 });
    gsap.set(textEls, { opacity: 0, y: 40, filter: "blur(12px)", clipPath: "inset(0 0 100% 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(starEl, {
      opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "expo.out",
    })
    .to(textEls, {
      opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)",
      // Stagger works for the desktop lines. For the single mobile paragraph, it just animates once.
      stagger: { amount: 0.4 }, duration: 1, ease: "power3.out",
    }, "<+0.2");

    // Animate the last element color (works for both single paragraph or last line of desktop)
    tl.to(textEls[textEls.length - 1], { color: "#facc15", duration: 0.6 }, ">-0.4");

    gsap.to(containerRef.current, {
      opacity: 0, y: -50, filter: "blur(8px)", ease: "power2.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%", end: "bottom top", scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 w-full md:min-h-[80vh] flex flex-col items-center justify-center text-center text-white px-4 md:px-6 py-12 md:py-20 pointer-events-none">
      
      <div className="mb-6 md:mb-8 pointer-events-auto">
        <Link href="/">
          <motion.div
            className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer select-none"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image src="/images/kna.png" alt="Logo" fill className="absolute inset-0" style={{ backfaceVisibility: "hidden" }} />
            <Image src="/images/10-years.png" alt="10 Years" fill className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} />
          </motion.div>
        </Link>
      </div>

      <div ref={textWrapperRef} className="notranslate w-full max-w-[90vw] md:max-w-full" translate="no">
        
        {/* === MOBILE/TABLET VERSION: Single Paragraph === */}
        <p 
          suppressHydrationWarning
          className="md:hidden font-noto-sans text-lg sm:text-2xl leading-snug tracking-wide will-change-[transform,opacity,filter]"
        >
          {/* {mobileParagraph} */}
          {lines}
        </p>

        {/* === DESKTOP VERSION: Line by Line === */}
        {lines.map((line, idx) => (
          <p 
            key={idx} 
            suppressHydrationWarning 
            className="hidden font-noto-sans w-6xl font-thin mx-auto md:block md:text-4xl md:leading-tight tracking-wid mb-2 will-change-[transform,opacity,filter]"
          >
            {line}
          </p>
        ))}

      </div>
    </div>
  );
};

export default TextOverlay;