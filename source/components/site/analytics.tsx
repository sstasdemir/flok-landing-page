"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { ConsentBanner } from "@/components/site/consent-banner";
import { useConsent } from "@/lib/analytics/consent";
import { scrollDepths, type AnalyticsEventName, type AnalyticsEvents, type SectionKey } from "@/lib/analytics/events";
import { disableAnalytics, enableAnalytics, setAnalyticsLocale, track } from "@/lib/analytics/posthog";
import type { ConsentCopy } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";

const sectionThresholds = Array.from({ length: 21 }, (_, index) => index / 20);

type AnalyticsProps = {
  locale: Locale;
  copy: ConsentCopy;
  privacyHref: string;
  sections: Record<string, SectionKey>;
};

export function Analytics({ locale, copy, privacyHref, sections }: AnalyticsProps) {
  const consent = useConsent();
  const pathname = usePathname();
  const granted = consent.choice === "granted";

  useEffect(() => setAnalyticsLocale(locale), [locale]);

  // PostHog is only downloaded once consent is granted. Without consent (no choice yet, declined or
  // withdrawn) it is stopped and every PostHog cookie and storage entry is removed.
  useEffect(() => {
    if (!consent.ready) return;
    if (granted) void enableAnalytics();
    else disableAnalytics();
  }, [consent.ready, granted]);

  // Declarative click tracking for elements rendered with `trackAttrs()`.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-ph-event]") : null;
      if (!target?.dataset.phEvent) return;
      try {
        const name = target.dataset.phEvent as AnalyticsEventName;
        track(name, JSON.parse(target.dataset.phProps ?? "{}") as AnalyticsEvents[typeof name], { instant: true });
      } catch {
        // Malformed attributes: skip the event rather than break the click.
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // Per page view: each section once when it is substantially on screen, and scroll depth milestones once.
  useEffect(() => {
    if (!granted) return;

    const seen = new Set<SectionKey>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = sections[entry.target.id];
          if (!section || seen.has(section) || !entry.isIntersecting) continue;
          if (entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight * 0.5) {
            seen.add(section);
            observer.unobserve(entry.target);
            track("section_viewed", { section });
          }
        }
      },
      { threshold: sectionThresholds },
    );
    document.querySelectorAll<HTMLElement>("main section[id]").forEach((element) => {
      if (sections[element.id]) observer.observe(element);
    });

    const reached = new Set<number>();
    let frame = 0;
    const measure = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = (window.scrollY / scrollable) * 100;
      for (const percent of scrollDepths) {
        if (reached.has(percent) || depth < (percent === 100 ? 99 : percent)) continue;
        reached.add(percent);
        track("scroll_depth", { percent });
      }
    };
    const handleScroll = () => {
      frame ||= requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    frame = requestAnimationFrame(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [granted, pathname, sections]);

  return (
    <ConsentBanner
      copy={copy}
      privacyHref={privacyHref}
      open={consent.ready && (consent.choice === null || consent.reopened)}
      reopened={consent.reopened}
    />
  );
}
