"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AgentVisual } from "../../../platform/_components/agent-visual";
import {
  industries,
  type Industry,
  pageX,
} from "../../_components/industries-data";
import { PipelineVisual, Reveal } from "../../_components/industries-visuals";
import {
  getIndustryAgents,
  type ResolvedIndustryAgent,
} from "../../_components/industry-agents-data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function IndustryDetailPage({ slug }: { slug: string }) {
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return null;
  }

  const agents = getIndustryAgents(slug);

  return (
    <div
      className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]"
      style={{ "--accent": industry.accent } as React.CSSProperties}
    >
      <main>
        <HeroSection industry={industry} />
        <AgentsSection agents={agents} industry={industry} />
        <WorkflowSection industry={industry} />
        <CtaSection industry={industry} />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroSection({ industry }: { industry: Industry }) {
  const reduce = useReducedMotion();
  const Icon = industry.icon;

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F8FC]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-[34rem] rounded-full blur-3xl"
        style={{ background: `${industry.accent}1A` }}
      />
      <div className={cn("relative mx-auto max-w-7xl py-16 lg:py-24", pageX)}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASE }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4A5568] transition hover:text-[#0a0a0a] sm:hidden"
              href="/industries"
            >
              <ArrowLeft className="size-4" />
              All industries
            </Link>

            <div className="flex items-center gap-3 sm:mt-0">
              <span
                className="grid size-14 place-items-center rounded-2xl"
                style={{ background: industry.soft, color: industry.accent }}
              >
                <Icon className="size-7" />
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-black tracking-[0.06em] uppercase"
                style={{ background: industry.soft, color: industry.accent }}
              >
                {industry.focus}
              </span>
            </div>

            <h1
              className="mt-6 max-w-2xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.92] font-black tracking-[-0.05em] text-balance"
              style={{ color: industry.accent }}
            >
              {industry.title} AI Employees
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
              {industry.description}
            </p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D8E6F8] bg-white px-3.5 py-2 text-sm font-black text-[#07111D]">
              <Bot className="size-4" style={{ color: industry.accent }} />
              Seven specialized AI employees
              <span className="text-[#90A0B7]">·</span>
              <span className="font-bold text-[#4A5568]">
                one connected system
              </span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full px-6 text-sm font-extrabold text-white shadow-[0_24px_56px_-28px_rgba(1,75,170,0.95)] transition hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${industry.accent}, ${industry.accentSoft})`,
                }}
              >
                <Link href="https://app.auxify.live/sign-up">
                  {industry.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full border-[#D7E0EF] bg-white px-6 text-sm font-extrabold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#F7F8FC]"
                variant="outline"
              >
                <a href="#agents">Meet the agents</a>
              </Button>
            </div>
          </motion.div>

          {/* Inbound → AI step preview */}
          <motion.div
            className="min-w-0"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-[#D8E6F8] bg-white p-6 shadow-[0_44px_120px_-72px_rgba(1,35,84,0.7)] sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full blur-3xl"
                style={{ background: `${industry.accent}1F` }}
              />
              <div className="relative flex items-center justify-between">
                <span className="text-[0.7rem] font-black tracking-[0.12em] text-[#90A0B7] uppercase">
                  Auxify Inbox
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[0.62rem] font-black tracking-[0.1em] text-[#008756] uppercase">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008756] opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[#008756]" />
                  </span>
                  Live
                </span>
              </div>

              <div className="relative mt-5 max-w-[88%] rounded-2xl rounded-tl-sm border border-[#EAF1FA] bg-[#F7F8FC] px-4 py-3 text-sm font-medium text-[#07111D]">
                {industry.inbound}
              </div>

              <div className="relative mt-3 ml-auto flex max-w-[92%] items-start gap-2.5">
                <span
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-white"
                  style={{ background: industry.accent }}
                >
                  <Bot className="size-4" />
                </span>
                <div
                  className="rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${industry.accent}, ${industry.accentSoft})`,
                  }}
                >
                  {industry.step}
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-2">
                {industry.outcomes.slice(0, 4).map((outcome) => (
                  <div
                    className="flex items-center gap-2 rounded-xl border border-[#E2EAF4] bg-white px-3 py-2"
                    key={outcome}
                  >
                    <CheckCircle2
                      className="size-4 shrink-0"
                      style={{ color: industry.accent }}
                    />
                    <span className="truncate text-xs font-bold text-[#07111D]">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Agents grid                                                        */
/* ------------------------------------------------------------------ */

function AgentsSection({
  agents,
  industry,
}: {
  agents: ResolvedIndustryAgent[];
  industry: Industry;
}) {
  return (
    <section className={cn("bg-white py-20 lg:py-28", pageX)} id="agents">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.18em] text-[#0a0a0a] uppercase">
            <Sparkles className="size-3.5" />
            Seven agents, one team
          </p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[0.96] font-black tracking-[-0.05em] text-balance text-[#07111D]">
            AI employees built for {industry.title.toLowerCase()}.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
            Each agent handles a specific job end to end—capturing the
            conversation, acting on your workflows, and handing off to your team
            with full context.
          </p>
        </Reveal>

        <div className="mt-8">
          {agents.map((agent, index) => (
            <AgentUseCase
              accent={industry.accent}
              agent={agent}
              isReversed={index % 2 === 1}
              key={agent.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentUseCase({
  accent,
  agent,
  isReversed,
}: {
  accent: string;
  agent: ResolvedIndustryAgent;
  isReversed: boolean;
}) {
  const Icon = agent.icon;

  return (
    <article className="grid scroll-mt-20 gap-8 border-t border-[#DCE6F4] py-12 first:border-t-0 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-12 lg:py-16">
      <Reveal className={cn("min-w-0", isReversed ? "lg:order-2" : "")}>
        <div className="flex items-center gap-3">
          <span
            className="grid size-13 shrink-0 place-items-center rounded-xl"
            style={{ background: `${accent}14`, color: accent }}
          >
            <Icon className="size-6" />
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-black tracking-[0.06em] uppercase"
            style={{ background: `${accent}14`, color: accent }}
          >
            {agent.role}
          </span>
        </div>

        <h3 className="mt-6 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[0.96] font-black tracking-[-0.045em] text-balance text-[#07111D]">
          {agent.title}
        </h3>
        <p
          className="mt-3 max-w-xl text-lg leading-7 font-bold tracking-[-0.02em]"
          style={{ color: accent }}
        >
          {agent.tagline}
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
          {agent.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {agent.capabilities.map((capability) => (
            <span
              className="inline-flex items-center rounded-full border border-[#E2EAF4] bg-[#F8FBFF] px-2.5 py-1 text-[0.72rem] font-bold text-[#4A5568]"
              key={capability}
            >
              {capability}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {agent.outcomes.map((outcome) => (
            <div
              className="flex min-h-12 items-center gap-2.5 rounded-xl border border-[#E2EAF4] bg-white px-3"
              key={outcome}
            >
              <CheckCircle2
                className="size-5 shrink-0"
                style={{ color: accent }}
              />
              <span className="text-sm font-bold text-[#07111D]">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal
        className={cn("min-w-0", isReversed ? "lg:order-1" : "")}
        delay={0.1}
      >
        <div className="relative overflow-hidden rounded-[28px] border border-[#E2EAF4] bg-[#F8FBFF] p-3 shadow-[0_44px_120px_-72px_rgba(1,35,84,0.7)] sm:p-4">
          <AgentVisual
            accent={accent}
            className="h-[260px] sm:h-[300px]"
            kind={agent.visual}
          />
        </div>
      </Reveal>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Workflow                                                           */
/* ------------------------------------------------------------------ */

function WorkflowSection({ industry }: { industry: Industry }) {
  return (
    <section className={cn("bg-[#F7F8FC] py-20 lg:py-28", pageX)}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-12">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.18em] text-[#0a0a0a] uppercase">
            <Sparkles className="size-3.5" />
            {industry.focus}
          </p>
          <h2 className="mt-4 max-w-xl text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] font-black tracking-[-0.05em] text-balance text-[#07111D]">
            How the conversation moves forward.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
            Every {industry.title.toLowerCase()} agent runs on the same
            connected flow—so no inquiry waits and no follow-up is forgotten.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <PipelineVisual industry={industry} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

function CtaSection({ industry }: { industry: Industry }) {
  return (
    <section
      className={cn("relative overflow-hidden bg-white py-20 lg:py-28", pageX)}
    >
      <div
        className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[32px] border p-8 text-white sm:p-12 lg:p-16"
        style={{
          borderColor: industry.accent,
          background: `linear-gradient(150deg, #06224F, ${industry.accent} 74%, ${industry.accentSoft})`,
        }}
      >
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-black tracking-[0.16em] uppercase backdrop-blur">
            <Sparkles className="size-3.5" />
            Intelligent Operations. Human Outcomes.
          </p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.6rem)] leading-[0.96] font-black tracking-[-0.05em] text-balance">
            Put all seven {industry.title.toLowerCase()} AI employees to work.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 font-medium text-white/80 sm:text-lg sm:leading-8">
            Capture conversations faster, automate follow-ups with AI, and move
            every customer forward from one connected platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-white px-6 text-sm font-extrabold text-[#0a0a0a] shadow-[0_24px_56px_-28px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5"
              style={{ color: industry.accent }}
            >
              <Link href="https://app.auxify.live/sign-up">
                {industry.cta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full border-white/40 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              variant="outline"
            >
              <Link href="/industries">Explore other industries</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
