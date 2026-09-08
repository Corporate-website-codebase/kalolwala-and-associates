"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { BLOG_DATA, type BlogPost } from "@/data/blogs";

const ITEMS_PER_PAGE = 6;

type WordPressPost = {
  id: number;
  date: string;
  slug: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;

      media_details?: {
        sizes?: {
          large?: {
            source_url?: string;
          };

          medium_large?: {
            source_url?: string;
          };

          full?: {
            source_url?: string;
          };
        };
      };
    }>;
  };
};

export default function BlogPaginatedList({
  cards = BLOG_DATA,
  wordpressPosts = [],
}: {
  cards?: BlogPost[];
  wordpressPosts?: WordPressPost[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [subscriptionMessage, setSubscriptionMessage] =
    useState("");

  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  /*
   * Convert WordPress posts into the existing BlogPost structure.
   */
  const sortedCards = useMemo(() => {
    const wordpressCards: BlogPost[] = wordpressPosts.map(
      (post) => {
        const featuredMedia =
          post._embedded?.["wp:featuredmedia"]?.[0];

        const image =
          featuredMedia?.media_details?.sizes?.large
            ?.source_url ||
          featuredMedia?.media_details?.sizes?.medium_large
            ?.source_url ||
          featuredMedia?.media_details?.sizes?.full
            ?.source_url ||
          featuredMedia?.source_url ||
          "";

        return {
          id: String(post.id),
          title: post.title.rendered,
          slug: post.slug,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,

          date: new Date(post.date).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            },
          ),

          url: "",
          image,
        };
      },
    );

    return [...cards, ...wordpressCards].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime(),
    );
  }, [cards, wordpressPosts]);

  const totalPages = Math.ceil(
    sortedCards.length / ITEMS_PER_PAGE,
  );

  const currentData = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return sortedCards.slice(
      start,
      start + ITEMS_PER_PAGE,
    );
  }, [currentPage, sortedCards]);

  /*
   * Pagination
   */
  const handlePageChange = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === currentPage ||
      isPageChanging
    ) {
      return;
    }

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

  /*
   * Subscription
   */
  const handleSubscribe = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setSubscriptionStatus("error");
      setSubscriptionMessage(
        "Please enter your email address.",
      );
      return;
    }

    setSubscriptionStatus("loading");
    setSubscriptionMessage("");

    try {
      const response = await fetch(
        "/api/blog/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong.",
        );
      }

      setSubscriptionStatus("success");
      setSubscriptionMessage("You're subscribed.");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");

      setSubscriptionMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    }
  };

  return (
    <section
      id="articles"
      className="
        w-full
        bg-[#d4d4d4]
        text-black
        font-noto-sans
      "
    >
      <div
        className="
          w-full
          min-h-screen
          font-noto-sans
          pb-20
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

       <div className="relative w-full min-h-[80svh] lg:h-scree overflow-hidden flex flex-col justify-center p-6 sm:p-10 lg:p-16 xl:p-24 bg-black">
  {/* =================================================
      1. BACKGROUND IMAGE
      Updated to inset-0 and h-full to cover the 100vh container completely
  ================================================== */}
  <img
    src="/blogs/blogs-banner.webp"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover object-bottom"
  />

  {/* =================================================
      2. DARK OVERLAY
  ================================================== */}
  <div
    className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-transparent pointer-events-none"
  />

  {/* =================================================
      3. LEFT CONTENT (Heading, Intro + Subscription)
  ================================================== */}
  <div className="relative z-10 max-w-5xl flex flex-col h-full justify-center">
    
    {/* Heading */}
    <h1
      className="
        leading-[1.1]
        mb-4 lg:mb-6
        text-white
        font-light
        tracking-tight
        whitespace-pre-line
      "
      style={{
        fontSize: "clamp(32px, 4vw, 64px)",
      }}
    >
      Finding the story in the
      <br />
      subtle space between words.
    </h1>

    {/* Paragraph */}
    <p
      className="
        text-neutral-100
        whitespace-pre-line
        max-w-3xl
        font-light
      "
      style={{
        fontSize: "clamp(14px, 1.2vw, 18px)",
        lineHeight: "1.6",
      }}
    >
      Explore our latest articles, perspectives and insights across
      business, communication, reporting and design. From emerging trends
      and changing business landscapes to ideas shaping corporate
      communication and stakeholder engagement, our blog brings together
      thoughtful perspectives designed to help businesses understand what
      is changing, why it matters and what comes next.
    </p>

    {/* =================================================
        4. SUBSCRIPTION MODULE
    ================================================== */}
    <div className="mt-12 lg:mt-16 lg:w-4xl md:flex  items-center gap-6">
      <div className="md:w-1/2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-100 mb-3">
          Stay informed
        </p>

        <h2
          className="
            text-white
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
            text-neutral-100
            font-light
            leading-relaxed
          "
          style={{
            fontSize: "clamp(13px, 1vw, 15px)",
          }}
        >
          Get our latest articles, perspectives and insights delivered
          directly to your inbox.
        </p>
      </div>

      <div className="md:w-1/2 md:pr-12 lg:pr-24 mt-8 md:mt-0">
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col gap-3"
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
              bg-white/10
              backdrop-blur-sm
              border
              border-white/20
              text-white
              placeholder:text-neutral-400
              outline-none
              font-noto-sans
              transition-colors
              duration-300
              focus:border-white/60
              focus:bg-white/15
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
              bg-white
              text-black
              text-[11px]
              font-medium
              uppercase
              cursor-pointer
              tracking-widest
              transition-all
              duration-300
              hover:bg-neutral-200
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
                  ? "text-emerald-400"
                  : "text-red-400"
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
            SCROLL ANCHOR
        ====================================================== */}

        <div
          ref={listTopRef}
          className="scroll-mt-32"
        />

        {/* =====================================================
            BLOG CARDS
        ====================================================== */}

        <div className="min-h-[400px] marginal">
          <div
            className={`
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              lg:gap-8

              transition-all
              duration-700
              ease-[cubic-bezier(0.25,1,0.5,1)]

              ${isPageChanging || !hasMounted
                ? "opacity-0 translate-y-12"
                : "opacity-100 translate-y-0"
              }
            `}
          >
            {currentData.map((c) => {
              const isInternal = !!(
                c.slug && c.content
              );

              const href = isInternal
                ? `/blogs/${c.slug}`
                : c.url;

              const image =
                "image" in c
                  ? c.image
                  : undefined;

              return (
                <a
                  href={href}
                  key={c.id}
                  {...(!isInternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="
                    group
                    block
                    w-full
                    h-full
                    outline-none
                  "
                >
                  <article
                    className="
                      group
                      relative
                      flex
                      flex-col
                      h-full
                      overflow-hidden
                      rounded-2xl

                      bg-white/60
                      backdrop-blur-xl

                      border
                      border-white/80

                      shadow-sm
                      hover:shadow-xl

                      transition-all
                      duration-500
                      ease-out

                      hover:-translate-y-1
                    "
                  >
                    {/* =================================================
                        IMAGE
                    ================================================== */}

                    {image ? (
                      <div className="relative w-full">
                        <div
                          className="
      relative
      w-full
      overflow-hidden
      rounded-xl
      bg-neutral-100
    "
                        >
                          <img
                            src={image}
                            alt={c.title}
                            className="
        block
        w-full
        h-auto
        transition-transform
        duration-700
        ease-out
        group-hover:scale-105
      "
                          />

                          <div
                            className="
        absolute
        inset-0
        bg-black/0
        group-hover:bg-black/5
        transition-colors
        duration-500
      "
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="px-3 pt-3">
                        <div
                          className="
                            relative
                            w-full
                            aspect-[16/9]
                            rounded-xl
                            bg-neutral-200
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <span className="text-neutral-400 text-sm">
                            Kalolwala & Associates
                          </span>
                        </div>
                      </div>
                    )}

                    {/* =================================================
                        CARD CONTENT
                    ================================================== */}

                    <div
                      className="
                        flex
                        flex-col
                        flex-grow
                        px-6
                        pt-5
                        pb-6
                      "
                    >
                      {/* DATE */}

                      <div
                        className="
                          h-[16px]
                          flex
                          items-start
                          mb-3
                        "
                      >
                        <span
                          className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-widest
                            text-neutral-500
                            leading-none
                          "
                        >
                          {c.date}
                        </span>
                      </div>

                      {/* TITLE */}

                      <div
                        className="
                          min-h-[58px]
                          flex
                          items-start
                        "
                      >
                        <h3
                          className="
                            leading-tight
                            font-noto-sans
                            font-medium
                            text-neutral-900
                            transition-colors
                            duration-300
                            group-hover:text-neutral-600
                          "
                          style={{
                            fontSize:
                              "clamp(17px, 1.5vw, 21px)",
                          }}
                        >
                          {c.title}
                        </h3>
                      </div>

                      {/* READ MORE */}

                      <div
                        className="
                          mt-auto
                          pt-5
                          border-t
                          border-neutral-900/10

                          flex
                          justify-between
                          items-center
                        "
                      >
                        <p
                          className="
                            font-noto-sans
                            uppercase
                            tracking-widest
                            font-bold
                            text-neutral-600
                            group-hover:text-neutral-900
                            transition-colors
                            duration-300
                          "
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          READ MORE
                        </p>

                        <div
                          className="
                            bg-white
                            p-2
                            rounded-full

                            border
                            border-neutral-900/10

                            group-hover:shadow-sm

                            transition-all
                            duration-300
                          "
                        >
                          <ArrowUpRight
                            className="
                              text-neutral-800
                              w-3.5
                              h-3.5

                              transition-transform
                              duration-300
                              ease-out

                              group-hover:translate-x-0.5
                              group-hover:-translate-y-0.5
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        {totalPages > 1 && (
          <div
            className={`
              mt-12
             
              marginal
              flex
              justify-between
              items-center

              border-t
              border-black/15

              pt-8

              transition-opacity
              duration-1000

              ${hasMounted
                ? "opacity-100"
                : "opacity-0"
              }
            `}
          >
            {/* PREVIOUS */}

            <button
              onClick={() =>
                handlePageChange(
                  currentPage - 1,
                )
              }
              disabled={
                currentPage === 1 ||
                isPageChanging
              }
              className="
                group
                flex
                items-center
                gap-2

                disabled:opacity-30
                disabled:cursor-not-allowed

                transition-opacity
                cursor-pointer
              "
            >
              <ChevronLeft
                size={20}
                className="
                  text-black
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />

              <span
                className="
                  text-base
                  text-black
                  group-hover:text-neutral-600
                  transition-colors
                "
              >
                Previous
              </span>
            </button>

            {/* PAGE INDICATOR */}

            <div
              className="
                font-mono
                text-sm
                tracking-wider
              "
            >
              <span className="text-black font-medium">
                {String(currentPage).padStart(
                  2,
                  "0",
                )}
              </span>

              <span
                className="
                  mx-2
                  text-neutral-500
                  font-medium
                "
              >
                /
              </span>

              <span className="text-neutral-600">
                {String(totalPages).padStart(
                  2,
                  "0",
                )}
              </span>
            </div>

            {/* NEXT */}

            <button
              onClick={() =>
                handlePageChange(
                  currentPage + 1,
                )
              }
              disabled={
                currentPage === totalPages ||
                isPageChanging
              }
              className="
                group
                flex
                items-center
                gap-2

                disabled:opacity-30
                disabled:cursor-not-allowed

                transition-opacity
                cursor-pointer
              "
            >
              <span
                className="
                  text-base
                  text-black
                  group-hover:text-neutral-600
                  transition-colors
                "
              >
                Next
              </span>

              <ChevronRight
                size={20}
                className="
                  text-black
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}