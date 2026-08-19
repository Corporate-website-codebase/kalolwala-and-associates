"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { X, ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

/* ---------- DATA ---------- */
const foundersData = [
  {
    id: "ceo",
    name: "Hussain Kalolwala",
    role: "Managing Director",
    img: "/images/H.webp",
    message:
      "The global communication landscape is changing at the blink of an eye, driven by high-tech innovation. Amid the whirlwind of change around us, our philosophy is to stay true to our core values, navigate the change with strategic foresight and craft authentic communication for our clients that stands the test of time.",
  },
  {
    id: "cso",
    name: "Jumana Vadnagarwala",
    role: "Chief Strategy Officer, Director",
    img: "/images/J.webp",
    message:
      "Strategy is a multivariable equation at K&A, which involves resource planning and acquisition, optimal resource utilisation and above all facilitating execution brilliance and adaptation to change. If it is an equation, what do all these vectors equate to? The answer is sustainable value creation for our clients and our internal teams alike.",
  },
];

/* ---------- CUSTOM CURSOR COMPONENT ---------- */
const CustomCursor = ({ active }: { active: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: -40,
        y: -40,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: active ? 1 : 0,
        opacity: active ? 1 : 0,
      }}
      className="fixed top-0 left-0 w-12 h-12 rounded-full bg-white z-[9999] pointer-events-none flex items-center justify-center shadow-lg"
    >
      <ArrowUpRight className="text-black w-4 h-4" strokeWidth={2.5} />
    </motion.div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
export default function Founders() {
  const [activeFounderId, setActiveFounderId] = useState<string | null>(null);
  const activeFounder = foundersData.find((f) => f.id === activeFounderId);
  const [isHoveringFounder, setIsHoveringFounder] = useState(false);

  const handleNavigation = (e: React.MouseEvent, direction: 'next' | 'prev') => {
    e.stopPropagation();
    if (!activeFounderId) return;
    
    const currentIndex = foundersData.findIndex((f) => f.id === activeFounderId);
    let newIndex;
    
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % foundersData.length;
    } else {
        newIndex = (currentIndex - 1 + foundersData.length) % foundersData.length;
    }
    
    setActiveFounderId(foundersData[newIndex].id);
  };

  return (
    <div className="relative w-full bg-black font-noto-sans">
      {/* Hide Cursor on Mobile/Tablet/iPad (Visible only on XL screens) */}
      <div className="hidden xl:block">
        <CustomCursor active={isHoveringFounder} />
      </div>

      {/* ===== FOUNDERS GRID ===== */}
      <div className="relative z-20 bg-black pb-16 pt-16 md:pb-24 md:pt-24 border-t border-white/10">
        <div className="max-w-7x mx-auto px-4 sm:px-6">
          <div className="mb-10 font-noto-sans">
            <div>
              <h2
                className="text-3xl  md:text-5xl lg:text-6xl mb-4 md:mb-6 font-light text-white"
                // style={{ fontFamily: "Gotham, sans-serif" }}
              >
                Meet the
                visionaries
              </h2>
            </div>
            <div className="max-w-m text-gray-400 text-lg md:text-xl">
              Introducing the visionaries whose leadership, insight and intent drive everything K&A stands for.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
            {foundersData.map((founder) => (
              <div
                key={founder.id}
                // Cursor logic: Pointer on iPad/Mobile, None on Desktop (uses custom cursor)
                className="relative cursor-pointer xl:cursor-none group"
                onClick={() => setActiveFounderId(founder.id)}
                onMouseEnter={() => setIsHoveringFounder(true)}
                onMouseLeave={() => setIsHoveringFounder(false)}
              >
                <motion.div className="w-full">
                  <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-sm bg-zinc-900 flex items-end justify-center">
                    <motion.img
                      layoutId={`img-${founder.id}`}
                      src={founder.img}
                      alt={founder.name}
                      className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 ${
                        founder.id === 'ceo' ? 'scale-[1.35] object-[center_30%]' : 'scale-100'
                      }`}
                    />
                    
                    {/* --- OVERLAY LOGIC ---
                      iPad/Mobile (< xl): opacity-100 (Always visible)
                      Desktop (xl+): opacity-0 -> hover:opacity-100
                    */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* --- TEXT REVEAL LOGIC ---
                      iPad/Mobile (< xl): translate-y-0 opacity-100 (Always visible)
                      Desktop (xl+): translate-y-8 opacity-0 -> hover:translate-y-0
                    */}
                    <div className="absolute left-0 bottom-0 p-6 md:p-8 w-full z-20 pointer-events-none">
                      <div className="transform translate-y-0 opacity-100 xl:translate-y-8 xl:opacity-0 xl:group-hover:translate-y-0 xl:group-hover:opacity-100 transition-all duration-500">
                        <h3 className="text-2xl md:text-2xl font-bold text-white mb-1 relative z-30">
                          {founder.name}
                        </h3>
                        <p className="text-yellow-400 font-bold tracking-wider text-[10px] md:text-xs uppercase relative z-30 mb-4">
                          {founder.role}
                        </p>
                        
                        {/* --- READ MORE LINK --- */}
                        <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                          <span className="text-xs uppercase tracking-widest font-medium">Read Bio</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CLICK OVERLAY / MODAL ===== */}
      <AnimatePresence>
        {activeFounderId && activeFounder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 cursor-auto"
            onClick={() => setActiveFounderId(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveFounderId(null);
              }}
              aria-label="Close modal"
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-black/50 md:bg-transparent rounded-full md:rounded-none p-2 md:p-0 hover:text-white/70 z-50 transition-colors"
            >
              <X size={28} />
            </button>

            <motion.div
              onClick={(e) => e.stopPropagation()}
              // Layout: Flex Col on iPad/Mobile, Flex Row ONLY on XL+
              className="w-full max-w-6xl h-auto max-h-[90vh] md:max-h-[85vh] flex flex-col xl:flex-row bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              {/* IMAGE SIDE */}
              <motion.div
                key={`modal-img-${activeFounder.id}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full xl:w-1/2 h-64 md:h-80 xl:h-auto relative overflow-hidden shrink-0"
              >
                <img
                  src={activeFounder.img}
                  alt={activeFounder.name}
                  className="w-full h-full object-cover object-top xl:object-center"
                />
              </motion.div>

              {/* TEXT SIDE */}
              <motion.div
                key={`modal-txt-${activeFounder.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full xl:w-1/2 p-6 md:p-10 xl:p-16 flex flex-col justify-center bg-zinc-950 relative overflow-y-auto"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 z-10 mt-4 xl:mt-0">
                  {activeFounder.name}
                </h2>
                <p className="text-yellow-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-10 z-10">
                  {activeFounder.role}
                </p>

                <div className="prose prose-invert prose-lg z-10 mb-8">
                  <p className="text-gray-300 leading-relaxed font-light text-base md:text-lg">
                    &ldquo;{activeFounder.message}&rdquo;
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 flex justify-end z-10 mt-auto">
                    {activeFounder.id === "ceo" ? (
                        <button
                            onClick={(e) => handleNavigation(e, 'next')}
                            className="flex cursor-pointer items-center gap-3 text-white hover:text-yellow-400 transition-colors text-xs md:text-sm tracking-widest uppercase font-semibold group"
                        >
                            Next Profile
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    ) : (
                        <button
                            onClick={(e) => handleNavigation(e, 'prev')}
                            className="flex cursor-pointer items-center gap-3 text-white hover:text-yellow-400 transition-colors text-xs md:text-sm tracking-widest uppercase font-semibold group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Previous Profile
                        </button>
                    )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}