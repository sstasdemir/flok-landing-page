import { WordRotate } from "@/components/magicui/word-rotate";
import { HeroStage } from "@/components/site/hero-stage";
import { ScrollCue } from "@/components/site/scroll-cue";
import { WaitlistForm } from "@/components/site/waitlist-form";
import { resolveScreen } from "@/lib/content";
import { getDictionary, routes, type Locale } from "@/lib/i18n";

const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-ink">{highlight}</strong>
      {text.slice(at + highlight.length)}
    </>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const { hero, screens, story, waitlist } = getDictionary(locale);
  const stageScreens = {
    back: resolveScreen("map", screens),
    side: resolveScreen("welcome", screens),
    front: resolveScreen("discover", screens),
  };

  return (
    // Desktop: the hero fills the viewport below the 4rem sticky header, so the next section starts below the
    // fold; the grid's single row stretches and items-center keeps the text centered on the phones + badge.
    // Taller content simply grows the section. Mobile keeps its natural (stacked) height.
    <section id="top" className="relative overflow-x-clip lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-8 pb-8 lg:flex-1 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-12">
        <div className="@container flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1
            style={delay(0.05)}
            className="animate-rise text-[min(clamp(2.5rem,5.6vw,4.5rem),100cqi/8.2)] leading-[1.14] font-extrabold tracking-[-0.035em]"
          >
            <span className="sr-only">{hero.srOnly}</span>
            <span aria-hidden="true" className="whitespace-nowrap">
              <span className="block">{hero.before}</span>
              <WordRotate
                words={hero.words.map((word) => `${word}${hero.wordSuffix}`)}
                className="grid justify-items-center text-forest lg:justify-items-start"
              />
              <span className="block">{hero.after}</span>
            </span>
          </h1>

          <p style={delay(0.2)} className="mt-6 max-w-lg animate-rise text-lg leading-relaxed text-mute">
            <Highlighted text={hero.lead} highlight={hero.leadHighlight} />
          </p>

          <div style={delay(0.28)} className="mt-8 w-full max-w-md animate-rise">
            <WaitlistForm locale={locale} source="hero" copy={waitlist} privacyHref={routes[locale].privacy} />
          </div>
        </div>

        <HeroStage label={hero.stageLabel} screens={stageScreens} badges={hero.storeBadges} />
      </div>

      <ScrollCue href={`#${story.id}`} label={hero.scrollCue} />
    </section>
  );
}
