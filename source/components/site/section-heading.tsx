import type { ReactNode } from "react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <BlurFade className={cn("max-w-2xl", className)}>
      <p className="font-display text-sm font-bold tracking-wide text-flame uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.03em]">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-mute">{description}</p>}
    </BlurFade>
  );
}
