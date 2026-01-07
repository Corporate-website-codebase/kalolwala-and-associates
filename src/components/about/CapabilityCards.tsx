"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    video: "/videos/design-animation.mp4",
    title: "High-Performance Design",
    text: `We go beyond aesthetics to deliver ideas that stand out, connect and outshine.`,
  },
  {
    video: "/videos/people-animation.mp4",
    title: "Powered by Our People",
    text: `Our strength lies in our people — curious minds, sharp thinkers and creators who turn challenges into possibilities.`,
  },
  {
    video: "/videos/engineering-animation.mp4",
    title: "Engineering Digital Strength that Endures",
    text: `Every tech decision we take is tied to your objectives, ensuring your digital ecosystem remains robust, scalable and future-proof.`,
  },
];

export default function CapabilityCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="w-full bg-black text-white">
      <div ref={containerRef} className="relative w-full h-[250vh]">
        {cards.map((card, index) => {
          const rangeStart = index * (1 / cards.length);
          const rangeEnd = rangeStart + 1 / cards.length;

          return (
            <Card
              key={index}
              {...card}
              index={index}
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]}
              totalCards={cards.length}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card({
  video,
  title,
  text,
  index,
  progress,
  range,
  totalCards, // <--- Add this here
}: {
  video: string;
  title: string;
  text: string;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  totalCards: number; // <--- Add this type definition here
}) {
  const HEADER_HEIGHT = 180; 
  const STICKY_TOP = index * HEADER_HEIGHT; 
  const SHRINK_TIMING = 0.8; 

  const videoScale = useTransform(
    progress,
    [range[0], range[0] + (range[1] - range[0]) * SHRINK_TIMING], 
    [1, 0.45]
  );
  
  const textOpacity = useTransform(
    progress,
    [range[0], range[0] + (range[1] - range[0]) * 0.5], 
    [1, 0]
  );

  return (
    <motion.div
      className="w-full border-t border-[#333] flex flex-col md:flex-row items-start gap-10 overflow-hidden"
      style={{
        position: "sticky",
        top: `${STICKY_TOP}px`, 
        height: `calc(100vh - ${STICKY_TOP}px)`, 
        maxHeight: "800px", 
        backgroundColor: "#000",
        zIndex: index,
      }}
    >
      {/* LEFT — VIDEO */}
      <div 
        className="w-full md:w-[35%] flex justify-center items-start h-full"
        style={{ paddingTop: "45px" }} 
      >
        <motion.div
          style={{ 
            scale: videoScale,
            transformOrigin: "center top", 
          }}
          className="w-full flex justify-center"
        >
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-[260px] md:w-[300px] object-contain"
          />
        </motion.div>
      </div>

      {/* RIGHT — TEXT */}
      <div 
        className="w-full md:w-[60%] text-white pr-10"
        style={{ paddingTop: "70px" }}
      >
        <h2
          className="mb-4 leading-snug font-noto-sans font-light"
          style={{fontSize: "35px"}}
        >
          {title}
        </h2>

        <motion.p
          style={{ 
            fontSize: "21px", 
            opacity: textOpacity 
          }}
          className="whitespace-pre-line leading-relaxed font-noto-sans font-light"
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
}