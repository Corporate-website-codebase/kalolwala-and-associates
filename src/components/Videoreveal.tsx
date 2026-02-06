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
    const trigger = triggerRef.current;
    const wrapper = contentWrapperRef.current;
    const filter = filterOverlayRef.current;

    if (!trigger || !wrapper || !filter) return;

    // 1. SET INITIAL STATE
    gsap.set(wrapper, { scale: 0.8, borderRadius: "5rem" });
    gsap.set(filter, { opacity: 1 });

    // 2. ENTRY ANIMATION
    // Priority 10: Ensures this is calculated BEFORE the Portfolio (which is likely Priority 1)
    gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: () => "top bottom", // Function based to force recalculation
        end: () => "top top",
        scrub: true,
        refreshPriority: 10,       // <--- CRITICAL FIX
        invalidateOnRefresh: true, // <--- CRITICAL FIX
      },
    })
    .to(wrapper, { scale: 1, borderRadius: "0rem", ease: "none" })
    .to(filter, { opacity: 0, ease: "none" }, 0);


    // 3. PINNING
    const pinTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: () => "top top",
      end: () => "+=100%", 
      pin: true,
      pinSpacing: true, 
      refreshPriority: 10,         // <--- CRITICAL FIX
      invalidateOnRefresh: true,   // <--- CRITICAL FIX
      id: "video-pin"
    });


    // 4. EXIT ANIMATION
    gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        // Calculate start dynamically based on the Pin's actual end
        start: () => pinTrigger.end, 
        end: () => "+=" + window.innerHeight, 
        scrub: true,
        refreshPriority: 10,       // <--- CRITICAL FIX
        invalidateOnRefresh: true, // <--- CRITICAL FIX
      },
    })
    .to(wrapper, { scale: 0.8, borderRadius: "5rem", ease: "none" })
    .to(filter, { opacity: 1, ease: "none" }, 0);

  }, { scope: triggerRef });

  return (
    <div className="relative w-full">
      <div 
        ref={triggerRef} 
        className="relative w-full h-[100dvh] flex items-center justify-center bg-black z-10"
      >
        <div 
          ref={contentWrapperRef}
          className="relative w-full h-full overflow-hidden will-change-transform"
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