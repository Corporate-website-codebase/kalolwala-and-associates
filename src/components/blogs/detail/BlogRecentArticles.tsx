'use client'

import type { BlogPost } from '@/data/blogs'
import { ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface BlogRecentArticlesProps {
    articles: BlogPost[]
    isOpen?: boolean
    onToggle?: () => void
}

const INITIAL_COUNT = 12
const LOAD_MORE_STEP = 5

// Module-level state to remember the expanded count when navigating between articles
let preservedVisibleCount = INITIAL_COUNT

function formatDisplayDate(dateStr?: string): string {
    if (!dateStr) return ''
    const ts = Date.parse(dateStr)
    if (!isNaN(ts)) {
        return new Date(ts).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }
    return dateStr
}

function ArticleIcon({ className = 'w-4 h-4' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 512 512"
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M421.073,221.719c-0.578,11.719-9.469,26.188-23.797,40.094v183.25c-0.016,4.719-1.875,8.719-5.016,11.844 c-3.156,3.063-7.25,4.875-12.063,4.906H81.558c-4.781-0.031-8.891-1.844-12.047-4.906c-3.141-3.125-4.984-7.125-5-11.844V152.219 c0.016-4.703,1.859-8.719,5-11.844c3.156-3.063,7.266-4.875,12.047-4.906h158.609c12.828-16.844,27.781-34.094,44.719-49.906 c0.078-0.094,0.141-0.188,0.219-0.281H81.558c-18.75-0.016-35.984,7.531-48.25,19.594c-12.328,12.063-20.016,28.938-20,47.344 v292.844c-0.016,18.406,7.672,35.313,20,47.344C45.573,504.469,62.808,512,81.558,512h298.641c18.781,0,36.016-7.531,48.281-19.594 c12.297-12.031,20-28.938,19.984-47.344V203.469c0,0-0.125-0.156-0.328-0.313C440.37,209.813,431.323,216.156,421.073,221.719z" />
            <path d="M498.058,0c0,0-15.688,23.438-118.156,58.109C275.417,93.469,211.104,237.313,211.104,237.313 c-15.484,29.469-76.688,151.906-76.688,151.906c-16.859,31.625,14.031,50.313,32.156,17.656 c34.734-62.688,57.156-119.969,109.969-121.594c77.047-2.375,129.734-69.656,113.156-66.531c-21.813,9.5-69.906,0.719-41.578-3.656 c68-5.453,109.906-56.563,96.25-60.031c-24.109,9.281-46.594,0.469-51-2.188C513.386,138.281,498.058,0,498.058,0z" />
        </svg>
    )
}

export default function BlogRecentArticles({
    articles,
    isOpen: controlledOpen,
    onToggle,
}: BlogRecentArticlesProps) {
    const [internalOpen, setInternalOpen] = useState(true)
    const isControlled = typeof controlledOpen === 'boolean'
    const isOpen = isControlled ? controlledOpen : internalOpen
    const [visibleCount, setVisibleCount] = useState(() => Math.max(INITIAL_COUNT, preservedVisibleCount))

    const handleToggle = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (onToggle) {
            onToggle()
        } else {
            setInternalOpen(!internalOpen)
        }
    }

    const visibleArticles = articles.slice(0, visibleCount)
    const hasMore = visibleCount < articles.length

    const handleLoadMore = () => {
        setVisibleCount((prev) => {
            const next = Math.min(prev + LOAD_MORE_STEP, articles.length)
            preservedVisibleCount = next
            return next
        })
    }

    if (articles.length === 0) return null

    return (
        <aside
            className={`hidden lg:flex flex-col shrink-0 relative z-10 transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isOpen ? 'w-80 xl:w-96' : 'w-12 xl:w-14'
            }`}
        >
            {/* Sticky sidebar — top/height driven by --nav-full-height and --nav-translate-y CSS variables */}
            <div
                data-lenis-prevent="true"
                style={{
                    top: 'var(--nav-full-height, 92px)',
                    height: 'calc(100vh - var(--nav-full-height, 92px) - var(--nav-translate-y, 0px))',
                    transform: 'translateY(var(--nav-translate-y, 0px))',
                    transition: 'transform 300ms linear, height 300ms linear',
                }}
                className="sticky flex flex-col w-full border-l border-white/10 bg-[#161616] text-neutral-200 overscroll-contain z-10"
            >
                {/* Header bar with toggle */}
                <div
                    className={`flex items-center py-3.5 border-b border-white/10 bg-[#1c1c1c] shrink-0 ${
                        isOpen ? 'justify-between pl-6 pr-6' : 'justify-center p-3.5'
                    }`}
                >
                    {isOpen && (
                        <div className="flex items-center gap-2.5 min-w-0">
                            <ArticleIcon className="w-4 h-4 shrink-0 text-neutral-300" />
                            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 font-semibold truncate">
                                Recent Articles
                            </h3>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleToggle}
                        aria-label={isOpen ? 'Collapse recent articles' : 'Expand recent articles'}
                        title={isOpen ? 'Collapse recent articles' : 'Expand recent articles'}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                        {isOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
                    </button>
                </div>

                {/* Content body when open */}
                {isOpen ? (
                    <div
                        data-lenis-prevent="true"
                        className="flex-1 p-3.5 pb-16 flex flex-col gap-1 overflow-y-auto overscroll-contain"
                    >
                    {visibleArticles.map((blog, idx) => (
                        <Link
                            key={`${blog.slug}-${blog.id}`}
                            href={`/blogs/${blog.slug}`}
                            prefetch={true}
                            className={`group flex gap-3 p-2.5 transition-all duration-300 hover:bg-white/5 ${
                                idx !== 0 ? 'border-t border-white/10' : ''
                            }`}
                        >
                            {/* Thumbnail without rounded borders */}
                            <div className="relative rounded-none overflow-hidden shrink-0">
                                {blog.image ? (
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={80}
                                        height={36}
                                        className="object-cover object-top-left transition-transform duration-500 group-hover:scale-105 aspect-16/8"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-neutral-400">
                                        K&A
                                    </div>
                                )}
                            </div>

                            {/* Text content with 2-line clamping */}
                            <div className="flex flex-col justify-center min-w-0 flex-1">
                                <h4
                                    className="text-xs font-medium text-neutral-200 leading-snug group-hover:text-white transition-colors"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {blog.title}
                                </h4>
                                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-1">
                                    {formatDisplayDate(blog.date)}
                                </span>
                            </div>
                        </Link>
                    ))}

                    {/* Load More Button - text only */}
                    {hasMore ? (
                        <div className="pt-3 pb-8 px-1">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                className="w-full py-2.5 px-4 rounded-lg bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700 border border-neutral-700/60 text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.98]"
                            >
                                Load More
                            </button>
                        </div>
                    ) : (
                        <div className="pt-4 pb-8 text-center">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                                All articles loaded
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                /* Collapsed vertical strip */
                <div
                    onClick={handleToggle}
                    className="flex-1 py-8 px-1 flex flex-col items-center gap-6 cursor-pointer hover:bg-white/5 transition-colors"
                    title="Click to expand Recent Articles"
                >
                    <ArticleIcon className="w-4 h-4 shrink-0 text-neutral-400" />
                    <span
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                        Recent Articles ({articles.length})
                    </span>
                    <ChevronRight size={14} className="text-neutral-400" />
                </div>
            )}
            </div>
        </aside>
    )
}
