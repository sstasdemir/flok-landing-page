import { BlurFade } from "@/components/magicui/blur-fade";
import { FlokLogo } from "@/components/site/flok-logo";
import { WaitlistForm } from "@/components/site/waitlist-form";
import { getDictionary, routes, type Locale } from "@/lib/i18n";

export function PreRegister({ locale }: { locale: Locale }) {
  const { preRegister, waitlist } = getDictionary(locale);

  return (
    <section id={preRegister.id} className="px-6 py-24 lg:py-32">
      <BlurFade className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-forest-deep px-6 py-16 text-center text-white sm:px-12 lg:py-24">
          <div aria-hidden="true" className="absolute -top-1/2 left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full bg-forest/60" />
          <div className="relative flex flex-col items-center">
            <p aria-hidden="true" className="text-5xl leading-none text-mint">
              <FlokLogo />
            </p>
            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-white">
              {preRegister.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">{preRegister.body}</p>
            <WaitlistForm
              locale={locale}
              source="footer"
              copy={waitlist}
              privacyHref={routes[locale].privacy}
              tone="dark"
              className="mt-8"
            />
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
