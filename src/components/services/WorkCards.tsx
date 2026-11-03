
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { ArrowUpRight, Play } from 'lucide-react';
import VideoRequestModal from './VideoRequestModal';
// import VideoRequestModal from './VideoRequestModal'; // Ensure this path matches your project structure

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} 

export interface WorkCardItem {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    subtitle?: string;
}

export interface WorkCardsProps {
    works: WorkCardItem[];
    isVideo?: boolean;
}

export default function WorkCards({ works, isVideo = false }: WorkCardsProps) {
    const router = useRouter();
    const lenis = useLenis();
    const sectionRef = useRef<HTMLDivElement>(null);
    const yellowOverlayRef = useRef<HTMLDivElement>(null);
    const blackOverlayRef = useRef<HTMLDivElement>(null);

    // 1. Added modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string>("");

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

    const resetScrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    const handleCardClick = (e: React.MouseEvent, work: WorkCardItem) => {
        e.preventDefault(); 

        // 2. Intercept video clicks to open the modal instead of routing
        if (isVideo) {
            if (typeof window !== "undefined") {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                    event: "video_select",
                    video_title: work.title,
                });
            }
            setSelectedVideo(work.title);
            setIsModalOpen(true);
            return; // Stop execution here so it doesn't navigate
        }

        // 3. Standard navigation transition for non-video cards
        if (!yellowOverlayRef.current || !blackOverlayRef.current) {
            resetScrollToTop();
            router.push(work.link);
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                resetScrollToTop();
                router.push(work.link);
                requestAnimationFrame(resetScrollToTop);
                setTimeout(resetScrollToTop, 50);

                setTimeout(() => {
                    gsap.set([yellowOverlayRef.current, blackOverlayRef.current], { xPercent: -100 });
                }, 1500);
            }
        });

        tl.to(yellowOverlayRef.current, { xPercent: 100, duration: 0.7, ease: 'power4.inOut' })
          .to(blackOverlayRef.current, { xPercent: 100, duration: 0.7, ease: 'power4.inOut' }, "-=0.55");
    };

    return (
        <>
            {/* Render the modal if in video mode */}
            {isVideo && (
                <VideoRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    videoTitle={selectedVideo}
                />
            )}

            <div ref={yellowOverlayRef} className="fixed inset-0 w-full h-full bg-[#ffcb03] z-[9998] pointer-events-none -translate-x-full" />
            <div ref={blackOverlayRef} className="fixed inset-0 w-full h-full bg-[#1A1A1A] z-[9999] pointer-events-none -translate-x-full" />

            <section ref={sectionRef} className="py-24 bg-[#E3E3E3] font-sans">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {works.map((work) => {
                            
                            // 4. Swap to a <div> wrapper for videos to prevent native anchor behavior issues
                            const Wrapper = isVideo ? 'div' : 'a';
                            const wrapperProps = isVideo
                                ? { onClick: (e: React.MouseEvent) => handleCardClick(e, work) }
                                : { href: work.link, onClick: (e: React.MouseEvent) => handleCardClick(e, work) };

                            return (
                                // @ts-ignore
                                <Wrapper 
                                    key={work.id}
                                    {...wrapperProps}
                                    className={`work-card group relative flex flex-col h-full overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                                        isVideo 
                                        ? "bg-white/60 backdrop-blur-xl border border-white" 
                                        : "bg-[#F4F4F4]"
                                    }`}
                                >
                                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200">
                                        <img 
                                            src={work.imageUrl} 
                                            alt={work.title}
                                            className={`w-full h-full object-cover object-top object-right transform transition-transform duration-700 ease-out group-hover:scale-105 ${
                                                isVideo ? "opacity-80 group-hover:opacity-100" : ""
                                            }`}
                                        />
                                        {isVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                                                    <Play className="w-6 h-6 text-white" fill="white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col justify-between flex-grow">
                                        <h3 className="font-medium text-[#1A1A1A] uppercase mb-2 tracking-wide transition-colors group-hover:text-black" style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}>
                                            {work.title}
                                        </h3>
                                        
                                        <div className="mt-6 pt-4 border-t flex justify-between items-center border-neutral-900/10">
                                            <p className="uppercase tracking-widest font-bold transition-colors duration-300 text-gray-500 group-hover:text-[#1A1A1A]" style={{ fontSize: "10px" }}>
                                                {isVideo ? "REQUEST ACCESS" : (work.subtitle || "Discover More")}
                                            </p>
                                            
                                            {!isVideo && (
                                                <div className="bg-white p-2 rounded-full border border-white/40 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:shadow-sm transition-all duration-300">
                                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}