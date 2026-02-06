// // // "use client";
// // // import React, { FC, useEffect, useRef, useState } from "react";
// // // import Image from "next/image";
// // // import { gsap } from "gsap";
// // // import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// // // gsap.registerPlugin(MotionPathPlugin);

// // // type TileDef = { id: number; img?: string };
// // // const TILE_COUNT = 80;
// // // const TILES: TileDef[] = Array.from({ length: TILE_COUNT }).map((_, i) => ({
// // //   id: i + 1,
// // //   img: `/preview.jpg`,
// // // }));

// // // const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// // // const CosmicBlackHole: FC = () => {
// // //   const rootRef = useRef<HTMLDivElement | null>(null);
// // //   const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
// // //   const deckRefs = useRef<Array<HTMLDivElement | null>>([]);
// // //   const timelinesRef = useRef<gsap.core.Animation[]>([]);
// // //   const delayedCallsRef = useRef<gsap.core.Tween[]>([]);
// // //   const [transitioned, setTransitioned] = useState(false);
// // //   const [isInView, setIsInView] = useState(false);

// // //   const setTileRef = (i: number) => (el: HTMLDivElement | null) => {
// // //     tilesRef.current[i] = el;
// // //   };

// // //   const setDeckRef = (i: number) => (el: HTMLDivElement | null) => {
// // //     deckRefs.current[i] = el;
// // //   };

// // //   // helper to stop everything cleanly
// // //   const killAll = () => {
// // //     timelinesRef.current.forEach((t) => t.kill());
// // //     timelinesRef.current = [];
// // //     delayedCallsRef.current.forEach((c) => c.kill());
// // //     delayedCallsRef.current = [];
// // //   };

// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver(
// // //       ([entry]) => {
// // //         if (entry.isIntersecting) {
// // //           setIsInView(true);
// // //           observer.disconnect();
// // //         }
// // //       },
// // //       { threshold: 0.1 }
// // //     );

// // //     if (rootRef.current) {
// // //       observer.observe(rootRef.current);
// // //     }

// // //     return () => {
// // //       observer.disconnect();
// // //     };
// // //   }, []);

// // //   useEffect(() => {
// // //     const root = rootRef.current;
// // //     // Only run animations if the component is in view and not yet transitioned
// // //     if (!root || !isInView || transitioned) return;

// // //     killAll();

// // //     const rect = root.getBoundingClientRect();
// // //     const cw = rect.width;
// // //     const ch = rect.height;
// // //     const center = { x: cw / 2, y: ch / 2 };

// // //     const deckPositions = deckRefs.current.map((el) => {
// // //       if (!el) return { x: 0, y: 0, width: 0, height: 0 };
// // //       const deckRect = el.getBoundingClientRect();
// // //       return {
// // //         x: deckRect.left - rect.left + deckRect.width / 2,
// // //         y: deckRect.top - rect.top + deckRect.height / 2,
// // //         width: deckRect.width,
// // //         height: deckRect.height,
// // //       };
// // //     });

// // //     const buildPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
// // //       const mid1 = {
// // //         x: (start.x + end.x) / 2 + rand(-120, 120),
// // //         y: (start.y + end.y) / 2 + rand(-120, 120),
// // //       };
// // //       const mid2 = {
// // //         x: (mid1.x + end.x) / 2 + (center.x - end.x) * 0.15 + rand(-60, 60),
// // //         y: (mid1.y + end.y) / 2 + (center.y - end.y) * 0.15 + rand(-60, 60),
// // //       };
// // //       return [start, mid1, mid2, end];
// // //     };

// // //     const runTileAnimation = (el: HTMLDivElement) => {
// // //       if (!el) return;
// // //       el.style.position = "absolute";

// // //       const runOnce = () => {
// // //         if (transitioned) return;

// // //         const tl = gsap.timeline({
// // //           onComplete: () => {
// // //             const dc = gsap.delayedCall(rand(0.1, 1.5), () => runTileAnimation(el));
// // //             delayedCallsRef.current.push(dc);
// // //           },
// // //         });

// // //         const deckIndex = Math.floor(rand(0, 8));
// // //         const deckPos = deckPositions[deckIndex];
// // //         const start = {
// // //           x: deckPos.x + rand(-deckPos.width / 4, deckPos.width / 4),
// // //           y: deckPos.y + rand(-deckPos.height / 4, deckPos.height / 4),
// // //         };
// // //         const end = { x: center.x + rand(-30, 30), y: center.y + rand(-30, 30) };
// // //         const path = buildPath(start, end);

// // //         // "Dealing" animation from off-screen
// // //         tl.fromTo(el, {
// // //           x: start.x,
// // //           y: start.y,
// // //           scale: rand(0.8, 1.2),
// // //           opacity: 0,
// // //           rotation: 0,
// // //           transformOrigin: "50% 50%",
// // //           willChange: "transform, opacity",
// // //         }, {
// // //           x: start.x,
// // //           y: start.y,
// // //           opacity: 0.8,
// // //           duration: rand(0.4, 0.8),
// // //           ease: "power2.out",
// // //         });

// // //         // Main animation towards the center
// // //         const mainTl = gsap.timeline();
// // //         mainTl.to(el, {
// // //           duration: rand(3.5, 5.5),
// // //           ease: "power2.in",
// // //           motionPath: { path, type: "cubic", curviness: 1.15 },
// // //           scale: 0.28,
// // //           opacity: 0,
// // //         });
// // //         tl.add(mainTl, ">-0.2"); // Overlap slightly with the end of the dealing animation
// // //         timelinesRef.current.push(tl);
// // //       };

// // //       const initialDelay = gsap.delayedCall(rand(0, 5), runOnce);
// // //       delayedCallsRef.current.push(initialDelay);
// // //     };

// // //     tilesRef.current.forEach((el) => el && runTileAnimation(el));
// // //     const glow = root.querySelector<HTMLElement>(".bh-glow");
// // //     const glowTween = glow
// // //       ? gsap.to(glow, { scale: 1.12, opacity: 0.9, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" })
// // //       : null;

// // //     const handleMove = (e: MouseEvent) => {
// // //       if (transitioned) return;
// // //       const rx = (e.clientY / window.innerHeight - 0.5) * -3;
// // //       const ry = (e.clientX / window.innerWidth - 0.5) * 3;
// // //       gsap.to(root, {
// // //         rotationX: rx,
// // //         rotationY: ry,
// // //         duration: 0.9,
// // //         ease: "power2.out",
// // //         transformPerspective: 800,
// // //       });
// // //     };
// // //     window.addEventListener("mousemove", handleMove);

// // //     const onWheel = (e: WheelEvent) => {
// // //       if (e.deltaY > 10 && !transitioned) setTransitioned(true);
// // //     };
// // //     root.addEventListener("wheel", onWheel);

// // //     const resizeHandler = () => {
// // //       if (!transitioned) {
// // //         killAll();
// // //         // The main useEffect will re-run and restart the animation on resize.
// // //       }
// // //     };
// // //     window.addEventListener("resize", resizeHandler);

// // //     return () => {
// // //       killAll();
// // //       glowTween?.kill();
// // //       window.removeEventListener("mousemove", handleMove);
// // //       root.removeEventListener("wheel", onWheel);
// // //       window.removeEventListener("resize", resizeHandler);
// // //     };
// // //   }, [transitioned, isInView]);

// // //   useEffect(() => {
// // //     if (!transitioned) return;

// // //     killAll(); // ensure absolutely no overlap

// // //     const root = rootRef.current;
// // //     if (!root) return;
// // //     const rect = root.getBoundingClientRect();
// // //     const cw = rect.width;
// // //     const ch = rect.height;
// // //     const center = { x: cw / 2, y: ch / 2 };

// // //     const TILE_WIDTH = 120;
// // //     const TILE_HEIGHT = 150;

// // //     const selected = [...tilesRef.current].sort(() => 0.5 - Math.random()).slice(0, 5);
// // //     const others = tilesRef.current.filter((el) => !selected.includes(el));

// // //     gsap.killTweensOf(tilesRef.current); // freeze all current tweens

// // //     others.forEach((el) => el && gsap.to(el, { opacity: 0, duration: 1.2, ease: "power2.out" }));
    
// // //     const positions: { x: number; y: number }[] = [];
// // //     const isOverlapping = (x: number, y: number) => {
// // //       for (const pos of positions) {
// // //         if (Math.abs(x - pos.x) < TILE_WIDTH && Math.abs(y - pos.y) < TILE_HEIGHT) {
// // //           return true;
// // //         }
// // //       }
// // //       return false;
// // //     };
    
// // //     selected.forEach((el) => {
// // //       if (!el) return;
// // //       let x: number, y: number;
// // //       let attempts = 0;
// // //       const maxAttempts = 20;

// // //       do {
// // //         x = rand(100, cw - 100 - TILE_WIDTH);
// // //         y = rand(100, ch - 100 - TILE_HEIGHT);
// // //         attempts++;
// // //       } while (
// // //         (Math.abs(x + TILE_WIDTH / 2 - center.x) < 200 && Math.abs(y + TILE_HEIGHT / 2 - center.y) < 200) ||
// // //         (isOverlapping(x, y) && attempts < maxAttempts)
// // //       );

// // //       positions.push({ x, y });
// // //       const finalY = y;

// // //       gsap.to(el, {
// // //         x,
// // //         y,
// // //         scale: 1,
// // //         opacity: 1,
// // //         rotation: 0,
// // //         duration: 2,
// // //         ease: "power3.out",
// // //         onComplete: () => {
// // //           if (!el) return;
// // //           const floatTl = gsap.to(el, {
// // //             y: finalY + rand(-20, 20),
// // //             duration: rand(1.5, 3),
// // //             ease: "sine.inOut",
// // //             yoyo: true,
// // //             repeat: -1,
// // //           });
// // //           timelinesRef.current.push(floatTl);
// // //         }
// // //       }
// // //     ,);
// // //     });

// // //     gsap.fromTo(
// // //       ".new-heading",
// // //       { opacity: 0, scale: 0.8 },
// // //       { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: "power3.out" }
// // //     );
// // //   }, [transitioned]);


// // //   return (
// // //     <section
// // //       ref={rootRef}
// // //       className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
// // //       style={{ perspective: 900, transformStyle: "preserve-3d" }}
// // //     >
// // //       <div
// // //         aria-hidden
// // //         className="absolute inset-0"
// // //         style={{
// // //           background:
// // //             "radial-gradient(#ffffff06 1px, transparent 1px), radial-gradient(#ffffff03 1px, transparent 1px)",
// // //           backgroundSize: "40px 40px, 80px 80px",
// // //           opacity: 1,
// // //           mixBlendMode: "screen",
// // //         }}
// // //       />

// // //       <div
// // //         className="absolute z-30 bh-glow"
// // //         style={{
// // //           width: 360,
// // //           height: 360,
// // //           borderRadius: "50%",
// // //           background:
// // //             "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.12) 0%, rgba(40,120,255,0.06) 22%, rgba(0,0,0,0.9) 60%)",
// // //           filter: "blur(36px)",
// // //         }}
// // //       />

// // //       {!transitioned && (
// // //         <div className="relative z-40 text-center pointer-events-none">
// // //           <h1
// // //             style={{
// // //               color: "#fff",
// // //               fontSize: "clamp(38px, 9vw, 96px)",
// // //               letterSpacing: "0.14em",
// // //               margin: 0,
// // //               fontWeight: 800,
// // //             }}
// // //           >
// // //             K&A
// // //           </h1>
// // //           <p style={{ color: "#98a7bf", marginTop: 8 }}>
// // //             A Place for{" "}
// // //             <span
// // //               style={{
// // //                 border: "1px solid rgba(255,255,255,0.06)",
// // //                 padding: "6px 12px",
// // //                 borderRadius: 18,
// // //               }}
// // //             >
// // //               artists
// // //             </span>
// // //           </p>
// // //         </div>
// // //       )}

// // //       {transitioned && (
// // //         <div className="absolute new-heading text-center z-50 text-white font-bold text-5xl">
// // //           The Collective
// // //         </div>
// // //       )}

// // //       {!transitioned &&
// // //         [
// // //           { top: 30, left: 30 }, // Top-left
// // //           { top: 30, left: "50%", transform: "translateX(-50%)" }, // Top-center
// // //           { top: 30, right: 30 }, // Top-right
// // //           { top: "50%", right: 30, transform: "translateY(-50%)" }, // Right-center
// // //           { bottom: 30, right: 30 }, // Bottom-right
// // //           { bottom: 30, left: "50%", transform: "translateX(-50%)" }, // Bottom-center
// // //           { bottom: 30, left: 30 }, // Bottom-left
// // //           { top: "50%", left: 30, transform: "translateY(-50%)" }, // Left-center
// // //         ].map((style, i) => (
// // //           <div
// // //             key={i}
// // //             ref={setDeckRef(i)}
// // //             className="absolute"
// // //             style={{
// // //               width: 90,
// // //               height: 120,
// // //               background: "#080808",
// // //               border: "1px solid rgba(255,255,255,0.04)",
// // //               borderRadius: 8,
// // //               boxShadow:
// // //                 "0 0 0 4px #000, 0 0 0 5px rgba(255,255,255,0.04), inset 0 0 25px rgba(0,0,0,0.8)",
// // //               transformStyle: "preserve-3d",
// // //               ...style,
// // //             }}
// // //           >
// // //             <div
// // //               className="absolute w-full h-full"
// // //               style={{
// // //                 background: "radial-gradient(circle at center, #ffffff05, #ffffff00 60%)",
// // //               }}
// // //             />
// // //           </div>
// // //         ))}

// // //       {TILES.map((t, i) => (
// // //         <div
// // //           key={t.id}
// // //           ref={setTileRef(i)}
// // //           style={{
// // //             position: "absolute",
// // //             left: 0,
// // //             top: 0,
// // //             width: 180,
// // //             height: 240,
// // //             borderRadius: 12,
// // //             overflow: "hidden",
// // //             boxShadow: "0 8px 36px rgba(0,0,0,0.7)",
// // //             cursor: "pointer",
// // //             background: "#0b0b0b",
// // //             zIndex: 20,
// // //           }}
// // //         >
// // //           {t.img ? (
// // //             <Image
// // //               src={t.img}
// // //               alt={`tile-${t.id}`}
// // //               fill
// // //               sizes="120px"
// // //               style={{
// // //                 objectFit: "cover",
// // //                 transition: "filter 0.4s ease, opacity 0.4s ease",
// // //               }}
// // //             />
// // //           ) : (
// // //             <div
// // //               style={{
// // //                 width: "100%",
// // //                 height: "100%",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //                 color: "#fff",
// // //               }}
// // //             >
// // //               {t.id}
// // //             </div>
// // //           )}
// // //         </div>
// // //       ))}
// // //     </section>
// // //   );
// // // };

// // // export default CosmicBlackHole;


// // // app/components/CosmicBlackHole.tsx
// // "use client";
// // import React, { FC, useEffect, useRef, useState } from "react";
// // import Image from "next/image";
// // import { gsap } from "gsap";
// // import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// // type TileDef = { id: number; img?: string };
// // const TILE_COUNT = 80;
// // const TILES: TileDef[] = Array.from({ length: TILE_COUNT }).map((_, i) => ({
// //   id: i + 1,
// //   // local path (uploaded file)
// //   img: `/mnt/data/preview.jpg`,
// // }));

// // const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// // const CosmicBlackHole: FC = () => {
// //   const rootRef = useRef<HTMLDivElement | null>(null);
// //   const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
// //   const deckRefs = useRef<Array<HTMLDivElement | null>>([]);
// //   const timelinesRef = useRef<gsap.core.Animation[]>([]);
// //   const delayedCallsRef = useRef<gsap.core.Tween[]>([]);
// //   const scrollTriggerPinRef = useRef<ScrollTrigger | null>(null);
// //   const scrollTriggerProgressRef = useRef<ScrollTrigger | null>(null);

// //   const [transitioned, setTransitioned] = useState(false);
// //   const [isInView, setIsInView] = useState(false);

// //   const setTileRef = (i: number) => (el: HTMLDivElement | null) => {
// //     tilesRef.current[i] = el;
// //   };

// //   const setDeckRef = (i: number) => (el: HTMLDivElement | null) => {
// //     deckRefs.current[i] = el;
// //   };

// //   // helper to stop everything cleanly
// //   const killAll = () => {
// //     timelinesRef.current.forEach((t) => t.kill());
// //     timelinesRef.current = [];
// //     delayedCallsRef.current.forEach((c) => c.kill());
// //     delayedCallsRef.current = [];
// //   };

// //   // ---------------------
// //   // PIN & PROGRESS TRIGGERS (NEW)
// //   // ---------------------
// //   useEffect(() => {
// //     const root = rootRef.current;
// //     if (!root) return;

// //     // Kill any previous triggers
// //     scrollTriggerPinRef.current?.kill();
// //     scrollTriggerProgressRef.current?.kill();

// //     // Pin the section when it reaches top of viewport.
// //     // end value controls how long it stays pinned. Using "100%" so the section is pinned for one viewport height of scroll.
// //     const pin = ScrollTrigger.create({
// //       trigger: root,
// //       start: "top top",
// //       end: "+=100%",
// //       pin: true,
// //       pinSpacing: false,
// //       anticipatePin: 1,
// //       onEnter: () => {
// //         // section became active
// //         setIsInView(true);
// //         // reset transition state so blackhole effect runs fresh on each entry
// //         setTransitioned(false);
// //       },
// //       onEnterBack: () => {
// //         setIsInView(true);
// //         setTransitioned(false);
// //       },
// //       onLeave: () => {
// //         // leaving downward
// //         setIsInView(false);
// //         setTransitioned(false);
// //         // stop/cleanup running animations so it restarts next time
// //         killAll();
// //       },
// //       onLeaveBack: () => {
// //         // leaving upward
// //         setIsInView(false);
// //         setTransitioned(false);
// //         killAll();
// //       },
// //     });

// //     // Progress trigger inside the pinned area to flip `transitioned` once user scrolls past a threshold
// //     const prog = ScrollTrigger.create({
// //       trigger: root,
// //       start: "top top",
// //       end: "+=100%",
// //       scrub: false, // we want a threshold-triggered effect, not scrub controlled
// //       onUpdate: (self) => {
// //         // when progress crosses threshold -> show The Collective
// //         const thresholdOn = 0.30; // user-chosen threshold
// //         const thresholdOff = 0.20; // hysteresis so it doesn't jitter
// //         if (self.progress >= thresholdOn && !transitioned) {
// //           setTransitioned(true);
// //         } else if (self.progress <= thresholdOff && transitioned) {
// //           // if user scrolls back above thresholdOff, hide it again
// //           setTransitioned(false);
// //         }
// //       },
// //     });

// //     scrollTriggerPinRef.current = pin;
// //     scrollTriggerProgressRef.current = prog;

// //     return () => {
// //       pin.kill();
// //       prog.kill();
// //       scrollTriggerPinRef.current = null;
// //       scrollTriggerProgressRef.current = null;
// //     };
// //   }, [/* no deps so it runs once on mount */]);

// //   // ---------------------
// //   // MAIN BLACKHOLE ANIMATION — runs when isInView becomes true and not yet transitioned
// //   // (retains your original logic, only respects isInView)
// //   // ---------------------
// //   useEffect(() => {
// //     const root = rootRef.current;
// //     // Only run animations if the component is in view and not yet transitioned
// //     if (!root || !isInView || transitioned) return;

// //     killAll();

// //     const rect = root.getBoundingClientRect();
// //     const cw = rect.width;
// //     const ch = rect.height;
// //     const center = { x: cw / 2, y: ch / 2 };

// //     const deckPositions = deckRefs.current.map((el) => {
// //       if (!el) return { x: 0, y: 0, width: 0, height: 0 };
// //       const deckRect = el.getBoundingClientRect();
// //       return {
// //         x: deckRect.left - rect.left + deckRect.width / 2,
// //         y: deckRect.top - rect.top + deckRect.height / 2,
// //         width: deckRect.width,
// //         height: deckRect.height,
// //       };
// //     });

// //     const buildPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
// //       const mid1 = {
// //         x: (start.x + end.x) / 2 + rand(-120, 120),
// //         y: (start.y + end.y) / 2 + rand(-120, 120),
// //       };
// //       const mid2 = {
// //         x: (mid1.x + end.x) / 2 + (center.x - end.x) * 0.15 + rand(-60, 60),
// //         y: (mid1.y + end.y) / 2 + (center.y - end.y) * 0.15 + rand(-60, 60),
// //       };
// //       return [start, mid1, mid2, end];
// //     };

// //     const runTileAnimation = (el: HTMLDivElement) => {
// //       if (!el) return;
// //       el.style.position = "absolute";

// //       const runOnce = () => {
// //         if (transitioned) return;

// //         const tl = gsap.timeline({
// //           onComplete: () => {
// //             const dc = gsap.delayedCall(rand(0.1, 1.5), () => runTileAnimation(el));
// //             delayedCallsRef.current.push(dc);
// //           },
// //         });

// //         const deckIndex = Math.floor(rand(0, Math.max(1, deckPositions.length)));
// //         const deckPos = deckPositions[deckIndex] || { x: rand(0, cw), y: rand(0, ch), width: 120, height: 160 };
// //         const start = {
// //           x: deckPos.x + rand(-deckPos.width / 4, deckPos.width / 4),
// //           y: deckPos.y + rand(-deckPos.height / 4, deckPos.height / 4),
// //         };
// //         const end = { x: center.x + rand(-30, 30), y: center.y + rand(-30, 30) };
// //         const path = buildPath(start, end);

// //         // "Dealing" animation from deck position
// //         tl.fromTo(
// //           el,
// //           {
// //             x: start.x,
// //             y: start.y,
// //             scale: rand(0.8, 1.2),
// //             opacity: 0,
// //             rotation: 0,
// //             transformOrigin: "50% 50%",
// //             willChange: "transform, opacity",
// //           },
// //           {
// //             x: start.x,
// //             y: start.y,
// //             opacity: 0.8,
// //             duration: rand(0.4, 0.8),
// //             ease: "power2.out",
// //           }
// //         );

// //         // Main animation towards the center
// //         const mainTl = gsap.timeline();
// //         mainTl.to(el, {
// //           duration: rand(3.5, 5.5),
// //           ease: "power2.in",
// //           motionPath: { path, type: "cubic", curviness: 1.15 },
// //           scale: 0.28,
// //           opacity: 0,
// //         });
// //         tl.add(mainTl, ">-0.2"); // Overlap slightly with the end of the dealing animation
// //         timelinesRef.current.push(tl);
// //       };

// //       const initialDelay = gsap.delayedCall(rand(0, 5), runOnce);
// //       delayedCallsRef.current.push(initialDelay);
// //     };

// //     tilesRef.current.forEach((el) => el && runTileAnimation(el));
// //     const glow = root.querySelector<HTMLElement>(".bh-glow");
// //     const glowTween = glow
// //       ? gsap.to(glow, { scale: 1.12, opacity: 0.9, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" })
// //       : null;

// //     const handleMove = (e: MouseEvent) => {
// //       if (transitioned) return;
// //       const rx = (e.clientY / window.innerHeight - 0.5) * -3;
// //       const ry = (e.clientX / window.innerWidth - 0.5) * 3;
// //       gsap.to(root, {
// //         rotationX: rx,
// //         rotationY: ry,
// //         duration: 0.9,
// //         ease: "power2.out",
// //         transformPerspective: 800,
// //       });
// //     };
// //     window.addEventListener("mousemove", handleMove);

// //     const onWheel = (e: WheelEvent) => {
// //       // preserve original behavior: when user scrolls enough, transition to the "The Collective" cluster
// //       if (e.deltaY > 10 && !transitioned) {
// //         setTransitioned(true);
// //       }
// //     };
// //     // attach wheel on the root so it reacts while pinned
// //     root.addEventListener("wheel", onWheel);

// //     const resizeHandler = () => {
// //       if (!transitioned) {
// //         killAll();
// //         // the main useEffect will re-run and restart the animation on resize.
// //       }
// //     };
// //     window.addEventListener("resize", resizeHandler);

// //     return () => {
// //       killAll();
// //       glowTween?.kill();
// //       window.removeEventListener("mousemove", handleMove);
// //       root.removeEventListener("wheel", onWheel);
// //       window.removeEventListener("resize", resizeHandler);
// //     };
// //   }, [transitioned, isInView]);

// //   // ---------------------
// //   // AFTER transition (showing the "The Collective" cluster) — original behavior retained
// //   // ---------------------
// //   useEffect(() => {
// //     if (!transitioned) return;

// //     killAll(); // ensure absolutely no overlap

// //     const root = rootRef.current;
// //     if (!root) return;
// //     const rect = root.getBoundingClientRect();
// //     const cw = rect.width;
// //     const ch = rect.height;
// //     const center = { x: cw / 2, y: ch / 2 };

// //     const TILE_WIDTH = 120;
// //     const TILE_HEIGHT = 150;

// //     const selected = [...tilesRef.current].sort(() => 0.5 - Math.random()).slice(0, 5);
// //     const others = tilesRef.current.filter((el) => !selected.includes(el));

// //     gsap.killTweensOf(tilesRef.current); // freeze all current tweens

// //     others.forEach((el) => el && gsap.to(el, { opacity: 0, duration: 1.2, ease: "power2.out" }));

// //     const positions: { x: number; y: number }[] = [];
// //     const isOverlapping = (x: number, y: number) => {
// //       for (const pos of positions) {
// //         if (Math.abs(x - pos.x) < TILE_WIDTH && Math.abs(y - pos.y) < TILE_HEIGHT) {
// //           return true;
// //         }
// //       }
// //       return false;
// //     };

// //     selected.forEach((el) => {
// //       if (!el) return;
// //       let x: number, y: number;
// //       let attempts = 0;
// //       const maxAttempts = 20;

// //       do {
// //         x = rand(100, cw - 100 - TILE_WIDTH);
// //         y = rand(100, ch - 100 - TILE_HEIGHT);
// //         attempts++;
// //       } while (
// //         (Math.abs(x + TILE_WIDTH / 2 - center.x) < 200 && Math.abs(y + TILE_HEIGHT / 2 - center.y) < 200) ||
// //         (isOverlapping(x, y) && attempts < maxAttempts)
// //       );

// //       positions.push({ x, y });
// //       const finalY = y;

// //       gsap.to(el, {
// //         x,
// //         y,
// //         scale: 1,
// //         opacity: 1,
// //         rotation: 0,
// //         duration: 2,
// //         ease: "power3.out",
// //         onComplete: () => {
// //           if (!el) return;
// //           const floatTl = gsap.to(el, {
// //             y: finalY + rand(-20, 20),
// //             duration: rand(1.5, 3),
// //             ease: "sine.inOut",
// //             yoyo: true,
// //             repeat: -1,
// //           });
// //           timelinesRef.current.push(floatTl);
// //         },
// //       });
// //     });

// //     gsap.fromTo(".new-heading", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: "power3.out" });
// //   }, [transitioned]);

// //   return (
// //     <section
// //       ref={rootRef}
// //       className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
// //       style={{ perspective: 900, transformStyle: "preserve-3d" }}
// //     >
// //       <div
// //         aria-hidden
// //         className="absolute inset-0"
// //         style={{
// //           background: "radial-gradient(#ffffff06 1px, transparent 1px), radial-gradient(#ffffff03 1px, transparent 1px)",
// //           backgroundSize: "40px 40px, 80px 80px",
// //           opacity: 1,
// //           mixBlendMode: "screen",
// //         }}
// //       />

// //       <div
// //         className="absolute z-30 bh-glow"
// //         style={{
// //           width: 360,
// //           height: 360,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.12) 0%, rgba(40,120,255,0.06) 22%, rgba(0,0,0,0.9) 60%)",
// //           filter: "blur(36px)",
// //         }}
// //       />

// //       {!transitioned && (
// //         <div className="relative z-40 text-center pointer-events-none">
// //           <h1
// //             style={{
// //               color: "#fff",
// //               fontSize: "clamp(38px, 9vw, 96px)",
// //               letterSpacing: "0.14em",
// //               margin: 0,
// //               fontWeight: 800,
// //             }}
// //           >
// //             K&A
// //           </h1>
// //           <p style={{ color: "#98a7bf", marginTop: 8 }}>
// //             A Place for{" "}
// //             <span
// //               style={{
// //                 border: "1px solid rgba(255,255,255,0.06)",
// //                 padding: "6px 12px",
// //                 borderRadius: 18,
// //               }}
// //             >
// //               artists
// //             </span>
// //           </p>
// //         </div>
// //       )}

// //       {transitioned && (
// //         <div className="absolute new-heading text-center z-50 text-white font-bold text-5xl">The Collective</div>
// //       )}

// //       {!transitioned &&
// //         [
// //           { top: 30, left: 30 }, // Top-left
// //           { top: 30, left: "50%", transform: "translateX(-50%)" }, // Top-center
// //           { top: 30, right: 30 }, // Top-right
// //           { top: "50%", right: 30, transform: "translateY(-50%)" }, // Right-center
// //           { bottom: 30, right: 30 }, // Bottom-right
// //           { bottom: 30, left: "50%", transform: "translateX(-50%)" }, // Bottom-center
// //           { bottom: 30, left: 30 }, // Bottom-left
// //           { top: "50%", left: 30, transform: "translateY(-50%)" }, // Left-center
// //         ].map((style, i) => (
// //           <div
// //             key={i}
// //             ref={setDeckRef(i)}
// //             className="absolute"
// //             style={{
// //               width: 90,
// //               height: 120,
// //               background: "#080808",
// //               border: "1px solid rgba(255,255,255,0.04)",
// //               borderRadius: 8,
// //               boxShadow: "0 0 0 4px #000, 0 0 0 5px rgba(255,255,255,0.04), inset 0 0 25px rgba(0,0,0,0.8)",
// //               transformStyle: "preserve-3d",
// //               ...style,
// //             }}
// //           >
// //             <div
// //               className="absolute w-full h-full"
// //               style={{
// //                 background: "radial-gradient(circle at center, #ffffff05, #ffffff00 60%)",
// //               }}
// //             />
// //           </div>
// //         ))}

// //       {TILES.map((t, i) => (
// //         <div
// //           key={t.id}
// //           ref={setTileRef(i)}
// //           style={{
// //             position: "absolute",
// //             left: 0,
// //             top: 0,
// //             width: 180,
// //             height: 240,
// //             borderRadius: 12,
// //             overflow: "hidden",
// //             boxShadow: "0 8px 36px rgba(0,0,0,0.7)",
// //             cursor: "pointer",
// //             background: "#0b0b0b",
// //             zIndex: 20,
// //           }}
// //         >
// //           {t.img ? (
// //             <Image
// //               src={t.img}
// //               alt={`tile-${t.id}`}
// //               fill
// //               sizes="120px"
// //               style={{
// //                 objectFit: "cover",
// //                 transition: "filter 0.4s ease, opacity 0.4s ease",
// //               }}
// //             />
// //           ) : (
// //             <div
// //               style={{
// //                 width: "100%",
// //                 height: "100%",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 color: "#fff",
// //               }}
// //             >
// //               {t.id}
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </section>
// //   );
// // };

// // export default CosmicBlackHole;


// "use client";
// import React, { FC, useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// type TileDef = { id: number; img?: string };
// const TILE_COUNT = 80;
// const TILES: TileDef[] = Array.from({ length: TILE_COUNT }).map((_, i) => ({
//   id: i + 1,
//   // local path (uploaded file) — kept as you provided
//   img: `/mnt/data/preview.jpg`,
// }));

// const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// const CosmicBlackHole: FC = () => {
//   const rootRef = useRef<HTMLDivElement | null>(null);
//   const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
//   const deckRefs = useRef<Array<HTMLDivElement | null>>([]);
//   const timelinesRef = useRef<gsap.core.Animation[]>([]);
//   const delayedCallsRef = useRef<gsap.core.Tween[]>([]);
//   const scrollTriggerPinRef = useRef<ScrollTrigger | null>(null);
//   const scrollTriggerProgressRef = useRef<ScrollTrigger | null>(null);

//   const [transitioned, setTransitioned] = useState(false);
//   const [isInView, setIsInView] = useState(false);

//   const setTileRef = (i: number) => (el: HTMLDivElement | null) => {
//     tilesRef.current[i] = el;
//   };

//   const setDeckRef = (i: number) => (el: HTMLDivElement | null) => {
//     deckRefs.current[i] = el;
//   };

//   // helper to stop everything cleanly
//   const killAll = () => {
//     timelinesRef.current.forEach((t) => t.kill());
//     timelinesRef.current = [];
//     delayedCallsRef.current.forEach((c) => c.kill());
//     delayedCallsRef.current = [];
//   };

//   // Reset tile styles back to initial state (used on leave)
//   const resetTiles = () => {
//     tilesRef.current.forEach((el) => {
//       if (!el) return;
//       gsap.killTweensOf(el);
//       el.style.opacity = "0";
//       el.style.transform = "translate3d(0px,0px,0px) scale(1)";
//       // reset left/top so they start from 0,0 next time
//       el.style.left = "0px";
//       el.style.top = "0px";
//     });
//   };

//   // ---------------------
//   // PIN & PROGRESS TRIGGERS (NEW)
//   // ---------------------
//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return;

//     // Kill any previous triggers
//     scrollTriggerPinRef.current?.kill();
//     scrollTriggerProgressRef.current?.kill();

//     // Pin the section when it reaches top of viewport.
//     // end value controls how long it stays pinned. Using "+=100%" so it's pinned for one viewport worth of scroll.
//     const pin = ScrollTrigger.create({
//       trigger: root,
//       start: "top top",
//       end: "+=100%",
//       pin: true,
//       pinSpacing: false,
//       anticipatePin: 1,
//       // markers: true, // enable for debugging if needed
//       onEnter: () => {
//         // section became active
//         setIsInView(true);
//         // reset transition state so blackhole effect runs fresh on each entry
//         setTransitioned(false);
//         // ensure tiles are visually reset
//         resetTiles();
//       },
//       onEnterBack: () => {
//         setIsInView(true);
//         setTransitioned(false);
//         resetTiles();
//       },
//       onLeave: () => {
//         // leaving downward
//         setIsInView(false);
//         setTransitioned(false);
//         // stop/cleanup running animations so it restarts next time
//         killAll();
//         resetTiles();
//       },
//       onLeaveBack: () => {
//         // leaving upward
//         setIsInView(false);
//         setTransitioned(false);
//         killAll();
//         resetTiles();
//       },
//     });

//     // Progress trigger inside the pinned area to flip `transitioned` once user scrolls past a threshold.
//     // This ensures a tiny scroll while pinned triggers the "collective" state — without letting the page scroll away.
//     const prog = ScrollTrigger.create({
//       trigger: root,
//       start: "top top",
//       end: "+=100%",
//       scrub: false,
//       // markers: true,
//       onUpdate: (self) => {
//         // when progress crosses threshold -> show The Collective
//         const thresholdOn = 0.30; // user-chosen threshold
//         const thresholdOff = 0.20; // hysteresis so it doesn't jitter
//         if (self.progress >= thresholdOn && !transitioned) {
//           setTransitioned(true);
//         } else if (self.progress <= thresholdOff && transitioned) {
//           // if user scrolls back above thresholdOff, hide it again
//           setTransitioned(false);
//         }
//       },
//     });

//     scrollTriggerPinRef.current = pin;
//     scrollTriggerProgressRef.current = prog;

//     // ensure ScrollTrigger recalculates if layout changes
//     ScrollTrigger.refresh();

//     return () => {
//       pin.kill();
//       prog.kill();
//       scrollTriggerPinRef.current = null;
//       scrollTriggerProgressRef.current = null;
//     };
//   }, []); // run once on mount

//   // ---------------------
//   // MAIN BLACKHOLE ANIMATION — runs when isInView becomes true and not yet transitioned
//   // (retains original logic, only respects isInView)
//   // ---------------------
//   useEffect(() => {
//     const root = rootRef.current;
//     // Only run animations if the component is in view and not yet transitioned
//     if (!root || !isInView || transitioned) return;

//     killAll();

//     const rect = root.getBoundingClientRect();
//     const cw = rect.width;
//     const ch = rect.height;
//     const center = { x: cw / 2, y: ch / 2 };

//     const deckPositions = deckRefs.current.map((el) => {
//       if (!el) return { x: 0, y: 0, width: 0, height: 0 };
//       const deckRect = el.getBoundingClientRect();
//       return {
//         x: deckRect.left - rect.left + deckRect.width / 2,
//         y: deckRect.top - rect.top + deckRect.height / 2,
//         width: deckRect.width,
//         height: deckRect.height,
//       };
//     });

//     const buildPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
//       const mid1 = {
//         x: (start.x + end.x) / 2 + rand(-120, 120),
//         y: (start.y + end.y) / 2 + rand(-120, 120),
//       };
//       const mid2 = {
//         x: (mid1.x + end.x) / 2 + (center.x - end.x) * 0.15 + rand(-60, 60),
//         y: (mid1.y + end.y) / 2 + (center.y - end.y) * 0.15 + rand(-60, 60),
//       };
//       return [start, mid1, mid2, end];
//     };

//     const runTileAnimation = (el: HTMLDivElement) => {
//       if (!el) return;
//       el.style.position = "absolute";

//       const runOnce = () => {
//         if (transitioned) return;

//         const tl = gsap.timeline({
//           onComplete: () => {
//             const dc = gsap.delayedCall(rand(0.1, 1.5), () => runTileAnimation(el));
//             delayedCallsRef.current.push(dc);
//           },
//         });

//         const deckIndex = Math.floor(rand(0, Math.max(1, deckPositions.length)));
//         const deckPos = deckPositions[deckIndex] || { x: rand(0, cw), y: rand(0, ch), width: 120, height: 160 };
//         const start = {
//           x: deckPos.x + rand(-deckPos.width / 4, deckPos.width / 4),
//           y: deckPos.y + rand(-deckPos.height / 4, deckPos.height / 4),
//         };
//         const end = { x: center.x + rand(-30, 30), y: center.y + rand(-30, 30) };
//         const path = buildPath(start, end);

//         // "Dealing" animation from deck position
//         tl.fromTo(
//           el,
//           {
//             x: start.x,
//             y: start.y,
//             scale: rand(0.8, 1.2),
//             opacity: 0,
//             rotation: 0,
//             transformOrigin: "50% 50%",
//             willChange: "transform, opacity",
//           },
//           {
//             x: start.x,
//             y: start.y,
//             opacity: 0.8,
//             duration: rand(0.4, 0.8),
//             ease: "power2.out",
//           }
//         );

//         // Main animation towards the center
//         const mainTl = gsap.timeline();
//         mainTl.to(el, {
//           duration: rand(3.5, 5.5),
//           ease: "power2.in",
//           motionPath: { path, type: "cubic", curviness: 1.15 },
//           scale: 0.28,
//           opacity: 0,
//         });
//         tl.add(mainTl, ">-0.2"); // Overlap slightly with the end of the dealing animation
//         timelinesRef.current.push(tl);
//       };

//       const initialDelay = gsap.delayedCall(rand(0, 5), runOnce);
//       delayedCallsRef.current.push(initialDelay);
//     };

//     tilesRef.current.forEach((el) => el && runTileAnimation(el));
//     const glow = root.querySelector<HTMLElement>(".bh-glow");
//     const glowTween = glow
//       ? gsap.to(glow, { scale: 1.12, opacity: 0.9, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" })
//       : null;

//     const handleMove = (e: MouseEvent) => {
//       if (transitioned) return;
//       const rx = (e.clientY / window.innerHeight - 0.5) * -3;
//       const ry = (e.clientX / window.innerWidth - 0.5) * 3;
//       gsap.to(root, {
//         rotationX: rx,
//         rotationY: ry,
//         duration: 0.9,
//         ease: "power2.out",
//         transformPerspective: 800,
//       });
//     };
//     window.addEventListener("mousemove", handleMove);

//     const onWheel = (e: WheelEvent) => {
//       // preserve original behavior: when user scrolls enough, transition to the "The Collective" cluster
//       if (e.deltaY > 10 && !transitioned) {
//         setTransitioned(true);
//       }
//     };
//     // attach wheel on the root so it reacts while pinned
//     root.addEventListener("wheel", onWheel, { passive: true });

//     const resizeHandler = () => {
//       if (!transitioned) {
//         killAll();
//         // the main useEffect will re-run and restart the animation on resize.
//       }
//       ScrollTrigger.refresh();
//     };
//     window.addEventListener("resize", resizeHandler);

//     return () => {
//       killAll();
//       glowTween?.kill();
//       window.removeEventListener("mousemove", handleMove);
//       root.removeEventListener("wheel", onWheel);
//       window.removeEventListener("resize", resizeHandler);
//     };
//   }, [transitioned, isInView]);

//   // ---------------------
//   // AFTER transition (showing the "The Collective" cluster) — original behavior retained
//   // ---------------------
//   useEffect(() => {
//     if (!transitioned) return;

//     killAll(); // ensure absolutely no overlap

//     const root = rootRef.current;
//     if (!root) return;
//     const rect = root.getBoundingClientRect();
//     const cw = rect.width;
//     const ch = rect.height;
//     const center = { x: cw / 2, y: ch / 2 };

//     const TILE_WIDTH = 120;
//     const TILE_HEIGHT = 150;

//     const selected = [...tilesRef.current].sort(() => 0.5 - Math.random()).slice(0, 5);
//     const others = tilesRef.current.filter((el) => !selected.includes(el));

//     gsap.killTweensOf(tilesRef.current); // freeze all current tweens

//     others.forEach((el) => el && gsap.to(el, { opacity: 0, duration: 1.2, ease: "power2.out" }));

//     const positions: { x: number; y: number }[] = [];
//     const isOverlapping = (x: number, y: number) => {
//       for (const pos of positions) {
//         if (Math.abs(x - pos.x) < TILE_WIDTH && Math.abs(y - pos.y) < TILE_HEIGHT) {
//           return true;
//         }
//       }
//       return false;
//     };

//     selected.forEach((el) => {
//       if (!el) return;
//       let x: number, y: number;
//       let attempts = 0;
//       const maxAttempts = 20;

//       do {
//         x = rand(100, cw - 100 - TILE_WIDTH);
//         y = rand(100, ch - 100 - TILE_HEIGHT);
//         attempts++;
//       } while (
//         (Math.abs(x + TILE_WIDTH / 2 - center.x) < 200 && Math.abs(y + TILE_HEIGHT / 2 - center.y) < 200) ||
//         (isOverlapping(x, y) && attempts < maxAttempts)
//       );

//       positions.push({ x, y });
//       const finalY = y;

//       gsap.to(el, {
//         x,
//         y,
//         scale: 1,
//         opacity: 1,
//         rotation: 0,
//         duration: 2,
//         ease: "power3.out",
//         onComplete: () => {
//           if (!el) return;
//           const floatTl = gsap.to(el, {
//             y: finalY + rand(-20, 20),
//             duration: rand(1.5, 3),
//             ease: "sine.inOut",
//             yoyo: true,
//             repeat: -1,
//           });
//           timelinesRef.current.push(floatTl);
//         },
//       });
//     });

//     gsap.fromTo(".new-heading", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: "power3.out" });
//   }, [transitioned]);

//   return (
//     <section
//       ref={rootRef}
//       className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
//       style={{ perspective: 900, transformStyle: "preserve-3d" }}
//     >
//       <div
//         aria-hidden
//         className="absolute inset-0"
//         style={{
//           background: "radial-gradient(#ffffff06 1px, transparent 1px), radial-gradient(#ffffff03 1px, transparent 1px)",
//           backgroundSize: "40px 40px, 80px 80px",
//           opacity: 1,
//           mixBlendMode: "screen",
//         }}
//       />

//       <div
//         className="absolute z-30 bh-glow"
//         style={{
//           width: 360,
//           height: 360,
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.12) 0%, rgba(40,120,255,0.06) 22%, rgba(0,0,0,0.9) 60%)",
//           filter: "blur(36px)",
//         }}
//       />

//       {!transitioned && (
//         <div className="relative z-40 text-center pointer-events-none">
//           <h1
//             style={{
//               color: "#fff",
//               fontSize: "clamp(38px, 9vw, 96px)",
//               letterSpacing: "0.14em",
//               margin: 0,
//               fontWeight: 800,
//             }}
//           >
//             K&A
//           </h1>
//           <p style={{ color: "#98a7bf", marginTop: 8 }}>
//             A Place for{" "}
//             <span
//               style={{
//                 border: "1px solid rgba(255,255,255,0.06)",
//                 padding: "6px 12px",
//                 borderRadius: 18,
//               }}
//             >
//               artists
//             </span>
//           </p>
//         </div>
//       )}

//       {transitioned && (
//         <div className="absolute new-heading text-center z-50 text-white font-bold text-5xl">The Collective</div>
//       )}

//       {!transitioned &&
//         [
//           { top: 30, left: 30 }, // Top-left
//           { top: 30, left: "50%", transform: "translateX(-50%)" }, // Top-center
//           { top: 30, right: 30 }, // Top-right
//           { top: "50%", right: 30, transform: "translateY(-50%)" }, // Right-center
//           { bottom: 30, right: 30 }, // Bottom-right
//           { bottom: 30, left: "50%", transform: "translateX(-50%)" }, // Bottom-center
//           { bottom: 30, left: 30 }, // Bottom-left
//           { top: "50%", left: 30, transform: "translateY(-50%)" }, // Left-center
//         ].map((style, i) => (
//           <div
//             key={i}
//             ref={setDeckRef(i)}
//             className="absolute"
//             style={{
//               width: 90,
//               height: 120,
//               background: "#080808",
//               border: "1px solid rgba(255,255,255,0.04)",
//               borderRadius: 8,
//               boxShadow: "0 0 0 4px #000, 0 0 0 5px rgba(255,255,255,0.04), inset 0 0 25px rgba(0,0,0,0.8)",
//               transformStyle: "preserve-3d",
//               ...style,
//             }}
//           >
//             <div
//               className="absolute w-full h-full"
//               style={{
//                 background: "radial-gradient(circle at center, #ffffff05, #ffffff00 60%)",
//               }}
//             />
//           </div>
//         ))}

//       {TILES.map((t, i) => (
//         <div
//           key={t.id}
//           ref={setTileRef(i)}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             width: 180,
//             height: 240,
//             borderRadius: 12,
//             overflow: "hidden",
//             boxShadow: "0 8px 36px rgba(0,0,0,0.7)",
//             cursor: "pointer",
//             background: "#0b0b0b",
//             zIndex: 20,
//             opacity: 0,
//           }}
//         >
//           {t.img ? (
//             <Image
//               src={t.img}
//               alt={`tile-${t.id}`}
//               fill
//               sizes="120px"
//               style={{
//                 objectFit: "cover",
//                 transition: "filter 0.4s ease, opacity 0.4s ease",
//               }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#fff",
//               }}
//             >
//               {t.id}
//             </div>
//           )}
//         </div>
//       ))}
//     </section>
//   );
// };

// export default CosmicBlackHole;


"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

type TileDef = { id: number; img?: string };
const TILE_COUNT = 80;
const TILES: TileDef[] = Array.from({ length: TILE_COUNT }).map((_, i) => ({
  id: i + 1,
  img: `/preview.jpg`,
}));

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const CosmicBlackHole: FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
  const timelinesRef = useRef<gsap.core.Animation[]>([]);
  const delayedCallsRef = useRef<gsap.core.Tween[]>([]);
  const [transitioned, setTransitioned] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const setTileRef = (i: number) => (el: HTMLDivElement | null) => {
    tilesRef.current[i] = el;
  };

  // helper to stop everything cleanly
  const killAll = () => {
    timelinesRef.current.forEach((t) => t.kill());
    timelinesRef.current = [];
    delayedCallsRef.current.forEach((c) => c.kill());
    delayedCallsRef.current = [];
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    // Only run animations if the component is in view and not yet transitioned
    if (!root || !isInView || transitioned) return;

    killAll();

    const rect = root.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;
    const center = { x: cw / 2, y: ch / 2 };

    const buildPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
      const mid1 = {
        x: (start.x + end.x) / 2 + rand(-120, 120),
        y: (start.y + end.y) / 2 + rand(-120, 120),
      };
      const mid2 = {
        x: (mid1.x + end.x) / 2 + (center.x - end.x) * 0.15 + rand(-60, 60),
        y: (mid1.y + end.y) / 2 + (center.y - end.y) * 0.15 + rand(-60, 60),
      };
      return [start, mid1, mid2, end];
    };

    const runTileAnimation = (el: HTMLDivElement) => {
      if (!el) return;
      el.style.position = "absolute";

      const runOnce = () => {
        if (transitioned) return;

        const tl = gsap.timeline({
          onComplete: () => {
            const dc = gsap.delayedCall(rand(0.1, 1.5), () => runTileAnimation(el));
            delayedCallsRef.current.push(dc);
          },
        });

        // Spawn from the edges of the screen
        let start: { x: number; y: number };
        const edge = Math.floor(rand(0, 4)); // 0: top, 1: right, 2: bottom, 3: left
        if (edge === 0) start = { x: rand(0, cw), y: -50 }; // Top
        else if (edge === 1) start = { x: cw + 50, y: rand(0, ch) }; // Right
        else if (edge === 2) start = { x: rand(0, cw), y: ch + 50 }; // Bottom
        else start = { x: -50, y: rand(0, ch) }; // Left

        const end = { x: center.x + rand(-30, 30), y: center.y + rand(-30, 30) };
        const path = buildPath(start, end);

        // "Dealing" animation from off-screen
        tl.fromTo(el, {
          x: start.x,
          y: start.y,
          scale: rand(0.8, 1.2),
          opacity: 0,
          rotation: 0,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
        }, {
          x: start.x,
          y: start.y,
          opacity: 0.8,
          duration: rand(0.4, 0.8),
          ease: "power2.out",
        });

        // Main animation towards the center
        const mainTl = gsap.timeline();
        mainTl.to(el, {
          duration: rand(3.5, 5.5),
          ease: "power2.in",
          motionPath: { path, type: "cubic", curviness: 1.15 },
          scale: 0.28,
          opacity: 0,
        });
        tl.add(mainTl, ">-0.2"); // Overlap slightly with the end of the dealing animation
        timelinesRef.current.push(tl);
      };

      const initialDelay = gsap.delayedCall(rand(0, 5), runOnce);
      delayedCallsRef.current.push(initialDelay);
    };

    tilesRef.current.forEach((el) => el && runTileAnimation(el));
    const glow = root.querySelector<HTMLElement>(".bh-glow");
    const glowTween = glow
      ? gsap.to(glow, { scale: 1.12, opacity: 0.9, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" })
      : null;

    const handleMove = (e: MouseEvent) => {
      if (transitioned) return;
      const rx = (e.clientY / window.innerHeight - 0.5) * -3;
      const ry = (e.clientX / window.innerWidth - 0.5) * 3;
      gsap.to(root, {
        rotationX: rx,
        rotationY: ry,
        duration: 0.9,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };
    window.addEventListener("mousemove", handleMove);

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 10 && !transitioned) setTransitioned(true);
    };
    root.addEventListener("wheel", onWheel);

    const resizeHandler = () => {
      if (!transitioned) {
        killAll();
        // The main useEffect will re-run and restart the animation on resize.
      }
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      killAll();
      glowTween?.kill();
      window.removeEventListener("mousemove", handleMove);
      root.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [transitioned, isInView]);

  useEffect(() => {
    if (!transitioned) return;

    killAll(); // ensure absolutely no overlap

    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;
    const center = { x: cw / 2, y: ch / 2 };

    const FINAL_SCALE = 1.2;
    const TILE_WIDTH = 120 * FINAL_SCALE;
    const TILE_HEIGHT = 160 * FINAL_SCALE;
    const GAP = 40; // Gap between tiles
    const CENTER_EXCLUSION_ZONE = { width: 400, height: 300 };

    const selected = [...tilesRef.current].sort(() => 0.5 - Math.random()).slice(0, 5);
    const others = tilesRef.current.filter((el) => !selected.includes(el));

    gsap.killTweensOf(tilesRef.current); // freeze all current tweens

    others.forEach((el) => el && gsap.to(el, { opacity: 0, duration: 0.8, ease: "power2.out" }));

    const positions: { x: number; y: number }[] = [];
    const isOverlapping = (x: number, y: number) => {
      for (const pos of positions) {
        if (Math.abs(x - pos.x) < TILE_WIDTH + GAP && Math.abs(y - pos.y) < TILE_HEIGHT + GAP) {
          return true;
        }
      }
      return false;
    };

    const isInCenterZone = (x: number, y: number) => {
      const tileCenterX = x + TILE_WIDTH / 2;
      const tileCenterY = y + TILE_HEIGHT / 2;
      return (
        Math.abs(tileCenterX - center.x) < CENTER_EXCLUSION_ZONE.width / 2 &&
        Math.abs(tileCenterY - center.y) < CENTER_EXCLUSION_ZONE.height / 2
      );
    };

    selected.forEach((el) => {
      if (!el) return;
      let x: number, y: number;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        x = rand(GAP, cw - TILE_WIDTH - GAP);
        y = rand(GAP, ch - TILE_HEIGHT - GAP);
        attempts++;
      } while ((isInCenterZone(x, y) || isOverlapping(x, y)) && attempts < maxAttempts);

      // Fallback if no position is found after max attempts
      if (attempts >= maxAttempts) {
        x = rand(GAP, cw - TILE_WIDTH - GAP);
        y = rand(GAP, ch - TILE_HEIGHT - GAP);
      }

      positions.push({ x, y });

      gsap.to(el, {
        x,
        y,
        scale: FINAL_SCALE,
        opacity: 1,
        rotation: 0,
        duration: 2,
        ease: "power3.out",
        onComplete: () => {
          if (!el) return;
          const floatTl = gsap.to(el, {
            y: y + rand(-15, 15),
            duration: rand(1.5, 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          timelinesRef.current.push(floatTl);
        }
      });
    });

    gsap.fromTo(
      ".new-heading",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: "power3.out" }
    );
  }, [transitioned]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
      style={{ perspective: 900, transformStyle: "preserve-3d" }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(#ffffff06 1px, transparent 1px), radial-gradient(#ffffff03 1px, transparent 1px)",
          backgroundSize: "40px 40px, 80px 80px",
          opacity: 1,
          mixBlendMode: "screen",
        }}
      />

      <div
        className="absolute z-30 bh-glow"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          filter: "blur(36px)",
        }}
      />

      {!transitioned && (
        <div className="relative z-40 text-center pointer-events-none">
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(38px, 9vw, 96px)",
              letterSpacing: "0.14em",
              margin: 0,
              fontWeight: 800,
            }}
          >
            K&A
          </h1>
          <p style={{ color: "#98a7bf", marginTop: 8 }}>
            A Place for{" "}
            <span
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "6px 12px",
                borderRadius: 18,
              }}
            >
              artists
            </span>
          </p>
        </div>
      )}

      {transitioned && (
        <div className="absolute new-heading text-center z-50 text-white font-bold text-5xl">
          The Collective
        </div>
      )}

      {TILES.map((t, i) => (
        <div
          key={t.id}
          ref={setTileRef(i)}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 120,
            height: 160,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 36px rgba(0,0,0,0.7)",
            cursor: "pointer",
            background: "#0b0b0b",
            zIndex: 20,
          }}
        >
          {t.img ? (
            <Image
              src={t.img}
              alt={`tile-${t.id}`}
              fill
              sizes="120px"
              style={{
                objectFit: "cover",
                transition: "filter 0.4s ease, opacity 0.4s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {t.id}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default CosmicBlackHole;