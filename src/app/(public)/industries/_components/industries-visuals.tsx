"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, MessagesSquare, Sparkles } from "lucide-react";

import { LogoMark } from "@/components/branding/logo";

import {
  agentActions,
  AiIcon,
  industries,
  type Industry,
} from "./industries-data";

/* ------------------------------------------------------------------ */
/*  Reveal — fade + rise on scroll                                     */
/* ------------------------------------------------------------------ */

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 26,
}: {
  as?: "div" | "li" | "article" | "section" | "span";
  children: React.ReactNode;
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
      viewport={{ once: true, margin: "-70px" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  Industry Showcase — a live conversation that cycles industries     */
/* ------------------------------------------------------------------ */

export function IndustryShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % industries.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduce]);

  const industry = industries[active];
  const Icon = industry.icon;

  return (
    <div className="relative mx-auto w-full max-w-md min-w-0">
      {/* Ambient glow tinted to the active industry */}
      <motion.div
        animate={{ background: tintGlow(industry.accent) }}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-2xl"
        transition={{ duration: 0.8 }}
      />

      <div className="overflow-hidden rounded-[28px] border border-[#D8E6F8] bg-white shadow-[0_44px_120px_-70px_rgba(1,35,84,0.7)]">
        {/* Device header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#EAF1FA] px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="grid size-10 shrink-0 place-items-center rounded-xl"
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                key={industry.slug}
                style={{ background: industry.soft, color: industry.accent }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="size-5" />
              </motion.span>
            </AnimatePresence>
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="truncate text-sm font-black tracking-[-0.02em] text-[#07111D]"
                  exit={{ opacity: 0, y: -6 }}
                  initial={{ opacity: 0, y: 6 }}
                  key={industry.slug}
                  transition={{ duration: 0.3 }}
                >
                  {industry.title}
                </motion.p>
              </AnimatePresence>
              <p className="text-[0.7rem] font-bold tracking-[0.06em] text-[#90A0B7] uppercase">
                Auxify Inbox
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[0.65rem] font-black tracking-[0.1em] text-[#008756] uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008756] opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#008756]" />
            </span>
            Live
          </span>
        </div>

        {/* Conversation body */}
        <div className="grid min-h-[19rem] content-end gap-3 bg-[linear-gradient(180deg,#F8FBFF,#FFFFFF)] px-5 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1 }}
              className="grid gap-3"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={industry.slug}
              transition={{ duration: 0.35 }}
            >
              {/* Inbound */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="max-w-[82%] justify-self-start rounded-[18px] rounded-bl-md border border-[#E6EDF6] bg-white px-4 py-3 text-sm font-semibold text-[#07111D] shadow-[0_18px_40px_-34px_rgba(1,35,84,0.6)]"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                transition={{ duration: 0.4 }}
              >
                {industry.inbound}
              </motion.div>

              {/* AI processing */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 justify-self-start rounded-full border border-[#E6EDF6] bg-white px-3 py-1.5"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <span
                  className="grid size-5 place-items-center rounded-full text-white"
                  style={{ background: industry.accent }}
                >
                  <AiIcon className="size-3" />
                </span>
                <span className="text-[0.7rem] font-black tracking-[0.08em] text-[#5B6B82] uppercase">
                  Auxify AI is working
                </span>
                <span className="flex items-center gap-0.5">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      animate={
                        reduce ? undefined : { opacity: [0.25, 1, 0.25] }
                      }
                      className="size-1 rounded-full"
                      key={dot}
                      style={{ background: industry.accent }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: dot * 0.18,
                      }}
                    />
                  ))}
                </span>
              </motion.div>

              {/* Outcome */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="max-w-[88%] justify-self-end rounded-[18px] rounded-br-md px-4 py-3 text-sm font-bold text-white shadow-[0_22px_50px_-30px_rgba(1,35,84,0.65)]"
                initial={reduce ? false : { opacity: 0, x: 16 }}
                style={{
                  background: `linear-gradient(135deg, ${industry.accent}, ${industry.accentSoft})`,
                }}
                transition={{ delay: 0.7, duration: 0.45 }}
              >
                <span className="mb-1 flex items-center gap-1.5 text-[0.65rem] font-black tracking-[0.12em] uppercase opacity-90">
                  <Check className="size-3" />
                  Next step taken
                </span>
                {industry.step}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Focus footer */}
        <div className="flex items-center justify-between gap-3 border-t border-[#EAF1FA] px-5 py-3.5">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[-0.01em] text-[#07111D]">
            <Sparkles className="size-3.5" style={{ color: industry.accent }} />
            {industry.focus}
          </span>
          <div className="flex items-center gap-1.5">
            {industries.map((item, index) => (
              <button
                aria-label={`Show ${item.title}`}
                className="rounded-full transition-all"
                key={item.slug}
                onClick={() => setActive(index)}
                style={{
                  width: index === active ? 18 : 6,
                  height: 6,
                  background: index === active ? industry.accent : "#CBD8EA",
                }}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function tintGlow(hex: string) {
  return `radial-gradient(60% 60% at 30% 20%, ${hex}38, transparent 70%), radial-gradient(50% 50% at 80% 90%, ${hex}24, transparent 70%)`;
}

/* ------------------------------------------------------------------ */
/*  Pipeline Visual — animated conversation-to-conversion flow         */
/* ------------------------------------------------------------------ */

export function PipelineVisual({ industry }: { industry: Industry }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-[#D8E6F8] bg-white shadow-[0_40px_110px_-78px_rgba(1,35,84,0.72)]">
      {/* Grid + accent wash */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(1,75,170,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.035)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full blur-3xl"
        style={{ background: `${industry.accent}22` }}
      />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(170px,0.5fr)] lg:items-center">
        {/* Flow */}
        <ol className="relative w-full">
          {industry.flow.map((step, index) => {
            const isAgent = step === "Auxify AI";
            const isLast = index === industry.flow.length - 1;

            return (
              <motion.li
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3"
                initial={reduce ? false : { opacity: 0, x: -14 }}
                key={`${industry.slug}-${step}`}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-60px" }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              >
                <div className="relative flex justify-center">
                  <span
                    className="z-10 grid size-9 place-items-center rounded-xl border text-xs font-black"
                    style={
                      isAgent
                        ? {
                            background: industry.accent,
                            borderColor: industry.accent,
                            color: "#fff",
                          }
                        : {
                            background: "#fff",
                            borderColor: "#D8E6F8",
                            color: industry.accent,
                          }
                    }
                  >
                    {isAgent ? <AiIcon className="size-4" /> : `0${index + 1}`}
                  </span>
                  {!isLast ? (
                    <span
                      className="absolute top-9 bottom-0 w-px"
                      style={{ background: `${industry.accent}40` }}
                    />
                  ) : null}
                </div>

                <div
                  className="mb-3 rounded-xl border px-4 py-3"
                  style={
                    isAgent
                      ? {
                          background: `linear-gradient(135deg, ${industry.accent}, ${industry.accentSoft})`,
                          borderColor: industry.accent,
                          color: "#fff",
                        }
                      : { background: "#fff", borderColor: "#E2EAF4" }
                  }
                >
                  <p className="text-sm font-black tracking-[-0.02em] sm:text-base">
                    {step}
                  </p>
                  {isAgent ? (
                    <p className="mt-0.5 text-[0.65rem] font-bold tracking-[0.12em] text-white/75 uppercase">
                      captures · reasons · routes
                    </p>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Side rail */}
        <div className="grid gap-3">
          <div className="rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-4">
            <p
              className="text-[0.65rem] font-black tracking-[0.16em] uppercase"
              style={{ color: industry.accent }}
            >
              Agent actions
            </p>
            <div className="mt-3 grid gap-2">
              {agentActions.map((action, i) => (
                <motion.div
                  className="flex items-center gap-2 text-sm font-black text-[#07111D]"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  key={action}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                  viewport={{ once: true }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ background: industry.accent }}
                  />
                  {action}
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl border p-4 text-white"
            style={{
              background: `linear-gradient(150deg, #06224F, ${industry.accent})`,
              borderColor: industry.accent,
            }}
          >
            <MessagesSquare className="size-5" />
            <p className="mt-3 text-base leading-tight font-black tracking-[-0.03em]">
              Every conversation gets a next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA orbit — compact AI core with the channel ring           */
/* ------------------------------------------------------------------ */

export function CtaOrbit() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto grid size-52 place-items-center">
      <motion.span
        animate={reduce ? undefined : { rotate: 360 }}
        className="absolute inset-0 rounded-full border border-dashed border-white/25"
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        animate={reduce ? undefined : { rotate: -360 }}
        className="absolute inset-6 rounded-full border border-white/15"
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      />
      {industries.map((industry, index) => {
        const Icon = industry.icon;
        const angle = ((2 * Math.PI) / industries.length) * index - Math.PI / 2;
        const x = 50 + 44 * Math.cos(angle);
        const y = 50 + 44 * Math.sin(angle);
        return (
          <span
            className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-white shadow-[0_14px_34px_-22px_rgba(0,0,0,0.6)]"
            key={industry.slug}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: industry.accent,
            }}
          >
            <Icon className="size-4" />
          </span>
        );
      })}
      <div className="relative grid size-20 place-items-center rounded-full bg-white text-center shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.5], opacity: [0.4, 0] }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[#1B3FFF]"
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative grid justify-items-center">
          <LogoMark className="size-9" decorative />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee strip — continuous scroll of industries                    */
/* ------------------------------------------------------------------ */

export function IndustryMarquee() {
  const reduce = useReducedMotion();
  const loop = [...industries, ...industries];

  return (
    <div className="relative overflow-hidden border-y border-[#D8E6F8] bg-white/70 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] py-4 backdrop-blur">
      <motion.div
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        className="flex w-max items-center gap-3"
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <a
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-[#E2EAF4] bg-white px-4 py-2 shadow-[0_14px_36px_-32px_rgba(1,75,170,0.55)] transition hover:-translate-y-0.5"
              href={`#${industry.slug}`}
              key={`${industry.slug}-${index}`}
            >
              <span
                className="grid size-7 place-items-center rounded-lg"
                style={{ background: industry.soft, color: industry.accent }}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-black tracking-[-0.02em] whitespace-nowrap text-[#07111D]">
                {industry.title}
              </span>
              <ArrowRight className="size-3.5 text-[#90A0B7]" />
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
