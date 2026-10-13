"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function WordRotate({ words, duration = 1600, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => setIndex((current) => (current + 1) % words.length), duration);
    return () => clearInterval(interval);
  }, [words, duration, reduceMotion]);

  return (
    <span className={cn("relative inline-grid", className)}>
      {words.map((word) => (
        <span key={word} className="invisible col-start-1 row-start-1" aria-hidden="true">
          {word}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1"
          initial={{ y: "40%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-40%", opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
