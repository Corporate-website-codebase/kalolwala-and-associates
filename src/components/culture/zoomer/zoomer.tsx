"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// 1. Mock Data: Replace srcs with your actual event images
// 'depth' helps us create a parallax effect (some move faster than others)
const eventImages = [
  { src: "/images/culture/1.webp", top: "10%", left: "10%", width: "20vw", height: "25vh", depth: 1 },
  { src: "/images/culture/2.webp", top: "15%", left: "60%", width: "25vw", height: "30vh", depth: 2 },
  { src: "/images/culture/3.webp", top: "40%", left: "30%", width: "30vw", height: "40vh", depth: 4 }, // Central focus
  { src: "/images/culture/5.webp", top: "55%", left: "75%", width: "22vw", height: "35vh", depth: 3 },
  { src: "/images/culture/6.webp", top: "80%", left: "40%", width: "15vw", height: "20vh", depth: 1 },
];

const zoomer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start when top of container hits top of viewport
        end: "+=300%", // The scroll length (3x the viewport height)
        scrub: 1, // Smooth scrubbing effect
        pin: true, // Pin the container
        // markers: true, // Uncomment for debugging
      },
    });

    // Animate the images
    imagesRef.current.forEach((img, index) => {
        if(!img) return;
        
        // We create a parallax feel by scaling differently based on "depth"
        // and moving them away from the center slightly
        const depth = eventImages[index].depth;
        
        tl.to(img, {
            scale: 1 + (depth * 4), // Some grow huge, some grow small
            opacity: depth > 3 ? 0 : 1, // Fade out the ones that get "too close" to camera
            filter: "blur(5px)", // Optional: Blur as they pass
            ease: "power2.inOut",
        }, 0); // The '0' ensures all animations start at the same time
    });
    
    // Optional: Fade in the overlay text as we zoom
    tl.fromTo(".overlay-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* 2. The Scattered Images */}
      <div className="absolute inset-0 w-full h-full perspective-1000">
        {eventImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => { imagesRef.current[i] = el; }}
            className="absolute overflow-hidden rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
            style={{
              top: img.top,
              left: img.left,
              width: img.width,
              height: img.height,
              zIndex: Math.floor(img.depth * 10), // Higher depth = on top
            }}
          >
            <Image
              src={img.src}
              alt="Event highlight"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
             {/* Optional: Dark tint overlay on images like in screenshot */}
             <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      {/* 3. The Bottom Overlay (Like the 'Tell us about your needs' pill) */}
      <div className="overlay-content absolute bottom-10 left-1/2 -translate-x-1/2 z-50 opacity-0 pointer-events-auto">
        <div className="flex items-center gap-4 p-2 bg-[#1a1a1a] rounded-full border border-gray-800 shadow-xl">
           <button className="px-6 py-2 bg-transparent text-gray-300 text-sm font-medium hover:text-white transition-colors">
             Tell us about your needs
           </button>
           <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all">
             {/* Hamburger Icon */}
             <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z" />
             </svg>
           </div>
        </div>
      </div>
      
      {/* Decorative Blur Gradients (optional for atmosphere) */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-40 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none"/>

    </section>
  );
};

export default zoomer;