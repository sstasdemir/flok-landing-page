import type { ReactNode } from "react";
import type { Viewport } from "next";
import localFont from "next/font/local";

import { Analytics } from "@/components/site/analytics";
import { sectionKeysById } from "@/lib/analytics/sections";
import { getDictionary, routes, type Locale } from "@/lib/i18n";

import "@/app/globals.css";

const titan = localFont({
  src: "../../app/fonts/TitanOne-Regular.ttf",
  variable: "--font-titan",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={titan.variable}>
      <head>
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Analytics
          locale={locale}
          copy={getDictionary(locale).consent}
          privacyHref={routes[locale].privacy}
          sections={sectionKeysById(locale)}
        />
        {children}
      </body>
    </html>
  );
}
