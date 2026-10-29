
"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1 + i * 0.2, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        aspect-[3/4] sm:aspect-[3/2] lg:aspect-[3.5/1.4]
      "
    >
      {/* Background Image */}
      <motion.div
        variants={imageReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <Image
          src="/images/offerings/case-studies/granules-bg.webp" // TODO: replace with your image
          alt="granules-hero-background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/55 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-black/10" />

      {/* Content */}
      <div
        className="
          relative z-10 h-full w-full flex flex-col items-start justify-center
          marginal
        "
      >
        <motion.h1
          variants={textReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="
            text-white font-medium leading-tight
            text-[clamp(1.5rem,1.1rem+2vw,2.75rem)]
            max-w-[20ch]
          "
        >
          How Granules India {" "}
          <span className="font-bold">Expanded</span> Its Reporting Story with K&A
        </motion.h1>

        <motion.p
          variants={textReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="
            text-white leading-relaxed
            text-[clamp(0.9375rem,0.82rem+0.4vw,1.5rem)]
            mt-4 sm:mt-5 md:mt-6
            max-w-[48ch]
          "
        >
          Every business has a story that goes beyond its numbers. For Granules India, K&A helped bring that story to life by evolving its traditional Annual Report into a comprehensive Integrated Report, combining richer disclosures, a more engaging narrative and thoughtful design to present a broader picture of the Company.{" "}
          
        </motion.p>
      </div>
    </section>
  );
}