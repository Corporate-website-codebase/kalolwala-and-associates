"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Footer = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const [highlight, setHighlight] = useState(false);

  // Trigger yellow highlight after animation finishes
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHighlight(true), 1800);
      return () => clearTimeout(timer);
    } else {
      setHighlight(false);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-[#000] text-white px-8 md:px-20 py-16 flex flex-col justify-between overflow-hidden font-sans"
    >
      {/* === TOP SECTION: Pentagon + Heading === */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 relative">
        {/* Left Side - Pentagon + Text */}
        <div className="flex flex-col gap-6 md:w-2/3 relative">
          {/* Pentagon + Label */}
          <div className="flex items-center gap-2">
            {/* Pentagon Icon */}
{/* Pentagon Icon */}
{/* Pentagon Icon + Trail (Fully Synced with Forward & Return) */}
<motion.div
  initial={{ opacity: 0, scale: 0.5, rotate: -45, y: 20 }}
  animate={
    isInView
      ? {
          opacity: [0, 1, 1, 1],
          scale: [0.5, 1.2, 1, 1],
          rotate: [-45, 72, 0, 0],
          y: [20, 0, 0, 0],
          clipPath: [
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            "circle(50% at center)",
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          ],
          x: [0, 0, 100, 0],
          transition: {
            duration: 4,
            ease: [0.42, 0, 0.58, 1],
            repeat: Infinity,
            repeatDelay: 1.5,
            times: [0, 0.25, 0.75, 1],
          },
        }
      : { opacity: 0, scale: 0.5, rotate: 0 }
  }
  className="w-8 h-8 bg-[#f5c518] relative z-10"
  style={{
    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  }}
></motion.div>


</div><div>
            {/* Supporting Label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, transition: { delay: 0.6 } }
                  : { opacity: 0, y: 10 }
              }
              className="uppercase tracking- text-2xl text-gray-400"
            >
              We’re here to help
            </motion.span>
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.2, delay: 0.8, ease: "easeOut" },
                  }
                : { opacity: 0, y: 40 }
            }
            className="text-4xl md:text-6xl lg:text-7xl leading-tight font-light"
            style={{ fontFamily: "Gotham, sans-serif" }}
          >
            We don’t just ideate;
            <br />
            we build{" "}
            <motion.span
              animate={
                highlight
                  ? {
                      color: "#f5c518",
                      transition: { duration: 0.8, ease: "easeInOut" },
                    }
                  : { color: "#ffffff" }
              }
            >
              together.
            </motion.span>
          </motion.h2>
        </div>

        {/* Right Side - NEXT Button */}
        {/* Right Side - NEXT Button */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={
    isInView
      ? { opacity: 1, x: 0, transition: { delay: 1.4 } }
      : { opacity: 0, x: 50 }
  }
  className="flex flex-col items-center gap-3 mt-6 md:mt-0"
>
  <span className="uppercase text-lg tracking-widest text-gray-400">
    Next
  </span>

  <motion.div
    whileHover={{ rotate: 45, scale: 1.1 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="w-10 h-10 rounded-full bg-[#2b2b2b] flex items-center justify-center cursor-pointer"
  >
    {/* Top-right arrow icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M7 17L17 7" />          {/* diagonal line (↗) */}
      <path d="M8 7h9v9" />           {/* arrow base */}
    </svg>
  </motion.div>
</motion.div>
      </div>

      {/* === DIVIDER LINE === */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={
          isInView
            ? {
                scaleX: 1,
                transition: { delay: 1.8, duration: 1, ease: "easeInOut" },
              }
            : { scaleX: 0 }
        }
        className="w-full h-[1px] bg-gray-700 mt-12 origin-left"
      />

      {/* === BOTTOM SECTION: Columns === */}
      <div className="grid md:grid-cols-3 gap-10 mt-12">
        {/* Column 1: FAQs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">FAQs</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cab id quae ne nullore secumque listi si disstitia volessim idit,
            aperum dit, cus rest, ipsam sinum quodit. Electo rspero dolupta
            cusapee.
          </p>
        </div>

        {/* Column 2: Offices */}
        <div>
          <h3 className="text-lg font-semibold mb-4">STOP BY OUR OFFICES</h3>
          <p className="text-[#f5c518] font-medium">Kolkata</p>
          <p className="text-gray-400 text-sm">
            South City Business Park, 770, Eastern Metropolitan Bypass Rd,
            Adarsha Nagar, Kolkata, West Bengal 700107
          </p>

          <p className="text-[#f5c518] font-medium mt-4">Mumbai</p>
          <p className="text-gray-400 text-sm">
            South City Business Park, 770, Eastern Metropolitan Bypass Rd,
            Adarsha Nagar, Kolkata, West Bengal 700107
          </p>

          <p className="text-[#f5c518] font-medium mt-4">Delhi</p>
          <p className="text-gray-400 text-sm">
            South City Business Park, 770, Eastern Metropolitan Bypass Rd,
            Adarsha Nagar, Kolkata, West Bengal 700107
          </p>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">DROP US A LINE</h3>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email"
                className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-1/2 bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Organisation"
              className="w-full bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded"
            />
            <textarea
              placeholder="Message."
              className="w-full bg-transparent border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-500 rounded h-24 resize-none"
            ></textarea>
            <button className="w-full bg-[#f5c518] hover:bg-[#e0b800] text-black font-medium py-2 rounded text-sm tracking-widest transition">
              Submit
            </button>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 mt-4 text-gray-400">
            <i className="fab fa-facebook-f cursor-pointer hover:text-white"></i>
            <i className="fab fa-instagram cursor-pointer hover:text-white"></i>
            <i className="fab fa-youtube cursor-pointer hover:text-white"></i>
            <i className="fab fa-linkedin-in cursor-pointer hover:text-white"></i>
          </div>
        </div>
      </div>

      {/* Footer credits */}
      <p className="text-gray-600 text-xs mt-10">
        © Kalolwala & Associates Private Limited © 2025. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
