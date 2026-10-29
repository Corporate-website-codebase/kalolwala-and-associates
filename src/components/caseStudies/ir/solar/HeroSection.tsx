
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
        aspect-[3/4] md:aspect-[3.5/1.5] lg:aspect-[3.5/1.25]
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
          src="/images/offerings/case-studies/solar-bg.webp" // TODO: replace with your image
          alt="hero-background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/15 via-black/45 lg:bg-gradient-to-r lg:from-black/55 lg:via-black/35 lg:to-transparent" />

      {/* Content */}
      <div
        className="
          relative z-10 h-full w-full flex flex-col items-start justify-center
          pt-8
          sm:pt-10
          md:pt-14
          lg:pt-16
          marginal xl:pt-20
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
            text-[clamp(1.75rem,1.2rem+2.5vw,3.5rem)]
            max-w-[18ch]
          "
        >
          Solar Industries India Limited
        </motion.h1>

        <motion.p
          variants={textReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="
            text-white leading-relaxed
            text-[clamp(0.9375rem,0.8rem+0.4vw,1.25rem)]
            mt-4 sm:mt-5 md:mt-6
            max-w-[42ch] sm:max-w-[44ch] md:max-w-[48ch]
          "
        >
          With a diversified presence across industrial explosives, defence,
          aerospace and advanced technologies, Solar&apos;s story extends
          beyond business performance to encompass innovation, global
          expansion and India&apos;s industrial progress.
        </motion.p>
      </div>
    </section>
  );
}