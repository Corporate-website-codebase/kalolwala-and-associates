"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
  AnchorHTMLAttributes,
  MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { motion, useReducedMotion } from "motion/react";

/* ============================================================================
   TYPES & CONTEXT
============================================================================ */

type PassStage = "idle" | "enter" | "exit";

interface PassContextValue {
  navigate: (href: string) => void;
}

const PassContext = createContext<PassContextValue | null>(null);

/* ============================================================================
   PUBLIC HOOK
============================================================================ */

export function usePassTransition() {
  const ctx = useContext(PassContext);
  if (!ctx) {
    throw new Error(
      "usePassTransition must be used inside <PassTransitionProvider />"
    );
  }
  return ctx;
}

/* ============================================================================
   PROVIDER
============================================================================ */

interface PassTransitionProviderProps {
  children: ReactNode;
  duration?: number;       // enter duration
  exitDuration?: number;   // fast exit duration
  colors?: string[];
  delayPerLayer?: number;
}

export function PassTransitionProvider({
  children,
  duration = 0.8,
  exitDuration = 0.25,
  colors = ["#FFF201", "#FFCB03", "#FF9F05"],
  delayPerLayer = 0.08,
}: PassTransitionProviderProps) {
  const router = useRouter();
  const [stage, setStage] = useState<PassStage>("idle");

  const enterTotal = duration + (colors.length - 1) * delayPerLayer;

const navigate = useCallback(
  async (href: string) => {
    // Start enter animation
    setStage("enter");

    await wait(0.5)
        router.push(href);

    // Let enter animation complete visually
    await wait(duration);


    // Exit fast
    setStage("exit");
    await wait(exitDuration);

    // Reset
    setStage("idle");
  },
  [router, duration, exitDuration]
);


  return (
    <PassContext.Provider value={{ navigate }}>
      <PassOverlay
        stage={stage}
        duration={duration}
        exitDuration={exitDuration}
        colors={colors}
        delayPerLayer={delayPerLayer}
      />
      {children}
    </PassContext.Provider>
  );
}

/* ============================================================================
   PASS LINK
============================================================================ */

type PassLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  LinkProps & {
    children: ReactNode;
  };

export function PassLink({
  href,
  onClick,
  scroll,
  replace,
  prefetch,
  locale,
  shallow,
  ...rest
}: PassLinkProps) {
  const { navigate } = usePassTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onClick?.(e);
    navigate(serializeHref(href));
  };

  return (
    <Link
      href={href}
      scroll={scroll}
      replace={replace}
      prefetch={prefetch}
      locale={locale}
      shallow={shallow}
      {...rest}
      onClick={handleClick}
    />
  );
}

/* ============================================================================
   PASS OVERLAY (UNIFORM MOTION)
============================================================================ */

function PassOverlay({
  stage,
  duration,
  exitDuration,
  colors,
  delayPerLayer,
}: {
  stage: PassStage;
  duration: number;
  exitDuration: number;
  colors: string[];
  delayPerLayer: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {colors.map((color, index) => {
        const delay = index * delayPerLayer;

        const variants = prefersReducedMotion
          ? {
              idle: { opacity: 0, display: "none" },
              enter: { opacity: 1, display: "block" },
              exit: { opacity: 0, display: "none" },
            }
          : {
              idle: {
                y: "100%",
                display: "none",
                transition: { duration: 0 },
              },
              enter: {
                // EVERY layer moves the SAME distance
                y: ["100%", "-100%"],
                display: "block",
                transition: {
                  duration,
                  delay,
                  ease: [0.76, 0, 0.24, 1],
                },
              },
              exit: {
                y: "-200%",
                display: "block",
                transition: {
                  duration: exitDuration,
                  ease: [0.76, 0, 0.24, 1],
                },
              },
            };

        return (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              backgroundColor: color,
              zIndex: index + 1,
            }}
            initial="idle"
            animate={stage}
            variants={variants}
          />
        );
      })}
    </div>
  );
}

/* ============================================================================
   UTILITIES
============================================================================ */

function wait(seconds: number) {
  return new Promise((res) => setTimeout(res, seconds * 1000));
}

function serializeHref(href: LinkProps["href"]): string {
  if (typeof href === "string") return href;
  const pathname = href.pathname ?? "";
  const query = href.query
    ? `?${new URLSearchParams(
        href.query as Record<string, string>
      ).toString()}`
    : "";
  return `${pathname}${query}`;
}
