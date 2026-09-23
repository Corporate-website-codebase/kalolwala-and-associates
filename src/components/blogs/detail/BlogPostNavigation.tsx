'use client'

import type { BlogPost } from '@/data/blogs'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BlogPostNavigationProps {
    prevPost: BlogPost | null
    nextPost: BlogPost | null
}

export default function BlogPostNavigation({ prevPost, nextPost }: BlogPostNavigationProps) {
    if (!prevPost && !nextPost) return null

    return (
        <nav aria-label="Article navigation" className="mt-12 pt-8 border-t border-black/15">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Article Button */}
                {prevPost ? (
                    <Link
                        href={`/blogs/${prevPost.slug}`}
                        className="group flex flex-col justify-between p-5 rounded-2xl bg-white/60 hover:bg-white border border-black/10 hover:border-black/30 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-2 text-neutral-500 group-hover:text-black transition-colors font-mono text-xs uppercase tracking-widest mb-2">
                            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                            <span>Previous Article</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-black line-clamp-2 leading-snug transition-colors">
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
                        className="group flex flex-col justify-between p-5 rounded-2xl bg-white/60 hover:bg-white border border-black/10 hover:border-black/30 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 sm:text-right sm:items-end"
                    >
                        <div className="flex items-center gap-2 text-neutral-500 group-hover:text-black transition-colors font-mono text-xs uppercase tracking-widest mb-2">
                            <span>Next Article</span>
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <h4 className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-black line-clamp-2 leading-snug transition-colors">
                            {nextPost.title}
                        </h4>
                    </Link>
                )}
            </div>
        </nav>
    )
}
