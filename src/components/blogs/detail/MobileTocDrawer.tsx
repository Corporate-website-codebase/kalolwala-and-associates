'use client'

import { useLenis } from 'lenis/react'
import { ChevronRight, TableOfContents, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import type { TocHeading } from './BlogTableOfContents'

interface MobileTocDrawerProps {
    headings: TocHeading[]
    activeId?: string
    isDarkTheme?: boolean
}

export default function MobileTocDrawer({
    headings,
    activeId,
    isDarkTheme = false,
}: MobileTocDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const lenis = useLenis()

    // Show floating button only after user has scrolled down past the hero (200px)
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent background body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (headings.length === 0) return null

    const handleSelectHeading = (id: string) => {
        setIsOpen(false)
        const target = document.getElementById(id)
        if (!target) return

        setTimeout(() => {
            if (lenis) {
                lenis.scrollTo(target, { offset: -90, duration: 1.0 })
            } else {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 80)
    }

    return (
        <>
            {/* Floating Mobile Trigger Button at bottom center */}
            <div
                className={`lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 pointer-events-auto ${
                    isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}
            >
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Table of Contents"
                    className={`h-10 px-4 rounded-full shadow-2xl backdrop-blur-md border flex items-center gap-2 text-xs font-mono uppercase tracking-wider cursor-pointer active:scale-95 transition-all duration-200 ${
                        isDarkTheme
                            ? 'bg-[#141414]/90 text-white border-white/20 shadow-black/80 hover:border-white/40'
                            : 'bg-white/95 text-neutral-900 border-black/15 shadow-black/15 hover:border-black/30'
                    }`}
                >
                    <TableOfContents
                        size={15}
                        strokeWidth={2}
                        className={isDarkTheme ? 'text-white' : 'text-neutral-900'}
                    />
                    <span>Contents</span>
                    <span
                        className={`size-4.5 rounded-full text-[10px] flex items-center justify-center font-sans font-medium transition-colors ${
                            isDarkTheme
                                ? 'bg-white/20 text-neutral-100'
                                : 'bg-black/10 text-neutral-800'
                        }`}
                    >
                        {headings.length}
                    </span>
                </button>
            </div>

            {/* Backdrop Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
                    aria-hidden="true"
                />
            )}

            {/* Bottom Sheet Drawer */}
            <div
                data-lenis-prevent="true"
                aria-modal="true"
                role="dialog"
                className={`lg:hidden fixed inset-x-0 bottom-0 z-50 max-h-[80vh] flex flex-col rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out border-t overscroll-contain ${
                    isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
                } ${
                    isDarkTheme
                        ? 'bg-[#161616] text-white border-white/10'
                        : 'bg-white text-black border-black/10'
                }`}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between px-6 pt-5 pb-3 border-b shrink-0 ${
                        isDarkTheme ? 'border-white/10' : 'border-black/10'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <TableOfContents
                            size={16}
                            strokeWidth={2}
                            className={isDarkTheme ? 'text-white' : 'text-neutral-900'}
                        />
                        <h3 className="font-mono text-xs uppercase tracking-widest font-semibold">
                            Table of Contents
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close Table of Contents"
                        className={`p-1 rounded-full transition-colors ${
                            isDarkTheme
                                ? 'text-neutral-400 hover:text-white'
                                : 'text-neutral-500 hover:text-black'
                        }`}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Headings List */}
                <div
                    data-lenis-prevent="true"
                    className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1 overscroll-contain"
                >
                    {headings.map((h) => {
                        const isActive = activeId === h.id
                        const isSub = h.level === 3

                        return (
                            <button
                                key={h.id}
                                type="button"
                                onClick={() => handleSelectHeading(h.id)}
                                className={`w-full text-left py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                    isSub ? 'pl-6 text-[11px]' : ''
                                } ${
                                    isActive
                                        ? isDarkTheme
                                            ? 'bg-white/15 text-white font-medium shadow-xs'
                                            : 'bg-black/10 text-black font-semibold shadow-xs'
                                        : isDarkTheme
                                          ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                                          : 'text-neutral-600 hover:text-black hover:bg-black/5'
                                }`}
                            >
                                <span className="line-clamp-2 leading-snug">{h.text}</span>
                                {isActive && (
                                    <ChevronRight
                                        size={14}
                                        className="shrink-0 text-white"
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
