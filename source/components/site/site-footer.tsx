import Link from "next/link";

import { ConsentPreferencesButton } from "@/components/site/consent-preferences-button";
import { FlokLogo } from "@/components/site/flok-logo";
import { getDictionary, routes, type Locale } from "@/lib/i18n";

const footerLink = "inline-flex min-h-11 items-center rounded-full px-3 text-sm text-mute transition-colors hover:text-ink";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { footer, header } = getDictionary(locale);
  const route = routes[locale];
  const links = [
    { href: route.privacy, label: footer.privacy },
    { href: route.terms, label: footer.terms },
    { href: route.support, label: footer.support },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <Link href={route.home} aria-label={header.homeLabel} className="inline-flex text-2xl leading-none text-forest">
          <FlokLogo />
        </Link>
        <nav aria-label={footer.legalLabel} className="flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={footerLink}>
              {link.label}
            </Link>
          ))}
          <ConsentPreferencesButton label={footer.cookies} className={`${footerLink} cursor-pointer`} />
        </nav>
        <p className="text-sm text-mute">© {new Date().getFullYear()} Flok</p>
      </div>
    </footer>
  );
}
