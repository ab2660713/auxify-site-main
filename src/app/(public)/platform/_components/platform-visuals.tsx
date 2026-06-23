"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Bot, Brain, Sparkles, Users } from "lucide-react";

import { LogoMark } from "@/components/branding/logo";
import { cn } from "@/lib/utils";

import { orbitChannels } from "./platform-data";

/* ------------------------------------------------------------------ */
/*  Hero / System Orbit — every module orbiting the AI core            */
/* ------------------------------------------------------------------ */

export function SystemOrbit({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const radius = 43;

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[32rem] min-w-0",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-[20%] rounded-full border border-[#D8E6F8]" />

      {/* Orbiting icons — container rotates, each icon counter-rotates to stay upright */}
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        {orbitChannels.map((channel, index) => {
          const Icon = channel.icon;
          const angle =
            ((2 * Math.PI) / orbitChannels.length) * index - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              key={channel.label}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                animate={reduce ? undefined : { rotate: -360 }}
                className="flex flex-col items-center gap-1.5"
                style={{ willChange: "transform" }}
                transition={{
                  duration: 48,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-[#DCE6F4] bg-white text-[#0a0a0a] shadow-[0_18px_44px_-30px_rgba(1,75,170,0.7)] sm:size-14">
                  <Icon className="size-5 sm:size-6" />
                </span>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-[0.65rem] font-black tracking-[-0.01em] text-[#07111D] backdrop-blur sm:text-xs">
                  {channel.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Core */}
      <div className="absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#014BAA] bg-[#014BAA] text-center text-white shadow-[0_30px_80px_-40px_rgba(1,75,170,0.9)] sm:size-32">
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.5], opacity: [0.4, 0] }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[#1B3FFF]"
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative grid justify-items-center">
          <span className="grid size-12 place-items-center rounded-full bg-white sm:size-14">
            <LogoMark className="size-8 sm:size-9" decorative />
          </span>
          <span className="mt-1.5 text-[0.6rem] font-black tracking-[0.18em] uppercase sm:text-xs">
            Auxify AI
          </span>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Handoff Flow — AI front line escalates to human team               */
/* ------------------------------------------------------------------ */

export function HandoffFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
      <motion.div
        className="rounded-[24px] border border-[#DCE6F4] bg-white p-7 shadow-[0_44px_120px_-90px_rgba(1,35,84,0.7)]"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-[#EAF2FF] text-[#1B3FFF]">
          <Bot className="size-7" />
        </span>
        <p className="mt-5 text-xl font-black tracking-[-0.04em] text-[#07111D]">
          AI employees handle the front line
        </p>
        <p className="mt-2 text-sm leading-6 font-medium text-[#4A5568]">
          Capture, qualify, answer, route, and resolve automatically across
          every channel&mdash;24/7.
        </p>
        <div className="mt-5 flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
              className="h-1.5 flex-1 rounded-full bg-[#BFD1FF]"
              key={i}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      <div className="flex flex-row items-center justify-center gap-2 lg:flex-col">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-black tracking-[0.12em] text-[#0a0a0a] uppercase ring-1 ring-[#D8E6F8]">
          <Sparkles className="size-3.5" />
          Escalate
        </span>
        <motion.span
          animate={reduce ? undefined : { x: [0, 6, 0] }}
          className="grid size-12 place-items-center rounded-full bg-[#014BAA] text-white shadow-[0_18px_40px_-24px_rgba(1,75,170,0.9)] lg:rotate-90"
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <ArrowRight className="size-5" />
        </motion.span>
      </div>

      <motion.div
        className="rounded-[24px] border border-[#014BAA] bg-[linear-gradient(150deg,#06224F,#014BAA)] p-7 text-white"
        initial={reduce ? false : { opacity: 0, x: 24 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-white/14">
          <Users className="size-7" />
        </span>
        <p className="mt-5 text-xl font-black tracking-[-0.04em]">
          Your team takes over instantly
        </p>
        <p className="mt-2 text-sm leading-6 font-medium text-white/78">
          Agents receive everything they need to continue the conversation
          without missing a beat.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[#7BE3C3]">
          <span className="size-2 animate-pulse rounded-full bg-[#7BE3C3]" />
          Context transferred
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Training Core — knowledge ingested into aligned AI                 */
/* ------------------------------------------------------------------ */

export function TrainingCore() {
  const reduce = useReducedMotion();

  return (
    <div className="relative grid place-items-center overflow-hidden rounded-[24px] border border-[#014BAA] bg-[linear-gradient(150deg,#06224F,#014BAA)] p-10 text-center text-white">
      {[0, 1].map((i) => (
        <motion.span
          animate={
            reduce ? undefined : { scale: [0.6, 1.4], opacity: [0.35, 0] }
          }
          className="pointer-events-none absolute size-32 rounded-full bg-[#1B3FFF]"
          key={i}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 1.75,
            ease: "easeOut",
          }}
        />
      ))}
      <span className="relative grid justify-items-center">
        <motion.span
          animate={reduce ? undefined : { rotate: [0, 6, -6, 0] }}
          className="grid size-20 place-items-center rounded-full bg-white"
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Brain className="size-10 text-[#0a0a0a]" />
        </motion.span>
        <span className="mt-4 text-lg font-black tracking-[-0.03em]">
          Aligned AI employees
        </span>
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-white/78">
          <Sparkles className="size-3.5" />
          Your knowledge, your workflows
        </span>
      </span>
    </div>
  );
}
