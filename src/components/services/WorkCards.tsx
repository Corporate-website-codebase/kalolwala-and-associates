'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export interface WorkCardItem {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
}

export interface WorkCardsProps {
    works: WorkCardItem[];
}

export default function WorkCards({ works }: WorkCardsProps) {
    const router = useRouter();
    const sectionRef = useRef<HTMLDivElement>(null);
    const yellowOverlayRef = useRef<HTMLDivElement>(null);
    const blackOverlayRef = useRef<HTMLDivElement>(null);

    // 1. Initial Scroll Entrance Animation
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let ctx = gsap.context(() => {
            gsap.fromTo('.work-card',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        }, section);

        return () => ctx.revert();
    }, [works]);

    // 2. Custom Page Transition Logic
    const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault(); // Stop instant navigation

        if (!yellowOverlayRef.current || !blackOverlayRef.current) {
            router.push(href);
            return;
        }

        // Modern sweep transition
        const tl = gsap.timeline({
            onComplete: () => {
                // Navigate to the case study once the black screen covers the viewport
                router.push(href);
                
                // Optional: Reset overlays after a delay in case the user navigates back
                setTimeout(() => {
                    gsap.set([yellowOverlayRef.current, blackOverlayRef.current], { xPercent: -100 });
                }, 1500);
            }
        });

        // Yellow sweeps in first, Black trails slightly behind it
        tl.to(yellowOverlayRef.current, { xPercent: 100, duration: 0.7, ease: 'power4.inOut' })
          .to(blackOverlayRef.current, { xPercent: 100, duration: 0.7, ease: 'power4.inOut' }, "-=0.55");
    };

    return (
        <>
            {/* 
                TRANSITION OVERLAYS (Fixed to the viewport) 
                Starts translated -100% (off-screen to the left)
            */}
            <div 
                ref={yellowOverlayRef} 
                className="fixed inset-0 w-full h-full bg-[#ffcb03] z-[9998] pointer-events-none -translate-x-full" 
            />
            <div 
                ref={blackOverlayRef} 
                className="fixed inset-0 w-full h-full bg-[#1A1A1A] z-[9999] pointer-events-none -translate-x-full" 
            />

            {/* MAIN COMPONENT */}
            <section ref={sectionRef} className="py- bg-[#E3E3E3] font-sans">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16">
                    
                    {/* Grid Layout matching the 3-column design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {works.map((work) => (
                            <a 
                                key={work.id}
                                href={work.link}
                                onClick={(e) => handleCardClick(e, work.link)}
                                className="work-card group block bg-[#F4F4F4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="w-full aspect-[16/9] overflow-hidden bg-gray-200 relative">
                                    <img 
                                        src={work.imageUrl} 
                                        alt={work.title}
                                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Content Block */}
                                <div className="p-5 flex flex-col justify-between">
                                    
                                    {/* Client Title */}
                                    <h3 className="text-[17px] font-medium text-[#1A1A1A] uppercase tracking-wide mb-2">
                                        {work.title}
                                    </h3>
                                    
                                    {/* Subtle Divider */}
                                    <hr className="border-gray-300 mb-2" />
                                    
                                    {/* Footer / Discover More */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors duration-300">
                                            Discover More
                                        </span>
                                        
                                        {/* Icon Button */}
                                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300 shadow-sm">
                                            {/* Top-Right Arrow SVG */}
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth={2} 
                                                stroke="currentColor" 
                                                className="w-4 h-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}