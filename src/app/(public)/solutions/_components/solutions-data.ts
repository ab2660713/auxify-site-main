import type { ComponentType } from "react";
import {
  BarChart3,
  Database,
  Headset,
  LifeBuoy,
  Megaphone,
  MessageSquare,
  Network,
  PhoneCall,
  Repeat,
  Route,
  Sparkles,
  Target,
  UserCheck,
  Workflow,
} from "lucide-react";

export type IconComponent = ComponentType<{ className?: string }>;

export const pageX = "px-5 sm:px-8 lg:px-12 xl:px-20";

export const navItems = [
  { label: "Sales", href: "#sales" },
  { label: "Support", href: "#support" },
  { label: "Marketing", href: "#marketing" },
  { label: "Operations", href: "#operations" },
] as const;

/** Teams feeding into the AI core (hero convergence map). */
export const teamInputs: readonly { label: string; icon: IconComponent }[] = [
  { label: "Sales", icon: Target },
  { label: "Support", icon: LifeBuoy },
  { label: "Marketing", icon: Megaphone },
  { label: "Operations", icon: Network },
];

/** The operating layer the AI fans out into. */
export const operatingLayer: readonly {
  label: string;
  icon: IconComponent;
}[] = [
  { label: "Conversations", icon: Headset },
  { label: "CRM", icon: Database },
  { label: "Automation", icon: Workflow },
  { label: "Voice", icon: PhoneCall },
  { label: "Analytics", icon: BarChart3 },
];

export type FlowStep = {
  label: string;
  icon: IconComponent;
  isAI?: boolean;
};

export type TeamSolution = {
  slug: string;
  title: string;
  tagline: string;
  icon: IconComponent;
  /** Primary brand-aligned accent. */
  accent: string;
  /** Soft tint background. */
  soft: string;
  flow: readonly FlowStep[];
  outcomes: readonly string[];
  cta: string;
};

export const teams: readonly TeamSolution[] = [
  {
    slug: "sales",
    title: "Sales Teams",
    tagline: "Convert more leads with faster response and smarter follow-up.",
    icon: Target,
    accent: "#1B3FFF",
    soft: "#EAF0FF",
    flow: [
      { label: "Lead Sources", icon: Megaphone },
      { label: "Auxify AI", icon: Sparkles, isAI: true },
      { label: "Qualification", icon: UserCheck },
      { label: "Rep Assignment", icon: Target },
      { label: "Follow-up", icon: Repeat },
      { label: "Conversion", icon: BarChart3 },
    ],
    outcomes: [
      "Faster lead response",
      "Better qualification",
      "Consistent follow-up",
      "Higher conversion",
    ],
    cta: "Book a Sales Demo",
  },
  {
    slug: "support",
    title: "Support Teams",
    tagline: "Deliver faster customer support with AI-assisted workflows.",
    icon: LifeBuoy,
    accent: "#00C6A7",
    soft: "#E2F8F3",
    flow: [
      { label: "Customer Inquiry", icon: MessageSquare },
      { label: "Auxify AI", icon: Sparkles, isAI: true },
      { label: "Reply / Escalate", icon: Route },
      { label: "Team Action", icon: UserCheck },
      { label: "Resolution", icon: BarChart3 },
    ],
    outcomes: [
      "Faster responses",
      "Less repetitive work",
      "Smarter escalations",
      "Better experience",
    ],
    cta: "Book a Support Demo",
  },
  {
    slug: "marketing",
    title: "Marketing Teams",
    tagline:
      "Turn campaigns into conversations—and conversations into pipeline.",
    icon: Megaphone,
    accent: "#3B5EFF",
    soft: "#EBEFFF",
    flow: [
      { label: "Campaign Launch", icon: Megaphone },
      { label: "Customer Reply", icon: MessageSquare },
      { label: "Auxify AI", icon: Sparkles, isAI: true },
      { label: "Qualification", icon: UserCheck },
      { label: "Routing", icon: Route },
      { label: "Conversion", icon: BarChart3 },
    ],
    outcomes: [
      "Faster response handling",
      "Better lead capture",
      "AI qualification",
      "More conversions",
    ],
    cta: "Book a Marketing Demo",
  },
  {
    slug: "operations",
    title: "Customer Operations",
    tagline: "Run customer operations from one intelligent system.",
    icon: Network,
    accent: "#014BAA",
    soft: "#E6EEFA",
    flow: [
      { label: "Leads", icon: Target },
      { label: "Calls", icon: PhoneCall },
      { label: "Auxify AI", icon: Sparkles, isAI: true },
      { label: "CRM", icon: Database },
      { label: "Support", icon: Headset },
      { label: "Analytics", icon: BarChart3 },
    ],
    outcomes: [
      "Shared visibility",
      "Faster workflows",
      "Fewer missed handoffs",
      "Operational control",
    ],
    cta: "Book a Demo",
  },
] as const;

