'use client'

import { calculateReadingTime, type BlogPost, type BlogPostCard } from '@/data/blogs'
import { useLenis } from 'lenis/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Moon, Share2, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import PublisherMarquee from './PublisherMarquee'
import AuthorAvatar from './AuthorAvatar'
import BlogBackToTop from './detail/BlogBackToTop'
import BlogPostNavigation from './detail/BlogPostNavigation'
import BlogRecentArticles from './detail/BlogRecentArticles'
import BlogSubscribeBottom from './detail/BlogSubscribeBottom'
import BlogTableOfContents, { type TocHeading } from './detail/BlogTableOfContents'
import MobileTocDrawer from './detail/MobileTocDrawer'

interface BlogDetailPageProps {
    post: BlogPost
    wordpressPosts?: BlogPost[]
    recentArticles?: (BlogPost | BlogPostCard)[]
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

// Subscribe to browser storage changes for multi-tab sync without hydration mismatch
const subscribeTheme = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
}

function getThemeSnapshot(): 'dark' | 'light' {
    if (typeof window === 'undefined') return 'light'
    try {
        const saved = localStorage.getItem('blog-reader-theme')
        if (saved === 'dark' || saved === 'light') {
            return saved
        }
    } catch {}
    return 'light'
}

function getThemeServerSnapshot(): 'dark' | 'light' {
    return 'light'
}

export default function BlogDetailPage({
    post,
    wordpressPosts = [],
    recentArticles,
}: BlogDetailPageProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const mainContentRef = useRef<HTMLDivElement | null>(null)
    const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null)

    // State for controlling sidebar collapse/expand with scroll lock to prevent jumping
    const [isTocOpen, setIsTocOpen] = useState(true)
    const [isRecentOpen, setIsRecentOpen] = useState(true)

    const handleToggleToc = useCallback(() => {
        setIsTocOpen((prev) => !prev)
    }, [])

    const handleToggleRecent = useCallback(() => {
        setIsRecentOpen((prev) => !prev)
    }, [])

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

    // Reading Theme (Light / Dark mode using useSyncExternalStore to eliminate hydration mismatch)
    const storedTheme = useSyncExternalStore(
        subscribeTheme,
        getThemeSnapshot,
        getThemeServerSnapshot,
    )
    const [themeOverride, setThemeOverride] = useState<'dark' | 'light' | null>(null)
    const currentTheme = themeOverride ?? storedTheme
    const isDarkTheme = currentTheme === 'dark'

    const handleToggleTheme = () => {
        const next = isDarkTheme ? 'light' : 'dark'
        setThemeOverride(next)
        try {
            localStorage.setItem('blog-reader-theme', next)
            window.dispatchEvent(new Event('storage'))
        } catch {
            // Ignore
        }
    }

    // Process article headings and generate ID anchors
    const { processedHtml, headings } = useMemo(() => {
        return processContentAndExtractHeadings(post.content)
    }, [post.content])

    // Lightweight articles array for sidebars and prev/next links (no heavy HTML content)
    const baseArticles = useMemo(() => {
        if (recentArticles && recentArticles.length > 0) {
            return recentArticles
        }
        return [...wordpressPosts]
    }, [recentArticles, wordpressPosts])

    // Compute unique recent/other blogs sorted newest first by date
    const otherBlogs = useMemo(() => {
        const filtered = baseArticles.filter((b) => b.id !== post.id && b.slug && b.slug !== post.slug)
        const unique = filtered.filter(
            (b, index, arr) => index === arr.findIndex((item) => item.slug === b.slug),
        )
        return unique.sort((a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date))
    }, [baseArticles, post.id, post.slug])

    // Combine all blogs to determine previous and next articles
    const allBlogs = useMemo(() => {
        const unique = baseArticles.filter(
            (b, index, arr) => index === arr.findIndex((item) => item.slug === b.slug),
        )
        return unique.sort((a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date))
    }, [baseArticles])

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
    })

    // Instant scroll to top on article switch
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [post.id, post.slug, post.title])

    const authorInitials = parseAuthorInitials(post.author)
    const readingTime = useMemo(
        () => calculateReadingTime(post.content || post.excerpt),
        [post.content, post.excerpt]
    )

    // Reading Progress Indicator (runs via requestAnimationFrame for 60fps GPU performance)
    const [readingProgress, setReadingProgress] = useState(0)

    useEffect(() => {
        let ticking = false
        const updateProgress = () => {
            const el = mainContentRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const total = el.offsetHeight - window.innerHeight
            if (total <= 0) {
                setReadingProgress(0)
                return
            }
            const scrolled = Math.max(0, -rect.top)
            const pct = Math.min(1, Math.max(0, scrolled / total))
            setReadingProgress(pct)
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        updateProgress()
        return () => window.removeEventListener('scroll', onScroll)
    }, [post.id])

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

    const handleWhatsAppShare = () => {
        const url = getShareUrl()
        if (!url) return
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + url)}`
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }

    const handleXShare = () => {
        const url = getShareUrl()
        if (!url) return
        const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`
        window.open(xUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
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

    // Re-initialize or trigger Google Preferred Source script on article navigation
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
        }

        triggerPreferredSource()
        const timer = setTimeout(triggerPreferredSource, 200)

        return () => {
            isMounted = false
            clearTimeout(timer)
        }
    }, [post.id, post.slug])

    return (
        <section
            ref={containerRef}
            style={{ marginTop: 'calc(-1 * var(--nav-full-height, 92px))' }}
            className={`w-full min-h-screen font-noto-sans flex flex-col ${
                isDarkTheme
                    ? 'bg-[#0f0f0f] text-neutral-100 blog-dark-reader'
                    : 'bg-[#eeeeee] text-black blog-light-reader'
            }`}
        >
            {/* Minimal Reading Progress Bar fixed at top of viewport */}
            <div className="fixed top-0 left-0 right-0 h-px z-[120] pointer-events-none bg-black/5">
                <div
                    className="h-full bg-[#ffc800] origin-left transition-transform duration-75 ease-out will-change-transform"
                    style={{ transform: `scaleX(${readingProgress})` }}
                />
            </div>

            <Script
                src="https://news.google.com/swg/js/v1/publisher.js"
                strategy="lazyOnload"
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
                    className="flex-1 min-w-0 px-6 sm:px-10 lg:px-12 xl:px-16 pt-[calc(var(--nav-full-height,92px)+1.5rem)] sm:pt-[calc(var(--nav-full-height,92px)+2rem)] pb-16"
                >
                    <div className="max-w-3xl xl:max-w-4xl mx-auto w-full">
                        {/* Top navigation row: Back to articles on left, Focus & Theme toggles on right */}
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <Link
                                href="/blogs"
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
                                            ? ' text-white hover:text-white '
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

                        {/* Semantic Article Wrapper containing header, byline, hero figure, and content for Chrome Reading Mode */}
                        <article
                            itemScope
                            itemType="https://schema.org/BlogPosting"
                            className="w-full flex flex-col"
                        >
                            {/* Article Header: Title + Author & Date Byline */}
                            <header className="article-header mb-8">
                                <h1
                                    itemProp="headline"
                                    className={`font-light text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-tight transition-colors duration-300 ${
                                        isDarkTheme ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    {post.title}
                                </h1>
                            </header>

                            {/* Hero Image - Full width with automatic natural height */}
                            {post.image && (
                                <figure className="article-featured-image relative w-full mb-10 overflow-hidden rounded-2xl bg-neutral-200 shadow-xs">
                                    <Image
                                        src={post.image}
                                        alt={post.imageAlt || post.title}
                                        width={1200}
                                        height={675}
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
                                        className="w-full h-auto object-contain block"
                                    />
                                    {post.imageAlt && (
                                        <figcaption className="sr-only">{post.imageAlt}</figcaption>
                                    )}
                                </figure>
                            )}

                            {/* Article Body */}
                            <div
                                itemProp="articleBody"
                                className={`article-content text-base sm:text-[17px] leading-[1.85] font-normal antialiased transition-colors duration-300 ${
                                    isDarkTheme
                                        ? 'text-neutral-200 [&>p]:mb-6 [&>p]:text-neutral-200 [&>h2]:text-white [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:leading-[1.25] [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h3]:text-white [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-5 [&>h3]:tracking-tight [&>h4]:text-white [&>h4]:text-lg [&>h4]:sm:text-xl [&>h4]:font-semibold [&>h4]:leading-[1.35] [&>h4]:mt-10 [&>h4]:mb-4 [&>ul]:mb-7 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:marker:text-white/80 [&>ol]:mb-7 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:marker:text-white/80 [&>ul>li]:mb-3 [&>ol>li]:mb-3 [&>ul>li>ul]:mt-3 [&>ul>li>ul]:mb-2 [&>ul>li>ul]:pl-6 [&>ul>li>ul]:list-disc [&>ol>li>ol]:mt-3 [&>ol>li>ol]:mb-2 [&>ol>li>ol]:pl-6 [&>ol>li>ol]:list-decimal [&>blockquote]:border-l-4 [&>blockquote]:border-white [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-10 [&>blockquote]:text-neutral-100 [&>blockquote]:text-lg [&>blockquote]:sm:text-xl [&>blockquote]:font-medium [&>blockquote]:leading-[1.7] [&>blockquote]:italic [&_a]:text-white [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-white/40 [&_a:hover]:text-neutral-200 [&_a:hover]:decoration-white [&_a]:transition-colors [&_a]:duration-200 [&>strong]:text-white [&>strong]:font-semibold [&_strong]:text-white [&_strong]:font-semibold [&_em]:text-neutral-300 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8 [&_img]:rounded-sm [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse [&>table_th]:border [&>table_th]:border-white/20 [&>table_th]:bg-white/10 [&>table_th]:px-4 [&>table_th]:py-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-white [&>table_td]:border [&>table_td]:border-white/15 [&>table_td]:px-4 [&>table_td]:py-3 [&>table_td]:text-neutral-200'
                                        : 'text-neutral-900 [&>p]:mb-6 [&>p]:text-neutral-900 [&>h2]:text-black [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:leading-[1.25] [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h3]:text-black [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-semibold [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-5 [&>h3]:tracking-tight [&>h4]:text-black [&>h4]:text-lg [&>h4]:sm:text-xl [&>h4]:font-semibold [&>h4]:leading-[1.35] [&>h4]:mt-10 [&>h4]:mb-4 [&>ul]:mb-7 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:marker:text-black [&>ol]:mb-7 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:marker:text-black [&>ul>li]:mb-3 [&>ol>li]:mb-3 [&>ul>li>ul]:mt-3 [&>ul>li>ul]:mb-2 [&>ul>li>ul]:pl-6 [&>ul>li>ul]:list-disc [&>ol>li>ol]:mt-3 [&>ol>li>ol]:mb-2 [&>ol>li>ol]:pl-6 [&>ol>li>ol]:list-decimal [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-10 [&>blockquote]:text-black [&>blockquote]:text-lg [&>blockquote]:sm:text-xl [&>blockquote]:font-medium [&>blockquote]:leading-[1.7] [&>blockquote]:italic [&_a]:text-black [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-black/40 [&_a:hover]:text-neutral-600 [&_a:hover]:decoration-black [&_a]:transition-colors [&_a]:duration-200 [&>strong]:text-black [&>strong]:font-semibold [&_strong]:text-black [&_strong]:font-semibold [&_em]:text-neutral-800 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8 [&_img]:rounded-sm [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse [&>table_th]:border [&>table_th]:border-black/20 [&>table_th]:bg-black/5 [&>table_th]:px-4 [&>table_th]:py-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-black [&>table_td]:border [&>table_td]:border-black/15 [&>table_td]:px-4 [&>table_td]:py-3 [&>table_td]:text-neutral-900'
                                }`}
                                dangerouslySetInnerHTML={{ __html: processedHtml }}
                            />
                        </article>

                        {/* Author & Publication Date Byline */}
                        <div
                            className={`flex flex-row items-center justify-between gap-6 pb-3 pt-8`}
                        >
                            {post.author && (
                                <div
                                    itemProp="author"
                                    itemScope
                                    itemType="https://schema.org/Person"
                                    className="flex items-center gap-3"
                                >
                                    <AuthorAvatar author={post.author} size="md" />
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
                                            itemProp="name"
                                            rel="author"
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
                                            isDarkTheme ? 'text-neutral-400' : 'text-neutral-500'
                                        }`}
                                    >
                                        Published on · {readingTime}
                                    </span>
                                    <time
                                        dateTime={post.date}
                                        itemProp="datePublished"
                                        className={`font-mono text-xs uppercase tracking-wider mt-0.5 ${
                                            isDarkTheme ? 'text-neutral-300' : 'text-black'
                                        }`}
                                    >
                                        {post.date}
                                    </time>
                                </div>
                            )}
                        </div>

                        {/* Publisher section for legacy posts: Marquee if > 2 links, otherwise inline link(s) if available */}
                        {post.source === 'legacy' && (() => {
                            const links =
                                post.additionalLinks && post.additionalLinks.length > 0
                                    ? post.additionalLinks
                                    : post.publisher && post.url
                                      ? [
                                            {
                                                publisher: post.publisher,
                                                publisherLogo: post.publisherLogo || '',
                                                url: post.url,
                                            },
                                        ]
                                      : []

                            if (links.length === 0) return null

                            if (links.length > 2) {
                                return (
                                    <PublisherMarquee
                                        links={links}
                                        isDarkTheme={isDarkTheme}
                                    />
                                )
                            }

                            return (
                                <div
                                    className={`mt-10 mb-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${
                                        isDarkTheme ? 'border-white/10' : 'border-black/10'
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
                                        {links.map((link, idx) => (
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
                                                        height={24}
                                                        unoptimized
                                                        className="h-6 w-auto object-contain mr-2.5"
                                                    />
                                                )}
                                                <span className="text-sm font-mono">
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
                        })()}


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
                                            <span className="hidden sm:inline">Link Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            <span className="hidden sm:inline">Copy</span>
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

                                {/* WhatsApp */}
                                <button
                                    type="button"
                                    onClick={handleWhatsAppShare}
                                    aria-label="Share on WhatsApp"
                                    title="Share on WhatsApp"
                                    className={`inline-flex items-center justify-center size-8 rounded-full transition-all duration-200 cursor-pointer ${
                                        isDarkTheme
                                            ? 'bg-white/10 hover:bg-[#25D366] text-neutral-200 hover:text-white'
                                            : 'bg-black/5 hover:bg-[#25D366] text-neutral-700 hover:text-white'
                                    }`}
                                >
                                    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </button>

                                {/* X (Twitter) */}
                                <button
                                    type="button"
                                    onClick={handleXShare}
                                    aria-label="Share on X"
                                    title="Share on X"
                                    className={`inline-flex items-center justify-center size-8 rounded-full transition-all duration-200 cursor-pointer ${
                                        isDarkTheme
                                            ? 'bg-white/10 hover:bg-black text-neutral-200 hover:text-white'
                                            : 'bg-black/5 hover:bg-black text-neutral-700 hover:text-white'
                                    }`}
                                >
                                    <svg viewBox="0 0 24 24" className="size-3 fill-current" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
                    </div>
                </main>

                {/* RIGHT SIDEBAR: Recent Articles attached to right edge */}
                <BlogRecentArticles
                    articles={otherBlogs}
                    isOpen={isRecentOpen}
                    onToggle={handleToggleRecent}
                />
            </div>

            {/* Mobile Table of Contents Floating Button & Bottom Sheet */}
            <MobileTocDrawer headings={headings} isDarkTheme={isDarkTheme} />

            {/* Floating Back to Top button */}
            <BlogBackToTop />
        </section>
    )
}
