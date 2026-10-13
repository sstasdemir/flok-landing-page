import Link from "next/link";

import { trackAttrs } from "@/lib/analytics/events";
import { locales, type Locale } from "@/lib/i18n";

const languageNames: Record<Locale, string> = { tr: "Türkçe", en: "English" };

const segment = "grid min-h-10 min-w-11 place-items-center rounded-full px-2.5 font-display text-xs font-bold tracking-wide";

type LanguageSwitcherProps = {
  locale: Locale;
  alternateHref: string;
  label: string;
};

export function LanguageSwitcher({ locale, alternateHref, label }: LanguageSwitcherProps) {
  return (
    <nav aria-label={label} className="flex rounded-full bg-ink/5 p-0.5">
      {locales.map((option) =>
        option === locale ? (
          <span
            key={option}
            lang={option}
            aria-current="true"
            aria-label={languageNames[option]}
            className={`${segment} bg-surface text-forest shadow-soft`}
          >
            {option.toUpperCase()}
          </span>
        ) : (
          <Link
            key={option}
            href={alternateHref}
            lang={option}
            hrefLang={option}
            {...trackAttrs("language_switched", { from: locale, to: option })}
            aria-label={languageNames[option]}
            className={`${segment} text-mute transition-colors hover:text-ink`}
          >
            {option.toUpperCase()}
          </Link>
        ),
      )}
    </nav>
  );
}
