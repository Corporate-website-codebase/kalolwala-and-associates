"use client";

import { AnimatePresence, Variants, motion, useInView } from "framer-motion";
import { Play, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// === TYPES & INTERFACES === //
const date = new Date();
const year = date.getFullYear();

// 1. UPDATED INTERFACE to accept flat props
interface FooterProps {
  nextPageName: string;
  nextPageLink: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
}

import AestheticDot from "@/components/AestheticDot";

// === ANIMATION VARIANTS === //

const premiumEase: [number, number, number, number] = [0.33, 1, 0.68, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const textRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0, transformOrigin: "left" },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: premiumEase },
  },
};

const verticalLineVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0, transformOrigin: "top" },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: premiumEase },
  },
};

// === SUB-COMPONENTS === //

const NextPageButton = ({ name, href }: { name: string; href: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex flex-row items-center gap-4 md:gap-6 mt-8 md:mt-0 cursor-pointer no-underline group self-start md:self-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-6 overflow-hidden flex flex-col items-end text-right min-w-[100px]">
        <motion.span
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="block uppercase text-lg tracking-widest text-gray-500"
        >
          Next
        </motion.span>
        <motion.span
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="block uppercase text-lg tracking-widest text-[#f5c518] font-medium whitespace-nowrap"
        >
          {name}
        </motion.span>
      </div>

      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            },
          },
        }}
        animate={{
          scale: isHovered ? 1 : 1,
          backgroundColor: isHovered ? "#f5c518" : "#1a1a1a",
          borderColor: isHovered ? "#f5c518" : "#1f2937",
        }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-800 flex items-center justify-center transition-colors duration-300 relative z-10 shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
            isHovered ? "text-black" : "text-white"
          }`}
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </a>
  );
};

const Input = ({ placeholder, type = "text", ...props }: InputProps) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full bg-[#111] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 rounded-none transition-colors
               outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0
               focus:border-[#f5c518] focus-visible:border-[#f5c518] appearance-none"
    {...props}
  />
);

// === SOCIAL ICONS DATA === //
const socialIcons = [
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/kalolwala-associates-private-limited",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kalolwalaassociates/?hl=en",
    path: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/kalolwalaassociates/",
    path: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    name: "X",
    href: "https://x.com/KalolwalaAssoc",
    path: (
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    ),
  },
];

// === MAIN COMPONENT === //

// 2. UPDATED COMPONENT SIGNATURE
const Footers = ({
  nextPageName = "Home",
  nextPageLink = "/",
}: FooterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    org: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_start",
        form_name: "contact_form",
        form_location: "footer",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Regex: Allows only digits (0-9). If input contains non-digits, it won't update state.
      // Returns early if the test fails (ignoring the keystroke)
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submit",
          form_name: "contact_form",
          form_location: "footer",
        });
        formStartedRef.current = false;
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          org: "",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVideoOpen]);

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch((e) => console.log("Playback error:", e));
    }
  }, [isVideoOpen]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative w-full marginal font-noto-sans bg-black text-white py-12 md:py-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* === TOP SECTION === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="flex flex-col gap-4 md:gap-6 md:w-2/3">
          <div className="flex items-center gap-3">
            <AestheticDot />
            <div className="overflow-hidden">
              <motion.h2
                variants={textRevealVariants}
                className="uppercase font-noto-sans tracking-widest text-sm md:text-xl text-gray-300 font-medium"
              >
                We&apos;re here to help
              </motion.h2>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] font-light">
            <div className="overflow-hidden">
              <motion.div className="pb-3" variants={textRevealVariants}>
                We don&apos;t just ideate;
              </motion.div>
            </div>
            <div className="overflow-hidde pb-2n">
              <motion.div variants={textRevealVariants}>
                we build <span className="text-[#f5c518]">together.</span>
              </motion.div>
            </div>
          </h2>
        </div>

        <div className="relative w-full md:w-auto flex justify-end">
          {/* 3. USING THE NEW PROPS */}
          <NextPageButton name={nextPageName} href={nextPageLink} />
        </div>
      </div>

      {/* === ARCHITECTURAL GRID REVEAL === */}
      <div className="relative mt-12 md:mt-16 grow">
        <motion.div
          variants={lineVariants}
          className="w-full h-px bg-gray-800 mb-12"
        />

        {/* === FULL-WIDTH CONVERSION STRIP: DROP US A LINE === */}
        <motion.div
          variants={textRevealVariants}
          className="w-full bg-[#0c0c0c] border border-zinc-800/80 rounded-xl p-6 md:p-10  mb-10 md:mb-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sub-heading */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-bold tracking-wider text-white uppercase font-sans">
                DROP US A LINE
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-noto-sans">
                Have a project in mind or want to know more about how we can
                help? Share your details and we&apos;ll get back to you shortly.
              </p>
            </div>

            {/* Form Grid */}
            <form
              onSubmit={handleSubmit}
              onFocus={handleFormStart}
              className="lg:col-span-8 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required

                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="org"
                  placeholder="Organization / Company"
                  value={formData.org}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-[#111] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-[#f5c518] focus-visible:border-[#f5c518] transition-colors rounded-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#f5c518] hover:bg-[#e0b800] text-black font-bold py-3.5 px-8 text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-yellow-400/20"
                >
                  {status === "loading" ? "Sending..." : "SEND REQUEST"}
                </button>
                {status === "success" && (
                  <span className="text-xs text-green-400 font-medium">
                    Message sent successfully!
                  </span>
                )}
                {status === "error" && (
                  <span className="text-xs text-red-400 font-medium">
                    Failed to send message. Please try again.
                  </span>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* === MAIN 4-COLUMN FOOTER GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 pt-4">
          {/* COLUMN 1: ABOUT K&A */}
          <div className="flex flex-col gap-5 lg:pr-8 lg:border-r lg:border-zinc-800/80">
            <div>
              <motion.h3
                variants={textRevealVariants}
                className="text-xs md:text-sm font-bold tracking-widest text-white uppercase font-sans"
              >
                ABOUT K&amp;A
              </motion.h3>
              <div className="w-8 h-[2px] bg-[#f5c518] mt-1.5" />
            </div>

            <motion.div
              variants={textRevealVariants}
              className="flex flex-col gap-4"
            >
              <Image
                src="/kna2.svg"
                alt="K&A Logo"
                width={110}
                height={55}
                className="object-contain"
              />

              <div className="flex flex-col gap-3 text-xs md:text-sm text-zinc-400 leading-relaxed font-noto-sans">
                <p>
                  Kalolwala & Associates is a stakeholder communication and
                  design agency that brings corporate stories to life across
                  print and digital.
                </p>
                <p>
                  From annual reports, ESG and BRSR reports, and investor
                  presentations to corporate films, websites, and interactive
                  microsites, we create engaging experiences that connect
                  organizations with their stakeholders.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <Image
                  src="/popup/IFRS Sustainability Alliance logo - white background.jpg"
                  alt="IFRS Sustainability Alliance"
                  width={170}
                  height={42}
                  className=""
                />
                <a
                  href="https://sustainabilityalliance.ifrs.org/member-organisations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-[#f5c518] hover:underline inline-flex items-center gap-1.5 mt-1 font-medium font-noto-sans"
                >
                  <span>View Official Listing</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-black hover:bg-[#f5c518] hover:border-[#f5c518] transition-all duration-300 shrink-0"
                    aria-label={social.name}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill={social.name === "X" ? "currentColor" : "none"}
                      stroke={social.name === "X" ? "none" : "currentColor"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {social.path}
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2: OUR SERVICES */}
          <div className="flex flex-col gap-5 lg:px-8 lg:border-r lg:border-zinc-800/80">
            <div>
              <motion.h3
                variants={textRevealVariants}
                className="text-xs md:text-sm font-bold tracking-widest text-white uppercase font-sans"
              >
                OUR SERVICES
              </motion.h3>
              <div className="w-8 h-[2px] bg-[#f5c518] mt-1.5" />
            </div>

            <div className="flex flex-col space-y-2">
              {[
                {
                  label: "Integrated Annual Reporting",
                  href: "/offerings/integrated-annual-reporting",
                },
                {
                  label: "Sustainability & ESG Reporting",
                  href: "/offerings/sustainability-esg-reporting",
                },
                {
                  label: "Investor & Corporate Presentations",
                  href: "/offerings/investor-corporate-presentations",
                },
                {
                  label: "Branding & Design",
                  href: "/offerings/corporate-branding-design",
                },
                {
                  label: "Corporate Films & Video Reports",
                  href: "/offerings/corporate-films-video-reports",
                },
                {
                  label: "Software & Digital Solutions",
                  href: "/offerings/corporate-websites",
                },
              ].map((service) => (
                <motion.div variants={textRevealVariants} key={service.href}>
                  <a
                    href={service.href}
                    className="group flex items-center justify-between text-xs md:text-sm text-zinc-300 hover:text-yellow-400 py-2.5 transition-colors border-b border-zinc-800/60 font-noto-sans"
                  >
                    <span>{service.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div className="flex flex-col gap-5 lg:px-8 lg:border-r lg:border-zinc-800/80">
            <div>
              <motion.h3
                variants={textRevealVariants}
                className="text-xs md:text-sm font-bold tracking-widest text-white uppercase font-sans"
              >
                COMPANY
              </motion.h3>
              <div className="w-8 h-[2px] bg-[#f5c518] mt-1.5" />
            </div>

            <div className="flex flex-col space-y-2">
              {[
                { label: "About K&A", href: "/about" },
                { label: "Life & Culture", href: "/culture" },
                { label: "Careers", href: "/careers" },
                { label: "Our Work", href: "/offerings" },
                { label: "Blogs", href: "/blogs" },
                { label: "FAQs", href: "/faqs" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <motion.div variants={textRevealVariants} key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center justify-between text-xs md:text-sm text-zinc-300 hover:text-yellow-400 py-2.5 transition-colors border-b border-zinc-800/60 font-noto-sans"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUMN 4: GET IN TOUCH */}
          <div className="flex flex-col gap-5 lg:pl-8">
            <div>
              <motion.h3
                variants={textRevealVariants}
                className="text-xs md:text-sm font-bold tracking-widest text-white uppercase font-sans"
              >
                GET IN TOUCH
              </motion.h3>
              <div className="w-8 h-[2px] bg-[#f5c518] mt-1.5" />
            </div>

            <motion.div
              variants={textRevealVariants}
              className="flex flex-col gap-4 text-xs md:text-sm text-zinc-300"
            >
              {/* Kolkata Head Office */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs md:text-sm">
                  <svg
                    className="w-4 h-4 text-[#f5c518] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Kolkata (Head Office)</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed font-noto-sans pl-6">
                  South City Business Park, 770, Eastern Metropolitan Bypass Rd,
                  Adarsha Nagar, Kolkata, West Bengal 700107
                </p>
                <a
                  href="tel:+913340077794"
                  className="flex items-center gap-2 text-zinc-300 hover:text-yellow-400 text-xs font-mono transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-[#f5c518] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+91 33 4007 7794</span>
                </a>
                <a
                  href="mailto:info@kalolwala.com"
                  className="flex items-center gap-2 text-zinc-300 hover:text-yellow-400 text-xs font-mono transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-[#f5c518] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@kalolwala.com</span>
                </a>
              </div>

              {/* Other Cities */}
              <div className="flex flex-col space-y-1 mt-2">
                {["Mumbai", "Gurugram", "Hyderabad", "Bengaluru"].map(
                  (city) => (
                    <a
                      key={city}
                      href="/contact"
                      className="group flex items-center justify-between text-xs md:text-sm text-zinc-300 hover:text-yellow-400 py-2 transition-colors border-b border-zinc-800/60 font-noto-sans"
                    >
                      <span className="text-[#f5c518] font-semibold">
                        {city}
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-transform shrink-0" />
                    </a>
                  ),
                )}
              </div>

              {/* Book a discussion CTA */}
              {/* <a
                                href="/contact"
                                className="mt-4 w-full border border-[#f5c518] text-[#f5c518] hover:bg-[#f5c518] hover:text-black font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-md flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-yellow-400/20"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>BOOK A DISCUSSION</span>
                            </a> */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* === BOTTOM BAR === */}
      <div className="mt-12 md:mt-16">
        <motion.div
          variants={lineVariants}
          className="w-full h-px bg-zinc-800/80 mb-6"
        />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <motion.p
            variants={textRevealVariants}
            className="text-zinc-500 text-xs font-noto-sans"
          >
            © {year} Kalolwala &amp; Associates. All rights reserved.
          </motion.p>
          <motion.div
            variants={textRevealVariants}
            className="flex gap-6 text-xs text-zinc-400 font-noto-sans"
          >
            <a
              href="/contact"
              className="hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="/contact"
              className="hover:text-yellow-400 transition-colors"
            >
              Terms &amp; Conditions
            </a>
          </motion.div>
        </div>
      </div>

      {/* === VIDEO MODAL === */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: premiumEase }}
              className="relative w-full max-w-5xl aspect-video bg-black border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <video
                ref={videoRef}
                src="/videos/K&A ICSI Video 2025.mp4"
                controls
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Footers;
