'use client'

import { BLOG_DATA, type BlogPost } from '@/data/blogs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Moon, Share2, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useMemo, useRef, useState } from 'react'
import PublisherMarquee from './PublisherMarquee'
import BlogBackToTop from './detail/BlogBackToTop'
import BlogPostNavigation from './detail/BlogPostNavigation'
import BlogRecentArticles from './detail/BlogRecentArticles'
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
        content = content.replace(/<table([^>]*)>([\s\S]*?)<\/table>/gi, (_match, attrs, inner) => {
            return `<div class="blog-table-container"><table class="blog-table"${attrs}>${inner}</table></div>`
        })
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

// Converts string dates from local or CMS posts into timestamps for consistent chronological sorting
function parseDateToTimestamp(dateStr?: string): number {
    if (!dateStr) return 0
    const ts = Date.parse(dateStr)
    if (!isNaN(ts)) return ts
    const d = new Date(dateStr)
    const ts2 = d.getTime()
    return isNaN(ts2) ? 0 : ts2
}

export default function BlogDetailPage({ post, wordpressPosts = [] }: BlogDetailPageProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const mainContentRef = useRef<HTMLDivElement | null>(null)
    const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null)

    // State for controlling sidebar collapse/expand with scroll lock to prevent jumping
    const [isTocOpen, setIsTocOpen] = useState(true)
    const [isRecentOpen, setIsRecentOpen] = useState(true)

    const handleToggleToc = () => {
        setIsTocOpen((prev) => !prev)
    }

    const handleToggleRecent = () => {
        setIsRecentOpen((prev) => !prev)
    }

    const areSidebarsOpen = isTocOpen || isRecentOpen

    const handleToggleAllSidebars = () => {
        if (areSidebarsOpen) {
            setIsTocOpen(false)
            setIsRecentOpen(false)
        } else {
            setIsTocOpen(true)
            setIsRecentOpen(true)
        }
    }

    // Reading Theme (Light / Dark mode for comfortable reading)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    useEffect(() => {
        try {
            const saved = localStorage.getItem('blog-reader-theme')
            if (saved === 'dark') {
                setIsDarkTheme(true)
            }
        } catch {
            // Ignore
        }
    }, [])

    const handleToggleTheme = () => {
        setIsDarkTheme((prev) => {
            const next = !prev
            try {
                localStorage.setItem('blog-reader-theme', next ? 'dark' : 'light')
            } catch {
                // Ignore
            }
            return next
        })
    }

    // Process article headings and generate ID anchors
    const { processedHtml, headings } = useMemo(() => {
        return processContentAndExtractHeadings(post.content)
    }, [post.content])

    // Compute unique recent/other blogs sorted newest first by date
    const otherBlogs = useMemo(() => {
        const combined = [...BLOG_DATA, ...wordpressPosts]
        const filtered = combined.filter((b) => b.id !== post.id && b.slug && b.slug !== post.slug)
        const unique = filtered.filter(
            (b, index, arr) => index === arr.findIndex((item) => item.slug === b.slug),
        )
        return unique.sort((a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date))
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
        const currentIndex = allBlogs.findIndex((b) => b.slug === post.slug || b.id === post.id)
        if (currentIndex === -1) return { prevPost: null, nextPost: null }

        // Previous article (newer in list) and next article (older in list)
        const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : null
        const next = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null
        return { prevPost: prev, nextPost: next }
    }, [allBlogs, post.id, post.slug])

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
                    const oldScripts = document.querySelectorAll(
                        'script[src*="news.google.com/swg/js/v1/publisher.js"]',
                    )
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
            style={{ marginTop: 'calc(-1 * var(--nav-full-height, 92px))' }}
            className={`w-full min-h-screen font-noto-sans flex flex-col [overflow-anchor:none] transition-colors duration-300 ${
                isDarkTheme ? 'bg-[#0f0f0f] text-neutral-100' : 'bg-[#eeeeee] text-black'
            }`}
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

            {/* 3-Column Reading Layout attached edge-to-edge */}
            <div className="w-full flex flex-col lg:flex-row items-stretch relative z-10">
                {/* LEFT SIDEBAR: Table of Contents attached to left edge */}
                <BlogTableOfContents
                    headings={headings}
                    isOpen={isTocOpen}
                    onToggle={handleToggleToc}
                />

                {/* MIDDLE COLUMN: Blog Article Content taking the rest of width */}
                <main
                    ref={mainContentRef}
                    className="flex-1 min-w-0 px-6 sm:px-10 lg:px-12 xl:px-16 pt-[calc(var(--nav-full-height,92px)+1.5rem)] sm:pt-[calc(var(--nav-full-height,92px)+2rem)] pb-16 [overflow-anchor:none]"
                >
                    <div className="max-w-3xl xl:max-w-4xl mx-auto w-full">
                        {/* Top navigation row: Back to articles on left, Focus & Theme toggles on right */}
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <Link
                                href="/blogs#articles"
                                className={`group inline-flex items-center gap-2 transition-colors ${
                                    isDarkTheme
                                        ? 'text-neutral-400 hover:text-white'
                                        : 'text-neutral-600 hover:text-black'
                                }`}
                            >
                                <ArrowLeft
                                    size={16}
                                    className="transition-transform duration-300 group-hover:-translate-x-1"
                                />
                                <span className="text-xs font-mono uppercase tracking-widest">
                                    Back to Articles
                                </span>
                            </Link>

                            <div className="flex items-center gap-2">
                                {/* Both Sidebars Toggle (Focus Reading Mode) */}
                                <button
                                    type="button"
                                    onClick={handleToggleAllSidebars}
                                    aria-label={
                                        areSidebarsOpen
                                            ? 'Collapse sidebars (focus mode)'
                                            : 'Expand sidebars'
                                    }
                                    title={
                                        areSidebarsOpen
                                            ? 'Focus Mode (Collapse Sidebars)'
                                            : 'Show Sidebars'
                                    }
                                    className={`hidden lg:inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                                        isDarkTheme
                                            ? 'bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white border border-white/10'
                                            : 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border border-black/5'
                                    }`}
                                >
                                    {areSidebarsOpen ? (
                                        <>
                                            <ArrowLeft className="size-4" />
                                            <ArrowRight className="size-4" />
                                        </>
                                    ) : (
                                        <>
                                            <ArrowRight className="size-4" />
                                            <ArrowLeft className="size-4" />
                                        </>
                                    )}
                                </button>

                                {/* Reading Theme Toggle (Light / Dark) */}
                                <button
                                    type="button"
                                    onClick={handleToggleTheme}
                                    aria-label={
                                        isDarkTheme
                                            ? 'Switch to light reading theme'
                                            : 'Switch to dark reading theme'
                                    }
                                    title={
                                        isDarkTheme
                                            ? 'Switch to Light Theme'
                                            : 'Switch to Dark Reading Theme'
                                    }
                                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer border-none ${
                                        isDarkTheme
                                            ? ' text-yellow-300 hover:text-yellow-200 '
                                            : ' text-neutral-700 hover:text-black border '
                                    }`}
                                >
                                    {isDarkTheme ? (
                                        <Sun className="text-white size-5" />
                                    ) : (
                                        <Moon className="text-neutral-700 size-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Article Headline */}
                        <h1
                            className={`font-light text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-tight mb-10 transition-colors duration-300 ${
                                isDarkTheme ? 'text-white' : 'text-black'
                            }`}
                        >
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
                            className={`text-base sm:text-[17px] leading-[1.85] font-normal antialiased transition-colors duration-300 ${
                                isDarkTheme
                                    ? 'text-neutral-200 [&>p]:mb-6 [&>p]:text-neutral-200 [&>h2]:text-white [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:leading-[1.25] [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h3]:text-white [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-5 [&>h3]:tracking-tight [&>h4]:text-white [&>h4]:text-lg [&>h4]:sm:text-xl [&>h4]:font-semibold [&>h4]:leading-[1.35] [&>h4]:mt-10 [&>h4]:mb-4 [&>ul]:mb-7 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:marker:text-yellow-400 [&>ol]:mb-7 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:marker:text-yellow-400 [&>ul>li]:mb-3 [&>ol>li]:mb-3 [&>ul>li>ul]:mt-3 [&>ul>li>ul]:mb-2 [&>ul>li>ul]:pl-6 [&>ul>li>ul]:list-disc [&>ol>li>ol]:mt-3 [&>ol>li>ol]:mb-2 [&>ol>li>ol]:pl-6 [&>ol>li>ol]:list-decimal [&>blockquote]:border-l-4 [&>blockquote]:border-yellow-400 [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-10 [&>blockquote]:text-neutral-100 [&>blockquote]:text-lg [&>blockquote]:sm:text-xl [&>blockquote]:font-medium [&>blockquote]:leading-[1.7] [&>blockquote]:italic [&_a]:text-yellow-400 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-yellow-400/40 [&_a:hover]:text-yellow-300 [&_a:hover]:decoration-yellow-400 [&_a]:transition-colors [&_a]:duration-200 [&>strong]:text-white [&>strong]:font-semibold [&_strong]:text-white [&_strong]:font-semibold [&_em]:text-neutral-300 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8 [&_img]:rounded-sm [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse [&>table_th]:border [&>table_th]:border-white/20 [&>table_th]:bg-white/10 [&>table_th]:px-4 [&>table_th]:py-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-white [&>table_td]:border [&>table_td]:border-white/15 [&>table_td]:px-4 [&>table_td]:py-3 [&>table_td]:text-neutral-200'
                                    : 'text-neutral-900 [&>p]:mb-6 [&>p]:text-neutral-900 [&>h2]:text-black [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:leading-[1.25] [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h3]:text-black [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-5 [&>h3]:tracking-tight [&>h4]:text-black [&>h4]:text-lg [&>h4]:sm:text-xl [&>h4]:font-semibold [&>h4]:leading-[1.35] [&>h4]:mt-10 [&>h4]:mb-4 [&>ul]:mb-7 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:marker:text-black [&>ol]:mb-7 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:marker:text-black [&>ul>li]:mb-3 [&>ol>li]:mb-3 [&>ul>li>ul]:mt-3 [&>ul>li>ul]:mb-2 [&>ul>li>ul]:pl-6 [&>ul>li>ul]:list-disc [&>ol>li>ol]:mt-3 [&>ol>li>ol]:mb-2 [&>ol>li>ol]:pl-6 [&>ol>li>ol]:list-decimal [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-10 [&>blockquote]:text-black [&>blockquote]:text-lg [&>blockquote]:sm:text-xl [&>blockquote]:font-medium [&>blockquote]:leading-[1.7] [&>blockquote]:italic [&_a]:text-black [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-black/40 [&_a:hover]:text-neutral-600 [&_a:hover]:decoration-black [&_a]:transition-colors [&_a]:duration-200 [&>strong]:text-black [&>strong]:font-semibold [&_strong]:text-black [&_strong]:font-semibold [&_em]:text-neutral-800 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8 [&_img]:rounded-sm [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse [&>table_th]:border [&>table_th]:border-black/20 [&>table_th]:bg-black/5 [&>table_th]:px-4 [&>table_th]:py-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-black [&>table_td]:border [&>table_td]:border-black/15 [&>table_td]:px-4 [&>table_td]:py-3 [&>table_td]:text-neutral-900'
                            }`}
                            dangerouslySetInnerHTML={{ __html: processedHtml }}
                        />

                        {/* Author & Publication Date */}
                        <div className="mt-12 ">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                {post.author && (
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`size-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider shrink-0 ${
                                                isDarkTheme
                                                    ? 'bg-neutral-800 text-white'
                                                    : 'bg-neutral-900 text-white'
                                            }`}
                                        >
                                            {authorInitials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-[11px] font-mono uppercase tracking-widest ${
                                                    isDarkTheme
                                                        ? 'text-neutral-400'
                                                        : 'text-neutral-500'
                                                }`}
                                            >
                                                Written by
                                            </span>
                                            <span
                                                className={`text-sm font-medium ${
                                                    isDarkTheme ? 'text-white' : 'text-black'
                                                }`}
                                            >
                                                {post.author}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {post.date && (
                                    <div className="flex flex-col sm:text-right">
                                        <span
                                            className={`text-[11px] font-mono uppercase tracking-widest ${
                                                isDarkTheme
                                                    ? 'text-neutral-400'
                                                    : 'text-neutral-500'
                                            }`}
                                        >
                                            Published on
                                        </span>
                                        <span
                                            className={`font-mono text-xs uppercase tracking-wider mt-0.5 ${
                                                isDarkTheme ? 'text-neutral-300' : 'text-black'
                                            }`}
                                        >
                                            {post.date}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Top Action Bar: Preferred Source + Quick Share Buttons */}
                        <div
                            className={`mb-8 mt-8 flex flex-wrap items-center justify-between gap-4 py-3 border-y ${
                                isDarkTheme ? 'border-white/10' : 'border-black/10'
                            }`}
                        >
                            {/* Google Preferred Source Badge */}
                            <div className="flex items-center leading-none min-h-[40px] min-w-[140px]">
                                <div
                                    key={`${post.id}-${isDarkTheme ? 'dark' : 'light'}`}
                                    google-add-preferred-source-btn=""
                                    data-theme={isDarkTheme ? 'dark' : 'light'}
                                    data-lang="en"
                                />
                            </div>

                            {/* Share Icons */}
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs font-mono uppercase tracking-wider mr-1 hidden sm:inline ${
                                        isDarkTheme ? 'text-neutral-400' : 'text-neutral-500'
                                    }`}
                                >
                                    Share:
                                </span>
                                {/* Copy Link */}
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    aria-label="Copy link"
                                    title="Copy link"
                                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full transition-all duration-200 cursor-pointer text-xs font-mono ${
                                        isDarkTheme
                                            ? 'bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white'
                                            : 'bg-black/5 hover:bg-black text-neutral-700 hover:text-white'
                                    }`}
                                >
                                    {copiedTop ? (
                                        <>
                                            <Check size={13} className="text-emerald-500" />
                                            <span>Link Copied!</span>
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
                                    className={`inline-flex items-center justify-center size-8 rounded-full transition-all duration-200 cursor-pointer ${
                                        isDarkTheme
                                            ? 'bg-white/10 hover:bg-[#0A66C2] text-neutral-200 hover:text-white'
                                            : 'bg-black/5 hover:bg-[#0A66C2] text-neutral-700 hover:text-white'
                                    }`}
                                >
                                    <svg
                                        viewBox="0 -2 44 44"
                                        className="size-3.5 fill-current"
                                        aria-hidden="true"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                transform="translate(-702.000000, -265.000000)"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z"
                                                    id="LinkedIn"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </button>

                                {/* Native Share / Share Icon */}
                                <button
                                    type="button"
                                    onClick={handleNativeShare}
                                    aria-label="Share article"
                                    title="Share article"
                                    className={`inline-flex items-center justify-center size-8 rounded-full transition-all duration-200 cursor-pointer ${
                                        isDarkTheme
                                            ? 'bg-white/10 hover:bg-white text-neutral-200 hover:text-black'
                                            : 'bg-black/5 hover:bg-black text-neutral-700 hover:text-white'
                                    }`}
                                >
                                    <Share2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Previous & Next Article Navigation */}
                        <BlogPostNavigation
                            prevPost={prevPost}
                            nextPost={nextPost}
                            isDarkTheme={isDarkTheme}
                        />

                        {/* Newsletter Subscription directly after next/prev article buttons in middle column */}
                        <BlogSubscribeBottom />

                        {/* Publisher links for legacy posts */}
                        {post.source === 'legacy' && (
                            <>
                                {post.additionalLinks && post.additionalLinks.length > 2 ? (
                                    <PublisherMarquee links={post.additionalLinks} />
                                ) : (
                                    post.additionalLinks &&
                                    post.additionalLinks.length > 0 && (
                                        <div
                                            className={`mt-14 pt-8 border-t flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${
                                                isDarkTheme ? 'border-white/15' : 'border-black/15'
                                            }`}
                                        >
                                            <span
                                                className={`text-xs font-mono uppercase tracking-widest ${
                                                    isDarkTheme
                                                        ? 'text-neutral-400'
                                                        : 'text-neutral-500'
                                                }`}
                                            >
                                                Read article on:
                                            </span>
                                            <div className="flex flex-wrap items-center gap-6">
                                                {post.additionalLinks.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`group inline-flex items-center transition-colors ${
                                                            isDarkTheme
                                                                ? 'text-neutral-300 hover:text-white'
                                                                : 'text-neutral-600 hover:text-black'
                                                        }`}
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
                                                        <ArrowUpRight
                                                            size={15}
                                                            className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                        />
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
                />
            </div>

            {/* Floating Back to Top button */}
            <BlogBackToTop />
        </section>
    )
}
