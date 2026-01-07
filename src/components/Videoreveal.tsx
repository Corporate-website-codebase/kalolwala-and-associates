"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoReveal = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const filterOverlayRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!triggerRef.current || !contentWrapperRef.current || !filterOverlayRef.current) return;

    const trigger = triggerRef.current;
    const wrapper = contentWrapperRef.current;
    const filter = filterOverlayRef.current;

    // --- 1. ENTRY ANIMATION ---
    // Scales UP as it enters the viewport
    const entryTl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom", 
        end: "top top",      
        scrub: true,
      },
    });

    entryTl
      .fromTo(wrapper, 
        { scale: 0.8, borderRadius: "5rem" }, 
        { scale: 1, borderRadius: "0px", ease: "none" }, 
        0
      )
      .fromTo(filter, 
        { opacity: 1 }, 
        { opacity: 0, ease: "none" }, 
        0
      );


    // --- 2. PINNING ---
    // We capture this in a variable so we can read its 'end' property later
    const pinTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "+=100%", // Pin for 1 screen height
      pin: true,
      pinSpacing: true,
      id: "video-pin"
    });


    // --- 3. EXIT ANIMATION ---
    // shrinking starts EXACTLY when the pin ends
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        // LOGIC FIX: Instead of checking DOM positions (which are frozen during pin),
        // we ask: "What scroll pixel does the pin finish at?" and start there.
        start: () => pinTrigger ? pinTrigger.end : "top top", 
        end: () => "+=" + window.innerHeight, // Shrink over the course of 1 more screen height
        scrub: true,
        immediateRender: false
      },
    });

    exitTl
      .fromTo(wrapper, 
        { scale: 1, borderRadius: "0px" }, 
        { scale: 0.8, borderRadius: "5rem", ease: "none" }, 
        0
      )
      .fromTo(filter, 
        { opacity: 0 }, 
        { opacity: 1, ease: "none" }, 
        0
      );

  }, { scope: triggerRef });

  return (
    <div className="relative w-full">
      <div 
        ref={triggerRef} 
        className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black z-10"
      >
        <div 
          ref={contentWrapperRef}
          className="relative w-full h-full overflow-hidden scale-80 will-change-transform rounded-[2rem] md:rounded-[5rem]"
        >
          <video
            src="/videos/Office%20shoot%20B&W%2010%20MB.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div
            ref={filterOverlayRef}
            className="absolute inset-0 bg-white pointer-events-none z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoReveal;