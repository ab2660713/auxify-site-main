"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Inbox,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { ModuleVisualKind } from "./platform-data";

type VisualProps = { accent: string };

function useLoop() {
  return !useReducedMotion();
}

/* ------------------------------------------------------------------ */
/*  Voice AI — live call waveform                                      */
/* ------------------------------------------------------------------ */

function VoiceVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const bars = [0.3, 0.7, 1, 0.55, 0.85, 0.4, 0.95, 0.6, 0.75, 0.35, 0.9, 0.5];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="relative grid place-items-center">
        <motion.span
          animate={loop ? { scale: [1, 1.6], opacity: [0.5, 0] } : undefined}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: accent }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          className="relative grid size-16 place-items-center rounded-full text-white shadow-lg"
          style={{ backgroundColor: accent }}
        >
          <PhoneCall className="size-7" />
        </span>
      </div>

      <div className="flex h-20 items-center gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            animate={
              loop ? { scaleY: [h, h * 0.35, h, h * 0.7, h] } : undefined
            }
            className="w-1.5 rounded-full"
            key={i}
            style={{
              height: `${h * 100}%`,
              backgroundColor: accent,
              opacity: 0.35 + h * 0.55,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-[#07111D] shadow-sm">
        <span
          className="size-2 animate-pulse rounded-full"
          style={{ backgroundColor: accent }}
        />
        Live call · transcribing
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat AI — streaming conversation bubbles                           */
/* ------------------------------------------------------------------ */

function ChatVisual({ accent }: VisualProps) {
  const loop = useLoop();

  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 px-2">
      <motion.div
        animate={loop ? { opacity: 1, x: 0 } : undefined}
        className="max-w-[78%] self-start rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-xs font-semibold text-[#4A5568] shadow-sm"
        initial={loop ? { opacity: 0, x: -16 } : undefined}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={loop ? { opacity: 1, x: 0 } : undefined}
      >
        Do you ship internationally?
      </motion.div>

      <motion.div
        animate={loop ? { opacity: 1, x: 0 } : undefined}
        className="flex max-w-[82%] items-start gap-2 self-end"
        initial={loop ? { opacity: 0, x: 16 } : undefined}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        whileInView={loop ? { opacity: 1, x: 0 } : undefined}
      >
        <div
          className="rounded-2xl rounded-br-sm px-4 py-2.5 text-xs font-semibold text-white shadow-md"
          style={{ backgroundColor: accent }}
        >
          Yes! We ship to 40+ countries with live tracking.
        </div>
      </motion.div>

      <motion.div
        animate={loop ? { opacity: 1, x: 0 } : undefined}
        className="flex max-w-[60%] items-center gap-1.5 self-end rounded-2xl rounded-br-sm bg-white/70 px-4 py-3 shadow-sm"
        initial={loop ? { opacity: 0, x: 16 } : undefined}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
        whileInView={loop ? { opacity: 1, x: 0 } : undefined}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            animate={loop ? { y: [0, -4, 0] } : undefined}
            className="size-1.5 rounded-full"
            key={i}
            style={{ backgroundColor: accent }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      <div className="mt-1 flex items-center gap-1.5 self-start rounded-full bg-white/80 px-2.5 py-1 text-[0.65rem] font-bold text-[#07111D] shadow-sm">
        <Sparkles className="size-3" style={{ color: accent }} />
        Intent detected: shipping
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Campaigns — broadcast radiating to recipients                       */
/* ------------------------------------------------------------------ */

function CampaignsVisual({ accent }: VisualProps) {
  const loop = useLoop();

  return (
    <div className="relative grid h-full w-full place-items-center">
      <svg className="h-full max-h-56 w-full" fill="none" viewBox="0 0 240 200">
        {[0, 1, 2].map((ring) => (
          <motion.circle
            animate={loop ? { r: [30, 95], opacity: [0.5, 0] } : undefined}
            cx="120"
            cy="100"
            key={ring}
            r="30"
            stroke={accent}
            strokeWidth="1.5"
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ring * 1,
              ease: "easeOut",
            }}
          />
        ))}

        {[
          [40, 40],
          [200, 50],
          [36, 150],
          [205, 155],
          [120, 178],
        ].map(([x, y], i) => (
          <motion.g
            animate={loop ? { opacity: [0.3, 1, 0.3] } : undefined}
            key={i}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45 }}
          >
            <line
              stroke={accent}
              strokeDasharray="3 3"
              strokeOpacity="0.3"
              strokeWidth="1"
              x1="120"
              x2={x}
              y1="100"
              y2={y}
            />
            <circle cx={x} cy={y} fill={accent} r="6" />
          </motion.g>
        ))}
      </svg>

      <div
        className="absolute grid size-16 place-items-center rounded-2xl text-white shadow-lg"
        style={{ backgroundColor: accent }}
      >
        <Megaphone className="size-7" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Omnichannel Inbox — channels converge into one inbox               */
/* ------------------------------------------------------------------ */

function InboxVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const channels = [
    { icon: MessageCircle, color: "#25D366" },
    { icon: MessageSquare, color: "#E1306C" },
    { icon: Mail, color: "#1B3FFF" },
    { icon: PhoneCall, color: "#D97800" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center gap-4 sm:gap-6">
      <div className="flex flex-col gap-3">
        {channels.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <motion.span
              animate={
                loop ? { x: [0, 6, 0], opacity: [0.7, 1, 0.7] } : undefined
              }
              className="grid size-11 place-items-center rounded-xl bg-white shadow-md"
              key={i}
              style={{ color: ch.color }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Icon className="size-5" />
            </motion.span>
          );
        })}
      </div>

      <svg className="h-40 w-16" fill="none" viewBox="0 0 60 160">
        {[20, 60, 100, 140].map((y, i) => (
          <motion.path
            animate={
              loop ? { pathLength: [0, 1], opacity: [0, 1, 0] } : undefined
            }
            d={`M0 ${y} C30 ${y}, 30 80, 58 80`}
            key={i}
            stroke={accent}
            strokeWidth="1.5"
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </svg>

      <div
        className="relative grid size-20 place-items-center rounded-2xl text-white shadow-xl"
        style={{ backgroundColor: accent }}
      >
        <Inbox className="size-9" />
        <motion.span
          animate={loop ? { scale: [1, 1.2, 1] } : undefined}
          className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-white text-xs font-black shadow"
          style={{ color: accent }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          12
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Workflow Automation — trigger → action node flow                   */
/* ------------------------------------------------------------------ */

function AutomationVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const nodes = ["New lead", "Assign owner", "Send follow-up"];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      {nodes.map((label, i) => (
        <div
          className="flex w-full max-w-[15rem] flex-col items-center"
          key={label}
        >
          <motion.div
            animate={loop ? { opacity: 1, y: 0 } : undefined}
            className="flex w-full items-center gap-3 rounded-xl border border-white bg-white px-4 py-3 shadow-md"
            initial={loop ? { opacity: 0, y: 12 } : undefined}
            transition={{ duration: 0.5, delay: i * 0.25 }}
            viewport={{ once: true }}
            whileInView={loop ? { opacity: 1, y: 0 } : undefined}
          >
            <span
              className="grid size-8 place-items-center rounded-lg text-xs font-black text-white"
              style={{ backgroundColor: accent }}
            >
              {i + 1}
            </span>
            <span className="text-xs font-bold text-[#07111D]">{label}</span>
            {i === nodes.length - 1 && (
              <CheckCircle2
                className="ml-auto size-4"
                style={{ color: accent }}
              />
            )}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.span
              animate={
                loop ? { y: [0, 4, 0], opacity: [0.4, 1, 0.4] } : undefined
              }
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            >
              <ArrowRight
                className="my-1 size-4 rotate-90"
                style={{ color: accent }}
              />
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Copilot — record card with AI suggestions                       */
/* ------------------------------------------------------------------ */

function CopilotVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const suggestions = ["Summarize history", "Draft reply", "Next best action"];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[16rem] rounded-2xl border border-white bg-white p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-[#9AA8BD]" />
          <span className="text-xs font-black text-[#07111D]">
            Customer record
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded-full bg-[#EEF2F8]" />
          <div className="h-2 w-4/5 rounded-full bg-[#EEF2F8]" />
        </div>

        <div className="mt-4 space-y-2">
          {suggestions.map((s, i) => (
            <motion.div
              animate={loop ? { opacity: 1, x: 0 } : undefined}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-bold text-white"
              initial={loop ? { opacity: 0, x: 14 } : undefined}
              key={s}
              style={{ backgroundColor: accent }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}
              viewport={{ once: true }}
              whileInView={loop ? { opacity: 1, x: 0 } : undefined}
            >
              <Sparkles className="size-3.5" />
              {s}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.span
        animate={loop ? { y: [0, -8, 0], rotate: [0, 12, 0] } : undefined}
        className="absolute -top-1 right-2 grid size-9 place-items-center rounded-full text-white shadow-lg"
        style={{ backgroundColor: accent }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        <Sparkles className="size-4" />
      </motion.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Analytics — growing bar chart                                       */
/* ------------------------------------------------------------------ */

function AnalyticsVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const bars = [0.4, 0.6, 0.5, 0.72, 0.58, 0.85, 0.95];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-4">
      {/* Top stats row */}
      <div className="flex w-full max-w-[20rem] gap-3">
        <div className="flex flex-1 flex-col items-center rounded-xl border border-white bg-white p-3 shadow-md">
          <span className="text-lg font-black" style={{ color: accent }}>
            2,847
          </span>
          <span className="text-[0.6rem] font-bold text-[#9AA8BD]">Leads</span>
        </div>
        <div className="flex flex-1 flex-col items-center rounded-xl border border-white bg-white p-3 shadow-md">
          <span className="text-lg font-black" style={{ color: accent }}>
            68%
          </span>
          <span className="text-[0.6rem] font-bold text-[#9AA8BD]">
            Converted
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center rounded-xl border border-white bg-white p-3 shadow-md">
          <span className="text-lg font-black" style={{ color: accent }}>
            1.2s
          </span>
          <span className="text-[0.6rem] font-bold text-[#9AA8BD]">
            Avg Response
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full max-w-[20rem] rounded-2xl border border-white bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#07111D]">
            Weekly Performance
          </span>
          <span
            className="flex items-center gap-1 text-xs font-black"
            style={{ color: accent }}
          >
            <TrendingUp className="size-3.5" />
            +38%
          </span>
        </div>

        <div className="mt-4 flex h-36 items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              animate={loop ? { height: `${h * 100}%` } : undefined}
              className="flex-1 rounded-t-lg"
              initial={loop ? { height: "0%" } : undefined}
              key={i}
              style={{
                backgroundColor: accent,
                opacity: 0.35 + h * 0.65,
              }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileInView={loop ? { height: `${h * 100}%` } : undefined}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[0.55rem] font-bold text-[#9AA8BD]">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lead Management — pipeline stages                                   */
/* ------------------------------------------------------------------ */

function LeadsVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const stages = [
    { label: "New Leads", count: 48, w: 1 },
    { label: "Qualified", count: 32, w: 0.82 },
    { label: "Proposal", count: 18, w: 0.62 },
    { label: "Won", count: 11, w: 0.4 },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4">
      {/* Contact card preview */}
      <div className="w-full max-w-[18rem] rounded-2xl border border-white bg-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-full text-sm font-black text-white"
            style={{ backgroundColor: accent }}
          >
            JD
          </span>
          <div>
            <span className="text-xs font-black text-[#07111D]">
              John Doe
            </span>
            <span className="block text-[0.6rem] font-bold text-[#9AA8BD]">
              Lead · Qualified · Assigned to Sarah
            </span>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md bg-[#EAF2FF] px-2 py-0.5 text-[0.6rem] font-bold text-[#014BAA]">
            Hot Lead
          </span>
          <span className="rounded-md bg-[#E8F8F1] px-2 py-0.5 text-[0.6rem] font-bold text-[#008756]">
            Follow-up Today
          </span>
        </div>
      </div>

      {/* Pipeline funnel */}
      <div className="flex w-full max-w-[18rem] flex-col items-center gap-1.5">
        {stages.map((stage, i) => (
          <motion.div
            animate={loop ? { opacity: 1, scaleX: 1 } : undefined}
            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-white shadow-md"
            initial={loop ? { opacity: 0, scaleX: 0.6 } : undefined}
            key={stage.label}
            style={{
              backgroundColor: accent,
              opacity: 0.5 + (1 - i * 0.13),
              width: `${stage.w * 100}%`,
            }}
            transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            whileInView={loop ? { opacity: 1, scaleX: 1 } : undefined}
          >
            <span className="text-[0.65rem] font-black">{stage.label}</span>
            <span className="text-[0.65rem] font-black tabular-nums">
              {stage.count}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Switcher                                                           */
/* ------------------------------------------------------------------ */

const visualMap: Record<
  ModuleVisualKind,
  (props: VisualProps) => React.ReactElement
> = {
  voice: VoiceVisual,
  chat: ChatVisual,
  campaigns: CampaignsVisual,
  inbox: InboxVisual,
  automation: AutomationVisual,
  copilot: CopilotVisual,
  analytics: AnalyticsVisual,
  leads: LeadsVisual,
} as const;

export function ModuleVisual({
  accent,
  className,
  kind,
}: {
  accent: string;
  className?: string;
  kind: ModuleVisualKind;
}) {
  const Visual = visualMap[kind];

  return (
    <div
      className={cn(
        "relative grid min-h-[24rem] place-items-center overflow-hidden",
        className,
      )}
    >
      <div className="relative h-full w-full p-6">
        <Visual accent={accent} />
      </div>
    </div>
  );
}
