// "use client";

// import React, { useRef, useEffect } from "react";
// import Image from "next/image";
// import gsap from "gsap";

// // --- CONFIGURATION ---
// const FOLDER = "/images/culture";
// const EXTENSION = "webp"; 
// const CANVAS_SIZE = 240; 

// // 1. ASPECT RATIO PRESETS
// const RATIOS = {
//   SQUARE: 1,         
//   PORTRAIT: 0.7,     
//   TALL: 0.6,         
//   LANDSCAPE: 1.5,    
//   ULTRAWIDE: 2.2     
// };

// // ====================================================================
// // 🛠️ MANUAL LAYOUT (RESTORED ORIGINAL COORDINATES)
// // ====================================================================
// const MANUAL_LAYOUT = [
//   // --- CENTER ---
//   { id: 0, img: 1,  x: -30, y: -25, w: 30, aspect: RATIOS.LANDSCAPE,  speed: 1.2 },
//   { id: 1, img: 2,  x: 35,  y: -30, w: 20, aspect: RATIOS.SQUARE,    speed: 1.1 },
//   { id: 2, img: 3,  x: -22, y: 30,  w: 30, aspect: RATIOS.SQUARE, speed: 1.3 },
//   { id: 3, img: 4,  x: 30,  y: 20,  w: 30, aspect: RATIOS.LANDSCAPE,  speed: 1.0 },
//   { id: 4, img: 5,  x: 0,   y: -48, w: 20, aspect: RATIOS.PORTRAIT, speed: 0.9 },

//   // --- MID LAYER ---
//   { id: 5, img: 6,  x: -60, y: -10, w: 25, aspect: RATIOS.LANDSCAPE,    speed: 0.6 },
//   { id: 6, img: 7,  x: 65,  y: -5,  w: 32, aspect: RATIOS.LANDSCAPE,      speed: 0.6 },
//   { id: 7, img: 8,  x: -55, y: 45,  w: 30, aspect: RATIOS.PORTRAIT, speed: 0.5 },
//   { id: 8, img: 9,  x: 55,  y: 55,  w: 28, aspect: RATIOS.PORTRAIT,  speed: 0.5 },
//   { id: 9, img: 10, x: -15, y: 65,  w: 30, aspect: RATIOS.LANDSCAPE,    speed: 0.7 },
  
//   // --- BACKGROUND ---
//   { id: 10, img: 11, x: -80, y: -65, w: 35, aspect: RATIOS.LANDSCAPE, speed: 0.2 },
//   { id: 11, img: 12, x: 85,  y: -60, w: 28, aspect: RATIOS.LANDSCAPE,  speed: 0.2 },
//   { id: 12, img: 13, x: 0,   y: 90,  w: 40, aspect: RATIOS.ULTRAWIDE, speed: 0.1 },
//   { id: 13, img: 14, x: 50,  y: -60, w: 28, aspect: RATIOS.SQUARE,    speed: 0.3 }, 
//   { id: 14, img: 15, x: -40, y: -55, w: 30, aspect: RATIOS.LANDSCAPE, speed: 0.3 }, 
// ];

// export default function CultureComplete() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
  
//   const xTo = useRef<gsap.QuickToFunc | null>(null);
//   const yTo = useRef<gsap.QuickToFunc | null>(null);

//   const isDragging = useRef(false);
//   const startDrag = useRef({ x: 0, y: 0 });
//   const currentPos = useRef({ x: 0, y: 0 }); 

//   // 1. INTRO ANIMATION
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//         gsap.set(".culture-text-el", { y: 50, opacity: 0 });
//         gsap.set(".culture-card", { scale: 0, opacity: 0 });

//         tl.to(".culture-text-el", {
//             y: 0, opacity: 1, duration: 1.2, stagger: 0.15, 
//         })
//         .to(".culture-card", {
//             scale: 1, opacity: 1, duration: 1.5,
//             stagger: { amount: 1, from: "random" },
//             ease: "elastic.out(1, 0.75)", 
//         }, "-=0.5");
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

//   // 2. SETUP GSAP QUICKTO
//   useEffect(() => {
//     if (!contentRef.current) return;
    
//     // Initial Center
//     gsap.set(contentRef.current, { xPercent: -50, yPercent: -50 });

//     xTo.current = gsap.quickTo(contentRef.current, "x", { duration: 3.5, ease: "power3.out" });
//     yTo.current = gsap.quickTo(contentRef.current, "y", { duration: 3.5, ease: "power3.out" });
//   }, []);


//   // ============================================================
//   // 🎮 SCENE UPDATER
//   // ============================================================
//   const updateScene = (xProgress: number, yProgress: number) => {
//     if(!xTo.current || !yTo.current) return;

//     const { innerWidth, innerHeight } = window;
//     const overflowX = (CANVAS_SIZE * (innerWidth / 100) - innerWidth) / 2;
//     const overflowY = (CANVAS_SIZE * (innerWidth / 100) - innerHeight) / 2;

//     xTo.current(xProgress * -1.6 * overflowX);
//     yTo.current(yProgress * -1.6 * overflowY);

//     MANUAL_LAYOUT.forEach((item, i) => {
//         const el = document.getElementById(`orb-parallax-${i}`);
//         if(el) {
//            gsap.to(el, {
//                // REDUCED Parallax Range (80) ensures images don't slide wildly into text
//                x: xProgress * 80 * item.speed, 
//                y: yProgress * 80 * item.speed,
//                duration: 2.5, 
//                ease: "power2.out",
//                overwrite: "auto"
//            })
//         }
//      })
//   };

//   // ============================================================
//   // 🖱️ DESKTOP: MOUSE HOVER
//   // ============================================================
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if(isDragging.current) return; 
//     const { innerWidth, innerHeight } = window;
//     const xNorm = (e.clientX / innerWidth) - 0.5;
//     const yNorm = (e.clientY / innerHeight) - 0.5;
    
//     currentPos.current = { x: xNorm, y: yNorm };
//     updateScene(xNorm, yNorm);
//   };

//   // ============================================================
//   // 📱 MOBILE: TOUCH DRAG
//   // ============================================================
//   const handleTouchStart = (e: React.TouchEvent) => {
//     isDragging.current = true;
//     startDrag.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if(!isDragging.current) return;
//     const { innerWidth } = window;
//     const touchX = e.touches[0].clientX;
//     const deltaX = touchX - startDrag.current.x;
//     const progressDeltaX = deltaX / (innerWidth * 1.5); 
    
//     let newX = currentPos.current.x - progressDeltaX;
//     // Limit drag to keep things reasonable
//     newX = Math.max(-0.6, Math.min(0.6, newX)); 
    
//     const newY = 0; 

//     updateScene(newX, newY);
//     currentPos.current = { x: newX, y: newY };
//     startDrag.current = { x: touchX, y: startDrag.current.y };
//   };

//   const handleTouchEnd = () => { isDragging.current = false; };

//   return (
//     <section 
//       ref={containerRef} 
//       onMouseMove={handleMouseMove}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       className="relative w-full h-screen bg-neutral-950 overflow-hidden cursor-move touch-pan-y"
//     >
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none md:hidden opacity-50 text-white text-[10px] uppercase tracking-widest animate-pulse">
//          Drag Horizontally
//       </div>

//       <div 
//         ref={contentRef}
//         className="absolute top-[50%] md:top-1/2 left-1/2 will-change-transform"
//         style={{ width: `${CANVAS_SIZE}vw`, height: `${CANVAS_SIZE}vw` }}
//       >
        
//         {/* CENTER TEXT - Fixed Multiline Syntax */}
//         <div 
//           className={`
//             absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
//             text-center text-white select-none
//             w-[90vw] max-w-[800px] pointer-events-none
//           `}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold leading-[0.9] mb-6 drop-shadow-2xl">
//             <span className="block culture-text-el opacity-0">Culture That</span>
//             <span className="block culture-text-el opacity-0">Drives</span>
//             <span className="block culture-text-el opacity-0">Performance.</span>
//           </h2>
//           <p className="culture-text-el opacity-0 text-xs md:text-sm opacity-90 max-w-md mx-auto font-light leading-relaxed drop-shadow-md">
//             Culture is the intangible that produces tangible impact at K&A. We challenge conventions, think afresh and break the glass ceiling of creativity — together.
//           </p>
//         </div>

//         {/* 🛠️ CSS SPREAD LOGIC */}
//         <style jsx>{`
//             .responsive-spread {
//                 --spread: 1;
//             }
//             @media (max-width: 1023px) {
//                 .responsive-spread {
//                     --spread: 1.35; /* Pushes layout outwards on mobile */
//                 }
//             }
//         `}</style>

//         {/* IMAGES */}
//         {MANUAL_LAYOUT.map((item, index) => (
//             <div
//               key={item.id}
//               className="culture-card responsive-spread absolute opacity-0 will-change-transform"
//               style={{
//                 left: `calc(50% + (${item.x} * var(--spread)) * 1vw)`,
//                 top: `calc(50% + (${item.y} * var(--spread)) * 1vw)`,
//                 width: `${item.w}vw`,
//                 height: `${item.w / (item.aspect || 1)}vw`, 
//                 transform: 'translate(-50%, -50%)',
//                 zIndex: Math.floor(item.speed * 10) 
//               }}
//             >
//               <div 
//                 id={`orb-parallax-${index}`}
//                 className="w-full h-full relative overflow-hidden shadow-2xl border border-white/10 group"
//               >
//                   <Image
//                       src={`${FOLDER}/${item.img}.${EXTENSION}`}
//                       alt="Culture"
//                       fill
//                       className="object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out"
//                       sizes={`${item.w}vw`}
//                   />
//               </div>
//             </div>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

// --- CONFIGURATION ---
const FOLDER = "/images/culture";
const EXTENSION = "webp"; 
const CANVAS_SIZE = 240; 

const RATIOS = {
  SQUARE: 1,         
  PORTRAIT: 0.7,     
  TALL: 0.6,         
  LANDSCAPE: 1.5,    
  ULTRAWIDE: 2.2     
};

// ====================================================================
// 🛠️ MANUAL LAYOUT
// ====================================================================
// Added 'spread: true' ONLY to the inner items (Indices 0-4).
// These are the ones closest to the text that need to be pushed away.
const MANUAL_LAYOUT = [
  // --- CENTER (Inner Ring - Needs Spread) ---
  { id: 0, img: 1,  x: -30, y: -25, w: 30, aspect: RATIOS.LANDSCAPE,  speed: 1.2, spread: true },
  { id: 1, img: 2,  x: 35,  y: -30, w: 20, aspect: RATIOS.SQUARE,    speed: 1.1, spread: true },
  { id: 2, img: 30,  x: -22, y: 30,  w: 30, aspect: RATIOS.SQUARE,     speed: 1.3, spread: true },
  { id: 3, img: 4,  x: 30,  y: 20,  w: 30, aspect: RATIOS.LANDSCAPE,  speed: 1.0, spread: true },
  { id: 4, img: 5,  x: 0,   y: -48, w: 20, aspect: RATIOS.PORTRAIT,   speed: 0.9, spread: true },

  // --- MID LAYER (Standard - No Extra Spread needed usually) ---
  { id: 5, img: 6,  x: -60, y: -10, w: 25, aspect: RATIOS.LANDSCAPE,    speed: 0.6, spread: true },
  { id: 6, img: 7,  x: 65,  y: -5,  w: 32, aspect: RATIOS.LANDSCAPE,      speed: 0.6, spread: true },
  { id: 7, img: 8,  x: -55, y: 45,  w: 30, aspect: RATIOS.PORTRAIT, speed: 0.5, spread: true },
  { id: 8, img: 9,  x: 55,  y: 55,  w: 28, aspect: RATIOS.PORTRAIT,  speed: 0.5, spread: true },
  { id: 9, img: 10, x: -15, y: 65,  w: 30, aspect: RATIOS.LANDSCAPE,    speed: 0.7, spread: true },
  
  // --- BACKGROUND (Far away - No Spread needed) ---
  { id: 10, img: 11, x: -80, y: -65, w: 35, aspect: RATIOS.LANDSCAPE, speed: 0.2, spread: true },
  { id: 11, img: 12, x: 85,  y: -60, w: 28, aspect: RATIOS.LANDSCAPE,  speed: 0.2, spread: true },
  { id: 12, img: 13, x: 0,   y: 90,  w: 40, aspect: RATIOS.ULTRAWIDE, speed: 0.1, spread: true },
  { id: 13, img: 14, x: 50,  y: -60, w: 28, aspect: RATIOS.SQUARE,    speed: 0.3, spread: true }, 
  { id: 14, img: 15, x: -40, y: -55, w: 30, aspect: RATIOS.LANDSCAPE, speed: 0.3, spread: true }, 
];

export default function CultureComplete() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const isDragging = useRef(false);
  const startDrag = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 }); 

  // 1. INTRO ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(".culture-text-el", { y: 50, opacity: 0 });
        gsap.set(".culture-card", { scale: 0, opacity: 0 });

        tl.to(".culture-text-el", {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.15, 
        })
        .to(".culture-card", {
            scale: 1, opacity: 1, duration: 1.5,
            stagger: { amount: 1, from: "random" },
            ease: "elastic.out(1, 0.75)", 
        }, "-=0.5");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 2. SETUP GSAP QUICKTO
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.set(contentRef.current, { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(contentRef.current, "x", { duration: 3.5, ease: "power3.out" });
    yTo.current = gsap.quickTo(contentRef.current, "y", { duration: 3.5, ease: "power3.out" });
  }, []);

  // ============================================================
  // 🎮 SCENE UPDATER
  // ============================================================
  const updateScene = (xProgress: number, yProgress: number) => {
    if(!xTo.current || !yTo.current) return;

    const { innerWidth, innerHeight } = window;
    const overflowX = (CANVAS_SIZE * (innerWidth / 100) - innerWidth) / 2;
    const overflowY = (CANVAS_SIZE * (innerWidth / 100) - innerHeight) / 2;

    xTo.current(xProgress * -1.6 * overflowX);
    yTo.current(yProgress * -1.6 * overflowY);

    MANUAL_LAYOUT.forEach((item, i) => {
        const el = document.getElementById(`orb-parallax-${i}`);
        if(el) {
           gsap.to(el, {
               x: xProgress * 80 * item.speed, 
               y: yProgress * 80 * item.speed,
               duration: 2.5, 
               ease: "power2.out",
               overwrite: "auto"
           })
        }
     })
  };

  // ============================================================
  // 🖱️ DESKTOP
  // ============================================================
  const handleMouseMove = (e: React.MouseEvent) => {
    if(isDragging.current) return; 
    const { innerWidth, innerHeight } = window;
    const xNorm = (e.clientX / innerWidth) - 0.5;
    const yNorm = (e.clientY / innerHeight) - 0.5;
    currentPos.current = { x: xNorm, y: yNorm };
    updateScene(xNorm, yNorm);
  };

  // ============================================================
  // 📱 MOBILE
  // ============================================================
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startDrag.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if(!isDragging.current) return;
    const { innerWidth } = window;
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - startDrag.current.x;
    const progressDeltaX = deltaX / (innerWidth * 1.5); 
    
    let newX = currentPos.current.x - progressDeltaX;
    newX = Math.max(-0.6, Math.min(0.6, newX)); 
    
    const newY = 0; 

    updateScene(newX, newY);
    currentPos.current = { x: newX, y: newY };
    startDrag.current = { x: touchX, y: startDrag.current.y };
  };

  const handleTouchEnd = () => { isDragging.current = false; };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`
        relative w-full bg-neutral-950 overflow-x- cursor-move touch-pan-y
        min-h-[120vh] 
        md:h-screen md:min-h-0 md:overflow-hidden
      `}
    >
      
      <div 
        ref={contentRef}
        // Centered nicely for the slightly taller mobile container
        className="absolute top-[45%] md:top-1/2 left-1/2 will-change-transform"
        style={{ width: `${CANVAS_SIZE}vw`, height: `${CANVAS_SIZE}vw` }}
      >
        
      <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center pointer-events-none mix-blend-difference text-white"
          style={{ width: '50vw' }}
        >
          <h2 className="text-lg  md:text-5xl font-bold leading-[0.9] md:mb-6 mb-2">
            <span className="block culture-text-el opacity-0">Culture That</span>
            <span className="block culture-text-el opacity-0">Drives Performance</span>
          </h2>
          <p className="culture-text-e opacity-0 text-[10px] md:text-sm opacity-70 max-w-md mx-auto font-light leading-relaxed ">
            Culture is the intangible that produces tangible impact at K&A. We challenge conventions, think afresh and break the glass ceiling of creativity — together. Our cultural diversity, multilingual workforce and upskilling exercises come together to ignite creativity that is impactful.
          </p>
        </div>

        <style jsx>{`
            .responsive-spread {
                --spread: 1;
            }
            @media (max-width: 1023px) {
                .responsive-spread {
                    --spread: 1.4; /* Strong push for specifically marked items */
                }
            }
        `}</style>

        {/* IMAGES */}
        {MANUAL_LAYOUT.map((item, index) => {
            // LOGIC: If item.spread is true, use var(--spread), otherwise use 1
            const spreadMultiplier = item.spread ? 'var(--spread)' : '1';

            return (
              <div
                key={item.id}
                className="culture-card responsive-spread absolute opacity-0 will-change-transform"
                style={{
                  // Apply selective spread multiplier
                  left: `calc(50% + (${item.x} * ${spreadMultiplier}) * 1vw)`,
                  top: `calc(50% + (${item.y} * ${spreadMultiplier}) * 1vw)`,
                  width: `${item.w}vw`,
                  height: `${item.w / (item.aspect || 1)}vw`, 
                  transform: 'translate(-50%, -50%)',
                  zIndex: Math.floor(item.speed * 10) 
                }}
              >
                <div 
                  id={`orb-parallax-${index}`}
                  className="w-full h-full relative overflow-hidden shadow-2xl border border-white/10 group"
                >
                    <Image
                        src={`${FOLDER}/${item.img}.${EXTENSION}`}
                        alt="Culture"
                        fill
                        className="object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out"
                        sizes={`${item.w}vw`}
                    />
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
}