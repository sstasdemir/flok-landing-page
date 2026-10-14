import { Categories } from "@/components/site/categories";
import { EventDay } from "@/components/site/event-day";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Memories } from "@/components/site/memories";
import { PreRegister } from "@/components/site/pre-register";
import { SectionAnchors } from "@/components/site/section-anchors";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Trust } from "@/components/site/trust";
import { getDictionary, otherLocale, routes, type Locale } from "@/lib/i18n";

export function LandingPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} alternateHref={routes[otherLocale(locale)].home} />
      <main id="main">
        <Hero locale={locale} />
        <Trust copy={dict.trust} />
        <Categories copy={dict.categories} />
        <EventDay copy={dict.eventDay} />
        <Memories copy={dict.memories} />
        <Faq copy={dict.faq} supportEmail="destek@flok.ist" />
        <PreRegister locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <SectionAnchors />
    </>
  );
}
