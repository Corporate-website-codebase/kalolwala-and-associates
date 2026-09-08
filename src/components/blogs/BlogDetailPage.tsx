"use client";

import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Linkedin,
  Share2,
} from "lucide-react";
import { BLOG_DATA, type BlogPost } from "@/data/blogs";
import PublisherMarquee from "./PublisherMarquee";

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailPageProps {
  post: BlogPost;

  /*
   * CMS / WordPress posts passed from the server page.
   * These are converted into the same BlogPost structure
   * so the sidebar can use both CMS and hardcoded blogs.
   */
  wordpressPosts?: BlogPost[];
}

export default function BlogDetailPage({
  post,
  wordpressPosts = [],
}: BlogDetailPageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLAnchorElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  /*
   * =========================================================
   * SHARE
   * =========================================================
   */

  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(false);

  /*
   * =========================================================
   * ALL BLOGS
   *
   * Combine:
   *
   * 1. Existing hardcoded BLOG_DATA
   * 2. WordPress / CMS blogs
   *
   * Then remove duplicates and the currently opened article.
   * =========================================================
   */

  const otherBlogs = useMemo(() => {
    const combinedBlogs = [...BLOG_DATA, ...wordpressPosts];

    /*
     * Remove the currently opened article
     */
    const filteredBlogs = combinedBlogs.filter(
      (blog) => blog.id !== post.id && blog.slug && blog.slug !== post.slug,
    );

    /*
     * Remove duplicate blogs.
     *
     * Slug is the best identifier because both
     * hardcoded and CMS blogs have a slug.
     */
    const uniqueBlogs = filteredBlogs.filter(
      (blog, index, array) =>
        index === array.findIndex((item) => item.slug === blog.slug),
    );

    /*
     * Sort newest first.
     */
    return uniqueBlogs
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateB - dateA;
      })
      .slice(0, 7);
  }, [post.id, post.slug, wordpressPosts]);

  const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null);

  /*
   * =========================================================
   * LENIS + SCROLLTRIGGER
   * =========================================================
   */

  useLenis((lenis) => {
    lenisRef.current = lenis;
    ScrollTrigger.update();
  });

  /*
   * Scroll to top whenever the blog post changes
   */

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        immediate: true,
      });
    }

    window.scrollTo(0, 0);

    ScrollTrigger.refresh();
  }, [post.id]);

  /*
   * =========================================================
   * GSAP ENTRANCE ANIMATION
   * =========================================================
   */

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

    gsap.set(elements, {
      autoAlpha: 0,
      y: 40,
    });

    const tl = gsap.timeline({
      delay: 0.15,
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    elements.forEach((el, i) => {
      tl.to(
        el,
        {
          autoAlpha: 1,
          y: 0,
        },
        i * 0.12,
      );
    });

    /*
     * Image scale reveal
     */

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current.querySelector("img"),
        {
          scale: 1.15,
        },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.5,
        },
      );
    }

    /*
     * Sidebar fade-in
     */

    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        },
      );
    }

    return () => {
      tl.kill();
    };
  }, [post.id]);

  /*
   * =========================================================
   * SUBSCRIPTION
   * =========================================================
   */

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setSubscriptionStatus("error");

      setSubscriptionMessage("Please enter your email address.");

      return;
    }

    setSubscriptionStatus("loading");
    setSubscriptionMessage("");

    try {
      const response = await fetch("/api/blog/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubscriptionStatus("success");
      setSubscriptionMessage("You're subscribed.");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");

      setSubscriptionMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  /*
   * =========================================================
   * SHARE FUNCTIONS
   * =========================================================
   */

  const getShareUrl = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();

    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);
      setShareError(false);

      /*
       * Keep the confirmation outside the document flow
       * so no layout shifting occurs.
       */
      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setShareError(true);

      window.setTimeout(() => {
        setShareError(false);
      }, 2200);
    }
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();

    if (!url) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url,
        });
      } catch {
        /*
         * Ignore cancelled native share dialogs.
         */
      }

      return;
    }

    await handleCopyLink();
  };

  const handleLinkedInShare = () => {
    const url = getShareUrl();

    if (!url) return;

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url,
    )}`;

    window.open(
      linkedInUrl,
      "_blank",
      "noopener,noreferrer,width=700,height=600",
    );
  };

  return (
    <section
      ref={containerRef}
      className="
        w-full
        min-h-screen
        bg-[#d4d4d4]
        text-black
        font-noto-sans
      "
    >
      {/* =====================================================
          TOP AREA
      ====================================================== */}

     <div className="marginal">
  <div
    className="
      grid
      grid-cols-1
      lg:grid-cols-[minmax(0,70%)_minmax(320px,30%)]
      gap-12
      lg:gap-14
      items-end
    "
  >
    {/* =================================================
        LEFT — BACK + TITLE
        order-2 on mobile (bottom), order-1 on desktop (left)
    ================================================== */}
    <div className="min-w-0 order-2 lg:order-1">
      <Link
        ref={backRef}
        href="/blogs#articles"
        className="
          invisible
          inline-flex
          items-center
          gap-2
          pt-2
          lg:pt-28
          lg:sm:pt-36
          pb-8
          text-neutral-600
          hover:text-black
          transition-colors
          duration-300
          group
        "
      >
        <ArrowLeft
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
        />

        <span
          className="
            text-sm
            font-mono
            uppercase
            tracking-widest
          "
        >
          Back
        </span>
      </Link>

      <h1
        ref={titleRef}
        className="
          invisible
          text-black
          font-light
          text-[clamp(28px,5vw,48px)]
          leading-[1.1]
          tracking-tight
          max-w-[900px]
        "
      >
        {post.title}
      </h1>
    </div>

    {/* =================================================
        RIGHT — SUBSCRIPTION
        order-1 on mobile (top), order-2 on desktop (right)
    ================================================== */}
    <div className="w-full order-1 lg:order-2 pt-24 lg:pt-0">
      <div
        className="
          lg:border-l
          border-black/15
          lg:pl-7
        "
      >
        <p
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-neutral-500
            mb-3
          "
        >
          Stay informed
        </p>

        <h2
          className="
            text-black
            font-noto-sans
            font-medium
            leading-tight
            tracking-tight
          "
          style={{
            fontSize: "clamp(20px, 2vw, 28px)",
          }}
        >
          Subscribe to our
          <br />
          latest insights.
        </h2>

        <p
          className="
            mt-3
            text-neutral-700
            font-light
            leading-relaxed
            max-w-sm
          "
          style={{
            fontSize: "clamp(13px, 1vw, 15px)",
          }}
        >
          Get our latest articles, perspectives and insights delivered
          directly to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="
            mt-6
            flex
            flex-col
            gap-2
          "
        >
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            disabled={subscriptionStatus === "loading"}
            className="
              w-full
              h-12
              px-4
              bg-white/50
              border
              border-black/15
              text-black
              placeholder:text-neutral-500
              outline-none
              font-noto-sans
              transition-colors
              duration-300
              focus:border-black/40
              disabled:opacity-50
            "
          />

          <button
            type="submit"
            disabled={subscriptionStatus === "loading"}
            className="
              w-full
              h-12
              px-6
              bg-black
              text-white
              text-[11px]
              font-medium
              uppercase
              tracking-widest
              transition-all
              duration-300
              hover:bg-neutral-800
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {subscriptionStatus === "loading"
              ? "Subscribing..."
              : "Subscribe"}
          </button>
        </form>

        {subscriptionMessage && (
          <p
            className={`
              mt-3
              text-xs
              ${
                subscriptionStatus === "success"
                  ? "text-neutral-800"
                  : "text-red-600"
              }
            `}
          >
            {subscriptionMessage}
          </p>
        )}
      </div>
    </div>
  </div>
</div>

      {/* =====================================================
          TWO-COLUMN BODY
      ====================================================== */}

      <div className="marginal">
        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-10
            lg:gap-14
            lg:items-start
          "
        >
          {/* =================================================
              LEFT COLUMN — CONTENT
          ================================================== */}

          <div
            ref={contentRef}
            className="
              invisible
              w-full
              lg:w-[70%]
              min-w-0
            "
          >
            {/* HERO IMAGE */}

            {post.image && (
              <div
                ref={imageRef}
                className="
                  w-full
                  mb-12
                  overflow-hidden
                  rounded-sm
                "
              >
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  className="
                    w-full
                    h-auto
                    rounded-sm
                  "
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
            )}

            {/* =================================================
                ARTICLE CONTENT
            ================================================== */}

            <article
              className="
                text-neutral-900
                text-base
                sm:text-[17px]
                leading-[1.85]
                font-normal
                antialiased

                /* Paragraphs */
                [&>p]:mb-6
                [&>p]:text-neutral-900

                /* H2 */
                [&>h2]:text-black
                [&>h2]:text-2xl
                [&>h2]:sm:text-3xl
                [&>h2]:font-semibold
                [&>h2]:leading-[1.25]
                [&>h2]:mt-14
                [&>h2]:mb-6
                [&>h2]:tracking-tight

                /* H3 */
                [&>h3]:text-black
                [&>h3]:text-xl
                [&>h3]:sm:text-2xl
                [&>h3]:font-semibold
                [&>h3]:leading-[1.3]
                [&>h3]:mt-12
                [&>h3]:mb-5
                [&>h3]:tracking-tight

                /* H4 */
                [&>h4]:text-black
                [&>h4]:text-lg
                [&>h4]:sm:text-xl
                [&>h4]:font-semibold
                [&>h4]:leading-[1.35]
                [&>h4]:mt-10
                [&>h4]:mb-4

                /* Lists */
                [&>ul]:mb-7
                [&>ul]:pl-6
                [&>ul]:list-disc
                [&>ul]:marker:text-black

                [&>ol]:mb-7
                [&>ol]:pl-6
                [&>ol]:list-decimal
                [&>ol]:marker:text-black

                [&>ul>li]:mb-3
                [&>ol>li]:mb-3

                /* Nested lists */
                [&>ul>li>ul]:mt-3
                [&>ul>li>ul]:mb-2
                [&>ul>li>ul]:pl-6
                [&>ul>li>ul]:list-disc

                [&>ol>li>ol]:mt-3
                [&>ol>li>ol]:mb-2
                [&>ol>li>ol]:pl-6
                [&>ol>li>ol]:list-decimal

                /* Blockquote */
                [&>blockquote]:border-l-4
                [&>blockquote]:border-black
                [&>blockquote]:pl-6
                [&>blockquote]:py-2
                [&>blockquote]:my-10
                [&>blockquote]:text-black
                [&>blockquote]:text-lg
                [&>blockquote]:sm:text-xl
                [&>blockquote]:font-medium
                [&>blockquote]:leading-[1.7]
                [&>blockquote]:italic

                /* Links */
                [&_a]:text-black
                [&_a]:font-medium
                [&_a]:underline
                [&_a]:underline-offset-4
                [&_a]:decoration-black/40
                [&_a:hover]:text-neutral-600
                [&_a:hover]:decoration-black
                [&_a]:transition-colors
                [&_a]:duration-200

                /* Strong / Bold */
                [&>strong]:text-black
                [&>strong]:font-semibold

                [&_strong]:text-black
                [&_strong]:font-semibold

                /* Emphasis */
                [&_em]:text-neutral-800

                /* Images coming from WordPress content */
                [&_img]:max-w-full
                [&_img]:h-auto
                [&_img]:my-8
                [&_img]:rounded-sm

                /* Tables */
                [&>table]:w-full
                [&>table]:my-8
                [&>table]:border-collapse

                [&>table_th]:border
                [&>table_th]:border-black/20
                [&>table_th]:bg-black/5
                [&>table_th]:px-4
                [&>table_th]:py-3
                [&>table_th]:text-left
                [&>table_th]:font-semibold
                [&>table_th]:text-black

                [&>table_td]:border
                [&>table_td]:border-black/15
                [&>table_td]:px-4
                [&>table_td]:py-3
                [&>table_td]:text-neutral-900
              "
              dangerouslySetInnerHTML={{
                __html: post.content || "",
              }}
            />

            {/* =================================================
                AUTHOR + DATE
            ================================================== */}

            <div className="mt-12 pt-8 border-t border-black/15">
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                  gap-6
                "
              >
                {post.source === "cms" && post.author && (
                  <div className="flex flex-col gap-1">
                    <span
                      className="
                          text-xs
                          font-mono
                          text-black
                          uppercase
                          tracking-widest
                        "
                    >
                      The article is written by:
                    </span>

                    <span
                      className="
                          text-base
                          text-black
                          font-medium
                        "
                    >
                      {post.author}
                    </span>
                  </div>
                )}

                {post.date && (
                  <div
                    className="
                      flex
                      flex-col
                      gap-1
                      sm:text-right
                    "
                  >
                    <span
                      className="
                        text-xs
                        font-mono
                        text-black
                        uppercase
                        tracking-widest
                      "
                    >
                      Published
                    </span>

                    <span
                      className="
                        font-mono
                        text-xs
                        text-black
                        uppercase
                        tracking-wider
                      "
                    >
                      {post.date}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                SHARE ARTICLE
            ================================================== */}

            <div className="mt-12 pt-8 border-t border-black/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 sm:p-8 bg-neutral-50/60 backdrop-blur-sm rounded-3xl border border-black/5 hover:border-black/15 transition-colors duration-500">

                {/* Left Side — Share Label */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-lg font-mono font-semibold text-black">
                    Share this article
                  </span>
                  <span className="text-sm text-neutral-800 font-ligh">
                    Spread the word and inspire your network.
                  </span>
                </div>

                {/* Right Side — Share Buttons */}
                <div className="flex items-center gap-3">

                  {/* Copy Link (Pill Shape) */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy article link"
                    title="Copy link"
                    className="
          group
          relative
          inline-flex
          items-center
          justify-center
          gap-2.5
          h-11
          px-5
          rounded-full
          bg-white
          border
          border-black/10
          text-neutral-700
          shadow-sm
          hover:shadow-md
          hover:-translate-y-0.5
          hover:border-black
          hover:bg-black
          hover:text-white
          transition-all
          duration-300
          active:scale-95
        "
                  >
                    <Copy
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="hidden sm:inline text-[10px] font-mono font-medium uppercase tracking-widest mt-0.5">
                      Copy link
                    </span>
                  </button>

                  {/* LinkedIn (Circle) */}
                  <button
                    type="button"
                    onClick={handleLinkedInShare}
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                    className="
          group
          inline-flex
          items-center
          justify-center
          h-11
          w-11
          rounded-full
          bg-white
          border
          border-black/10
          text-neutral-700
          shadow-sm
          hover:shadow-md
          hover:-translate-y-0.5
          hover:border-[#0A66C2]
          hover:bg-[#0A66C2]
          hover:text-white
          transition-all
          duration-300
          active:scale-95
        "
                  >
                    <Linkedin
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    />
                  </button>

                  {/* Native Share (Circle) */}
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    aria-label="Share article"
                    title="Share article"
                    className="
          group
          inline-flex
          items-center
          justify-center
          h-11
          w-11
          rounded-full
          bg-white
          border
          border-black/10
          text-neutral-700
          shadow-sm
          hover:shadow-md
          hover:-translate-y-0.5
          hover:border-black
          hover:bg-black
          hover:text-white
          transition-all
          duration-300
          active:scale-95
        "
                  >
                    <Share2
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />
                  </button>

                </div>
              </div>
            </div>

            {/* =================================================
                PUBLISHER CTA
            ================================================== */}

            {post.source === "legacy" && (
              <>
                {post.additionalLinks && post.additionalLinks.length > 2 ? (
                  <PublisherMarquee links={post.additionalLinks} />
                ) : (
                  <div
                    className="
                      mt-16
                      pt-10
                      border-t
                      border-black/15
                    "
                  >
                    {post.additionalLinks && post.additionalLinks.length > 0 ? (
                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-center
                          gap-4
                          sm:gap-8
                        "
                      >
                        <span
                          className="
                            text-xs
                            font-mono
                            text-neutral-500
                            uppercase
                            tracking-widest
                          "
                        >
                          Read article on:
                        </span>

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-6
                            sm:gap-10
                          "
                        >
                          {post.additionalLinks.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                  group
                                  inline-flex
                                  items-center
                                  text-neutral-600
                                  hover:text-black
                                  transition-colors
                                  duration-300
                                "
                            >
                              {link.publisherLogo && (
                                <img
                                  src={link.publisherLogo}
                                  alt={link.publisher}
                                  className="
                                      h-5
                                      w-auto
                                      object-contain
                                      brightness-95
                                      group-hover:brightness-100
                                      transition-all
                                      duration-300
                                    "
                                />
                              )}

                              <span
                                className="
                                    text-sm
                                    font-mono
                                    pl-3
                                    tracking-widest
                                  "
                              >
                                Read on {link.publisher}
                              </span>

                              <ArrowUpRight
                                size={16}
                                className="
                                    transition-transform
                                    ml-1
                                    duration-300
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                  "
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group
                          inline-flex
                          items-center
                          text-neutral-600
                          hover:text-black
                          transition-colors
                          duration-300
                        "
                      >
                        {post.publisherLogo && (
                          <img
                            src={post.publisherLogo}
                            alt={post.publisher || "Publisher"}
                            className="
                              h-5
                              w-auto
                              object-contain
                            "
                          />
                        )}

                        <span
                          className="
                            text-sm
                            font-mono
                            pl-4
                            tracking-widest
                          "
                        >
                          Read Article
                        </span>

                        <ArrowUpRight
                          size={18}
                          className="
                            transition-transform
                            ml-1
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />
                      </a>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* =================================================
              RIGHT COLUMN — MORE ARTICLES
          ================================================== */}

          <aside
            className="
              w-full
              lg:w-[30%]
             
              lg:sticky
              lg:top-[6rem]
              lg:self-start
            "
          >
            <div ref={sidebarRef} className="opacity-0">
              {/* Sidebar Header */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-6
                "
              >
                <div
                  className="
                    w-1
                    h-5
                    bg-black
                    rounded-full
                  "
                />

                <h3
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-neutral-600
                  "
                >
                  More Articles
                </h3>
              </div>

              {/* Blog Cards */}

              <div className="flex flex-col gap-0">
                {otherBlogs.map((blog, i) => (
                  <Link
                    key={`${blog.slug}-${blog.id}`}
                    href={`/blogs/${blog.slug}`}
                    className={`
                      group
                      flex
                      gap-4
                      py-3
                      ${i !== 0 ? "border-t border-black/[0.08]" : ""}
                      transition-colors
                      duration-300
                    `}
                  >
                    {/* Thumbnail */}

                    {blog.image ? (
                      <div
                        className="
                          w-20
                          h-14
                          rounded
                          overflow-hidden
                          shrink-0
                          bg-black/5
                        "
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                        />
                      </div>
                    ) : (
                      <div
                        className="
                          w-20
                          h-14
                          rounded
                          overflow-hidden
                          shrink-0
                          bg-black/5
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <span className="text-[9px] text-neutral-400 text-center">
                          K&A
                        </span>
                      </div>
                    )}

                    {/* Text */}

                    <div
                      className="
                        flex-1
                        min-w-0
                      "
                    >
                      <h4
                        className="
                          text-sm
                          font-normal
                          text-black
                          leading-snug
                          group-hover:text-neutral-600
                          transition-colors
                          duration-300
                          line-clamp-2
                        "
                      >
                        {blog.title}
                      </h4>

                      <p
                        className="
                          mt-1.5
                          text-[11px]
                          font-mono
                          text-neutral-500
                          uppercase
                          tracking-wider
                        "
                      >
                        {blog.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All */}

              <Link
                href="/blogs#articles"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  mt-6
                  pt-5
                  mb-6
                  md:mb-0
                  border-t
                  border-black/[0.08]
                  text-black
                  hover:text-black
                  transition-colors
                  duration-300
                "
              >
                <span
                  className="
                    text-xs
                    font-mono
                    tracking-widest
                  "
                >
                  View all articles
                </span>

                <ArrowUpRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* =====================================================
          COPY / SHARE STATUS TOAST

          Fixed position so it NEVER changes document layout.
      ====================================================== */}

      <div
        className={`
          fixed
          z-[9999]
          bottom-6
          right-6
          pointer-events-none
          transition-all
          duration-300
          ${copied || shareError
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
          }
        `}
        aria-live="polite"
      >
        <div
          className="
            flex
            items-center
            gap-2.5
            px-4
            py-3
            bg-black
            text-white
            shadow-lg
            rounded-sm
          "
        >
          {copied ? (
            <>
              <Check size={15} strokeWidth={2} />

              <span
                className="
                  text-[11px]
                  font-mono
                  uppercase
                  tracking-widest
                "
              >
                Link copied
              </span>
            </>
          ) : (
            <>
              <Copy size={15} strokeWidth={1.7} />

              <span
                className="
                  text-[11px]
                  font-mono
                  uppercase
                  tracking-widest
                "
              >
                Unable to copy link
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
