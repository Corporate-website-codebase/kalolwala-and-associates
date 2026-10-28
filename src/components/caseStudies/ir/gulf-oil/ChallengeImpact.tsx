
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ============================= */
/* Shared Badge (Sweep Reveal)   */
/* ============================= */

function SweepBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
    //   initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
    //   whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    //   viewport={{ once: true, amount: 0.8 }}
    //   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
     initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true, amount: 0.8 }}
      className="
        inline-flex bg-black text-white
        font-semibold rounded-full
        px-5 py-2
      "
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

/* ============================= */
/* Challenge Cards               */
/* ============================= */

interface ChallengeCard {
  text: string;
}

const challengeCards: ChallengeCard[] = [
  { text: "Clearer and more cohesive" },
  { text: "Easier for stakeholders to navigate" },
  { text: "Stronger in connecting strategy, performance and data" },
  { text: "Aligned with global reporting expectations" },
];

const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardPop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

function ChallengeCards() {
  return (
    <motion.div
      variants={cardsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="
        grid grid-cols-2 md:grid-cols-4
        gap-2 max-w-2xl items-stretch
        mt-8
      "
    >
      {challengeCards.map((card, idx) => (
        <motion.div
          key={idx}
          variants={cardPop}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="
            relative bg-transparent rounded-2xl
            border border-white -sm
            pt-6 px-5 pb-6
            min-h-[180px] h-full
            flex flex-col justify-start
            transition-transform
          "
        >
          {/* Top Yellow Dash */}
          <span className="absolute top-0 w-9 h-[4px] bg-[#F5B301] rounded-b-full mb-4 shrink-0" />
          
          <p
            className="
              text-[#1A1A1A] font-medium leading-snug
              text-[clamp(0.875rem,0.8rem+0.2vw,0.95rem)]
            "
          >
            {card.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ============================= */
/* Main Assembled Component      */
/* ============================= */

export default function ChallengeImpactSection() {
  return (
    <section className="w-full bg-[#EDEDED]  overflow-hidden">
      {/* Restored the marginal class */}
      <div className="m-auto w-[95vw] pt-10 md:pt-15 lg:pt-20 pb-5 md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* ----- Left Column: The Challenge ----- */}
          <div>
            <SweepBadge>The Challenge</SweepBadge>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[#000000]/95 leading-relaxed mt-6 text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)] lg:max-w-lg"
            >
              Build on the recognition of the previous Annual Report while
              making the next report:
            </motion.p>

            <ChallengeCards />
          </div>

          {/* ----- Right Column: Information to Impact ----- */}
          <div>
            <SweepBadge>From Information to Impact</SweepBadge>

            <div className="flex flex-col md:flex-row items-center md:items-start  mt-6">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[#000000]/95 leading-relaxed text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)] w-full  lg:w-[25%] pt-2"
              >
                We brought Gulf Oil India&apos;s strategy, business
                performance, priorities and people into one connected
                narrative focusing on clarity, accessibility and a
                consistent reporting experience.
              </motion.p>

              {/* Replaced SVG with Image and scale/fade animation */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
                className="w-full lg:w-[75%] flex justify-center md:justify-start"
              >
                <div className="relative w-full max-w-[320px]  lg:-mt-15 aspect-square">
                  <Image 
                    src="/images/offerings/case-studies/infograph-gulf.webp" // Update with your actual image path
                    alt="Information to Impact Diagram"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ----- Bottom Placement: The Outcome ----- */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <SweepBadge>The Outcome</SweepBadge>
        </div>
      </div>
    </section>
  );
}