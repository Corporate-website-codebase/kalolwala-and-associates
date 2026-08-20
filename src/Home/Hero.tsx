
"use client";

import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const [isHoveringRow, setIsHoveringRow] = useState(false);

  // Keep Framer Motion strictly for the complex custom cursor physics
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
    { text: "IGNITE", video: "/videos/Ignite_1.mp4", align: "left", fillIndices: [0, 1, 2], href: "/" ,poster:"/images/ignite.webp"},
    { text: "INNOVATE", video: "/videos/Innovate_1.mp4", align: "right", fillIndices: [4, 5, 6, 7], href: "/",poster:"/images/innovate.webp" },
    { text: "IMPACT", video: "/videos/Impact_1.mp4", align: "left", fillIndices: [0, 1, 2], href: "/about" ,poster:"/images/impact.webp"},
  ];

  const getFontSize = () => "clamp(6rem, 25vw, 32vh)";

  return (
    <section ref={ref} className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black">
      
      {/* 
        Injecting Pure CSS Keyframes.
        Restored exact Framer Motion logic: Letters start invisible (opacity: 0)
        and stagger in individually using precise animation delays.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes row-slide-left {
          0% { opacity: 0; transform: translateX(-200px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes row-slide-right {
          0% { opacity: 0; transform: translateX(200px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes text-outline-anim {
          0% { opacity: 0; -webkit-text-stroke: 1.75px white; color: transparent; }
          100% { opacity: 1; -webkit-text-stroke: 2.75px white; color: transparent; }
        }
        @keyframes text-fill-anim {
          0% { opacity: 1; color: transparent; -webkit-text-stroke: 2.75px white; }
          100% { opacity: 1; color: white; -webkit-text-stroke: 0px white; }
        }
        .hero-letter {
          opacity: 0; /* Base state matches Framer's hidden variant perfectly */
          color: transparent;
          -webkit-text-stroke: 1.75px white;
        }
      `}} />

      <AnimatePresence>
        {isInView && (
          <motion.div
            className="hidden lg:flex fixed top-0 left-0 z-[9999] pointer-events-none items-center justify-center bg-white text-black rounded-full w-12 h-12 mix-blend-difference"
            style={{ x: cursorXSpring, y: cursorYSpring }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isHoveringRow ? 1 : 0, opacity: isHoveringRow ? 1 : 0 }}
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
            {/* Row Slide Animation via CSS */}
            <div
              className="relative flex flex-1 overflow-hidden h-[33vh]"
              style={{
                animation: layer.align === "right" 
                  ? `row-slide-right 1.4s ease-out ${layerIndex * 0.5}s forwards` 
                  : `row-slide-left 1.4s ease-out ${layerIndex * 0.5}s forwards`,
                opacity: 0, 
                transform: `translateX(${layer.align === "right" ? 200 : -200}px)`
              }}
            >
              <div className="relative w-full h-full flex items-center">
                {layer.align === "left" ? (
                  <>
                    <div className="relative z-30 bg-black flex items-center justify-end lg:justify-start w-1/2 lg:w-auto h-[65%]">
                      <h2 className="leading-none tracking-tight whitespace-nowrap font-anton notranslate"
                        style={{ fontSize: getFontSize(), lineHeight: "1" }}>
                        {layer.text.split("").map((char, i) => (
                          layer.fillIndices.includes(i) ? (
                            <span key={i} className="inline-block hero-letter"
                              style={{
                                animation: `text-outline-anim 0.4s ease-in-out ${2 + i * 0.12}s forwards, text-fill-anim 0.8s ease-in-out ${3 + i * 0.08}s forwards`
                              }}>
                              {char}
                            </span>
                          ) : (
                            <span key={i} className="inline-block opacity-0 w-0 h-0 overflow-hidden">{char}</span>
                          )
                        ))}
                      </h2>
                    </div>

                    <div className="relative flex-none w-1/2 lg:flex-1 h-full overflow-hidden">
                      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10, backgroundColor: "black" }}>
                        <video
                          src={layer.video}
                          // poster={layer.poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
                      </div>

                      <div className="relative z-30 flex items-center justify-start h-full" style={{ mixBlendMode: "screen" }}>
                        <span aria-hidden="true" className="leading-none tracking-tight whitespace-nowrap font-anton block"
                          style={{ fontSize: getFontSize(), lineHeight: "1" }}>
                          {layer.text.split("").map((char, i) => (
                            !layer.fillIndices.includes(i) ? (
                              <span key={i} className="inline-block hero-letter"
                                style={{
                                  animation: `text-outline-anim 0.4s ease-in-out ${2 + i * 0.12}s forwards`
                                }}>
                                {char}
                              </span>
                            ) : null
                          ))}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative flex-none w-1/2 lg:flex-1 h-full overflow-hidden">
                      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10, backgroundColor: "black" }}>
                        <video
                          src={layer.video}
                          // poster={layer.poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />
                      </div>

                      <div className="relative z-30 flex items-center justify-end h-full" style={{ mixBlendMode: "screen" }}>
                        <span aria-hidden="true" className="leading-none tracking-tight whitespace-nowrap font-anton text-right block"
                          style={{ fontSize: getFontSize(), lineHeight: "1" }}>
                          {layer.text.split("").map((char, i) => (
                            !layer.fillIndices.includes(i) ? (
                              <span key={i} className="inline-block hero-letter"
                                style={{
                                  animation: `text-outline-anim 0.4s ease-in-out ${2 + i * 0.12}s forwards`
                                }}>
                                {char}
                              </span>
                            ) : null
                          ))}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-30 bg-black flex items-center justify-start lg:justify-end w-1/2 lg:w-auto h-[65%]">
                      <h2 className="leading-none tracking-tight whitespace-nowrap font-anton text-right notranslate"
                        style={{ fontSize: getFontSize(), lineHeight: "1" }}>
                        {layer.text.split("").map((char, i) => (
                          layer.fillIndices.includes(i) ? (
                            <span key={i} className="inline-block hero-letter"
                              style={{
                                animation: `text-outline-anim 0.4s ease-in-out ${2 + i * 0.12}s forwards, text-fill-anim 0.8s ease-in-out ${3 + i * 0.08}s forwards`
                              }}>
                              {char}
                            </span>
                          ) : (
                            <span key={i} className="inline-block opacity-0 w-0 h-0 overflow-hidden">{char}</span>
                          )
                        ))}
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;