
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);
}

export interface PillarCard {
    id: string;
    number: string;
    title: string;
    imageUrl: string;
}

export interface ExtraContentItem {
    heading: string;
    para: string;
}

export interface ServicePillarsProps {
    title?: string;
    headline?: string;
    header?: string;
    description?: string;
    pillars?: PillarCard[];
    extraContentHeading?: string;
    extraContentPara?: ExtraContentItem[];
}

export default function ServicePillars({
    title,
    headline,
    header,
    description,
    pillars,
    extraContentHeading,
    extraContentPara,
}: ServicePillarsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const extraRef = useRef<HTMLDivElement>(null);
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

            // --- Extra content section: underline progress + staggered pop-in ---
            const extra = extraRef.current;
            if (extra) {
                const underline = extra.querySelector('.extra-underline');
                const items = Array.from(extra.querySelectorAll('.extra-item'));

                const extraTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: extra,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });

                if (underline) {
                    extraTimeline.fromTo(
                        underline,
                        { scaleX: 0, transformOrigin: 'left center' },
                        {
                            scaleX: 1,
                            transformOrigin: 'left center',
                            duration: 1,
                            ease: 'power2.out',
                        }
                    );
                }

                if (items.length > 0) {
                    extraTimeline.fromTo(
                        items,
                        { y: 30, scale: 0.92, opacity: 0 },
                        {
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: 'back.out(1.6)',
                        },
                        underline ? '-=0.5' : 0
                    );
                }
            }

            const getScrollAmount = () =>
                Math.max(0, horizontalScroll.scrollWidth - viewport.clientWidth);

            // The track's height is exactly: sticky's own content height
            // (how long it visually occupies the viewport) + however far
            // we need to scroll to translate the row fully into view.
            // If this value is ever stale/too large, CSS `sticky` stays
            // pinned past the point the horizontal animation finishes —
            // which reads as "dead space" before the next section. We
            // keep this perpetually accurate via ResizeObserver instead
            // of measuring once.
            const setTrackHeight = () => {
                const amount = getScrollAmount();
                track.style.height = `${Math.ceil(sticky.offsetHeight + amount)}px`;
            };

            let tween: gsap.core.Tween | undefined;
            let scrollTriggerInstance: ScrollTrigger | undefined;

            const setupTween = () => {
                // Kill any previous instance before re-creating, so we
                // don't stack multiple tweens/triggers on recalculation.
                tween?.scrollTrigger?.kill();
                tween?.kill();

                const amount = getScrollAmount();
                if (amount <= 0) return;

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
                scrollTriggerInstance = tween.scrollTrigger as ScrollTrigger;
            };

            setTrackHeight();
            setupTween();

            // --- Keep measurements accurate as content/layout changes ---
            // Covers: webfont swap reflow, icon/text size changes,
            // viewport resize, orientation change, removed/added images,
            // dynamic pillar count — anything that changes scrollWidth
            // or sticky's natural height gets caught here instead of
            // relying on a single snapshot taken at mount time.
            let rafId: number | null = null;
            const scheduleRecalc = () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    setTrackHeight();
                    ScrollTrigger.refresh();
                });
            };

            const resizeObserver = new ResizeObserver(() => {
                scheduleRecalc();
            });
            resizeObserver.observe(sticky);
            resizeObserver.observe(horizontalScroll);

            const handleRefreshInit = () => setTrackHeight();
            ScrollTrigger.addEventListener('refreshInit', handleRefreshInit);

            const handleLenisScroll = () => ScrollTrigger.update();
            if (lenis) lenis.on('scroll', handleLenisScroll);

            // Double-rAF initial measurement: guarantees layout (fonts,
            // icon sizing, flex wrapping) has fully settled before we
            // lock in the first real height, instead of trusting a
            // measurement taken mid-layout on the very first paint.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTrackHeight();
                    ScrollTrigger.refresh();
                });
            });

            return () => {
                if (rafId) cancelAnimationFrame(rafId);
                resizeObserver.disconnect();
                ScrollTrigger.removeEventListener('refreshInit', handleRefreshInit);
                if (lenis) lenis.off('scroll', handleLenisScroll);
                tween?.scrollTrigger?.kill();
                tween?.kill();
            };
        }, section);

        const handleOrientation = () => ScrollTrigger.refresh();
        window.addEventListener('orientationchange', handleOrientation);

        return () => {
            window.removeEventListener('orientationchange', handleOrientation);
            ctx.revert();
        };
    }, [pillars, lenis, extraContentHeading, extraContentPara]);

    const hasExtraContent =
        !!extraContentHeading || (extraContentPara && extraContentPara.length > 0);

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

                    <p className="arrive-fade-up w-full lg:w-[40%] text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line font-medium mt-2">
                        {description}
                    </p>
                </div>
            </div>

            {/* --- EXTRA CONTENT (frameworks / standards) --- */}
            {hasExtraContent && (
                <div ref={extraRef} className="w-full">
                    <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-8 pb-12 md:pb-16">
                        {extraContentHeading && (
                            <div className="mb-10 md:mb-14">
                                <h3
                                    className="font-bold text-[#1A1A1A] leading-tight"
                                    style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
                                >
                                    {extraContentHeading}
                                </h3>
                                <div className="extra-underline mt-4 h-[5px] md:h-[6px] bg-black w-[clamp(140px,17vw,240px)] origin-left" />
                            </div>
                        )}

                        {extraContentPara && extraContentPara.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-10 md:gap-y-14">
                                {extraContentPara.map((item, index) => (
                                    <div key={index} className="extra-item">
                                        <h4
                                            className="font-bold text-[#1A1A1A] leading-[1.15] mb-4"
                                            style={{ fontSize: 'clamp(20px, 1.9vw, 26px)' }}
                                        >
                                            {item.heading}
                                        </h4>
                                        <p
                                            className="text-[#4A4A4A] leading-[1.6] md:max-w-[34ch]"
                                            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
                                        >
                                            {item.para}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {pillars && pillars.length > 0 && (
                <div ref={trackRef} className="relative w-full">
                    <div
                        ref={stickyRef}
                        className="sticky top-0 z-10 w-full overflow-x-clip bg-[#E3E3E3] pt-16 md:pt-20"
                    >
                        <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-6">
                            <div className="arrive-fade-up inline-flex items-center bg-white rounded-full pl-6 pr-1 py-1 shadow-sm">
                                <span className="text-sm font-bold tracking-wide mr-4">
                                    {header || 'Service pillars'}
                                </span>
                                <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {String(pillars.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-white w-full" />

                        <div ref={viewportRef} className="w-full overflow-x-clip">
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
                                        <h4 className="text-2xl md:text-3xl font-bold mb-2">
                                            {pillar.number}
                                        </h4>

                                        <ArrowRight
                                            className="w-12 rotate-40 h-12 text-black mb-6"
                                            style={{ fontWeight: 1000 }}
                                        />

                                        <h5 className="text-xl md:text-3xl font-bold leading-snug">
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