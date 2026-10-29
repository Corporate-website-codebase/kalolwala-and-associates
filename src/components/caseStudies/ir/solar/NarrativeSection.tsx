
"use client";

import { motion, Variants } from "framer-motion";

interface NarrativeRow {
  heading: string;
  headingMaxWidth: string;
  description: string;
}

const rows: NarrativeRow[] = [
  {
    heading: "Rise and Shine: \nBringing a business Story Together",
    headingMaxWidth: "max-w-",
    description:
      "A unifying narrative connecting Solar's business evolution with its contribution to industrial development, strategic self-reliance and long-term value creation.",
  },
  {
    heading: "Performance with a Forward View",
    headingMaxWidth: "max-w-sm",
    description:
      "The report connects business achievements with Solar's strategic priorities, helping readers understand not only the progress made, but also the direction in which the business is evolving.",
  },
];

// Left heading sweeps in from left to right
const sweepIn: Variants = {
  hidden: { opacity: 0, x: -60, clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

// Right content fades in after a short delay
const fadeInRight: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.75, ease: "easeOut" },
  },
};

export default function NarrativeSection() {
  return (
    <section className="w-full bg-[#EDEDED] ">
      <div className="marginal">
        {rows.map((row, index) => (
          <div key={row.heading}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="
                grid grid-cols-1
                md:grid-cols-[1fr_1.4fr] md:items-start
                gap-6 md:gap-10 lg:gap-12
                py-8 sm:py-10 md:py-12
              "
            >
              <motion.h2
                variants={sweepIn}
                className={`
                  font-bold text-[#1A1A1A] leading-snug
                  text-[clamp(1.25rem,1rem+1vw,2rem)] whitespace-pre-line
                  ${row.headingMaxWidth}
                `}
              >
                {row.heading}
              </motion.h2>

              <motion.div
                variants={fadeInRight}
                className="
                  border border-white/50 rounded-2xl bg-transparent
                  p-5 sm:p-6 md:p-8
                  w-full
                  text-[clamp(0.9375rem,0.9rem+0.35vw,1.25rem)] max-w-3xl text-[#434246] leading-relaxed
                "
              >
                {/* <p className="text-[clamp(0.9375rem,0.9rem+0.35vw,1.25rem)] max-w-4xl text-[#434246] leading-relaxed"> */}
                  {row.description}
                {/* </p> */}
              </motion.div>
            </motion.div>

            {index !== rows.length - 1 && (
              <hr className="border-t border-gray-300 w-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}