'use client'

import Image from 'next/image'
import React, { useId } from 'react'

export interface AuthorAvatarProps {
    author?: string
    initials?: string
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function parseAuthorInitials(rawAuthor?: string): string {
    if (!rawAuthor) return 'KA'
    const clean = rawAuthor
        .replace(/^thoughts penned down by\s+/i, '')
        .replace(/^research by\s+/i, '')
        .replace(/^editorial team at\s+/i, 'Editorial Team, ')
        .trim()
    const primaryName = clean.split(/[,·|–-]/)[0]?.trim() || clean
    const words = primaryName
        .replace(/[^a-zA-Z\s&]/g, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
    if (words.length >= 2) {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    if (words.length === 1 && words[0].length > 0) {
        return words[0].slice(0, 2).toUpperCase()
    }
    return 'KA'
}

export function isKnaAuthor(rawAuthor?: string): boolean {
    if (!rawAuthor) return true
    const clean = rawAuthor
        .replace(/&amp;/g, '&')
        .replace(/^thoughts penned down by\s+/i, '')
        .replace(/^research by\s+/i, '')
        .replace(/^editorial team at\s+/i, '')
        .trim()
    return (
        clean.toLowerCase().startsWith('k&a') ||
        clean.toLowerCase().startsWith('k & a') ||
        clean.toLowerCase().startsWith('kalolwala')
    )
}

export default function AuthorAvatar({
    author,
    initials,
    size = 'md',
    className = '',
}: AuthorAvatarProps) {
    const clipId = useId().replace(/:/g, '')

    const displayInitials = initials || parseAuthorInitials(author)
    const isKna = isKnaAuthor(author)

    const sizeClass =
        size === 'sm'
            ? 'size-7'
            : size === 'lg'
              ? 'size-10'
              : 'size-8'

    if (isKna) {
        return (
            <div
                className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-black border border-white/10 ${sizeClass} ${className}`}
            >
                <Image
                    src="/images/kna-email.png"
                    alt={author || 'K&A'}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                />
            </div>
        )
    }

    return (
        <svg
            viewBox="0 0 271 270.6"
            className={`${sizeClass} shrink-0 select-none ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-label={displayInitials}
        >
            <defs>
                <clipPath id={clipId}>
                    <circle cx="135.9" cy="135.4" r="135.2" fill="none" />
                </clipPath>
            </defs>

            {/* Dark base circle */}
            <path
                d="M271,135.4c0,74.6-60.5,135.2-135.2,135.2s-2.9,0-4.3,0c-17-.5-33.2-4.2-48.1-10.4C34.8,239.6.7,191.5.7,135.4S61.2.3,135.9.3s135.2,60.5,135.2,135.2h0Z"
                fill="#050505"
            />

            {/* Yellow polygon accent */}
            <g clipPath={`url(#${clipId})`}>
                <polyline
                    points="252.7 205.7 112.6 -23.1 0 45.8 97.8 205.5"
                    fill="#fff200"
                />
            </g>

            {/* Center circle */}
            <circle cx="135.9" cy="135.4" r="86.6" fill="#050505" />

            {/* Bottom curve accents */}
            <path d="M83.5,260.1c14.9,6.2,31.1,9.9,48.1,10.4" fill="#ffcb08" />
            <path
                d="M131.6,270.5c-17-.5-33.2-4.2-48.1-10.4h0s-8.6-14.7-8.6-14.7h41.3l15,24.4.4.8h0Z"
                fill="#ffcb08"
            />

            {/* Author initials in normal sans-serif font */}
            <text
                x="135.9"
                y="138"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontFamily="var(--font-noto-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                fontWeight="600"
                fontSize="90px"
                letterSpacing="-1px"
            >
                {displayInitials}
            </text>
        </svg>
    )
}
