import type { Locale } from "@/lib/i18n";

/**
 * Every custom PostHog event the site sends, with its properties. `track()` adds `locale` and `page`
 * to each one, so they are not repeated here.
 */

/** Locale-neutral section keys, so TR and EN pages report the same values. */
export type SectionKey =
  | "hero"
  | "trust"
  | "categories"
  | "event_day"
  | "memories"
  | "faq"
  | "pre_register";

export type WaitlistSection = Extract<SectionKey, "hero" | "pre_register">;

export type CtaButton =
  | "header_waitlist"
  | "header_nav"
  | "waitlist_submit"
  | "faq_support_email"
  | "hero_scroll_cue"
  | "not_found_home";

export type CtaSection = SectionKey | "header" | "not_found";

export type ScrollDepth = 25 | 50 | 75 | 100;

export type AnalyticsEvents = {
  cta_clicked: { button: CtaButton; section: CtaSection; target?: SectionKey };
  signup_started: { section: WaitlistSection };
  waitlist_submitted: { section: WaitlistSection; result: "joined" | "already_joined" };
  section_viewed: { section: SectionKey };
  scroll_depth: { percent: ScrollDepth };
  language_switched: { from: Locale; to: Locale };
  faq_opened: { question_id: string };

  // Not wired yet: the site has no matching UI (no store links, login, category links, search or
  // host CTA). Typed here so wiring them later is a one-line `track()` call.
  app_store_clicked: { section: CtaSection };
  play_store_clicked: { section: CtaSection };
  login_clicked: { section: CtaSection };
  category_clicked: { category: string };
  search_used: { query_length: number };
  host_cta_clicked: { section: CtaSection };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

export const scrollDepths: readonly ScrollDepth[] = [25, 50, 75, 100];

/**
 * Data attributes for declarative click tracking, usable from server components. The analytics
 * client listens for clicks on `[data-ph-event]` and sends the typed event.
 */
export function trackAttrs<E extends AnalyticsEventName>(event: E, props: AnalyticsEvents[E]) {
  return { "data-ph-event": event, "data-ph-props": JSON.stringify(props) };
}
