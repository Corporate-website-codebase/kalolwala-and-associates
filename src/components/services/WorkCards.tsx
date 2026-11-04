
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { ArrowUpRight, Play } from 'lucide-react';
import VideoRequestModal from './VideoRequestModal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Avoids the SSR warning for useLayoutEffect in Next.js
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface WorkCardItem {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    subtitle?: string;
}

export interface WorkTab {
    id: string;
    label: string;
    works: WorkCardItem[];
}

export interface WorkCardsProps {
    works?: WorkCardItem[];
    tabs?: WorkTab[];
    isVideo?: boolean;
    isTabbed?: boolean;
}

export default function WorkCards({
    works = [],
    tabs = [],
    isVideo = false,
    isTabbed = false
}: WorkCardsProps) {
    const router = useRouter();
    const lenis = useLenis();
    const sectionRef = useRef<HTMLDivElement>(null);
    const yellowOverlayRef = useRef<HTMLDivElement>(null);
    const blackOverlayRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Animation locks & state (refs so that they never trigger re-renders mid-animation)
    const hasRevealed = useRef(false);
    const isSwitchingRef = useRef(false);
    const prevHeightRef = useRef(0);
    const switchTlRef = useRef<gsap.core.Timeline | null>(null);

    // Modal & Tab state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string>("");
    const [activeTabId, setActiveTabId] = useState<string>(tabs.length > 0 ? tabs[0].id : "");

    // Determine current cards to display
    const currentWorks = isTabbed
        ? (tabs.find(tab => tab.id === activeTabId)?.works || [])
        : works;

    // 1. Initial Reveal (ScrollTrigger)
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const st = ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true, // Only trigger the initial scroll reveal once
            onEnter: () => {
                hasRevealed.current = true;
                const cards = gridRef.current?.querySelectorAll('.work-card');
                if (!cards || cards.length === 0) return;

                gsap.fromTo(
                    cards,
                    { y: 48, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                    }
                );
            }
        });

        return () => st.kill();
    }, []);

    // 2. Tab Change: height morph + staggered entrance (runs BEFORE paint)
    useIsoLayoutEffect(() => {
        const grid = gridRef.current;
        if (!grid || !isSwitchingRef.current) return;

        const cards = grid.querySelectorAll('.work-card');
        const startHeight = prevHeightRef.current;

        // Measure the natural height of the new content
        grid.style.height = 'auto';
        const endHeight = grid.offsetHeight;
        grid.style.height = `${startHeight}px`;

        // Hide the new cards before the browser paints them
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

        const tl = gsap.timeline({
            onComplete: () => {
                grid.style.height = '';
                isSwitchingRef.current = false;
                switchTlRef.current = null;
                ScrollTrigger.refresh();
            }
        });

        // Container smoothly grows/shrinks to the new height so nothing below jumps
        tl.to(grid, {
            height: endHeight,
            duration: 0.5,
            ease: 'power3.inOut',
        }, 0);

        // Cards flow in slightly after the container starts moving
        tl.to(cards, {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power3.out',
        }, 0.1);

        switchTlRef.current = tl;
    }, [activeTabId]);

    // Cleanup any running tab animation on unmount
    useEffect(() => {
        return () => {
            switchTlRef.current?.kill();
        };
    }, []);

    // 3. Handle Tab Click (Triggers Exit Animation)
    const handleTabClick = (newTabId: string) => {
        if (newTabId === activeTabId || isSwitchingRef.current) return;

        // If user clicks a tab before scrolling down to the section, just swap it instantly
        if (!hasRevealed.current) {
            setActiveTabId(newTabId);
            return;
        }

        const grid = gridRef.current;
        const cards = grid?.querySelectorAll('.work-card');

        if (!grid || !cards || cards.length === 0) {
            setActiveTabId(newTabId);
            return;
        }

        isSwitchingRef.current = true;

        // Lock the current height so the layout doesn't collapse while cards are removed
        prevHeightRef.current = grid.offsetHeight;
        grid.style.height = `${prevHeightRef.current}px`;

        gsap.killTweensOf(cards);

        // Stagger Out
        gsap.to(cards, {
            y: 20,
            opacity: 0,
            scale: 0.97,
            stagger: { each: 0.04, from: 'start' },
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                // Swap DOM after the exit finishes; the layout effect above runs the entrance
                setActiveTabId(newTabId);
            }
        });
    };

    const resetScrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    const handleCardClick = (e: React.MouseEvent, work: WorkCardItem) => {
        e.preventDefault();

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
            return;
        }

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
            {isVideo && (
                <VideoRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    videoTitle={selectedVideo}
                />
            )}

            <div ref={yellowOverlayRef} className="fixed inset-0 w-full h-full bg-[#ffcb03] z-[9998] pointer-events-none -translate-x-full" />
            <div ref={blackOverlayRef} className="fixed inset-0 w-full h-full bg-[#1A1A1A] z-[9999] pointer-events-none -translate-x-full" />

            <section ref={sectionRef} className="pt-10 pb-10 bg-[#E3E3E3] font-sans">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">

                    {/* Tab Navigation */}
                    {isTabbed && tabs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-10 overflow-x-auto  scrollbar-hide">
                            {tabs.map((tab) => {
                                const isActive = activeTabId === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabClick(tab.id)}
                                        aria-pressed={isActive}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
                                            isActive
                                            ? "bg-[#1A1A1A] text-white shadow-md"
                                            : "bg-white/60 text-gray-600 hover:bg-white hover:text-black border border-gray-200/50"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Cards Grid */}
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
                        {currentWorks.map((work) => {
                            const Wrapper = isVideo ? 'div' : 'a';
                            const wrapperProps = isVideo
                                ? { onClick: (e: React.MouseEvent) => handleCardClick(e, work) }
                                : { href: work.link, onClick: (e: React.MouseEvent) => handleCardClick(e, work) };

                            return (
                                // @ts-ignore
                                <Wrapper
                                    key={work.id}
                                    {...wrapperProps}
                                    /* opacity-0 by default to prevent flashes; GSAP owns all transform/opacity animation */
                                    className={`work-card opacity-0 group relative flex flex-col h-full overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer ${
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