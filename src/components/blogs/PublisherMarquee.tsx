'use client'

import type { MarqueeLink } from '@/data/blogs'
import { useState } from 'react'

interface PublisherMarqueeProps {
    links: MarqueeLink[]
    isDarkTheme?: boolean
}

export default function PublisherMarquee({
    links,
    isDarkTheme = true,
}: PublisherMarqueeProps) {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

    if (!links || links.length === 0) return null

    // Duplicate list to create a seamless infinite scrolling loop
    const items = [...links, ...links]

    const cardClasses = isDarkTheme
        ? 'relative flex-shrink-0 group flex items-center justify-center h-20 px-6 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#F4C016]/40 hover:bg-[#F4C016]/[0.05] transition-all duration-300 cursor-pointer'
        : 'relative flex-shrink-0 group flex items-center justify-center h-20 px-6 rounded-lg bg-white border border-black/10 hover:border-[#F4C016] hover:bg-neutral-50 shadow-2xs transition-all duration-300 cursor-pointer'

    const fadeGradientClasses = isDarkTheme
        ? 'before:bg-gradient-to-r before:from-[#0f0f0f] before:to-transparent after:bg-gradient-to-l after:from-[#0f0f0f] after:to-transparent'
        : 'before:bg-gradient-to-r before:from-[#eeeeee] before:to-transparent after:bg-gradient-to-l after:from-[#eeeeee] after:to-transparent'

    return (
        <div className={`pt-10 border-t ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}>
            {/* Label */}
            <span
                className={`block text-xs font-mono font-medium uppercase tracking-wider mb-6 ${
                    isDarkTheme ? 'text-neutral-400' : 'text-neutral-600'
                }`}
            >
                Read article on
            </span>

            {/* Marquee viewport with theme-aware gradient fades */}
            <div
                className={`relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:z-10 before:pointer-events-none after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:z-10 after:pointer-events-none ${fadeGradientClasses}`}
            >
                {/* Scrolling track */}
                <div
                    className="flex items-center gap-10 w-max animate-marquee"
                    style={{ animationPlayState: hoveredIdx !== null ? 'paused' : 'running' }}
                >
                    {items.map((link, idx) => (
                        <a
                            key={`${link.publisher}-${idx}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cardClasses}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            {/* Publisher logo */}
                            <img
                                src={link.publisherLogo}
                                alt={link.publisher}
                                className="h-10 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Tooltip */}
                            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#F4C016] text-[#050505] text-[11px] font-semibold tracking-wide rounded-md whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-20 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#F4C016]">
                                {link.publisher}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
