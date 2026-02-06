"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AestheticDot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const ctx = gsap.context(() => {
      // --------------------------------------------------------
      // SHAPE DATA (All shapes use 6 points for seamless morphing)
      // ViewBox is 0 0 10 10
      // --------------------------------------------------------
      
      // 1. Full Square (Used for Circle/Square phases)
      // We fill the entire 10x10 space.
      const shapeSquare = "M 5 0 L 10 0 L 10 10 L 5 10 L 0 10 L 0 0 Z";

      // 2. Vertical Line (2px width)
      const shapeLine = "M 5 0 L 6 0 L 6 10 L 5 10 L 4 10 L 4 0 Z";

      // 3. Hollow Hexagon (Inset by 0.5px to accommodate 1px stroke)
      // Points: Top, Top-Right, Btm-Right, Btm, Btm-Left, Top-Left
      const shapeHex = "M 5 0.5 L 9.3 2.8 L 9.3 7.2 L 5 9.5 L 0.7 7.2 L 0.7 2.8 Z";

      // --------------------------------------------------------
      // ANIMATION TIMELINE
      // --------------------------------------------------------
      const tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 0.5,
        defaults: { ease: "power3.inOut" } 
      });

      // Set initial state: Solid Square Path, Container is Rounded (Circle)
      gsap.set(path, { attr: { d: shapeSquare }, fill: "#FACC15", stroke: "none" });
      gsap.set(container, { borderRadius: "50%", rotation: 0 });

      tl
        // PHASE 1: Circle -> Square
        // We just remove the border-radius of the container. 
        // The SVG inside is already a square.
        .to(container, {
          borderRadius: "0%",
          rotation: 90,
          duration: 1.4,
        })

        // PHASE 2: Square -> Vertical Line
        // We morph the SVG path. Container stays square but invisible bg.
        .to(path, {
          attr: { d: shapeLine },
          duration: 1.2,
        })

        // PHASE 3: Line -> Hollow Hexagon
        // This is the complex part. We expand the shape AND swap fill/stroke.
        .to(path, {
          attr: { d: shapeHex }, // Morph points to hexagon
          fill: "transparent",   // Remove solid fill
          stroke: "#FACC15",     // Add yellow border
          strokeWidth: 1,        // Set border thickness
          rotation: 180,         // Spin while morphing
          transformOrigin: "center",
          duration: 1.5,
        })
        
        // Pause to admire the Hexagon
        .to({}, { duration: 0.5 })

        // PHASE 4: Hexagon -> Solid Circle (Reset)
        // We morph path back to Square, swap Fill back to Yellow, 
        // and round the Container corners simultaneously.
        .to(path, {
          attr: { d: shapeSquare }, // Back to full block
          fill: "#FACC15",
          stroke: "transparent",
          strokeWidth: 0,
          rotation: 360, // Finish rotation
          duration: 1.4,
        }, "reset")
        .to(container, {
          borderRadius: "50%", // Container becomes circle
          rotation: 360,
          duration: 1.4,
        }, "reset"); // "reset" label runs these two together

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // CONTAINER: 10x10px
    // Acts as the mask for the Circle phase
    <div 
      ref={containerRef}
      className="w-[10px] h-[10px] overflow-hidden flex items-center justify-center relative"
      style={{ willChange: "transform, borderRadius" }}
    >
      {/* SVG: Handles the complex shapes (Hexagon, Line) */}
      <svg 
        viewBox="0 0 10 10" 
        className="w-full h-full block overflow-visible"
        style={{ willChange: "transform" }}
      >
        <path 
          ref={pathRef}
          d="" // Set by GSAP initially
        />
      </svg>
    </div>
  );
}