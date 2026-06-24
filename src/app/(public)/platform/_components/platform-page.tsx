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
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ModuleVisual } from "./module-visual";
import { AgentVisual } from "./agent-visual";
import {
  agents,
  agentVoiceResponses,
  type AiAgent,
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
          className="relative overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-[linear-gradient(135deg,#EEF4FF_0%,#F0EEFF_40%,#E8F4FF_70%,#F8FAFC_100%)]"
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
              <h1 className="max-w-2xl text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance text-[#07111D] max-lg:mx-auto">
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
                  <Link href="/contact">
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
      className={cn("relative bg-white py-20 lg:py-28", pageX)}
      id="modules"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow=""
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
                      : "border-[#D8E6F8] bg-white text-[#0a0a0a] hover:border-[#BFD1FF] hover:bg-[#EAF2FF]",
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
          eyebrow=""
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
            <ShieldCheck className="size-5 shrink-0 text-[#0a0a0a]" />
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
  const [activeCapability, setActiveCapability] = useState<number | null>(null);

  const handleCapabilityClick = (index: number) => {
    setActiveCapability(activeCapability === index ? null : index);
  };

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

          {/* What it can do — clickable to visualize */}
          <div className="mt-7">
            <div className="flex items-center gap-2">
              <p
                className="text-[0.7rem] font-black tracking-[0.16em] uppercase"
                style={{ color: agent.accent }}
              >
                What it can do
              </p>
              <span className="rounded-full border border-[#DCE6F4] bg-[#F7FBFF] px-2 py-0.5 text-[0.6rem] font-bold text-[#4A5568]">
                <Zap className="mr-1 inline size-2.5" />
                click to see it in action
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {agent.capabilities.map((cap, i) => {
                const isActive = activeCapability === i;
                return (
                  <motion.button
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all duration-200",
                      isActive
                        ? "border-[#014BAA] bg-[#EAF2FF] text-[#0a0a0a] shadow-[0_4px_16px_-6px_rgba(1,75,170,0.3)]"
                        : "border-[#EAEFF7] bg-[#FBFCFE] text-[#07111D] hover:border-[#BFD1FF] hover:bg-[#EAF2FF]",
                    )}
                    initial={{ opacity: 0, x: -8 }}
                    key={cap}
                    onClick={() => handleCapabilityClick(i)}
                    transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    type="button"
                  >
                    <span
                      className={cn(
                        "shrink-0 rounded-full transition-all",
                        isActive ? "size-2.5" : "size-1.5",
                      )}
                      style={{ backgroundColor: agent.accent }}
                    />
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

        {/* Right — workflow visualization */}
        <div
          className="relative flex flex-col overflow-hidden border-l border-[#DCE6F4] max-lg:border-t max-lg:border-l-0"
          style={{ background: `linear-gradient(135deg, ${agent.accent}08, ${agent.accent}04)` }}
        >
          <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {activeCapability !== null ? (
                <CapabilityVisualization
                  accent={agent.accent}
                  agentSlug={agent.slug}
                  agentTitle={agent.title}
                  capability={agent.capabilities[activeCapability]}
                  key={`${agent.slug}-${activeCapability}`}
                />
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex w-full max-w-[320px] flex-col items-center text-center"
                  initial={{ opacity: 0 }}
                  key="default"
                  transition={{ duration: 0.3 }}
                >
                  <AgentVisual
                    accent={agent.accent}
                    className="w-full"
                    kind={agent.visual}
                  />
                  <div className="mt-5 rounded-2xl border border-[#DCE6F4] bg-white/80 px-5 py-3 backdrop-blur">
                    <p className="text-xs font-bold text-[#4A5568]">
                      Click any capability to see it in action
                    </p>
                    <p className="mt-1 text-[0.65rem] font-medium text-[#4A5568]/70">
                      Watch how AI handles each step
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
/*  Capability Visualization — animated step-by-step workflow          */
/* ------------------------------------------------------------------ */

function CapabilityVisualization({
  accent,
  agentSlug,
  agentTitle,
  capability,
}: {
  accent: string;
  agentSlug: string;
  agentTitle: string;
  capability: string;
}) {
  const voiceResponse = agentVoiceResponses[agentSlug]?.[capability] || `I can help you with "${capability}". Let me handle this for you automatically.`;
  const suggestions = getChatSuggestions(agentSlug, capability);

  type ChatMsg = { role: "user" | "agent"; text: string };
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "user", text: capability },
    { role: "agent", text: voiceResponse },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [currentSuggestions, setCurrentSuggestions] = useState(suggestions);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputVal("");
    setIsTyping(true);

    const response = getAgentReply(agentSlug, text);
    const newSuggestions = getChatSuggestions(agentSlug, text);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "agent", text: response }]);
      setCurrentSuggestions(newSuggestions);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleSuggestionClick = (s: string) => {
    sendMessage(s);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full w-full max-w-[360px] flex-col"
      exit={{ opacity: 0, y: -8 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex max-h-[480px] flex-col overflow-hidden rounded-2xl border border-[#DCE6F4] bg-white shadow-[0_12px_40px_-12px_rgba(1,35,84,0.15)]">
        {/* Chat header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-[#DCE6F4] bg-white px-4 py-3">
          <span
            className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-md"
            style={{ backgroundColor: accent }}
          >
            <Bot className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-[#07111D]">
              {agentTitle}
            </p>
            <p className="flex items-center gap-1.5 text-[0.65rem] font-medium text-[#008756]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008756] opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#008756]" />
              </span>
              Online
            </p>
          </div>
        </div>

        {/* Chat body — scrollable */}
        <div ref={chatBodyRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" style={{ maxHeight: "320px" }}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex gap-2"}>
              {msg.role === "agent" && (
                <span
                  className="mt-1 grid size-6 shrink-0 place-items-center rounded-lg text-white"
                  style={{ backgroundColor: accent }}
                >
                  <Bot className="size-3" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[85%] px-4 py-2.5",
                  msg.role === "user"
                    ? "rounded-2xl rounded-br-sm bg-[#1B3FFF]"
                    : "rounded-2xl rounded-bl-sm border border-[#E2E8F0] bg-[#F8FAFC]",
                )}
              >
                <p
                  className={cn(
                    "text-xs leading-[1.7] font-medium",
                    msg.role === "user" ? "text-white" : "text-[#4A5568]",
                  )}
                >
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2">
              <span
                className="mt-1 grid size-6 shrink-0 place-items-center rounded-lg text-white"
                style={{ backgroundColor: accent }}
              >
                <Bot className="size-3" />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-[#4A5568]/40" style={{ animationDelay: "0ms" }} />
                <span className="size-1.5 animate-bounce rounded-full bg-[#4A5568]/40" style={{ animationDelay: "150ms" }} />
                <span className="size-1.5 animate-bounce rounded-full bg-[#4A5568]/40" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Suggestion pills */}
          {!isTyping && currentSuggestions.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {currentSuggestions.map((s) => (
                <button
                  className="cursor-pointer rounded-full border px-3 py-1.5 text-[0.65rem] font-bold transition hover:bg-[#EAF2FF]"
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  style={{ borderColor: `${accent}30`, color: accent }}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat input */}
        <form className="shrink-0 border-t border-[#DCE6F4] bg-white px-4 py-3" onSubmit={handleInputSubmit}>
          <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
            <input
              className="flex-1 bg-transparent text-xs text-[#07111D] outline-none placeholder:text-[#4A5568]/50"
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a message..."
              type="text"
              value={inputVal}
            />
            <button
              className="grid size-7 place-items-center rounded-lg text-white transition hover:opacity-80"
              style={{ backgroundColor: accent }}
              type="submit"
            >
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function getChatSuggestions(agentSlug: string, capability: string): string[] {
  const cap = capability.toLowerCase();

  if (agentSlug === "sales") {
    if (cap.includes("capture") || cap.includes("lead")) return ["Show captured leads", "Lead sources", "Auto-response settings"];
    if (cap.includes("qualif")) return ["Qualification criteria", "Scoring model", "View pipeline"];
    if (cap.includes("follow")) return ["Follow-up schedule", "Message templates", "Response rate"];
    if (cap.includes("book") || cap.includes("demo")) return ["Check availability", "Calendar sync", "Booking link"];
    if (cap.includes("route") || cap.includes("hot")) return ["Routing rules", "Rep assignment", "Priority settings"];
    return ["Pipeline overview", "Lead status", "Team activity"];
  }
  if (agentSlug === "support") {
    if (cap.includes("faq") || cap.includes("answer")) return ["Top FAQs", "Knowledge base", "Update answers"];
    if (cap.includes("ticket") || cap.includes("issue")) return ["Open tickets", "Priority queue", "SLA status"];
    if (cap.includes("escalat") || cap.includes("urgency")) return ["Escalation rules", "Priority matrix", "Alert settings"];
    return ["Resolution rate", "Response time", "Customer feedback"];
  }
  if (agentSlug === "recruitment") {
    if (cap.includes("screen")) return ["Screening criteria", "Applicant pool", "Shortlist"];
    if (cap.includes("schedule") || cap.includes("interview")) return ["Interview slots", "Panel setup", "Calendar"];
    return ["Open positions", "Candidate pipeline", "Hiring metrics"];
  }
  if (agentSlug === "billing") {
    if (cap.includes("remind") || cap.includes("payment")) return ["Payment status", "Overdue list", "Send reminder"];
    if (cap.includes("invoice")) return ["Pending invoices", "Generate invoice", "Payment history"];
    return ["Collection rate", "Outstanding amount", "Billing report"];
  }
  if (agentSlug === "research") {
    if (cap.includes("survey")) return ["Run survey", "Competitor analysis", "Trends report"];
    if (cap.includes("response") || cap.includes("capture")) return ["View responses", "Export data", "Segments"];
    return ["Survey templates", "Response rate", "Insights"];
  }
  if (agentSlug === "receptionist") {
    if (cap.includes("welcome") || cap.includes("inquir")) return ["Greeting setup", "Queue status", "Response time"];
    if (cap.includes("schedule") || cap.includes("appointment")) return ["Today's schedule", "Book slot", "Reminders"];
    return ["Visitor log", "Department routing", "After-hours setup"];
  }
  if (agentSlug === "it-helpdesk") {
    if (cap.includes("troubleshoot")) return ["Common fixes", "Reset password", "Network check"];
    if (cap.includes("ticket") || cap.includes("create")) return ["New ticket", "My tickets", "Priority"];
    return ["System status", "Known issues", "Submit request"];
  }

  return ["Tell me more", "How does this work?", "Show example"];
}

function getAgentReply(agentSlug: string, userMsg: string): string {
  const msg = userMsg.toLowerCase();

  if (agentSlug === "sales") {
    if (msg.includes("captured leads") || msg.includes("show")) return "You have 23 new leads today. 8 from website, 9 from WhatsApp, 4 from calls, and 2 from social media. 5 are marked high-intent and ready for your sales team.";
    if (msg.includes("lead sources") || msg.includes("source")) return "Your top lead sources this week: WhatsApp (38%), Website forms (28%), Inbound calls (19%), Social DMs (15%). WhatsApp leads convert 2.3x faster on average.";
    if (msg.includes("auto-response")) return "Auto-responses are active on all channels. Average first response time: 8 seconds. I greet every new lead, capture their details, and ask initial qualifying questions before routing.";
    if (msg.includes("qualification") || msg.includes("criteria")) return "Current qualification criteria: Budget > ₹50K/month, Decision timeline < 30 days, Company size > 10 employees. I ask these naturally in conversation without making it feel like a form.";
    if (msg.includes("scoring") || msg.includes("model")) return "Lead scoring model: Intent signals (40%), Budget match (25%), Timeline urgency (20%), Engagement level (15%). Scores above 75 auto-route to your senior reps.";
    if (msg.includes("pipeline") || msg.includes("view")) return "Pipeline snapshot: 47 leads in qualification, 12 in demo-scheduled, 8 in proposal stage, 3 closing this week. Total pipeline value: ₹18.5L.";
    if (msg.includes("follow-up") || msg.includes("schedule")) return "Active follow-ups: 34 leads pending Day-1 follow-up, 12 pending Day-3 check-in, 8 pending final nudge. All messages are personalized based on their last interaction.";
    if (msg.includes("template") || msg.includes("message")) return "Using 6 active templates: Welcome (92% open rate), Demo invite (78%), Pricing share (85%), Gentle nudge (71%), Case study (89%), Last chance (68%). All adapt based on the lead's context.";
    if (msg.includes("response rate")) return "Current response rates: First message — 94% delivered, 67% replied. Follow-up #1 — 82% delivered, 41% replied. Overall conversion from lead to meeting: 23%.";
    if (msg.includes("availability") || msg.includes("calendar")) return "Checking your team calendar... 3 slots available tomorrow: 10:30 AM, 2:00 PM, 4:30 PM. Shall I offer these to leads who are ready for a demo?";
    if (msg.includes("routing") || msg.includes("rules")) return "Routing rules active: Enterprise leads (>50 seats) → Rahul, SMB leads → Priya, Technical questions → Amit, International inquiries → Sneha. Each gets full conversation context.";
    if (msg.includes("rep assignment") || msg.includes("assignment")) return "Current assignment: Rahul has 12 active leads (capacity: 15), Priya has 8 (capacity: 12), Amit has 14 (capacity: 15). I balance load automatically.";
    if (msg.includes("priority")) return "Priority levels: P1 (hot, respond in 5 min) — 3 leads, P2 (warm, respond in 1 hour) — 8 leads, P3 (nurture, respond in 24h) — 26 leads.";
    return "I'm managing your sales pipeline 24/7. Currently tracking 67 active leads across all channels. I qualify, follow up, book demos, and route to your team — all automatically. What would you like to know more about?";
  }
  if (agentSlug === "support") {
    if (msg.includes("top faqs") || msg.includes("faq")) return "Top 5 FAQs this week: 1. Pricing plans (142 asks), 2. Integration setup (98), 3. Billing cycle (76), 4. Feature availability (61), 5. Account changes (54). All answered instantly with 96% satisfaction.";
    if (msg.includes("knowledge base") || msg.includes("knowledge")) return "Knowledge base: 340 articles indexed, covering product features, troubleshooting, billing, and policies. Updated 12 articles this week based on new customer questions. Auto-learning is ON.";
    if (msg.includes("update answers") || msg.includes("update")) return "I found 8 questions this week that I couldn't answer confidently. I've drafted suggested answers for your team to review. Once approved, I'll use them instantly for future queries.";
    if (msg.includes("open tickets") || msg.includes("tickets")) return "Open tickets: 14 total — 2 critical (SLA breaching in 1h), 5 high priority, 7 normal. I resolved 31 tickets today without human help. 3 are pending team review.";
    if (msg.includes("priority queue") || msg.includes("queue")) return "Priority queue: 2 VIP customers waiting (avg wait: 3 min), 1 payment-related escalation, 4 technical issues being processed. I'm handling routine ones while flagging complex cases.";
    if (msg.includes("sla status") || msg.includes("sla")) return "SLA performance: 98.2% first response within target (< 2 min). 94% resolution within 4 hours. 2 tickets at risk of SLA breach — already escalated to your team.";
    if (msg.includes("escalation") || msg.includes("rules")) return "Escalation triggers: Customer mentions 'cancel' or 'legal', sentiment drops below 30%, issue unresolved after 3 exchanges, VIP customer flag, payment dispute. All escalate with full context.";
    if (msg.includes("resolution rate") || msg.includes("resolution")) return "This week: 89% of conversations resolved without human help. Average resolution time: 47 seconds for FAQ, 3.2 minutes for guided troubleshooting. Customer satisfaction: 4.7/5.";
    if (msg.includes("response time") || msg.includes("response")) return "Average first response: 6 seconds (AI), 4.2 minutes (human handoff). Compared to industry average of 12 hours. Your customers never wait.";
    return "I'm handling customer support across all channels right now. 89% of queries resolved without human help today. What specific area would you like to explore?";
  }
  if (agentSlug === "recruitment") {
    if (msg.includes("screening") || msg.includes("criteria")) return "Active screening criteria for open roles: Minimum 2 years experience, relevant tech stack match, location preference, availability within 30 days. Screening 45 new applications today.";
    if (msg.includes("applicant pool") || msg.includes("applicant")) return "Current pool: 128 total applicants across 5 open positions. 34 passed initial screening, 18 shortlisted for interviews, 6 in final round.";
    if (msg.includes("shortlist")) return "Shortlisted candidates: 18 across all roles. Top 5 scored above 85% match. I've sent interview invites to 12 and waiting on 6 confirmations.";
    if (msg.includes("interview") || msg.includes("slots")) return "Interview schedule this week: 8 slots filled, 4 available. Tomorrow: 2 interviews for Senior Dev role, 1 for Product Manager. All candidates received prep material.";
    if (msg.includes("open positions") || msg.includes("positions")) return "5 open positions: Senior Developer (32 applicants), Product Manager (24), UX Designer (28), Sales Lead (18), Marketing Executive (26). Average time-to-fill: 18 days with AI screening.";
    return "I'm screening applicants, scheduling interviews, and keeping candidates engaged across your open positions. Currently managing 128 applicants. How can I help?";
  }
  if (agentSlug === "billing") {
    if (msg.includes("payment status") || msg.includes("status")) return "Payment overview: ₹4.2L collected this week, ₹1.8L pending, ₹67K overdue (3 accounts). I sent 24 reminders today and confirmed 8 payments.";
    if (msg.includes("overdue") || msg.includes("list")) return "Overdue accounts: 1. ABC Corp — ₹28K (15 days overdue, 2 reminders sent), 2. XYZ Ltd — ₹24K (8 days, 1 reminder), 3. PQR Inc — ₹15K (5 days, auto-reminder scheduled for tomorrow).";
    if (msg.includes("send reminder")) return "Sending professional payment reminder now. I'll personalize it based on their payment history and previous interactions. They'll receive it via their preferred channel (WhatsApp/Email) within seconds.";
    if (msg.includes("pending invoices") || msg.includes("invoices")) return "12 pending invoices totaling ₹3.4L. Oldest pending: 22 days (ABC Corp). I'm sending reminders on Day 7, 14, and 21 automatically before escalating.";
    if (msg.includes("collection rate") || msg.includes("collection")) return "Collection rate this month: 94% (up from 87% before Auxify). Average days-to-payment reduced from 18 to 9 days. ₹12L+ recovered from overdue accounts.";
    return "I'm managing your billing and collections. This month: 94% collection rate, ₹12L+ recovered. Currently tracking 12 pending invoices. What would you like to know?";
  }
  if (agentSlug === "research") {
    if (msg.includes("run survey") || msg.includes("survey")) return "Ready to launch a survey. Choose a template: Customer Satisfaction (NPS), Product Feedback, Market Research, or Competitive Analysis. I'll distribute across WhatsApp, SMS, and email for maximum responses.";
    if (msg.includes("competitor") || msg.includes("analysis")) return "Competitor analysis available for 5 tracked competitors. Key insights: 2 launched new features this month, 1 changed pricing, market sentiment shifting toward AI-first solutions. Want a detailed breakdown?";
    if (msg.includes("trends") || msg.includes("report")) return "Trend report: Customer satisfaction up 12% this quarter. Top requested feature: WhatsApp integration (already live). Emerging concern: response time expectations shifting to under 30 seconds.";
    if (msg.includes("response") || msg.includes("view")) return "Last survey results: 342 responses collected (68% completion rate). NPS score: 72. Key themes: Fast response praised (89%), pricing clarity requested (34%), mobile app desired (28%).";
    return "I'm running surveys, collecting feedback, and generating market insights. Last campaign achieved 68% completion rate. What research would you like to run?";
  }
  if (agentSlug === "receptionist") {
    if (msg.includes("greeting") || msg.includes("setup")) return "Current greeting: 'Hi! Welcome to [Company]. I'm here to help you with appointments, information, or connecting you with the right team. How can I assist you today?' Active on all channels 24/7.";
    if (msg.includes("queue") || msg.includes("status")) return "Current queue: 2 visitors waiting (avg wait: 45 seconds). 1 needs sales consultation, 1 has a billing question. I'm engaging both while routing them appropriately.";
    if (msg.includes("today") || msg.includes("schedule")) return "Today's schedule: 6 appointments booked (next one in 40 minutes). 2 walk-ins expected. All attendees received confirmation and reminder 1 hour before their slot.";
    if (msg.includes("book slot") || msg.includes("slot")) return "Available slots today: 11:00 AM, 1:30 PM, 3:00 PM, 5:00 PM. Tomorrow: 9:30 AM, 11:00 AM, 2:00 PM, 4:00 PM. Shall I book for a specific visitor?";
    if (msg.includes("after-hours") || msg.includes("after")) return "After-hours mode is active (7 PM - 9 AM). I answer questions, capture leads, schedule callbacks for next business day, and handle urgent escalations. Captured 3 leads after hours last night.";
    return "I'm managing your front desk 24/7 — greeting visitors, routing inquiries, and scheduling appointments. Today: 6 appointments scheduled, 14 inquiries handled. How can I help?";
  }
  if (agentSlug === "it-helpdesk") {
    if (msg.includes("common fixes") || msg.includes("fixes")) return "Top fixes I resolve without human help: Password reset (automated), VPN reconnect guide, Slack/Teams cache clear, Printer setup, WiFi troubleshooting. Resolving 78% of tickets automatically.";
    if (msg.includes("reset password") || msg.includes("password")) return "I can initiate a password reset right now. I'll verify the user's identity through their registered email, send a secure reset link, and confirm completion — all in under 2 minutes.";
    if (msg.includes("network") || msg.includes("check")) return "Network status: All systems operational. Last incident: minor latency spike 2 days ago (resolved in 4 min). Current uptime: 99.97%. No active alerts.";
    if (msg.includes("new ticket") || msg.includes("ticket")) return "Creating new ticket. I'll collect: issue description, affected system, priority level, screenshots if available. Then auto-categorize and route to the right technician with full context.";
    if (msg.includes("system status") || msg.includes("status")) return "All systems green. Email: operational, CRM: operational, VPN: operational, Internal tools: operational. Last maintenance: 3 days ago. Next scheduled: this Sunday 2 AM.";
    return "IT Helpdesk AI active. Handling 78% of tickets automatically today. Current queue: 3 open tickets. How can I help?";
  }

  if (msg.includes("how") || msg.includes("work")) return "I work 24/7 across all your channels — WhatsApp, voice, email, and web chat. When a customer reaches out, I understand their intent, take action, and escalate to your team only when needed. Everything is logged and visible.";
  if (msg.includes("example") || msg.includes("show")) return "Here's a live example: A customer messaged on WhatsApp asking about pricing. I responded in 3 seconds, answered their specific questions, qualified them as a warm lead, and booked a demo — all without human intervention.";
  return "I'm here to help! I handle this capability automatically across all your communication channels. Your team gets full visibility and can step in anytime. What else would you like to know?";
}

/* ------------------------------------------------------------------ */
/*  Handoff                                                            */
/* ------------------------------------------------------------------ */

function HandoffSection() {
  return (
    <section
      className={cn("relative bg-white py-20 lg:py-28", pageX)}
      id="handoff"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow=""
          eyebrowIcon={ShieldCheck}
          lead="AI handles repetitive, high-volume work. Your team handles high-value conversations—and Auxify escalates instantly with full context, so nothing gets lost in the handoff."
          title={<>When your team needs to step in</>}
        />

        <Reveal className="mt-12">
          <HandoffFlow />
        </Reveal>

        <Reveal className="mt-6 grid gap-5 lg:grid-cols-2" delay={0.1}>
          <div className="rounded-[24px] border border-[#DCE6F4] bg-white p-7">
            <p className="text-[0.7rem] font-black tracking-[0.16em] text-[#0a0a0a] uppercase">
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
