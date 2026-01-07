"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Story = {
  id: number;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  footer: string;
  link: string;
};

type Props = {
  stories: Story[];
};

export default function SuccessStoriesSlider({ stories }: Props) {
  // CONFIG: Number of visible items
  const VISIBLE_ITEMS = 2;

  const [index, setIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const [dragLimits, setDragLimits] = useState({ left: 0, right: 0 });

  // 1. REFS
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 2. VIEWPORT ANIMATION TRIGGER
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px", once: true });

  // 3. MEASUREMENT LOGIC
  const measure = useCallback(() => {
    if (!trackRef.current || !cardRef.current || !containerRef.current) return;

    const cardWidth = cardRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap || "0") || 0;

    const singleStep = cardWidth + gap;
    const totalContentWidth = stories.length * singleStep - gap; // Total width of all items

    // Max Drag calculation: Prevent pulling the slider past the last item into empty space
    const maxTranslateX = Math.min(0, containerWidth - totalContentWidth);

    setStepPx(singleStep);
    setDragLimits({ left: maxTranslateX, right: 0 });
  }, [stories.length]);

  // 4. EVENTS SETUP
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // 5. NAVIGATION STATE
  const maxIndex = Math.max(0, stories.length - VISIBLE_ITEMS);
  const canNext = index < maxIndex;
  const canPrev = index > 0;

  const next = () => canNext && setIndex((i) => i + 1);
  const prev = () => canPrev && setIndex((i) => i - 1);

  // Calculate current X position based on index
  const translateX = -(index * stepPx);

  return (
    <motion.section
      ref={sectionRef}
      // === IMPROVED ARRIVAL ANIMATION ===
      // Slides up from bottom + Fade In
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 100,
      }}
      transition={{
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9], // Custom cubic-bezier for smooth landing
      }}
      className="bg-white w-full py-16 mx-auto overflow-hidden"
    >
      <div className="marginal">

        {/* HEADER */}
        <div className="flex justify-between items-end w-full mb-10 text-black">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black">
            Success stories
          </h2>

          {/* Nav Buttons */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous slide"
              className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-30 disabled:hover:border-gray-200 transition-all duration-300 text-gray-800"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next slide"
              className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-30 disabled:hover:border-gray-200 transition-all duration-300 text-gray-800"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* SLIDER CONTAINER */}
        <div
          ref={containerRef}
          className="overflow-hidden w-full relative"
        >
          <motion.div
            ref={trackRef}
            animate={{ x: translateX }}
            transition={{ type: "spring", stiffness: 300, damping: 40, mass: 1 }}
            className="flex gap-[clamp(24px,4vw,48px)] cursor-grab active:cursor-grabbing"
            drag="x"
            dragElastic={0.1}
            dragConstraints={{
              left: dragLimits.left,
              right: dragLimits.right,
            }}
            onDragEnd={(e, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold && canNext) next();
              else if (info.offset.x > threshold && canPrev) prev();
            }}
          >
            {stories.map((story, idx) => (
              <div
                ref={idx === 0 ? cardRef : null}
                key={story.id}
                className="flex-shrink-0 block select-none"
                style={{
                  // Dynamic width: (100% - Gap) / 2 items
                  width: "calc((100% - clamp(24px,4vw,48px)) / 2)",
                }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full flex flex-col relative group"
                >
                  {/* === 1. IMAGE AREA === */}
                  <div className="w-full aspect-4/3 relative rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="mt-6 px-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between pb-4 border-b border-gray-200">
                        {/* Title */}
                        <h3 className="font-medium text-2xl md:text-3xl text-black leading-tight max-w-[80%] xl:max-w-[60%]">
                          {story.title}
                        </h3>

                        {/* Separator & Subtitle - Hidden on mobile, shown on XL */}
                        <div className="hidden xl:flex items-center mt-2 xl:mt-0">
                          <div className="h-8 w-[1px] bg-gray-300 mx-6"></div>
                          <p className="text-xl text-gray-500 whitespace-nowrap font-light">
                            {story.subtitle}
                          </p>
                        </div>

                        {/* Mobile Subtitle Fallback */}
                        <p className="xl:hidden text-lg text-gray-500 mt-2 font-light">{story.subtitle}</p>
                      </div>
                    </div>

                    {/* Footer Tag */}
                    <p className="pt-3 text-xs tracking-widest text-gray-400 uppercase font-semibold">
                      {story.footer}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}