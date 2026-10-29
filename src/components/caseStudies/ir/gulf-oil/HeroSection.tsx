
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
          src="/images/offerings/case-studies/gulf-oil-bg.webp" // TODO: replace with your image
          alt="gulf-oil-hero-background"
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
          How Gulf Oil India Progressed from{" "}
          <span className="font-bold">Gold to Platinum</span> Recognition
          with K&amp;A&apos;s Annual Reporting
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
          Gulf Oil Lubricants India partnered with K&amp;A to transform its
          Annual Report 2024–25 into a clearer, more connected reporting
          experience, bringing together strategy, performance, data and
          storytelling around the theme{" "}
          <span className="font-bold">
            &quot;Sparking Up Growth Engines, Charging Ahead.&quot;
          </span>
        </motion.p>
      </div>
    </section>
  );
}