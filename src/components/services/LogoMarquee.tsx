"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

// ---------------------------------------------------------
// 1. IMAGE IMPORTS
// ---------------------------------------------------------
import img_4 from "@/marquee/amara-raja-horigontal-logos.png";
import img_10 from "@/marquee/Aster DM.png";
import img_11 from "@/marquee/AU bank.png";
import img_18 from "@/marquee/Bikaji.png";
import img_26 from "@/marquee/cipla.png";
import img_27 from "@/marquee/Coal India.png";
import img_31 from "@/marquee/EIL.png";
import img_37 from "@/marquee/Exim.png";
import img_81 from "@/marquee/federal.png";
import img_43 from "@/marquee/GSK.png";
import img_44 from "@/marquee/Gulf.png";
import img_49 from "@/marquee/Indiamart.png";
import img_50 from "@/marquee/IndianOil.png";
import img_53 from "@/marquee/IRCTC.png";
import img_85 from "@/marquee/irfc.png";
import img_80 from "@/marquee/ITC.png";
import img_56 from "@/marquee/Kotak.png";
import img_63 from "@/marquee/Max healthcare.png";
import img_66 from "@/marquee/Natco.png";
import img_82 from "@/marquee/paras.png";
import img_76 from "@/marquee/Solar.png";
import img_83 from "@/marquee/tataChem.png";
import img_78 from "@/marquee/Tata Commu.png";
import img_79 from "@/marquee/Tata Consumer.png";
import img_84 from "@/marquee/tatarealty.png";

// ---------------------------------------------------------
// 2. DATA ARRAY
// ---------------------------------------------------------
const marqueeImages = [
  img_4, img_10, img_11, img_18, img_26, img_27, img_31, img_37, img_81, 
  img_43, img_44, img_49, img_50, img_53, img_85, img_80, img_56, img_63, 
  img_66, img_82, img_76, img_83, img_78, img_79, img_84,
];

// ---------------------------------------------------------
// 3. COMPONENT
// ---------------------------------------------------------
type Props = {
  externalImages?: (string | StaticImageData)[];
  gap?: number;
  duration?: number;
};

export default function LogoMarquee({
  externalImages,
  gap = 40,
  duration = 40,
}: Props) {
  const data = externalImages || marqueeImages;
  const items = [...data, ...data];

  return (
    <section className="w-full bg-[#E3E3E3] border-y border-gray-200 py-10 overflow-hidden">
      <motion.div
        className="flex items-center w-max"
        animate={{ x: "-50%" }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((img, i) => {
          const srcString = typeof img === "string" ? img : img.src;
          const isAmaraRaja = srcString.includes("amara-raja");
          const isTataConsumer = srcString.includes("Tata%20Consumer");
          const isSpecialLogo = isAmaraRaja || isTataConsumer;

          return (
            <div
              key={i}
              className="flex-shrink-0 flex items-center"
              style={{ marginRight: `${gap}px` }}
            >
              <div
                className={`relative flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                  isSpecialLogo ? "h-20" : "h-14"
                }`}
                style={{
                  width: "auto",
                  maxWidth: isSpecialLogo ? "300px" : "180px", 
                }}
              >
                {/* 
                  Removed brightness reductions and grayscale filters. 
                  Images will now render in full, vibrant original colors. 
                */}
                <Image
                  src={img}
                  alt={`Client Logo ${i}`}
                  width={0}
                  height={0}
                  sizes="300px"
                  className="w-auto h-full object-contain"
                />
              </div>

              {/* Separator Dot - Lightened for colored theme */}
              <span className="text-gray-300 text-xl pl-8 select-none">
                •
              </span>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}