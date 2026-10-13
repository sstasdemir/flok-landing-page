import { Marquee } from "@/components/magicui/marquee";
import { SectionHeading } from "@/components/site/section-heading";
import { memoryRows } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries/types";
import { asset, cn } from "@/lib/utils";

export function Memories({ copy }: { copy: Dictionary["memories"] }) {
  return (
    <section id={copy.id} className="pt-24 lg:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      </div>
      <div aria-hidden="true" className="relative mt-12 flex flex-col gap-4">
        {memoryRows.map((row, rowIndex) => (
          <Marquee key={rowIndex} reverse={rowIndex % 2 === 1} repeat={3} className="[--duration:60s]">
            {row.map((src, index) => (
              <img
                key={src}
                src={asset(src)}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn(
                  "h-44 w-auto rounded-2xl object-cover shadow-soft sm:h-56",
                  (index + rowIndex) % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]",
                )}
              />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
