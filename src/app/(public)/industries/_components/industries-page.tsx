"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  capabilities,
  industries,
  type Industry,
  pageX,
  platformStats,
} from "./industries-data";
import {
  IndustryMarquee,
  IndustryShowcase,
  PipelineVisual,
  Reveal,
} from "./industries-visuals";

export function IndustriesPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]">
      <main>
        <HeroSection />
        <IndustryGridSection />
        <IndustrySections />
        <ImpactSection />
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
          className="relative overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-[#F8FAFC]"
          id="top"
        >
          <div className="relative grid min-h-[calc(100svh-8rem)] items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
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
                Agentic customer operations
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
                  <a href="#industry-paths">
                    Explore Your Industry
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

              {/* Capability chips */}
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

            {/* Live showcase graphic */}
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

      <IndustryMarquee />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Industry grid                                                      */
/* ------------------------------------------------------------------ */

function IndustryGridSection() {
  return (
    <section
      className={cn("bg-white py-20 lg:py-28", pageX)}
      id="industry-paths"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.18em] text-[#014BAA] uppercase">
              <Compass className="size-3.5" />
              Choose your operating path
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.1rem,4.6vw,4rem)] leading-[0.96] font-black tracking-[-0.05em] text-balance text-[#07111D]">
              AI employees shaped around real industry workflows.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
              Every motion below starts with a customer signal, gives Auxify AI
              a clear job, and ends with the next commercial step already
              moving.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <IndustryCard
              delay={(index % 3) * 0.08}
              industry={industry}
              key={industry.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  delay,
  industry,
}: {
  delay: number;
  industry: Industry;
}) {
  const Icon = industry.icon;

  return (
    <Reveal as="article" delay={delay}>
      <Link
        className="group relative grid h-full min-w-0 overflow-hidden rounded-[22px] border border-[#E2EAF4] bg-[#F8FBFF] p-6 transition hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-[0_30px_80px_-56px_rgba(1,75,170,0.7)]"
        href={`/industries/${industry.slug}` as Route}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${industry.accent}26` }}
        />
        <span className="relative flex items-start justify-between gap-4">
          <span
            className="grid size-12 place-items-center rounded-xl"
            style={{ background: industry.soft, color: industry.accent }}
          >
            <Icon className="size-6" />
          </span>
          <span
            className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-[#E2EAF4] transition group-hover:translate-x-0.5"
            style={{ color: industry.accent }}
          >
            <ArrowRight className="size-4" />
          </span>
        </span>

        <span className="relative mt-6 block min-w-0 text-xl leading-tight font-black tracking-[-0.035em] break-words text-[#07111D]">
          {industry.title}
        </span>
        <span
          className="relative mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-black tracking-[0.04em] uppercase"
          style={{ background: industry.soft, color: industry.accent }}
        >
          <Sparkles className="size-3" />
          {industry.focus}
        </span>
        <span className="relative mt-4 block text-sm leading-6 font-medium text-[#4A5568]">
          {industry.description}
        </span>
        <span
          className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold"
          style={{ color: industry.accent }}
        >
          See the 7 AI employees
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Detailed industry sections                                         */
/* ------------------------------------------------------------------ */

function IndustrySections() {
  return (
    <section className={cn("bg-[#F7F8FC]", pageX)}>
      <div className="mx-auto max-w-7xl">
        {industries.map((industry, index) => (
          <IndustryUseCase
            industry={industry}
            isReversed={index % 2 === 1}
            key={industry.slug}
          />
        ))}
      </div>
    </section>
  );
}

function IndustryUseCase({
  industry,
  isReversed,
}: {
  industry: Industry;
  isReversed: boolean;
}) {
  const Icon = industry.icon;

  return (
    <article
      className="grid scroll-mt-20 gap-8 border-t border-[#DCE6F4] py-16 first:border-t-0 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-12 lg:py-20"
      id={industry.slug}
    >
      <Reveal className={cn("min-w-0", isReversed ? "lg:order-2" : "")}>
        <div className="flex items-center gap-3">
          <div
            className="inline-flex size-13 items-center justify-center rounded-xl"
            style={{ background: industry.soft, color: industry.accent }}
          >
            <Icon className="size-6" />
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-black tracking-[0.06em] uppercase"
            style={{ background: industry.soft, color: industry.accent }}
          >
            {industry.focus}
          </span>
        </div>

        <h2
          className="mt-6 max-w-2xl text-[clamp(2.2rem,4.6vw,4rem)] leading-[0.94] font-black tracking-[-0.05em] text-balance"
          style={{ color: industry.accent }}
        >
          {industry.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
          {industry.description}
        </p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {industry.outcomes.map((outcome) => (
            <div
              className="flex min-h-12 items-center gap-3 rounded-xl border border-[#E2EAF4] bg-white px-3"
              key={outcome}
            >
              <CheckCircle2
                className="size-5 shrink-0"
                style={{ color: industry.accent }}
              />
              <span className="text-sm font-bold text-[#07111D]">
                {outcome}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-full px-6 text-sm font-extrabold text-white shadow-[0_20px_48px_-30px_rgba(1,75,170,0.8)] transition hover:-translate-y-0.5"
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
            className="h-12 rounded-full border-[#D7E0EF] bg-white px-6 text-sm font-extrabold text-[#014BAA] transition hover:-translate-y-0.5 hover:bg-[#F7F8FC]"
            variant="outline"
          >
            <Link href="/sign-up">{industry.cta}</Link>
          </Button>
        </div>
      </Reveal>

      <Reveal
        className={cn("min-w-0", isReversed ? "lg:order-1" : "")}
        delay={0.1}
      >
        <PipelineVisual industry={industry} />
      </Reveal>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Impact band                                                        */
/* ------------------------------------------------------------------ */

function ImpactSection() {
  return (
    <section className={cn("bg-white py-20 lg:py-28", pageX)}>
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#014BAA] bg-[linear-gradient(150deg,#06224F,#014BAA_72%,#1B3FFF)] p-8 text-white sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-black tracking-[0.16em] uppercase backdrop-blur">
              <Sparkles className="size-3.5" />
              One system, every industry
            </p>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] font-black tracking-[-0.05em] text-balance">
              Built to move customers forward, wherever the conversation starts.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 font-medium text-white/75 sm:text-lg sm:leading-8">
              Whatever your industry, Auxify connects channels, AI employees, and
              your team into one operating layer&mdash;so no inquiry waits and
              no follow-up is forgotten.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {platformStats.map((stat, index) => (
              <Reveal
                as="div"
                className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur"
                delay={index * 0.08}
                key={stat.label}
              >
                <p className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-bold tracking-[0.02em] text-white/72 sm:text-sm">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
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
            Intelligent Operations. Human Outcomes.
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
            className="h-12 rounded-full bg-white px-7 text-sm font-extrabold text-[#014BAA] transition hover:-translate-y-0.5 hover:bg-[#EEF5FF]"
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
