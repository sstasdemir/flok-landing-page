"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type MotionProps, type UseInViewOptions } from "motion/react";

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 12,
  direction = "up",
  inView = true,
  inViewMargin = "-64px",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const reduceMotion = useReducedMotion();
  const isVisible = !inView || inViewResult;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "right" || direction === "down" ? -1 : 1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : { [axis]: offset * sign, opacity: 0, filter: `blur(${blur})` },
        visible: reduceMotion ? { opacity: 1 } : { [axis]: 0, opacity: 1, filter: "blur(0px)" },
      }}
      transition={{ delay: 0.04 + delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
