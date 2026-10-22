'use client'

import { BLOG_CATEGORIES, decodeHtmlEntities, type BlogPostCard } from '@/data/blogs'
import { motion, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import BlogCard from './BlogCard'

const ITEMS_PER_PAGE = 12

const emptySubscribe = () => () => { }

function useHasMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    )
}

const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const gridContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

type WordPressPost = {
    id: number
    date: string
    slug: string
    title: {
        rendered: string
    }
    content: {
        rendered: string
    }
    excerpt: {
        rendered: string
    }
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url?: string
            media_details?: {
                sizes?: {
                    medium_large?: { source_url?: string }
                    medium?: { source_url?: string }
                    large?: { source_url?: string }
                    thumbnail?: { source_url?: string }
                    full?: { source_url?: string }
                    [key: string]: { source_url?: string } | undefined
                }
            }
        }>
        author?: Array<{
            name?: string
        }>
    }
}

export default function BlogPaginatedList({
    initialCards,
    cards = [],
    wordpressPosts = [],
}: {
    initialCards?: BlogPostCard[]
    cards?: BlogPostCard[]
    wordpressPosts?: WordPressPost[]
}) {
    const hasMounted = useHasMounted()

    const [currentPage, setCurrentPage] = useState(1)
    const [prevPage, setPrevPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [pageInputValue, setPageInputValue] = useState('01')
    const [isPageChanging, setIsPageChanging] = useState(false)

    // Helper to update URL query parameters cleanly
    const updateUrlParams = (cat: string, search: string, page: number) => {
        try {
            const params = new URLSearchParams()
            if (cat && cat !== 'All') params.set('category', cat)
            if (search.trim()) params.set('search', search.trim())
            if (page > 1) params.set('page', String(page))
            const qs = params.toString()
            const targetUrl = qs ? `/blogs?${qs}` : '/blogs'
            window.history.pushState(null, '', targetUrl)
        } catch {
            // Ignore in non-browser context
        }
    }

    // Synchronize initial page & filters from URL query parameters and Back & Forward navigation
    useEffect(() => {
        const syncFiltersFromUrl = () => {
            const params = new URLSearchParams(window.location.search)
            const catParam = params.get('category')
            if (catParam) {
                setSelectedCategory(catParam)
            } else {
                setSelectedCategory('All')
            }

            const searchParam = params.get('search')
            if (searchParam) {
                setSearchQuery(searchParam)
            } else {
                setSearchQuery('')
            }

            const pageParam = params.get('page')
            const parsed = pageParam ? parseInt(pageParam, 10) : 1
            if (!isNaN(parsed) && parsed >= 1) {
                setCurrentPage(parsed)
                setPageInputValue(String(parsed).padStart(2, '0'))
            } else {
                setCurrentPage(1)
                setPageInputValue('01')
            }
        }

        syncFiltersFromUrl()
        window.addEventListener('popstate', syncFiltersFromUrl)
        return () => window.removeEventListener('popstate', syncFiltersFromUrl)
    }, [])

    const [email, setEmail] = useState('')
    const [subscriptionStatus, setSubscriptionStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle')
    const [subscriptionMessage, setSubscriptionMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [isShaking, setIsShaking] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const listTopRef = useRef<HTMLDivElement>(null)

    // Sync input value when page changes
    if (prevPage !== currentPage) {
        setPrevPage(currentPage)
        setPageInputValue(String(currentPage).padStart(2, '0'))
    }

    // If initialCards is supplied (already pre-sorted and stripped on server), use it directly!
    const sortedCards = useMemo(() => {
        if (initialCards && initialCards.length > 0) {
            return initialCards
        }

        const fallbackCards: BlogPostCard[] = wordpressPosts.map((post) => {
            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]

            const image =
                featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
                featuredMedia?.media_details?.sizes?.medium?.source_url ||
                featuredMedia?.media_details?.sizes?.large?.source_url ||
                featuredMedia?.media_details?.sizes?.thumbnail?.source_url ||
                featuredMedia?.source_url ||
                ''

            return {
                id: String(post.id),
                title: decodeHtmlEntities(post.title.rendered),
                slug: post.slug,
                excerpt: post.excerpt?.rendered
                    ? decodeHtmlEntities(post.excerpt.rendered.replace(/<[^>]*>/g, '').trim())
                    : '',
                date: new Date(post.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                }),
                url: '',
                image,
                author: decodeHtmlEntities(post._embedded?.author?.[0]?.name || 'K&A Editorial'),
            }
        })

        return [...cards, ...fallbackCards].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
    }, [initialCards, cards, wordpressPosts])

    // Extract available categories preserving canonical order
    const categoriesList = useMemo(() => {
        const foundCategories = new Set<string>()
        for (const card of sortedCards) {
            if (card.category) {
                foundCategories.add(card.category)
            }
        }
        const ordered = BLOG_CATEGORIES.filter((cat) => foundCategories.has(cat))
        const remaining = Array.from(foundCategories).filter(
            (cat) => !BLOG_CATEGORIES.includes(cat as (typeof BLOG_CATEGORIES)[number])
        )
        return ['All', ...ordered, ...remaining]
    }, [sortedCards])

    // Filter cards based on selected category and search query
    const filteredCards = useMemo(() => {
        let result = sortedCards

        if (selectedCategory !== 'All') {
            result = result.filter((card) => card.category === selectedCategory)
        }

        const q = searchQuery.trim().toLowerCase()
        if (q) {
            result = result.filter((card) => {
                const title = card.title?.toLowerCase() || ''
                const excerpt = card.excerpt?.toLowerCase() || ''
                const author = card.author?.toLowerCase() || ''
                const cat = card.category?.toLowerCase() || ''
                return title.includes(q) || excerpt.includes(q) || author.includes(q) || cat.includes(q)
            })
        }

        return result
    }, [sortedCards, selectedCategory, searchQuery])

    const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE) || 1

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredCards.slice(start, start + ITEMS_PER_PAGE)
    }, [currentPage, filteredCards])

    // Smoothly switch pages and sync URL history without laggy timeouts
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage || isPageChanging) {
            return
        }

        setIsPageChanging(true)
        setCurrentPage(newPage)
        updateUrlParams(selectedCategory, searchQuery, newPage)

        if (listTopRef.current) {
            listTopRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }

        setTimeout(() => {
            setIsPageChanging(false)
        }, 150)
    }

    const handleCategorySelect = (category: string) => {
        if (category === selectedCategory) return
        setSelectedCategory(category)
        setCurrentPage(1)
        setPageInputValue('01')
        updateUrlParams(category, searchQuery, 1)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)
        setCurrentPage(1)
        setPageInputValue('01')
        updateUrlParams(selectedCategory, query, 1)
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        setCurrentPage(1)
        setPageInputValue('01')
        updateUrlParams(selectedCategory, '', 1)
    }

    const handleResetAll = () => {
        setSelectedCategory('All')
        setSearchQuery('')
        setCurrentPage(1)
        setPageInputValue('01')
        updateUrlParams('All', '', 1)
    }

    const handlePageInputSubmit = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault()
        }
        const targetPage = parseInt(pageInputValue, 10)
        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
            if (targetPage !== currentPage) {
                handlePageChange(targetPage)
            }
            setPageInputValue(String(targetPage).padStart(2, '0'))
        } else {
            setPageInputValue(String(currentPage).padStart(2, '0'))
        }
    }

    const isEmailFormatted = useMemo(() => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    }, [email])

    const triggerError = () => {
        setHasError(true)
        setEmail('')
        setIsShaking(false)
        setTimeout(() => setIsShaking(true), 10)
        setTimeout(() => setIsShaking(false), 450)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        if (hasError) {
            setHasError(false)
        }
        if (subscriptionMessage && subscriptionStatus === 'error') {
            setSubscriptionMessage('')
            setSubscriptionStatus('idle')
        }
    }

    // Handle newsletter subscription requests
    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!isEmailFormatted) {
            triggerError()
            return
        }

        setSubscriptionStatus('loading')
        setSubscriptionMessage('')
        setHasError(false)

        try {
            const response = await fetch('/api/blog/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong.')
            }

            setSubscriptionStatus('success')
            setSubscriptionMessage("You're subscribed.")
            setEmail('')
        } catch (error) {
            setSubscriptionStatus('error')
            setSubscriptionMessage(error instanceof Error ? error.message : 'Something went wrong.')
            triggerError()
        }
    }

    return (
        <section id="articles" className="w-full bg-[#d4d4d4] text-black font-noto-sans overflow-x-clip">
            <div className="w-full min-h-screen font-noto-sans ">
                {/* Hero header banner */}
                <div className="relative w-full min-h-[70vh] lg:min-h-[78vh] overflow-hidden flex flex-col justify-center bg-neutral-900">
                    {/* Background hero image with smooth in-appear */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src="/blogs/blogs-banner.webp"
                            alt="Background"
                            fill
                            priority
                            unoptimized
                            sizes="100vw"
                            className="w-full h-full object-cover object-[100%_90%]"
                        />
                    </motion.div>

                    {/* Gradient overlay to keep foreground text legible */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />

                    {/* Hero copy and subscription form */}
                    <motion.div
                        variants={heroContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 flex flex-col h-full justify-center marginal"
                    >
                        <motion.h1
                            variants={heroItemVariants}
                            className="text-[clamp(26px,2.4vw,46px)] leading-[1.2] lg:leading-tight text-white font-light tracking-tight max-w-4xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl"
                        >
                            A space for ideas that challenge the familiar, perspectives that sharpen
                            understanding and conversations that shape better communication.
                        </motion.h1>

                        {/* Newsletter subscription module */}
                        <motion.div
                            variants={heroItemVariants}
                            className="mt-8 lg:mt-16 lg:w-4xl flex flex-col gap-6"
                        >
                            <div className="md:w-1/2">
                                <h2
                                    className="text-white font-noto-sans font-medium leading-tight tracking-tight"
                                    style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
                                >
                                    Subscribe to our latest insights.
                                </h2>

                                <p
                                    className="mt-3 text-neutral-100 font-light leading-relaxed"
                                    style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                                >
                                    Get our latest articles, perspectives and insights delivered
                                    directly to your inbox.
                                </p>
                            </div>

                            <div className="mt-2 md:mt-0 w-full">
                                <form
                                    onSubmit={handleSubscribe}
                                    className="flex flex-col sm:flex-row gap-3 w-full"
                                >
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder={
                                            hasError
                                                ? 'Please enter your email address'
                                                : 'Enter your email address'
                                        }
                                        disabled={subscriptionStatus === 'loading'}
                                        style={{ colorScheme: 'dark' }}
                                        className={`w-full sm:max-w-sm h-12 px-4 bg-white/10 text-white outline-none backdrop-blur-[2px] font-noto-sans transition-all duration-300 disabled:opacity-50 ${isShaking ? 'animate-shake-x' : ''
                                            } ${hasError
                                                ? 'border border-red-500 placeholder:text-red-400 focus:border-red-400 focus:bg-white/15'
                                                : 'border border-white/20 placeholder:text-neutral-400 focus:border-white/60'
                                            }`}
                                    />

                                    <button
                                        type="submit"
                                        disabled={subscriptionStatus === 'loading'}
                                        className="group relative w-full sm:w-fit h-12 px-7 bg-white text-black uppercase overflow-hidden transition-all duration-300 border flex items-center justify-center shrink-0 opacity-100 cursor-pointer hover:border-[#f5c518] border-transparent"
                                    >
                                        {/* Slide-up background fill on hover (matching not-found page effect) */}
                                        <div className="absolute inset-0 bg-[#f5c518] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />

                                        <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                                            {subscriptionStatus === 'loading'
                                                ? 'Subscribing...'
                                                : 'Subscribe'}
                                        </span>
                                    </button>

                                </form>

                                {subscriptionMessage && (
                                    <p
                                        className={`mt-3 text-xs ${subscriptionStatus === 'success'
                                            ? 'text-emerald-400'
                                            : 'text-red-400'
                                            }`}
                                    >
                                        {subscriptionMessage}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll target for pagination */}
                <div ref={listTopRef} className="scroll-mt-24" />

                {/* Search & Category Filter Section */}
                <div className="marginal pt-12! pb-0! flex flex-col gap-6 w-full min-w-0 max-w-full">
                    {/* Header Row: Large Serif Title + Right-Aligned Search Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                        <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-neutral-900">
                            Explore Insights
                        </h2>

                        {/* Search Input Bar */}
                        <div className="relative w-full sm:w-72 lg:w-80">
                            <div className="relative flex items-center">
                                <Search
                                    size={18}
                                    className="absolute left-4 w-4.5 h-4.5 text-neutral-500 pointer-events-none z-10 shrink-0"
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search articles, authors..."
                                    aria-label="Search articles"
                                    className="w-full h-11 pl-11 pr-10 bg-white/70 backdrop-blur-xl hover:bg-white/90 focus:bg-white text-neutral-900 placeholder:text-neutral-500 text-sm font-noto-sans rounded-full border border-white focus:border-black/30 focus:ring-1 focus:ring-black/10 outline-none transition-all duration-300 shadow-xs hover:shadow-sm focus:shadow-md"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        aria-label="Clear search query"
                                        className="absolute right-3 p-1 rounded-full text-neutral-400 hover:text-black hover:bg-black/5 transition-colors cursor-pointer z-10"
                                    >
                                        <X size={15} className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Scrollable Category Pills (Strictly Contained, No Page Overflow) */}
                    <div className="w-full min-w-0 max-w-full overflow-x-auto pb-1.5 scrollbar-none">
                        <div className="flex items-center justify-start sm:justify-end gap-2.5 w-max min-w-full">
                            {categoriesList.map((category) => {
                                const isSelected = selectedCategory === category
                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => handleCategorySelect(category)}
                                        className={`inline-flex items-center px-4.5 py-2 rounded-full text-xs grow justify-center font-noto-sans font-medium whitespace-nowrap cursor-pointer shrink-0 border transition-colors duration-200 ${isSelected
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white/60 backdrop-blur-xl hover:bg-white text-neutral-800 hover:text-black border-white'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Blog post cards grid or empty state */}
                <div className="min-h-137.5 marginal">
                    {filteredCards.length === 0 ? (
                        <div className="py- flex flex-col items-center justify-center text-center px-4">
                            <div className="size-14 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                                <Search className="size-6" />
                            </div>
                            <h3 className="text-xl font-normal text-neutral-900 mb-2 font-noto-sans">
                                No articles found
                            </h3>
                            <p className="text-sm text-neutral-500 max-w-md mb-6">
                                We couldn&apos;t find any articles matching{' '}
                                {searchQuery ? (
                                    <span>
                                        search <strong className="text-neutral-800">&ldquo;{searchQuery}&rdquo;</strong>
                                    </span>
                                ) : null}
                                {searchQuery && selectedCategory !== 'All' ? ' in ' : ''}
                                {selectedCategory !== 'All' ? (
                                    <span>
                                        category <strong className="text-neutral-800">&ldquo;{selectedCategory}&rdquo;</strong>
                                    </span>
                                ) : null}
                                .
                            </p>
                            <button
                                type="button"
                                onClick={handleResetAll}
                                className="px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-neutral-950 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                                Clear all filters
                            </button>

                            {/* Recent Articles fallback tailored to screen size */}
                            {sortedCards.length > 0 && (
                                <div className="w-full mt-16 pt-12 border-t border-black/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900 tracking-tight text-left">
                                            Recent Articles
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={handleResetAll}
                                            className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black underline transition-colors cursor-pointer"
                                        >
                                            View all articles
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 2xl:gap-5 text-left">
                                        {sortedCards.slice(0, 4).map((card, idx) => (
                                            <div
                                                key={`recent-${card.id}`}
                                                className={`h-full ${idx === 3 ? 'lg:hidden 2xl:block' : ''}`}
                                            >
                                                <BlogCard post={card} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <motion.div
                            key={`${currentPage}-${selectedCategory}-${searchQuery}`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={gridContainerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-2 gap-6 lg:gap-8 2xl:gap-5"
                        >
                            {currentData.map((c) => (
                                <motion.div key={c.id} variants={cardItemVariants} className="h-full">
                                    <BlogCard post={c} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Pagination navigation */}
                {totalPages > 1 && (
                    <div
                        className={`mt-12 marginal md:pt-0! pt-6! pb-6! flex justify-center items-center gap-8 sm:gap-12 transition-opacity duration-300 ${hasMounted ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Previous page button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isPageChanging}
                            aria-label="Previous page"
                            className={`flex items-center gap-2 transition-all ${currentPage === 1 || isPageChanging
                                ? 'opacity-30 cursor-not-allowed'
                                : 'group cursor-pointer'
                                }`}
                        >
                            <ChevronLeft
                                size={20}
                                className={`text-black transition-transform duration-300 ${currentPage !== 1 && !isPageChanging
                                    ? 'group-hover:-translate-x-1'
                                    : ''
                                    }`}
                            />
                            <span
                                className={`text-base text-black transition-colors ${currentPage !== 1 && !isPageChanging
                                    ? 'group-hover:text-neutral-600'
                                    : ''
                                    }`}
                            >
                                Previous
                            </span>
                        </button>

                        {/* Page indicator & direct page jump input */}
                        <form
                            onSubmit={handlePageInputSubmit}
                            className="flex items-center font-mono text-sm tracking-wider"
                        >
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={pageInputValue}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 3)
                                    setPageInputValue(val)
                                }}
                                onFocus={(e) => e.target.select()}
                                onBlur={handlePageInputSubmit}
                                disabled={isPageChanging}
                                aria-label="Page number"
                                title="Enter page number and press Enter"
                                className="w-10 sm:w-11 h-7 text-center font-mono text-sm font-medium text-black hover:bg-white/90 border border-black/20 rounded outline-none transition-all duration-200"
                            />
                            <span className="mx-2 text-neutral-500 font-medium">/</span>
                            <span className="text-neutral-600 font-medium">
                                {String(totalPages).padStart(2, '0')}
                            </span>
                        </form>

                        {/* Next page button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || isPageChanging}
                            aria-label="Next page"
                            className={`flex items-center gap-2 transition-all ${currentPage === totalPages || isPageChanging
                                ? 'opacity-30 cursor-not-allowed'
                                : 'group cursor-pointer'
                                }`}
                        >
                            <span
                                className={`text-base text-black transition-colors ${currentPage !== totalPages && !isPageChanging
                                    ? 'group-hover:text-neutral-600'
                                    : ''
                                    }`}
                            >
                                Next
                            </span>
                            <ChevronRight
                                size={20}
                                className={`text-black transition-transform duration-300 ${currentPage !== totalPages && !isPageChanging
                                    ? 'group-hover:translate-x-1'
                                    : ''
                                    }`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
