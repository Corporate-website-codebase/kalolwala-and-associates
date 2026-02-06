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
import img_81 from "@/marquee/federal.png"; // Moved for Alphabetical
import img_43 from "@/marquee/GSK.png";
import img_44 from "@/marquee/Gulf.png";
import img_49 from "@/marquee/Indiamart.png";
import img_50 from "@/marquee/IndianOil.png";
import img_53 from "@/marquee/IRCTC.png";
import img_85 from "@/marquee/irfc.png";    // Moved for Alphabetical
import img_80 from "@/marquee/ITC.png";     // Moved for Alphabetical
import img_56 from "@/marquee/Kotak.png";
import img_63 from "@/marquee/Max healthcare.png";
import img_66 from "@/marquee/Natco.png";
import img_82 from "@/marquee/paras.png";   // Moved for Alphabetical
import img_76 from "@/marquee/Solar.png";
import img_83 from "@/marquee/tataChem.png";
import img_78 from "@/marquee/Tata Commu.png";
import img_79 from "@/marquee/Tata Consumer.png";
import img_84 from "@/marquee/tatarealty.png";

// ---------------------------------------------------------
// 2. SORTED DATA ARRAY
// ---------------------------------------------------------
const marqueeImages = [
  img_4,  // Amara Raja
  img_10, // Aster
  img_11, // AU
  img_18, // Bikaji
  img_26, // Cipla
  img_27, // Coal India
  img_31, // EIL
  img_37, // Exim
  img_81, // Federal Bank (Sorted)
  img_43, // GSK
  img_44, // Gulf
  img_49, // Indiamart
  img_50, // IndianOil
  img_53, // IRCTC
  img_85, // IRFC (Sorted)
  img_80, // ITC (Sorted)
  img_56, // Kotak
  img_63, // Max
  img_66, // Natco
  img_82, // Paras (Sorted)
  img_76, // Solar
  img_83, // Tata Chem
  img_78, // Tata Comm
  img_79, // Tata Consumer
  img_84, // Tata Realty
];

// ---------------------------------------------------------
// 3. COMPONENT
// ---------------------------------------------------------
type Props = {
  // Optional: You can still pass images via props if you want to override the default list
  externalImages?: (string | StaticImageData)[];
  gap?: number;
  duration?: number;
};

export default function SlowMarquee({
  externalImages,
  gap = 40,
  duration = 40,
}: Props) {
  // Use external images if provided, otherwise use the internal sorted list
  const data = externalImages || marqueeImages;
  
  // Duplicate array for infinite seamless loop
  const items = [...data, ...data];

  return (
    <section className="w-full bg-black border-t border-gray-800 py-10 overflow-hidden">
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
          // 1. Get Source String
          const srcString = typeof img === "string" ? img : img.src;

          // 2. Identify Special Logos 
          // (Adjust these substrings based on your actual file names if needed)
          const isAmaraRaja = srcString.includes("amara-raja"); // img_4
          const isTataConsumer = srcString.includes("Tata%20Consumer"); // img_79 (NextJS often encodes spaces as %20)
          
          // Combined check
          const isSpecialLogo = isAmaraRaja || isTataConsumer;

          return (
            <div
              key={i}
              className="flex-shrink-0 flex items-center"
              style={{ marginRight: `${gap}px` }}
            >
              {/* Container:
                 - Standard Height: h-12 (48px) or h-14 (56px)
                 - Special Height: h-20 (80px) to allow them to be bigger
                 - Width is set to 'auto' so the image defines the width naturally
              */}
              <div
                className={`relative flex items-center justify-center transition-all ${
                  isSpecialLogo ? "h-20" : "h-14"
                }`}
                style={{
                  width: "auto",
                  // Optional: Max width constraint to prevent extremely wide logos
                  maxWidth: isSpecialLogo ? "300px" : "180px", 
                }}
              >
                <Image
                  src={img}
                  alt={`Client Logo ${i}`}
                  width={0}
                  height={0}
                  sizes="300px"
                  className="w-auto h-full object-contain brightness-90 hover:brightness-100 transition-all"
                />
              </div>

              {/* Separator Dot */}
              <span className="text-gray-700 text-xl pl-8 select-none">
                •
              </span>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}