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
    title: "Digital & Software Development",
    desc: "Where strategy meets technology — delivering robust frontend, backend, AI-driven solutions, and enterprise-grade security. If this sounds like you, our digital team wants to meet you.",
  },
];

export default function Departments() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Explicitly typing the array as HTMLElement[]
      const cards = gsap.utils.toArray<HTMLElement>(".career-card");

      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) => {
          // Now 'batch' is correctly typed as HTMLElement[]
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            stagger: 0.1,
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full py-16 space-y-8">
      {data.map((item, i) => (
        <div
          key={i}
          className="
            career-card
            w-full
            p-6 md:p-8 lg:p-10
            border border-white/20
            bg-[#111]
            hover:border-[#F4C016]/50
            transition-colors duration-300
            opacity-0 /* Initial opacity to prevent flash of content */
          "
        >
          <h2 className="text-[#F4C016] font-light mb-3 md:mb-4 text-[clamp(20px,4vw,32px)] font-noto-sans">
            {item.title}
          </h2>

          <p className="card-text text-white/90 leading-relaxed text-[clamp(15px,2.4vw,20px)] font-noto-sans">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
