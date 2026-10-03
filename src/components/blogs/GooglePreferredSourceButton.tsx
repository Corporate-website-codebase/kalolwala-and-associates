import React from 'react'

interface GooglePreferredSourceButtonProps {
    domain?: string
    theme?: 'light' | 'dark' | 'auto'
    className?: string
}

export default function GooglePreferredSourceButton({
    domain = 'www.kalolwala.com',
    theme = 'light',
    className = '',
}: GooglePreferredSourceButtonProps) {
    const isDark = theme === 'dark'
    const deepLinkUrl = `https://www.google.com/preferences/source?q=${encodeURIComponent(domain)}`

    return (
        <div className={`flex items-center justify-center sm:justify-start ${className}`}>
            <a
                href={deepLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Add Kalolwala & Associates as a preferred source on Google`}
                className={`group w-fit max-w-full h-[52px] sm:h-[56px] px-3.5 sm:px-4 flex items-center justify-center gap-2.5 rounded-xl border transition-all duration-200 cursor-pointer active:scale-[0.98] select-none ${
                    isDark
                        ? 'bg-[#181818] hover:bg-[#222222] border-white/15 hover:border-white/30 text-white shadow-sm'
                        : 'bg-white hover:bg-neutral-50/90 border-neutral-300 hover:border-neutral-400 text-neutral-900 shadow-xs'
                }`}
            >
                {/* Official Google "G" Icon */}
                <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-200 group-hover:scale-105"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        fill="#4285F4"
                        d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.39Z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 21.5c2.63 0 4.84-.87 6.45-2.34l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.74 9.74 0 0 0 12 21.5Z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M6.54 13.62A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.62v-2.5H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.5Z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 6.35c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.45 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.5C7.31 8.07 9.46 6.35 12 6.35Z"
                    />
                </svg>

                {/* Text Label */}
                <span className="flex flex-col text-left leading-[1.1]">
                    <span className="text-xs sm:text-[13px] font-medium tracking-tight opacity-75">
                        Add as a preferred
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                        source on Google
                    </span>
                </span>
            </a>
        </div>
    )
}
