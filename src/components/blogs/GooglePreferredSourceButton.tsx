'use client'

import { useEffect, useRef } from 'react'

declare global {
    interface Window {
        PREFERRED_SOURCE?: any
    }
}

interface GooglePreferredSourceButtonProps {
    theme?: 'light' | 'dark' | 'auto'
    lang?: string
    className?: string
}

export default function GooglePreferredSourceButton({
    theme = 'light',
    lang = 'en',
    className = '',
}: GooglePreferredSourceButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const triggerInit = () => {
            const ps = window.PREFERRED_SOURCE
            if (ps && typeof ps.ready === 'function') {
                ps.ready().then((api: any) => {
                    api?.init?.()
                })
            } else if (ps && typeof ps.push === 'function') {
                ps.push((api: any) => {
                    api?.init?.()
                })
            } else {
                window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || []
                window.PREFERRED_SOURCE.push((api: any) => {
                    api?.init?.()
                })
            }
        }

        // Re-initialize whenever theme or language changes
        const timeout = setTimeout(triggerInit, 0)
        return () => clearTimeout(timeout)
    }, [theme, lang])

    return (
        <div
            key={`${theme}-${lang}`}
            ref={containerRef}
            className={`min-h-[40px] flex items-center ${className}`}
            google-add-preferred-source-btn=""
            data-lang={lang}
            data-theme={theme}
            suppressHydrationWarning
        />
    )
}
