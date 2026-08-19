'use client'

import Footers from '@/components/Footers'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const premiumEase: [number, number, number, number] = [0.33, 1, 0.68, 1]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
}

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: premiumEase },
    },
}

const AestheticDot = () => (
    <motion.div
        animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
        className="w-3 h-3 bg-[#f5c518] rounded-full shadow-[0_0_15px_rgba(245,197,24,0.6)] shrink-0"
    />
)

const NotFound = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col font-noto-sans text-white overflow-hidden">
            {/* Main 404 Hero Section */}
            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grow flex flex-col items-center justify-center relative px-6 py-24 md:py-20"
            >
                <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-12 lg:gap-24 px-6">
                    {/* LEFT SIDE: 404 */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-end relative group">
                        <Image
                            src="/ka-logo.webp"
                            alt="404"
                            width={500}
                            height={500}
                            className="absolute opacity-15 -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:left-auto md:right-0 md:top-0"
                        />

                        <motion.h1
                            variants={itemVariants}
                            className="text-[120px] md:text-[200px] lg:text-[250px] font-bold leading-none select-none stroke-white relative z-10 "
                        >
                            404
                        </motion.h1>
                    </div>

                    {/* RIGHT SIDE: CONTENT */}
                    <div className="lg:w-1/2 flex flex-col items-center lg:items-start max-w-xl">
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-4 mb-8"
                        >
                            <AestheticDot />
                            <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-400 font-medium">
                                Status 404: Page Missing
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl md:text-4xl lg:text-5xl font-light leading-snug"
                        >
                            The page you&apos;re looking for <br className="hidden md:block" />
                            has been <span className="text-[#f5c518]">moved or deleted.</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-gray-400 mt-8 text-sm md:text-base tracking-wide leading-relaxed"
                        >
                            The page you&rsquo;re looking for may have been moved, updated, or is no
                            longer available. Please check the URL or return to the homepage to
                            continue.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group mt-12"
                        >
                            <Link
                                href="/"
                                className="relative inline-flex items-center gap-6 px-10 py-5 bg-[#111] border border-gray-800 overflow-hidden transition-all duration-500 hover:border-[#f5c518]"
                            >
                                <div className="absolute inset-0 bg-[#f5c518] translate-y-full transition-transform duration-500 group-hover:translate-y-0" />

                                <ArrowLeft className="w-5 h-5 relative z-10 transition-colors duration-500 group-hover:text-black" />
                                <span className="relative z-10 uppercase tracking-[0.2em] text-sm font-bold transition-colors duration-500 group-hover:text-black">
                                    Return to Homepage
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.main>

            {/* Standard Footer */}
            <Footers nextPageLink="/" nextPageName="Home" />
        </div>
    )
}

export default NotFound
