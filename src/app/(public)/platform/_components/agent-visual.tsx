"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MessageCircle,
  Phone,
  Ticket,
  TrendingUp,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { AgentVisualKind } from "./platform-data";

type VisualProps = { accent: string };

function useLoop() {
  return !useReducedMotion();
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Sales — lead funnel + conversion score gauge                       */
/* ------------------------------------------------------------------ */

function SalesVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const stages = [
    { label: "Leads", width: "100%", value: "1,240" },
    { label: "Qualified", width: "72%", value: "892" },
    { label: "Hot", width: "44%", value: "548" },
    { label: "Won", width: "24%", value: "298" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <div className="flex w-full max-w-[210px] flex-col gap-2">
        {stages.map((stage, i) => (
          <motion.div
            animate={loop ? { opacity: 1, x: 0 } : undefined}
            className="mx-auto flex items-center justify-between rounded-lg px-3 py-2 text-[0.7rem] font-black text-white shadow-sm"
            initial={loop ? { opacity: 0, x: -12 } : false}
            key={stage.label}
            style={{
              width: stage.width,
              backgroundColor: accent,
              opacity: 0.55 + i * 0.15,
            }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
          >
            <span className="truncate">{stage.label}</span>
            <span className="tabular-nums">{stage.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative grid size-20 shrink-0 place-items-center max-sm:hidden">
        <svg className="size-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            fill="none"
            r="32"
            stroke={accent}
            strokeOpacity="0.16"
            strokeWidth="7"
          />
          <motion.circle
            animate={loop ? { strokeDashoffset: 201 - 201 * 0.68 } : undefined}
            cx="40"
            cy="40"
            fill="none"
            initial={loop ? { strokeDashoffset: 201 } : false}
            r="32"
            stroke={accent}
            strokeDasharray="201"
            strokeLinecap="round"
            strokeWidth="7"
            transition={{ duration: 1.4, ease: EASE }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span
            className="text-lg font-black tabular-nums"
            style={{ color: accent }}
          >
            68%
          </span>
          <TrendingUp className="size-3.5" style={{ color: accent }} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Support — incoming questions deflected into resolved              */
/* ------------------------------------------------------------------ */

function SupportVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const bubbles = [0, 1, 2];

  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <div className="flex flex-col gap-2.5">
        {bubbles.map((b) => (
          <motion.span
            animate={loop ? { x: [0, 46], opacity: [1, 0] } : undefined}
            className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-bold text-[#4A5568] shadow-sm"
            key={b}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: b * 0.6,
              ease: "easeInOut",
            }}
          >
            <MessageCircle className="size-3.5" style={{ color: accent }} />
            FAQ
          </motion.span>
        ))}
      </div>

      <div className="relative grid place-items-center">
        <motion.span
          animate={loop ? { scale: [1, 1.5], opacity: [0.45, 0] } : undefined}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: accent }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          className="relative grid size-16 place-items-center rounded-full text-white shadow-lg"
          style={{ backgroundColor: accent }}
        >
          <CheckCircle2 className="size-7" />
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 px-3 py-3 shadow-sm">
        <span
          className="text-2xl font-black tabular-nums"
          style={{ color: accent }}
        >
          82%
        </span>
        <span className="text-[0.6rem] font-bold text-[#4A5568]">
          auto-resolved
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recruitment — candidate pipeline into a scheduled slot            */
/* ------------------------------------------------------------------ */

function RecruitmentVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const candidates = [0, 1, 2, 3];

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <div className="flex -space-x-2">
        {candidates.map((c) => (
          <motion.span
            animate={loop ? { y: [0, -6, 0] } : undefined}
            className="grid size-9 place-items-center rounded-full border-2 border-white text-white shadow-sm"
            key={c}
            style={{ backgroundColor: accent, opacity: 0.5 + c * 0.16 }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: c * 0.2,
              ease: "easeInOut",
            }}
          >
            <UserRound className="size-4" />
          </motion.span>
        ))}
      </div>

      <motion.span
        animate={loop ? { x: [0, 6, 0] } : undefined}
        className="text-[#9DB4D4]"
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        →
      </motion.span>

      <div className="relative rounded-2xl bg-white px-4 py-3 shadow-md">
        <div
          className="flex items-center gap-2 text-xs font-black"
          style={{ color: accent }}
        >
          <Calendar className="size-4" />
          Interview
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              animate={loop && i === 5 ? { scale: [1, 1.25, 1] } : undefined}
              className="size-2 rounded-[3px]"
              key={i}
              style={{
                backgroundColor: i === 5 ? accent : `${accent}22`,
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.6rem] font-bold text-[#4A5568]">
          Thu · 2:30 PM
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  IT / Help Desk — ticket routed to the right team                  */
/* ------------------------------------------------------------------ */

function ITVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const teams = ["Network", "Access", "Devices"];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg className="h-[150px] w-full max-w-[260px]" viewBox="0 0 260 150">
        {/* connectors */}
        {[38, 75, 112].map((y, i) => (
          <motion.path
            animate={loop ? { pathLength: 1, opacity: 1 } : undefined}
            d={`M70 75 C 120 75, 130 ${y}, 180 ${y}`}
            fill="none"
            initial={loop ? { pathLength: 0, opacity: 0.2 } : false}
            key={y}
            stroke={accent}
            strokeOpacity={i === 1 ? 0.9 : 0.25}
            strokeWidth={i === 1 ? 2.5 : 1.5}
            transition={{ duration: 1, delay: i * 0.2, ease: EASE }}
          />
        ))}

        {/* ticket source */}
        <g>
          <rect fill={accent} height="44" rx="11" width="44" x="26" y="53" />
          <foreignObject height="24" width="24" x="36" y="63">
            <Ticket className="size-6 text-white" />
          </foreignObject>
        </g>

        {/* moving ticket dot */}
        <motion.circle
          animate={
            loop
              ? { cx: [70, 180], cy: [75, 75], opacity: [1, 1, 0] }
              : undefined
          }
          cx="70"
          cy="75"
          fill={accent}
          r="4"
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* team nodes */}
        {teams.map((team, i) => (
          <g key={team}>
            <rect
              fill="white"
              height="26"
              rx="8"
              stroke={i === 1 ? accent : "#DCE6F4"}
              strokeWidth={i === 1 ? 2 : 1}
              width="74"
              x="180"
              y={[25, 62, 99][i]}
            />
            <text
              fill="#07111D"
              fontSize="11"
              fontWeight="700"
              x="217"
              y={[42, 79, 116][i]}
              textAnchor="middle"
            >
              {team}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Billing — invoice with payment progress + reminder pings          */
/* ------------------------------------------------------------------ */

function BillingVisual({ accent }: VisualProps) {
  const loop = useLoop();

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <div className="w-[150px] rounded-2xl bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <FileText className="size-4" style={{ color: accent }} />
          <span className="text-[0.6rem] font-black text-[#4A5568]">
            INV-2042
          </span>
        </div>
        <p className="mt-3 text-lg font-black text-[#07111D]">$4,800</p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EEF2F7]">
          <motion.div
            animate={loop ? { width: "76%" } : undefined}
            className="h-full rounded-full"
            initial={loop ? { width: "0%" } : false}
            style={{ backgroundColor: accent }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </div>
        <p className="mt-2 text-[0.6rem] font-bold text-[#4A5568]">
          76% collected
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {["Reminder sent", "Payment confirmed"].map((label, i) => (
          <motion.span
            animate={loop ? { opacity: 1, x: 0 } : undefined}
            className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-[#4A5568] shadow-sm"
            initial={loop ? { opacity: 0, x: 10 } : false}
            key={label}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.3 }}
          >
            <CreditCard className="size-3.5" style={{ color: accent }} />
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Research — survey responses growing into insights                 */
/* ------------------------------------------------------------------ */

function ResearchVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const bars = [0.45, 0.7, 1, 0.85, 0.6];

  return (
    <div className="flex h-full w-full items-center justify-center gap-6">
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            animate={loop ? { height: `${h * 100}%` } : undefined}
            className="w-5 rounded-t-md"
            initial={loop ? { height: "8%" } : false}
            key={i}
            style={{ backgroundColor: accent, opacity: 0.45 + h * 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {["Promoters", "Passive", "Detractors"].map((label, i) => (
          <div className="flex items-center gap-2" key={label}>
            <span
              className="size-2.5 rounded-full"
              style={{
                backgroundColor: accent,
                opacity: [1, 0.6, 0.3][i],
              }}
            />
            <span className="text-[0.65rem] font-bold text-[#4A5568]">
              {label}
            </span>
          </div>
        ))}
        <span
          className="mt-1 text-xl font-black tabular-nums"
          style={{ color: accent }}
        >
          92%
        </span>
        <span className="text-[0.55rem] font-bold text-[#4A5568]">
          response rate
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Receptionist — switchboard routing with 24/7 availability         */
/* ------------------------------------------------------------------ */

function ReceptionistVisual({ accent }: VisualProps) {
  const loop = useLoop();
  const depts = [
    { label: "Sales", angle: -42 },
    { label: "Support", angle: 0 },
    { label: "Billing", angle: 42 },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <div className="relative grid place-items-center">
        <motion.span
          animate={loop ? { scale: [1, 1.45], opacity: [0.4, 0] } : undefined}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: accent }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          className="relative grid size-16 place-items-center rounded-full text-white shadow-lg"
          style={{ backgroundColor: accent }}
        >
          <Phone className="size-7" />
        </span>
        <span
          className="absolute -top-1 -right-1 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[0.55rem] font-black shadow-sm"
          style={{ color: accent }}
        >
          <Clock className="size-2.5" />
          24/7
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {depts.map((dept, i) => (
          <motion.span
            animate={loop ? { opacity: [0.4, 1, 0.4] } : undefined}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[0.7rem] font-bold text-[#07111D] shadow-sm"
            key={dept.label}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
            {dept.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Map + wrapper                                                     */
/* ------------------------------------------------------------------ */

const visualMap = {
  sales: SalesVisual,
  support: SupportVisual,
  recruitment: RecruitmentVisual,
  it: ITVisual,
  billing: BillingVisual,
  research: ResearchVisual,
  receptionist: ReceptionistVisual,
} as const;

export function AgentVisual({
  accent,
  className,
  kind,
}: {
  accent: string;
  className?: string;
  kind: AgentVisualKind;
}) {
  const Visual = visualMap[kind];

  return (
    <div
      className={cn(
        "relative h-[170px] w-full overflow-hidden rounded-[18px]",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${accent}10, ${accent}05)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(1,75,170,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(1,75,170,0.04)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="relative h-full w-full px-4 py-3">
        <Visual accent={accent} />
      </div>
    </div>
  );
}
