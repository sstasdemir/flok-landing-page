"use client";

import { useEffect } from "react";

import { findSection, scrollToSection } from "@/lib/scroll-to-section";

const samePath = (a: string, b: string) => a.replace(/\/$/, "") === b.replace(/\/$/, "");

// Lands every in-page section link (header nav, waitlist CTA, hero scroll cue)
// with the shared helper, and does the same for direct #hash loads and manual
// hash edits. Back/forward keeps the browser's own scroll restoration.
export function SectionAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !samePath(url.pathname, location.pathname)) return;
      const section = findSection(url.hash.slice(1));
      if (!section) return;
      // Capture phase + preventDefault: next/link skips its own hash scroll.
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
      scrollToSection(section);
    };

    const onHashChange = () => {
      const section = findSection(location.hash.slice(1));
      if (section) scrollToSection(section);
    };

    // Direct load of /#id: re-land once layout (fonts) is settled. Skip reloads and
    // back/forward loads, where the browser restores the previous position.
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    let frame = 0;
    if (location.hash && (!nav || nav.type === "navigate")) {
      document.fonts.ready.then(() => {
        frame = requestAnimationFrame(() => {
          const section = findSection(location.hash.slice(1));
          if (section) scrollToSection(section, { instant: true });
        });
      });
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
