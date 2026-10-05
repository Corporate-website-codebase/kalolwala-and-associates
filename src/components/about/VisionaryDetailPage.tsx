'use client'

import type { Visionary } from '@/data/visionaries'
import { motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface VisionaryDetailPageProps {
    visionary: Visionary
    otherVisionary: Visionary
}

export default function VisionaryDetailPage({
    visionary,
    otherVisionary,
}: VisionaryDetailPageProps) {
    const isCeo = visionary.id === 'ceo'
    const lenis = useLenis()
    const lenisRef = React.useRef(lenis)
    lenisRef.current = lenis

    const scrollToTop = React.useCallback(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        if (document.documentElement) {
            document.documentElement.scrollTop = 0
        }
        if (document.body) {
            document.body.scrollTop = 0
        }
    }, [])

    React.useLayoutEffect(() => {
        scrollToTop()
    }, [scrollToTop, visionary.slug])

    React.useEffect(() => {
        scrollToTop()
        const t1 = setTimeout(scrollToTop, 50)
        const t2 = setTimeout(scrollToTop, 150)
        const t3 = setTimeout(scrollToTop, 300)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [scrollToTop, visionary.slug])

    return (
        <article
            itemScope
            itemType="https://schema.org/Person"
            className="w-full bg-black text-white font-noto-sans selection:bg-yellow-400/20"
        >
            {/* Expansive Hero Section */}
            <section className="marginal pt-4 sm:pt-6 md:pt-8">
                {/* TOP: Cinematic Full-Width Image */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative w-full h-[52vh] sm:h-[62vh] md:h-[72vh] lg:h-[80vh] rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl group"
                >
                    <Image
                        src={visionary.image}
                        alt={visionary.name}
                        fill
                        priority
                        sizes="95vw"
                        className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02] ${isCeo ? 'object-[center_28%]' : 'object-[center_32%]'
                            }`}
                    />

                    {/* Atmospheric overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

                    {/* {visionary.linkedin && (
                        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20">
                            <a
                                href={visionary.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${visionary.name} on LinkedIn`}
                                className="size-10 sm:size-12 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-yellow-400 hover:bg-[#0A66C2] text-white flex items-center justify-center transition-all duration-300 shadow-lg"
                            >
                                <Linkedin className="size-4 sm:size-5 fill-current" />
                            </a>
                        </div>
                    )} */}

                    {/* Name & Designation on Image Overlay */}
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 z-20 pointer-events-none">
                        <h1
                            itemProp="name"
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight drop-shadow-md mb-2 md:mb-4"
                        >
                            {visionary.name}
                        </h1>
                        <p
                            itemProp="jobTitle"
                            className="text-yellow-400 font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest  drop-shadow"
                        >
                            {visionary.designation}
                        </p>
                    </div>
                </motion.div>

                {/* BELOW IMAGE: Only Quote and Profile Switcher */}
                <div className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 border-b border-white/10">
                    {/* Visionary Quote Box */}
                    <div className="relative ">
                        {/* <Quote className="size-8 sm:size-10 text-yellow-400/40 mb-4" /> */}
                        <blockquote
                            itemProp="description"
                            className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-neutral-200 font-light leading-relaxed md:max-w-[90vw] mx-auto"
                        >
                            <span className="font-anton">&ldquo;</span>{` `} {visionary.quote}{' '}
                            <span className="font-anton">&rdquo;</span>
                        </blockquote>
                    </div>

                    {/* Switcher Card: Explore Next Profile */}
                    <div className="mt-12 sm:mt-16 pt-10 border-t border-white/10">
                        <Link
                            href={`/about/${otherVisionary.slug}`}
                            scroll={false}
                            onClick={scrollToTop}
                            className="group block p-6 sm:p-8 md:p-4 rounded-2xl bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 shadow-xl"
                        >
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-5 sm:gap-7">
                                    <div className="relative size-16 sm:size-20 md:size-24 rounded-lg overflow-hidden border border-white/20 shrink-0">
                                        <Image
                                            src={otherVisionary.image}
                                            alt={otherVisionary.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>

                                        <h3 className="text-xl sm:text-3xl font-light text-white mt-1 group-hover:text-yellow-400 transition-colors">
                                            {otherVisionary.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
                                            {otherVisionary.designation}
                                        </p>
                                    </div>
                                </div>

                                <div className="size-12 sm:size-14 rounded-full bg-white/10 group-hover:bg-yellow-400 text-white group-hover:text-black flex items-center justify-center transition-all duration-300 shrink-0">
                                    <ArrowRight className="size-5 sm:size-6 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    )
}
