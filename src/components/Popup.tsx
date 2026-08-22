
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevents hydration mismatches & SSR rendering

  useEffect(() => {
    setMounted(true); // Mark component as mounted on the client

    const lastClosed = localStorage.getItem("popupClosedAt");

    if (!lastClosed) {
      setShowPopup(true);
      return;
    }

    const FIVE_MIN = 5 * 60 * 1000;
    const now = Date.now();

    if (now - Number(lastClosed) > FIVE_MIN) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const scrollKeys = ["html", "body"];
    
    if (showPopup) {
      scrollKeys.forEach((el) => {
        const element = document.querySelector(el) as HTMLElement | null;
        if (element) {
          element.style.setProperty("overflow", "hidden", "important");
          element.style.setProperty("height", "100%", "important");
          element.style.setProperty("touch-action", "none", "important");
        }
      });
    } else {
      scrollKeys.forEach((el) => {
        const element = document.querySelector(el) as HTMLElement | null;
        if (element) {
          element.style.removeProperty("overflow");
          element.style.removeProperty("height");
          element.style.removeProperty("touch-action");
        }
      });
    }

    return () => {
      scrollKeys.forEach((el) => {
        const element = document.querySelector(el) as HTMLElement | null;
        if (element) {
          element.style.removeProperty("overflow");
          element.style.removeProperty("height");
          element.style.removeProperty("touch-action");
        }
      });
    };
  }, [showPopup, mounted]);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("popupClosedAt", Date.now().toString());
  };

  // Do not render anything on the server
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[0.5px] p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white p-8 md:p-12 shadow-2xl flex flex-col items-center justify-center max-w-3xl w-full"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-700 cursor-pointer transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            <div className="relative w-full min-h-[150px]">
              <Image
                src="/popup/IFRS Sustainability Alliance logo - transparent.png"
                alt="IFRS Sustainability Alliance"
                fill
                className="object-contain"
                priority
                fetchPriority="high"

              />
            </div>

            <div className="md:mt-6 text-center space-y-4">
              <p className="font-noto-sans text-sm md:text-base max-w-xl text-gray-800 leading-relaxed">
                We are proud to be part of the IFRS Sustainability Alliance, a
                global network of members who explore and develop best practices
                related to sustainability standards and integrated reporting.
              </p>

              <a
                href="https://sustainabilityalliance.ifrs.org/member-organisations/"
                target="_blank"
                className="inline-flex border px-3 py-1 items-center gap-1 font-noto-sans text-sm font-medium text-red-700 hover:text-black transition-colors uppercase tracking-widest mt-2"
              >
                View Official Listing
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-[-2px]"
                >
                  <path
                    d="M1 11L11 1M11 1H3M11 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;