'use client'

import type { BlogPost } from '@/data/blogs'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BlogPostNavigationProps {
    prevPost: BlogPost | null
    nextPost: BlogPost | null
    isDarkTheme?: boolean
}

export default function BlogPostNavigation({
    prevPost,
    nextPost,
    isDarkTheme = false,
}: BlogPostNavigationProps) {
    if (!prevPost && !nextPost) return null

    const cardBase = isDarkTheme
        ? 'group flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-white/20 transition-[transform,background-color,border-color] duration-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transform-gpu'
        : 'group flex flex-col justify-between p-5 rounded-2xl bg-white/60 hover:bg-white border border-black/10 hover:border-black/30 transition-[transform,background-color,border-color] duration-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transform-gpu'

    const titleColor = isDarkTheme
        ? 'text-sm font-normal text-neutral-200 group-hover:text-white line-clamp-2 leading-snug transition-colors'
        : 'text-sm font-normal text-neutral-900 group-hover:text-black line-clamp-2 leading-snug transition-colors'

    const labelColor = isDarkTheme
        ? 'text-neutral-400 group-hover:text-neutral-200 transition-colors font-mono text-xs uppercase'
        : 'text-neutral-500 group-hover:text-black transition-colors font-mono text-xs uppercase'

    return (
        <nav aria-label="Article navigation" className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Article Button */}
                {prevPost ? (
                    <Link
                        href={`/blogs/${prevPost.slug}`}
                        prefetch={true}
                        className={cardBase}
                    >
                        <div className={`flex items-center gap-2 mb-1 ${labelColor}`}>
                            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                            <span>Previous Article</span>
                        </div>
                        <h4 className={titleColor}>
                            {prevPost.title}
                        </h4>
                    </Link>
                ) : (
                    <div className="hidden sm:block" />
                )}

                {/* Next Article Button */}
                {nextPost && (
                    <Link
                        href={`/blogs/${nextPost.slug}`}
                        prefetch={true}
                        className={`${cardBase} sm:text-right sm:items-end`}
                    >
                        <div className={`flex items-center gap-2 ${labelColor}`}>
                            <span>Next Article</span>
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <h4 className={titleColor}>
                            {nextPost.title}
                        </h4>
                    </Link>
                )}
            </div>
        </nav>
    )
}
