"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { ArrowUpRight } from "lucide-react"; // Changed to Lucide
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AestheticDot from "@/components/AestheticDot";
import Link from "next/link";
import { PassLink } from "@/components/StackedCurtainTransition";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const services = [
  { title: "Integrated Annual Report", key: "integrated" },
  { title: "Sustainability and ESG", key: "sustainability" },
  { title: "Presentations", key: "presentations" },
  { title: "Branding", key: "branding" },
  { title: "Corporate Films", key: "video" },
  { title: "Digital", key: "web" },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // 🟡 Rolling Circle Animation (Standard)
  useEffect(() => {
    const rollTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" }, paused: true });
    let ticking = false;
    const update = () => { if (rollTl.isActive()) rollTl.time(rollTl.time() + 1 / 60); };
    const startRolling = () => { if (!ticking) { ticking = true; gsap.ticker.add(update); rollTl.play(); } };
    const stopRolling = () => { if (ticking) { ticking = false; gsap.ticker.remove(update); rollTl.pause(); } };

    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom", end: "bottom top",
      onEnter: startRolling, onEnterBack: startRolling, onLeave: stopRolling, onLeaveBack: stopRolling,
    });
    return () => { stopRolling(); rollTl.kill(); trigger.kill(); };
  }, []);

  // 🧩 ANIMATION LOGIC
  useIsomorphicLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const section = sectionRef.current;

    if (!cards.length || !section) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      // === CONDITION 1: PINNING ANIMATION (Desktop Landscape) ===
      mm.add("(min-width: 1024px) and (orientation: landscape)", () => {
        gsap.set(cards, {
          y: window.innerHeight * 1.1,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: "+=200%",     //reduced to 200 from 250
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const CARD_HEIGHT = 100;

        cards.forEach((card, i) => {
          tl.to(card, {
              y: i * CARD_HEIGHT,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            },
            i === 0 ? 0 : "<+=0.2"
          );
        });
      });

      // === CONDITION 2: MOBILE / PORTRAIT ===
      mm.add("(max-width: 1023px), (orientation: portrait)", () => {
        gsap.set(cards, { clearProps: "all" });
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          }
        });
      });

    }, sectionRef);

    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <div className="relative w-full">
      <section
        ref={sectionRef}
        className="w-full bg-black text-white font-sans h-auto lg:landscape:h-screen lg:landscape:overflow-hidden relative flex flex-col"
      >

        {/* === HEADER === */}
        <div className="
          sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-white/10
          h-20 flex items-center px-6 md:px-12
          lg:landscape:absolute lg:landscape:h-[20vh] lg:landscape:items-end lg:landscape:pb-4 lg:landscape:bg-black lg:landscape:border-none lg:landscape:px-0
        ">
            <div className="w-full mx-auto">
              <div className="flex items-center gap-3 text-sm md:text-xl uppercase tracking-widest text-gray-500">
                <AestheticDot/>
                <span className="font-medium font-dosis">On the K&A Menu</span>
              </div>
            </div>
        </div>

        {/* === CONTENT CONTAINER === */}
        <div className="
          relative w-full flex-1 z-0 px-6 md:px-12 py-8
          lg:landscape:absolute lg:landscape:top-[20vh] lg:landscape:left-0 lg:landscape:h-[80vh] lg:landscape:p-0
        ">
            <div className="w-full h-full relative flex flex-col lg:landscape:block">
                {services.map((item, index) => (
                    <div
                      key={item.title}
                      ref={(el) => { if (el) cardsRef.current[index] = el; }}
                      className="
                        group w-full bg-black will-change-transform
                        relative border-b border-white/10 last:border-0
                        lg:landscape:absolute lg:landscape:top-0 lg:landscape:border-t lg:landscape:border-b-0 lg:landscape:border-white/20 lg:landscape:flex lg:landscape:justify-center
                      "
                      style={{ zIndex: index + 1 }}
                    >

                      {/* INNER ITEM LAYOUT */}
                      <PassLink
                        href={{
                          pathname: "/report-showcase",
                          query: { key: item.key },

                        }}
                        scroll={true}
                        className="w-full block"
                      >
                      <div className="
                        w-full flex items-center justify-between cursor-pointer
                        min-h-[100px] py-4
                        lg:landscape:min-h-0 lg:landscape:h-[100px] lg:landscape:py-0 lg:landscape:px-0
                        transition-opacity active:opacity-60 lg:landscape:active:opacity-100
                      ">

                          {/* Title */}
                          <h3
                            className="font-bold font-dosis text-gray-300 transition-colors duration-300 group-hover:text-yellow-400 w-[85%]"
                            style={{ fontSize: "clamp(1.5rem, 4vw, 2.7rem)", lineHeight: 1.1 }}
                          >
                            {item.title}
                          </h3>

                          {/* === ANIMATED ARROW WRAPPER === */}
                          <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0 ml-4">

                            {/* The Dot: Default small white dot, expands to full white circle on hover */}
                            <div className="absolute w-2 h-2 md:w-3 md:h-3 bg-white rounded-full transition-all duration-500 ease-out group-hover:w-full group-hover:h-full" />

                            {/* The Arrow: Default invisible/offset, slides in and becomes visible on hover */}
                            <ArrowUpRight
                              className="relative z-10 w-5 h-5 md:w-6 md:h-6 text-black
                                         opacity-0 translate-y-3 -translate-x-3
                                         transition-all duration-500 ease-out
                                         group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                            />
                          </div>

                      </div>
                      </PassLink>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

