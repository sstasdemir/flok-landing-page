import type { MetadataRoute } from "next";

import { locales, routes, type PageKey } from "@/lib/i18n";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://flok.ist/").replace(/\/?$/, "/");
const absolute = (path: string) => `${siteUrl}${path.slice(1)}`;

const priorities: Record<PageKey, number> = { home: 1, support: 0.5, privacy: 0.3, terms: 0.3 };

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    (Object.keys(priorities) as PageKey[]).map((page) => ({
      url: absolute(routes[locale][page]),
      lastModified: new Date("2026-10-05"),
      priority: priorities[page],
      alternates: { languages: { tr: absolute(routes.tr[page]), en: absolute(routes.en[page]) } },
    })),
  );
}
