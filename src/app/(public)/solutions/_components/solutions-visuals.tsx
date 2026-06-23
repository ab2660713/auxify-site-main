"use client";

import { motion, useReducedMotion } from "motion/react";

import { LogoMark } from "@/components/branding/logo";
import { cn } from "@/lib/utils";

import {
  operatingLayer,
  teamInputs,
  type FlowStep,
  type TeamSolution,
} from "./solutions-data";

/* ------------------------------------------------------------------ */
/*  Convergence Map — teams funnel into the AI core, fan out to layer  */
/* ------------------------------------------------------------------ */

const TOP_X = [12.5, 37.5, 62.5, 87.5];
const BOTTOM_X = [10, 30, 50, 70, 90];

export function ConvergenceMap() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* Animated connector lines (desktop) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="solFlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1B3FFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#1B3FFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1B3FFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {TOP_X.map((x, i) => (
          <motion.line
            animate={reduce ? undefined : { strokeDashoffset: [12, 0] }}
            key={`t-${x}`}
            stroke="url(#solFlow)"
            strokeDasharray="3 3"
            strokeWidth="0.5"
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.15,
            }}
            x1={x}
            x2="50"
            y1="13"
            y2="50"
          />
        ))}
        {BOTTOM_X.map((x, i) => (
          <motion.line
            animate={reduce ? undefined : { strokeDashoffset: [0, 12] }}
            key={`b-${x}`}
            stroke="url(#solFlow)"
            strokeDasharray="3 3"
            strokeWidth="0.5"
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.12,
            }}
            x1="50"
            x2={x}
            y1="50"
            y2="87"
          />
        ))}
      </svg>

      <div className="relative grid gap-7">
        {/* Teams in */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {teamInputs.map((team) => {
            const Icon = team.icon;
            return (
              <div
                className="flex min-h-15 items-center gap-2.5 rounded-2xl border border-[#DCE6F4] bg-white/90 px-3 py-2.5 shadow-[0_18px_46px_-40px_rgba(1,75,170,0.6)] backdrop-blur"
                key={team.label}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#EAF0FF] text-[#1B3FFF]">
                  <Icon className="size-4.5" />
                </span>
                <span className="min-w-0 truncate text-sm font-black tracking-[-0.02em] text-[#07111D]">
                  {team.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* AI core */}
        <div className="flex justify-center">
          <div className="relative grid size-30 place-items-center rounded-full border border-[#014BAA] bg-[linear-gradient(150deg,#06224F,#014BAA)] text-center text-white shadow-[0_34px_90px_-44px_rgba(1,75,170,0.95)] sm:size-34">
            <motion.span
              animate={
                reduce ? undefined : { scale: [1, 1.55], opacity: [0.4, 0] }
              }
              className="pointer-events-none absolute inset-0 rounded-full bg-[#1B3FFF]"
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative grid justify-items-center">
              <span className="grid size-13 place-items-center rounded-full bg-white shadow-[0_18px_44px_-28px_rgba(1,35,84,0.8)] sm:size-15">
                <LogoMark className="size-8 sm:size-9" decorative />
              </span>
              <span className="mt-1.5 text-[0.62rem] font-black tracking-[0.2em] uppercase sm:text-xs">
                Auxify AI
              </span>
            </span>
          </div>
        </div>

        {/* Operating layer out */}
        <div className="grid grid-cols-2 gap-2.5 min-[420px]:grid-cols-3 sm:grid-cols-5">
          {operatingLayer.map((item) => {
            const Icon = item.icon;
            return (
              <div
                className="flex min-h-14 flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#DCE6F4] bg-[#F8FBFF] px-2 py-3 text-center"
                key={item.label}
              >
                <span className="grid size-8 place-items-center rounded-lg bg-white text-[#0a0a0a] ring-1 ring-[#D8E6F8]">
                  <Icon className="size-4" />
                </span>
                <span className="text-[0.72rem] leading-3 font-black text-[#0a0a0a]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Flow — animated pipeline with a travelling pulse              */
/* ------------------------------------------------------------------ */

export function TeamFlow({ team }: { team: TeamSolution }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#D8E6F8] bg-white shadow-[0_36px_100px_-72px_rgba(1,35,84,0.72)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(1,75,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div
        className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: team.accent }}
      />

      <div className="relative grid gap-2.5 p-5 sm:p-7">
        {team.flow.map((step, index) => (
          <FlowNode
            accent={team.accent}
            index={index}
            isLast={index === team.flow.length - 1}
            key={step.label}
            reduce={!!reduce}
            soft={team.soft}
            step={step}
            total={team.flow.length}
          />
        ))}
      </div>
    </div>
  );
}

function FlowNode({
  accent,
  index,
  isLast,
  reduce,
  soft,
  step,
  total,
}: {
  accent: string;
  index: number;
  isLast: boolean;
  reduce: boolean;
  soft: string;
  step: FlowStep;
  total: number;
}) {
  const Icon = step.icon;

  return (
    <div className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3">
      {/* Rail + node */}
      <div className="relative flex h-full justify-center">
        <span
          className="z-10 grid size-11 place-items-center rounded-xl text-white shadow-[0_16px_40px_-26px_rgba(1,75,170,0.8)]"
          style={{
            backgroundColor: step.isAI ? "#014BAA" : accent,
          }}
        >
          <Icon className="size-5" />
        </span>
        {!isLast ? (
          <span className="absolute top-11 bottom-[-0.625rem] w-0.5 overflow-hidden rounded-full bg-[#E2E8F0]">
            <motion.span
              animate={reduce ? undefined : { y: ["-100%", "200%"] }}
              className="absolute inset-x-0 h-1/2 rounded-full"
              style={{
                background: `linear-gradient(180deg, transparent, ${accent})`,
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.18,
              }}
            />
          </span>
        ) : null}
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
          step.isAI
            ? "border-[#014BAA] bg-[#014BAA] text-white"
            : "border-[#DCE6F4] bg-white/90 text-[#07111D]",
        )}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-black tracking-[-0.02em] sm:text-base">
            {step.label}
          </p>
          {step.isAI ? (
            <p className="mt-0.5 text-[0.62rem] font-bold tracking-[0.16em] text-white/70 uppercase">
              captures · reasons · routes
            </p>
          ) : null}
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md px-2 py-0.5 text-[0.65rem] font-black tabular-nums",
            step.isAI ? "bg-white/15 text-white" : "text-[#94A3B8]",
          )}
          style={
            step.isAI ? undefined : { backgroundColor: soft, color: accent }
          }
        >
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
