"use client";

import { useEffect, useRef, useState } from "react";
import { Pointer } from "lucide-react";

import { trackAttrs } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

/** Past this many pixels of scroll the cue has done its job and fades out. */
const SCROLLED_PX = 40;

/**
 * Bottom-center "scroll down" link for the full-height hero. A plain in-page anchor, so the browser's
 * own scroll-behavior (smooth, or instant under prefers-reduced-motion) and scroll-padding apply.
 * Desktop only, and only while the hero fits the viewport: when the hero is taller, the cue would sit
 * below the fold, so it is not rendered.
 */
export function ScrollCue({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [fits, setFits] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const update = () => {
      setScrolled(window.scrollY > SCROLLED_PX);
      setFits(section.getBoundingClientRect().bottom + window.scrollY <= window.innerHeight + 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(section);
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      title={label}
      aria-hidden={scrolled || undefined}
      tabIndex={scrolled ? -1 : undefined}
      {...trackAttrs("cta_clicked", { button: "hero_scroll_cue", section: "hero", target: "trust" })}
      className={cn(
        "absolute bottom-1 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-mute/70 transition-[opacity,color] duration-300 hover:text-ink",
        fits && "lg:block",
        scrolled && "pointer-events-none opacity-0",
      )}
    >
      {/* Swipe-up gesture: an index finger slides up under a small chevron, fades, and starts over.
          Finger: Lucide "pointer" icon (lucide-react, ISC license). The chevron sits over the fingertip
          (x = 8 of the icon's 24 units). Reduced motion: both stay still. */}
      <span aria-hidden="true" style={{ animationDelay: "0.9s" }} className="block animate-rise">
        <span className="relative block h-[34px] w-[24px]">
          <svg
            viewBox="0 0 10 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-0 left-[3px] h-[6px] w-[10px] animate-swipe-chevron motion-reduce:animate-none"
          >
            <path d="M1.5 4.75 5 1.25l3.5 3.5" />
          </svg>
          <Pointer
            strokeWidth={1.5}
            className="absolute bottom-0 left-0 size-6 animate-swipe-finger motion-reduce:animate-none"
          />
        </span>
      </span>
    </a>
  );
}
