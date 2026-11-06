
'use client';

import { Fragment, useId, useMemo, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface ConnectedInfProps {
    /** Top heading */
    heading: string;
    /**
     * 2 – 8 pointers (odd counts are supported). Anything past 8 is ignored.
     * Wrap words in **double asterisks** to make them bold,
     * e.g. "Growth, **profitability** and market leadership".
     */
    pointers: string[];
    /** Optional extra classes for the <section> (default background is white) */
    className?: string;
}

/* ------------------------------------------------------------------ */
/*  Rich text: turns "a **bold** word" into text with <strong> parts   */
/* ------------------------------------------------------------------ */

function renderRichText(text: string): ReactNode {
    // Splitting on a capturing group keeps the **...** parts in the result
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, i) => {
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={i} className="font-bold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return <Fragment key={i}>{part}</Fragment>;
    });
}

/* ------------------------------------------------------------------ */
/*  Diagram geometry                                                   */
/*  Everything lives in ONE coordinate space (the SVG viewBox), so the */
/*  circle, dots, connectors and label columns all scale together.     */
/* ------------------------------------------------------------------ */

const MAX_POINTERS = 8;

const W = 1850; // viewBox width (matches the design reference)
const H = 326; // viewBox height (circle + connectors + pointer dots)
const CX = W / 2; // horizontal centre of the circle
const CY = 100; // vertical centre of the circle

const RING_R = 89; // outer faint ring
const INNER_R = 76; // inner circle (holds the yellow half)
const ARC_R = 88; // radius on which the small dots sit
const ARC_STEP_DEG = 10.1; // angular gap between the dots on the circle

const POINTER_Y = 314; // y of the dots above each label
const LEVEL_BASE_Y = 253; // y of the outermost horizontal connector
const LEVEL_STEP = 12.5; // vertical gap between horizontal connectors
const CORNER = 14; // connector corner radius

const SIDE_MARGIN = 78; // free space left/right of the label row (n = 8)
const MAX_PITCH = 340; // widest allowed column spacing (small n)

const YELLOW = '#F9C84A';
const YELLOW_STROKE = '#E2A912';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_POP = [0.34, 1.56, 0.64, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_OUT },
    },
};

const ringIn: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: 0.15, duration: 0.6, ease: EASE_OUT },
    },
};

// Yellow liquid rising inside the (statically clipped) semicircle
const fillRise: Variants = {
    hidden: { y: INNER_R },
    visible: {
        y: 0,
        transition: { delay: 0.75, duration: 0.9, ease: 'easeOut' },
    },
};

const popIn: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay, duration: 0.45, ease: EASE_POP },
    }),
};

const draw: Variants = {
    hidden: { pathLength: 0 },
    visible: (delay: number) => ({
        pathLength: 1,
        transition: { delay, duration: 0.9, ease: 'easeInOut' },
    }),
};

const labelIn: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.6, ease: EASE_OUT },
    }),
};

const cardList: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

/* ------------------------------------------------------------------ */
/*  Geometry builder                                                   */
/* ------------------------------------------------------------------ */

interface PointerGeometry {
    label: string;
    arcX: number; // dot on the circle
    arcY: number;
    pointerX: number; // dot above the label
    path: string; // connector between the two
}

function buildGeometry(labels: string[]): { items: PointerGeometry[]; pitch: number } {
    const n = labels.length;
    const mid = (n - 1) / 2;
    const half = Math.floor(n / 2); // pointers per side (the odd one out sits in the centre)
    const pitch = Math.min(MAX_PITCH, (W - SIDE_MARGIN * 2) / n);

    const items = labels.map((label, i) => {
        const offset = i - mid; // negative = left, 0 = centre, positive = right

        // dot on the circle
        const theta = (offset * ARC_STEP_DEG * Math.PI) / 180;
        const arcX = CX + ARC_R * Math.sin(theta);
        const arcY = CY + ARC_R * Math.cos(theta);

        // dot above the label
        const pointerX = CX + offset * pitch;

        // centre pointer (odd counts): straight line down
        if (Math.abs(offset) < 0.001) {
            return {
                label,
                arcX: CX,
                arcY,
                pointerX: CX,
                path: `M ${CX} ${arcY} V ${POINTER_Y}`,
            };
        }

        // j = 0 -> closest to the centre, j = half-1 -> outermost
        const j = Math.abs(offset) - (n % 2 === 0 ? 0.5 : 1);
        // outermost pointer takes the highest horizontal level (nested look)
        const rank = half - 1 - j;
        const levelY = LEVEL_BASE_Y + rank * LEVEL_STEP;

        const s = pointerX < arcX ? -1 : 1;
        const cr = Math.min(CORNER, Math.abs(pointerX - arcX) / 2);

        const path = [
            `M ${arcX} ${arcY}`,
            `V ${levelY - cr}`,
            `Q ${arcX} ${levelY} ${arcX + s * cr} ${levelY}`,
            `H ${pointerX - s * cr}`,
            `Q ${pointerX} ${levelY} ${pointerX} ${levelY + cr}`,
            `V ${POINTER_Y}`,
        ].join(' ');

        return { label, arcX, arcY, pointerX, path };
    });

    return { items, pitch };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ConnectedInf({
    heading,
    pointers,
    className = 'bg-white',
}: ConnectedInfProps) {
    const reduceMotion = useReducedMotion();
    const uid = useId().replace(/:/g, '');

    const labels = useMemo(() => pointers.slice(0, MAX_POINTERS), [pointers]);
    const { items, pitch } = useMemo(() => buildGeometry(labels), [labels]);

    if (labels.length === 0) return null;

    const initialState = reduceMotion ? 'visible' : 'hidden';
    const viewport = { once: true, amount: 0.25 } as const;
    const pitchPct = (pitch / W) * 100;

    // Timing helpers (seconds)
    const arcDotDelay = (i: number) => 0.7 + i * 0.06;
    const lineDelay = (i: number) => 1.0 + i * 0.08;
    const pointerDotDelay = (i: number) => lineDelay(i) + 0.75;
    const labelDelay = (i: number) => lineDelay(i) + 0.8;

    return (
        <section className={`w-full px-4 sm:px-8 py-12 md:py-20 font-noto-sans ${className}`}>
            {/* Container-query context: every `cqw` below is relative to this box */}
            <div
                className="mx-auto w-full max-w-[1850px]"
                style={{ containerType: 'inline-size' }}
            >
                {/* ---------------- HEADING (all screens) ---------------- */}
                <motion.h2
                    className="text-center font-bold text-[#1A1A1A] leading-tight mb-8 xl:mb-[1cqw]"
                    style={{ fontSize: 'clamp(26px, 2.2cqw, 44px)' }}
                    variants={fadeUp}
                    initial={initialState}
                    whileInView="visible"
                    viewport={viewport}
                >
                    {heading}
                </motion.h2>

                {/* ---------------- DESKTOP DIAGRAM (xl and up) ---------------- */}
                <motion.div
                    className="hidden xl:block"
                    initial={initialState}
                    whileInView="visible"
                    viewport={viewport}
                >
                    <svg
                        viewBox={`0 0 ${W} ${H}`}
                        className="block w-full h-auto overflow-visible"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <defs>
                            <filter
                                id={`${uid}-shadow`}
                                x="-30%"
                                y="-30%"
                                width="160%"
                                height="160%"
                            >
                                <feDropShadow
                                    dx="0"
                                    dy="2"
                                    stdDeviation="3"
                                    floodColor="#000"
                                    floodOpacity="0.08"
                                />
                            </filter>

                            {/* Lower half of the inner circle */}
                            <clipPath id={`${uid}-half`}>
                                <path
                                    d={`M ${CX - INNER_R} ${CY} A ${INNER_R} ${INNER_R} 0 0 0 ${CX + INNER_R} ${CY} Z`}
                                />
                            </clipPath>

                            {/* Soft shadow at the top edge of the yellow */}
                            <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#000" stopOpacity="0.22" />
                                <stop offset="0.35" stopColor="#000" stopOpacity="0" />
                            </linearGradient>

                            {/* One reveal-mask per connector (draws the dotted line like a progress bar) */}
                            {items.map((g, i) => (
                                <mask
                                    key={`mask-${i}`}
                                    id={`${uid}-mask-${i}`}
                                    maskUnits="userSpaceOnUse"
                                    x={0}
                                    y={0}
                                    width={W}
                                    height={H}
                                >
                                    <motion.path
                                        d={g.path}
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth={10}
                                        variants={draw}
                                        custom={lineDelay(i)}
                                    />
                                </mask>
                            ))}
                        </defs>

                        {/* Circle: rings */}
                        <motion.g variants={ringIn} filter={`url(#${uid}-shadow)`}>
                            <circle
                                cx={CX}
                                cy={CY}
                                r={RING_R}
                                fill="#fff"
                                stroke="#E4E4E4"
                                strokeWidth={2}
                            />
                            <circle
                                cx={CX}
                                cy={CY}
                                r={INNER_R}
                                fill="#fff"
                                stroke="#EDEDED"
                                strokeWidth={1.5}
                            />
                        </motion.g>

                        {/* Circle: yellow half (clip is static, content rises) */}
                        <g clipPath={`url(#${uid}-half)`}>
                            <motion.g variants={fillRise}>
                                <rect
                                    x={CX - INNER_R}
                                    y={CY}
                                    width={INNER_R * 2}
                                    height={INNER_R + 1}
                                    fill={YELLOW}
                                />
                                <rect
                                    x={CX - INNER_R}
                                    y={CY}
                                    width={INNER_R * 2}
                                    height={INNER_R + 1}
                                    fill={`url(#${uid}-shade)`}
                                />
                            </motion.g>
                        </g>

                        {/* Dotted connectors */}
                        {items.map((g, i) => (
                            <path
                                key={`line-${i}`}
                                d={g.path}
                                fill="none"
                                stroke="#8E8E8E"
                                strokeWidth={1.4}
                                strokeLinecap="round"
                                strokeDasharray="0.1 2.8"
                                mask={`url(#${uid}-mask-${i})`}
                            />
                        ))}

                        {/* Dots on the circle */}
                        {items.map((g, i) => (
                            <motion.circle
                                key={`arc-${i}`}
                                cx={g.arcX}
                                cy={g.arcY}
                                r={4.5}
                                fill={YELLOW}
                                stroke={YELLOW_STROKE}
                                strokeWidth={1.2}
                                variants={popIn}
                                custom={arcDotDelay(i)}
                            />
                        ))}

                        {/* Dots above the labels */}
                        {items.map((g, i) => (
                            <motion.circle
                                key={`pt-${i}`}
                                cx={g.pointerX}
                                cy={POINTER_Y}
                                r={5}
                                fill={YELLOW}
                                stroke={YELLOW_STROKE}
                                strokeWidth={1.2}
                                variants={popIn}
                                custom={pointerDotDelay(i)}
                            />
                        ))}
                    </svg>

                    {/* Labels: same column pitch as the SVG, so they stay aligned under each dot */}
                    <ul
                        className="flex justify-center list-none p-0 m-0"
                        style={{ marginTop: '0.4cqw' }}
                    >
                        {items.map((g, i) => (
                            <motion.li
                                key={`label-${i}`}
                                className="text-center text-[#4A4A4A] break-words whitespace-pre-line"
                                style={{
                                    flex: `0 0 ${pitchPct}%`,
                                    padding: '0 0.5cqw',
                                    fontSize: 'clamp(14px, 1.15cqw, 24px)',
                                    lineHeight: 1.4,
                                }}
                                variants={labelIn}
                                custom={labelDelay(i)}
                            >
                                {renderRichText(g.label)}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* ---------------- MOBILE / TABLET: stacked boxes (below xl) ---------------- */}
                <motion.ul
                    className="xl:hidden list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
                    variants={cardList}
                    initial={initialState}
                    whileInView="visible"
                    viewport={viewport}
                >
                    {labels.map((label, i) => {
                        const isLastOdd = labels.length % 2 === 1 && i === labels.length - 1;
                        return (
                            <motion.li
                                key={`card-${i}`}
                                variants={cardIn}
                                className={`flex items-start gap-4 rounded-2xl border border-black/10 bg-[#F7F7F7] p-5 md:p-6 shadow-sm ${
                                    isLastOdd ? 'md:col-span-2' : ''
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-[0.45em] h-3 w-3 flex-shrink-0 rounded-full border"
                                    style={{
                                        backgroundColor: YELLOW,
                                        borderColor: YELLOW_STROKE,
                                    }}
                                />
                                <p
                                    className="text-[#4A4A4A] leading-snug"
                                    style={{ fontSize: 'clamp(16px, 4.2vw, 19px)' }}
                                >
                                    {renderRichText(label)}
                                </p>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}