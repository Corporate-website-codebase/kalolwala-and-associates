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
                className="relative w-[28px] h-[41px] md:w-[32px] md:h-[47px] shrink-0 select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_8px_20px_rgba(244,192,22,0.35)] "
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
        </Link>
    )
}
