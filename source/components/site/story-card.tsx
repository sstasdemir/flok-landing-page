import { BlurFade } from "@/components/magicui/blur-fade";
import { Iphone } from "@/components/magicui/iphone";

export type StoryStep = {
  label: string;
  title: string;
  body: string;
};

export function StoryCard({ step, index }: { step: StoryStep; index: number }) {
  return (
    <article data-card className="group w-[min(78vw,320px)] shrink-0 snap-start">
      <BlurFade delay={0.06 * index}>
        <div className="rounded-3xl bg-mint-soft px-[17%] py-8 ring-1 ring-mint/40">
          <div className="drop-shadow-[var(--shadow-phone)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
            <Iphone priority={index === 0} />
          </div>
        </div>
        <div className="px-1 pt-5">
          <p className="font-display text-sm font-bold text-forest">
            {String(index + 1).padStart(2, "0")} · {step.label}
          </p>
          <h3 className="mt-2 text-xl leading-snug font-bold tracking-[-0.02em]">{step.title}</h3>
          <p className="mt-2 text-mute">{step.body}</p>
        </div>
      </BlurFade>
    </article>
  );
}
