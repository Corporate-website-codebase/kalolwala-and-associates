
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface Dimension {
  label: string;
  icon: string;
}

const dimensions: Dimension[] = [
  {
    label: "Business Performance",
    icon: "/images/offerings/case-studies/icon1.webp",
  },
  {
    label: "Strategic Direction",
    icon: "/images/offerings/case-studies/icon2.webp",
  },
  {
    label: "Manufacturing & Technology",
    icon: "/images/offerings/case-studies/icon3.webp",
  },
  {
    label: "People and Partnerships",
    icon: "/images/offerings/case-studies/icon4.webp",
  },
  {
    label: "Responsible Growth",
    icon: "/images/offerings/case-studies/icon5.webp",
  },
];

const containerAnimation: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 18,
    },
  },
};

export default function DimensionsSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="marginal">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="
            max-w-[520px]
            text-[clamp(1.5rem,2.5vw,2.25rem)]
            font-bold leading-[1.2] text-[#1A1A1A]
          "
        >
          Connecting the Dimensions of Value Creation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            mt-4 max-w-[570px]
            text-[clamp(1rem,1.45vw,1.3rem)]
            leading-relaxed text-[#434246]
          "
        >
          The Report brings together the many dimensions of Solar&apos;s
          business to tell one connected story of growth
        </motion.p>

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            mt-8 grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 lg:justify-between gap-4 w-full md:max-w-[85vw]  


          "
        >
          {dimensions.map((dim) => (
            <motion.div
              key={dim.label}
              variants={cardAnimation}
              whileHover={{ scale: 1.05 }}
              className="
                relative flex min-h-[170px] w-full md:max-w-[200px]
                flex-col justify-between overflow-hidden
                rounded-2xl bg-[#EDEDED]
                p-4 sm:min-h-[190px] sm:p-5 md:min-h-[210px]
              "
            >
              <p
                className="
                  max-w-[160px]
                  text-[clamp(1rem,1.45vw,1.3rem)]
                  font-medium leading-snug text-[#1A1A1A]
                "
              >
                {dim.label}
              </p>

              <div className="relative mt-5 pb-0 h-10 w-10 sm:h-14 sm:w-14">
                <Image
                  src={dim.icon}
                  alt={dim.label}
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>

              {/* Accent sits directly on the bottom edge */}
              <span
                aria-hidden="true"
                className="
                  absolute bottom-0 left-0 block h-[6px] w-1/2
                  rounded-tr-full bg-[#F5B301]
                "
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}