
"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function StorySection() {
  return (
    <section className="w-full bg-[#EDEDED] ">
      {/* Top paragraph — standard marginal container */}
      <div className="marginal">
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2
              className="
                font-bold text-[#1A1A1A] leading-snug
                text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)]
                max-w-[26ch] mt-10 sm:mt-12 md:mt-14 lg:mt-16
              "
            >
              From Many Capabilities to One Powerful Story.
            </h2>

           
          </motion.div>
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            text-[#000000]/95 leading-relaxed
            text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)]
            max-w-4xl pt-8 pb-0
          "
        >
          The result is more than a record of performance. It is a connected story of ambition,
progress and the next phase of growth, shaped through the collaboration between
Solar Industries India Limited and K&A.
        </motion.p> */}
      </div>

      {/* Content row — breaks out of marginal container */}
      <div
        className="
          flex flex-col lg:flex-row
          items-start 
          gap-10 lg:gap-0
            pb-20 
        "
      >
        {/* Left column — content, with its own left padding matching marginal scale */}
        <div
          className="
            w-full lg:w-[60%] xl:w-[58%]
            pl-2 md:pl-6 lg:pl-[2.5%]   
            pr-5 sm:pr-8 md:pr-12 lg:pr-10 xl:pr-12 
          "
        >
          <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            text-[#000000]/95 leading-relaxed
            text-[clamp(0.9375rem,0.85rem+0.35vw,1.125rem)]
            max-w-2xl pb-10
          "
        >
          The result is more than a record of performance. It is a connected story of ambition,
progress and the next phase of growth, shaped through the collaboration between
Solar Industries India Limited and K&A.
        </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className=""
          >
            <span
              className="
                inline-block bg-[#F5B301] text-[#1A1A1A]
                font-black rounded-full
                px-5 py-2
                text-[clamp(0.8125rem,0.75rem+0.25vw,0.9375rem)]
              "
            >
              At K&A
            </span>
          </motion.div>

          

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="
              text-[#1A1A1A] leading-[1.15] font-medium mt-8 sm:mt-10
              text-[clamp(1.75rem,1.2rem+2.8vw,3.25rem)]
              max-w-6xl
            "
          >
            We don’t just tell the story of a business. <br/>
            <span className="font-bold">We bring its vision into focus.</span>
          </motion.p>
        </div>

        {/* Right column — image, full-bleed to viewport edge, no marginal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative w-full lg:w-[40%] xl:w-[42%]
            h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]
            rounded-l-lg lg:rounded-l-xl overflow-hidden
            shrink-0
          "
        >
          <Image
            src="/images/offerings/case-studies/solar-mockup.webp" // TODO: replace with your image
            alt="annual-report-collage"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}