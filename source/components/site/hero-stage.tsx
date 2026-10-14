"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Iphone } from "@/components/magicui/iphone";
import type { Screen } from "@/lib/content";
import type { StoreBadge } from "@/lib/dictionaries/types";
import { asset } from "@/lib/utils";

const spring = { stiffness: 120, damping: 20, mass: 0.6 };

function useDepth(pointer: MotionValue<number>, depth: number, range: number) {
  return useTransform(pointer, (value) => value * depth * range);
}

type HeroStageProps = {
  label: string;
  screens: { back: Screen; side: Screen; front: Screen };
  badges: StoreBadge[];
};

export function HeroStage({ label, screens, badges }: HeroStageProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, spring);
  const pointerY = useSpring(rawY, spring);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const handleMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reduceMotion, rawX, rawY]);

  const frontX = useDepth(pointerX, 1, 14);
  const frontY = useDepth(pointerY, 1, 10);
  const backX = useDepth(pointerX, 0.5, 14);
  const backY = useDepth(pointerY, 0.5, 10);

  return (
    // The stage box leaves ~2% of its width empty above the front phone; mb-[2%] mirrors that gap under the badge,
    // so this column's box is the visible phones + badge group and the hero grid's items-center aligns the text to it.
    // From xl (where the page has side margins) the stage may overflow its grid column by up to 15%, split evenly into
    // the gap and the page margin, but never grows taller than the viewport below the header
    // (column ≈ 1.04 × width + 60px of badges). Below xl the right phone would hit the viewport edge.
    <div className="mx-auto flex w-full max-w-[520px] flex-col items-center xl:mx-0 xl:w-[min(115%,600px,calc((100svh_-_220px)_/_1.04))] xl:max-w-none xl:justify-self-center">
      <div className="relative flex aspect-[1/1.02] w-full items-center justify-center" aria-label={label}>
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 aspect-square w-[112%] -translate-x-1/2 -translate-y-[42%] rounded-full bg-mint-soft"
        />

        <motion.div style={{ x: backX, y: backY }} className="absolute top-[14%] left-[2%] w-[38%]">
          <PhoneEntrance delay={0.3} rotate={-9} fromX="55%" reduceMotion={reduceMotion}>
            <Iphone src={asset(screens.back.src)} alt={screens.back.alt} />
          </PhoneEntrance>
        </motion.div>

        <motion.div style={{ x: backX, y: backY }} className="absolute top-[14%] right-[2%] w-[38%]">
          <PhoneEntrance delay={0.4} rotate={9} fromX="-55%" reduceMotion={reduceMotion}>
            <Iphone src={asset(screens.side.src)} alt={screens.side.alt} />
          </PhoneEntrance>
        </motion.div>

        <motion.div style={{ x: frontX, y: frontY }} className="relative z-10 w-[48%]">
          <PhoneEntrance delay={0.15} fromY={90} fromScale={0.9} reduceMotion={reduceMotion}>
            <Iphone src={asset(screens.front.src)} alt={screens.front.alt} priority />
          </PhoneEntrance>
        </motion.div>
      </div>

      <div className="relative z-10 mt-4 mb-[2%] flex flex-wrap items-center justify-center gap-3">
        {badges.map((badge, index) => (
          <img
            key={badge.src}
            src={asset(badge.src)}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            decoding="async"
            draggable={false}
            style={{ animationDelay: `${0.5 + index * 0.08}s` }}
            className="h-10 w-auto animate-rise select-none sm:h-11"
          />
        ))}
      </div>
    </div>
  );
}

type PhoneEntranceProps = {
  children: ReactNode;
  delay: number;
  rotate?: number;
  fromX?: string;
  fromY?: number;
  fromScale?: number;
  reduceMotion: boolean | null;
};

function PhoneEntrance({ children, delay, rotate = 0, fromX = "0%", fromY = 60, fromScale = 0.94, reduceMotion }: PhoneEntranceProps) {
  return (
    <motion.div
      className="drop-shadow-[var(--shadow-phone)]"
      initial={reduceMotion ? false : { opacity: 0, x: fromX, y: fromY, rotate: 0, scale: fromScale }}
      animate={{ opacity: 1, x: "0%", y: 0, rotate, scale: 1 }}
      transition={{
        default: { type: "spring", stiffness: 150, damping: 15, mass: 0.9, delay },
        // Phones must never be translucent: the front screen would show the ones behind it.
        opacity: { duration: 0, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
