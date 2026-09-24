'use client'

import { useLenis } from 'lenis/react'
import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function BlogBackToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const lenis = useLenis()

    // Show button once the user has scrolled down past the hero threshold
    useEffect(() => {
        let lastVisible = false
        const toggleVisibility = () => {
            const shouldBeVisible = window.scrollY > 400
            if (shouldBeVisible !== lastVisible) {
                lastVisible = shouldBeVisible
                setIsVisible(shouldBeVisible)
            }
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: false, duration: 1.2 })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className={`fixed z-40 bottom-6 right-6 sm:bottom-8 sm:right-8 h-11 px-4 rounded-full bg-black text-white shadow-xl flex items-center gap-2 font-mono text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 hover:bg-neutral-800 hover:shadow-2xl hover:-translate-y-1 active:scale-95 ${
                isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
            <ArrowUp size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline">Top</span>
        </button>
    )
}
