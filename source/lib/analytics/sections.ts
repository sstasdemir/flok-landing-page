import { getDictionary, type Locale } from "@/lib/i18n";

import type { SectionKey } from "./events";

/** Maps each landing page section's DOM id to its locale-neutral analytics key. Server-side only. */
export function sectionKeysById(locale: Locale): Record<string, SectionKey> {
  const dict = getDictionary(locale);
  return {
    top: "hero",
    [dict.trust.id]: "trust",
    [dict.categories.id]: "categories",
    [dict.eventDay.id]: "event_day",
    [dict.memories.id]: "memories",
    [dict.faq.id]: "faq",
    [dict.preRegister.id]: "pre_register",
  };
}
