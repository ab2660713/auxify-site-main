"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export const pageX = "px-5 sm:px-8 lg:px-12 xl:px-20";

export const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full border border-[#BFD1FF] bg-white px-3.5 py-1.5 text-xs font-black tracking-[0.16em] text-[#0a0a0a] uppercase shadow-[0_18px_46px_-34px_rgba(1,75,170,0.6)]";

/** Fade + rise on scroll into view. */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 28,
}: {
  as?: "div" | "li" | "article" | "section" | "span" | "p" | "h2";
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container for children that animate in sequence. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      transition={{ staggerChildren: stagger }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y: 14, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Eyebrow + title + lead heading block. */
export function SectionHeading({
  align = "center",
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  lead,
  title,
}: {
  align?: "center" | "left";
  eyebrow: string;
  eyebrowIcon: (props: { className?: string }) => ReactNode;
  lead?: ReactNode;
  title: ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <Reveal as="span" className={eyebrowClass}>
        <EyebrowIcon className="size-3.5" />
        {eyebrow}
      </Reveal>
      <Reveal className="mt-5" delay={0.05}>
        <h2 className="text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[0.98] font-black tracking-[-0.05em] text-balance text-[#07111D]">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal className="mt-6" delay={0.1}>
          <p
            className={cn(
              "text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
