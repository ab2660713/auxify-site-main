import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  CircleDollarSign,
  MessageCircle,
  PhoneCall,
  Plus,
  RadioTower,
  Rocket,
  Sparkles,
  UserRound,
  WalletCards,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/branding/logo";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;

type PlanCard = {
  name: string;
  buyerName: string;
  badge?: string;
  price: string;
  cadence: string;
  description: string;
  icon: IconComponent;
  accentClassName: string;
  meterClassName: string;
  highlighted?: boolean;
  stats: ReadonlyArray<{
    label: string;
    value: string;
  }>;
  includes: readonly string[];
  bestFor: readonly string[];
  addOn?: {
    label: string;
    price: string;
  };
  cta: {
    label: string;
    href: "/sign-in" | "/sign-up" | "/contact";
  };
};

type ComparisonRow = {
  feature: string;
  values: readonly [string, string, string, string];
};



const PLAN_CARDS: readonly PlanCard[] = [
  {
    name: "Tea",
    buyerName: "Trial",
    price: "₹0",
    cadence: "/ 15 Days",
    description:
      "Perfect for exploring Auxify before onboarding your team. Test workflows, manage conversations, and experience AI-powered customer operations in one platform.",
    icon: MessageCircle,
    accentClassName: "bg-[#EAFBF4] text-[#008756] ring-[#BDEFD9]",
    meterClassName: "bg-[#008756]",
    stats: [
      { label: "AI Employees", value: "1" },
      { label: "Users", value: "1" },
      { label: "Voice Usage", value: "500" },
      { label: "Campaign Usage", value: "50" },
    ],
    includes: [
      "1 AI Employee",
      "1 User",
      "500 Voice Usage",
      "50 Campaign Usage",
    
    ],
    bestFor: [
      "Product evaluation",
      "Testing AI workflows",
      "Small teams getting started",
    ],
    cta: {
      label: "Start Free Trial",
      href: "/sign-in",
    },
  },
  {
    name: "Coffee",
    buyerName: "Starter",
    badge: "Best for small teams",
    price: "₹5,999",
    cadence: "/ month",
    description:
      "A focused starter pack for startups, small sales teams, and early support teams that need CRM, conversations, AI follow-up, campaigns, and team guidance.",
    icon: CircleDollarSign,
    accentClassName: "bg-[#EEF5FF] text-[#014BAA] ring-[#BFD1FF]",
    meterClassName: "bg-[#014BAA]",
    stats: [
      { label: "AI Employees", value: "2" },
      { label: "Users", value: "2" },
      { label: "Voice Usage", value: "3,000" },
      { label: "Campaign Usage", value: "500" },
    ],
    includes: [
      "2 AI Employees",
      "2 Users",
      "3,000 Voice Usage",
      "500 Campaign Usage",
    
    ],
    bestFor: ["Startups", "Small sales teams", "Early support teams"],
    addOn: {
      label: "Additional AI Employee (Starter)",
      price: "₹3,000",
    },
    cta: {
      label: "Get Started",
      href: "/sign-up",
    },
  },
  {
    name: "Energy Drink",
    buyerName: "Professional",
    badge: "Recommended for scale",
    price: "₹10,999",
    cadence: "/ month",
    description:
      "Designed for growing businesses managing higher customer volume across sales, support, campaigns, and AI workflows. Scale faster with more automation capacity and team access.",
    icon: Zap,
    accentClassName: "bg-[#FFF4E8] text-[#D97800] ring-[#FFD7A8]",
    meterClassName: "bg-[#D97800]",
    highlighted: true,
    stats: [
      { label: "AI Employees", value: "5" },
      { label: "Users", value: "5" },
      { label: "Voice Usage", value: "7,500" },
      { label: "Campaign Usage", value: "1,500" },
    ],
    includes: [
      "5 AI Employees",
      "5 Users",
      "7,500 Voice Usage",
      "1,500 Campaign Usage",
    ],
    bestFor: [
      "Growing businesses",
      "Sales + support operations",
      "Teams scaling automation",
    ],
    addOn: {
      label: "Additional AI Employee (Professional)",
      price: "₹2,100",
    },
    cta: {
      label: "Choose Professional",
      href: "/sign-up",
    },
  },
  {
    name: "Rocket Fuel",
    buyerName: "Enterprise",
    price: "Custom",
    cadence: "Pricing",
    description:
      "Purpose-built for larger organizations with custom workflows, larger teams, advanced AI deployment, enterprise compliance needs, and flexible infrastructure.",
    icon: Rocket,
    accentClassName: "bg-[#F1EDFF] text-[#6D4AFF] ring-[#D9D0FF]",
    meterClassName: "bg-[#6D4AFF]",
    stats: [
      { label: "AI Employees", value: "20+" },
      { label: "Users", value: "Custom" },
      { label: "Voice Usage", value: "Custom" },
      { label: "Campaign Usage", value: "Custom" },
    ],
    includes: [
      "20+ AI Employees",
      "Custom users and usage",
      "Enterprise analytics",
      "Dedicated onboarding",
      "Custom integrations",
     
    ],
    bestFor: [
      "Enterprise teams",
      "High-volume operations",
      "Multi-team organizations",
    ],
    cta: {
      label: "Talk to Sales",
      href: "/contact",
    },
  },
] as const;

const COMPARISON_COLUMNS = ["Trial", "Starter", "Professional", "Enterprise"];

const COMPARISON_ROWS: readonly ComparisonRow[] = [
  { feature: "AI Employees", values: ["1", "2", "5", "Custom"] },
  { feature: "Users", values: ["1", "2", "5", "Custom"] },
  { feature: "Voice Usage", values: ["500", "3,000", "7,500", "Custom"] },
  { feature: "Campaign Usage", values: ["50", "500", "1,500", "Custom"] },
  { feature: "CRM", values: ["Included", "Included", "Included", "Included"] },
  {
    feature: "WhatsApp Conversations",
    values: ["Included", "Included", "Included", "Included"],
  },
  {
    feature: "Unified Inbox",
    values: ["Included", "Included", "Included", "Included"],
  },
  {
    feature: "Workflow Automation",
    values: ["Included", "Included", "Included", "Included"],
  },
  {
    feature: "Analytics Dashboard",
    values: ["Included", "Included", "Included", "Included"],
  },
  { feature: "API Access", values: ["—", "Included", "Included", "Included"] },
  { feature: "Webhooks", values: ["—", "Included", "Included", "Included"] },
  {
    feature: "Dedicated Account Manager",
    values: ["—", "Included", "Included", "Included"],
  },
  {
    feature: "Dedicated AI Trainer",
    values: ["—", "Included", "Included", "Included"],
  },
  { feature: "Priority Support", values: ["—", "—", "Included", "Included"] },
  { feature: "Dedicated Onboarding", values: ["—", "—", "—", "Included"] },
  { feature: "Custom Integrations", values: ["—", "—", "—", "Included"] },
] as const;

const ADD_ONS = [
  {
    label: "Utility WhatsApp",
    price: "₹0.25",
    icon: MessageCircle,
    toneClassName: "bg-[#EAFBF4] text-[#008756]",
  },
  {
    label: "Campaign Usage",
    price: "₹1",
    icon: RadioTower,
    toneClassName: "bg-[#FFF4E8] text-[#D97800]",
  },
  {
    label: "Voice Usage",
    price: "₹1.25",
    icon: PhoneCall,
    toneClassName: "bg-[#EEF5FF] text-[#014BAA]",
  },
  {
    label: "Additional AI Employee (Starter)",
    price: "₹3,000",
    icon: Bot,
    toneClassName: "bg-[#EEF5FF] text-[#1B3FFF]",
  },
  {
    label: "Additional AI Employee (Professional)",
    price: "₹2,100",
    icon: Sparkles,
    toneClassName: "bg-[#F1EDFF] text-[#6D4AFF]",
  },
  {
    label: "Additional User",
    price: "₹199",
    icon: UserRound,
    toneClassName: "bg-[#F5F8FC] text-[#52617C]",
  },
] as const;

const FAQS: ReadonlyArray<{
  question: string;
  answer: string;
  points?: readonly string[];
}> = [
  {
    question: "What is included in every Auxify plan?",
    answer:
      "Every Auxify plan includes the core platform. Paid plans also include dedicated onboarding support through your Account Manager and AI Trainer.",
    points: [
      "CRM & contact management",
      "WhatsApp conversations",
      "Unified inbox",
      "Lead & customer tracking",
      "Workflow automation",
      "Analytics dashboard",
    ],
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes. Auxify offers a 15-day Trial Pack at ₹0 so you can explore the platform before subscribing. No long-term commitment required.",
    points: [
      "1 AI Employee",
      "1 User",
      "500 Voice Usage",
      "50 Campaign Usage",
      "CRM access",
      "WhatsApp conversations",
    ],
  },
  {
    question: "Can I upgrade my plan anytime?",
    answer:
      "Yes. You can move from Trial to Starter to Professional to Enterprise anytime as your business grows. Your data, conversations, workflows, and customer history stay intact during upgrades.",
  },
  {
    question: "What happens if I need more usage?",
    answer:
      "You can scale instantly with add-ons. You only expand when your team needs more capacity.",
    points: [
      "Utility WhatsApp — ₹0.25",
      "Campaign Usage — ₹1",
      "Voice Usage — ₹1.25",
      "Additional AI Employee (Starter) — ₹3,000",
      "Additional AI Employee (Professional) — ₹2,100",
      "Additional User — ₹199",
    ],
  },
  {
    question: "What is Voice Usage?",
    answer:
      "Voice Usage refers to usage across Auxify's voice automation features. Each plan includes usage limits, and additional usage can be added anytime.",
    points: [
      "AI voice agents",
      "Voice workflows",
      "Automated calling",
      "Customer voice interactions",
    ],
  },
  {
    question: "What is Campaign Usage?",
    answer:
      "Campaign Usage covers outbound customer communication and campaign automation. Each plan includes monthly usage and can be scaled with add-ons.",
    points: [
      "WhatsApp broadcasts",
      "Customer follow-ups",
      "Automated campaign workflows",
      "Bulk communication activity",
    ],
  },
  {
    question: "Are WhatsApp conversations included?",
    answer:
      "Yes. WhatsApp conversations are included across all plans. Utility WhatsApp pricing applies separately at ₹0.25 as usage-based billing.",
  },
  {
    question: "What does a Dedicated Account Manager do?",
    answer:
      "From Starter onward, every customer gets a Dedicated Account Manager who helps with onboarding, setup, workflow planning, account guidance, and ongoing support coordination.",
  },
  {
    question: "What does a Dedicated AI Trainer do?",
    answer:
      "From Starter onward, Auxify includes a Dedicated AI Trainer to help optimize your AI setup.",
    points: [
      "AI workflow configuration",
      "Agent training",
      "Prompt optimization",
      "Automation recommendations",
      "Performance improvement guidance",
    ],
  },
  {
    question: "Which plan is best for my business?",
    answer:
      "Trial Pack is best for exploration, Starter Pack for startups and small teams, Professional Pack for growing teams with higher customer volume, and Enterprise Pack for large operations needing custom workflows and scale.",
  },
  {
    question: "Do you offer custom enterprise pricing?",
    answer:
      "Yes. Enterprise pricing is customized based on team size, AI employee requirements, usage volume, campaign scale, voice automation needs, and custom integrations.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No mandatory long-term commitment is required for standard plans. Enterprise plans may include custom commercial terms depending on requirements.",
  },
] as const;

const sectionEyebrowClass =
  "text-xs font-black tracking-[0.2em] text-[#014BAA] uppercase";

const sectionTitleClass =
  "mt-4 text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.95] font-black tracking-[-0.06em] text-balance text-[#07111D]";

export function PricingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#07111D]">
      <main>
        <HeroSection />
        <PlansSection />
        <ComparisonSection />
        <AddOnsSection />
        <CompetitorComparisonSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#EEF5FF] px-4 py-10 sm:px-8 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,75,170,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(1,75,170,0.042)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-[linear-gradient(180deg,rgba(238,245,255,0),#FFFFFF)]" />

      <div className="mx-auto flex min-h-[calc(86svh-6rem)] max-w-7xl items-center justify-center">
        <div className="mx-auto max-w-5xl text-center">
      
          <h1 className="mx-auto mt-6 max-w-5xl text-[clamp(3rem,8vw,6.7rem)] leading-[0.9] font-black tracking-[-0.075em] text-balance text-[#014BAA]">
            Flexible plans built for growing teams
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 font-semibold text-[#40506D] sm:text-xl sm:leading-8">
            Choose the plan that fits your team today and scale customer
            conversations, AI employees, campaigns, and voice automation as your
            business grows.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 font-medium text-[#52617C] sm:text-base sm:leading-7">
            Auxify combines CRM, WhatsApp conversations, AI employees, automation,
            campaigns, and voice in one unified platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-[linear-gradient(135deg,#014BAA,#1B3FFF_58%,#3B5EFF)] px-7 text-sm font-extrabold text-white shadow-[0_22px_54px_-30px_rgba(1,75,170,0.92)] transition hover:-translate-y-0.5"
            >
              <Link href="/sign-in">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full border-[#BFD1FF] bg-white/76 px-7 text-sm font-extrabold text-[#014BAA] shadow-[0_18px_46px_-36px_rgba(1,75,170,0.5)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white"
              variant="outline"
            >
              <Link href="/sign-up">Book a Demo</Link>
            </Button>
          </div>

          {/* <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <div
                className="flex min-h-12 items-center gap-3 rounded-[8px] border border-[#D8E6F8] bg-white/68 px-3 py-2 text-sm font-black text-[#014BAA] shadow-[0_18px_42px_-34px_rgba(1,75,170,0.45)] backdrop-blur-md"
                key={point}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#EAF2FF] text-[#1B3FFF]">
                  <Check className="size-4" />
                </span>
                {point}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-8 lg:py-24"
      id="plans"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FBFF_46%,#FFFFFF_100%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(260px,0.34fr)] lg:items-end">
          <div>
            <p className={sectionEyebrowClass}>Plans</p>
            <h2 className={sectionTitleClass}>Start focused. Scale cleanly.</h2>
          </div>
          <p className="text-sm leading-6 font-semibold text-[#52617C] lg:text-right">
            Every plan keeps CRM, conversations, automation, and analytics in
            the same operating layer.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {PLAN_CARDS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: PlanCard }) {
  const Icon = plan.icon;

  return (
    <article
      className={cn(
        "relative flex h-full min-w-0 flex-col rounded-[8px] border bg-white p-5 shadow-[0_24px_78px_-64px_rgba(1,75,170,0.58)] ring-1 ring-white/80",
        plan.highlighted
          ? "border-[#F6B35C] shadow-[0_34px_96px_-60px_rgba(217,120,0,0.62)]"
          : "border-[#DCE7F6]",
      )}
    >
      <div className="mb-4 flex min-h-8 items-start">
        {plan.badge ? (
          <span
            className={cn(
              "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black uppercase",
              plan.highlighted
                ? "bg-[#FFF4E8] text-[#B35B00]"
                : "bg-[#EEF5FF] text-[#014BAA]",
            )}
          >
            <Sparkles className="size-3.5" />
            {plan.badge}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="invisible inline-flex rounded-full px-3 py-1.5 text-xs font-black uppercase"
          >
            Tier marker
          </span>
        )}
      </div>

      <div className="flex min-h-[4.75rem] items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-black text-[#657084]">{plan.buyerName}</p>
          <h3 className="mt-1 text-3xl leading-none font-black tracking-[-0.05em] text-[#07111D]">
            {plan.name}
          </h3>
        </div>
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-[8px] ring-1",
            plan.accentClassName,
          )}
        >
          <Icon className="size-6" />
        </span>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="text-4xl leading-none font-black tracking-[-0.06em] text-[#014BAA]">
            {plan.price}
          </span>
          <span className="pb-1 text-sm font-black text-[#657084]">
            {plan.cadence}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 font-medium text-[#52617C]">
          {plan.description}
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-black tracking-[0.16em] text-[#014BAA] uppercase">
          Included
        </p>
        <div className="grid grid-cols-2 gap-2">
          {plan.stats.map((stat) => (
            <div
              className="flex min-h-15 flex-col justify-center rounded-[8px] border border-[#E2E8F0] bg-[#F8FBFF] px-3 py-2.5"
              key={stat.label}
            >
              <p className="text-lg leading-none font-black tracking-[-0.035em] text-[#07111D]">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.72rem] leading-4 font-bold text-[#657084]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-[#E0E8F5] pt-5">
        <p className="text-xs font-black tracking-[0.16em] text-[#014BAA] uppercase">
          Best for
        </p>
        <ul className="mt-3 grid gap-2">
          {plan.bestFor.map((item) => (
            <li
              className="flex items-center gap-2 text-sm font-bold text-[#52617C]"
              key={item}
            >
              <span className="size-1.5 rounded-full bg-[#1B3FFF]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-5">
        <div className="xl:min-h-[76px]">
          {plan.addOn ? (
            <div className="rounded-[8px] border border-dashed border-[#BFD1FF] bg-[#F8FBFF] px-3 py-3">
              <p className="text-xs font-bold text-[#657084]">
                {plan.addOn.label}
              </p>
              <p className="mt-1 text-lg font-black text-[#014BAA]">
                {plan.addOn.price}
              </p>
            </div>
          ) : (
            <div aria-hidden="true" className="hidden h-[76px] xl:block" />
          )}
        </div>

        <Button
          asChild
          className={cn(
            "mt-5 h-12 w-full rounded-full px-5 text-sm font-extrabold transition hover:-translate-y-0.5",
            plan.highlighted
              ? "bg-[linear-gradient(135deg,#D97800,#FFAA3D)] text-white shadow-[0_20px_48px_-28px_rgba(217,120,0,0.72)]"
              : "bg-[linear-gradient(135deg,#014BAA,#1B3FFF)] text-white shadow-[0_20px_48px_-28px_rgba(1,75,170,0.72)]",
          )}
        >
          <Link href={plan.cta.href}>
            {plan.cta.label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function ComparisonSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#F7FBFF] px-4 py-16 sm:px-8 lg:py-24"
      id="compare"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,75,170,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(1,75,170,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(280px,0.38fr)] lg:items-end">
          <div>
            <p className={sectionEyebrowClass}>Compare plans</p>
            <h2 className={sectionTitleClass}>
              See what scales at each stage.
            </h2>
          </div>
          <p className="text-sm leading-6 font-semibold text-[#52617C] lg:text-right">
            The core platform stays included. Higher tiers expand team access,
            automation depth, support, integrations, and custom scale.
          </p>
        </div>

        <DesktopComparisonTable />
        <MobileComparisonCards />
      </div>
    </section>
  );
}

function DesktopComparisonTable() {
  return (
    <div className="mt-10 hidden overflow-hidden rounded-[8px] border border-[#D8E6F8] bg-white shadow-[0_26px_86px_-64px_rgba(1,75,170,0.58)] lg:block">
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">Auxify plan comparison</caption>
        <thead>
          <tr className="border-b border-[#D8E6F8] bg-[#EEF5FF]">
            <th className="w-[28%] px-5 py-4 text-xs font-black tracking-[0.16em] text-[#014BAA] uppercase">
              Features
            </th>
            {COMPARISON_COLUMNS.map((column) => (
              <th
                className="px-5 py-4 text-sm font-black text-[#07111D]"
                key={column}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row, rowIndex) => (
            <tr
              className={cn(
                "border-b border-[#E4ECF8] last:border-b-0",
                rowIndex % 2 === 1 ? "bg-[#FAFCFF]" : "bg-white",
              )}
              key={row.feature}
            >
              <th className="px-5 py-4 text-sm font-black text-[#314468]">
                {row.feature}
              </th>
              {row.values.map((value, index) => (
                <td
                  className="px-5 py-4 text-sm font-bold text-[#52617C]"
                  key={`${row.feature}-${COMPARISON_COLUMNS[index]}`}
                >
                  <ComparisonValue value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonValue({ value }: { value: string }) {
  if (value === "Included") {
    return (
      <span className="inline-flex items-center gap-2 text-[#008756]">
        <CheckCircle2 className="size-4" />
        Included
      </span>
    );
  }

  if (value === "—") {
    return (
      <span aria-label="Not included" className="text-[#A0AEC0]">
        —
      </span>
    );
  }

  return <span className="text-[#07111D]">{value}</span>;
}

function MobileComparisonCards() {
  return (
    <div className="mt-10 grid gap-4 lg:hidden">
      {COMPARISON_COLUMNS.map((column, columnIndex) => (
        <article
          className="rounded-[8px] border border-[#D8E6F8] bg-white p-4 shadow-[0_22px_72px_-58px_rgba(1,75,170,0.58)]"
          key={column}
        >
          <h3 className="text-2xl font-black tracking-[-0.045em] text-[#014BAA]">
            {column}
          </h3>
          <div className="mt-4 grid gap-2">
            {COMPARISON_ROWS.map((row) => (
              <div
                className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,0.72fr)] gap-3 rounded-[8px] bg-[#F8FBFF] px-3 py-3 text-sm"
                key={row.feature}
              >
                <span className="font-black text-[#314468]">{row.feature}</span>
                <span className="text-right font-bold text-[#52617C]">
                  <ComparisonValue value={row.values[columnIndex]} />
                </span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function AddOnsSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-8 lg:py-24"
      id="addons"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.4fr)] lg:items-end">
          <div>
            <p className={sectionEyebrowClass}>Add-ons</p>
            <h2 className={sectionTitleClass}>Scale anytime as you grow.</h2>
          </div>
          <p className="text-sm leading-6 font-semibold text-[#52617C] lg:text-right">
            Expand only the capacity your team needs: messages, voice,
            campaigns, agents, or users.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADD_ONS.map((addOn) => {
            const Icon = addOn.icon;

            return (
              <article
                className="flex min-h-28 items-center gap-4 rounded-[8px] border border-[#DCE7F6] bg-[#F8FBFF] p-4 shadow-[0_20px_68px_-58px_rgba(1,75,170,0.52)]"
                key={addOn.label}
              >
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-[8px]",
                    addOn.toneClassName,
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-[#314468]">
                    {addOn.label}
                  </span>
                  <span className="mt-2 block text-3xl leading-none font-black tracking-[-0.05em] text-[#014BAA]">
                    {addOn.price}
                  </span>
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const COMPETITOR_ROWS: ReadonlyArray<{
  feature: string;
  auxify: string;
  others: string;
}> = [
  {
    feature: "AI Calling Cost",
    auxify: "Starting at ₹1.25/minute",
    others: "Typically ₹6–₹12/minute after platform, voice, transcription & AI model fees",
  },
  {
    feature: "Pricing Model",
    auxify: "Simple & predictable pricing",
    others: "Multiple usage-based charges",
  },
  {
    feature: "Platform Type",
    auxify: "AI Workforce Platform",
    others: "Voice AI Infrastructure",
  },
  {
    feature: "CRM Included",
    auxify: "✓ Built-in CRM",
    others: "✗ External CRM Required",
  },
  {
    feature: "Unified Inbox",
    auxify: "✓ Included",
    others: "✗ Not Available",
  },
  {
    feature: "WhatsApp Integration",
    auxify: "✓ Native",
    others: "Limited or External Setup",
  },
  {
    feature: "Email Integration",
    auxify: "✓ Native",
    others: "Limited",
  },
  {
    feature: "Website Chat",
    auxify: "✓ Included",
    others: "Usually Not Included",
  },
  {
    feature: "AI Employees",
    auxify: "✓ 7+ Business Employees Ready to Deploy",
    others: "Primarily Voice Agents",
  },
  {
    feature: "Workflow Automation",
    auxify: "✓ Advanced No-Code Builder",
    others: "Limited or Developer-Led",
  },
  {
    feature: "Lead Management",
    auxify: "✓ Included",
    others: "External Tool Required",
  },
  {
    feature: "Campaign Management",
    auxify: "✓ Included",
    others: "Usually Not Available",
  },
  {
    feature: "Voice Quality",
    auxify: "✓ Human-like Conversations",
    others: "Human-like Conversations",
  },
  {
    feature: "Multilingual Support",
    auxify: "✓ Included",
    others: "Available on Most Platforms",
  },
  {
    feature: "Voice Cloning",
    auxify: "✓ Available",
    others: "Available",
  },
  {
    feature: "Knowledge Base Training",
    auxify: "✓ Included",
    others: "Available",
  },
  {
    feature: "Deployment Time",
    auxify: "Hours to Days",
    others: "Days to Weeks",
  },
  {
    feature: "Technical Expertise",
    auxify: "No Developers Required",
    others: "Often Requires Technical Teams",
  },
  {
    feature: "Analytics",
    auxify: "Customer, Revenue, Agent & Campaign Analytics",
    others: "Primarily Call Analytics",
  },
  {
    feature: "Integrations",
    auxify: "CRM, ERP, WhatsApp, Email, APIs & Business Tools",
    others: "APIs & Selected Integrations",
  },
  {
    feature: "Scalability",
    auxify: "Enterprise Grade",
    others: "Enterprise Grade",
  },
  {
    feature: "Best For",
    auxify: "Complete Customer Operations Automation",
    others: "AI Calling & Voice Automation",
  },
];

function CompetitorComparisonSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#F7FBFF] px-4 py-16 sm:px-8 lg:py-24"
      id="vs-others"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,75,170,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(1,75,170,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(280px,0.38fr)] lg:items-end">
          <div>
            <p className={sectionEyebrowClass}>Why Auxify</p>
            <h2 className={sectionTitleClass}>
              Auxify vs Traditional Voice AI Platforms
            </h2>
          </div>
          <p className="text-sm leading-6 font-semibold text-[#52617C] lg:text-right">
            See how Auxify compares to traditional voice AI platforms on cost, features, and deployment.
          </p>
        </div>

        <div className="mt-10 grid gap-2">
          {/* Header Row */}
          <div className="grid grid-cols-[0.8fr_1.2fr_1.2fr] overflow-hidden rounded-xl">
            <div className="flex items-center bg-[#F0F4FA] px-4 py-4 sm:px-6">
              <span className="text-sm font-black text-[#314468]">Features</span>
            </div>
            <div className="flex items-center justify-center bg-[#E4EDFF] px-4 py-4 sm:px-6">
              <span className="inline-flex items-center gap-2 text-sm font-black text-[#014BAA]">
                <LogoMark className="size-5" decorative />
                Auxify
              </span>
            </div>
            <div className="flex items-center justify-center bg-[#F0F4FA] px-4 py-4 sm:px-6">
              <span className="text-center text-sm font-black text-[#657084]">Traditional Voice AI</span>
            </div>
          </div>

          {/* Data Rows */}
          {COMPETITOR_ROWS.map((row) => (
            <div
              className="grid grid-cols-[0.8fr_1.2fr_1.2fr] overflow-hidden rounded-xl"
              key={row.feature}
            >
              <div className="flex items-center bg-[#F0F4FA] px-4 py-3.5 sm:px-6">
                <span className="text-sm font-bold text-[#314468]">{row.feature}</span>
              </div>
              <div className="flex items-center justify-center bg-[#E9F0FF] px-4 py-3.5 text-center sm:px-6">
                <span className="text-sm font-semibold text-[#07111D]">{row.auxify}</span>
              </div>
              <div className="flex items-center justify-center bg-[#F0F4FA] px-4 py-3.5 text-center sm:px-6">
                <span className="text-sm font-medium text-[#52617C]">{row.others}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FBFF_48%,#FFFFFF_100%)] px-4 py-16 sm:px-8 lg:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className={sectionEyebrowClass}>Frequently asked questions</p>
          <h2 className={sectionTitleClass}>
            Everything you need to know about Auxify pricing
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3">
          {FAQS.map((faq, index) => (
            <details
              className="group rounded-[8px] border border-[#DCE7F6] bg-white p-0 shadow-[0_18px_58px_-50px_rgba(1,75,170,0.5)] open:border-[#BFD1FF]"
              key={faq.question}
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 text-left transition hover:bg-[#F8FBFF] sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-sm font-black text-[#014BAA]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-base font-black text-[#07111D] sm:text-lg">
                  {faq.question}
                </span>
                <Plus className="size-5 shrink-0 text-[#014BAA] transition group-open:rotate-45" />
              </summary>
              <div className="border-t border-[#E4ECF8] px-4 py-5 sm:px-6">
                <p className="text-sm leading-7 font-medium text-[#52617C] sm:text-base">
                  {faq.answer}
                </p>
                {faq.points ? (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {faq.points.map((point) => (
                      <li
                        className="flex items-start gap-2 text-sm leading-6 font-semibold text-[#314468]"
                        key={point}
                      >
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#008756]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="bg-[#014BAA] px-4 py-16 text-white sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.32fr)] lg:items-center">
        <div>
          <h2 className="max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] font-black tracking-[-0.07em] text-balance">
            Start with what fits today. Grow without rebuilding operations.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 font-semibold text-white/76 sm:text-lg sm:leading-8">
            Grow with more users, more AI employees, more automation, and dedicated
            Auxify experts supporting your team at every stage.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="h-12 rounded-full bg-white px-7 text-sm font-extrabold text-[#014BAA] transition hover:-translate-y-0.5 hover:bg-[#EEF5FF]"
          >
            <Link href="/sign-in">
              Start Free Trial
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full border-white/28 bg-white/10 px-7 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16"
            variant="outline"
          >
            <Link href="/sign-up">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
