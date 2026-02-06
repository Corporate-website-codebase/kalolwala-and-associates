"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// OPTIONAL: If you are using Lenis for smooth scroll, uncomment this import:
import { useLenis } from "lenis/react";
import { PassLink } from "../StackedCurtainTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  title: string;
  image: string;
  key: string;
}

const cards: CardData[] = [
  {
    title: "Integrated\nannual report",
    image: "/images/services/Maskgroup07.png",
    key: "integrated",
  },
  {
    title: "Sustainability and\nESG reports",
    image: "/images/services/abc.png",
    key: "sustainability",
  },
  {
    title: "Presentations",
    image: "/images/services/Maskgroup04.png",
    key: "presentations",
  },
  {
    title: "Branding and\nActivation",
    image: "/images/services/branding.png",
    key: "branding",
  },
  {
    title: "Videos",
    image: "/images/services/Maskgroup02.png",
    key: "video",
  },
  {
    title: "Digital",
    image: "/images/services/Maskgroup05.png",
    key: "web",
  },
];

export function HorizontalScroll() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // OPTIONAL: Get Lenis instance if you are using the hook
  const lenis = useLenis();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          if (!section || !wrapper) return;

          gsap.to(section, {
            x: () => -(section.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () => `+=${section.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (sectionRef.current) {
      const scrollAmount = window.innerWidth * 0.85;
      sectionRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- FORCE SCROLL TO TOP FUNCTION ---
  const handleLinkClick = () => {
    // 1. Native Scroll (Immediate)
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // 2. Lenis Scroll (If you use Lenis, this is the most important part)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // 3. Fallback Timeout (Catches Next.js Scroll Restoration lag)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  return (
    <div ref={wrapperRef} className="bg--100 relative w-full">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute top-4 right-4 z-20 flex gap-2 lg:hidden">
        <button
          onClick={() => handleScroll('left')}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div
        ref={sectionRef}
        className={`
          flex md:items-center pt-16 md:pt-0
          h-screen
          gap-6 px-8
          overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar
          lg:overflow-visible lg:w-max
        `}
      >
        {cards.map((card, index) => (
          <PassLink
            key={index}
            href={`/offerings/${
              {
                video: "corporate-films-video-reports",
                integrated: "integrated-annual-reporting",
                sustainability: "sustainability-esg-reporting",
                web: "corporate-websites",
                presentations: "investor-corporate-presentations",
                branding: "corporate-branding-design",
              }[card.key] || card.key
            }`}
            scroll={true} // Tries to scroll native
            onClick={handleLinkClick} // Force overrides any lingering scroll state
            className={`bg--100 aspect-square
              relative flex-shrink-0 overflow-hidden  cursor-pointer snap-center w-full md:w-auto
              h-[50vh] md:h-[70vh] lg:h-[80vh]
              top-0
            `}
          >
            {/* w-[95vw] h-[60vh]
              md:w-[60vw] md:h-[70vh]
              lg:w-[100vh] lg:h-[80vh] */}
            <div className="absolute inset-0">
              <Image
                src={card.image}
                alt={card.title}
                width={800}
                height={600}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="whitespace-pre-line text-3xl font-semibold text-white leading-tight drop-shadow-xl">
                  {card.title}
                </h3>
              </div>
            </div>
          </PassLink>
        ))}
      </div>
    </div>
  );
}