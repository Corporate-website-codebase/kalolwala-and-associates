
"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const timelineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.1 },
  },
};

const timelineItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function OutcomeSection() {
  return (
    <>


      {/* Main outcome content */}
      <section className="w-full bg-white ">
        <div
          className="
            marginal
            grid grid-cols-1 md:grid-cols-[0.9fr_1.2fr]
            gap-8 
            items-start  
          "
        >
          {/* Left: book image + award badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col  items-center md:items-start"
          >
            <div
              className="
                relative w-full 
                aspect-[1.35/1] 
              "
            >
              <Image
                src="/images/offerings/case-studies/gulf-mockup.webp" // TODO: replace with your image
                alt="gulf-oil-report-mockup"
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-contain"
              />
            </div>

            {/* <div className="flex items-center gap-5 mt-6">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                <Image
                  src="/icons/badge-lacp-top-100.svg" // TODO: replace with your svg
                  alt="lacp-top-100-badge"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                <Image
                  src="/icons/badge-lacp-platinum.svg" // TODO: replace with your svg
                  alt="lacp-platinum-badge"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
            </div> */}
          </motion.div>

          {/* Right: award details */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2
              className="
                font-bold text-[#1A1A1A] leading-snug
                text-[clamp(1.5rem,1.2rem+1.8vw,2.25rem)]
              "
            >
              Platinum Award
            </h2>

            <p
              className="
                font-bold text-[#1A1A1A] mt-4
                text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] border-b border-gray-300 pb-2 -5
              "
            >
              LACP Vision Awards 2024–25
            </p>

            {/* <hr className="border-t border-gray-300 my-5" /> */}

            <h3
              className="
                font-black text-[#87888a] leading-snug
                text-[clamp(1.5rem,1.3rem+1.8vw,2.5rem)] mt-4
              "
            >
              Top 100 Reports Worldwide
            </h3>
            <p
              className="
                text-[#000000]
                text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)]
              "
            >
              Global recognition for the Annual Report 2024–25
            </p>

            {/* <hr className="border-t border-gray-300 my-5" /> */}

            <p
              className="
                font-semibold text-[#1A1A1A]
                text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] border-y border-gray-300 mt-8 mb-4 -2 
              "
            >
              Second Consecutive Year
            </p>
            <p
              className="
                text-[#000000] mt-2
                text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)]
              "
            >
              Recognition at the LACP Vision Awards
            </p>

            <div className="relative w-24 h-8 sm:w-42 sm:h-12 mt-3">
              <Image
                src="/images/offerings/case-studies/lacp-logo.webp" // TODO: replace with your svg
                alt="lacp-logo"
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </div>

            {/* Gold -> Platinum timeline */}
            <motion.div
              variants={timelineContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="flex items-center gap-3 mt-6 border-b border-gray-300 pb-2 "
            >
              <motion.span
                variants={timelineItem}
                className="
                  font-bold text-[#1A1A1A]
                  text-[clamp(1.125rem,1rem+0.6vw,1.5rem)]
                "
              >
                Gold
              </motion.span>

              <motion.span variants={timelineItem} className="text-[#0000000]">
                <ArrowRight
                  className="w-5 h-5 rounded-full bg-[#F5B301] p-1 sm:w-6 sm:h-6"
                  strokeWidth={2.5}
                />
              </motion.span>

              <motion.span
                variants={timelineItem}
                className="
                  font-bold text-[#1A1A1A]
                  text-[clamp(1.125rem,1rem+0.6vw,1.5rem)]
                "
              >
                Platinum
              </motion.span>
            </motion.div>

            <p
              className="
                text-[#000000] leading-relaxed mt-3
                text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)]
                max-w-[48ch] pb-5 md:pb-0
              "
            >
              The Annual Report progressed from Gold in 2023–24 to Platinum
              in 2024–25, along with a{" "}
              <span className="font-bold text-[#1A1A1A]">
                Technical Achievement Award.
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}