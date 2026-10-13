"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { track } from "@/lib/analytics/posthog";
import type { WaitlistCopy } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { joinWaitlist, useWaitlistResult, WaitlistError, type WaitlistSource } from "@/lib/waitlist";

interface WaitlistFormProps {
  locale: Locale;
  source: WaitlistSource;
  copy: WaitlistCopy;
  privacyHref: string;
  tone?: "light" | "dark";
  className?: string;
}

export function WaitlistForm({ locale, source, copy, privacyHref, tone = "light", className }: WaitlistFormProps) {
  const inputId = useId();
  const result = useWaitlistResult();
  const doneMessage = result && copy[result];
  const controls = useAnimationControls();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDark = tone === "dark";
  const section = source === "hero" ? "hero" : "pre_register";
  const hasStarted = useRef(false);

  // Analytics never receive the address itself, only that the form was used.
  function handleFocus() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    track("signup_started", { section });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("company") ?? "").trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const outcome = await joinWaitlist(String(data.get("email") ?? ""), source, locale);
      track("waitlist_submitted", { section, result: outcome === "joined" ? "joined" : "already_joined" });
    } catch (caught) {
      const reason = caught instanceof WaitlistError ? caught.reason : "network";
      setError(copy.errors[reason]);
      void controls.start({ x: [0, -8, 8, -6, 6, -2, 0], transition: { duration: 0.45 } });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {doneMessage ? (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={cn(
              "flex min-h-14 items-center gap-3 rounded-2xl px-4 font-display font-semibold",
              isDark ? "bg-white/10 text-white" : "bg-mint-soft text-forest-deep",
            )}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest text-white">
              <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            </span>
            {doneMessage}
          </motion.p>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, scale: 0.98 }} onSubmit={handleSubmit} onFocus={handleFocus} noValidate>
            <motion.div
              animate={controls}
              className={cn(
                "flex items-center gap-2 rounded-2xl p-1.5 shadow-soft ring-1 transition-shadow focus-within:ring-2",
                isDark
                  ? "bg-white/8 ring-white/15 focus-within:ring-mint"
                  : "bg-surface ring-line focus-within:ring-forest",
              )}
            >
              <label htmlFor={inputId} className="sr-only">
                {copy.placeholder}
              </label>
              <input
                id={inputId}
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder={copy.placeholder}
                aria-invalid={error ? true : undefined}
                className={cn(
                  "h-11 min-w-0 flex-1 bg-transparent px-3 text-base outline-none",
                  isDark ? "text-white placeholder:text-white/50" : "text-ink placeholder:text-mute/70",
                )}
              />
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                onClick={() => track("cta_clicked", { button: "waitlist_submit", section })}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "group inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 font-display font-semibold transition-colors disabled:opacity-70",
                  isDark ? "bg-mint text-forest-deep hover:bg-white" : "bg-forest text-white hover:bg-forest-deep",
                )}
              >
                {isSubmitting ? copy.submitting : copy.submit}
                {!isSubmitting && (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                )}
              </motion.button>
            </motion.div>
            <p
              role="status"
              aria-live="polite"
              className={cn(
                "mt-2 min-h-5 px-1 text-sm",
                error ? (isDark ? "font-medium text-[#ffb38a]" : "font-medium text-flame") : isDark ? "text-white/60" : "text-mute",
              )}
            >
              {error ?? (
                <>
                  {copy.consentBefore}
                  <Link
                    href={privacyHref}
                    className={cn(
                      "underline underline-offset-2 transition-colors",
                      isDark ? "decoration-white/40 hover:text-white" : "decoration-mute/40 hover:text-ink",
                    )}
                  >
                    {copy.consentLink}
                  </Link>
                  {copy.consentAfter}
                </>
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
