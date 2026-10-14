import { WordRotate } from "@/components/magicui/word-rotate";
import { ScrollCue } from "@/components/site/scroll-cue";
import { WaitlistForm } from "@/components/site/waitlist-form";
import { getDictionary, routes, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/utils";

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
  const { hero, trust, waitlist } = getDictionary(locale);

  return (
    // Desktop: the hero fills the viewport below the 4rem sticky header, so the next section starts below the
    // fold. Taller content simply grows the section. Mobile keeps its natural (stacked) height.
    <section id="top" className="relative overflow-x-clip lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] right-[-20%] aspect-square w-[min(70vw,520px)] rounded-full bg-mint-soft opacity-70 blur-3xl lg:top-[5%] lg:right-[-8%]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pt-8 pb-8 lg:py-16">
        <div className="@container flex w-full max-w-2xl flex-col items-center text-center">
          <h1
            style={delay(0.05)}
            className="animate-rise text-[min(clamp(2.5rem,5.6vw,4.5rem),100cqi/8.2)] leading-[1.14] font-extrabold tracking-[-0.035em]"
          >
            <span className="sr-only">{hero.srOnly}</span>
            <span aria-hidden="true" className="whitespace-nowrap">
              <span className="block">{hero.before}</span>
              <WordRotate
                words={hero.words.map((word) => `${word}${hero.wordSuffix}`)}
                className="grid justify-items-center text-forest"
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

          <div style={delay(0.36)} className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-rise">
            {hero.storeBadges.map((badge) => (
              <img
                key={badge.src}
                src={asset(badge.src)}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                decoding="async"
                draggable={false}
                className="h-10 w-auto select-none sm:h-11"
              />
            ))}
          </div>
        </div>
      </div>

      <ScrollCue href={`#${trust.id}`} label={hero.scrollCue} />
    </section>
  );
}
