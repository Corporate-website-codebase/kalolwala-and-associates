'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export interface TextSegment {
    text: string;
    isBold: boolean;
}

export interface OneTeamStatementProps {
    subtitle: string;
    mainTitle: string;
    outerImage: string;
    innerImage: string;
    paragraphSegments: TextSegment[];
}

export default function OneTeamStatement({
    subtitle,
    mainTitle,
    outerImage,
    innerImage,
    paragraphSegments
}: OneTeamStatementProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const innerImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const card = cardRef.current;
        if (!wrapper || !card) return;

        let ctx = gsap.context(() => {
            
            gsap.fromTo(card,
                { 
                    rotationX: 35,       
                    y: 150,              
                    z: -200,             
                    scale: 0.9,          
                    opacity: 0.5,
                    boxShadow: "0px -5px 10px rgba(0,0,0,0)",
                    transformOrigin: "top center", 
                },
                {
                    rotationX: 0,
                    y: 0,
                    z: 0,
                    scale: 1,
                    opacity: 1,
                    boxShadow: "0px -30px 60px rgba(0,0,0,0.15)", 
                    ease: "power2.out", 
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top 90%", 
                        end: "top 20%",   
                        scrub: 1,         
                    }
                }
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top 50%',
                    toggleActions: 'play none none none',
                }
            });

            tl.fromTo('.nested-img-wrapper', 
                { clipPath: 'inset(15% 15% 15% 15% round 30px)', scale: 0.85, opacity: 0 },
                { clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
            )
            .fromTo('.main-title-reveal',
                { y: 80, opacity: 0, rotationX: 20 },
                { y: 0, opacity: 1, rotationX: 0, duration: 0.9, ease: 'power3.out' },
                "-=0.9"
            )
            .fromTo('.text-segment',
                { y: 40, opacity: 0, rotationX: 30 },
                { 
                    y: 0, 
                    opacity: 1, 
                    rotationX: 0, 
                    stagger: 0.04, // Sped up stagger since we are animating by word now
                    duration: 0.8, 
                    ease: 'back.out(1.2)' 
                },
                "-=0.5"
            );

        }, wrapper);

        return () => ctx.revert();
    }, [paragraphSegments]);

    // Track mouse globally across the entire white card
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!innerImageRef.current) return;
        
        // Always calculate relative to the inner image's position
        const { left, top, width, height } = innerImageRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // Multiplier lowered to 0.04 since distance from cursor to image can now be large
        const x = (e.clientX - centerX) * 0.04;
        const y = (e.clientY - centerY) * 0.04;

        gsap.to(innerImageRef.current, { 
            x, 
            y, 
            scale: 1.05, 
            duration: 0.6, 
            ease: 'power2.out' 
        });
    };

    const handleMouseLeave = () => {
        if (!innerImageRef.current) return;
        
        gsap.to(innerImageRef.current, { 
            x: 0, 
            y: 0, 
            scale: 1,
            duration: 0.8, 
            ease: 'elastic.out(1, 0.3)' 
        });
    };

    return (
        <div ref={wrapperRef} className="relative z-30 perspective-[2000px] font-noto-sans">
            
            <div className="absolute inset-0 top-[0vh] bg-[#ffcb03] -z-10" />
            
            {/* Added mouse events to the entire card */}
            <section 
                ref={cardRef} 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative bg-white pt-24 pb-32 overflow-hidden"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
            >
                <div className="max-w-[1440px] mx-auto px-8 md:px-16">
                    
                    <div className="mb-12">
                        <h3 className="text-lg md:text-xl font-bold text-black inline-block border-b-4 border-black pb-1">
                            {subtitle}
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row items-end gap-8 mb-10">
                        
                        <div className="nested-img-wrapper relative w-[230px] md:w-[250px] lg:w-[280px] aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                            <img 
                                src={outerImage} 
                                alt="Background blur" 
                                className="absolute inset-0 w-full h-full object-cover filter grayscale blur-sm scale-110" 
                            />
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div 
                                    ref={innerImageRef}
                                    className="w-[65%] h-[70%] rounded-xl overflow-hidden shadow-2xl"
                                >
                                    <img 
                                        src={innerImage} 
                                        alt="Clear subject" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 
                            className="main-title-reveal text-7xl md:text-[110px] lg:text-[140px] font-black leading-none tracking-tight text-black pb-4 md:pb-0" 
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {mainTitle}
                        </h2>
                    </div>

                    <div className="max-w-6x mt-4 md:mt-8">
                        <p className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-tight" style={{ perspective: '800px' }}>
                            {paragraphSegments.map((segment, segmentIndex) => (
                                // Wrapper for the segment purely for styling
                                <span 
                                    key={segmentIndex} 
                                    className={segment.isBold ? "font-bold text-black" : "font-bold text-[#999999]"}
                                >
                                    {/* Split the segment into individual words so they wrap naturally */}
                                    {segment.text.split(' ').map((word, wordIndex) => (
                                        <span 
                                            key={`${segmentIndex}-${wordIndex}`}
                                            className="text-segment inline-block mr-[0.25em] mb-2 transform-style-3d"
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}