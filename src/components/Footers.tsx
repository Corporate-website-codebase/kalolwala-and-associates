"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Play, X, ChevronDown, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

// === TYPES & INTERFACES === //
const date = new Date();
const year = date.getFullYear();

interface FooterProps {
  nextPageName: string;
  nextPageLink: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
}

// === FAQ DATA FROM DOCUMENT === //
const FAQ_DATA = {
  "Working with K&A": [
    {
      question: "How involved will our team need to be during the Annual Report process?",
      answer: "The client provides inputs, attends interviews and reviews drafts. The assigned project manager is the main point of contact and handles day-to-day coordination."
    },
    {
      question: "Will K&A coordinate with different departments within our organisation?",
      answer: "Yes. K&A liaises with departments via the client's internal coordinator where possible, or the project manager will engage directly to gather Annual report content."
    },
    {
      question: "How do you maintain confidentiality when working with sensitive company information?",
      answer: "All Annual Reports operate under confidentiality protocols and NDAs. Information is handled only by the internal project team and shared through secure channels."
    },
    {
      question: "Can you work with companies that already have internal content prepared?",
      answer: "Yes. K&A can edit, structure and apply designing knowledge to client-provided content for Annual Reports, Sustainability Reports and ESG reports."
    },
  ],
  "The Reporting Process": [
    {
      question: "How does K&A structure the overall reporting process?",
      answer: "Each Annual Report is led by a project manager who manages coordination and timelines. The research analysts' conduct interviews and draft the content, the editorial team refine the narrative, creative team develop the visual layout and the production team typesets statutory reports and financial sections."
    },
    {
      question: "How many review stages are typically involved in a project?",
      answer: "Drafts are shared at multiple stages, including content drafts, edited versions and design proofs, allowing feedback to be incorporated throughout the process of Annual Report or Sustainability Report."
    },
    {
      question: "How do you ensure deadlines are met?",
      answer: "A detailed project timeline is shared at the start, and the client servicing team tracks progress with regular follow-ups and milestone reviews"
    },
    {
      question: "How long does it typically take to develop an annual or sustainability report?",
      answer: "Typical timelines for Annual Reports and Sustainability Reports are 6-8 weeks, subject to scope and revert of input and approvals from the clients."
    },
  ],
  "Services & Deliverables": [
    {
      question: "Can K&A assist with both print and digital report formats?",
      answer: "Yes. Deliverables include print-ready PDFs and production files, interactive digital PDFs, web-ready HTML reports and responsive microsites. K&A also produces investor presentations and web content derived from the report content."
    },
    {
      question: "Can you help us structure our sustainability or ESG disclosures?",
      answer: "Yes. The team converts raw ESG data into structured narrative and disclosures suitable for Sustainability Reports and ESG reports."
    },
    {
      question: "Can K&A support us beyond the report itself?",
      answer: "Yes. Support can extend to corporate presentations, coffee-table books, brochures, website content and other corporate communication materials to maintain consistency across platforms."
    }
  ]
};

// === MOCK COMPONENT === //
const AestheticDot = () => (
  <div className="w-3 h-3 bg-[#f5c518] rounded-full shadow-[0_0_10px_rgba(245,197,24,0.5)] shrink-0" />
);

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
        animate={{
          scale: isHovered ? 1.1 : 1,
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
          className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${isHovered ? "text-black" : "text-white"}`}
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
    className="w-full bg-[#111] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#f5c518] transition-colors rounded-none"
    {...props}
  />
);

const AccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer py-3 flex justify-between items-center text-left  hover: transition-all duration-300 group rounded-sm"
      >
        <span className="text-sm font-medium pr-4 leading-tight text-white/80 group-hover:text-white transition-all duration-300">
          {question}
        </span>
        <ChevronDown 
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#f5c518]" : "text-gray-500 group-hover:text-gray-300"
          }`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: premiumEase }}
            className="overflow-hidden px-2"
          >
            <p className="pb-4 text-xs text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
const Footers = ({
  nextPageName = "Home",
  nextPageLink = "/",
}: FooterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    org: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "form_start",
        form_name: "contact_form",
        form_location: "footer",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
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
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "form_submit",
          form_name: "contact_form",
          form_location: "footer",
        });
        formStartedRef.current = false;
        setFormData({ firstName: "", lastName: "", email: "", phone: "", org: "", message: "" });
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
    document.body.style.overflow = isVideoOpen ? "hidden" : "unset";
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
          <div className="flex items-center gap-4">
            <AestheticDot />
            <div className="overflow-hidden">
              <motion.h2 variants={textRevealVariants} className="block uppercase tracking-[0.2em] text-xs md:text-sm text-gray-300 font-medium">
                We're here to help
              </motion.h2>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] font-light">
            <div className="overflow-hidden">
              <motion.div className="pb-3" variants={textRevealVariants}>We don't just ideate;</motion.div>
            </div>
            <div className="overflow-hidden pb-2n">
              <motion.div variants={textRevealVariants}>
                we build <span className="text-[#f5c518]">together.</span>
              </motion.div>
            </div>
          </h2>
        </div>

        <div className="relative w-full md:w-auto flex justify-end">
          <NextPageButton name={nextPageName} href={nextPageLink} />
        </div>
      </div>

      {/* === ARCHITECTURAL GRID REVEAL === */}
      <div className="relative mt-12 md:mt-16 flex-grow">
        <motion.div variants={lineVariants} className="w-full h-[1px] bg-gray-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative mt-10 gap-10 md:gap-x-8 md:gap-y-12">
          <motion.div variants={verticalLineVariants} className="hidden lg:block absolute top-[-40px] bottom-0 left-1/3 w-[1px] bg-gray-800" />
          <motion.div variants={verticalLineVariants} className="hidden lg:block absolute top-[-40px] bottom-0 left-2/3 w-[1px] bg-gray-800" />

          {/* COLUMN 1: CORPORATE VIDEO */}
          <div className="lg:px-8 flex flex-col gap-2">
            <div className="overflow-hidden">
              <motion.h3 variants={textRevealVariants} className="text-sm font-bold tracking-widest text-white mb-4 md:mb-6">
                CORPORATE VIDEO
              </motion.h3>
            </div>
            <motion.div
              variants={textRevealVariants}
              className="w-full aspect-video bg-zinc-900 border border-gray-800 relative group cursor-pointer overflow-hidden"
              onClick={() => setIsVideoOpen(true)}
            >
              <img src="/images/Office shoot B&W Thumbnail.webp" alt="Corporate Video" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="absolute bottom-1/2 right-1/2 transform translate-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center ">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
            <motion.div variants={textRevealVariants} className="flex items-start flex-col space-y-5 mt-10">
              <Image src="/popup/IFRS Sustainability Alliance logo - white background.jpg" alt="IFRS Sustainability Alliance" width={200} height={200} priority />
              <p className="text-sm font-normal text-gray-400 font-noto-sans ">We are proud to be an organisational member of the IFRS Sustainability Alliance.</p>
              <a href="https://sustainabilityalliance.ifrs.org/member-organisations/ " target="_blank" className="text-sm font-noto-sans font-normal text-[#f5c518] underline ">View Official Listing</a>
            </motion.div>
          </div>

          {/* COLUMN 2: OFFICES */}
          <div className="lg:px-8 flex flex-col gap-6">
            <div className="overflow-hidden">
              <motion.h3 variants={textRevealVariants} className="text-sm font-bold tracking-widest text-white mb-2">
                STOP BY OUR OFFICES
              </motion.h3>
            </div>
            <div className="space-y-6 text-gray-400 text-sm">
              {[
                { city: "Kolkata", address: "South City Business Park, 770, Eastern Metropolitan Bypass Rd, Adarsha Nagar, Kolkata, West Bengal 700107" },
                { city: "Mumbai", address: "1507, Marathon Millennium, Lal Bahadur Shastri Marg, Beside Nirmal Lifestyle Mall, Mulund West, Mumbai, Maharashtra 400080" },
                { city: "Gurugram", address: "Unit no - 150, 1st Floor, Centrum Plaza, Golf Course Road, Sector -53, Gurugram, Haryana 122002" },
                { city: "Hyderabad", address: "1st Floor, Workafella Western Pearl, Hitech City Rd, Kondapur, Hyderabad, Telangana 500084" },
                { city: "Bengaluru", address: "1st Floor, Anthill IQ, 20, Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560001" },
              ].map((loc) => (
                <motion.div variants={textRevealVariants} key={loc.city}>
                  <p className="text-[#f5c518] font-semibold text-xs uppercase tracking-wider mb-1">{loc.city}</p>
                  <p className="leading-relaxed hover:text-white transition-colors cursor-default">{loc.address}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: FORM & FAQ (TOGGLE) */}
          <div className="md:col-span-2 bg-amber-1 lg:col-span-1 lg:px-6 h-full flex flex-col mt-4 md:mt-0 relative min-h-[500px]">
            <div className="flex justify-between items-center mb-3">
              <div className="overflow-hidden">
                <motion.h3 variants={textRevealVariants} className="text-sm font-bold tracking-widest text-white uppercase">
                  {isFAQOpen ? "FAQS" : "Drop us a line"}
                </motion.h3>
              </div>
              <motion.button
                // variants={textRevealVariants}
                onClick={() => setIsFAQOpen(!isFAQOpen)}
                className="text-[10px] cursor-pointer font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 border border-gray-800 bg-[#111] hover:bg-[#f5c518] hover:text-black transition-all duration-300"
              >
                {isFAQOpen ? (
                  <><X size={12} /> Back to Form</>
                ) : (
                  <><MessageSquareQuote size={12} /> View FAQs</>
                )}
              </motion.button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {!isFAQOpen ? (
                  <motion.form
                    key="contact-form"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                    className="flex flex-col gap-3 h-full"
                    onSubmit={handleSubmit}
                    onFocus={handleFormStart}
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                      <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} required />
                      <Input name="phone" placeholder="Phone Number" type="tel" inputMode="numeric" value={formData.phone} onChange={handleChange} />
                    </div>
                    <Input name="org" placeholder="Organization / Company" value={formData.org} onChange={handleChange} />
                    <textarea
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#111] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#f5c518] transition-colors rounded-none flex-1 min-h-[160px] md:min-h-[200px] resize-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className={`w-full text-gray-500 cursor-pointer border border-gray-800 font-bold uppercase tracking-widest py-4 text-xs transition-colors duration-300
                        ${status === "loading" ? "bg-gray-800" : "bg-[#111] hover:text-black hover:bg-[#f5c518]"}
                        ${status === "success" ? "bg-green-700 text-white" : ""}
                        ${status === "error" ? "bg-red-800 text-white" : ""}
                      `}
                    >
                      {status === "idle" && "Send Request"}
                      {status === "loading" && "Sending..."}
                      {status === "success" && "Sent!"}
                      {status === "error" && "Error - Try Again"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    data-lenis-prevent
                    key="faq-panel"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                    className="absolute inset-0 bg-[#0a0a0a] z-20 overflow-y-auto pr-2 custom-scrollbar"
                  >
                    <div className="flex flex-col">
                      {Object.entries(FAQ_DATA).map(([category, faqs]) => (
                        <div key={category} className="mb-4">
                          {/* Category Header */}
                          <div className="sticky top-0 bg-[#0a0a0a] z-10 py-2 border-b border-gray-800">
                            <span className="text-[#f5c518] font-semibold text-xs uppercase tracking-wider mb-1">
                              {category}
                            </span>
                          </div>

                          {/* Accordion Items for this category */}
                          <div className="flex flex-col divide-y divide-gray-800/50">
                            {faqs.map((faq, index) => (
                              <AccordionItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* === BOTTOM BAR === */}
      <div className="mt-12 md:mt-16">
        <motion.div variants={lineVariants} className="w-full h-[1px] bg-gray-800 mb-6" />
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
          <motion.p variants={textRevealVariants} className="text-gray-300 text-xs hover:text-yellow-400">
            © Kalolwala & Associates Pvt Ltd {year}.
          </motion.p>
          <motion.div variants={textRevealVariants} className="flex gap-6 text-gray-300 w-full md:w-auto justify-start">
            {socialIcons.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#f5c518] transition-colors duration-300" aria-label={social.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={social.name === "X" ? "currentColor" : "none"} stroke={social.name === "X" ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {social.path}
                </svg>
              </a>
            ))}
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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
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
              <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors">
                <X size={20} />
              </button>
              <video ref={videoRef} src="/videos/K&A ICSI Video 2025.mp4" controls className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Footers;