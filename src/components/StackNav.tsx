"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { PassLink } from "./StackedCurtainTransition"; // adjust path if needed

export interface StackItem {
  label: string;
  key: string;
}

interface StackNavProps {
  stack: StackItem[];
  urlMapping: Record<string, string>;
  onItemClick?: (item: StackItem) => void;
}

export default function StackNav({
  stack,
  urlMapping,
  onItemClick,
}: StackNavProps) {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <div className="w-[95vw] font-noto-sans  m-auto pb-[2%] pt-0 border-t border-black/10">
      {(stack || []).map((item, i) => {
        const href =
          urlMapping[item.key] || `/offerings/report-showcase?key=${item.key}`;

        return (
          <PassLink
            key={i}
            href={href}
            scroll={true}
            onClick={() => {
              scrollToTop();
              onItemClick?.(item);
            }}
            className="group flex justify-between items-center py-6 border-b border-black/10  bg-[#e2e2e2] hover:bg-black hover:px-6 transition-all duration-300 cursor-pointer"
          >
            <h2
              className="text-black group-hover:text-white transition-colors duration-300"
              style={{
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 600,
              }}
            >
              {item.label}
            </h2>
            <span className="text-black group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </span>
          </PassLink>
        );
      })}
    </div>
  );
}