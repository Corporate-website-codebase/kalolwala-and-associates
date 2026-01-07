'use client';

import { motion, Variants } from "framer-motion";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Safely register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- VARIANTS ---
const textChildVariant: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%", opacity: 1, transition: { duration: 0.5, ease: "easeOut" }
  },
};

// ==============================================
// 1. ARCHITECTURAL LINES (Background Canvas)
// ==============================================
const CircuitBackground = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let trigger: ScrollTrigger;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const agentCount = 30; 
    const maxPathLength = 400; 
    const palette = ['#F4C016', '#AAAAAA'];

    const scrollState = { current: 0, target: 0, isInitialized: false };

    class Agent {
      x: number; y: number; vx!: number; vy!: number;
      path: { x: number, y: number }[]; color: string; lineWidth: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.path = [];
        this.setRandomDirection();
        this.lineWidth = Math.random() < 0.2 ? 1.5 : 0.5;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.path.push({ x: this.x, y: this.y });
      }

      preWarm() {
        for (let i = 0; i < 400; i++) {
          this.x += this.vx * 4;
          this.y += this.vy * 4;
          this.path.push({ x: this.x, y: this.y });
          if (Math.random() < 0.02) this.setRandomDirection();
          this.handleWrap(true);
        }
      }

      setRandomDirection() {
        const angles = [0, 45, 90, 135, 180, 225, 270, 315];
        const angle = angles[Math.floor(Math.random() * angles.length)];
        const rad = angle * (Math.PI / 180);
        this.vx = Math.cos(rad);
        this.vy = Math.sin(rad);
      }

      step(delta: number) {
        const speedMultiplier = 1000;
        this.x += this.vx * delta * speedMultiplier;
        this.y += this.vy * delta * speedMultiplier;
        this.path.push({ x: this.x, y: this.y });
        if (Math.random() < 0.01) this.setRandomDirection();
        if (this.path.length > maxPathLength) this.path.shift();
        this.handleWrap(false);
      }

      handleWrap(resetPath: boolean) {
        let wrapped = false;
        if (this.x < 0) { this.x = width; wrapped = true; }
        if (this.x > width) { this.x = 0; wrapped = true; }
        if (this.y < 0) { this.y = height; wrapped = true; }
        if (this.y > height) { this.y = 0; wrapped = true; }
        if (wrapped && resetPath) this.path = [{ x: this.x, y: this.y }];
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.path.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        for (let i = 1; i < this.path.length; i++) {
          ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    }

    let agents: Agent[] = [];
    const initAgents = () => {
      agents = Array.from({ length: agentCount }).map(() => {
        const a = new Agent();
        a.preWarm();
        return a;
      });
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initAgents();
    };

    // Initial setup
    handleResize();

    // Scroll Trigger Logic
    trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current || document.body,
      start: "top top",
      end: "+=5000",
      onUpdate: (self) => {
        if (!scrollState.isInitialized) {
          scrollState.current = self.progress;
          scrollState.target = self.progress;
          scrollState.isInitialized = true;
        } else {
          scrollState.target = self.progress;
        }
      }
    });

    const render = () => {
      const diff = scrollState.target - scrollState.current;
      if (Math.abs(diff) > 0.00001) {
        const ease = 0.1;
        const move = diff * ease;
        scrollState.current += move;
        ctx.clearRect(0, 0, width, height);
        agents.forEach(agent => { agent.step(move); agent.draw(ctx); });
      } else if (scrollState.isInitialized) {
        // Redraw static state if initialized but not scrolling heavily
        ctx.clearRect(0, 0, width, height);
        agents.forEach(agent => agent.draw(ctx));
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Optimized Resize Listener
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      trigger?.kill();
    };
  }, [scrollContainerRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-50" />;
};


// ==============================================
// 2. MAIN COMPONENT
// ==============================================

const items = [
  { id: 1, type: "text", label: "SELECTED WORKS", y: 0, w: "50vw", aspect: "aspect-[1/1]", speed: 1 },
  { id: 2, type: "image", label: "Marico Limited\nIntegrated Annual report 2024-25", src: "/portfolio/Marico_Cover_page-0001.webp", y: 150, w: "23vw", aspect: "aspect-[3/4]", speed: 0.9 },
  { id: 3, type: "image", label: "Tata Consumer Products limited\nIntegrated Annual Report 2024-25", src: "/portfolio/TATA Consumer_page-0001.webp", y: -150, w: "22vw", aspect: "aspect-[3/4]", speed: 1.1 },
  { id: 4, type: "image", label: "Kotak Mahindra Bank Limited\nIntegrated Annual Report\n2024-25", src: "/portfolio/Kotak_Cover_page-0001.webp", y: 140, w: "22vw", aspect: "aspect-[3/4]", speed: 0.8 },
  { id: 5, type: "image", label: "GSK Coffee Table Book", src: "/portfolio/GSK Coffee table book Cover_page-0001.webp", y: -50, w: "40vw", aspect: "aspect-[16/9]", speed: 1.3 },
  { id: 6, type: "image", label: "ABB India Limited\nIntegrated Annual Report 2024-25", src: "/portfolio/ABB India Limited_Cover_page-0001.webp", y: -160, w: "22vw", aspect: "aspect-[3/4]", speed: 0.9 },
  { id: 7, type: "image", label: "Embassy REIT\nESG Report 2024-25", src: "/portfolio/Embassy REIT Cover_page-0001.webp", y: 150, w: "22vw", aspect: "aspect-[3/4]", speed: 1.1 },
  { id: 8, type: "image", label: "Cipla Limited\nAnnual Report 2024-25", src: "/portfolio/CIPLA_Cover_page-0001.webp", y: -100, w: "25vw", aspect: "aspect-[3/4]", speed: 1 },
  { id: 9, type: "image", label: "Emami Limited\nAnnual Report 2024-25", src: "/portfolio/Emami_Cover_page-0001.webp", y: 120, w: "22vw", aspect: "aspect-[3/4]", speed: 1 },
  { id: 10, type: "image", label: "Tata Communications\nIntegrated Report 2024-25", src: "/portfolio/TATA Communication cover.webp", y: -100, w: "23vw", aspect: "aspect-[3/4]", speed: 1 },
  { id: 11, type: "image", label: "PDS Limited\nSustainability Report\n2024-25", src: "/portfolio/PDS Sustainability Cover_page-0001.webp", y: 120, w: "22vw", aspect: "aspect-[3/4]", speed: 1 },
];

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Slider State
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  // --- DETECT TABLET vs MOBILE ---
  // Using 1280px (xl) as the breakpoint for Desktop logic
  useEffect(() => {
    const handleResize = () => {
      // Logic: Tablet is >= 640px AND < 1280px
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1280);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- GSAP FOR DESKTOP ONLY ---
  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mm = gsap.matchMedia();

    // Changed breakpoint to min-width: 1280px (xl) to catch iPads in portrait
    mm.add("(min-width: 1280px)", () => {
      gsap.to(container, {
        backgroundColor: "#E8E6E1",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
      
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
      cards.forEach((card) => {
        const speed = parseFloat(card.dataset.speed || "1");
        gsap.to(card, {
          x: (1 - speed) * 300,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=5000",
            scrub: 1,
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });


  // --- MOBILE NAVIGATION ---
  const handlePrev = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setMobileIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
  };

  // --- RESPONSIVE MATH ---
  // Tablet (iPad Portrait): 60vw
  // Mobile: 85vw
  const slideWidth = isTablet ? 60 : 85; 
  const offset = (100 - slideWidth) / 2; 

  return (
    <div className="relative w-full">
      <section
        ref={containerRef}
        // Changed lg: to xl: for breakpoint consistency
        className="relative z-20 w-full overflow-hidden bg-[#E8E6E1] xl:bg-black xl:h-screen text-[#1a1a1a]"
      >
        <CircuitBackground scrollContainerRef={containerRef} />

        {/* =========================================================
            DESKTOP VIEW (Horizontal Scroll + Parallax)
            Hidden on Mobile/Tablet (< xl / 1280px)
           ========================================================= */}
        <div
          ref={trackRef}
          className="hidden xl:flex h-full w-fit pt-[25vh] px-[5vw] will-change-transform relative z-10"
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-speed={item.speed}
              className="portfolio-card relative flex-shrink-0 px-[3vw] group"
              style={{ width: item.w, transform: `translateY(${item.y}px)` }}
            >
              {item.type === "text" ? (
                <div className="h-full w-full flex flex-col justify-start pt-20">
                  <div className="tracking-tight font-noto-sans font-light text-[#1a1a1a] text-[6.2vh] opacity-90">
                    <div className="overflow-hidden block leading-tight">
                      <motion.span variants={textChildVariant} className="block pb-1 text-black">
                        Turning Every Challenge
                      </motion.span>
                    </div>
                    <div className="overflow-hidden block leading-tight">
                      <motion.span variants={textChildVariant} className="block pb-1 text-black">
                        into Stepping Stones
                      </motion.span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full transition-transform duration-500 ease-out group-hover:-translate-y-4 will-change-transform">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-[1px] w-6 bg-neutral-400"></span>
                    <p className="text-[10px] whitespace-pre-line font-bold uppercase tracking-[0.2em] text-neutral-500 notranslate">
                      {item.label}
                    </p>
                  </div>
                  <div className={`relative w-full overflow-hidden bg-transparent ${item.aspect} rounded-sm`}>
                    <div className="h-full w-full overflow-hidden relative">
                      <img
                        src={item.src}
                        alt={item.label}
                        className="parallax-img w-full h-full object-cover grayscal group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


        {/* =========================================================
            MOBILE/TABLET VIEW (Slider / Carousel)
            Visible on Mobile/Tablet/iPad (< xl / 1280px)
           ========================================================= */}
        <div className="xl:hidden w-full h-[85vh] flex flex-col justify-center relative z-10 py-10">
          
          <motion.div 
            className="flex items-center h-[60vh] md:h-[65vh]"
            // Smooth Spring Animation with Dynamic Offset
            animate={{ x: `calc(-${mobileIndex * slideWidth}vw + ${offset}vw)` }}
            transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
          >
            {items.map((item, index) => (
              <div 
                key={item.id}
                style={{ width: `${slideWidth}vw`, minWidth: `${slideWidth}vw` }}
                className="px-3 md:px-6 flex flex-col justify-center h-full relative"
              >
                {item.type === "text" ? (
                  <div className="h-full w-full flex flex-col justify-center items-center text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-noto-sans leading-tight text-[#1a1a1a] font-thin">
                      Turning Every Challenge<br/>into Stepping Stones
                    </h2>
                  </div>
                ) : (
                  <div className="w-full h-full relative flex flex-col group">
                    {/* IMAGE CONTAINER */}
                    <div className="relative w-full flex-1 overflow-hidden flex items-center justify-center p-4 md:p-8">
                      <div className="relative w-full h-full shadow-">
                         <img
                          src={item.src}
                          alt={item.label}
                          // Object Contain ensures covers fit perfectly without cropping
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* LABEL */}
                    <div className="mt-6 flex flex-col items-center text-center w-full min-h-[60px]">
                       <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-800 line-clamp-2">
                         {item.label}
                       </p>
                       <span className="mt-2 h-[2px] w-8 bg-[#F4C016]"></span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* NAVIGATION ARROWS */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between px-4 -translate-y-1/2 pointer-events-none z-20">
            <button 
              onClick={handlePrev}
              disabled={mobileIndex === 0}
              className={`w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button 
              onClick={handleNext}
              disabled={mobileIndex === items.length - 1}
              className={`w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Portfolio;