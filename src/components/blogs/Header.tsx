"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    if (!section || !text || !image) return;

    const init = () => {
      ScrollTrigger.refresh();

      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        text,
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.9 },
        0
      );

      tl.fromTo(
        image,
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.9 },
        0.15
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.reverse(),
        onLeaveBack: () => tl.reverse(),
      });
    };

    requestAnimationFrame(() =>
      requestAnimationFrame(init)
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black font-noto-sans flex flex-col"
    >
      {/* TEXT */}
      <div
        ref={textRef}
        className="opacity-0 marginal"
      >

        <h1 className=" text-white pt-32 sm:pt-40 font-thin text-[clamp(32px,4.4vw,60px)] mb-8 leading-tight">
          Bridging the <br />
          distance between <br /> 
          ideas and influence
        </h1>
      </div>

      {/* IMAGE */}
      <div ref={imageRef} className="opacity-0 mt-10 sm:mt-14 md:mt-16 w-full">
        <img
          src="/images/media/blog-banner-h.webp"
          alt="Hero"
          className="
            w-full 
            h-[40vh] sm:h-[50vh] grayscale md:h-[60vh] lg:h-[65vh] 
            object-cover
          "
        />
      </div>
    </section>
  );
}
