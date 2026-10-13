// Where an in-page section should land below the sticky header.
// - Content that fits the visible area (viewport minus header) is centered in it.
// - Taller content starts SECTION_GAP px below the header.
// "Content" is the section's box minus its own vertical padding, so the
// spacing padding between sections never pushes the eyebrow down.
// No-JS fallback: the scroll-margin-top rule in globals.css.

export const SECTION_GAP = 28;

function headerHeight() {
  return document.querySelector("header")?.getBoundingClientRect().height ?? 64;
}

export function sectionScrollTop(section: HTMLElement) {
  const style = getComputedStyle(section);
  const rect = section.getBoundingClientRect();
  const contentTop = rect.top + window.scrollY + parseFloat(style.paddingTop);
  const contentHeight = rect.height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
  const header = headerHeight();
  const visible = window.innerHeight - header;
  const offset = contentHeight + SECTION_GAP * 2 <= visible ? (visible - contentHeight) / 2 : SECTION_GAP;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.round(Math.min(Math.max(contentTop - header - offset, 0), max));
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(section: HTMLElement, { instant = false } = {}) {
  window.scrollTo({ top: sectionScrollTop(section), behavior: instant || prefersReducedMotion() ? "instant" : "smooth" });
}

// The landing section an id points to, or null (unknown id, hero, non-section).
export function findSection(id: string) {
  if (!id) return null;
  const el = document.getElementById(decodeURIComponent(id));
  return el instanceof HTMLElement && el.matches("main > section[id]:not(:first-child)") ? el : null;
}
