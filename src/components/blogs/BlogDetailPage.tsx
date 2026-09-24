'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import { ArrowLeft, ArrowUpRight, Check, Copy, Linkedin, Share2 } from 'lucide-react'
import { BLOG_DATA, type BlogPost } from '@/data/blogs'
import PublisherMarquee from './PublisherMarquee'
import BlogBackToTop from './detail/BlogBackToTop'
import BlogPostNavigation from './detail/BlogPostNavigation'
import BlogRecentArticles from './detail/BlogRecentArticles'
import BlogShareBar from './detail/BlogShareBar'
import BlogSubscribeBottom from './detail/BlogSubscribeBottom'
import BlogTableOfContents, { type TocHeading } from './detail/BlogTableOfContents'

gsap.registerPlugin(ScrollTrigger)

interface BlogDetailPageProps {
    post: BlogPost
    wordpressPosts?: BlogPost[]
}

// Parses HTML content to extract headings for the TOC, inject unique IDs, and wrap tables in responsive border containers
function processContentAndExtractHeadings(htmlContent?: string): {
    processedHtml: string
    headings: TocHeading[]
} {
    if (!htmlContent) return { processedHtml: '', headings: [] }

    const headings: TocHeading[] = []
    const usedIds = new Set<string>()

    // Ensure any table is wrapped in a responsive container with clean borders and horizontal scroll support
    let content = htmlContent
    if (!content.includes('blog-table-container')) {
        content = content.replace(
            /<table([^>]*)>([\s\S]*?)<\/table>/gi,
            (_match, attrs, inner) => {
                return `<div class="blog-table-container"><table class="blog-table"${attrs}>${inner}</table></div>`
            },
        )
    }

    const processedHtml = content.replace(
        /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
        (match, levelStr, attrs, innerHtml) => {
            const level = parseInt(levelStr, 10)
            const text = innerHtml.replace(/<[^>]*>/g, '').trim()
            if (!text) return match

            let slug = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')

            if (!slug) slug = `heading-${headings.length + 1}`

            let uniqueId = slug
            let counter = 1
            while (usedIds.has(uniqueId)) {
                uniqueId = `${slug}-${counter}`
                counter++
            }
            usedIds.add(uniqueId)

            headings.push({ id: uniqueId, text, level })

            if (/id=["'][^"']*["']/i.test(attrs)) {
                return `<h${level}${attrs}>${innerHtml}</h${level}>`
            }
            return `<h${level} id="${uniqueId}"${attrs}>${innerHtml}</h${level}>`
        },
    )

    return { processedHtml, headings }
}

function parseAuthorInitials(rawAuthor?: string): string {
    if (!rawAuthor) return 'KA'
    const clean = rawAuthor
        .replace(/^thoughts penned down by\s+/i, '')
        .replace(/^research by\s+/i, '')
        .replace(/^editorial team at\s+/i, 'Editorial Team, ')
        .trim()
    const primaryName = clean.split(/[,·|–-]/)[0]?.trim() || clean
    const words = primaryName.replace(/[^a-zA-Z\s&]/g, '').trim().split(/\s+/).filter(Boolean)
    if (words.length >= 2) {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    if (words.length === 1 && words[0].length > 0) {
        return words[0].slice(0, 2).toUpperCase()
    }
    return 'KA'
}

// Converts string dates from local or CMS posts into timestamps for consistent chronological sorting
function parseDateToTimestamp(dateStr?: string): number {
    if (!dateStr) return 0
    const ts = Date.parse(dateStr)
    if (!isNaN(ts)) return ts
    const d = new Date(dateStr)
    const ts2 = d.getTime()
    return isNaN(ts2) ? 0 : ts2
}

export default function BlogDetailPage({
    post,
    wordpressPosts = [],
}: BlogDetailPageProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const mainContentRef = useRef<HTMLDivElement | null>(null)
    const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null)

    // State for controlling sidebar collapse/expand with scroll lock to prevent jumping
    const [isTocOpen, setIsTocOpen] = useState(true)
    const [isRecentOpen, setIsRecentOpen] = useState(true)

    const isTogglingRef = useRef(false)

    // Anchor-preserving sidebar toggle:
    // Captures the top visible reading element and dynamically compensates scroll
    // on each animation frame as the middle column width transitions, keeping the line
    // in the exact same vertical position.
    const handleToggleWithAnchor = (toggleAction: () => void) => {
        if (typeof window !== 'undefined') {
            ;(window as unknown as { __kna_sidebar_toggling?: boolean }).__kna_sidebar_toggling = true
        }
        isTogglingRef.current = true

        const main = mainContentRef.current
        let anchorEl: HTMLElement | null = null
        let anchorOffset = 0

        if (main) {
            const candidates = main.querySelectorAll<HTMLElement>(
                'h1, h2, h3, h4, p, blockquote, figure, ul, ol, div[data-anchor]'
            )
            const navbarOffset = isNavbarVisible ? 92 : 0

            // 1. Primary candidate: element intersecting the reading line near top
            for (let i = 0; i < candidates.length; i++) {
                const el = candidates[i]
                const rect = el.getBoundingClientRect()
                if (rect.top >= navbarOffset - 30 && rect.bottom > navbarOffset + 20) {
                    anchorEl = el
                    anchorOffset = rect.top
                    break
                }
            }

            // 2. Fallback candidate: first element below navbar
            if (!anchorEl) {
                for (let i = 0; i < candidates.length; i++) {
                    const el = candidates[i]
                    const rect = el.getBoundingClientRect()
                    if (rect.bottom > navbarOffset) {
                        anchorEl = el
                        anchorOffset = rect.top
                        break
                    }
                }
            }
        }

        // Trigger the collapse/expand state update
        toggleAction()

        // Keep anchor element pinned at anchorOffset across the 300ms transition
        const startTime = performance.now()
        const duration = 360

        const keepAnchorPinned = () => {
            if (anchorEl) {
                const currentRect = anchorEl.getBoundingClientRect()
                const delta = currentRect.top - anchorOffset

                if (Math.abs(delta) > 0.5) {
                    const currentScroll = lenisRef.current?.scroll ?? window.scrollY
                    const targetScroll = currentScroll + delta

                    if (lenisRef.current) {
                        lenisRef.current.scrollTo(targetScroll, { immediate: true })
                    } else {
                        window.scrollTo(0, targetScroll)
                    }
                }
            }

            if (performance.now() - startTime < duration) {
                requestAnimationFrame(keepAnchorPinned)
            } else {
                isTogglingRef.current = false
                if (typeof window !== 'undefined') {
                    ;(window as unknown as { __kna_sidebar_toggling?: boolean }).__kna_sidebar_toggling = false
                }
            }
        }

        requestAnimationFrame(keepAnchorPinned)
    }

    const handleToggleToc = () => {
        handleToggleWithAnchor(() => setIsTocOpen((prev) => !prev))
    }

    const handleToggleRecent = () => {
        handleToggleWithAnchor(() => setIsRecentOpen((prev) => !prev))
    }

    // Process article headings and generate ID anchors
    const { processedHtml, headings } = useMemo(() => {
        return processContentAndExtractHeadings(post.content)
    }, [post.content])

    // Compute unique recent/other blogs sorted newest first by date
    const otherBlogs = useMemo(() => {
        const combined = [...BLOG_DATA, ...wordpressPosts]
        const filtered = combined.filter(
            (b) => b.id !== post.id && b.slug && b.slug !== post.slug,
        )
        const unique = filtered.filter(
            (b, index, arr) => index === arr.findIndex((item) => item.slug === b.slug),
        )
        return unique.sort(
            (a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date),
        )
    }, [post.id, post.slug, wordpressPosts])

    // Combine all blogs to determine previous and next articles
    const allBlogs = useMemo(() => {
        const combined = [...BLOG_DATA, ...wordpressPosts]
        const unique = combined.filter(
            (b, index, arr) => index === arr.findIndex((item) => item.slug === b.slug),
        )
        return unique.sort((a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date))
    }, [wordpressPosts])

    const { prevPost, nextPost } = useMemo(() => {
        const currentIndex = allBlogs.findIndex(
            (b) => b.slug === post.slug || b.id === post.id,
        )
        if (currentIndex === -1) return { prevPost: null, nextPost: null }

        // Previous article (newer in list) and next article (older in list)
        const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : null
        const next = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null
        return { prevPost: prev, nextPost: next }
    }, [allBlogs, post.id, post.slug])

    // Track navbar visibility to smoothly adjust sticky sidebars below navbar
    const [isNavbarVisible, setIsNavbarVisible] = useState(true)

    useEffect(() => {
        const handleNavbarEvent = (e: Event) => {
            const customEvent = e as CustomEvent<{ isVisible: boolean }>
            if (customEvent.detail && typeof customEvent.detail.isVisible === 'boolean') {
                setIsNavbarVisible(customEvent.detail.isVisible)
            }
        }

        window.addEventListener('kna-navbar-visibility', handleNavbarEvent)
        return () => window.removeEventListener('kna-navbar-visibility', handleNavbarEvent)
    }, [])

    useLenis((lenis) => {
        lenisRef.current = lenis
        ScrollTrigger.update()
    })

    // Scroll to top on article switch
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
        window.scrollTo(0, 0)
        ScrollTrigger.refresh()
    }, [post.id])

    // Smooth entrance animation for reading column
    useEffect(() => {
        const el = mainContentRef.current
        if (!el) return

        gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 },
        )
    }, [post.id])

    const authorInitials = parseAuthorInitials(post.author)

    // Top action bar share handlers
    const [copiedTop, setCopiedTop] = useState(false)

    const getShareUrl = () => {
        if (typeof window === 'undefined') return ''
        return window.location.href
    }

    const handleCopyLink = async () => {
        const url = getShareUrl()
        if (!url) return
        try {
            await navigator.clipboard.writeText(url)
            setCopiedTop(true)
            setTimeout(() => setCopiedTop(false), 2200)
        } catch {
            // Ignore
        }
    }

    const handleLinkedInShare = () => {
        const url = getShareUrl()
        if (!url) return
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=700,height=600')
    }

    const handleNativeShare = async () => {
        const url = getShareUrl()
        if (!url) return
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({ title: post.title, url })
            } catch {
                // Ignore
            }
            return
        }
        await handleCopyLink()
    }

    // Re-initialize or reload Google Preferred Source script on article navigation
    useEffect(() => {
        let isMounted = true

        const triggerPreferredSource = () => {
            if (!isMounted || typeof window === 'undefined') return

            const btn = document.querySelector('[google-add-preferred-source-btn]')
            if (!btn) return

            // If already rendered with a shadowRoot or children, do not disturb
            if (btn.shadowRoot || btn.children.length > 0) return

            const win = window as unknown as {
                PREFERRED_SOURCE?: {
                    api?: { init?: () => void }
                    push?: (cb: (api: { init?: () => void }) => void) => void
                }
                preferredSource?: {
                    init?: () => void
                }
            }

            // Remove data-initialized so publisher.js can process this element
            btn.removeAttribute('data-initialized')

            // 1. Try existing API in memory
            try {
                if (win.PREFERRED_SOURCE?.api?.init) {
                    win.PREFERRED_SOURCE.api.init()
                } else if (win.preferredSource?.init) {
                    win.preferredSource.init()
                } else if (win.PREFERRED_SOURCE?.push) {
                    win.PREFERRED_SOURCE.push((api) => api.init?.())
                }
            } catch {
                // Ignore
            }

            // 2. If after attempt it still has no shadowRoot or children, reload script fresh
            setTimeout(() => {
                if (!isMounted) return
                const currentBtn = document.querySelector('[google-add-preferred-source-btn]')
                if (currentBtn && !currentBtn.shadowRoot && currentBtn.children.length === 0) {
                    currentBtn.removeAttribute('data-initialized')
                    const oldScripts = document.querySelectorAll('script[src*="news.google.com/swg/js/v1/publisher.js"]')
                    oldScripts.forEach((s) => s.remove())

                    const newScript = document.createElement('script')
                    newScript.src = 'https://news.google.com/swg/js/v1/publisher.js'
                    newScript.async = true
                    document.head.appendChild(newScript)
                }
            }, 80)
        }

        triggerPreferredSource()
        const t1 = setTimeout(triggerPreferredSource, 150)
        const t2 = setTimeout(triggerPreferredSource, 450)
        const t3 = setTimeout(triggerPreferredSource, 1000)

        return () => {
            isMounted = false
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [post.id, post.slug])

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen bg-[#d4d4d4] text-black font-noto-sans flex flex-col justify-between [overflow-anchor:none]"
        >
            <Script
                src="https://news.google.com/swg/js/v1/publisher.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if (typeof window !== 'undefined') {
                        const win = window as unknown as {
                            PREFERRED_SOURCE?: {
                                api?: { init?: () => void }
                                push?: (cb: (api: { init?: () => void }) => void) => void
                            }
                        }
                        if (win.PREFERRED_SOURCE?.api?.init) {
                            win.PREFERRED_SOURCE.api.init()
                        } else if (win.PREFERRED_SOURCE?.push) {
                            win.PREFERRED_SOURCE.push((api) => api.init?.())
                        }
                    }
                }}
            />

            {/* 3-Column Reading Layout attached edge-to-edge and full screen height */}
            <div className="w-full flex flex-col lg:flex-row items-stretch relative">
                {/* LEFT SIDEBAR: Table of Contents attached to left edge */}
                <BlogTableOfContents
                    headings={headings}
                    isOpen={isTocOpen}
                    onToggle={handleToggleToc}
                    isNavbarVisible={isNavbarVisible}
                />

                {/* MIDDLE COLUMN: Blog Article Content taking the rest of width */}
                <main
                    ref={mainContentRef}
                    className="flex-1 min-w-0 px-6 sm:px-10 lg:px-12 xl:px-16 pt-6 sm:pt-8 pb-16 [overflow-anchor:none]"
                >
                    <div className="max-w-3xl xl:max-w-4xl mx-auto w-full">
                        {/* Back to articles navigation */}
                        <Link
                            href="/blogs#articles"
                            className="group inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-6"
                        >
                            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                            <span className="text-xs font-mono uppercase tracking-widest">
                                Back to Articles
                            </span>
                        </Link>

                        {/* Article Headline */}
                        <h1 className="text-black font-light text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-tight mb-10">
                            {post.title}
                        </h1>



                        {/* Hero Image - Full width with automatic natural height */}
                        {post.image && (
                            <div className="relative w-full mb-10 overflow-hidden rounded-2xl bg-neutral-200 shadow-xs">
                                <Image
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    width={1200}
                                    height={675}
                                    priority
                                    unoptimized
                                    className="w-full h-auto object-contain block"
                                />
                            </div>
                        )}

                        {/* Article Body */}
                        <article
                            className="text-neutral-900 text-base sm:text-[17px] leading-[1.85] font-normal antialiased [&>p]:mb-6 [&>p]:text-neutral-900 [&>h2]:text-black [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:leading-[1.25] [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h3]:text-black [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-5 [&>h3]:tracking-tight [&>h4]:text-black [&>h4]:text-lg [&>h4]:sm:text-xl [&>h4]:font-semibold [&>h4]:leading-[1.35] [&>h4]:mt-10 [&>h4]:mb-4 [&>ul]:mb-7 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:marker:text-black [&>ol]:mb-7 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:marker:text-black [&>ul>li]:mb-3 [&>ol>li]:mb-3 [&>ul>li>ul]:mt-3 [&>ul>li>ul]:mb-2 [&>ul>li>ul]:pl-6 [&>ul>li>ul]:list-disc [&>ol>li>ol]:mt-3 [&>ol>li>ol]:mb-2 [&>ol>li>ol]:pl-6 [&>ol>li>ol]:list-decimal [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-10 [&>blockquote]:text-black [&>blockquote]:text-lg [&>blockquote]:sm:text-xl [&>blockquote]:font-medium [&>blockquote]:leading-[1.7] [&>blockquote]:italic [&_a]:text-black [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-black/40 [&_a:hover]:text-neutral-600 [&_a:hover]:decoration-black [&_a]:transition-colors [&_a]:duration-200 [&>strong]:text-black [&>strong]:font-semibold [&_strong]:text-black [&_strong]:font-semibold [&_em]:text-neutral-800 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8 [&_img]:rounded-sm [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse [&>table_th]:border [&>table_th]:border-black/20 [&>table_th]:bg-black/5 [&>table_th]:px-4 [&>table_th]:py-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-black [&>table_td]:border [&>table_td]:border-black/15 [&>table_td]:px-4 [&>table_td]:py-3 [&>table_td]:text-neutral-900"
                            dangerouslySetInnerHTML={{ __html: processedHtml }}
                        />

                        {/* Author & Publication Date */}
                        <div className="mt-12 ">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                {post.author && (
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-xs font-semibold tracking-wider shrink-0">
                                            {authorInitials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                                                Written by
                                            </span>
                                            <span className="text-sm font-medium text-black">
                                                {post.author}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {post.date && (
                                    <div className="flex flex-col sm:text-right">
                                        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                                            Published on
                                        </span>
                                        <span className="font-mono text-xs text-black uppercase tracking-wider mt-0.5">
                                            {post.date}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Share actions bar */}
                        {/* <BlogShareBar title={post.title} /> */}
                          {/* Top Action Bar: Preferred Source + Quick Share Buttons */}
                        <div className="mb-8 mt-8 flex flex-wrap items-center justify-between gap-4 py-3 border-y border-black/10">
                            {/* Google Preferred Source Badge */}
                            <div className="flex items-center leading-none min-h-[40px] min-w-[140px]">
                                <div
                                    key={post.id}
                                    google-add-preferred-source-btn=""
                                    data-theme="light"
                                    data-lang="en"
                                />
                            </div>

                            {/* Share Icons */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 mr-1 hidden sm:inline">
                                    Share:
                                </span>
                                {/* Copy Link */}
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    aria-label="Copy link"
                                    title="Copy link"
                                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-black/5 hover:bg-black text-neutral-700 hover:text-white transition-all duration-200 cursor-pointer text-xs font-mono"
                                >
                                    {copiedTop ? (
                                        <>
                                            <Check size={13} className="text-emerald-500" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>

                                {/* LinkedIn */}
                                <button
                                    type="button"
                                    onClick={handleLinkedInShare}
                                    aria-label="Share on LinkedIn"
                                    title="Share on LinkedIn"
                                    className="inline-flex items-center justify-center size-8 rounded-full bg-black/5 hover:bg-[#0A66C2] text-neutral-700 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    <Linkedin size={14} />
                                </button>

                                {/* Native Share / Share Icon */}
                                <button
                                    type="button"
                                    onClick={handleNativeShare}
                                    aria-label="Share article"
                                    title="Share article"
                                    className="inline-flex items-center justify-center size-8 rounded-full bg-black/5 hover:bg-black text-neutral-700 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    <Share2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Previous & Next Article Navigation */}
                        <BlogPostNavigation prevPost={prevPost} nextPost={nextPost} />

                        {/* Newsletter Subscription directly after next/prev article buttons in middle column */}
                        <BlogSubscribeBottom />

                        {/* Publisher links for legacy posts */}
                        {post.source === 'legacy' && (
                            <>
                                {post.additionalLinks && post.additionalLinks.length > 2 ? (
                                    <PublisherMarquee links={post.additionalLinks} />
                                ) : (
                                    post.additionalLinks && post.additionalLinks.length > 0 && (
                                        <div className="mt-14 pt-8 border-t border-black/15 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                                Read article on:
                                            </span>
                                            <div className="flex flex-wrap items-center gap-6">
                                                {post.additionalLinks.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group inline-flex items-center text-neutral-600 hover:text-black transition-colors"
                                                    >
                                                        {link.publisherLogo && (
                                                            <Image
                                                                src={link.publisherLogo}
                                                                alt={link.publisher}
                                                                width={100}
                                                                height={20}
                                                                unoptimized
                                                                className="h-5 w-auto object-contain mr-2"
                                                            />
                                                        )}
                                                        <span className="text-sm font-mono tracking-wider">
                                                            Read on {link.publisher}
                                                        </span>
                                                        <ArrowUpRight size={15} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    </div>
                </main>

                {/* RIGHT SIDEBAR: Recent Articles attached to right edge */}
                <BlogRecentArticles
                    articles={otherBlogs}
                    isOpen={isRecentOpen}
                    onToggle={handleToggleRecent}
                    isNavbarVisible={isNavbarVisible}
                />
            </div>

            {/* Floating Back to Top button */}
            <BlogBackToTop />
        </section>
    )
}
