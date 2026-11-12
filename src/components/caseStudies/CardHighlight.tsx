'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface HighlightCard {
    heading: string;
    content: string;
}

export interface CardHighlightsProps {
    /** Always exactly 3 cards */
    cards: [HighlightCard, HighlightCard, HighlightCard];
    /** Optional extra classes for the <section> (default background matches the design) */
    className?: string;
}

/* ------------------------------------------------------------------ */
/*  Fluid sizing                                                       */
/*  Every `cqw` is relative to the container below (containerType),    */
/*  so type, padding, radius and the divider scale with the layout.    */
/*  The clamp() minimums keep text readable on small screens.          */
/* ------------------------------------------------------------------ */

const PAD = 'clamp(24px, 3cqw, 56px)'; // inner card padding
const HEADING_TO_DIVIDER = 'clamp(32px, 5cqw, 110px)'; // gap heading -> divider
const DIVIDER_TO_CONTENT = 'clamp(18px, 2cqw, 38px)'; // gap divider -> content
const HEADING_SIZE = 'clamp(28px, 2.2cqw, 46px)';
const BODY_SIZE = 'clamp(16px, 1.2cqw, 22px)';
const RADIUS = 'clamp(20px, 2.4cqw, 36px)';
const DIVIDER_W = 'clamp(44px, 3.2cqw, 72px)';
const DIVIDER_H = 'clamp(3px, 0.25cqw, 5px)';

const ACCENT = '#EFA93A';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_POP = [0.34, 1.56, 0.64, 1] as const;

// `custom` = delay (seconds) before this card starts (the stagger)
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 48, scale: 0.92 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay,
            duration: 0.75,
            ease: EASE_POP,
            // children (heading -> divider -> content) start once the card has popped in
            delayChildren: delay + 0.3,
            staggerChildren: 0.22,
        },
    }),
};

const textVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

// Divider "loading bar" fill
const fillVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
    },
};

const trackVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

/* ------------------------------------------------------------------ */
/*  Small media-query hook (decides whether cards stagger together     */
/*  on desktop or animate individually as they scroll in on mobile)    */
/* ------------------------------------------------------------------ */

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(query);
        setMatches(mq.matches);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CardHighlights({
    cards,
    className = 'bg-[#EEEEEF]',
}: CardHighlightsProps) {
    const reduceMotion = useReducedMotion();
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const initialState = reduceMotion ? 'visible' : 'hidden';

    return (
        <section
            className={`w-full font-noto-sans px-5 sm:px-8 lg:px-[5%] py-12 md:py-20 ${className}`}
        >
            {/* Container-query context for all the cqw units */}
            <div
                className="mx-auto w-full max-w-[1600px]"
                style={{ containerType: 'inline-size' }}
            >
                {/*
                  Layout:
                  - below lg: single column of stacked cards
                  - lg and up: 3 columns. The grid has 3 shared rows
                    (heading / divider / content) and each card is a SUBGRID
                    spanning those 3 rows, so across all cards:
                      · headings start on the same line
                      · dividers sit on the same line
                      · content starts on the same line
                    and all cards share the same height.
                */}
                <div
                    className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-y-0"
                    style={{ columnGap: undefined }}
                >
                    {cards.map((card, i) => (
                        <motion.article
                            key={i}
                            className="flex flex-col lg:row-span-3 lg:grid lg:[grid-template-rows:subgrid] border border-white/90 bg-gradient-to-b from-[#FCFCFC] to-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:mx-[calc(var(--card-gap,0px)/2)]"
                            style={{ borderRadius: RADIUS }}
                            variants={cardVariants}
                            custom={isDesktop ? i * 0.18 : 0}
                            initial={initialState}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* ROW 1: heading */}
                            <motion.h3
                                variants={textVariants}
                                className="font-bold text-[#1A1A1A] leading-[1.15] tracking-tight"
                                style={{
                                    fontSize: HEADING_SIZE,
                                    padding: `${PAD} ${PAD} ${HEADING_TO_DIVIDER}`,
                                }}
                            >
                                {card.heading}
                            </motion.h3>

                            {/* ROW 2: divider (loading bar) */}
                            <div style={{ padding: `0 ${PAD}`, marginBottom: DIVIDER_TO_CONTENT }}>
                                <motion.div
                                    aria-hidden="true"
                                    className="relative overflow-hidden rounded-full"
                                    style={{
                                        width: DIVIDER_W,
                                        height: DIVIDER_H,
                                        backgroundColor: 'rgba(0,0,0,0.06)',
                                    }}
                                    variants={trackVariants}
                                >
                                    <motion.div
                                        className="absolute inset-0 origin-left rounded-full"
                                        style={{ backgroundColor: ACCENT }}
                                        variants={fillVariants}
                                    />
                                </motion.div>
                            </div>

                            {/* ROW 3: content */}
                            <motion.p
                                variants={textVariants}
                                className="text-[#4A4A4A] whitespace-pre-line"
                                style={{
                                    fontSize: BODY_SIZE,
                                    lineHeight: 1.6,
                                    padding: `0 ${PAD} ${PAD}`,
                                }}
                            >
                                {card.content}
                            </motion.p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}