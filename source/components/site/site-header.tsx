import Link from "next/link";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { StickyHeader } from "@/components/site/sticky-header";
import { trackAttrs } from "@/lib/analytics/events";
import { sectionKeysById } from "@/lib/analytics/sections";
import { getDictionary, routes, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  alternateHref: string;
};

export function SiteHeader({ locale, alternateHref }: SiteHeaderProps) {
  const { header, preRegister } = getDictionary(locale);
  const home = routes[locale].home;
  const sectionKeys = sectionKeysById(locale);

  return (
    <StickyHeader>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <Link href={home} aria-label={header.homeLabel} className="font-logo text-3xl leading-none text-forest">
          flok
        </Link>
        <nav aria-label={header.navLabel} className="hidden items-center gap-1 lg:flex">
          {header.links.map((link) => (
            <Link
              key={link.id}
              href={`${home}#${link.id}`}
              {...trackAttrs("cta_clicked", { button: "header_nav", section: "header", target: sectionKeys[link.id] })}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-mute transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} alternateHref={alternateHref} label={header.languageLabel} />
          <Link
            href={`${home}#${preRegister.id}`}
            {...trackAttrs("cta_clicked", { button: "header_waitlist", section: "header", target: "pre_register" })}
            className="inline-flex min-h-11 items-center rounded-full bg-forest px-4 font-display text-sm font-semibold whitespace-nowrap text-white transition-[background-color,scale] duration-200 hover:bg-forest-deep active:scale-96 sm:px-5"
          >
            {header.cta}
          </Link>
        </div>
      </div>
    </StickyHeader>
  );
}
