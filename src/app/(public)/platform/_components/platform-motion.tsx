"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full border border-[#BFD1FF] bg-white px-3.5 py-1.5 text-xs font-black tracking-[0.16em] text-[#0a0a0a] uppercase shadow-[0_18px_46px_-34px_rgba(1,75,170,0.6)]";
export const sectionTitleClass =
  "text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[0.98] font-black tracking-[-0.05em] text-balance text-[#07111D]";
export const sectionLeadClass =
  "mx-auto max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8";

/** Fade + rise on scroll into view. */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 28,
}: {
  as?: "div" | "li" | "article" | "section" | "span";
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
  stagger = 0.06,
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
      variants={{
        hidden: reduce ? {} : { opacity: 0, y: 14, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading block: eyebrow + title + lead. */
export function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  lead,
  title,
}: {
  eyebrow: string;
  eyebrowIcon: (props: { className?: string }) => ReactNode;
  lead: ReactNode;
  title: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal as="span" className={cn(eyebrowClass)}>
        <EyebrowIcon className="size-3.5" />
        {eyebrow}
      </Reveal>
      <Reveal className="mt-5" delay={0.05}>
        <h2 className={sectionTitleClass}>{title}</h2>
      </Reveal>
      <Reveal className="mt-6" delay={0.1}>
        <p className={sectionLeadClass}>{lead}</p>
      </Reveal>
    </div>
  );
}
