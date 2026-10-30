// // // 'use client';

// // // import { useEffect, useRef } from 'react';
// // // import { gsap } from 'gsap';
// // // import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // // if (typeof window !== 'undefined') {
// // //     gsap.registerPlugin(ScrollTrigger);
// // // }

// // // export interface PillarCard {
// // //     id: string;
// // //     number: string;
// // //     title: string;
// // //     imageUrl: string;
// // // }

// // // export interface ServicePillarsProps {
// // //     title?: string;
// // //     headline?: string;
// // //     description?: string;
// // //     pillars?: PillarCard[];
// // // }

// // // export default function ServicePillars({
// // //     title ,
// // //     headline,
// // //     description,
// // //     pillars
// // // }: ServicePillarsProps) {
// // //     const sectionRef = useRef<HTMLDivElement>(null);
// // //     const pinContainerRef = useRef<HTMLDivElement>(null);
// // //     const horizontalScrollRef = useRef<HTMLDivElement>(null);

// // //     useEffect(() => {
// // //         const section = sectionRef.current;
// // //         const pinContainer = pinContainerRef.current;
// // //         const horizontalScroll = horizontalScrollRef.current;

// // //         if (!section || !pinContainer || !horizontalScroll) return;

// // //         let ctx = gsap.context(() => {
            
// // //             // --- Smooth Arrival for text ---
// // //             const arrivalElements = gsap.utils.toArray('.arrive-fade-up');
            
// // //             gsap.fromTo(arrivalElements, 
// // //                 { y: 50, opacity: 0 }, 
// // //                 {
// // //                     y: 0,
// // //                     opacity: 1,
// // //                     duration: 0.8,
// // //                     stagger: 0.1,
// // //                     ease: 'power3.out',
// // //                     scrollTrigger: {
// // //                         trigger: section, 
// // //                         start: 'top 80%', 
// // //                         toggleActions: 'play none none none',
// // //                     }
// // //                 }
// // //             );

// // //             // --- Horizontal Scroll (Pinned) ---
// // //             const getScrollAmount = () => horizontalScroll.scrollWidth - window.innerWidth;
            
// // //             if (getScrollAmount() > 0) {
// // //                 gsap.to(horizontalScroll, {
// // //                     x: () => -getScrollAmount(), 
// // //                     ease: "none",
// // //                     scrollTrigger: {
// // //                         trigger: pinContainer, 
// // //                         // Changed to 'top top' to rely on the container's internal top padding for spacing
// // //                         start: "top top", 
// // //                         end: () => `+=${getScrollAmount()}`, 
// // //                         pin: true,
// // //                         scrub: 1,
// // //                         anticipatePin: 1, 
// // //                         invalidateOnRefresh: true, 
// // //                     }
// // //                 });
// // //             }
// // //         }, section);

// // //         return () => ctx.revert();
// // //     }, [pillars]);

// // //     return (
// // //         <section ref={sectionRef} className="bg-[#E3E3E3] text-[#1A1A1A] font-noto-sans pt-8 overflow-hidden">
            
// // //             {/* --- TOP CONTENT --- */}
// // //             <div className="max-w-[1440px] mx-auto px-8 md:px-16 pb-8">
// // //                 <h2 className="arrive-fade-up text-5xl md:text-7xl font-bold tracking-tight mb-8">
// // //                     {title}
// // //                 </h2>
// // //                 <hr className="arrive-fade-up border-gray-300 mb-12" />
                
// // //                 <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
// // //                     <h3 className="arrive-fade-up w-full lg:w-[50%] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
// // //                         {headline}
// // //                     </h3>
// // //                     <p className="arrive-fade-up w-full lg:w-[40%] text-base md:text-lg text-gray-700 leading-relaxed font-medium mt-2">
// // //                         {description}
// // //                     </p>
// // //                 </div>
// // //             </div>

// // //             {/* --- PINNED SECTION --- */}
// // //             {/* Added pt-16 md:pt-20 for breathing room above the pill. Removed bottom padding here. */}
// // //             {pillars && <div ref={pinContainerRef} className="w-full bg-[#E3E3E3] pt-16 md:pt-20">
                
// // //                 <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6">
// // //                     <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
// // //                         <span className="text-sm font-bold tracking-wide mr-4">Service pillars</span>
// // //                         <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
// // //                             {String(pillars.length).padStart(2, '0')}
// // //                         </span>
// // //                     </div>
// // //                 </div>

// // //                 <div className="border-t border-white w-full"></div>
                
// // //                 <div 
// // //                     ref={horizontalScrollRef} 
// // //                     className="overflow-x-hidden flex flex-nowrap w-max"
// // //                 >
// // //                     {pillars.map((pillar, index) => (
// // //                         <div 
// // //                             key={pillar.id} 
// // //                             // Moved the bottom padding (pb-16 md:pb-24) inside the card so borders reach the bottom
// // //                             className={`w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col px-8 pt-8 pb-16 md:px-10 md:pt-10 md:pb-24 border-white ${
// // //                                 index !== pillars.length - 1 ? 'border-r' : ''
// // //                             }`}
// // //                         >
// // //                             <h4 className="text-2xl md:text-3xl font-bold mb-6">
// // //                                 {pillar.number}
// // //                             </h4>
                            
// // //                             <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
// // //                                 <img 
// // //                                     src={pillar.imageUrl} 
// // //                                     alt={pillar.title}
// // //                                     className="w-full h-full object-cover"
// // //                                 />
// // //                             </div>
                            
// // //                             <h5 className="text-xl md:text-2xl font-bold leading-snug">
// // //                                 {pillar.title}
// // //                             </h5>
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             </div>}
            
// // //         </section>
// // //     );
// // // }
// // 'use client';

// // import { useEffect, useRef } from 'react';
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // import { useLenis } from 'lenis/react';

// // if (typeof window !== 'undefined') {
// //     gsap.registerPlugin(ScrollTrigger);
// // }

// // export interface PillarCard {
// //     id: string;
// //     number: string;
// //     title: string;
// //     imageUrl: string;
// // }

// // export interface ServicePillarsProps {
// //     title?: string;
// //     headline?: string;
// //     description?: string;
// //     pillars?: PillarCard[];
// // }

// // export default function ServicePillars({
// //     title,
// //     headline,
// //     description,
// //     pillars
// // }: ServicePillarsProps) {
// //     const sectionRef = useRef<HTMLDivElement>(null);
// //     const trackRef = useRef<HTMLDivElement>(null);       // tall scroll-distance container
// //     const stickyRef = useRef<HTMLDivElement>(null);       // position:sticky viewport
// //     const horizontalScrollRef = useRef<HTMLDivElement>(null); // the row that translates
// //     const lenis = useLenis();

// //     useEffect(() => {
// //         const section = sectionRef.current;
// //         const track = trackRef.current;
// //         const sticky = stickyRef.current;
// //         const horizontalScroll = horizontalScrollRef.current;

// //         if (!section) return;

// //         let ctx = gsap.context(() => {
// //             // --- Smooth Arrival for text (unchanged) ---
// //             const arrivalElements = gsap.utils.toArray('.arrive-fade-up');

// //             gsap.fromTo(arrivalElements,
// //                 { y: 50, opacity: 0 },
// //                 {
// //                     y: 0,
// //                     opacity: 1,
// //                     duration: 0.8,
// //                     stagger: 0.1,
// //                     ease: 'power3.out',
// //                     scrollTrigger: {
// //                         trigger: section,
// //                         start: 'top 80%',
// //                         toggleActions: 'play none none none',
// //                     }
// //                 }
// //             );
// //         }, section);

// //         // --- Horizontal scroll, driven by CSS `position: sticky` instead
// //         // of GSAP's pin:true. Sticky is handled natively by the browser's
// //         // layout engine, so there's no pin-spacer height to recalculate
// //         // when the mobile address bar shows/hides mid-scroll — which was
// //         // the actual cause of the freeze/break. Functionality (vertical
// //         // scroll "locks" the section while the row translates horizontally)
// //         // stays identical across all devices.
// //         let rafId: number;
// //         let scrollAmount = 0;
// //         let trackHeight = 0;

// //         const measure = () => {
// //             if (!horizontalScroll || !sticky || !track) return;
// //             scrollAmount = Math.max(
// //                 0,
// //                 horizontalScroll.scrollWidth - sticky.clientWidth
// //             );
// //             // Total scrollable track height = one viewport height (for the
// //             // sticky dwell) + however far we need to travel horizontally.
// //             trackHeight = sticky.clientHeight + scrollAmount;
// //             track.style.height = `${trackHeight}px`;
// //         };

// //         const update = () => {
// //             if (!track || !horizontalScroll || scrollAmount <= 0) return;
// //             const rect = track.getBoundingClientRect();
// //             const stickyHeight = sticky?.clientHeight || 0;
// //             const distance = trackHeight - stickyHeight;
// //             if (distance <= 0) return;

// //             // Progress: 0 when track's top just reaches the top of the
// //             // viewport, 1 when we've scrolled past the full track distance.
// //             const progress = Math.min(
// //                 1,
// //                 Math.max(0, -rect.top / distance)
// //             );

// //             horizontalScroll.style.transform = `translate3d(${-progress * scrollAmount}px, 0, 0)`;
// //         };

// //         const onScroll = () => {
// //             cancelAnimationFrame(rafId);
// //             rafId = requestAnimationFrame(update);
// //         };

// //         measure();
// //         update();

// //         // Prefer Lenis's scroll event when available (keeps this in sync
// //         // with the rest of the app's smooth scroll); fall back to native
// //         // scroll otherwise.
// //         if (lenis) {
// //             lenis.on('scroll', onScroll);
// //         } else {
// //             window.addEventListener('scroll', onScroll, { passive: true });
// //         }

// //         // Re-measure on resize/orientation change and once images load
// //         // (scrollWidth isn't final until images have real dimensions).
// //         const handleResize = () => {
// //             measure();
// //             update();
// //         };
// //         window.addEventListener('resize', handleResize);

// //         const images = horizontalScroll
// //             ? Array.from(horizontalScroll.querySelectorAll('img'))
// //             : [];
// //         let loadedCount = 0;
// //         const handleImgSettled = () => {
// //             loadedCount += 1;
// //             if (loadedCount === images.length) {
// //                 measure();
// //                 update();
// //             }
// //         };
// //         images.forEach((img) => {
// //             if (img.complete) {
// //                 handleImgSettled();
// //             } else {
// //                 img.addEventListener('load', handleImgSettled);
// //                 img.addEventListener('error', handleImgSettled);
// //             }
// //         });

// //         return () => {
// //             cancelAnimationFrame(rafId);
// //             if (lenis) {
// //                 lenis.off('scroll', onScroll);
// //             } else {
// //                 window.removeEventListener('scroll', onScroll);
// //             }
// //             window.removeEventListener('resize', handleResize);
// //             images.forEach((img) => {
// //                 img.removeEventListener('load', handleImgSettled);
// //                 img.removeEventListener('error', handleImgSettled);
// //             });
// //             ctx.revert();
// //         };
// //     }, [pillars, lenis]);

// //     return (
// //         <section ref={sectionRef} className="bg-[#E3E3E3] text-[#1A1A1A] font-noto-sans pt-8 overflow-hidden">

// //             {/* --- TOP CONTENT --- */}
// //             <div className="max-w-[1440px] mx-auto px-8 md:px-16 pb-8">
// //                 <h2 className="arrive-fade-up text-5xl md:text-7xl font-bold tracking-tight mb-8">
// //                     {title}
// //                 </h2>
// //                 <hr className="arrive-fade-up border-gray-300 mb-12" />

// //                 <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
// //                     <h3 className="arrive-fade-up w-full lg:w-[50%] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
// //                         {headline}
// //                     </h3>
// //                     <p className="arrive-fade-up w-full lg:w-[40%] text-base md:text-lg text-gray-700 leading-relaxed font-medium mt-2">
// //                         {description}
// //                     </p>
// //                 </div>
// //             </div>

// //             {/* --- SCROLL TRACK (height = sticky viewport + horizontal travel distance) --- */}
// //             {pillars && (
// //                 <div ref={trackRef} className="relative w-full">
// //                     {/* --- STICKY VIEWPORT (replaces GSAP pin:true) --- */}
// //                     <div
// //                         ref={stickyRef}
// //                         className="sticky top-0 h-[100dvh] w-full bg-[#E3E3E3] overflow-hidden flex flex-col justify-center pt-16 md:pt-20"
// //                     >
// //                         <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6 w-full">
// //                             <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
// //                                 <span className="text-sm font-bold tracking-wide mr-4">Service pillars</span>
// //                                 <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
// //                                     {String(pillars.length).padStart(2, '0')}
// //                                 </span>
// //                             </div>
// //                         </div>

// //                         <div className="border-t border-white w-full"></div>

// //                         <div
// //                             ref={horizontalScrollRef}
// //                             className="flex flex-nowrap w-max will-change-transform"
// //                         >
// //                             {pillars.map((pillar, index) => (
// //                                 <div
// //                                     key={pillar.id}
// //                                     className={`w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col px-8 pt-8 pb-16 md:px-10 md:pt-10 md:pb-24 border-white ${
// //                                         index !== pillars.length - 1 ? 'border-r' : ''
// //                                     }`}
// //                                 >
// //                                     <h4 className="text-2xl md:text-3xl font-bold mb-6">
// //                                         {pillar.number}
// //                                     </h4>

// //                                     <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
// //                                         <img
// //                                             src={pillar.imageUrl}
// //                                             alt={pillar.title}
// //                                             className="w-full h-full object-cover"
// //                                         />
// //                                     </div>

// //                                     <h5 className="text-xl md:text-2xl font-bold leading-snug">
// //                                         {pillar.title}
// //                                     </h5>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //         </section>
// //     );
// // }

// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useLenis } from 'lenis/react';

// if (typeof window !== 'undefined') {
//     gsap.registerPlugin(ScrollTrigger);
// }

// export interface PillarCard {
//     id: string;
//     number: string;
//     title: string;
//     imageUrl: string;
// }

// export interface ServicePillarsProps {
//     title?: string;
//     headline?: string;
//     description?: string;
//     pillars?: PillarCard[];
// }

// export default function ServicePillars({
//     title,
//     headline,
//     description,
//     pillars,
// }: ServicePillarsProps) {
//     const sectionRef = useRef<HTMLElement>(null);
//     const trackRef = useRef<HTMLDivElement>(null);
//     const stickyRef = useRef<HTMLDivElement>(null);
//     const horizontalScrollRef = useRef<HTMLDivElement>(null);
//     const lenis = useLenis();

//     useEffect(() => {
//         const section = sectionRef.current;
//         const track = trackRef.current;
//         const sticky = stickyRef.current;
//         const horizontalScroll = horizontalScrollRef.current;

//         if (!section || !track || !sticky || !horizontalScroll) return;

//         const getScrollAmount = () => {
//             return Math.max(
//                 0,
//                 horizontalScroll.scrollWidth - sticky.clientWidth
//             );
//         };

//         /*
//          * The track must be:
//          * sticky viewport height + horizontal travel distance.
//          *
//          * This lets the sticky panel remain in place while vertical
//          * scrolling maps precisely to horizontal card movement.
//          */
//         const setTrackHeight = () => {
//             const horizontalDistance = getScrollAmount();
//             const stickyHeight = sticky.offsetHeight;

//             track.style.height = `${Math.ceil(
//                 stickyHeight + horizontalDistance
//             )}px`;
//         };

//         const syncScrollTriggerWithLenis = () => {
//             ScrollTrigger.update();
//         };

//         let resizeFrame: number | null = null;

//         const handleResize = () => {
//             if (resizeFrame) {
//                 cancelAnimationFrame(resizeFrame);
//             }

//             resizeFrame = requestAnimationFrame(() => {
//                 setTrackHeight();
//                 ScrollTrigger.refresh();
//             });
//         };

//         const ctx = gsap.context(() => {
//             const arrivalElements = gsap.utils.toArray('.arrive-fade-up');

//             gsap.fromTo(
//                 arrivalElements,
//                 {
//                     y: 50,
//                     opacity: 0,
//                 },
//                 {
//                     y: 0,
//                     opacity: 1,
//                     duration: 0.8,
//                     stagger: 0.1,
//                     ease: 'power3.out',
//                     scrollTrigger: {
//                         trigger: section,
//                         start: 'top 80%',
//                         toggleActions: 'play none none none',
//                     },
//                 }
//             );

//             setTrackHeight();

//             /*
//              * Important:
//              * There is intentionally NO `pin: true` here.
//              *
//              * Native CSS `sticky` performs the pinning.
//              * ScrollTrigger only maps vertical progress to horizontal x.
//              */
//             if (getScrollAmount() > 0) {
//                 gsap.to(horizontalScroll, {
//                     x: () => -getScrollAmount(),
//                     ease: 'none',
//                     force3D: true,
//                     scrollTrigger: {
//                         trigger: track,
//                         start: 'top top',
//                         end: () => `+=${getScrollAmount()}`,
//                         scrub: 0.2,
//                         invalidateOnRefresh: true,
//                     },
//                 });
//             }
//         }, section);

//         ScrollTrigger.addEventListener('refreshInit', setTrackHeight);

//         if (lenis) {
//             lenis.on('scroll', syncScrollTriggerWithLenis);
//         }

//         window.addEventListener('resize', handleResize);

//         const images = Array.from(
//             horizontalScroll.querySelectorAll<HTMLImageElement>('img')
//         );

//         let settledImages = 0;

//         const handleImageSettled = () => {
//             settledImages += 1;

//             if (settledImages === images.length) {
//                 handleResize();
//             }
//         };

//         images.forEach((image) => {
//             if (image.complete) {
//                 handleImageSettled();
//             } else {
//                 image.addEventListener('load', handleImageSettled);
//                 image.addEventListener('error', handleImageSettled);
//             }
//         });

//         requestAnimationFrame(() => {
//             setTrackHeight();
//             ScrollTrigger.refresh();
//         });

//         return () => {
//             if (resizeFrame) {
//                 cancelAnimationFrame(resizeFrame);
//             }

//             ScrollTrigger.removeEventListener('refreshInit', setTrackHeight);

//             if (lenis) {
//                 lenis.off('scroll', syncScrollTriggerWithLenis);
//             }

//             window.removeEventListener('resize', handleResize);

//             images.forEach((image) => {
//                 image.removeEventListener('load', handleImageSettled);
//                 image.removeEventListener('error', handleImageSettled);
//             });

//             ctx.revert();
//         };
//     }, [pillars, lenis]);

//     return (
//         <section
//             ref={sectionRef}
//             className="bg-[#E3E3E3] text-[#1A1A1A] font-noto-sans pt-8"
//         >
//             {/* --- TOP CONTENT --- */}
//             <div className="max-w-[1440px] mx-auto px-8 md:px-16 pb-8">
//                 <h2 className="arrive-fade-up text-5xl md:text-7xl font-bold tracking-tight mb-8">
//                     {title}
//                 </h2>

//                 <hr className="arrive-fade-up border-gray-300 mb-12" />

//                 <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
//                     <h3 className="arrive-fade-up w-full lg:w-[50%] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
//                         {headline}
//                     </h3>

//                     <p className="arrive-fade-up w-full lg:w-[40%] text-base md:text-lg text-gray-700 leading-relaxed font-medium mt-2">
//                         {description}
//                     </p>
//                 </div>
//             </div>

//             {/* --- STICKY HORIZONTAL PILLAR AREA --- */}
//             {pillars && pillars.length > 0 && (
//                 <div ref={trackRef} className="relative w-full">
//                     {/*
//                      * `sticky` is the native pin.
//                      *
//                      * It owns `overflow-hidden`, so moving cards cannot
//                      * create horizontal page overflow. Do NOT add
//                      * overflow-hidden back to the parent section/track.
//                      */}
//                     <div
//                         ref={stickyRef}
//                         className="sticky top-0 z-10 h-screen h-[100dvh] w-full overflow-hidden bg-[#E3E3E3] pt-16 md:pt-20"
//                     >
//                         <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6">
//                             <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
//                                 <span className="text-sm font-bold tracking-wide mr-4">
//                                     Service pillars
//                                 </span>

//                                 <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
//                                     {String(pillars.length).padStart(2, '0')}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="border-t border-white w-full" />

//                         <div
//                             ref={horizontalScrollRef}
//                             className="flex flex-nowrap w-max will-change-transform"
//                         >
//                             {pillars.map((pillar, index) => (
//                                 <div
//                                     key={pillar.id}
//                                     className={`w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col px-8 pt-8 pb-16 md:px-10 md:pt-10 md:pb-24 border-white ${
//                                         index !== pillars.length - 1
//                                             ? 'border-r'
//                                             : ''
//                                     }`}
//                                 >
//                                     <h4 className="text-2xl md:text-3xl font-bold mb-6">
//                                         {pillar.number}
//                                     </h4>

//                                     <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
//                                         <img
//                                             src={pillar.imageUrl}
//                                             alt={pillar.title}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>

//                                     <h5 className="text-xl md:text-2xl font-bold leading-snug">
//                                         {pillar.title}
//                                     </h5>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// }
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Ignore resize events caused purely by the mobile address bar
    // collapsing/expanding mid-scroll — this was forcing GSAP to
    // recompute pin distances while the user was actively scrolling,
    // which is what caused the freeze / overflow / partial movement.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // GSAP's dedicated fix for pinning on mobile: unifies touch and
    // wheel scrolling into one consistent model so scrub math behaves
    // the same on phone as it does on desktop, instead of fighting
    // native momentum-scroll physics.
    ScrollTrigger.normalizeScroll(true);
}

export interface PillarCard {
    id: string;
    number: string;
    title: string;
    imageUrl: string;
}

export interface ServicePillarsProps {
    title?: string;
    headline?: string;
    description?: string;
    pillars?: PillarCard[];
}

export default function ServicePillars({
    title,
    headline,
    description,
    pillars,
}: ServicePillarsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const horizontalScrollRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const sticky = stickyRef.current;
        const viewport = viewportRef.current;
        const horizontalScroll = horizontalScrollRef.current;

        if (!section || !track || !sticky || !viewport || !horizontalScroll) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                gsap.utils.toArray('.arrive-fade-up'),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            /*
             * Pin now runs on ALL breakpoints (no matchMedia gate).
             * `sticky` uses 100dvh (set in JSX) so it tracks the real
             * visible viewport live instead of the layout viewport,
             * which stops the "extra space" jump as the address bar
             * animates in/out.
             */
            const getScrollAmount = () =>
                Math.max(0, horizontalScroll.scrollWidth - viewport.clientWidth);

            const setTrackHeight = () => {
                track.style.height = `${Math.ceil(
                    sticky.offsetHeight + getScrollAmount()
                )}px`;
            };

            setTrackHeight();

            let tween: gsap.core.Tween | undefined;

            if (getScrollAmount() > 0) {
                tween = gsap.to(horizontalScroll, {
                    x: () => -getScrollAmount(),
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: track,
                        start: 'top top',
                        end: () => `+=${getScrollAmount()}`,
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                });
            }

            const handleRefreshInit = () => setTrackHeight();
            ScrollTrigger.addEventListener('refreshInit', handleRefreshInit);

            const handleLenisScroll = () => ScrollTrigger.update();
            if (lenis) lenis.on('scroll', handleLenisScroll);

            return () => {
                ScrollTrigger.removeEventListener('refreshInit', handleRefreshInit);
                if (lenis) lenis.off('scroll', handleLenisScroll);
                tween?.scrollTrigger?.kill();
                tween?.kill();
            };
        }, section);

        // Preload every card image eagerly — otherwise scrollWidth is
        // measured before images resolve, giving a wrong (too small)
        // pin distance that then has to jump-correct mid-scroll.
        const images = Array.from(
            horizontalScroll.querySelectorAll<HTMLImageElement>('img')
        );
        let settled = 0;
        const onImgSettled = () => {
            settled += 1;
            if (settled === images.length) {
                ScrollTrigger.refresh();
            }
        };
        images.forEach((img) => {
            if (img.complete) onImgSettled();
            else {
                img.addEventListener('load', onImgSettled);
                img.addEventListener('error', onImgSettled);
            }
        });

        // Real layout changes (orientation flip, keyboard dismiss, etc.)
        // still get a refresh — only the mobile-address-bar noise is
        // filtered out by `ignoreMobileResize` above.
        const handleOrientation = () => ScrollTrigger.refresh();
        window.addEventListener('orientationchange', handleOrientation);

        return () => {
            window.removeEventListener('orientationchange', handleOrientation);
            images.forEach((img) => {
                img.removeEventListener('load', onImgSettled);
                img.removeEventListener('error', onImgSettled);
            });
            ctx.revert();
        };
    }, [pillars, lenis]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#E3E3E3] text-[#1A1A1A] font-noto-sans pt-8 overflow-x-clip"
        >
            {/* --- TOP CONTENT --- */}
            <div className="max-w-[1440px] mx-auto px-8 md:px-16 pb-8">
                <h2 className="arrive-fade-up text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    {title}
                </h2>

                <hr className="arrive-fade-up border-gray-300 mb-12" />

                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
                    <h3 className="arrive-fade-up w-full lg:w-[50%] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
                        {headline}
                    </h3>

                    <p className="arrive-fade-up w-full lg:w-[40%] text-base md:text-lg text-gray-700 leading-relaxed font-medium mt-2">
                        {description}
                    </p>
                </div>
            </div>

            {pillars && pillars.length > 0 && (
                <div ref={trackRef} className="relative w-full">
                    {/*
                     * Sticky now active at ALL breakpoints (no `lg:` prefix).
                     * 100dvh instead of 100vh — follows the real visible
                     * viewport height live as the browser chrome animates.
                     */}
                    <div
                        ref={stickyRef}
                        className="sticky top-0 z-10 w-full h-[100dvh] overflow-x-clip bg-[#E3E3E3] pt-16 md:pt-20"
                    >
                        <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6">
                            <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
                                <span className="text-sm font-bold tracking-wide mr-4">
                                    Service pillars
                                </span>
                                <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {String(pillars.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-white w-full" />

                        {/* VIEWPORT: fixed-width boundary, clips only. */}
                        <div
                            ref={viewportRef}
                            className="w-full overflow-x-clip"
                        >
                            {/* ROW: content-sized track, transformed by GSAP. */}
                            <div
                                ref={horizontalScrollRef}
                                className="flex flex-nowrap w-max will-change-transform"
                            >
                                {pillars.map((pillar, index) => (
                                    <div
                                        key={pillar.id}
                                        className={`w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col px-8 pt-8 pb-16 md:px-10 md:pt-10 md:pb-24 border-white ${
                                            index !== pillars.length - 1
                                                ? 'border-r'
                                                : ''
                                        }`}
                                    >
                                        <h4 className="text-2xl md:text-3xl font-bold mb-6">
                                            {pillar.number}
                                        </h4>

                                        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                                            <img
                                                src={pillar.imageUrl}
                                                alt={pillar.title}
                                                loading="eager"
                                                decoding="async"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <h5 className="text-xl md:text-2xl font-bold leading-snug">
                                            {pillar.title}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}