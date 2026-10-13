"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { StoryCard, type StoryStep } from "@/components/site/story-card";
import { useCarousel } from "@/lib/use-carousel";
import { cn } from "@/lib/utils";

const gutter = "max(1.5rem, calc((100% - 72rem) / 2 + 1.5rem))";

type ScreenCarouselProps = {
  id: string;
  eyebrow: string;
  title: [string, string?];
  regionLabel: string;
  steps: StoryStep[];
  labels: { previous: string; next: string };
};

export function ScreenCarousel({ id, eyebrow, title: [firstLine, secondLine], regionLabel, steps, labels }: ScreenCarouselProps) {
  const { trackRef, progress, canPrev, canNext, isDragging, scrollByCard } = useCarousel<HTMLDivElement>();

  return (
    <section id={id} className="pt-24 lg:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
        <BlurFade>
          <p className="font-display text-sm font-bold tracking-wide text-flame uppercase">{eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.03em]">
            {firstLine}
            {secondLine && (
              <>
                <br className="hidden sm:block" /> {secondLine}
              </>
            )}
          </h2>
        </BlurFade>
        <div className="hidden gap-2 sm:flex">
          <CarouselButton label={labels.previous} disabled={!canPrev} onClick={() => scrollByCard(-1)}>
            <ArrowLeft className="size-5" aria-hidden="true" />
          </CarouselButton>
          <CarouselButton label={labels.next} disabled={!canNext} onClick={() => scrollByCard(1)}>
            <ArrowRight className="size-5" aria-hidden="true" />
          </CarouselButton>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={regionLabel}
        tabIndex={0}
        style={{ paddingInline: gutter, scrollPaddingInline: gutter }}
        className={cn(
          "mt-10 flex gap-4 overflow-x-auto overscroll-x-contain pb-4 outline-none [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory sm:cursor-grab",
        )}
      >
        {steps.map((step, index) => (
          <StoryCard key={step.label} step={step} index={index} />
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-6xl px-6">
        <div aria-hidden="true" className="h-1 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full origin-left rounded-full bg-forest"
            animate={{ scaleX: 0.2 + progress * 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className="grid size-12 place-items-center rounded-full bg-surface text-ink shadow-soft ring-1 ring-line transition-[opacity,background-color] hover:bg-mint-soft disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </motion.button>
  );
}
