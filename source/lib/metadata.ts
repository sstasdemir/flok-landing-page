import type { Metadata } from "next";

import { getDictionary, routes, type Locale, type PageKey } from "@/lib/i18n";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://flok.ist/").replace(/\/?$/, "/");

// Next resolves "./" against the current route, so the root needs the absolute URL; other paths stay
// relative to metadataBase to keep a GitHub Pages basePath.
const resolve = (path: string) => (path === "/" ? siteUrl : path.slice(1));

function alternatesFor(locale: Locale, page: PageKey): Metadata["alternates"] {
  return {
    canonical: resolve(routes[locale][page]),
    languages: {
      tr: resolve(routes.tr[page]),
      en: resolve(routes.en[page]),
      "x-default": resolve(routes.tr[page]),
    },
  };
}

function openGraphFor(locale: Locale, page: PageKey, title: string, description: string): Metadata["openGraph"] {
  const { meta } = getDictionary(locale);
  return {
    title,
    description,
    url: resolve(routes[locale][page]),
    images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.ogImageAlt }],
    locale: meta.ogLocale,
    alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
    siteName: "Flok",
    type: "website",
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(locale, "home"),
    openGraph: openGraphFor(locale, "home", meta.ogTitle, meta.description),
  };
}

export function legalMetadata(locale: Locale, page: Exclude<PageKey, "home">): Metadata {
  const { legal } = getDictionary(locale);
  const title = `${legal.titles[page]} · Flok`;
  return {
    title,
    description: legal.descriptions[page],
    alternates: alternatesFor(locale, page),
    openGraph: openGraphFor(locale, page, title, legal.descriptions[page]),
  };
}
