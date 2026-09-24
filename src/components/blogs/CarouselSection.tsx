'use client'

import { BLOG_DATA, type BlogPost } from '@/data/blogs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo, useRef, useState, useSyncExternalStore } from 'react'
import BlogCard from './BlogCard'

const ITEMS_PER_PAGE = 12

const emptySubscribe = () => () => {}

function useHasMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
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
                    large?: { source_url?: string }
                    medium_large?: { source_url?: string }
                    full?: { source_url?: string }
                }
            }
        }>
        author?: Array<{
            name?: string
        }>
    }
}

export default function BlogPaginatedList({
    cards = BLOG_DATA,
    wordpressPosts = [],
}: {
    cards?: BlogPost[]
    wordpressPosts?: WordPressPost[]
}) {
    const hasMounted = useHasMounted()
    const [currentPage, setCurrentPage] = useState(1)
    const [prevPage, setPrevPage] = useState(currentPage)
    const [pageInputValue, setPageInputValue] = useState('01')
    const [isPageChanging, setIsPageChanging] = useState(false)

    const [email, setEmail] = useState('')
    const [subscriptionStatus, setSubscriptionStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle')
    const [subscriptionMessage, setSubscriptionMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [isShaking, setIsShaking] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const listTopRef = useRef<HTMLDivElement>(null)

    // Sync input value when page changes without triggering useEffect setState cascading renders
    if (prevPage !== currentPage) {
        setPrevPage(currentPage)
        setPageInputValue(String(currentPage).padStart(2, '0'))
    }

    // Normalize WordPress posts into our local BlogPost format and sort everything newest first
    const sortedCards = useMemo(() => {
        const wordpressCards: BlogPost[] = wordpressPosts.map((post) => {
            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]

            const image =
                featuredMedia?.media_details?.sizes?.large?.source_url ||
                featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
                featuredMedia?.media_details?.sizes?.full?.source_url ||
                featuredMedia?.source_url ||
                ''

            return {
                id: String(post.id),
                title: post.title.rendered,
                slug: post.slug,
                content: '',
                excerpt: post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim() : '',
                date: new Date(post.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                }),
                url: '',
                image,
                author: post._embedded?.author?.[0]?.name || 'K&A Editorial',
            }
        })

        return [...cards, ...wordpressCards].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
    }, [cards, wordpressPosts])

    const totalPages = Math.ceil(sortedCards.length / ITEMS_PER_PAGE)

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return sortedCards.slice(start, start + ITEMS_PER_PAGE)
    }, [currentPage, sortedCards])

    // Smoothly scroll back to the top of the blog grid whenever switching pages
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage || isPageChanging) {
            return
        }

        setIsPageChanging(true)

        setTimeout(() => {
            setCurrentPage(newPage)

            if (listTopRef.current) {
                listTopRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }

            setTimeout(() => {
                setIsPageChanging(false)
            }, 100)
        }, 400)
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

    const isReady = isEmailFormatted && subscriptionStatus !== 'loading'

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
        <section id="articles" className="w-full bg-[#d4d4d4] text-black font-noto-sans">
            <div className="w-full min-h-screen font-noto-sans ">
                {/* Hero header banner */}
                <div className="relative w-full min-h-[80svh] overflow-hidden flex flex-col justify-center bg-black">
                    {/* Background hero image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src="/blogs/blogs-banner.webp"
                            alt="Background"
                            fill
                            priority
                            sizes="100vw"
                            className="w-full h-full object-cover object-bottom"
                        />
                    </div>

                    {/* Gradient overlay to keep foreground text legible */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/65 to-transparent pointer-events-none" />

                    {/* Hero copy and subscription form */}
                    <div className="relative z-10 flex flex-col h-full justify-center marginal">
                        <h1
                            className="leading-[1.1] mb-4 lg:mb-6 text-white font-light tracking-tight whitespace-pre-line"
                            style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}
                        >
                            Finding the story in the
                            <br />
                            subtle space between words.
                        </h1>

                        <p
                            className="text-neutral-100 whitespace-pre-line max-w-3xl font-light"
                            style={{
                                fontSize: 'clamp(14px, 1.2vw, 18px)',
                                lineHeight: '1.6',
                            }}
                        >
                            Explore our latest articles, perspectives and insights across business,
                            communication, reporting and design. From emerging trends and changing
                            business landscapes to ideas shaping corporate communication and
                            stakeholder engagement, our blog brings together thoughtful perspectives
                            designed to help businesses understand what is changing, why it matters
                            and what comes next.
                        </p>

                        {/* Newsletter subscription module */}
                        <div className="mt-8 lg:mt-16 lg:w-4xl flex flex-col gap-6">
                            <div className="md:w-1/2">
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-100 mb-3">
                                    Stay informed
                                </p>

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
                                        className={`w-full sm:max-w-sm h-12 px-4 bg-white/10 text-white outline-none font-noto-sans transition-all duration-300 disabled:opacity-50 ${
                                            isShaking ? 'animate-shake-x' : ''
                                        } ${
                                            hasError
                                                ? 'border border-red-500 placeholder:text-red-400 focus:border-red-400 focus:bg-white/15'
                                                : 'border border-white/20 placeholder:text-neutral-400 focus:border-white/60'
                                        }`}
                                    />

                                    <button
                                        type="submit"
                                        disabled={subscriptionStatus === 'loading'}
                                        className={`group relative w-full sm:w-fit h-12 px-7 bg-white text-black uppercase overflow-hidden transition-all duration-300 border flex items-center justify-center shrink-0 ${
                                            isReady
                                                ? 'opacity-100 cursor-pointer hover:border-[#f5c518] border-transparent'
                                                : 'opacity-70 cursor-not-allowed border-transparent'
                                        }`}
                                    >
                                        {/* Slide-up background fill on hover (matching not-found page effect) */}
                                        {isReady && (
                                            <div className="absolute inset-0 bg-[#f5c518] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                                        )}

                                        <span
                                            className={`relative z-10 transition-colors duration-500 ${
                                                isReady ? 'group-hover:text-black' : ''
                                            }`}
                                        >
                                            {subscriptionStatus === 'loading'
                                                ? 'Subscribing...'
                                                : 'Subscribe'}
                                        </span>
                                    </button>
                                </form>

                                {subscriptionMessage && (
                                    <p
                                        className={`mt-3 text-xs ${
                                            subscriptionStatus === 'success'
                                                ? 'text-emerald-400'
                                                : 'text-red-400'
                                        }`}
                                    >
                                        {subscriptionMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll target for pagination */}
                <div ref={listTopRef} className="scroll-mt-24" />

                {/* Blog post cards grid with smooth clean entrance */}
                <div className="min-h-100 marginal">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-2 gap-6 lg:gap-8 2xl:gap-5 transition-all duration-300 ease-out ${
                            isPageChanging
                                ? 'opacity-0 translate-y-4'
                                : 'opacity-100 translate-y-0'
                        }`}
                    >
                        {currentData.map((c) => (
                            <BlogCard key={c.id} post={c} />
                        ))}
                    </div>
                </div>

                {/* Pagination navigation */}
                {totalPages > 1 && (
                    <div
                        className={`mt-12 marginal pt-0! flex justify-center items-center gap-8 sm:gap-12 transition-opacity duration-300 ${
                            hasMounted ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {/* Previous page button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isPageChanging}
                            aria-label="Previous page"
                            className={`flex items-center gap-2 transition-all ${
                                currentPage === 1 || isPageChanging
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'group cursor-pointer'
                            }`}
                        >
                            <ChevronLeft
                                size={20}
                                className={`text-black transition-transform duration-300 ${
                                    currentPage !== 1 && !isPageChanging
                                        ? 'group-hover:-translate-x-1'
                                        : ''
                                }`}
                            />
                            <span
                                className={`text-base text-black transition-colors ${
                                    currentPage !== 1 && !isPageChanging
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
                            className={`flex items-center gap-2 transition-all ${
                                currentPage === totalPages || isPageChanging
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'group cursor-pointer'
                            }`}
                        >
                            <span
                                className={`text-base text-black transition-colors ${
                                    currentPage !== totalPages && !isPageChanging
                                        ? 'group-hover:text-neutral-600'
                                        : ''
                                }`}
                            >
                                Next
                            </span>
                            <ChevronRight
                                size={20}
                                className={`text-black transition-transform duration-300 ${
                                    currentPage !== totalPages && !isPageChanging
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
