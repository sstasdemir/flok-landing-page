import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";
import { icons } from "@/lib/icons";

export function Categories({ copy }: { copy: Dictionary["categories"] }) {
  return (
    <section id={copy.id} className="pt-24 lg:pt-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <ul className="mt-10 space-y-5">
            {copy.perks.map(({ icon, title, body }, index) => {
              const Icon = icons[icon];
              return (
                <li key={title}>
                  <BlurFade delay={0.1 + 0.08 * index} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-mint">
                      <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold">{title}</h3>
                      <p className="mt-0.5 text-mute">{body}</p>
                    </div>
                  </BlurFade>
                </li>
              );
            })}
          </ul>
        </div>

        <ul aria-label={copy.listLabel} className="flex flex-wrap gap-3 lg:justify-end">
          {copy.items.map(({ icon, label }, index) => {
            const Icon = icons[icon];
            return (
              <li key={label}>
                <BlurFade delay={0.04 * index}>
                  <span className="inline-flex min-h-14 items-center gap-3 rounded-full bg-surface py-2 pr-6 pl-2 font-display text-lg font-semibold ring-1 ring-line transition-transform duration-300 hover:-translate-y-0.5 hover:rotate-[-1.5deg]">
                    <span className="grid size-10 place-items-center rounded-full bg-mint-soft text-forest">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {label}
                  </span>
                </BlurFade>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
