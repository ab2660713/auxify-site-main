"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bot,
  Brain,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Database,
  GitBranch,
  Headset,
  LayoutDashboard,
  type LucideIcon,
  Megaphone,
  MessagesSquare,
  PhoneCall,
  Receipt,
  ServerCog,
  Shield,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type Agent = {
  accentColor: string;
  bgGradient: string;
  capabilities: readonly string[];
  cta: string;
  description: string;
  glowColor: string;
  icon: LucideIcon;
  iconBg: string;
  index: string;
  outcomes: readonly string[];
  slug: string;
  tagline: string;
  title: string;
};

const pageX = "px-5 sm:px-8 lg:px-12 xl:px-20";

const agentActions = [
  { label: "Qualify", icon: Target },
  { label: "Answer", icon: MessagesSquare },
  { label: "Schedule", icon: CalendarClock },
  { label: "Route", icon: GitBranch },
  { label: "Escalate", icon: Zap },
  { label: "Summarize", icon: ClipboardList },
  { label: "Update", icon: Database },
  { label: "Trigger", icon: Workflow },
] as const;

const workflowSurfaces: readonly { icon: LucideIcon; label: string }[] = [
  { label: "Customer conversations", icon: MessagesSquare },
  { label: "CRM records", icon: Database },
  { label: "Lead stages", icon: Target },
  { label: "Campaigns", icon: Megaphone },
  { label: "Call workflows", icon: PhoneCall },
  { label: "Internal knowledge base", icon: Brain },
  { label: "Tasks and reminders", icon: Bell },
  { label: "Analytics dashboards", icon: LayoutDashboard },
  { label: "Team routing rules", icon: GitBranch },
] as const;

const agents: readonly Agent[] = [
  {
    slug: "sales",
    index: "01",
    title: "Sales & Telemarketing AI Employee",
    tagline: "Qualify faster, follow up consistently, and convert more.",
    description:
      "Auxify Sales AI engages leads instantly across messaging and voice—starting the conversation, capturing intent, scoring the lead, and moving the opportunity forward, even outside working hours.",
    cta: "Book a Sales Demo",
    icon: Target,
    accentColor: "#1B3FFF",
    iconBg: "bg-gradient-to-br from-[#1B3FFF] to-[#014BAA]",
    bgGradient: "from-[#EAF2FF] via-white to-[#F0F5FF]",
    glowColor: "rgba(27,63,255,0.15)",
    capabilities: [
      "Capture incoming leads instantly",
      "Ask qualification questions automatically",
      "Score lead intent and readiness",
      "Handle repetitive outbound follow-up",
      "Book demos and appointments",
      "Route hot leads to sales reps",
      "Recover missed inquiries",
      "Log notes inside CRM",
      "Trigger reminders and tasks",
      "Surface next-best actions for reps",
    ],
    outcomes: [
      "Faster lead response",
      "Higher qualification speed",
      "Better follow-up consistency",
      "More pipeline visibility",
      "Improved conversion rates",
    ],
  },
  {
    slug: "support",
    index: "02",
    title: "Customer Support AI Employee",
    tagline: "Resolve common questions without slowing down your team.",
    description:
      "Auxify Support AI answers common questions using your business knowledge, guides customers through standard requests, captures issue details, and routes complex cases to the right human team.",
    cta: "Book a Support Demo",
    icon: Headset,
    accentColor: "#008756",
    iconBg: "bg-gradient-to-br from-[#00C896] to-[#008756]",
    bgGradient: "from-[#E8F8F1] via-white to-[#F0FBF6]",
    glowColor: "rgba(0,135,86,0.15)",
    capabilities: [
      "Answer FAQs instantly",
      "Retrieve knowledge-base answers",
      "Guide customers through common requests",
      "Capture issue details",
      "Classify conversation type",
      "Detect urgency or escalation needs",
      "Create tickets or tasks",
      "Route complex conversations",
      "Summarize issues for agents",
    ],
    outcomes: [
      "Faster customer support",
      "Reduced ticket load",
      "Better service consistency",
      "Shorter wait times",
      "Higher support efficiency",
    ],
  },
  {
    slug: "recruitment",
    index: "03",
    title: "HR & Recruitment AI Employee",
    tagline: "Automate repetitive hiring communication.",
    description:
      "Auxify Recruitment AI keeps hiring communication moving while your team focuses on decision-making—screening applicants, scheduling interviews, and following up automatically.",
    cta: "Book a Recruitment Demo",
    icon: Users,
    accentColor: "#6D4AFF",
    iconBg: "bg-gradient-to-br from-[#8B6FFF] to-[#6D4AFF]",
    bgGradient: "from-[#F1EDFF] via-white to-[#F5F0FF]",
    glowColor: "rgba(109,74,255,0.15)",
    capabilities: [
      "Screen applicants with preset criteria",
      "Answer candidate questions",
      "Schedule interviews automatically",
      "Send reminders",
      "Follow up with applicants",
      "Collect required information",
      "Route candidates internally",
      "Share hiring updates",
    ],
    outcomes: [
      "Faster screening",
      "Better candidate experience",
      "Fewer scheduling delays",
      "More efficient hiring operations",
    ],
  },
  {
    slug: "it",
    index: "04",
    title: "IT / Help Desk AI Employee",
    tagline: "Resolve internal and customer-facing support faster.",
    description:
      "Auxify IT AI captures the problem immediately and moves support faster—collecting issue details, guiding troubleshooting, creating tickets, and escalating critical issues.",
    cta: "Book an IT Demo",
    icon: ServerCog,
    accentColor: "#0E7FB8",
    iconBg: "bg-gradient-to-br from-[#38B2E8] to-[#0E7FB8]",
    bgGradient: "from-[#E6F5FC] via-white to-[#EDF7FD]",
    glowColor: "rgba(14,127,184,0.15)",
    capabilities: [
      "Collect issue details",
      "Categorize requests",
      "Guide troubleshooting",
      "Suggest knowledge articles",
      "Create tickets",
      "Assign to correct team",
      "Escalate critical issues",
      "Track status updates",
    ],
    outcomes: [
      "Faster ticket resolution",
      "Better issue routing",
      "Less repetitive triage",
      "Higher team productivity",
    ],
  },
  {
    slug: "billing",
    index: "05",
    title: "Collections & Billing AI Employee",
    tagline: "Automate payment follow-up and reduce revenue delays.",
    description:
      "Auxify Billing AI automates reminders while keeping communication professional and consistent—confirming payment status, answering billing questions, and escalating overdue accounts.",
    cta: "Book a Billing Demo",
    icon: Receipt,
    accentColor: "#D97800",
    iconBg: "bg-gradient-to-br from-[#FFB020] to-[#D97800]",
    bgGradient: "from-[#FFF4E6] via-white to-[#FFF8EE]",
    glowColor: "rgba(217,120,0,0.15)",
    capabilities: [
      "Send payment reminders",
      "Confirm payment status",
      "Answer billing questions",
      "Share invoices and reminders",
      "Escalate overdue accounts",
      "Trigger follow-up workflows",
      "Notify internal teams",
    ],
    outcomes: [
      "Faster payment collection",
      "Better reminder consistency",
      "Reduced manual chasing",
      "Improved billing operations",
    ],
  },
  {
    slug: "research",
    index: "06",
    title: "Market Research & Survey AI Employee",
    tagline: "Collect customer feedback at scale and turn it into insights.",
    description:
      "Auxify Survey AI automates customer research workflows—sending surveys, asking structured questions, capturing replies, and pushing data into reporting.",
    cta: "Book a Research Demo",
    icon: ClipboardList,
    accentColor: "#C2185B",
    iconBg: "bg-gradient-to-br from-[#E84D8A] to-[#C2185B]",
    bgGradient: "from-[#FCE8F0] via-white to-[#FEF0F5]",
    glowColor: "rgba(194,24,91,0.15)",
    capabilities: [
      "Send surveys",
      "Ask structured questions",
      "Capture replies",
      "Follow up for missing responses",
      "Segment responses",
      "Identify patterns",
      "Push data into reporting",
    ],
    outcomes: [
      "Higher response collection",
      "Faster feedback cycles",
      "Better customer insight",
      "Cleaner reporting",
    ],
  },
  {
    slug: "reception",
    index: "07",
    title: "Receptionist / Front Desk AI Employee",
    tagline: "Always available for first-touch conversations.",
    description:
      "Auxify Receptionist AI handles front-line communication automatically and routes customers correctly—welcoming new inquiries, scheduling appointments, and handling after-hours requests.",
    cta: "Book a Front Desk Demo",
    icon: Bell,
    accentColor: "#014BAA",
    iconBg: "bg-gradient-to-br from-[#3B7FE8] to-[#014BAA]",
    bgGradient: "from-[#EAF2FF] via-white to-[#F0F5FF]",
    glowColor: "rgba(1,75,170,0.15)",
    capabilities: [
      "Welcome new inquiries",
      "Answer basic questions",
      "Route to departments",
      "Schedule appointments",
      "Collect customer details",
      "Trigger reminders",
      "Handle after-hours inquiries",
    ],
    outcomes: [
      "Faster first response",
      "Better routing accuracy",
      "Fewer missed inquiries",
      "Stronger customer experience",
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Visual Primitives                                                   */
/* ------------------------------------------------------------------ */

function FloatingOrb({
  className,
  color,
  size = 120,
}: {
  className?: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Orbital Hero Graphic                                      */
/* ------------------------------------------------------------------ */

function AgentNeuron({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle
          cx="200"
          cy="200"
          r="190"
          stroke="url(#outerGrad)"
          strokeDasharray="8 6"
          strokeWidth="1"
        >
          <animateTransform
            attributeName="transform"
            dur="60s"
            from="0 200 200"
            repeatCount="indefinite"
            to="360 200 200"
            type="rotate"
          />
        </circle>

        {/* Middle ring */}
        <circle
          cx="200"
          cy="200"
          r="140"
          stroke="url(#midGrad)"
          strokeDasharray="6 10"
          strokeWidth="1.5"
        >
          <animateTransform
            attributeName="transform"
            dur="45s"
            from="360 200 200"
            repeatCount="indefinite"
            to="0 200 200"
            type="rotate"
          />
        </circle>

        {/* Inner ring */}
        <circle
          cx="200"
          cy="200"
          r="90"
          stroke="url(#innerGrad)"
          strokeDasharray="4 8"
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            dur="30s"
            from="0 200 200"
            repeatCount="indefinite"
            to="360 200 200"
            type="rotate"
          />
        </circle>

        {/* Orbital dots on outer ring */}
        {agents.map((agent, i) => {
          const angle = (i * 360) / agents.length;
          return (
            <g key={agent.slug}>
              <circle cx="200" cy="10" fill={agent.accentColor} r="6">
                <animateTransform
                  attributeName="transform"
                  dur="60s"
                  from={`${angle} 200 200`}
                  repeatCount="indefinite"
                  to={`${angle + 360} 200 200`}
                  type="rotate"
                />
              </circle>
              <circle
                cx="200"
                cy="10"
                fill={agent.accentColor}
                opacity="0.3"
                r="12"
              >
                <animateTransform
                  attributeName="transform"
                  dur="60s"
                  from={`${angle} 200 200`}
                  repeatCount="indefinite"
                  to={`${angle + 360} 200 200`}
                  type="rotate"
                />
              </circle>
            </g>
          );
        })}

        {/* Center core */}
        <circle cx="200" cy="200" fill="url(#coreGrad)" r="44" />
        <circle
          cx="200"
          cy="200"
          fill="none"
          r="44"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        {/* Pulse ring from center */}
        <circle
          cx="200"
          cy="200"
          fill="none"
          r="44"
          stroke="#1B3FFF"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            dur="4s"
            from="44"
            repeatCount="indefinite"
            to="100"
          />
          <animate
            attributeName="opacity"
            dur="4s"
            from="0.4"
            repeatCount="indefinite"
            to="0"
          />
        </circle>

        <defs>
          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="#1B3FFF" />
            <stop offset="100%" stopColor="#014BAA" />
          </radialGradient>
          <linearGradient id="outerGrad" x1="0" x2="400" y1="0" y2="400">
            <stop offset="0%" stopColor="#1B3FFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#014BAA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1B3FFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="midGrad" x1="0" x2="400" y1="400" y2="0">
            <stop offset="0%" stopColor="#014BAA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7BA7FF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="innerGrad" x1="200" x2="200" y1="0" y2="400">
            <stop offset="0%" stopColor="#1B3FFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#014BAA" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#1B3FFF] to-[#014BAA] shadow-[0_0_60px_rgba(27,63,255,0.4)]">
          <Bot className="size-10 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Agent Visual Graphic — radial node diagram per agent               */
/* ------------------------------------------------------------------ */

function AgentVisualGraphic({
  agent,
  className,
}: {
  agent: Agent;
  className?: string;
}) {
  const Icon = agent.icon;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/60 p-8",
        className,
      )}
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${agent.glowColor}, transparent 50%), radial-gradient(ellipse at 70% 80%, ${agent.glowColor}, transparent 50%), linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(1,75,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 320 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines radiating from center */}
        {agent.capabilities.slice(0, 6).map((_, i) => {
          const angle = i * 60 - 30;
          const rad = (angle * Math.PI) / 180;
          const x2 = 160 + Math.cos(rad) * 120;
          const y2 = 140 + Math.sin(rad) * 100;

          return (
            <g key={i}>
              <line
                opacity="0.15"
                stroke={agent.accentColor}
                strokeDasharray="4 4"
                strokeWidth="1"
                x1="160"
                x2={x2}
                y1="140"
                y2={y2}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="3s"
                  from="0"
                  repeatCount="indefinite"
                  to="-16"
                />
              </line>
              <circle
                cx={x2}
                cy={y2}
                fill={agent.accentColor}
                opacity="0.2"
                r="16"
              />
              <circle cx={x2} cy={y2} fill={agent.accentColor} r="4" />
            </g>
          );
        })}

        {/* Center hub */}
        <circle
          cx="160"
          cy="140"
          fill={agent.accentColor}
          opacity="0.08"
          r="56"
        />
        <circle
          cx="160"
          cy="140"
          fill={agent.accentColor}
          opacity="0.12"
          r="40"
        />
        <circle cx="160" cy="140" fill={agent.accentColor} r="28" />

        {/* Pulse rings */}
        <circle
          cx="160"
          cy="140"
          fill="none"
          r="40"
          stroke={agent.accentColor}
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            dur="3s"
            from="40"
            repeatCount="indefinite"
            to="80"
          />
          <animate
            attributeName="opacity"
            dur="3s"
            from="0.3"
            repeatCount="indefinite"
            to="0"
          />
        </circle>
        <circle
          cx="160"
          cy="140"
          fill="none"
          r="40"
          stroke={agent.accentColor}
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            from="40"
            repeatCount="indefinite"
            to="80"
          />
          <animate
            attributeName="opacity"
            begin="1.5s"
            dur="3s"
            from="0.3"
            repeatCount="indefinite"
            to="0"
          />
        </circle>
      </svg>

      {/* Center icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "grid size-14 place-items-center rounded-xl text-white shadow-lg",
            agent.iconBg,
          )}
        >
          <Icon className="size-7" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook                                         */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Page Root                                                          */
/* ------------------------------------------------------------------ */

export function AgentsPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]">
      <main>
        <HeroSection />
        <WorkflowOrchestratorSection />
        <AgentShowcaseSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#F7FBFF]"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(1,75,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.03)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black_60%,transparent)] bg-[size:48px_48px]" />
      <FloatingOrb
        className="top-20 -left-20"
        color="rgba(27,63,255,0.1)"
        size={400}
      />
      <FloatingOrb
        className="-right-20 bottom-20"
        color="rgba(1,75,170,0.08)"
        size={350}
      />

      <div
        className={cn(
          "mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-0",
          pageX,
        )}
      >
        {/* Left: Copy */}
        <div
          className={cn(
            "transition-all duration-1000",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BFD1FF] bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1B3FFF] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#1B3FFF]" />
            </span>
            <span className="text-xs font-black tracking-[0.12em] text-[#0a0a0a] uppercase">
              AI-powered workforce
            </span>
          </div>

          <h1 className="mt-6 max-w-[20rem] text-[2.75rem] leading-[0.92] font-black tracking-[-0.055em] text-[#07111D] sm:max-w-2xl sm:text-[3.8rem] lg:text-[4.8rem]">
            AI employees built for{" "}
            <span className="bg-gradient-to-r from-[#1B3FFF] to-[#014BAA] bg-clip-text text-transparent">
              real operations
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-7 font-medium text-[#4A5568] sm:text-xl sm:leading-8">
            Each agent is built for a specific function, works inside your
            channels, follows your rules, and hands off to your team the moment
            human action is needed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-13 rounded-full bg-gradient-to-r from-[#014BAA] to-[#1B3FFF] px-7 text-sm font-extrabold text-white shadow-[0_20px_50px_-24px_rgba(1,75,170,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgba(1,75,170,0.9)]"
            >
              <a href="#agent-showcase">
                Explore Agents
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              className="h-13 rounded-full border-[#BFD1FF] bg-white/80 px-7 text-sm font-extrabold text-[#0a0a0a] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              variant="outline"
            >
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#E2E8F0] pt-8">
            {[
              { value: "7", label: "Specialist agents" },
              { value: "24/7", label: "Always available" },
              { value: "100%", label: "Human control" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black tracking-[-0.03em] text-[#0a0a0a] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-bold text-[#4A5568] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Orbital Graphic */}
        <div
          className={cn(
            "relative flex items-center justify-center transition-all delay-300 duration-1000",
            inView ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          <AgentNeuron className="aspect-square w-full max-w-[460px]" />

          {/* Agent labels floating around the graphic */}
          <div className="absolute inset-0 hidden lg:block">
            {agents.slice(0, 4).map((agent, i) => {
              const positions = [
                "top-4 right-4",
                "bottom-8 right-0",
                "bottom-4 left-4",
                "top-8 left-0",
              ];
              const AIcon = agent.icon;

              return (
                <div
                  className={cn(
                    "absolute flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur",
                    positions[i],
                  )}
                  key={agent.slug}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-lg text-white",
                      agent.iconBg,
                    )}
                  >
                    <AIcon className="size-4" />
                  </span>
                  <span className="text-xs font-bold text-[#07111D]">
                    {agent.title.split(" AI")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Workflow Orchestrator Section                                       */
/* ------------------------------------------------------------------ */

function WorkflowOrchestratorSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      className={cn("relative bg-white py-20 lg:py-28", pageX)}
      ref={ref}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <p className="text-xs font-black tracking-[0.18em] text-[#0a0a0a] uppercase">
            Inside your workflows—not outside them
          </p>
          <h2 className="mt-4 text-[2.4rem] leading-[0.96] font-black tracking-[-0.05em] text-[#07111D] sm:text-[3.2rem] lg:text-[4rem]">
            Every interaction becomes{" "}
            <span className="text-[#0a0a0a]">one connected workflow</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg">
            AI can qualify, answer, schedule, route, escalate, summarize, update
            records, and trigger the next action—while your team stays fully in
            control.
          </p>
        </div>

        {/* Action grid */}
        <div
          className={cn(
            "mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 transition-all delay-200 duration-700 sm:grid-cols-4",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          {agentActions.map((action) => {
            const AIcon = action.icon;
            return (
              <div
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#BFD1FF] hover:shadow-[0_16px_48px_-24px_rgba(1,75,170,0.15)]"
                key={action.label}
              >
                <div className="grid size-12 place-items-center rounded-xl bg-[#F0F5FF] text-[#0a0a0a] transition group-hover:bg-[#014BAA] group-hover:text-white">
                  <AIcon className="size-6" />
                </div>
                <span className="text-sm font-black text-[#07111D]">
                  {action.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Workflow surface map */}
        <div
          className={cn(
            "relative mt-16 overflow-hidden rounded-3xl border border-[#D8E6F8] bg-gradient-to-b from-[#F7FBFF] to-white shadow-[0_32px_80px_-48px_rgba(1,35,84,0.2)] transition-all delay-400 duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(1,75,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.025)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative grid gap-0 lg:grid-cols-[1fr_auto_1fr]">
            {/* Left surfaces */}
            <div className="grid gap-2 p-6 sm:grid-cols-2 lg:grid-cols-1 lg:p-8">
              {workflowSurfaces.slice(0, 5).map((surface) => (
                <WorkflowSurfaceCard key={surface.label} surface={surface} />
              ))}
            </div>

            {/* Center: AI Hub */}
            <div className="flex flex-col items-center justify-center gap-4 border-y border-[#D8E6F8] py-8 lg:border-x lg:border-y-0 lg:px-10 lg:py-12">
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-full bg-[#014BAA]/10 blur-xl" />
                <div className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-[#014BAA] to-[#1B3FFF] shadow-[0_24px_56px_-24px_rgba(1,75,170,0.7)]">
                  <Bot className="size-12 text-white" />
                </div>
              </div>
              <p className="text-center text-lg font-black tracking-[-0.02em] text-[#0a0a0a]">
                Auxify AI
              </p>
              <p className="text-center text-xs font-bold tracking-[0.1em] text-[#52617C] uppercase">
                Reason · Act · Hand off
              </p>

              <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    className="block size-1 rounded-full bg-[#BFD1FF]"
                    key={i}
                  />
                ))}
              </div>
            </div>

            {/* Right surfaces */}
            <div className="grid gap-2 p-6 sm:grid-cols-2 lg:grid-cols-1 lg:p-8">
              {workflowSurfaces.slice(5).map((surface) => (
                <WorkflowSurfaceCard key={surface.label} surface={surface} />
              ))}
            </div>
          </div>

          {/* Footer bar */}
          <div className="relative border-t border-[#D8E6F8] bg-white/70 px-6 py-4 backdrop-blur sm:px-8">
            <p className="text-sm leading-6 font-bold text-[#4A5568]">
              <span className="text-[#0a0a0a]">Connected by design.</span>{" "}
              Agents read and write across every surface, so context never gets
              lost between channels, records, and teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSurfaceCard({
  surface,
}: {
  surface: { icon: LucideIcon; label: string };
}) {
  const Icon = surface.icon;

  return (
    <div className="group flex min-h-14 items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 transition hover:border-[#BFD1FF] hover:shadow-md">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#F0F5FF] text-[#0a0a0a] transition group-hover:bg-[#014BAA] group-hover:text-white">
        <Icon className="size-5" />
      </span>
      <span className="text-sm font-bold text-[#07111D]">{surface.label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Agent Showcase — immersive split cards                             */
/* ------------------------------------------------------------------ */

function AgentShowcaseSection() {
  return (
    <section className="bg-[#F7F8FC]" id="agent-showcase">
      <div className={cn("mx-auto max-w-7xl py-20 lg:py-28", pageX)}>
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black tracking-[0.18em] text-[#0a0a0a] uppercase">
            A specialist for every function
          </p>
          <h2 className="mt-4 text-[2.4rem] leading-[0.96] font-black tracking-[-0.05em] text-[#07111D] sm:text-[3.2rem] lg:text-[4rem]">
            Seven agents. <span className="text-[#0a0a0a]">One platform.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg">
            Each agent is purpose-built for a specific job—deployed inside your
            channels, trained on your knowledge, and governed by your rules.
          </p>
        </div>

        {/* Agent cards */}
        <div className="mt-16 space-y-8">
          {agents.map((agent, index) => (
            <AgentShowcaseCard
              agent={agent}
              isReversed={index % 2 === 1}
              key={agent.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentShowcaseCard({
  agent,
  isReversed,
}: {
  agent: Agent;
  isReversed: boolean;
}) {
  const { ref, inView } = useInView(0.08);
  const Icon = agent.icon;

  return (
    <article
      className={cn(
        "group scroll-mt-20 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-700",
        inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
      )}
      id={agent.slug}
      ref={ref}
    >
      <div
        className={cn(
          "grid gap-0 lg:grid-cols-[1.15fr_0.85fr]",
          isReversed && "lg:grid-cols-[0.85fr_1.15fr]",
        )}
      >
        {/* Content side */}
        <div
          className={cn(
            "flex flex-col justify-center p-8 sm:p-10 lg:p-14",
            isReversed && "lg:order-2",
          )}
        >
          {/* Agent badge */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-12 place-items-center rounded-xl text-white shadow-md",
                agent.iconBg,
              )}
            >
              <Icon className="size-6" />
            </span>
            <div>
              <span className="text-[10px] font-black tracking-[0.2em] text-[#9AA8BD] uppercase">
                Agent {agent.index}
              </span>
              <h3
                className="text-xl font-black tracking-[-0.03em] sm:text-2xl"
                style={{ color: agent.accentColor }}
              >
                {agent.title}
              </h3>
            </div>
          </div>

          <p className="mt-4 text-lg font-black tracking-[-0.02em] text-[#07111D]">
            {agent.tagline}
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 font-medium text-[#4A5568]">
            {agent.description}
          </p>

          {/* Capabilities — pill chips */}
          <div className="mt-6">
            <p
              className="text-xs font-black tracking-[0.16em] uppercase"
              style={{ color: agent.accentColor }}
            >
              What it can do
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.capabilities.map((cap) => (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold text-[#07111D] transition hover:shadow-sm"
                  key={cap}
                  style={{
                    borderColor: `${agent.accentColor}30`,
                    backgroundColor: `${agent.accentColor}08`,
                  }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: agent.accentColor }}
                  />
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button
              asChild
              className="h-12 rounded-full px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5"
              style={{ backgroundColor: agent.accentColor }}
            >
              <Link href="https://app.auxify.live/sign-up">
                {agent.cta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Visual side */}
        <div
          className={cn(
            "relative min-h-[320px] lg:min-h-[480px]",
            isReversed && "lg:order-1",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              agent.bgGradient,
            )}
          />

          <div className="relative flex h-full items-center justify-center p-8">
            <AgentVisualGraphic
              agent={agent}
              className="h-full max-h-[360px] w-full max-w-[380px]"
            />
          </div>

          {/* Outcomes overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent p-6 pt-16">
            <p
              className="mb-3 text-xs font-black tracking-[0.16em] uppercase"
              style={{ color: agent.accentColor }}
            >
              Business outcomes
            </p>
            <div className="flex flex-wrap gap-2">
              {agent.outcomes.map((outcome) => (
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/80 bg-white/90 px-3 py-2 text-xs font-bold text-[#07111D] shadow-sm backdrop-blur"
                  key={outcome}
                >
                  <CheckCircle2
                    className="size-3.5 shrink-0"
                    style={{ color: agent.accentColor }}
                  />
                  {outcome}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCtaSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      className={cn("relative overflow-hidden bg-white py-20 lg:py-28", pageX)}
      ref={ref}
    >
      <FloatingOrb
        className="top-1/4 left-1/4"
        color="rgba(27,63,255,0.06)"
        size={500}
      />
      <FloatingOrb
        className="right-1/4 bottom-1/4"
        color="rgba(1,75,170,0.05)"
        size={400}
      />

      <div
        className={cn(
          "relative mx-auto max-w-5xl text-center transition-all duration-700",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        {/* Agent icon strip */}
        <div className="mx-auto flex items-center justify-center gap-2">
          {agents.map((agent) => {
            const AIcon = agent.icon;
            return (
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-xl text-white shadow-md sm:size-12",
                  agent.iconBg,
                )}
                key={agent.slug}
              >
                <AIcon className="size-5 sm:size-6" />
              </span>
            );
          })}
        </div>

        <h2 className="mt-8 text-[2.4rem] leading-[0.94] font-black tracking-[-0.055em] text-[#07111D] sm:text-[3.4rem] lg:text-[4.4rem]">
          Put the right agent on{" "}
          <span className="bg-gradient-to-r from-[#1B3FFF] to-[#014BAA] bg-clip-text text-transparent">
            every conversation
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
          Launch purpose-built AI employees inside your channels, connect them to
          your CRM and knowledge base, and let your team focus on the work that
          needs a human.
        </p>

        {/* Feature badges */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Shield, label: "Full human control" },
            { icon: Zap, label: "Works 24/7 instantly" },
            { icon: Workflow, label: "Connected workflows" },
          ].map((feat) => (
            <div
              className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F7FBFF] p-4"
              key={feat.label}
            >
              <feat.icon className="size-5 text-[#0a0a0a]" />
              <span className="text-sm font-bold text-[#07111D]">
                {feat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-14 rounded-full bg-gradient-to-r from-[#014BAA] to-[#1B3FFF] px-8 text-base font-extrabold text-white shadow-[0_20px_56px_-28px_rgba(1,75,170,0.8)] transition hover:-translate-y-0.5"
          >
            <Link href="/contact">
              Book a Demo
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            className="h-14 rounded-full border-[#D7E0EF] bg-white px-8 text-base font-extrabold text-[#0a0a0a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F7FBFF]"
            variant="outline"
          >
            <Link href="/platform">
              See Auxify in Action
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
