'use client'

import React, { useRef, useState } from 'react'

interface BlogSubscribeProps {
    isDarkTheme?: boolean
}

export default function BlogSubscribeBottom({ isDarkTheme = false }: BlogSubscribeProps) {
    const [email, setEmail] = useState('')
    const [subscriptionStatus, setSubscriptionStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle')
    const [subscriptionMessage, setSubscriptionMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [isShaking, setIsShaking] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

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

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const isEmailFormatted = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
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
            setSubscriptionMessage(
                error instanceof Error ? error.message : 'Something went wrong.',
            )
            triggerError()
        }
    }

    return (
        <section className="w-full my-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full">
                {/* Reduced text size in single line */}
                <span
                    className={`text-xs sm:text-sm font-mono tracking-wide whitespace-nowrap shrink-0 ${
                        isDarkTheme ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                >
                    Subscribe to our latest insights:
                </span>

                {/* Subscription Form */}
                <form onSubmit={handleSubscribe} className="flex items-center gap-2.5 w-full sm:max-w-md">
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
                        style={{ colorScheme: isDarkTheme ? 'dark' : 'light' }}
                        className={`w-full h-11 px-4 outline-none font-noto-sans text-sm transition-all duration-300 disabled:opacity-50 ${
                            isDarkTheme
                                ? 'bg-white/10 text-white placeholder:text-neutral-400 border-white/20 focus:border-white/60 caret-white selection:bg-white/20 selection:text-white [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff!important] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.1)]'
                                : 'bg-black/[0.04] text-neutral-900 placeholder:text-neutral-500 border-black/15 focus:border-black/60 caret-black selection:bg-black/10 selection:text-neutral-900 [&:-webkit-autofill]:[-webkit-text-fill-color:#171717!important] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(0,0,0,0.04)]'
                        } ${
                            isShaking ? 'animate-shake-x' : ''
                        } ${
                            hasError
                                ? '!border-red-500 placeholder:!text-red-400'
                                : 'border'
                        }`}
                    />

                    <button
                        type="submit"
                        disabled={subscriptionStatus === 'loading'}
                        className={`group relative h-11 px-7 uppercase overflow-hidden transition-all duration-300 border border-transparent hover:border-[#f5c518] flex items-center justify-center shrink-0 cursor-pointer opacity-100 ${
                            isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                    >
                        {/* Slide-up background fill on hover */}
                        <div className="absolute inset-0 bg-[#f5c518] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />

                        <span className="relative z-10 text-xs font-mono font-medium tracking-wider transition-colors duration-500 group-hover:text-black">
                            {subscriptionStatus === 'loading'
                                ? 'Subscribing...'
                                : 'Subscribe'}
                        </span>
                    </button>
                </form>
            </div>

            {subscriptionMessage && (
                <p
                    className={`mt-2 text-xs font-mono ${
                        subscriptionStatus === 'success'
                            ? 'text-emerald-500'
                            : 'text-red-500'
                    }`}
                >
                    {subscriptionMessage}
                </p>
            )}
        </section>
    )
}

