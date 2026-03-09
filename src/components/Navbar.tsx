"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "CULTURE", href: "/culture" },
  { label: "OFFERINGS", href: "/offerings" },
  // { label: "OFFERINGS", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "BLOGS", href: "/blogs" },
  { label: "CAREERS", href: "/careers" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // --- OPTIMIZED SCROLL LOGIC ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > 20 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 20 && isScrolled) {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 100) {
      setIsVisible(false);
      setIsMobileMenuOpen(false);
    } else {
      setIsVisible(true);
    }
  });

  if (!hasLoaded) return null;

  return (
    <>
      <motion.header
        initial={isHome ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{
          delay: isHome ? 4 : 0,
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1]
        }}
        className="sticky top-0 left-0 w-[100vw] md:w-full z-50 selection:bg-yellow-400/18 "
      >
        <motion.nav
          animate={{ y: isVisible ? 0 : "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`w-full transition-colors duration-500 ${
            isScrolled || isMobileMenuOpen ? "bg-black shadow-md" : "bg-black md:bg-transparent"
          }`}
        >
          {/* <div className="w-[95vw] mx-auto flex items-center justify-between py-3 md:py-4">
           */}
          <div className="w-full px-4 md:px-8 mx-auto flex items-center justify-between py-3 md:py-4">

            {/* LOGO */}
            <Link href="/" className="relative z-50">
              <motion.div className="w-[80px] h-[40px] md:w-[100px] md:h-[60px] cursor-pointer relative select-none">
                <Image
                  src="/kna2.svg"
                  alt="Logo"
                  fill
                  className="absolute inset-0 object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* --- DESKTOP MENU --- */}
            <ul className="hidden md:flex font-noto-sans items-center space-x-0">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/" && link.label === "HOME"
                    : pathname.startsWith(link.href);

                return (
                  // FIXED: Changed key from link.href to link.label to avoid duplicates
                  <li key={link.label} className="flex items-center">
                    <Link
                      href={link.href}
                      className="group relative text-[11px] lg:text-[12px] tracking-wide px-3 lg:px-4 py-2 fon-semibold text-white transition-colors duration-300 hover:text-yellow-400"
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-1/2 block h-[1px] -translate-x-1/2 bg-yellow-400 transition-all duration-300 ease-out ${
                          isActive ? "w-[calc(100%-24px)]" : "w-0 group-hover:w-[calc(100%-24px)]"
                        }`}
                      />
                    </Link>
                    {i !== navLinks.length - 1 && (
                      <div className="h-3 w-[1px] bg-gray-600 mx-1"></div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* --- MOBILE HAMBURGER BUTTON --- */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white relative z-50 p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden flex flex-col items-center w-[100vw]"
          >
            <div className="flex flex-col items-center space-y-6 w-full">
              {navLinks.map((link, i) => {
                 // FIXED LOGIC FOR MOBILE:
                 const isActive =
                 link.href === "/"
                   ? pathname === "/" && link.label === "HOME"
                   : pathname === link.href;

                return (
                  <motion.div
                    // FIXED: Changed key to link.label
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-xl font-light tracking-widest py-2 ${
                        isActive ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <div className="w-12 h-[1px] bg-white/10 mx-auto mt-2" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

