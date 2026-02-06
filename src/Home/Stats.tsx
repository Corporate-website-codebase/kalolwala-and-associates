// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import AestheticDot from "@/components/AestheticDot";

// /* ---------- DATA ---------- */
// const stats = [
//   { value: 300, suffix: "+", label: "Clients Served\nin FY25" },
//   { value: 10, suffix: "+", label: "Years Experience" },
//   { value: 120, suffix: "+", label: "Talent Pool" },
//   { value: 95, suffix: "%", label: "Retention Rate" },
// ];

// /* ---------- HOOK ---------- */
// function useCount(target: number, play: boolean, durationMs = 1500) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!play) return;
//     let start = 0;
//     const stepMs = 16;
//     const steps = Math.max(1, Math.floor(durationMs / stepMs));
//     const increment = target / steps;
//     const t = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setVal(target);
//         clearInterval(t);
//       } else {
//         setVal(Math.floor(start));
//       }
//     }, stepMs);
//     return () => clearInterval(t);
//   }, [play, target, durationMs]);
//   return val;
// }

// /* ---------- SINGLE STAT ITEM ---------- */
// const StatItem = ({ stat, index, inView }: { stat: any; index: number; inView: boolean }) => {
//   const count = useCount(stat.value, inView, 1500);

//   return (
//     <div 
//       className={`
//         relative flex flex-col items-center justify-center overflow-hidden group
//         border-white/10
        
//         /* --- LAYOUT (FLEX) --- */
//         w-1/2 md:w-1/4

//         /* --- HEIGHTS (COMPACT EVERYWHERE) --- */
//         /* Mobile: py-3 */
//         /* Tablet: py-2 (Very tight) */
//         /* Desktop: py-12 (Instead of 40vh, this is much smaller) */
//         py-3 md:py-2 lg:py-12

//         /* --- BORDERS --- */
//         odd:border-r 
//         [&:nth-child(-n+2)]:border-b 
//         md:odd:border-r-0 
//         md:[&:nth-child(-n+2)]:border-b-0
//         md:border-r md:last:border-r-0
//       `}
//     >
      
//       {/* 1. THE NUMBER */}
//       <motion.div
//         className="flex items-center justify-center z-0"
//         initial={{ opacity: 1, scale: 1 }}
//         animate={inView ? { opacity: 0.13, scale: 1 } : {}}
//         transition={{ delay: 1.8 + (index * 0.1), duration: 0.8, ease: "easeInOut" }}
//       >
//         <span className="text-3xl sm:text-4xl font-noto-sans md:text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-none">
//           {count}
//           <span className="text-yellow-400 ml-0.5 text-xl sm:text-2xl md:text-3xl lg:text-6xl leading-none">{stat.suffix}</span>
//         </span>
//       </motion.div>

//       {/* 2. THE LABEL */}
//       <motion.div
//         className="absolute inset-0 flex items-center justify-center z-10"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={inView ? { opacity: 1, scale: 1 } : {}}
//         transition={{ delay: 1.8 + (index * 0.1), duration: 0.6, ease: "easeOut" }}
//       >
//         <span className="text-[10px] whitespace-pre-line font-noto-sans sm:text-xs md:text-sm lg:text-2xl font-light tracking-[0.15em] text-white drop-shadow-md text-center px-1">
//           {stat.label}
//         </span>
//       </motion.div>
      
//     </div>
//   );
// };

// /* ---------- MAIN COMPONENT ---------- */
// export default function StatsSection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(containerRef, { amount: 0.2, once: true });

//   return (
//     // Reduced outer section padding
//     <section className="w-full bg-black py-4 md:py-4 lg:py-12 relative overflow-hidden">
      
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//       <div ref={containerRef} className="max-w-8xl mx-auto relative z-10">
        
//         {/* Header: Compact margins */}
//         <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-3 lg:mb-10 px-6 md:px-0 max-w-7x mx-auto">
//           <AestheticDot />
//           <motion.span 
//             initial={{ opacity: 0, x: -20 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8 }}
//             className="uppercase tracking-widest font-noto-sans text-[10px] md:text-lg text-gray-400"
//           >
//             Our Impact
//           </motion.span>
//         </div>

//         {/* Flex Container */}
//         <div className="flex flex-wrap border-y border-white/5 bg-black">
//           {stats.map((s, i) => (
//             <StatItem 
//               key={i} 
//               stat={s} 
//               index={i} 
//               inView={isInView} 
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AestheticDot from "@/components/AestheticDot";

/* ---------- DATA ---------- */
const stats = [
  { value: 300, suffix: "+", label: "Clients Served\nin FY25" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 120, suffix: "+", label: "Talent Pool" },
  { value: 95, suffix: "%", label: "Retention Rate" },
];

/* ---------- HOOK ---------- */
function useCount(target: number, play: boolean, durationMs = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!play) return;
    let start = 0;
    const stepMs = 16;
    const steps = Math.max(1, Math.floor(durationMs / stepMs));
    const increment = target / steps;
    const t = setInterval(() => {
      start += increment;
      if (start >= target) {
        setVal(target);
        clearInterval(t);
      } else {
        setVal(Math.floor(start));
      }
    }, stepMs);
    return () => clearInterval(t);
  }, [play, target, durationMs]);
  return val;
}

/* ---------- SINGLE STAT ITEM ---------- */
const StatItem = ({ stat, index, inView }: { stat: any; index: number; inView: boolean }) => {
  // Counting starts only when inView (which is now delayed) becomes true
  const count = useCount(stat.value, inView, 1500);

  return (
    <div 
      className={`
        relative flex flex-col items-center justify-center overflow-hidden group
        border-white/10
        w-1/2 md:w-1/4
        py-3 md:py-2 lg:py-12
        odd:border-r 
        [&:nth-child(-n+2)]:border-b 
        md:odd:border-r-0 
        md:[&:nth-child(-n+2)]:border-b-0
        md:border-r md:last:border-r-0
      `}
    >
      
      {/* 1. THE NUMBER */}
      <motion.div
        className="flex items-center justify-center z-0"
        initial={{ opacity: 1, scale: 1 }}
        // Animation triggers relative to the delayed inView prop
        animate={inView ? { opacity: 0.13, scale: 1 } : {}}
        transition={{ delay: 1.8 + (index * 0.1), duration: 0.8, ease: "easeInOut" }}
      >
        <span className="text-3xl sm:text-4xl font-noto-sans md:text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-none">
          {count}
          <span className="text-yellow-400 ml-0.5 text-xl sm:text-2xl md:text-3xl lg:text-6xl leading-none">{stat.suffix}</span>
        </span>
      </motion.div>

      {/* 2. THE LABEL */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.8 + (index * 0.1), duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-[10px] whitespace-pre-line font-noto-sans sm:text-xs md:text-sm lg:text-2xl font-light tracking-[0.15em] text-white drop-shadow-md text-center px-1">
          {stat.label}
        </span>
      </motion.div>
      
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
export default function StatsSection() {
  // 1. Ref moved to the numbers grid specifically
  const numbersRef = useRef<HTMLDivElement>(null);
  const isNumbersInView = useInView(numbersRef, { amount: 0.5, once: true });
  
  // 2. New state to handle the delay
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // 3. Effect to trigger animation 1.5s AFTER numbers are in view
  useEffect(() => {
    if (isNumbersInView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      },100); // 1.5 second delay
      return () => clearTimeout(timer);
    }
  }, [isNumbersInView]);

  return (
    <section className="w-full bg-black py-4 md:py-4 lg:py-12 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-8xl mx-auto relative z-10">
        
        {/* Header (Animates immediately upon seeing the section, independent of numbers) */}
        <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-3 lg:mb-10 px-6 md:px-0 max-w-7x mx-auto">
          <AestheticDot />
          <motion.span 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="uppercase tracking-widest font-noto-sans text-[10px] md:text-lg text-gray-400"
          >
            Our Impact
          </motion.span>
        </div>

        {/* Flex Container - Ref attached here to track numbers section specifically */}
        <div 
          ref={numbersRef} 
          className="flex flex-wrap border-y border-white/5 bg-black"
        >
          {stats.map((s, i) => (
            <StatItem 
              key={i} 
              stat={s} 
              index={i} 
              // Pass the delayed boolean
              inView={shouldAnimate} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}