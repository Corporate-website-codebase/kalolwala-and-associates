'use client'

import { Check, Copy, Linkedin, Share2 } from 'lucide-react'
import React, { useState } from 'react'

interface BlogShareBarProps {
    title: string
}

export default function BlogShareBar({ title }: BlogShareBarProps) {
    const [copied, setCopied] = useState(false)
    const [shareError, setShareError] = useState(false)

    const getShareUrl = () => {
        if (typeof window === 'undefined') return ''
        return window.location.href
    }

    const handleCopyLink = async () => {
        const url = getShareUrl()
        if (!url) return

        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setShareError(false)
            setTimeout(() => setCopied(false), 2200)
        } catch {
            setShareError(true)
            setTimeout(() => setShareError(false), 2200)
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
                await navigator.share({ title, url })
            } catch {
                // Ignore dismissed native share sheet
            }
            return
        }

        await handleCopyLink()
    }

    return (
        <div className="mt-12 pt-8 border-t border-black/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 bg-neutral-50/70 backdrop-blur-md rounded-2xl border border-black/5 hover:border-black/15 transition-colors duration-500">
                {/* Left share prompt */}
                <div className="flex flex-col gap-1">
                    <span className="text-base sm:text-lg font-mono font-semibold text-black">
                        Share this article
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-600 font-light">
                        Spread the word and inspire your network.
                    </span>
                </div>

                {/* Share action buttons */}
                <div className="flex items-center gap-2.5">
                    {/* Copy Link button */}
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        aria-label="Copy article link"
                        title="Copy link"
                        className="group relative inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-white border border-black/10 text-neutral-700 shadow-xs hover:border-black hover:bg-black hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                        <Copy size={15} strokeWidth={1.7} className="transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-xs font-mono font-medium uppercase tracking-wider">
                            Copy link
                        </span>
                    </button>

                    {/* LinkedIn button */}
                    <button
                        type="button"
                        onClick={handleLinkedInShare}
                        aria-label="Share on LinkedIn"
                        title="Share on LinkedIn"
                        className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-black/10 text-neutral-700 shadow-xs hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                        <Linkedin size={16} strokeWidth={1.7} className="transition-transform duration-300 group-hover:scale-110" />
                    </button>

                    {/* Native mobile share sheet */}
                    <button
                        type="button"
                        onClick={handleNativeShare}
                        aria-label="Share article"
                        title="Share article"
                        className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-black/10 text-neutral-700 shadow-xs hover:border-black hover:bg-black hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                        <Share2 size={16} strokeWidth={1.7} className="transition-transform duration-300 group-hover:scale-110" />
                    </button>
                </div>
            </div>

            {/* Floating confirmation toast */}
            <div
                className={`fixed z-50 bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 pointer-events-none transition-all duration-300 ${
                    copied || shareError ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                aria-live="polite"
            >
                <div className="flex items-center gap-2.5 px-4 py-3 bg-black text-white shadow-xl rounded-full">
                    {copied ? (
                        <>
                            <Check size={14} strokeWidth={2.5} className="text-emerald-400" />
                            <span className="text-xs font-mono uppercase tracking-widest">
                                Link copied to clipboard
                            </span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} strokeWidth={1.7} className="text-red-400" />
                            <span className="text-xs font-mono uppercase tracking-widest">
                                Unable to copy link
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
