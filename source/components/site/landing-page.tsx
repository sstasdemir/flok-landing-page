import { Categories } from "@/components/site/categories";
import { EventDay } from "@/components/site/event-day";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Memories } from "@/components/site/memories";
import { PreRegister } from "@/components/site/pre-register";
import { ScreenCarousel } from "@/components/site/screen-carousel";
import { SectionAnchors } from "@/components/site/section-anchors";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Trust } from "@/components/site/trust";
import { resolveScreen } from "@/lib/content";
import type { CarouselCopy } from "@/lib/dictionaries/types";
import { getDictionary, otherLocale, routes, type Locale } from "@/lib/i18n";

export function LandingPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const carousel = (copy: CarouselCopy) => ({
    ...copy,
    labels: dict.carousel,
    steps: copy.steps.map((step) => ({ ...step, screen: resolveScreen(step.screen, dict.screens) })),
  });

  return (
    <>
      <SiteHeader locale={locale} alternateHref={routes[otherLocale(locale)].home} />
      <main id="main">
        <Hero locale={locale} />
        <ScreenCarousel {...carousel(dict.story)} />
        <ScreenCarousel {...carousel(dict.organizers)} />
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
