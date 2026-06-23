"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Layers,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  pageX,
  teams,
  type TeamSolution,
} from "./solutions-data";
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
} from "./solutions-motion";
import { ConvergenceMap, TeamFlow } from "./solutions-visuals";

export function SolutionsPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]">
      <main>
        <HeroSection />
        <TeamSolutionsSection />
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
          <div className="relative grid items-center gap-10 px-5 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
            {/* Copy */}
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

              <h1 className="mt-7 max-w-2xl text-[clamp(2.5rem,5.4vw,4.4rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance text-[#07111D] max-lg:mx-auto">
                One platform for every customer-facing team.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 font-medium text-[#4A5568] sm:text-xl sm:leading-8 lg:mx-0">
                Sales, support, marketing, and operations work
                differently&mdash;but every conversation should stay connected.
                Auxify brings it all into one shared, AI-powered workspace.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#1B3FFF] px-6 text-sm font-extrabold text-white shadow-lg shadow-[#1B3FFF]/25 transition hover:-translate-y-0.5 hover:bg-[#3B5EFF]"
                >
                  <a href="#team-solutions">
                    Explore Solutions
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="h-12 rounded-full border-[#E2E8F0] bg-white px-6 text-sm font-extrabold text-[#07111D] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
                  variant="outline"
                >
                  <Link href="/sign-up">Book a Demo</Link>
                </Button>
              </div>
            </motion.div>

            {/* Convergence visual */}
            <motion.div
              className="rounded-[26px] border border-[#E2E8F0] bg-white p-4 shadow-lg sm:p-6"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            >
              <ConvergenceMap />
              <p className="mt-5 border-l-2 border-[#1B3FFF] pl-4 text-sm leading-6 font-bold text-[#07111D]">
                Every team works differently. Auxify connects them all.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Solutions — tabbed with auto-rotate                           */
/* ------------------------------------------------------------------ */

function TeamSolutionsSection() {
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
      setActive((prev) => (prev + 1) % teams.length);
      setKey((k) => k + 1);
    }, 4000);
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

  const team = teams[active];
  const Icon = team.icon;

  return (
    <section
      className={cn("bg-white py-16 lg:py-24", pageX)}
      id="team-solutions"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow=""
          eyebrowIcon={Layers}
          lead="Each team gets a workflow shaped around its goals—while every conversation, record, and handoff stays connected."
          title="One connected AI operating layer."
        />

        {/* Team tabs — single row */}
        <div className="mt-12 grid grid-cols-4 gap-2">
          {teams.map((t, i) => {
            const TabIcon = t.icon;
            return (
              <button
                className={cn(
                  "group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border px-4 py-3 text-center transition hover:-translate-y-0.5",
                  i === active
                    ? "border-[#014BAA] bg-[#014BAA] text-white shadow-[0_12px_32px_-12px_rgba(1,75,170,0.7)]"
                    : "border-[#DCE6F4] bg-white text-[#07111D] hover:border-[#BFD1FF] hover:bg-[#F8FBFF]",
                )}
                key={t.slug}
                onClick={() => handleClick(i)}
                type="button"
              >
                <TabIcon className="size-4 shrink-0" />
                <span className="text-sm font-black tracking-[-0.02em]">
                  {t.title}
                </span>
                {i === active && !pausedRef.current && (
                  <motion.span
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 h-[2.5px] w-full origin-left bg-white/50"
                    initial={{ scaleX: 0 }}
                    key={key}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active team content */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[28px] border border-[#DCE6F4] bg-white shadow-[0_44px_120px_-80px_rgba(1,35,84,0.7)]"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: 16 }}
              key={team.slug}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid lg:grid-cols-[1fr_1.1fr]">
                {/* Left — info */}
                <div className="p-7 sm:p-10">
                  <div
                    className="inline-flex size-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: team.soft, color: team.accent }}
                  >
                    <Icon className="size-7" />
                  </div>

                  <h2 className="mt-5 text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[0.96] font-black tracking-[-0.04em] text-[#0a0a0a]">
                    {team.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 font-bold tracking-[-0.01em] text-[#4A5568] sm:text-lg">
                    {team.tagline}
                  </p>

                  {/* Outcomes as square cards */}
                  <div className="mt-7 grid grid-cols-2 gap-2.5">
                    {team.outcomes.map((outcome) => (
                      <div
                        className="flex items-center gap-2.5 rounded-2xl border border-[#DCE6F4] bg-[#F8FBFF] p-3.5 shadow-[0_4px_12px_-6px_rgba(1,35,84,0.08)]"
                        key={outcome}
                      >
                        <CheckCircle2
                          className="size-4.5 shrink-0"
                          style={{ color: team.accent }}
                        />
                        <span className="text-xs font-bold text-[#07111D]">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="mt-8 h-12 rounded-full px-6 text-sm font-extrabold text-white shadow-[0_20px_48px_-30px_rgba(1,75,170,0.8)] transition hover:-translate-y-0.5"
                    style={{ backgroundColor: team.accent }}
                  >
                    <Link href="/sign-up">
                      {team.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>

                {/* Right — flow visual */}
                <div className="border-l border-[#DCE6F4] bg-[#F8FBFF] p-5 max-lg:border-t max-lg:border-l-0 sm:p-7">
                  <TeamFlow team={team} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-1.5">
          {teams.map((_, i) => (
            <button
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-8 bg-[#014BAA]"
                  : "w-1.5 bg-[#D8E6F8] hover:bg-[#BFD1FF]",
              )}
              key={i}
              onClick={() => handleClick(i)}
              type="button"
            />
          ))}
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
            <Network className="size-4" />
            
          </p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] font-black tracking-[-0.07em] text-balance">
            Give every team one source of customer truth.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 font-semibold text-white/76 sm:text-lg sm:leading-8">
            Capture every inquiry, automate every workflow, and let AI employees
            coordinate every interaction from one connected platform.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="h-12 rounded-full bg-white px-7 text-sm font-extrabold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#EEF5FF]"
          >
            <Link href="/sign-up">
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
