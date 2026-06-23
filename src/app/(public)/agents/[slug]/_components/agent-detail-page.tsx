"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  UserRound,
  Workflow,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AgentVisual } from "../../../platform/_components/agent-visual";
import {
  agents,
  type AiAgent,
  pageX,
} from "../../../platform/_components/platform-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOW_STEPS = [
  {
    icon: MessageCircle,
    label: "Engages instantly",
    hint: "Voice & chat, 24/7",
  },
  {
    icon: Workflow,
    label: "Acts on your workflows",
    hint: "Automated, on-brand",
  },
  {
    icon: UserRound,
    label: "Hands off with context",
    hint: "Full history to humans",
  },
] as const;

export function AgentDetailPage({ slug }: { slug: string }) {
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    return null;
  }

  const accent = agent.accent;

  return (
    <div
      className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <main>
        <HeroSection agent={agent} />
        <FlowSection accent={accent} />
        <CapabilitiesSection agent={agent} />
        <OutcomesSection agent={agent} />
        <CtaSection agent={agent} />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroSection({ agent }: { agent: AiAgent }) {
  const reduce = useReducedMotion();
  const accent = agent.accent;
  const Icon = agent.icon;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[1680px] p-3 sm:p-4">
        <div
          className="relative overflow-hidden rounded-[28px] border border-[#BFD1FF]/70 shadow-[0_44px_130px_-64px_rgba(1,75,170,0.5)]"
          style={{
            background: `linear-gradient(135deg, ${accent}14, #EEF5FF 46%, #ffffff)`,
          }}
        >
          {/* floating accent glows */}
          <motion.div
            animate={
              reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }
            }
            className="pointer-events-none absolute -top-24 right-[-6%] size-[440px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accent}38, transparent 70%)`,
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(1,75,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.035)_1px,transparent_1px)] bg-[size:26px_26px]" />

          <div className="relative grid items-center gap-10 px-5 py-14 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
            {/* Copy */}
            <motion.div
              className="text-center lg:text-left"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: EASE }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3.5 py-2 text-xs font-black tracking-[0.16em] uppercase backdrop-blur"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                <span
                  className="grid size-5 place-items-center rounded-full text-white"
                  style={{ backgroundColor: accent }}
                >
                  <Icon className="size-3" />
                </span>
                AI Employee
              </span>

              <h1 className="mt-6 max-w-2xl text-[clamp(2.3rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance text-[#07111D] max-lg:mx-auto">
                {agent.title}
              </h1>

              <p
                className="mt-5 max-w-xl text-lg leading-7 font-bold tracking-[-0.01em] max-lg:mx-auto sm:text-xl"
                style={{ color: accent }}
              >
                {agent.tagline}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  className="h-12 rounded-full px-6 text-sm font-extrabold text-white shadow-[0_24px_56px_-28px_rgba(1,75,170,0.95)] transition hover:-translate-y-0.5"
                  style={{ backgroundColor: accent }}
                >
                  <Link href="/sign-up">
                    Book a Demo
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-[#BFD1FF] bg-white/70 px-6 text-sm font-extrabold text-[#07111D] backdrop-blur transition hover:-translate-y-0.5"
                >
                  <Link href="/agents">Explore agents</Link>
                </Button>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              className="relative"
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-[24px] border border-white/70 bg-white/55 p-3 shadow-[0_44px_120px_-70px_rgba(1,35,84,0.7)] backdrop-blur-xl">
                <AgentVisual
                  accent={accent}
                  className="h-[300px] rounded-[18px] sm:h-[380px]"
                  kind={agent.visual}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works — 3-step flow                                        */
/* ------------------------------------------------------------------ */

function FlowSection({ accent }: { accent: string }) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("py-16 sm:py-20", pageX)}>
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
        {FLOW_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              className="relative overflow-hidden rounded-[22px] border border-[#E2ECF8] bg-white p-7 shadow-[0_40px_110px_-90px_rgba(1,35,84,0.7)]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              key={step.label}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            >
              <span
                className="text-7xl font-black tabular-nums"
                style={{ color: `${accent}1A` }}
              >
                {`0${i + 1}`}
              </span>
              <span
                className="mt-2 grid size-12 place-items-center rounded-2xl text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#07111D]">
                {step.label}
              </h3>
              <p className="mt-1 text-sm font-bold text-[#4A5568]">
                {step.hint}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Capabilities — animated chip cloud                                */
/* ------------------------------------------------------------------ */

function CapabilitiesSection({ agent }: { agent: AiAgent }) {
  const reduce = useReducedMotion();
  const accent = agent.accent;

  return (
    <section
      className={cn("py-16 sm:py-24", pageX)}
      style={{ background: `linear-gradient(180deg, #ffffff, ${accent}08)` }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-xs font-black tracking-[0.16em] uppercase"
          style={{ borderColor: `${accent}33`, color: accent }}
        >
          <Zap className="size-3.5" />
          What it handles
        </span>
        <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-[#07111D]">
          Built to run the repetitive work end to end
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {agent.capabilities.map((cap, i) => (
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF8] bg-white px-4 py-2.5 text-sm font-bold text-[#07111D] shadow-[0_20px_60px_-50px_rgba(1,35,84,0.7)]"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              key={cap}
              transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
              viewport={{ once: true }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {cap}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Outcomes — impact cards                                           */
/* ------------------------------------------------------------------ */

function OutcomesSection({ agent }: { agent: AiAgent }) {
  const reduce = useReducedMotion();
  const accent = agent.accent;

  return (
    <section className={cn("py-16 sm:py-24", pageX)}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-xs font-black tracking-[0.16em] uppercase"
              style={{ borderColor: `${accent}33`, color: accent }}
            >
              <Sparkles className="size-3.5" />
              Outcomes
            </span>
            <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-[#07111D]">
              The results teams feel from day one
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agent.outcomes.map((outcome, i) => (
            <motion.div
              className="group relative overflow-hidden rounded-[22px] border border-[#E2ECF8] bg-white p-7 shadow-[0_40px_110px_-90px_rgba(1,35,84,0.7)] transition hover:-translate-y-1"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              key={outcome}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full blur-2xl transition group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${accent}26, transparent 70%)`,
                  opacity: 0.6,
                }}
              />
              <span
                className="grid size-11 place-items-center rounded-xl text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                <CheckCircle2 className="size-5" />
              </span>
              <p className="mt-5 text-lg font-black tracking-[-0.02em] text-[#07111D]">
                {outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

function CtaSection({ agent }: { agent: AiAgent }) {
  const reduce = useReducedMotion();
  const accent = agent.accent;

  return (
    <section className={cn("pb-20", pageX)}>
      <motion.div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 py-16 text-center text-white shadow-[0_44px_130px_-64px_rgba(1,75,170,0.7)] sm:px-12"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: EASE }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        style={{
          background: `linear-gradient(135deg, ${accent}, #06224F)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
            Put this agent to work in your operation
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base font-medium text-white/80 sm:text-lg">
            See it handle real conversations inside your workflows.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-white px-7 text-sm font-extrabold text-[#07111D] shadow-lg transition hover:-translate-y-0.5"
            >
              <Link href="/sign-up">
                Book a Demo
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/40 bg-transparent px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
