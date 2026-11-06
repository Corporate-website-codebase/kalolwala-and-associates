"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface HeroSecProps {
  /** Background image */
  imageSrc: string;
  imageAlt?: string;
  /** Main title (bottom-left) */
  title: string;
  /** Optional supporting text shown under the title */
  text?: string;
  /**
   * Gradient overlay: any CSS gradient string, e.g.
   * "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)".
   * Pass "none" to remove the overlay.
   */
  overlay?: string;
  /** Optional extra classes for the <section> */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// Same aspect ratio on every device (taken from the design: 2186 x 782)
const ASPECT_RATIO = "2186 / 782";

// Dark fade from the bottom so white text stays readable (matches the design)
const DEFAULT_OVERLAY =
  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)";

/* ------------------------------------------------------------------ */
/*  Animation variants (same as the original)                          */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroSec({
  imageSrc,
  imageAlt = "",
  title,
  text,
  overlay = DEFAULT_OVERLAY,
  className = "",
}: HeroSecProps) {
  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      // The section is the container: every `cqw` below is relative to its width,
      // so the title/text scale in exact proportion with the image.
      style={{ aspectRatio: ASPECT_RATIO, containerType: "inline-size" }}
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
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: overlay }}
      />

      {/* Content — bottom-left */}
      <div
        className="relative z-10 h-full w-full flex flex-col items-start justify-end marginal"
        style={{ paddingBottom: "3.2cqw" }}
      >
        <motion.h1
          variants={textReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-white font-bold leading-[1.2] text-[clamp(1rem,5cqw,5rem)] lg:text-[clamp(1rem,3.6cqw,5rem)] max-w-[45cqw]"
          style={{
            // fontSize: "clamp(1rem, 5cqw, 5rem)",
            maxWidth: "45cqw",
          }}
        >
          {title}
        </motion.h1>

        {text && (
          <motion.p
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-white leading-relaxed"
            style={{
              fontSize: "clamp(0.6875rem, 1.25cqw, 1.5rem)",
              marginTop: "1cqw",
              maxWidth: "42cqw",
            }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
}