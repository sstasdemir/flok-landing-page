import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({ className, reverse = false, pauseOnHover = false, children, repeat = 4, ...props }: MarqueeProps) {
  return (
    <div {...props} className={cn("group flex flex-row gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]", className)}>
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn("flex shrink-0 animate-[marquee_var(--duration)_linear_infinite] flex-row justify-around gap-(--gap)", {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
