
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
                        className="sticky top-0 z-10 w-full  overflow-x-clip bg-[#E3E3E3] pt-16 md:pt-20"
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

                                        {/* <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                                            <img
                                                src={pillar.imageUrl}
                                                alt={pillar.title}
                                                loading="eager"
                                                decoding="async"
                                                className="w-full h-full object-cover"
                                            />
                                        </div> */}

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