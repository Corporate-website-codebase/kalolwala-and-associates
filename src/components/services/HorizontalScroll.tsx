
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        x: () => -(section.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => `+=${section.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, trigger);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden">
      <div ref={sectionRef} className="flex h-screen items-center gap-6 px-8">

        {cards.map((card, index) => (
          <Link
            key={index}
            href={{
              pathname: "/report-showcase",
              query: { key: card.key },   // 👈 ONLY KEY IS SENT
            }}
            scroll={true}
            className="top-0 relative h-[80vh] w-[100vh] flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute inset-0">
              <Image
                src={card.image}
                alt={card.title}
                width={100}
                height={80}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Black overlay */}
              <div className="absolute inset-0 bg-black/42" />

              {/* Title */}
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h3 className="whitespace-pre-line text-3xl font-semibold text-white leading-tight">
                  {card.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
