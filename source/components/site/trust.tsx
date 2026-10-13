import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";
import { icons } from "@/lib/icons";

export function Trust({ copy }: { copy: Dictionary["trust"] }) {
  return (
    <section id={copy.id} className="pt-24 lg:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {copy.points.map(({ icon, title, body }, index) => {
            const Icon = icons[icon];
            return (
              <li key={title}>
                <BlurFade delay={0.08 * index} className="h-full">
                  <article className="group h-full rounded-3xl bg-surface p-6 shadow-soft ring-1 ring-line transition-[translate,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-forest hover:ring-forest">
                    <span className="grid size-12 place-items-center rounded-2xl bg-mint-soft text-forest transition-colors duration-500 group-hover:bg-mint/15 group-hover:text-mint">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg leading-snug font-bold tracking-[-0.02em] transition-colors duration-500 group-hover:text-white">
                      {title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-mute transition-colors duration-500 group-hover:text-mint-soft/85">
                      {body}
                    </p>
                  </article>
                </BlurFade>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
