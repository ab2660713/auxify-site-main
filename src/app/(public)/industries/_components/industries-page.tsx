"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import Logo from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  capabilities,
  industries,
  pageX,
} from "./industries-data";
import {
  IndustryShowcase,
  PipelineVisual,
} from "./industries-visuals";

export function IndustriesPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]">
      <main>
        <HeroSection />
        <OverviewSection />
        <IndustrySections />
        <FinalCtaSection />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1680px] p-3 sm:p-4">
        <div
          className="relative overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-[linear-gradient(135deg,#EEF4FF_0%,#F0EEFF_40%,#E8F4FF_70%,#F8FAFC_100%)]"
          id="top"
        >
          <div className="relative grid min-h-[calc(100svh-8rem)] items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <motion.div
              className="text-center lg:text-left"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-[#1B3FFF]/20 bg-[#1B3FFF]/5 px-3.5 py-2 text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">
                <Bot className="size-4" />
              
              </p>

              <h1 className="mt-7 max-w-2xl text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-balance text-[#07111D] max-lg:mx-auto">
                Every industry has a conversation. We turn it into revenue.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 font-medium text-[#4A5568] sm:text-xl sm:leading-8 lg:mx-0">
                Auxify helps communication-heavy businesses capture inquiries
                faster, automate follow-ups with AI employees, and keep every
                customer conversation moving from first contact to conversion.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#1B3FFF] px-6 text-sm font-extrabold text-white shadow-lg shadow-[#1B3FFF]/25 transition hover:-translate-y-0.5 hover:bg-[#3B5EFF]"
                >
                  <a href="#industry-details">
                    Explore Your Industry
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="h-12 rounded-full border-[#E2E8F0] bg-white px-6 text-sm font-extrabold text-[#07111D] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
                  variant="outline"
                >
                  <Link href="/contact">Book a Demo</Link>
                </Button>
              </div>

              <div className="mt-9 flex flex-wrap justify-center gap-2 lg:justify-start">
                {capabilities.map((capability) => {
                  const Icon = capability.icon;
                  return (
                    <span
                      className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-black text-[#07111D]"
                      key={capability.label}
                    >
                      <Icon className="size-3.5 text-[#1B3FFF]" />
                      {capability.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            >
              <IndustryShowcase />
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Overview — stats | logo | capabilities                             */
/* ------------------------------------------------------------------ */

const overviewStats = [
  { value: "98%", label: "Leads Coverage", color: "#1B3FFF" },
  { value: "3.2×", label: "Revenue Generated", color: "#008756" },
  { value: "67%", label: "Deals Closed Faster", color: "#6D4AFF" },
  { value: "80%", label: "Admin Automated", color: "#D97800" },
  { value: "₹12L+", label: "Money Recovered", color: "#E0427A" },
] as const;

function OverviewSection() {
  return (
    <section className={cn("bg-white py-16 lg:py-24", pageX)}>
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 text-center">
          <p className="text-xs font-black tracking-[0.18em] text-[#0a0a0a] uppercase">
            Platform Overview
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-[1] font-black tracking-[-0.04em] text-[#07111D]">
            One AI system powering every metric that matters
          </h2>
        </div>

        {/* Visual layout */}
        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_280px_1fr]">
          {/* Dashed connector lines (desktop only) */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg className="size-full" preserveAspectRatio="none">
              <line
                x1="32%"
                y1="50%"
                x2="43%"
                y2="50%"
                stroke="#014BAA"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.25"
              />
              <line
                x1="57%"
                y1="50%"
                x2="68%"
                y2="50%"
                stroke="#014BAA"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.25"
              />
            </svg>
          </div>

          {/* Left — Capabilities */}
          <div className="relative flex flex-col gap-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  className="group flex items-center gap-4 rounded-2xl border border-[#E2EAF4] bg-white px-5 py-4 shadow-[0_2px_12px_-4px_rgba(1,75,170,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(1,75,170,0.15)]"
                  key={cap.label}
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#014BAA]/8">
                    <Icon className="size-5 text-[#0a0a0a]" />
                  </div>
                  <span className="text-sm font-bold text-[#07111D]">
                    {cap.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center — Auxify Logo hub */}
          <div className="relative flex flex-col items-center justify-center py-8">
            {/* Outer ring */}
            <div className="absolute size-64 rounded-full border border-dashed border-[#014BAA]/15" />
            <div className="absolute size-52 rounded-full border border-[#014BAA]/8" />
            {/* Logo circle */}
            <div className="relative flex size-36 items-center justify-center rounded-full bg-[linear-gradient(145deg,#014BAA,#1B3FFF)] shadow-[0_24px_64px_-16px_rgba(1,75,170,0.55)]">
              <div className="flex size-20 items-center justify-center rounded-full bg-white/95 shadow-inner">
                <Logo size="3rem" decorative />
              </div>
            </div>
            <p className="mt-5 text-base font-black tracking-widest text-[#0a0a0a] uppercase">
              Auxify AI
            </p>
            <p className="mt-1 text-xs font-medium text-[#4A5568]">
              Intelligence Engine
            </p>
          </div>

          {/* Right — Stats */}
          <div className="relative flex flex-col gap-3">
            {overviewStats.map((stat) => (
              <div
                className="group flex items-center gap-4 rounded-2xl border border-[#E2EAF4] bg-white px-5 py-4 shadow-[0_2px_12px_-4px_rgba(1,75,170,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(1,75,170,0.15)]"
                key={stat.label}
              >
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${stat.color}12` }}
                >
                  <span
                    className="text-lg font-black"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#07111D]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Detailed industry sections — tabbed                                */
/* ------------------------------------------------------------------ */

function IndustrySections() {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (pausedRef.current) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % industries.length);
      setKey((k) => k + 1);
    }, 5000);
    setKey((k) => k + 1);
  }, [stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const handleClick = (index: number) => {
    pausedRef.current = true;
    stopTimer();
    setActive(index);
    setKey((k) => k + 1);
  };

  const handleMouseEnter = () => {
    pausedRef.current = true;
    stopTimer();
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    startTimer();
  };

  const industry = industries[active];
  const Icon = industry.icon;

  return (
    <section
      className={cn("bg-white py-16 lg:py-24", pageX)}
      id="industry-details"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto max-w-7xl">
        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((ind, i) => {
            const TabIcon = ind.icon;
            return (
              <button
                className={cn(
                  "relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5",
                  i === active
                    ? "border-[#014BAA] bg-[#014BAA] text-white shadow-[0_8px_24px_-8px_rgba(1,75,170,0.6)]"
                    : "border-[#DCE6F4] bg-white text-[#07111D] hover:border-[#BFD1FF] hover:bg-[#F8FBFF]",
                )}
                key={ind.slug}
                onClick={() => handleClick(i)}
                type="button"
              >
                <TabIcon className="size-4 shrink-0" />
                {ind.title}
                {i === active && !pausedRef.current && (
                  <motion.span
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 h-[2.5px] w-full origin-left bg-white/50"
                    initial={{ scaleX: 0 }}
                    key={key}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active industry content */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[28px] border border-[#DCE6F4] bg-white shadow-[0_44px_120px_-80px_rgba(1,35,84,0.7)]"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: 16 }}
              key={industry.slug}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid lg:grid-cols-[1fr_1.1fr]">
                {/* Left — info */}
                <div className="p-7 sm:p-10">
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex size-12 items-center justify-center rounded-xl"
                      style={{ background: industry.soft, color: industry.accent }}
                    >
                      <Icon className="size-6" />
                    </div>
                  </div>

                  <h2
                    className="mt-5 text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[0.96] font-black tracking-[-0.04em]"
                    style={{ color: industry.accent }}
                  >
                    {industry.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 font-medium text-[#4A5568]">
                    {industry.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {industry.outcomes.map((outcome) => (
                      <div
                        className="flex items-center gap-2.5 rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-3"
                        key={outcome}
                      >
                        <CheckCircle2
                          className="size-4 shrink-0"
                          style={{ color: industry.accent }}
                        />
                        <span className="text-xs font-bold text-[#07111D]">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      className="h-11 rounded-full px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${industry.accent}, ${industry.accentSoft})`,
                      }}
                    >
                      <Link href={`/industries/${industry.slug}` as Route}>
                        Explore the 7 AI employees
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-11 rounded-full border-[#D7E0EF] bg-white px-6 text-sm font-extrabold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#F7F8FC]"
                      variant="outline"
                    >
                      <Link href="https://app.auxify.live/sign-up">{industry.cta}</Link>
                    </Button>
                  </div>
                </div>

                {/* Right — pipeline visual */}
                <div className="border-l border-[#DCE6F4] bg-[#F8FBFF] p-5 max-lg:border-t max-lg:border-l-0 sm:p-7">
                  <PipelineVisual industry={industry} />
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCtaSection() {
  return (
    <section className="bg-[#014BAA] px-4 py-16 text-white sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.32fr)] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black tracking-[0.16em] uppercase ring-1 ring-white/18">
            <BriefcaseBusiness className="size-4" />
            
          </p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] font-black tracking-[-0.07em] text-balance">
            Give every inquiry in your industry a clear next step.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 font-semibold text-white/76 sm:text-lg sm:leading-8">
            Capture conversations faster, automate customer workflows with AI,
            and help every team move customers forward from one connected
            platform.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="h-12 rounded-full bg-white px-7 text-sm font-extrabold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#EEF5FF]"
          >
            <Link href="https://app.auxify.live/sign-up">
              Start Free Trial
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full border-white/28 bg-white/10 px-7 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16"
            variant="outline"
          >
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
