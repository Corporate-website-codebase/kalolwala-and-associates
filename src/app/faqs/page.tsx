"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footers from "@/components/Footers";

// === TYPES === //
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQData {
    [category: string]: FAQItem[];
}

interface AccordionItemProps {
    question: string;
    answer: string;
    index: number;
}

// === DATA === //
const FAQ_DATA:FAQData = {
  "Working with K&A": [
  {
    question: "How involved will our team need to be during the Annual Report process?",
    answer: "The client provides inputs, attends interviews and reviews drafts. The assigned project manager is the main point of contact and handles day-to-day coordination."
  },
  {
    question: "Will K&A coordinate with different departments within our organisation?",
    answer: "Yes. K&A liaises with departments via the client's internal coordinator where possible, or the project manager will engage directly to gather Annual report content."
  },
  {
    question: "How do you maintain confidentiality when working with sensitive company information?",
    answer: "All Annual Reports operate under confidentiality protocols and NDAs. Information is handled only by the internal project team and shared through secure channels."
  },
  {
    question: "Can you work with companies that already have internal content prepared?",
    answer: "Yes. K&A can edit, structure and apply designing knowledge to client-provided content for Annual Reports, Sustainability Reports and ESG reports."
  },
],
"The Reporting Process": [
  {
    question: "How does K&A structure the overall reporting process?",
    answer: "Each Annual Report is led by a project manager who manages coordination and timelines. The research analysts' conduct interviews and draft the content, the editorial team refine the narrative, creative team develop the visual layout and the production team typesets statutory reports and financial sections."
  },
  {
    question: "How many review stages are typically involved in a project?",
    answer: "Drafts are shared at multiple stages, including content drafts, edited versions and design proofs, allowing feedback to be incorporated throughout the process of Annual Report or Sustainability Report."
  },
  {
    question: "How do you ensure deadlines are met?",
    answer: "A detailed project timeline is shared at the start, and the client servicing team tracks progress with regular follow-ups and milestone reviews"
  },
  {
    question: "How long does it typically take to develop an annual or sustainability report?",
    answer: "Typical timelines for Annual Reports and Sustainability Reports are 6-8 weeks, subject to scope and revert of input and approvals from the clients."
  },
],
"Services & Deliverables": [
  {
    question: "Can K&A assist with both print and digital report formats?",
    answer: "Yes. Deliverables include print-ready PDFs and production files, interactive digital PDFs, web-ready HTML reports and responsive microsites. K&A also produces investor presentations and web content derived from the report content."
  },
  {
    question: "Can you help us structure our sustainability or ESG disclosures?",
    answer: "Yes. The team converts raw ESG data into structured narrative and disclosures suitable for Sustainability Reports and ESG reports."
  },
  {
    question: "Can K&A support us beyond the report itself?",
    answer: "Yes. Support can extend to corporate presentations, coffee-table books, brochures, website content and other corporate communication materials to maintain consistency across platforms."
  }
]
};

const premiumEase = [0.16, 1, 0.3, 1] as const;

// === COMPONENTS === //
const AccordionItem = ({ question, answer, index }: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: premiumEase }}
            className="border-b border-white/10 group"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full cursor-pointer py-8 md:py-10 flex justify-between items-start text-left hover:bg-white/[0.01] transition-colors duration-500 px-4 -mx-4"
            >
                <span className="text-xl md:text-2xl font-light tracking-tight pr-8 text-white/70 group-hover:text-white transition-colors duration-300">
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
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
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
    return (
        <main className="min-h-screen bg-[#080808] text-white selection:bg-[#f5c518] selection:text-black">

            {/* 1. HERO SECTION */}
            <section className="pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: premiumEase }}
                            className=" text-white pt-32 sm:pt-40 font-thin text-[clamp(32px,4.4vw,60px)] mb-8 leading-tight"
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
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white/90 leading-none">
                                        {category}
                                    </h3>
                                    {/* <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mt-2">
                                        Section {catIndex + 1}
                                    </p> */}
                                </motion.div>
                            </div>
                        </aside>

                        {/* RIGHT SIDE: Questions List */}
                        <div className="lg:col-span-8 lg:pl-16 py-12 lg:py-20">
                            <div className="space-y-0">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        index={index}
                                        question={faq.question}
                                        answer={faq.answer}
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