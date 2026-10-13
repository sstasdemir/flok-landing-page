"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { closeConsent, saveConsent } from "@/lib/analytics/consent";
import type { ConsentCopy } from "@/lib/dictionaries/types";

// The panel carries `ph-no-capture` so the banner itself stays out of autocapture, heatmaps and replay:
// clicking Decline must never be recorded as an analytics event.

// Accept and decline share one style on purpose: KVKK expects refusing to be as easy as accepting.
const choiceButton =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-mint-soft px-4 font-display text-sm font-semibold text-forest-deep transition-[background-color,scale] duration-200 hover:bg-mint active:scale-96";

type ConsentBannerProps = {
  copy: ConsentCopy;
  privacyHref: string;
  open: boolean;
  reopened: boolean;
};

export function ConsentBanner({ copy, privacyHref, open, reopened }: ConsentBannerProps) {
  const titleId = useId();
  const bodyId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Reopened from the footer: move focus into the banner, close on Escape, then hand focus back.
  useEffect(() => {
    if (!open || !reopened) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panelRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeConsent();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      opener?.focus({ preventScroll: true });
    };
  }, [open, reopened]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="consent"
          ref={panelRef}
          role="region"
          aria-labelledby={titleId}
          aria-describedby={bodyId}
          tabIndex={-1}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 320, damping: 30, delay: reopened ? 0 : 0.6 },
          }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 12, transition: { duration: 0.18 } }}
          className="ph-no-capture fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-w-sm rounded-3xl bg-surface p-5 shadow-[0_1px_2px_rgb(18_20_18/0.04),0_20px_48px_-16px_rgb(15_31_24/0.28)] ring-1 ring-line outline-none sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[23rem]"
        >
          <h2 id={titleId} className="text-base leading-snug font-bold tracking-[-0.01em]">
            {copy.title}
          </h2>
          <p id={bodyId} className="mt-1.5 text-sm leading-relaxed text-mute">
            {copy.bodyBefore}
            <Link
              href={privacyHref}
              className="font-medium text-forest underline decoration-mint decoration-2 underline-offset-2 transition-colors hover:decoration-forest"
            >
              {copy.link}
            </Link>
            {copy.bodyAfter}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => saveConsent("denied")} className={choiceButton}>
              {copy.decline}
            </button>
            <button type="button" onClick={() => saveConsent("granted")} className={choiceButton}>
              {copy.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
