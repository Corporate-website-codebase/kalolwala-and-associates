'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavBookProps {
    className?: string
    onClick?: () => void
}

export default function NavBook({ className = '', onClick }: NavBookProps) {
    const pathname = usePathname()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/about') {
            const el = document.getElementById('featured-publication')
            if (el) {
                e.preventDefault()
                el.scrollIntoView({ behavior: 'smooth' })
            }
        }
        if (onClick) onClick()
    }

    return (
        <Link
            href="/about#featured-publication"
            onClick={handleClick}
            aria-label="Anchor - Featured Publication"
            title="Anchor - Featured Publication"
            className={`group relative inline-flex items-center justify-center p-1 cursor-pointer focus:outline-none ${className}`}
        >
            {/* Subtle ambient gold aura on hover */}
            <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/15 blur-lg transition-all duration-300 pointer-events-none" />

            {/* Rotating 3D Book Graphic */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: -2, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="relative w-[28px] h-[41px] md:w-[32px] md:h-[47px] shrink-0 select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_8px_20px_rgba(244,192,22,0.35)]"
            >
                <Image
                    src="/images/anchor-book-rotating.gif"
                    alt="Anchor Book - Featured Publication"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 28px, 32px"
                    className="object-contain select-none"
                    priority
                />
            </motion.div>

            {/* Popover on hover with continuous hover bridge (pt-2.5 + invisible bridge area) */}
            <div className="hidden md:flex absolute top-full right-0 pt-2.5 pointer-events-none opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 delay-100 group-hover:delay-0 ease-out z-50">
                <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0a0a]/95 border border-yellow-400/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md whitespace-nowrap">
                    {/* Popover caret pointing up directly at the book */}
                    <div className="absolute -top-1 right-4 w-2 h-2 rotate-45 bg-[#0a0a0a] border-t border-l border-yellow-400/30" />
                    <span className="text-xs font-medium text-white group-hover:text-yellow-400 transition-colors">
                        Explore book
                    </span>
                    <span className="text-xs text-yellow-400 transition-transform duration-200 group-hover:translate-x-0.5">
                        ↗
                    </span>
                </div>
            </div>
        </Link>
    )
}
