"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    title: "Business Development",
    desc: "If you have the talent for spotting opportunities and can turn conversations into partnerships, let us talk.",
  },
  {
    title: "Project Management",
    desc: "If you excel at planning, coordinating and driving projects to seamless execution, we would like to meet you.",
  },
  {
    title: "Research Analyst",
    desc: "If solving complex problems excites you and data makes you curious, you will feel right at home here.",
  },
  {
    title: "Editorial",
    desc: "If you can ignite ideas, craft language that captivates and create impact with every word, let us talk.",
  },
  {
    title: "Design",
    desc: "If design is your language, let us start a conversation.",
  },
  {
    title: "Digital",
    desc: "Plan smart. Coordinate fast. Execute flawlessly. If this sounds like you, our digital team wants to meet you.",
  },
];

export default function Departments() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".career-card");

      gsap.set(cards, {
        autoAlpha: 0,
        x: -120,
      });

      cards.forEach((card) => {
        const text = card.querySelector<HTMLElement>(".card-text");
        if (text) {
          gsap.set(text, { autoAlpha: 0, y: 18 });
        }
      });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        end: "bottom 10%",
        batchMax: 3,

        onEnter: (batch) => {
          gsap.set(batch, { x: -120 });
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: { each: 0.18 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) {
              gsap.to(text, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: 0.12,
                ease: "power2.out",
              });
            }
          });
        },

        onEnterBack: (batch) => {
          gsap.set(batch, { x: -120 });
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: { each: 0.18 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) {
              gsap.to(text, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: 0.12,
                ease: "power2.out",
              });
            }
          });
        },

        onLeave: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            x: 120,
            duration: 0.65,
            ease: "power2.in",
            stagger: { each: 0.12 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) gsap.set(text, { autoAlpha: 0, y: 18 });
          });
        },

        onLeaveBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            x: 120,
            duration: 0.65,
            ease: "power2.in",
            stagger: { each: 0.12 },
          });

          batch.forEach((card) => {
            const text = card.querySelector<HTMLElement>(".card-text");
            if (text) gsap.set(text, { autoAlpha: 0, y: 18 });
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        w-full 
        py-16 
        space-y-8 
      "
    >
      {data.map((item, i) => (
        <div
          key={i}
          className="
            career-card
            w-full
            p-6 md:p-8 lg:p-10
            
            /* Added Border and Plain BG classes below */
            border border-white/20
            bg-[#111] 
            hover:border-[#F4C016]/50 
            transition-colors duration-300
          "
        >
          <h2
            className="
              text-[#F4C016]
              font-light
              mb-3 md:mb-4
              text-[clamp(20px,4vw,32px)]
              font-noto-sans
            "
          >
            {item.title}
          </h2>

          <p
            className="
              card-text
              text-white/90
              leading-relaxed
              text-[clamp(15px,2.4vw,20px)]
              font-noto-sans
            "
            style={{
            }}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}