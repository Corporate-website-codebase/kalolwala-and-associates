'use client'

import { Check, Copy, Linkedin, Share2 } from 'lucide-react'
import React, { useState } from 'react'

interface BlogShareBarProps {
    title: string
    slug?: string
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

    const handleWhatsAppShare = () => {
        const url = getShareUrl()
        if (!url) return
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }

    const handleXShare = () => {
        const url = getShareUrl()
        if (!url) return
        const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        window.open(xUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
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

                    {/* WhatsApp */}
                    <button
                        type="button"
                        onClick={handleWhatsAppShare}
                        aria-label="Share on WhatsApp"
                        title="Share on WhatsApp"
                        className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-black/10 text-neutral-700 shadow-xs hover:border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </button>

                    {/* X */}
                    <button
                        type="button"
                        onClick={handleXShare}
                        aria-label="Share on X"
                        title="Share on X"
                        className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-black/10 text-neutral-700 shadow-xs hover:border-black hover:bg-black hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
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
