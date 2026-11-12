
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footers from "@/components/Footers";
import { FAQ_DATA } from "@/data/faqData";

interface AccordionItemProps {
    id: string;
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onToggle: (id: string) => void;
}

// Build the final data structure once, with stable ids attached to every item.
// const FAQ_DATA: FAQData = buildFaqData(FAQ_RAW_DATA);

// Precompute a flat lookup set of every valid id, for fast hash validation.
const ALL_FAQ_IDS = new Set(
    Object.values(FAQ_DATA)
        .flat()
        .map((item) => item.id)
);

const premiumEase = [0.16, 1, 0.3, 1] as const;

// === COMPONENTS === //
const AccordionItem = ({
    id,
    question,
    answer,
    index,
    isOpen,
    onToggle,
}: AccordionItemProps) => {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: premiumEase }}
            className="border-b border-white/10 group scroll-mt-28 lg:scroll-mt-36"
        >
            <button
                onClick={() => onToggle(id)}
                className="w-full cursor-pointer py-8 md:py-10 flex justify-between items-start text-left hover:bg-white/[0.01] transition-colors duration-500 px-4 -mx-4"
            >
                <span className="text-xl md:text-2xl font-normal tracking-tight pr-8 text-white/80 group-hover:text-white transition-colors duration-300">
                    {question}
                </span>

                <div className="relative flex items-center justify-center w-6 h-6 mt-2 shrink-0">
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.4, ease: premiumEase }}
                        className="absolute w-full h-[1px] bg-white/30 group-hover:bg-[#f5c518]"
                    />
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.4, ease: premiumEase }}
                        className="absolute h-full w-[1px] bg-white/30 group-hover:bg-[#f5c518]"
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: premiumEase }}
                        className="overflow-hidden"
                    >
                        <div className="pb-12 pt-2 max-w-2xl">
                            <p className="text-base md:text-lg text-white/70 leading-relaxed font-normal">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQPage() {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());

    const toggleAccordion = useCallback((id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    // Open the accordion referenced in the URL hash (on load + on hash change)
    // and scroll it into view.
    useEffect(() => {
        const openFromHash = () => {
            const rawHash = window.location.hash.replace("#", "");
            if (!rawHash) return;

            const id = decodeURIComponent(rawHash);
            if (!ALL_FAQ_IDS.has(id)) return;

            setOpenIds((prev) => {
                if (prev.has(id)) return prev;
                const next = new Set(prev);
                next.add(id);
                return next;
            });

            // Wait for the open state (and layout) to settle before scrolling.
            requestAnimationFrame(() => {
                setTimeout(() => {
                    document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
            });
        };

        openFromHash();

        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
    }, []);

    return (
        <main className="min-h-screen bg-[#080808] text-white selection:bg-[#f5c518] selection:text-black">

            {/* 1. HERO SECTION */}
            <section className="pb-20 px-6 md:px-12 max-w-[1600px]  mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: premiumEase }}
                            className=" text-white pt-32 sm:pt-40 font-light sm:font-thin text-[clamp(32px,4.4vw,60px)] mb-8 leading-tight"
                        >
                            Your
                            Questions,<br />
                            Answered.
                        </motion.h1>
                    </div>

                </div>
            </section>

            {/* 2. STICKY CONTENT SECTION */}
            <section className="px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/10">
                {Object.entries(FAQ_DATA).map(([category, faqs], catIndex) => (
                    <div key={category} className="grid grid-cols-1 lg:grid-cols-12 group/section">

                        {/* LEFT SIDE: Sticky Category Heading */}
                        <aside className="lg:col-span-4 lg:border-r lg:border-white/10 relative">
                            <div className="sticky top-0 lg:top-12 h-fit py-12 lg:py-20 pr-8 bg-[#080808] z-20">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#f5c518] font-noto-sans text-xl">
                                            0{catIndex + 1}
                                        </span>
                                        <div className="h-[1px] w-8 bg-white/10" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white/90 leading-none whitespace-pre-line">
                                        {category}
                                    </h3>
                                </motion.div>
                            </div>
                        </aside>

                        {/* RIGHT SIDE: Questions List */}
                        <div className="lg:col-span-8 lg:pl-16 py-12 lg:py-20">
                            <div className="space-y-0">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        id={faq.id}
                                        index={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openIds.has(faq.id)}
                                        onToggle={toggleAccordion}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <Footers nextPageName="Contact" nextPageLink="/contact" />
        </main>
    );
}