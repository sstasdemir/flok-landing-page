"use client";

import { useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

import { cn } from "@/lib/utils";

export function StickyHeader({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > 8));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        isScrolled ? "bg-bg/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
