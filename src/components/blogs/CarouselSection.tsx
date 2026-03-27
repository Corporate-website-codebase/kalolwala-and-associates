"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Minus } from "lucide-react";
import { BLOG_DATA, type BlogPost } from "@/data/blogs";

const ITEMS_PER_PAGE = 6;

export default function BlogPaginatedList({
  cards = BLOG_DATA,
}: {
  cards?: BlogPost[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const sortedCards = useMemo(() => {
    return [...cards].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [cards]);

  const totalPages = Math.ceil(sortedCards.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCards.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedCards]);

  const handlePageChange = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === currentPage ||
      isPageChanging
    )
      return;

    setIsPageChanging(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      if (listTopRef.current) {
        listTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setTimeout(() => {
        setIsPageChanging(false);
      }, 100);
    }, 400);
  };

  return (
    <section id="articles" className="w-full py-14 bg-[#050505] text-white min-h-screen flex flex-col font-noto-sans">
      <div className="marginal mx-auto w-full px-6 md:px-0">
        {/* --- HEADER --- */}
        <div className="mb- border-b border-white/10 pb-10">
          <h2 className="text-white font-noto-sans text-[clamp(32px,5vw,60px)] font-thin leading-tight tracking-tight">
            Finding the story in the
            <br />
            subtle space between words.
          </h2>
        </div>

        {/* --- SCROLL ANCHOR --- */}
        <div ref={listTopRef} className="scroll-mt-32" />

        {/* --- KINETIC LIST LAYOUT --- */}
        <div className="min-h-[400px]">
          <div
            className={`
               flex flex-col
               transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
               ${isPageChanging || !hasMounted ? "opacity-0 translate-y-12" : "opacity-100 translate-y-0"}
             `}
          >
            {currentData.map((c, index) => {
              const isInternal = !!(c.slug && c.content);
              const href = isInternal ? `/blogs/${c.slug}` : c.url;
              return (
                <a
                  href={href}
                  key={c.id}
                  {...(!isInternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="group block w-full outline-none"
                >
                  <article
                    className={`
                    relative py-8 border-t border-white/10
                    transition-all duration-500 ease-out
                    hover:border-white/40
                    ${index === currentData.length - 1 ? "border-b" : ""}
                    /* ZEBRA STRIPING LOGIC: Alternate BG color */
                    ${index % 2 !== 0 ? "bg-white/[0.08]" : "bg-transparent"}
                  `}
                  >
                    {/* Hover Background highlighting overlay */}
                    <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]" />

                    {/* Added px-6 to give content breathing room inside the colored strip */}
                    <div className="relative flex items-start justify-between gap-6 z-10 px-6">
                      {/* LEFT SIDE: Title -> Date -> Excerpt */}
                      <div className="flex-1">
                        {/* 1. TITLE (Moved to Top) */}
                        <h3 className="text-2xl md:text-3xl font-noto-sans font-light text-white group-hover:text-[#F4C016] transition-colors duration-300 leading-tight">
                          {c.title}
                        </h3>

                        {/* 2. DATE (Moved below title) */}
                        <div className="mt-3">
                          <span className="font-mono text-xs text-gray-500 group-hover:text-white/60 transition-colors duration-300 uppercase tracking-wider">
                            {c.date}
                          </span>
                        </div>

                        {/* 3. EXPANDING EXCERPT */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                          <div className="overflow-hidden">
                            <div className="pt-4 md:pr-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                              {/* <p className="text-gray-400 text-lg leading-relaxed font-light">
                                    {c.excerpt || "Explore the details of this topic. We dive deep into the mechanics and philosophy behind the code..."}
                                    </p> */}
                              <div className="mt-4 flex items-center gap-2 text-sm font-mono text-[#F4C016]">
                                <Minus size={12} />
                                <span>READ ARTICLE</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE: CTA ARROW */}
                      <div className="pt-1">
                        <ArrowUpRight
                          className="text-white/30 transform group-hover:text-[#F4C016] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                          size={28}
                        />
                      </div>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
        </div>

        {/* --- MINIMAL PAGINATION --- */}
        {totalPages > 1 && (
          <div
            className={`mt-8 flex justify-between items-end border-t border-white/10 pt-8 transition-opacity duration-1000 ${hasMounted ? "opacity-100" : "opacity-0"}`}
          >
            {/* Simple Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isPageChanging}
              className="group flex flex-col gap-2 disabled:opacity-20 transition-opacity"
            >
              {/* <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Previous</span> */}
              <div className="flex items-center gap-2 text-white group-hover:text-[#F4C016] transition-colors">
                <ChevronLeft size={20} />
                <span className="text-lg">Previous</span>
              </div>
            </button>

            {/* Page Indicator */}
            <div className="font-mono text-sm text-gray-600">
              0{currentPage} <span className="mx-2 text-gray-800">/</span> 0
              {totalPages}
            </div>

            {/* Simple Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isPageChanging}
              className="group flex flex-col gap-2 items-end disabled:opacity-20 transition-opacity"
            >
              <div className="flex items-center gap-2 text-white group-hover:text-[#F4C016] transition-colors">
                <span className="text-lg">Next</span>
                <ChevronRight size={20} />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
