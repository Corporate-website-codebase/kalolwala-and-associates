'use client'

import React, { useMemo, useRef, useState } from 'react'

export default function BlogSubscribeBottom() {
    const [email, setEmail] = useState('')
    const [subscriptionStatus, setSubscriptionStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle')
    const [subscriptionMessage, setSubscriptionMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [isShaking, setIsShaking] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

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
            setSubscriptionMessage(
                error instanceof Error ? error.message : 'Something went wrong.',
            )
            triggerError()
        }
    }

    return (
        <section className="w-full mt-14 p-6 sm:p-8 md:p-10 rounded-2xl bg-black text-white relative overflow-hidden shadow-md">
            {/* Subtle radial ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 w-full">
                <div className="flex flex-col justify-between gap-8">
                    {/* Copy */}
                    <div className="">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                            Stay informed
                        </p>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
                            Subscribe to our latest insights.
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                            Get our latest articles, research perspectives, and reporting insights delivered directly to your inbox.
                        </p>
                    </div>

                    {/* Subscription Form */}
                    <div className="w-full lg:max-w-md">
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
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
                                className={`w-full h-12 px-4 bg-white/10 backdrop-blur-[2px] text-white outline-none font-noto-sans text-sm transition-all duration-300 disabled:opacity-50 ${
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
                                {/* Slide-up background fill on hover */}
                                {isReady && (
                                    <div className="absolute inset-0 bg-[#f5c518] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                                )}

                                <span
                                    className={`relative z-10 text-xs font-mono font-medium tracking-wider transition-colors duration-500 ${
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
        </section>
    )
}
