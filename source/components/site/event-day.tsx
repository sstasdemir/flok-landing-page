"use client";

import { motion, useReducedMotion } from "motion/react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";
import { icons } from "@/lib/icons";

type EventDayCopy = Dictionary["eventDay"];

export function EventDay({ copy }: { copy: EventDayCopy }) {
  const reduceMotion = useReducedMotion();
  const { moments } = copy;

  return (
    <section id={copy.id} className="px-6 pt-24 lg:pt-32">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-mint-soft px-6 py-14 ring-1 ring-mint/40 sm:px-10 lg:px-14 lg:py-20">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <ol className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {moments.map((moment, index) => (
            <li key={moment.time} className="relative">
              {index < moments.length - 1 && (
                <motion.div
                  aria-hidden="true"
                  className="absolute top-11 -bottom-8 left-[21px] w-0.5 rounded-full bg-forest/25 lg:top-[21px] lg:-right-6 lg:bottom-auto lg:left-11 lg:h-0.5 lg:w-auto"
                  initial={reduceMotion ? false : { clipPath: "inset(0 100% 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0% 0)" }}
                  viewport={{ once: true, margin: "-80px 0px" }}
                  transition={{ delay: 0.25 + 0.12 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <MomentItem moment={moment} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MomentItem({ moment, index }: { moment: EventDayCopy["moments"][number]; index: number }) {
  const Icon = icons[moment.icon];
  return (
    <BlurFade delay={0.12 * index} className="flex gap-5 lg:flex-col lg:gap-0">
      <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-forest text-mint ring-8 ring-mint-soft">
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="lg:mt-6">
        <p className="font-display text-sm font-bold text-forest/70">{moment.time}</p>
        <h3 className="mt-1 text-lg leading-snug font-bold tracking-[-0.02em]">{moment.title}</h3>
        <p className="mt-1.5 leading-relaxed text-mute">{moment.body}</p>
      </div>
    </BlurFade>
  );
}
