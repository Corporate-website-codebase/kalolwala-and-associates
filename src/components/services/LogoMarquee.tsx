
"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

// ---------------------------------------------------------
// 1. IMAGE IMPORTS
// ---------------------------------------------------------
import img_4 from "@/marquee1/amara-raja.png";
import img_10 from "@/marquee1/Aster_DM_Healthcare_Logo.png";
import img_11 from "@/marquee1/AU.png";
import img_18 from "@/marquee1/Bikaji.png";
import img_26 from "@/marquee1/Cipla.png";
import img_27 from "@/marquee1/Coal india.png";
import img_31 from "@/marquee1/EIL.png";
import img_37 from "@/marquee1/Exim Bank.png";
import img_81 from "@/marquee1/Federal Bank.png";
import img_43 from "@/marquee1/GSK.png";
import img_44 from "@/marquee1/Gulf.png";
import img_49 from "@/marquee1/Indiamart.png";
import img_50 from "@/marquee1/IndianOil.png";
import img_53 from "@/marquee1/IRCTC.png";
import img_85 from "@/marquee1/IRFC.png";
import img_80 from "@/marquee1/ITC.png";
import img_56 from "@/marquee1/Kotak.png";
import img_63 from "@/marquee1/MAX Healthcare.png";
import img_66 from "@/marquee1/Natco.png";
import img_82 from "@/marquee1/paras.png";
import img_76 from "@/marquee1/Solar.png";
import img_83 from "@/marquee1/TATA Chemicals.png";
import img_78 from "@/marquee1/TATA Communications.png";
import img_79 from "@/marquee1/TATA Consumer products.png";
import img_84 from "@/marquee1/Tata Realty 1.png";

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
          
          // Next.js handles static imports by encoding spaces, so we check broadly
          const isAmaraRaja = srcString.includes("amara-raja");
          const isGSK = srcString.includes("GSK");
          const isTCP = srcString.includes("TATA Consumer products")||srcString.includes("TATA Communications");
          const isSpecialLogo = isAmaraRaja ;

          // Create a specific check for Tata Realty
          const isTataRealty = srcString.includes("Tata%20Realty") || srcString.includes("Tata Realty") || srcString.includes("Realty") ;
          const isITC = srcString.includes("ITC") || srcString.includes("ITC");

          return (
            <div
              key={i}
              className="flex-shrink-0 flex items-center"
              style={{ marginRight: `${gap}px` }}
            >
              <div
                className={`relative flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                  isTataRealty ? "h-24" : isITC?"h-22":isSpecialLogo ? "h-20" :isTCP?"h-16": isGSK  ?"h-10":"h-14"
                }`}
                style={{
                  width: "auto",
                  // Allow Tata Realty to expand wider based on its new h-24 height
                  maxWidth: isTataRealty ? "350px" : isSpecialLogo ? "300px" : isTCP?"220px":"180px", 
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
                  sizes="(max-width: 768px) 200px, 350px"
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