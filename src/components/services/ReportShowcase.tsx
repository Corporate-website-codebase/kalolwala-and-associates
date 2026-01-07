"use client";

import React, { Suspense, useState } from "react";
import { ArrowUpRight, ArrowRight, ChevronLeft, Play } from "lucide-react";
import Footers from "../Footers";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import VideoRequestModal from "./VideoRequestModal"; // Ensure path is correct

// --- Interfaces ---
export interface ImageCard {
  title: string;
  image: string;
  subtitle?: string;
  link?: string;
  category?: string;
  key?: string;      
  type?: string;    
}

interface StackItem {
  label: string;
  key: string;
}

interface ReportShowcaseProps {
  title?: string;
  paragraph?: string;
  rightTextTitle?: string;
  rightTextItems?: string[];
  cards?: ImageCard[];
  stack?: StackItem[];
}

// --- Video Data ---
const VIDEO_DATA: ReportShowcaseProps = {
  title: "Videos",
  paragraph: "Great storytelling sits at the intersection of insight and imagination...",
  rightTextTitle: "Video",
  rightTextItems: [],
  cards: [
    // Subcategory: Corporate Film
    { title: "KOTAK MAHINDRA BANK LIMITED", image: "/images/services/tata.png", subtitle: "DISCOVER MORE", type: "corporate", category: "Corporate Film" },
    { title: "tata consumer products", image: "/images/services/tata.png", subtitle: "DISCOVER MORE", type: "corporate", category: "Corporate Film" },
    { title: "marico limited", image: "/images/services/marico.png", subtitle: "DISCOVER MORE", type: "corporate", category: "Corporate Film" },
    { title: "Bajaj Electricals", image: "/images/services/bajaj.png", subtitle: "DISCOVER MORE", type: "corporate", category: "Corporate Film" },
    // Subcategory: Annual Report Videos
    { title: "amara raja energy & mobility limited", image: "/images/services/amara.png", subtitle: "DISCOVER MORE", type: "annual", category: "Annual Report Video" },
    { title: "InterGlobe Aviation Limited", image: "/images/services/indigo.png", subtitle: "DISCOVER MORE", type: "annual", category: "Annual Report Video" },
    { title: "bharti hexacom limited", image: "/images/services/bharti.png", subtitle: "DISCOVER MORE", type: "annual", category: "Annual Report Video" },
    { title: "Indian Oil Corporation Limited", image: "/images/services/indianoil.png", subtitle: "DISCOVER MORE", type: "annual", category: "Annual Report Video" },
    { title: "cipla limited", image: "/images/services/cipla.png", subtitle: "DISCOVER MORE", type: "annual", category: "Annual Report Video" },
  ],
  stack: [
    { label: "Integrated Annual Report", key: "integrated" },
    { label: "Sustainability and ESG reports", key: "sustainability" },
    { label: "Presentations", key: "presentations" },
    { label: "Branding and Activation", key: "branding" },
    { label: "Digital", key: "web" },
  ],
};

const DEFAULT_CARDS: ImageCard[] = [
  { title: "Financial Overview", image: "/images/services/Maskgroup07.png", subtitle: "Read Report", category: "Finance" },
];
const DEFAULT_STACK: StackItem[] = [
  { label: "Videos", key: "video" },
  { label: "Detailed Analytics", key: "analytics" },
];

const TYPE_TITLES: Record<string, string> = {
  corporate: "Corporate Film",
  annual: "Annual Report Videos"
};

function ReportShowcaseContent({
  title: propTitle,
  paragraph: propParagraph,
  rightTextTitle: propRightTextTitle,
  rightTextItems: propRightTextItems,
  cards: propCards,
  stack: propStack,
}: ReportShowcaseProps) {

  // --- Hooks ---
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeKey = searchParams.get("key"); 
  const activeType = searchParams.get("type");

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  // --- Data Selection ---
  let currentData: ReportShowcaseProps;
  if (activeKey === 'video') {
    currentData = VIDEO_DATA;
  } else {
    currentData = {
      title: propTitle || "Quarterly Insights",
      paragraph: propParagraph || "Explore our latest findings...",
      rightTextTitle: propRightTextTitle || "Key Metrics",
      rightTextItems: propRightTextItems || ["ROI: +12%", "Growth: Stable"],
      cards: propCards || DEFAULT_CARDS,
      stack: propStack || DEFAULT_STACK,
    };
  }

  const { title, paragraph, rightTextTitle, rightTextItems, cards, stack } = currentData;

  const handleSelection = (type: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) params.set("type", type);
    else params.delete("type");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // --- Filter Logic ---
  const filteredCards = (cards || []).filter((card) => {
    if (activeKey === "video") {
      if (activeType) return card.type === activeType; 
      return false; 
    }
    return true;
  });

  // State Booleans
  const showVideoSelection = activeKey === "video" && !activeType;
  const isVideoMode = activeKey === "video" && !!activeType;

  // --- Handle Video Click (Open Modal) ---
  const handleCardClick = (card: ImageCard, e: React.MouseEvent) => {
    if (isVideoMode) {
      e.preventDefault(); 
      setSelectedVideo(card.title);
      setIsModalOpen(true);
    }
  };

  // --- Dynamic Title Logic ---
  let displayTitle = title;
  if (activeKey === 'video') {
    if (activeType && TYPE_TITLES[activeType]) {
      displayTitle = TYPE_TITLES[activeType];
    } else {
      displayTitle = VIDEO_DATA.title || "Videos";
    }
  }

  return (
    <div>
      {/* Modal is global to this component */}
      <VideoRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoTitle={selectedVideo} 
      />

      <div className="bg-[#d4d4d4]">
        <div className="w-full min-h-screen marginal font-noto-sans py-20">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 pt-[clamp(40px,8vw,80px)] mb-16">
            <div className="max-w-5xl">
              <h1 className="leading-[1.1] mb-6 whitespace-pre-line text-black tracking-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                {displayTitle}
              </h1>
              <p className="text-neutral-800 whitespace-pre-line md:w-5xl" style={{ fontSize: "clamp(14px, 1.2vw, 18px)" }}>
                {showVideoSelection ? "Choose a category to view related videos." : paragraph}
              </p>
            </div>
            {!showVideoSelection && Array.isArray(rightTextItems) && rightTextItems.length > 0 && (
              <div className="flex flex-col gap-3 lg:mt-4 min-w-[200px] border-l-2 border-black/10 pl-6 lg:border-l-0 lg:pl-0">
                {rightTextTitle?.trim() && <p className="uppercase tracking-widest font-bold" style={{ fontSize: "11px", color: "#000", opacity: 0.6 }}>{rightTextTitle}</p>}
                {rightTextItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ fontSize: "13px", color: "#000" }}>
                    <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full" />
                    <span className="font-medium opacity-80">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SELECTION GRID (Video Logic Phase 1) */}
          {showVideoSelection ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
              <div onClick={() => handleSelection("corporate")} className="group relative h-64 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex items-center justify-center">
                <h3 className="text-3xl font-bold text-neutral-800 group-hover:scale-105 transition-transform">Corporate Film</h3>
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:bg-white/50 transition-all">
                  <ArrowRight className="w-6 h-6 text-neutral-900" />
                </div>
              </div>

              <div onClick={() => handleSelection("annual")} className="group relative h-64 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex items-center justify-center">
                <h3 className="text-3xl font-bold text-neutral-800 group-hover:scale-105 transition-transform">Annual Report Videos</h3>
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:bg-white/50 transition-all">
                  <ArrowRight className="w-6 h-6 text-neutral-900" />
                </div>
              </div>
            </div>
          ) : (
            /* DATA GRID (Videos or Reports) */
            <>
              {isVideoMode && (
                <button onClick={() => handleSelection(null)} className="mb-8 flex cursor-pointer items-center gap-2 text-neutral-700 hover:text-black font-medium transition-colors">
                  <ChevronLeft className="w-5 h-5" /> Back to Categories
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredCards.map((card, idx) => {
                  // Determine Link Wrapper vs Div Wrapper
                  const Wrapper = isVideoMode ? "div" : Link;
                  const wrapperProps = isVideoMode 
                    ? { onClick: (e: any) => handleCardClick(card, e) } // Open Modal
                    : { href: card.link || "#" }; // Standard Nav

                  return (
                    // @ts-ignore
                    <Wrapper
                      key={idx}
                      {...wrapperProps}
                      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer
                        ${isVideoMode ? 'bg-white/60 backdrop-blur-xl border border-white' : 'bg-white/60 backdrop-blur-xl border border-white'}`}
                    >
                      <div className="relative w-full overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 ${isVideoMode ? 'opacity-80 group-hover:opacity-100' : ''}`}
                        />
                        {/* Play Button Overlay */}
                        {isVideoMode && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-black/60 group-hover:scale-110">
                              <Play className="w-10 h-10 text-white fill-white ml-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-grow p-6">
                        <h3 className="leading-tight font-noto-sans uppercase mb-2 transition-colors text-neutral-900 group-hover:text-black" style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}>
                          {card.title}
                        </h3>
                        {card.subtitle && (
                          <div className="mt-6 pt-4 border-t flex justify-between items-center border-neutral-900/10">
                            <p className="font-noto-sans uppercase tracking-widest font-bold transition-colors duration-300 text-neutral-600 group-hover:text-neutral-900" style={{ fontSize: "10px" }}>
                              {isVideoMode ? "REQUEST ACCESS" : card.subtitle}
                            </p>
                            {!isVideoMode && (
                              <div className="bg-white p-2 rounded-full border border-white/40 group-hover:shadow-sm transition-all duration-300">
                                <ArrowUpRight className="text-neutral-800 w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </>
          )}

          {/* STACK NAV */}
          <div className="mt-20 border-t border-black/10">
            {(stack || []).map((item, i) => (
              <Link
                key={i}
                href={`/report-showcase?key=${item.key}`}
                scroll={false}
                onClick={() => { if (item.key === 'video') handleSelection(null); }}
                className="group flex justify-between items-center py-6 border-b border-black/10 hover:bg-black hover:px-6 transition-all duration-300 cursor-pointer"
              >
                <h2 className="text-black group-hover:text-white transition-colors duration-300" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600 }}>
                  {item.label}
                </h2>
                <span className="text-black group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </div>
      <Footers nextPageName="About Us" nextPageLink="/about" />
    </div>
  );
}

export default function ReportShowcase(props: ReportShowcaseProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportShowcaseContent {...props} />
    </Suspense>
  );
}