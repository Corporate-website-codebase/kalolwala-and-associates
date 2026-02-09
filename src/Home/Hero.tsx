"use client";

import { motion, Variants, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 }); 
  const [animationStage, setAnimationStage] = useState<"video" | "outline" | "fill">("video");

  // === CUSTOM CURSOR STATE ===
  const [isHoveringRow, setIsHoveringRow] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isInView) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isInView]);

  const layers = [
    {
      text: "IGNITE",
      video: "/videos/Ignite.mp4",
      align: "left",
      fillIndices: [0, 1, 2], // 3 vs 3 (Balanced)
      href: "/",
    },
    {
      text: "INNOVATE",
      video: "/videos/Innovate.mp4",
      align: "right",
      fillIndices: [4, 5, 6, 7], // 4 vs 4 (Balanced)
      href: "/",
    },
    {
      text: "IMPACT",
      video: "/videos/Impact.mp4",
      align: "left",
      // FIX: Changed from [0, 1] to [0, 1, 2]
      // This makes it "IMP" (Left) and "ACT" (Right)
      // Now it is 3 letters vs 3 letters, creating a perfect center.
      fillIndices: [0, 1, 2], 
      href: "/about",
    },
  ];

  useEffect(() => {
    if (isInView) {
      setAnimationStage("video");
      const videoTimer = setTimeout(() => setAnimationStage("outline"), 2000);
      const fillTimer = setTimeout(() => setAnimationStage("fill"), 3000);
      return () => { clearTimeout(videoTimer); clearTimeout(fillTimer); };
    } else {
      setAnimationStage("video");
    }
  }, [isInView]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, color: "transparent", WebkitTextStroke: "1.75px white" },
    outline: (i: number) => ({
      opacity: 1, color: "transparent", WebkitTextStroke: "2.75px white",
      transition: { delay: i * 0.12, duration: 0.4, ease: "easeInOut" },
    }),
    fill: (i: number) => ({
      opacity: [0, 1], color: ["transparent", "white"], WebkitTextStroke: "0px",
      transition: { delay: i * 0.08, duration: 0.8, ease: "easeInOut" },
    }),
  } as any;

  // === FONT SIZE UPDATE ===
  const getFontSize = (text: string) => {
    if (text === "INNOVATE") {
        return "clamp(6rem, 25vw, 32vh)";
    }
    return "clamp(6rem, 25vw, 32vh)";
  };

  return (
    <section ref={ref} className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black">
      
      {/* === CUSTOM CURSOR === */}
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="hidden lg:flex fixed top-0 left-0 z-[9999] pointer-events-none items-center justify-center bg-white text-black rounded-full w-12 h-12 mix-blend-difference"
            style={{ 
              x: cursorXSpring, 
              y: cursorYSpring,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isHoveringRow ? 1 : 0, 
              opacity: isHoveringRow ? 1 : 0 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {layers.map((layer, layerIndex) => (
          <Link 
            key={layerIndex} 
            href={layer.href}
            onMouseEnter={() => setIsHoveringRow(true)}
            onMouseLeave={() => setIsHoveringRow(false)}
            className="block relative no-underline group lg:!cursor-none"
          >
            <motion.div
              className="relative flex flex-1 overflow-hidden h-[33vh]"
              initial={{ opacity: 0, x: layer.align === "right" ? 200 : -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: layerIndex * 0.5, duration: 1.4, ease: "easeOut" }}
            >
              <div className="relative w-full h-full flex items-center">
                
                {layer.align === "left" ? (
                  <>
                    {/* LEFT SIDE (Black Bg) */}
                    <div className="relative z-30 bg-black flex items-center justify-end lg:justify-start w-1/2 lg:w-auto h-[65%]">
                      <h2 className="leading-none tracking-tight whitespace-nowrap font-anton notranslate" 
                          style={{ fontSize: getFontSize(layer.text), lineHeight: "1" }}>
                        {layer.text.split("").map((char, i) => (
                          layer.fillIndices.includes(i) ? (
                            <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate={animationStage} className="inline-block">
                              {char}
                            </motion.span>
                          ) : null
                        ))}
                      </h2>
                    </div>
                    
                    {/* RIGHT SIDE (Video) */}
                    <div className="relative flex-none w-1/2 lg:flex-1 h-full overflow-hidden">
                      <motion.div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10, backgroundColor: "black" }}>
                        <div className="relative w-full h-full">
                          <video src={layer.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
                      </motion.div>
                      
                      <div className="relative z-30 flex items-center justify-start h-full" style={{ mixBlendMode: "screen" }}>
                        <h1 className="leading-none tracking-tight whitespace-nowrap font-anton" 
                            style={{ fontSize: getFontSize(layer.text), lineHeight: "1" }}>
                          {layer.text.split("").map((char, i) => (
                            !layer.fillIndices.includes(i) ? (
                              <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate={animationStage === "video" ? "hidden" : "outline"} className="inline-block">
                                {char}
                              </motion.span>
                            ) : null
                          ))}
                        </h1>  
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                     {/* LEFT SIDE (Video) - For Right Align Case */}
                    <div className="relative flex-none w-1/2 lg:flex-1 h-full overflow-hidden">
                      <motion.div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10, backgroundColor: "black" }}>
                        <div className="relative w-full h-full">
                          <video src={layer.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />
                      </motion.div>
                      
                      <div className="relative z-30 flex items-center justify-end h-full" style={{ mixBlendMode: "screen" }}>
                        <h1 className="leading-none tracking-tight whitespace-nowrap font-anton text-right" 
                            style={{ fontSize: getFontSize(layer.text), lineHeight: "1" }}>
                          {layer.text.split("").map((char, i) => (
                            !layer.fillIndices.includes(i) ? (
                              <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate={animationStage === "video" ? "hidden" : "outline"} className="inline-block">
                                {char}
                              </motion.span>
                            ) : null
                          ))}
                        </h1>
                      </div>
                    </div>
                    
                    {/* RIGHT SIDE (Black Bg) */}
                    <div className="relative z-30 bg-black flex items-center justify-start lg:justify-end w-1/2 lg:w-auto h-[65%]">
                      <h1 className="leading-none tracking-tight whitespace-nowrap font-anton text-right" 
                          style={{ fontSize: getFontSize(layer.text), lineHeight: "1" }}>
                        {layer.text.split("").map((char, i) => (
                          layer.fillIndices.includes(i) ? (
                            <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate={animationStage} className="inline-block">
                              {char}
                            </motion.span>
                          ) : null
                        ))}
                      </h1>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;