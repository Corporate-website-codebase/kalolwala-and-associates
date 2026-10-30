// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
//     title ,
//     headline,
//     description,
//     pillars
// }: ServicePillarsProps) {
//     const sectionRef = useRef<HTMLDivElement>(null);
//     const pinContainerRef = useRef<HTMLDivElement>(null);
//     const horizontalScrollRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const section = sectionRef.current;
//         const pinContainer = pinContainerRef.current;
//         const horizontalScroll = horizontalScrollRef.current;

//         if (!section || !pinContainer || !horizontalScroll) return;

//         let ctx = gsap.context(() => {
            
//             // --- Smooth Arrival for text ---
//             const arrivalElements = gsap.utils.toArray('.arrive-fade-up');
            
//             gsap.fromTo(arrivalElements, 
//                 { y: 50, opacity: 0 }, 
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
//                     }
//                 }
//             );

//             // --- Horizontal Scroll (Pinned) ---
//             const getScrollAmount = () => horizontalScroll.scrollWidth - window.innerWidth;
            
//             if (getScrollAmount() > 0) {
//                 gsap.to(horizontalScroll, {
//                     x: () => -getScrollAmount(), 
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: pinContainer, 
//                         // Changed to 'top top' to rely on the container's internal top padding for spacing
//                         start: "top top", 
//                         end: () => `+=${getScrollAmount()}`, 
//                         pin: true,
//                         scrub: 1,
//                         anticipatePin: 1, 
//                         invalidateOnRefresh: true, 
//                     }
//                 });
//             }
//         }, section);

//         return () => ctx.revert();
//     }, [pillars]);

//     return (
//         <section ref={sectionRef} className="bg-[#E3E3E3] text-[#1A1A1A] font-noto-sans pt-8 overflow-hidden">
            
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

//             {/* --- PINNED SECTION --- */}
//             {/* Added pt-16 md:pt-20 for breathing room above the pill. Removed bottom padding here. */}
//             {pillars && <div ref={pinContainerRef} className="w-full bg-[#E3E3E3] pt-16 md:pt-20">
                
//                 <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6">
//                     <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
//                         <span className="text-sm font-bold tracking-wide mr-4">Service pillars</span>
//                         <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
//                             {String(pillars.length).padStart(2, '0')}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="border-t border-white w-full"></div>
                
//                 <div 
//                     ref={horizontalScrollRef} 
//                     className="overflow-x-hidden flex flex-nowrap w-max"
//                 >
//                     {pillars.map((pillar, index) => (
//                         <div 
//                             key={pillar.id} 
//                             // Moved the bottom padding (pb-16 md:pb-24) inside the card so borders reach the bottom
//                             className={`w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col px-8 pt-8 pb-16 md:px-10 md:pt-10 md:pb-24 border-white ${
//                                 index !== pillars.length - 1 ? 'border-r' : ''
//                             }`}
//                         >
//                             <h4 className="text-2xl md:text-3xl font-bold mb-6">
//                                 {pillar.number}
//                             </h4>
                            
//                             <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
//                                 <img 
//                                     src={pillar.imageUrl} 
//                                     alt={pillar.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
                            
//                             <h5 className="text-xl md:text-2xl font-bold leading-snug">
//                                 {pillar.title}
//                             </h5>
//                         </div>
//                     ))}
//                 </div>
//             </div>}
            
//         </section>
//     );
// }
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
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
    pillars
}: ServicePillarsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const horizontalScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinContainer = pinContainerRef.current;
        const horizontalScroll = horizontalScrollRef.current;

        if (!section || !pinContainer || !horizontalScroll) return;

        let ctx = gsap.context(() => {
            
            // --- Smooth Arrival for text ---
            const arrivalElements = gsap.utils.toArray('.arrive-fade-up');
            
            gsap.fromTo(arrivalElements, 
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
                    }
                }
            );

            // --- Horizontal Scroll (Pinned) ---
            // Fix: Wrap in Math.max to prevent negative scroll amounts on mobile initialization
            const getScrollAmount = () => Math.max(0, horizontalScroll.scrollWidth - window.innerWidth);
            
            if (getScrollAmount() > 0) {
                gsap.to(horizontalScroll, {
                    x: () => -getScrollAmount(), 
                    ease: "none",
                    scrollTrigger: {
                        trigger: pinContainer, 
                        start: "top top", 
                        end: () => `+=${getScrollAmount()}`, 
                        pin: true,
                        scrub: 1,
                        // Fix: anticipatePin removed to prevent layout jumping
                        invalidateOnRefresh: true, 
                    }
                });
            }
        }, section);

        return () => ctx.revert();
    }, [pillars]);

    return (
        // Fix: Removed `overflow-hidden` from the parent section so GSAP's pin-spacer can function properly
        <section ref={sectionRef} className="bg-[#E3E3E3] text-[#1A1A1A] font-noto-sans pt-8">
            
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

            {/* --- PINNED SECTION --- */}
            {pillars && <div ref={pinContainerRef} className="w-full bg-[#E3E3E3] pt-16 md:pt-20">
                
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6">
                    <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
                        <span className="text-sm font-bold tracking-wide mr-4">Service pillars</span>
                        <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            {String(pillars.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <div className="border-t border-white w-full"></div>
                
                <div 
                    ref={horizontalScrollRef} 
                    className="overflow-x-hidden flex flex-nowrap w-max"
                >
                    {pillars.map((pillar, index) => (
                        <div 
                            key={pillar.id} 
                            className={`w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col px-8 pt-8 pb-16 md:px-10 md:pt-10 md:pb-24 border-white ${
                                index !== pillars.length - 1 ? 'border-r' : ''
                            }`}
                        >
                            <h4 className="text-2xl md:text-3xl font-bold mb-6">
                                {pillar.number}
                            </h4>
                            
                            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                                <img 
                                    src={pillar.imageUrl} 
                                    alt={pillar.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <h5 className="text-xl md:text-2xl font-bold leading-snug">
                                {pillar.title}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>}
            
        </section>
    );
}