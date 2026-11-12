
'use client';

import Link from 'next/link';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFaqAnswer } from '@/data/faqData';

export interface FaqItem {
    id: string;
    question: string;
    link?: string; // only used as a fallback if no answer is found for the question
}

export interface ServiceHeaderProps {
    title: React.ReactNode;
    description: string;
    faqs: FaqItem[];
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ServiceHeader({ title, description, faqs }: ServiceHeaderProps) {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const scrollRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // 
    // LENIS WORKAROUND (desktop inner scroll)
    // Lenis attaches its wheel/touch listeners on the window (or a wrapper ancestor).
    // stopPropagation() on the scroll container prevents those events from ever
    // reaching Lenis, so the native inner scroll works freely. When the list is at
    // its top/bottom edge, we let the event through so scrolling chains back to the page.
    //
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const isScrollable = () => el.scrollHeight > el.clientHeight + 1;

        const atBoundary = (deltaY: number) => {
            const goingDown = deltaY > 0;
            const atTop = el.scrollTop <= 0;
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
            return (goingDown && atBottom) || (!goingDown && atTop);
        };

        const onWheel = (e: WheelEvent) => {
            // At a boundary (or nothing to scroll): let the page/Lenis take over.
            if (!isScrollable() || atBoundary(e.deltaY)) return;
            // Inside the list: keep Lenis out so native scrolling works.
            e.stopPropagation();
        };

        const onTouchMove = (e: TouchEvent) => {
            if (isScrollable()) e.stopPropagation();
        };

        el.addEventListener('wheel', onWheel);
        el.addEventListener('touchmove', onTouchMove, { passive: true });

        return () => {
            el.removeEventListener('wheel', onWheel);
            el.removeEventListener('touchmove', onTouchMove);
        };
    }, []);

    const toggleFaq = useCallback((id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });

        // Keep the opened item visible inside the desktop scroll area
        // (only scrolls the container itself, never the page — safe on mobile too).
        requestAnimationFrame(() => {
            setTimeout(() => {
                const item = itemRefs.current[id];
                const container = scrollRef.current;
                if (!item || !container) return;

                const itemRect = item.getBoundingClientRect();
                const contRect = container.getBoundingClientRect();

                if (itemRect.bottom > contRect.bottom) {
                    container.scrollBy({
                        top: itemRect.bottom - contRect.bottom + 16,
                        behavior: 'smooth',
                    });
                }
            }, 200);
        });
    }, []);

    return (
        <section className="marginal mx-auto font-noto-sans px-8  max-w-[1600px]">
            {/* 
                Main Content Grid 
                The left side holds both the Title and Description.
                The right side holds the FAQs, starting at the same top baseline as the Title.
            */}
            <div className="grid grid-cols-1 px-12 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Left Column: Title + Paragraph (Dictates the total height) */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="mb-8 md:mb-12 ">
                        <h1
                            className="font-noto-sans tracking-tight leading-[1.1]"
                            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                        >
                            {title}
                        </h1> 
                    </div>
                    
                    <p
                        className="leading-relaxed text-gray-800 pt-1"
                        style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}
                    >
                        {description}
                    </p>
                </div>

                {/* Right Column: FAQs Wrapper */}
                <div className="lg:col-span-5 relative">
                    
                    {/* 
                        Absolute positioning on desktop forces this container to exactly match 
                        the height of the left column (Title + Paragraph). This prevents it from 
                        expanding the grid and forces the scrollbar to appear.
                    */}
                    <div className="lg:absolute lg:inset-0 w-full h-full flex flex-col border-t lg:border-t-0 lg:border-l border-gray-300 pt-8 lg:pt-0 lg:pl-10">
                        
                        <h3 className="text-lg font-bold mb-6 text-[#1A1A1A] uppercase tracking-wide leading-snug">
                            FAQs
                        </h3>

                        {/*
                            Scrollable Area — desktop only.
                            On mobile the container has no fixed height and no inner scroll:
                            it expands dynamically (and smoothly, via the accordion height
                            animation) as answers open/close.
                        */}
                        <div 
                            ref={scrollRef}
                            data-lenis-prevent="true"
                            className="flex-1 lg:min-h-0 lg:overflow-y-auto pr-4 
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-thumb]:bg-gray-300 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 
                            [&::-webkit-scrollbar-track]:bg-transparent
                            transition-colors duration-300 overscroll-contain"
                        >
                            {faqs.map((faq, index) => {
                                const answer = getFaqAnswer(faq.question);
                                const isOpen = openIds.has(faq.id);

                                return (
                                    <React.Fragment key={faq.id}>
                                        <div
                                            ref={(el) => { itemRefs.current[faq.id] = el; }}
                                            className="py-4 first:pt-0 group"
                                        >
                                            {answer ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleFaq(faq.id)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={`faq-answer-${faq.id}`}
                                                        className="w-full cursor-pointer text-left flex items-start justify-between gap-4"
                                                    >
                                                        <p className={`text-[15px] leading-snug font-medium group-hover:text-black transition-colors ${isOpen ? 'text-black' : 'text-gray-700'}`}>
                                                            {faq.question}
                                                        </p>
                                                        <motion.span
                                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                                            transition={{ duration: 0.4, ease: premiumEase }}
                                                            className={`group-hover:text-[#1A1A1A] transition-colors text-xl leading-none ${isOpen ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
                                                        >
                                                            →
                                                        </motion.span>
                                                    </button>

                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                id={`faq-answer-${faq.id}`}
                                                                key="answer"
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.5, ease: premiumEase }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="pt-3 pr-8 text-[14px] text-gray-600 leading-relaxed font-normal">
                                                                    {answer}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                // Fallback: no matching answer found, behave like the original link
                                                <Link href={faq.link ?? '/faq'} className="flex items-start justify-between gap-4">
                                                    <p className="text-[15px] text-gray-700 leading-snug font-medium group-hover:text-black transition-colors">
                                                        {faq.question}
                                                    </p>
                                                    <span className="text-gray-400 group-hover:text-[#1A1A1A] transition-colors text-xl transform group-hover:translate-x-1 duration-300 leading-none">
                                                        →
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                        {/* Divider Line */}
                                        {index !== faqs.length - 1 && <hr className="border-gray-200" />}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}