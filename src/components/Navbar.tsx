"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";

interface SubNavItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubNavItem[];
}

const navLinks: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "CULTURE", href: "/culture" },
  {
    label: "OFFERINGS",
    href: "/offerings",
    subItems: [
      { label: "Integrated Annual Reporting", href: "/offerings/integrated-annual-reporting" },
      { label: "Sustainability & ESG Reporting", href: "/offerings/sustainability-esg-reporting" },
      { label: "Investor & Corporate Presentations", href: "/offerings/investor-corporate-presentations" },
      { label: "Corporate Branding & Design", href: "/offerings/corporate-branding-design" },
      { label: "Corporate Films & Video Reports", href: "/offerings/corporate-films-video-reports" },
      { label: "Corporate Websites & Digital", href: "/offerings/corporate-websites" },
    ],
  },
  { label: "ABOUT US", href: "/about" },
  { label: "BLOGS", href: "/blogs" },
  { label: "CAREERS", href: "/careers" },
  { label: "FAQS", href: "/faqs" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isOfferingsHovered, setIsOfferingsHovered] = useState(false);
  const [isMobileOfferingsOpen, setIsMobileOfferingsOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsOfferingsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOfferingsHovered(false);
    }, 150);
  };

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
      setIsOfferingsHovered(false);
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

                const isItemHovered = link.label === "OFFERINGS" && isOfferingsHovered;

                return (
                  <li
                    key={link.label}
                    className="relative flex items-center"
                    onMouseEnter={link.subItems ? handleMouseEnter : undefined}
                    onMouseLeave={link.subItems ? handleMouseLeave : undefined}
                  >
                    <Link
                      href={link.href}
                      className={`group relative text-[11px] lg:text-[12px] tracking-wide px-3 lg:px-4 py-2 font-semibold transition-colors duration-300 ${
                        isActive || isItemHovered
                          ? "text-yellow-400"
                          : "text-white hover:text-yellow-400"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-1/2 block h-[1px] -translate-x-1/2 bg-yellow-400 transition-all duration-300 ease-out ${
                          isActive || isItemHovered
                            ? "w-[calc(100%-24px)]"
                            : "w-0 group-hover:w-[calc(100%-24px)]"
                        }`}
                      />
                    </Link>

                    {/* Popover Dropdown Sub-menu */}
                    {link.subItems && (
                      <AnimatePresence>
                        {isOfferingsHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-2 w-72 md:w-80 bg-[#0a0a0a]/95 border border-zinc-800 shadow-2xl backdrop-blur-md rounded-lg overflow-hidden z-50 py-1"
                          >
                            {link.subItems.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsOfferingsHovered(false)}
                                  className={`group flex items-center justify-between px-5 py-3 text-xs md:text-sm font-medium transition-all duration-200 border-b border-zinc-800/60 last:border-b-0 ${
                                    isSubActive
                                      ? "text-yellow-400 bg-zinc-900/60"
                                      : "text-zinc-200 hover:text-yellow-400 hover:bg-zinc-900/50"
                                  }`}
                                >
                                  <span>{subItem.label}</span>
                                  <ChevronRight
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                      isSubActive
                                        ? "text-yellow-400 translate-x-1"
                                        : "text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1"
                                    }`}
                                  />
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

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
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden flex flex-col items-center w-[100vw] overflow-y-auto"
          >
            <div className="flex flex-col items-center space-y-6 w-full pb-12">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/" && link.label === "HOME"
                    : pathname === link.href || pathname.startsWith(link.href + "/");

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="w-full text-center"
                  >
                    {link.subItems ? (
                      <div className="w-full flex flex-col items-center">
                        <div className="relative inline-flex items-center justify-center">
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-xl font-light tracking-widest py-2 ${
                              isActive ? "text-yellow-400" : "text-white"
                            }`}
                          >
                            {link.label}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileOfferingsOpen(!isMobileOfferingsOpen);
                            }}
                            className="absolute left-full ml-2 p-1 text-zinc-400 hover:text-yellow-400 transition-colors focus:outline-none"
                            aria-label="Toggle sub-menu"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isMobileOfferingsOpen ? "rotate-180 text-yellow-400" : "text-zinc-400"
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {isMobileOfferingsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                              className="flex flex-col space-y-3 py-4 items-center overflow-hidden"
                            >
                              {link.subItems.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setIsMobileOfferingsOpen(false);
                                    }}
                                    className={`text-sm sm:text-base font-light tracking-wider transition-all duration-200 flex items-center gap-2 py-1 ${
                                      isSubActive
                                        ? "text-yellow-400 font-normal"
                                        : "text-zinc-300 hover:text-yellow-400"
                                    }`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                      isSubActive ? "bg-yellow-400 scale-100" : "bg-zinc-600 opacity-40 group-hover:bg-yellow-400"
                                    }`} />
                                    <span>{sub.label}</span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-xl font-light tracking-widest py-2 ${
                          isActive ? "text-yellow-400" : "text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
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


