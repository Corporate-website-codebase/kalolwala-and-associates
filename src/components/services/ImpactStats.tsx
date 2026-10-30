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
    barColor: string;
}

export interface ImpactStatsProps {
    stats: StatCard[];
}

export default function ImpactStats({ stats }: ImpactStatsProps) {
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
        <section ref={containerRef} className="bg-[#E3E3E3] font-noto-sans py-24 relative z-10">
            <div className="max-w-[1440px] mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            className="stat-card-reveal bg-white rounded-2xl p-8 lg:p-10 shadow-sm flex flex-col justify-start h-full"
                        >
                            <h4 className="text-5xl lg:text-5xl font-black text-black mb-8">
                                {stat.value}
                            </h4>
                            
                            <div className="w-full h-[16px] border-b mb-6 relative">
                                <div 
                                    className="stat-bar-grow absolute top-0 left-0 h-full w-[45%]" 
                                    style={{ backgroundColor: stat.barColor }}
                                ></div>
                            </div>
                            
                            <p className="text-sm md:text-[14px] text-gray-700 leading-relaxed font-medium pr-4">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}