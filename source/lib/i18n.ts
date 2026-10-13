import { en } from "@/lib/dictionaries/en";
import { tr } from "@/lib/dictionaries/tr";
import type { Dictionary } from "@/lib/dictionaries/types";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export type PageKey = "home" | "privacy" | "terms" | "support";

export const routes: Record<Locale, Record<PageKey, string>> = {
  tr: { home: "/", privacy: "/gizlilik/", terms: "/kullanim-sartlari/", support: "/destek/" },
  en: { home: "/en/", privacy: "/en/privacy/", terms: "/en/terms/", support: "/en/support/" },
};

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}
