
// // // "use client";

// // // import { useEffect, useRef } from "react";
// // // import { gsap } from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import Link from "next/link";
// // // import Image from "next/image";

// // // gsap.registerPlugin(ScrollTrigger);

// // // interface CardData {
// // //   title: string;
// // //   image: string;
// // //   key: string;
// // // }

// // // const cards: CardData[] = [
// // //   {
// // //     title: "Integrated\nannual report",
// // //     image: "/images/services/Maskgroup07.png",
// // //     key: "integrated",
// // //   },
// // //   {
// // //     title: "Sustainability and\nESG reports",
// // //     image: "/images/services/abc.png",
// // //     key: "sustainability",
// // //   },

// // //   {
// // //     title: "Presentations",
// // //     image: "/images/services/Maskgroup04.png",
// // //     key: "presentations",
// // //   },
// // //   {
// // //     title: "Branding and\nActivation",
// // //     image: "/images/services/branding.png",
// // //     key: "branding",
// // //   },
// // //   {
// // //     title: "Videos",
// // //     image: "/images/services/Maskgroup02.png",
// // //     key: "video",
// // //   },
// // //   {
// // //     title: "Digital",
// // //     image: "/images/services/Maskgroup05.png",
// // //     key: "web",
// // //   },
// // // ];

// // // export function HorizontalScroll() {
// // //   const sectionRef = useRef<HTMLDivElement | null>(null);
// // //   const triggerRef = useRef<HTMLDivElement | null>(null);

// // //   useEffect(() => {
// // //     const section = sectionRef.current;
// // //     const trigger = triggerRef.current;
// // //     if (!section || !trigger) return;

// // //     const ctx = gsap.context(() => {
// // //       gsap.to(section, {
// // //         x: () => -(section.scrollWidth - window.innerWidth),
// // //         ease: "none",
// // //         scrollTrigger: {
// // //           trigger,
// // //           start: "top top",
// // //           end: () => `+=${section.scrollWidth - window.innerWidth}`,
// // //           pin: true,
// // //           scrub: 1,
// // //           anticipatePin: 1,
// // //           invalidateOnRefresh: true,
// // //         },
// // //       });
// // //     }, trigger);

// // //     ScrollTrigger.refresh();
// // //     return () => ctx.revert();
// // //   }, []);

// // //   return (
// // //     <div ref={triggerRef} className="overflow-hidden">
// // //       <div ref={sectionRef} className="flex h-screen items-center gap-6 px-8">

// // //         {cards.map((card, index) => (
// // //           <Link
// // //             key={index}
// // //             href={{
// // //               pathname: "/report-showcase",
// // //               query: { key: card.key },   // 👈 ONLY KEY IS SENT
// // //             }}
// // //             scroll={true}
// // //             className="top-0 relative h-[80vh] w-[100vh] flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer"
// // //           >
// // //             <div className="absolute inset-0">
// // //               <Image
// // //                 src={card.image}
// // //                 alt={card.title}
// // //                 width={100}
// // //                 height={80}
// // //                 className="absolute inset-0 h-full w-full object-cover"
// // //               />

// // //               {/* Black overlay */}
// // //               <div className="absolute inset-0 bg-black/42" />

// // //               {/* Title */}
// // //               <div className="absolute inset-0 flex items-center justify-center text-center p-6">
// // //                 <h3 className="whitespace-pre-line text-3xl font-semibold text-white leading-tight">
// // //                   {card.title}
// // //                 </h3>
// // //               </div>
// // //             </div>
// // //           </Link>
// // //         ))}

// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // "use client";

// // // import { useEffect, useRef } from "react";
// // // import { gsap } from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import Link from "next/link";
// // // import Image from "next/image";

// // // if (typeof window !== "undefined") {
// // //   gsap.registerPlugin(ScrollTrigger);
// // // }

// // // interface CardData {
// // //   title: string;
// // //   image: string;
// // //   key: string;
// // // }

// // // const cards: CardData[] = [
// // //   {
// // //     title: "Integrated\nannual report",
// // //     image: "/images/services/Maskgroup07.png",
// // //     key: "integrated",
// // //   },
// // //   {
// // //     title: "Sustainability and\nESG reports",
// // //     image: "/images/services/abc.png",
// // //     key: "sustainability",
// // //   },
// // //   {
// // //     title: "Presentations",
// // //     image: "/images/services/Maskgroup04.png",
// // //     key: "presentations",
// // //   },
// // //   {
// // //     title: "Branding and\nActivation",
// // //     image: "/images/services/branding.png",
// // //     key: "branding",
// // //   },
// // //   {
// // //     title: "Videos",
// // //     image: "/images/services/Maskgroup02.png",
// // //     key: "video",
// // //   },
// // //   {
// // //     title: "Digital",
// // //     image: "/images/services/Maskgroup05.png",
// // //     key: "web",
// // //   },
// // // ];

// // // export function HorizontalScroll() {
// // //   const wrapperRef = useRef<HTMLDivElement | null>(null);
// // //   const sectionRef = useRef<HTMLDivElement | null>(null);

// // //   useEffect(() => {
// // //     const wrapper = wrapperRef.current;
// // //     const section = sectionRef.current;

// // //     // GSAP Context for cleanup
// // //     const ctx = gsap.context(() => {
// // //       // 1. DESKTOP ANIMATION (Min Width 1024px)
// // //       // This leaves your original desktop logic intact
// // //       ScrollTrigger.matchMedia({
// // //         "(min-width: 1024px)": function() {
// // //           if (!section || !wrapper) return;

// // //           gsap.to(section, {
// // //             x: () => -(section.scrollWidth - window.innerWidth),
// // //             ease: "none",
// // //             scrollTrigger: {
// // //               trigger: wrapper,
// // //               start: "top top",
// // //               end: () => `+=${section.scrollWidth - window.innerWidth}`,
// // //               pin: true,
// // //               scrub: 1,
// // //               anticipatePin: 1,
// // //               invalidateOnRefresh: true,
// // //             },
// // //           });
// // //         },

// // //         // 2. MOBILE CLEANUP
// // //         // GSAP automatically reverts styles when media query doesn't match,
// // //         // so we don't need extra code here. Mobile just relies on CSS.
// // //       });
// // //     }, wrapperRef);

// // //     return () => ctx.revert();
// // //   }, []);

// // //   return (
// // //     <div ref={wrapperRef} className="relative w-full">

// // //       {/* Hide Scrollbar for Chrome/Safari/Edge */}
// // //       <style jsx>{`
// // //         .hide-scrollbar::-webkit-scrollbar {
// // //           display: none;
// // //         }
// // //         .hide-scrollbar {
// // //           -ms-overflow-style: none; /* IE and Edge */
// // //           scrollbar-width: none; /* Firefox */
// // //         }
// // //       `}</style>

// // //       <div
// // //         ref={sectionRef}
// // //         className={`
// // //           flex md:items-center pt-8 md:pt-0
// // //           h-screen
// // //           gap-6 bg-yellow-100 px-8

// // //           /* --- MOBILE / TABLET STYLES --- */
// // //           overflow-x-auto     /* Allow native swipe */
// // //           overflow-y-hidden
// // //           snap-x snap-mandatory /* Snap to center */
// // //           hide-scrollbar

// // //           /* --- DESKTOP STYLES --- */
// // //           lg:overflow-visible /* Let GSAP handle the view */
// // //           lg:w-max           /* Force full width for calculation */
// // //         `}
// // //       >
// // //         {cards.map((card, index) => (
// // //           <Link
// // //             key={index}
// // //             href={{
// // //               pathname: "/report-showcase",
// // //               query: { key: card.key },
// // //             }}
// // //             scroll={true}
// // //             className={`
// // //               relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer
// // //               snap-center

// // //               /* --- MOBILE CARD SIZE --- */
// // //               /* Show peek of next card (85vw) and reduce height for mobile screens */
// // //               w-[95vw] h-[60vh]

// // //               /* --- TABLET CARD SIZE --- */
// // //               md:w-[60vw] md:h-[70vh]

// // //               /* --- DESKTOP CARD SIZE (Your Original) --- */
// // //               lg:w-[100vh] lg:h-[80vh]

// // //               top-0
// // //             `}
// // //           >
// // //             <div className="absolute inset-0">
// // //               <Image
// // //                 src={card.image}
// // //                 alt={card.title}
// // //                 width={800}
// // //                 height={600}
// // //                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
// // //               />

// // //               {/* Black overlay */}
// // //               <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-500" />

// // //               {/* Title */}
// // //               <div className="absolute inset-0 flex items-center justify-center text-center p-6">
// // //                 <h3 className="whitespace-pre-line text-3xl font-semibold text-white leading-tight drop-shadow-xl">
// // //                   {card.title}
// // //                 </h3>
// // //               </div>
// // //             </div>
// // //           </Link>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRouter } from "next/navigation";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface CardData {
//   title: string;
//   image: string;
//   key: string;
// }

// const cards: CardData[] = [
//   {
//     title: "Integrated\nannual report",
//     image: "/images/services/Maskgroup07.png",
//     key: "integrated",
//   },
//   {
//     title: "Sustainability and\nESG reports",
//     image: "/images/services/abc.png",
//     key: "sustainability",
//   },
//   {
//     title: "Presentations",
//     image: "/images/services/Maskgroup04.png",
//     key: "presentations",
//   },
//   {
//     title: "Branding and\nActivation",
//     image: "/images/services/branding.png",
//     key: "branding",
//   },
//   {
//     title: "Videos",
//     image: "/images/services/Maskgroup02.png",
//     key: "video",
//   },
//   {
//     title: "Digital",
//     image: "/images/services/Maskgroup05.png",
//     key: "web",
//   },
// ];

// export function HorizontalScroll() {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//     const router = useRouter(); // 2. Initialize Router


//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const section = sectionRef.current;

//     // GSAP Context for cleanup
//     const ctx = gsap.context(() => {
//       // 1. DESKTOP ANIMATION (Min Width 1024px)
//       ScrollTrigger.matchMedia({
//         "(min-width: 1024px)": function() {
//           if (!section || !wrapper) return;

//           gsap.to(section, {
//             x: () => -(section.scrollWidth - window.innerWidth),
//             ease: "none",
//             scrollTrigger: {
//               trigger: wrapper,
//               start: "top top",
//               end: () => `+=${section.scrollWidth - window.innerWidth}`,
//               pin: true,
//               scrub: 1,
//               anticipatePin: 1,
//               invalidateOnRefresh: true,
//             },
//           });
//         }
//       });
//     }, wrapperRef);

//     return () => ctx.revert();
//   }, []);

//   // --- NAVIGATION HANDLERS ---
//   const handleScroll = (direction: 'left' | 'right') => {
//     if (sectionRef.current) {
//       // Approximate width of a card + gap on mobile/tablet to scroll by one unit
//       const scrollAmount = window.innerWidth * 0.85; // 85vw matching card width

//       sectionRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };
//   //3. THE NAVIGATION HANDLER
//   const handleCardClick = (e: React.MouseEvent, key: string) => {
//     e.preventDefault(); // Stop any default link behavior

//     // A. Disable 'smooth' scrolling in CSS globally
//     // If your global CSS has scroll-behavior: smooth, JS scrollTo(0,0) will fail/lag.
//     document.documentElement.style.scrollBehavior = "auto";
//     document.body.style.scrollBehavior = "auto";

//     // B. Force immediate jump to top
//     if (typeof window !== "undefined") {
//       window.scrollTo(0, 0);
//     }

//     // C. Navigate
//     // We navigate programmatically. Next.js will mount the new page,
//     // and since we forced window.scrollY to 0, it will start at the top.
//     router.push(`/report-showcase?key=${key}`);
//   };

//   return (
//     <div ref={wrapperRef} className="relative w-full">

//       {/* Hide Scrollbar CSS */}
//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       {/* --- MOBILE NAVIGATION CONTROLS --- */}
//       {/* Absolute positioned top-right, Hidden on Large screens (lg:hidden) */}
//       <div className="absolute top-4 right-4 z-20 flex gap-2 lg:hidden">
//         <button
//           onClick={() => handleScroll('left')}
//           className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
//           aria-label="Scroll Left"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <button
//           onClick={() => handleScroll('right')}
//           className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
//           aria-label="Scroll Right"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div
//         ref={sectionRef}
//         className={`
//           flex md:items-center pt-16 md:pt-0
//           h-screen
//           gap-6 px-8

//           /* --- MOBILE / TABLET STYLES --- */
//           overflow-x-auto
//           overflow-y-hidden
//           snap-x snap-mandatory
//           hide-scrollbar

//           /* --- DESKTOP STYLES --- */
//           lg:overflow-visible
//           lg:w-max
//         `}
//       >
//         {cards.map((card, index) => (
//           // <Link
//           //   key={index}
//           //   href={{
//           //     pathname: "/report-showcase",
//           //     query: { key: card.key },
//           //   }}
//           //   scroll={true}
//           //   onClick={() => {
//           //     if (typeof window !== "undefined") {
//           //       window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//           //     }
//           //   }}
//           //   className={`
//           //     relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer
//           //     snap-center

//           //     /* --- MOBILE CARD SIZE --- */
//           //     w-[95vw] h-[60vh]

//           //     /* --- TABLET CARD SIZE --- */
//           //     md:w-[60vw] md:h-[70vh]

//           //     /* --- DESKTOP CARD SIZE --- */
//           //     lg:w-[100vh] lg:h-[80vh]

//           //     top-0
//           //   `}
//           // >
//           <div
//             key={index}
//             onClick={(e) => handleCardClick(e, card.key)}
//             className={`
//               relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer snap-center
//               w-[95vw] h-[60vh]
//               md:w-[60vw] md:h-[70vh]
//               lg:w-[100vh] lg:h-[80vh]
//               top-0
//             `}
//           >
//             <div className="absolute inset-0">
//               <Image
//                 src={card.image}
//                 alt={card.title}
//                 width={800}
//                 height={600}
//                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
//               />

//               {/* Black overlay */}
//               <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-500" />

//               {/* Title */}
//               <div className="absolute inset-0 flex items-center justify-center text-center p-6">
//                 <h3 className="whitespace-pre-line text-3xl font-semibold font-noto-sans text-white leading-tight drop-shadow-xl">
//                   {card.title}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// OPTIONAL: If you are using Lenis for smooth scroll, uncomment this import:
import { useLenis } from "lenis/react";
import { PassLink, StackLink } from "../StackedCurtainTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  title: string;
  image: string;
  key: string;
}

const cards: CardData[] = [
  {
    title: "Integrated\nannual report",
    image: "/images/services/Maskgroup07.png",
    key: "integrated",
  },
  {
    title: "Sustainability and\nESG reports",
    image: "/images/services/abc.png",
    key: "sustainability",
  },
  {
    title: "Presentations",
    image: "/images/services/Maskgroup04.png",
    key: "presentations",
  },
  {
    title: "Branding and\nActivation",
    image: "/images/services/branding.png",
    key: "branding",
  },
  {
    title: "Videos",
    image: "/images/services/Maskgroup02.png",
    key: "video",
  },
  {
    title: "Digital",
    image: "/images/services/Maskgroup05.png",
    key: "web",
  },
];

export function HorizontalScroll() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // OPTIONAL: Get Lenis instance if you are using the hook
  const lenis = useLenis();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          if (!section || !wrapper) return;

          gsap.to(section, {
            x: () => -(section.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () => `+=${section.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (sectionRef.current) {
      const scrollAmount = window.innerWidth * 0.85;
      sectionRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- FORCE SCROLL TO TOP FUNCTION ---
  const handleLinkClick = () => {
    // 1. Native Scroll (Immediate)
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // 2. Lenis Scroll (If you use Lenis, this is the most important part)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // 3. Fallback Timeout (Catches Next.js Scroll Restoration lag)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  return (
    <div ref={wrapperRef} className="bg--100 relative w-full">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute top-4 right-4 z-20 flex gap-2 lg:hidden">
        <button
          onClick={() => handleScroll('left')}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div
        ref={sectionRef}
        className={`
          flex md:items-center pt-16 md:pt-0
          h-screen
          gap-6 px-8
          overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar
          lg:overflow-visible lg:w-max
        `}
      >
        {cards.map((card, index) => (
          <PassLink
            key={index}
            href={{
              pathname: "/report-showcase",
              query: { key: card.key },
            }}
            scroll={true} // Tries to scroll native
            onClick={handleLinkClick} // Force overrides any lingering scroll state
            className={`bg--100 aspect-square
              relative flex-shrink-0 overflow-hidden  cursor-pointer snap-center w-full md:w-auto
              h-[50vh] md:h-[70vh] lg:h-[80vh]
              top-0
            `}
          >
            {/* w-[95vw] h-[60vh]
              md:w-[60vw] md:h-[70vh]
              lg:w-[100vh] lg:h-[80vh] */}
            <div className="absolute inset-0">
              <Image
                src={card.image}
                alt={card.title}
                width={800}
                height={600}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="whitespace-pre-line text-3xl font-semibold text-white leading-tight drop-shadow-xl">
                  {card.title}
                </h3>
              </div>
            </div>
          </PassLink>
        ))}
      </div>
    </div>
  );
}