"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ModuleVisual } from "./module-visual";
import { AgentVisual } from "./agent-visual";
import {
  agents,
  type AiAgent,
  agentVoiceResponses,
  handoffContext,
  handoffTriggers,
  modules,
  pageX,
  type PlatformModule,
} from "./platform-data";
import {
  Reveal,
  SectionHeading,
} from "./platform-motion";
import { HandoffFlow, SystemOrbit } from "./platform-visuals";

export function PlatformPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]">
      <main>
        <HeroSection />
        <ModulesSection />
        <AgentsSection />
        <HandoffSection />
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
          <div className="relative grid min-h-[calc(100svh-10rem)] items-center gap-8 px-5 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            {/* Copy */}
            <motion.div
              className="text-center lg:text-left"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-[#1B3FFF]/20 bg-[#1B3FFF]/5 px-3.5 py-2 text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1B3FFF] opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#1B3FFF]" />
                </span>
                AI-native customer operations
              </p>

              <h1 className="mt-7 max-w-2xl text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance text-[#07111D] max-lg:mx-auto">
                AI-powered customer operations built to accelerate revenue
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 font-medium text-[#4A5568] sm:text-xl sm:leading-8 lg:mx-0">
                Auxify connects conversations, customer data, workflows, and AI
                employees in one platform&mdash;so you respond faster, convert more
                leads, and scale without adding headcount.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#1B3FFF] px-6 text-sm font-extrabold text-white shadow-lg shadow-[#1B3FFF]/25 transition hover:-translate-y-0.5 hover:bg-[#3B5EFF]"
                >
                  <Link href="/sign-up">
                    Book a Demo
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-12 rounded-full border-[#E2E8F0] bg-white px-6 text-sm font-extrabold text-[#07111D] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
                  variant="outline"
                >
                  <a href="#modules">Explore Platform Modules</a>
                </Button>
              </div>

            </motion.div>

            {/* Orbit graphic */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            >
              <SystemOrbit />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Modules                                                            */
/* ------------------------------------------------------------------ */

function ModulesSection() {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % modules.length);
        setKey((k) => k + 1);
      }
    }, 6000);
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleClick = (index: number) => {
    setActive(index);
    pausedRef.current = true;
    setKey((k) => k + 1);
  };

  const handleHover = (index: number) => {
    setActive(index);
    pausedRef.current = true;
    setKey((k) => k + 1);
  };

  const handleLeave = () => {
    pausedRef.current = false;
  };

  const module = modules[active];
  const Icon = module.icon;

  return (
    <section
      className={cn("relative bg-[#F7FBFF] py-20 lg:py-28", pageX)}
      id="modules"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Platform modules"
          eyebrowIcon={Layers}
          lead="Nine modules work as one connected system for marketing, sales, support, and operations—no more switching between disconnected tools."
          title={<>Everything your team needs&mdash;in one platform</>}
        />

        {/* Tab navigation with icons */}
        <Reveal className="mt-10" delay={0.1}>
          <nav className="flex flex-wrap justify-center gap-2">
            {modules.map((m, i) => {
              const TabIcon = m.icon;
              return (
                <button
                  className={cn(
                    "relative flex items-center gap-1.5 overflow-hidden rounded-full border px-4 py-2 text-xs font-bold transition hover:-translate-y-0.5",
                    i === active
                      ? "border-[#014BAA] bg-[#014BAA] text-white shadow-[0_8px_24px_-8px_rgba(1,75,170,0.6)]"
                      : "border-[#D8E6F8] bg-white text-[#014BAA] hover:border-[#BFD1FF] hover:bg-[#EAF2FF]",
                  )}
                  key={m.slug}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => handleHover(i)}
                  onMouseLeave={handleLeave}
                  type="button"
                >
                  <TabIcon className="size-3.5" />
                  {m.title}
                  {i === active && (
                    <motion.span
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-white/50"
                      initial={{ scaleX: 0 }}
                      key={key}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </Reveal>

        {/* Module content card */}
        <div
          className="mt-12"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={handleLeave}
        >
          <AnimatePresence mode="wait">
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[26px] border border-[#DCE6F4] bg-white shadow-[0_44px_120px_-86px_rgba(1,35,84,0.7)]"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: 16 }}
              key={module.slug}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left — content */}
                <div className="p-6 sm:p-9">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-black tracking-tighter text-[#DCE6F4] sm:text-5xl">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-2xl",
                        module.soft,
                      )}
                      style={{ color: module.accent }}
                    >
                      <Icon className="size-7" />
                    </span>
                  </div>

                  <h3 className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.02] font-black tracking-[-0.04em] text-[#07111D]">
                    {module.title}
                  </h3>
                  <p
                    className="mt-2 text-sm font-black tracking-[-0.01em]"
                    style={{ color: module.accent }}
                  >
                    {module.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-6 font-medium text-[#4A5568] sm:text-base sm:leading-7">
                    {module.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mt-7">
                    <p
                      className="text-[0.7rem] font-black tracking-[0.16em] uppercase"
                      style={{ color: module.accent }}
                    >
                      Core capabilities
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {module.capabilities.map((capability) => (
                        <span
                          className="inline-flex items-center gap-2 rounded-xl border border-[#EAEFF7] bg-[#FBFCFE] px-3 py-1.5 text-xs font-bold text-[#07111D]"
                          key={capability}
                        >
                          <span
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: module.accent }}
                          />
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Business impact — square boxes */}
                  <div className="mt-7">
                    <p
                      className="text-[0.7rem] font-black tracking-[0.16em] uppercase"
                      style={{ color: module.accent }}
                    >
                      Business impact
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {module.impact.map((item) => (
                        <span
                          className="flex items-center gap-2.5 rounded-2xl border border-[#DCE6F4] bg-[#F7FBFF] p-3.5 text-xs font-bold text-[#07111D] shadow-[0_4px_12px_-6px_rgba(1,35,84,0.1)]"
                          key={item}
                        >
                          <CheckCircle2
                            className="size-4 shrink-0"
                            style={{ color: module.accent }}
                          />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — visual */}
                <div
                  className={cn(
                    "relative flex items-center justify-center overflow-hidden border-l border-[#DCE6F4] max-lg:border-t max-lg:border-l-0",
                    module.soft,
                  )}
                >
                  <ModuleVisual accent={module.accent} kind={module.visual} />
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Step indicator */}
        <div className="mt-6 flex justify-center gap-1.5">
          {modules.map((_, i) => (
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
/*  Agents                                                             */
/* ------------------------------------------------------------------ */

function AgentsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % agents.length);
      }
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleAgentClick = (index: number) => {
    setActiveIndex(index);
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  const selectedAgent = agents[activeIndex];

  return (
    <section
      className={cn("relative overflow-hidden bg-white py-20 lg:py-28", pageX)}
      id="ai-agents"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI employees"
          eyebrowIcon={Bot}
          lead="Each employee is built for a specific function, works inside your channels, follows your rules, and hands off to your team the moment human action is needed."
          title={<>AI employees built for real customer-facing operations</>}
        />

        {/* Agent tabs */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-3"
          onMouseLeave={handleMouseLeave}
        >
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            const isActive = i === activeIndex;

            return (
              <button
                className={cn(
                  "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300",
                  isActive
                    ? "border-[#014BAA] bg-[#014BAA] text-white shadow-[0_12px_36px_-12px_rgba(1,75,170,0.6)]"
                    : "border-[#DCE6F4] bg-white text-[#07111D] hover:border-[#BFD1FF] hover:bg-[#F7FBFF]",
                )}
                key={agent.slug}
                onClick={() => handleAgentClick(i)}
                onMouseEnter={() => handleAgentClick(i)}
                type="button"
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-300",
                    isActive ? "bg-white/20 text-white" : "text-white",
                  )}
                  style={{ backgroundColor: isActive ? "rgba(255,255,255,0.2)" : agent.accent }}
                >
                  <Icon className="size-4" />
                </span>
                {agent.title}
              </button>
            );
          })}
        </div>

        {/* Detail panel — always visible, switches with active agent */}
        <div
          className="mt-8"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              initial={{ opacity: 0, y: 16 }}
              key={selectedAgent.slug}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <AgentDetailPanel
                agent={selectedAgent}
                onClose={() => {
                  pausedRef.current = false;
                  startTimer();
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Team control note */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-[#DCE6F4] bg-[#F7FBFF] px-6 py-4">
            <ShieldCheck className="size-5 shrink-0 text-[#014BAA]" />
            <p className="text-sm font-medium text-[#4A5568]">
              Your team always stays in control&mdash;with full visibility into what AI handled and when human handoff is needed.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AgentDetailPanel({
  agent,
  onClose,
}: {
  agent: AiAgent;
  onClose: () => void;
}) {
  const Icon = agent.icon;
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);
  const [displayedResponse, setDisplayedResponse] = useState<string | null>(null);

  const voiceResponses = agentVoiceResponses[agent.slug] || {};

  const speakCapability = useCallback((capability: string, key: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (speakingItem === key) {
      setSpeakingItem(null);
      setDisplayedResponse(null);
      return;
    }

    const response = voiceResponses[capability] || `Yes, I can ${capability.toLowerCase()}. This is one of my core abilities that helps your team work more efficiently.`;

    setDisplayedResponse(response);

    const utterance = new SpeechSynthesisUtterance(response);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.lang = "en-US";

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Microsoft Zira"),
    );
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      setSpeakingItem(null);
    };
    utterance.onerror = () => {
      setSpeakingItem(null);
    };

    setSpeakingItem(key);
    window.speechSynthesis.speak(utterance);
  }, [speakingItem, voiceResponses]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#DCE6F4] bg-white shadow-[0_44px_120px_-60px_rgba(1,35,84,0.5)]">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — content */}
        <div className="p-7 sm:p-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg"
                style={{ backgroundColor: agent.accent }}
              >
                <Icon className="size-7" />
              </span>
              <div>
                <h3 className="text-[clamp(1.4rem,2.4vw,1.8rem)] leading-[1.08] font-black tracking-[-0.04em] text-[#07111D]">
                  {agent.title}
                </h3>
                <p
                  className="mt-1 text-sm font-bold"
                  style={{ color: agent.accent }}
                >
                  {agent.tagline}
                </p>
              </div>
            </div>
            <button
              className="grid size-9 shrink-0 place-items-center rounded-full border border-[#DCE6F4] bg-[#F7FBFF] text-[#4A5568] transition hover:bg-[#EEF2F7]"
              onClick={onClose}
              type="button"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
          </div>

          <p className="mt-5 text-sm leading-7 font-medium text-[#4A5568] sm:text-base sm:leading-7">
            {agent.description}
          </p>

          {/* What it can do — clickable with AI voice */}
          <div className="mt-7">
            <div className="flex items-center gap-2">
              <p
                className="text-[0.7rem] font-black tracking-[0.16em] uppercase"
                style={{ color: agent.accent }}
              >
                What it can do
              </p>
              <span className="rounded-full border border-[#DCE6F4] bg-[#F7FBFF] px-2 py-0.5 text-[0.6rem] font-bold text-[#4A5568]">
                <Volume2 className="mr-1 inline size-2.5" />
                click to hear AI explain
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {agent.capabilities.map((cap, i) => {
                const isSpeaking = speakingItem === `cap-${i}`;
                return (
                  <motion.button
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all duration-200",
                      isSpeaking
                        ? "border-[#014BAA] bg-[#EAF2FF] text-[#014BAA] shadow-[0_4px_16px_-6px_rgba(1,75,170,0.3)]"
                        : "border-[#EAEFF7] bg-[#FBFCFE] text-[#07111D] hover:border-[#BFD1FF] hover:bg-[#EAF2FF]",
                    )}
                    initial={{ opacity: 0, x: -8 }}
                    key={cap}
                    onClick={() => speakCapability(cap, `cap-${i}`)}
                    transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    type="button"
                  >
                    {isSpeaking ? (
                      <span className="relative flex size-4 shrink-0 items-center justify-center">
                        <span className="absolute inline-flex size-4 animate-ping rounded-full opacity-40" style={{ backgroundColor: agent.accent }} />
                        <Volume2 className="relative size-3.5" style={{ color: agent.accent }} />
                      </span>
                    ) : (
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: agent.accent }}
                      />
                    )}
                    {cap}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Business outcomes */}
          <div className="mt-7">
            <p
              className="text-[0.7rem] font-black tracking-[0.16em] uppercase"
              style={{ color: agent.accent }}
            >
              Business outcomes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.outcomes.map((outcome, i) => (
                <motion.span
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#DCE6F4] bg-[#F7FBFF] px-3.5 py-2 text-xs font-bold text-[#07111D] shadow-[0_4px_12px_-6px_rgba(1,35,84,0.08)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  key={outcome}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                >
                  <CheckCircle2
                    className="size-4 shrink-0"
                    style={{ color: agent.accent }}
                  />
                  {outcome}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — AI response + visual */}
        <div
          className="relative flex flex-col overflow-hidden border-l border-[#DCE6F4] max-lg:border-t max-lg:border-l-0"
          style={{ background: `linear-gradient(135deg, ${agent.accent}08, ${agent.accent}04)` }}
        >
          <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-8">
            {/* AI response bubble */}
            <AnimatePresence mode="wait">
              {displayedResponse ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-[360px]"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 12 }}
                  key={displayedResponse}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="rounded-2xl border border-[#DCE6F4] bg-white p-5 shadow-[0_12px_40px_-16px_rgba(1,35,84,0.2)]">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-lg text-white"
                        style={{ backgroundColor: agent.accent }}
                      >
                        <Bot className="size-4" />
                      </span>
                      <span className="text-xs font-black text-[#07111D]">
                        {agent.title}
                      </span>
                      {speakingItem && (
                        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#EAF2FF] px-2 py-0.5 text-[0.6rem] font-bold text-[#014BAA]">
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#014BAA] opacity-60" />
                            <span className="relative inline-flex size-2 rounded-full bg-[#014BAA]" />
                          </span>
                          speaking
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 font-medium text-[#4A5568]">
                      {displayedResponse}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex w-full max-w-[320px] flex-col items-center text-center"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AgentVisual
                    accent={agent.accent}
                    className="w-full"
                    kind={agent.visual}
                  />
                  <div className="mt-5 rounded-2xl border border-[#DCE6F4] bg-white/80 px-5 py-3 backdrop-blur">
                    <p className="text-xs font-bold text-[#4A5568]">
                      Click any capability to hear AI explain it
                    </p>
                    <p className="mt-1 text-[0.65rem] font-medium text-[#4A5568]/70">
                      AI answers like a real assistant
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Handoff                                                            */
/* ------------------------------------------------------------------ */

function HandoffSection() {
  return (
    <section
      className={cn("relative bg-[#F7FBFF] py-20 lg:py-28", pageX)}
      id="handoff"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Human handoff"
          eyebrowIcon={ShieldCheck}
          lead="AI handles repetitive, high-volume work. Your team handles high-value conversations—and Auxify escalates instantly with full context, so nothing gets lost in the handoff."
          title={<>When your team needs to step in</>}
        />

        <Reveal className="mt-12">
          <HandoffFlow />
        </Reveal>

        <Reveal className="mt-6 grid gap-5 lg:grid-cols-2" delay={0.1}>
          <div className="rounded-[24px] border border-[#DCE6F4] bg-white p-7">
            <p className="text-[0.7rem] font-black tracking-[0.16em] text-[#014BAA] uppercase">
              Example handoff triggers
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {handoffTriggers.map((trigger) => (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6F4] bg-[#F7FBFF] px-3 py-1.5 text-xs font-bold text-[#07111D]"
                  key={trigger}
                >
                  <Zap className="size-3.5 text-[#D97800]" />
                  {trigger}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#014BAA] bg-[linear-gradient(150deg,#06224F,#014BAA)] p-7 text-white">
            <p className="text-[0.7rem] font-black tracking-[0.16em] text-white/80 uppercase">
              Agents receive everything they need
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {handoffContext.map((item) => (
                <span
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-xs font-bold backdrop-blur"
                  key={item}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#7BE3C3]" />
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 border-t border-white/15 pt-4 text-sm font-medium text-white/78">
              No context is lost. No handoff confusion. Just a seamless
              transition from AI to human.
            </p>
          </div>
        </Reveal>
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
            <Sparkles className="size-4" />
            One platform. Every interaction.
          </p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] font-black tracking-[-0.07em] text-balance">
            Ready to stop losing customers between tools?
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 font-semibold text-white/76 sm:text-lg sm:leading-8">
            See how Auxify unifies your CRM, conversations, automations, and AI
            employees into one customer operations platform.
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
