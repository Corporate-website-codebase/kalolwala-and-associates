
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export interface StatCard {
    id: string;
    value: string;
    label: string;
    barColor?: string;
}

export interface ImpactStatsProps {
    gridCols?: string;
    stats: StatCard[];
}

export default function ImpactStats({ gridCols, stats }: ImpactStatsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ctx = gsap.context(() => {
            gsap.fromTo('.stat-card-reveal',
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                }
            );

            gsap.fromTo('.stat-bar-grow',
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                    }
                }
            );
        }, container);

        return () => ctx.revert();
    }, [stats]);

    return (
        <section ref={containerRef} className="bg-[#E3E3E3] font-noto-sans pt-18 relative z-10">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols || 'lg:grid-cols-4'} gap-3`}>
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            // Added @container for cqw support and min-w-0 to prevent flex grid blowouts
                            className="stat-card-reveal @container min-w-0 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-start h-full"
                        >
                            <h4 
                                // Added break-words and w-full to force long strings to wrap inside the padding
                                className={` ${stat.label.length>1?"text-3xl lg:text-[clamp(1rem,10cqw,3rem)]":"text-3xl lg:text-3xl"} font-black text-black mb-8 break-words w-full`}
                            >
                                {stat.value}
                            </h4>
                            
                            {stat.barColor && <div className="w-full h-[16px] border-b mb-6 relative">
                                <div 
                                    className="stat-bar-grow absolute top-0 left-0 h-full w-[45%]" 
                                    style={{ backgroundColor: stat.barColor }}
                                ></div>
                            </div>}
                            
                            {stat.label && (
                                <p className="text-sm md:text-base max-w-[70%] text-gray-700 leading-relaxed font-medium pr-4">
                                    {stat.label}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}