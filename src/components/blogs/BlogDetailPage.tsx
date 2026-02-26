"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BLOG_DATA, type BlogPost } from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailPageProps {
  post: BlogPost;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLAnchorElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);

  const otherBlogs = BLOG_DATA.filter((b) => b.id !== post.id && b.slug);

  // Sync Lenis scroll ticks with ScrollTrigger — eliminates desync jank
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = [
      backRef.current,
      titleRef.current,
      metaRef.current,
      imageRef.current,
      contentRef.current,
    ].filter(Boolean);

    gsap.set(elements, { autoAlpha: 0, y: 40 });

    const tl = gsap.timeline({
      delay: 0.15,
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    elements.forEach((el, i) => {
      tl.to(el, { autoAlpha: 1, y: 0 }, i * 0.12);
    });

    // Image scale reveal
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current.querySelector("img"),
        { scale: 1.15 },
        { scale: 1, duration: 1.4, ease: "power2.out", delay: 0.5 },
      );
    }

    // Sidebar fade-in
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 },
      );
    }

    // Pin sidebar while content scrolls (desktop only)
    // pinType: "transform" → uses translateY instead of position:fixed → no layout reflow
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (!sidebarRef.current || !contentWrapperRef.current) return;

      ScrollTrigger.create({
        trigger: sidebarRef.current,
        start: "top 7rem",
        endTrigger: contentWrapperRef.current,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        pinType: "transform",
      });
    });

    return () => {
      tl.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#050505] text-white font-noto-sans"
    >
      {/* ─── TOP: BACK LINK + TITLE + META ─── */}
      <div className="marginal">
        <Link
          ref={backRef}
          href="/blogs"
          className="
            invisible
            inline-flex items-center gap-2 pt-28 sm:pt-36 pb-8
            text-gray-400 hover:text-[#F4C016]
            transition-colors duration-300 group
          "
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="text-sm font-mono uppercase tracking-widest">
            Back to Blogs
          </span>
        </Link>

        <h1
          ref={titleRef}
          className="
            invisible text-white font-thin
            text-[clamp(28px,5vw,64px)]
            leading-[1.1] tracking-tight
            max-w-[900px] pb-6
          "
        >
          {post.title}
        </h1>

        <div
          ref={metaRef}
          className="
            invisible flex flex-wrap items-center gap-4 pb-10
            border-b border-white/10
          "
        >
          {post.author && (
            <span
              className="
              inline-block px-3 py-1
              bg-[#F4C016]/10 border border-[#F4C016]/30
              text-[#F4C016] text-xs font-semibold
              uppercase tracking-wider rounded-full
            "
            >
              {post.author}
            </span>
          )}
          <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            {post.date}
          </span>
        </div>
      </div>

      {/* ─── TWO-COLUMN BODY ─── */}
      <div className="marginal">
        <div
          ref={contentWrapperRef}
          className="flex flex-col lg:flex-row gap-10 lg:gap-14 py-14 sm:py-20 lg:items-start"
        >
          {/* === LEFT COLUMN — 70% — CONTENT === */}
          <div ref={contentRef} className="invisible w-full lg:w-[70%] min-w-0">
            {/* ─── HERO IMAGE ─── */}
            {post.image && (
              <div
                ref={imageRef}
                className="w-full mb-12 overflow-hidden rounded-sm"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-sm"
                />
              </div>
            )}

            <article
              className="
                max-w-[820px]
                text-gray-300 text-base sm:text-lg leading-[1.85] font-light

                [&>h2]:text-white
                [&>h2]:text-2xl [&>h2]:sm:text-3xl
                [&>h2]:font-light
                [&>h2]:mt-12 [&>h2]:mb-5
                [&>h2]:tracking-tight

                [&>h3]:text-white
                [&>h3]:text-xl [&>h3]:sm:text-2xl
                [&>h3]:font-light
                [&>h3]:mt-10 [&>h3]:mb-4
                [&>h3]:tracking-tight

                [&>p]:mb-6

                [&>ul]:mb-6 [&>ul]:pl-5
                [&>ul]:list-disc [&>ul]:marker:text-[#F4C016]/50
                [&>ul>li]:mb-2 [&>ul>li]:text-gray-400

                [&>blockquote]:border-l-2
                [&>blockquote]:border-[#F4C016]
                [&>blockquote]:pl-6
                [&>blockquote]:py-2
                [&>blockquote]:my-10
                [&>blockquote]:text-white
                [&>blockquote]:text-lg [&>blockquote]:sm:text-xl
                [&>blockquote]:font-light
                [&>blockquote]:italic
                [&>blockquote]:leading-relaxed

                [&_a]:text-[#F4C016] [&_a]:underline
                [&_a]:underline-offset-2
                [&_a:hover]:text-[#f5d442]
                [&_a]:transition-colors

                [&>strong]:text-white [&>strong]:font-medium
                [&_strong]:text-white [&_strong]:font-medium
              "
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* ─── VISIT ORIGINAL BLOG CTA ─── */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex items-center gap-3
                  text-gray-400 hover:text-[#F4C016]
                  transition-colors duration-300
                "
              >
                <span className="text-sm font-mono uppercase tracking-widest">
                  Read original article
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* === RIGHT COLUMN — 30% — SIDEBAR (sticky) === */}
          <aside className="w-full lg:w-[30%] lg:self-start">
            <div ref={sidebarRef} className="opacity-0">
              {/* Sidebar Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 bg-[#F4C016] rounded-full" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  More Articles
                </h3>
              </div>

              {/* Blog Cards */}
              <div className="flex flex-col gap-0">
                {otherBlogs.map((blog, i) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className={`
                      group flex gap-4 py-3
                      ${i !== 0 ? "border-t border-white/[0.06]" : ""}
                      transition-colors duration-300
                    `}
                  >
                    {/* Thumbnail */}
                    {blog.image && (
                      <div className="w-20 h-14 rounded overflow-hidden shrink-0 bg-white/5">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="
                        text-sm font-normal text-white leading-snug
                        group-hover:text-[#F4C016] transition-colors duration-300
                        line-clamp-2
                      "
                      >
                        {blog.title}
                      </h4>
                      <p
                        className="
                        mt-1.5 text-[11px] font-mono text-gray-500
                        uppercase tracking-wider
                      "
                      >
                        {blog.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <Link
                href="/blogs"
                className="
                  group flex items-center gap-2 mt-6 pt-5
                  border-t border-white/[0.06]
                  text-gray-500 hover:text-[#F4C016]
                  transition-colors duration-300
                "
              >
                <span className="text-xs font-mono uppercase tracking-widest">
                  View all articles
                </span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
