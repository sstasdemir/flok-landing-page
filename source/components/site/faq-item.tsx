"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { track } from "@/lib/analytics/posthog";
import { cn } from "@/lib/utils";

const spring = { type: "spring", stiffness: 260, damping: 26, mass: 0.8 } as const;

type FaqItemProps = {
  /** Stable, locale-neutral id (position in the list) for analytics. */
  questionId: string;
  question: string;
  answer: string;
};

export function FaqItem({ questionId, question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const answerID = useId();
  const transition = reduceMotion ? { duration: 0 } : spring;

  return (
    <div className="py-2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerID}
        onClick={() => {
          if (!isOpen) track("faq_opened", { question_id: questionId });
          setIsOpen(!isOpen);
        }}
        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 py-3 text-left font-display text-lg font-bold tracking-[-0.01em] text-heading"
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={transition}
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors duration-300",
            isOpen ? "bg-mint-soft" : "bg-surface",
          )}
        >
          <ChevronDown className="size-4" aria-hidden="true" />
        </motion.span>
      </button>
      <motion.div
        id={answerID}
        role="region"
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={transition}
        className="overflow-hidden"
      >
        <motion.p
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -8 }}
          transition={reduceMotion ? { duration: 0 } : { ...spring, opacity: { duration: 0.2, delay: isOpen ? 0.05 : 0 } }}
          className="max-w-xl pr-14 pb-4 leading-relaxed text-mute"
        >
          {answer}
        </motion.p>
      </motion.div>
    </div>
  );
}
