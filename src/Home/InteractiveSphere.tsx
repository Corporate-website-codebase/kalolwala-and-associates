"use client";

import React, { useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  url: string;
}

const InteractiveSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotation, setAutoRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const images: ImageData[] = [
    { src: "/images/kmb.png", url: "https://www.kotak811.com/" },
    { src: "/images/tata.png", url: "https://www.tatacommunications.com/" },
    { src: "/images/kmb.png", url: "https://www.kotak811.com/" },
    { src: "/images/tata.png", url: "https://www.tatacommunications.com/" },
    { src: "/images/kmb.png", url: "https://www.kotak811.com/" },
    { src: "/images/tata.png", url: "https://www.tatacommunications.com/" },
  ];

  const allImages = [...images, ...images, ...images]; // triple for better sphere density

  const [randomPositions, setRandomPositions] = useState<
    Array<{ x: number; y: number; z: number }>
  >([]);

  useEffect(() => {
    setRandomPositions(
      allImages.map(() => ({
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        z: Math.random() * 400 - 200,
      }))
    );
  }, []);

  const getSpherePosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 250; // increased radius for better ball formation
    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= winH) {
        setIsFixed(true);
        const progress = Math.min(Math.max(-rect.top / winH, 0), 1);
        setScrollProgress(progress);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation((r) => ({ x: r.x + dy * 0.4, y: r.y + dx * 0.4 }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (!isDragging) {
        setAutoRotation((prev) => prev + 0.25);
        setRotation((r) => ({ x: r.x, y: r.y + 0.25 }));
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [isDragging]);

  const openLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white"
      style={{ height: "200vh" }}
    >
      <div
        className={`${
          isFixed ? "fixed" : "absolute"
        } top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden`}
      >
        <div
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {randomPositions.length > 0 &&
              allImages.map((img, i) => {
                const sphere = getSpherePosition(i, allImages.length);
                const start = randomPositions[i];
                const progress = scrollProgress;

                const x = start.x + (sphere.x - start.x) * progress;
                const y = start.y + (sphere.y - start.y) * progress;
                const z = start.z + (sphere.z - start.z) * progress;
                const scale = 1 + z / 800;

                return (
                  <div
                    key={i}
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                      opacity: 0.5 + progress * 0.5,
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={`Logo ${i}`}
                      onClick={(e) => openLink(img.url, e)}
                      draggable={false}
                      className="w-[100px] h-[100px] object-contain rounded-md cursor-pointer hover:scale-110 transition-transform border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      style={{
                        minWidth: "80px",
                        minHeight: "80px",
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {scrollProgress > 0.8 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center">
            Drag to rotate • Click logos to visit
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSphere;
