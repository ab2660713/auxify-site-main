import {
  ClipboardList,
  CreditCard,
  Headset,
  LifeBuoy,
  TrendingUp,
  UserCog,
  Wrench,
} from "lucide-react";

import type { AgentVisualKind } from "../../platform/_components/platform-data";

import type { IconComponent } from "./industries-data";

/**
 * Each of the six industries ships the same seven specialized AI agents.
 * The role, icon, accent, and visual are shared; the title, tagline,
 * description, capabilities, and outcomes are tailored per industry.
 */
export const agentKeys = [
  "receptionist",
  "support",
  "sales",
  "billing",
  "recruitment",
  "it",
  "research",
] as const;

export type AgentKey = (typeof agentKeys)[number];

export type AgentMeta = {
  accent: string;
  icon: IconComponent;
  role: string;
  visual: AgentVisualKind;
};

export const agentMeta: Record<AgentKey, AgentMeta> = {
  receptionist: {
    role: "Front Desk",
    icon: Headset,
    accent: "#014BAA",
    visual: "receptionist",
  },
  support: {
    role: "Customer Support",
    icon: LifeBuoy,
    accent: "#008756",
    visual: "support",
  },
  sales: {
    role: "Sales & Telemarketing",
    icon: TrendingUp,
    accent: "#1B3FFF",
    visual: "sales",
  },
  billing: {
    role: "Collections & Billing",
    icon: CreditCard,
    accent: "#D97800",
    visual: "billing",
  },
  recruitment: {
    role: "HR & Recruitment",
    icon: UserCog,
    accent: "#6D4AFF",
    visual: "recruitment",
  },
  it: {
    role: "IT / Help Desk",
    icon: Wrench,
    accent: "#0E7FB8",
    visual: "it",
  },
  research: {
    role: "Market Research & Survey",
    icon: ClipboardList,
    accent: "#C2185B",
    visual: "research",
  },
};

export type IndustryAgent = {
  key: AgentKey;
  title: string;
  tagline: string;
  description: string;
  capabilities: readonly string[];
  outcomes: readonly string[];
};

export type ResolvedIndustryAgent = IndustryAgent & AgentMeta;

/** Industry slug → its seven tailored agents, in display order. */
export const industryAgents: Record<string, readonly IndustryAgent[]> = {
  "real-estate": [
    {
      key: "receptionist",
      title: "Front Desk AI Agent",
      tagline: "Greet every property inquiry the moment it arrives",
      description:
        "Welcomes buyers and tenants across WhatsApp, calls, and web, answers first questions about listings, and routes serious inquiries to the right broker—day or night.",
      capabilities: [
        "Greet new property inquiries instantly",
        "Answer listing and location questions",
        "Capture buyer budget and intent",
        "Route to the right broker or branch",
        "Handle after-hours enquiries",
      ],
      outcomes: [
        "Faster first response",
        "No missed inquiries",
        "Better broker routing",
      ],
    },
    {
      key: "support",
      title: "Customer Support AI Agent",
      tagline: "Resolve buyer and tenant questions without delay",
      description:
        "Answers common questions about pricing, availability, documentation, and possession, then escalates complex cases to your sales or legal team with full context.",
      capabilities: [
        "Answer pricing & availability FAQs",
        "Explain documentation & possession steps",
        "Share brochures and floor plans",
        "Log issue details for the team",
        "Escalate complex cases with context",
      ],
      outcomes: [
        "Shorter response times",
        "Lower team workload",
        "Consistent buyer experience",
      ],
    },
    {
      key: "sales",
      title: "Sales & Telemarketing AI Agent",
      tagline: "Qualify buyers and book site visits automatically",
      description:
        "Engages every lead instantly, asks qualification questions, scores intent, and books site visits—then hands hot buyers to brokers.",
      capabilities: [
        "Capture leads from portals & ads",
        "Qualify budget, location, timeline",
        "Score buyer readiness",
        "Book and confirm site visits",
        "Route hot buyers to brokers",
      ],
      outcomes: [
        "More site visits booked",
        "Faster lead response",
        "Higher closing rate",
      ],
    },
    {
      key: "billing",
      title: "Collections & Billing AI Agent",
      tagline: "Keep token, booking, and rent payments on track",
      description:
        "Sends reminders for token amounts, booking installments, and rent dues, confirms payment status, and escalates overdue accounts professionally.",
      capabilities: [
        "Send installment & rent reminders",
        "Share payment links & receipts",
        "Confirm payment status",
        "Answer billing questions",
        "Escalate overdue accounts",
      ],
      outcomes: [
        "Faster collections",
        "Fewer missed payments",
        "Less manual chasing",
      ],
    },
    {
      key: "recruitment",
      title: "HR & Recruitment AI Agent",
      tagline: "Hire brokers and sales agents faster",
      description:
        "Screens sales-agent and broker applicants, schedules interviews, and follows up automatically so your hiring pipeline never stalls.",
      capabilities: [
        "Screen agent & broker applicants",
        "Answer candidate questions",
        "Schedule interviews",
        "Send reminders & follow-ups",
        "Route candidates to HR",
      ],
      outcomes: [
        "Faster hiring",
        "Better candidate experience",
        "Less scheduling work",
      ],
    },
    {
      key: "it",
      title: "IT / Help Desk AI Agent",
      tagline: "Support your agents and CRM tools fast",
      description:
        "Captures internal IT and CRM issues from your sales teams, guides troubleshooting, creates tickets, and escalates critical outages.",
      capabilities: [
        "Collect CRM & device issues",
        "Guide quick troubleshooting",
        "Create and assign tickets",
        "Escalate critical outages",
        "Track resolution status",
      ],
      outcomes: [
        "Faster ticket resolution",
        "Less downtime",
        "Higher team productivity",
      ],
    },
    {
      key: "research",
      title: "Market Research & Survey AI Agent",
      tagline: "Capture buyer feedback and gauge market demand",
      description:
        "Runs post-visit and post-purchase surveys, measures locality demand, and pushes structured insights into your reporting.",
      capabilities: [
        "Send post-visit surveys",
        "Ask structured questions",
        "Capture buyer preferences",
        "Follow up on non-responses",
        "Push data into reporting",
      ],
      outcomes: [
        "More feedback collected",
        "Clearer demand insight",
        "Better project decisions",
      ],
    },
  ],
  healthcare: [
    {
      key: "receptionist",
      title: "Front Desk AI Agent",
      tagline: "Welcome patients and route them in seconds",
      description:
        "Greets patient inquiries, answers questions about doctors, timings, and services, and routes urgent cases to the right department around the clock.",
      capabilities: [
        "Greet patient inquiries instantly",
        "Share doctor & department info",
        "Answer timing & service questions",
        "Route urgent cases correctly",
        "Handle after-hours requests",
      ],
      outcomes: [
        "Faster first response",
        "Lower front-desk load",
        "Better patient routing",
      ],
    },
    {
      key: "support",
      title: "Customer Support AI Agent",
      tagline: "Answer patient questions with care and consistency",
      description:
        "Handles common questions on reports, preparations, insurance, and follow-ups, and escalates clinical concerns to staff with full context.",
      capabilities: [
        "Answer report & prep FAQs",
        "Explain insurance & paperwork",
        "Share pre-visit instructions",
        "Capture patient concerns",
        "Escalate clinical queries",
      ],
      outcomes: [
        "Shorter wait times",
        "Reduced staff load",
        "Consistent patient care",
      ],
    },
    {
      key: "sales",
      title: "Sales & Telemarketing AI Agent",
      tagline: "Convert inquiries into confirmed appointments",
      description:
        "Engages new patient inquiries, qualifies needs, books appointments, and follows up on outbound health-package outreach.",
      capabilities: [
        "Capture patient inquiries",
        "Qualify needs & urgency",
        "Book and confirm appointments",
        "Run health-package outreach",
        "Route to the right doctor",
      ],
      outcomes: [
        "More confirmed visits",
        "Faster response",
        "Higher package uptake",
      ],
    },
    {
      key: "billing",
      title: "Collections & Billing AI Agent",
      tagline: "Simplify bills, claims, and payment follow-up",
      description:
        "Sends payment reminders, shares invoices and estimates, answers billing and insurance questions, and escalates overdue balances.",
      capabilities: [
        "Send bill & estimate reminders",
        "Share invoices & receipts",
        "Answer insurance & billing FAQs",
        "Confirm payment status",
        "Escalate overdue balances",
      ],
      outcomes: [
        "Faster collections",
        "Fewer billing disputes",
        "Less manual follow-up",
      ],
    },
    {
      key: "recruitment",
      title: "HR & Recruitment AI Agent",
      tagline: "Hire clinical and support staff faster",
      description:
        "Screens nurses, technicians, and front-desk applicants, schedules interviews, and keeps hiring communication moving.",
      capabilities: [
        "Screen clinical & support applicants",
        "Answer candidate questions",
        "Schedule interviews",
        "Send reminders & follow-ups",
        "Route to HR",
      ],
      outcomes: [
        "Faster staffing",
        "Better candidate experience",
        "Less scheduling work",
      ],
    },
    {
      key: "it",
      title: "IT / Help Desk AI Agent",
      tagline: "Keep clinic systems running smoothly",
      description:
        "Captures issues with HIS/EMR tools and devices, guides troubleshooting, creates tickets, and escalates critical outages.",
      capabilities: [
        "Collect EMR & device issues",
        "Guide quick troubleshooting",
        "Create and assign tickets",
        "Escalate critical outages",
        "Track resolution status",
      ],
      outcomes: ["Less downtime", "Faster resolution", "Smoother operations"],
    },
    {
      key: "research",
      title: "Market Research & Survey AI Agent",
      tagline: "Measure patient satisfaction at scale",
      description:
        "Runs post-visit satisfaction surveys, captures feedback on services, and pushes structured insights to your team.",
      capabilities: [
        "Send post-visit surveys",
        "Ask structured questions",
        "Capture satisfaction scores",
        "Follow up on non-responses",
        "Push data into reporting",
      ],
      outcomes: [
        "More feedback collected",
        "Better service insight",
        "Higher patient satisfaction",
      ],
    },
  ],
  education: [
    {
      key: "receptionist",
      title: "Front Desk AI Agent",
      tagline: "Welcome every admission inquiry instantly",
      description:
        "Greets student and parent inquiries, answers questions about courses and fees, and routes serious prospects to counselors—anytime.",
      capabilities: [
        "Greet admission inquiries instantly",
        "Share course & fee details",
        "Answer eligibility questions",
        "Route to the right counselor",
        "Handle after-hours queries",
      ],
      outcomes: [
        "Faster first response",
        "No missed inquiries",
        "Better counselor routing",
      ],
    },
    {
      key: "support",
      title: "Customer Support AI Agent",
      tagline: "Answer student and parent questions reliably",
      description:
        "Handles questions about schedules, documents, scholarships, and admissions, and escalates complex cases to staff with context.",
      capabilities: [
        "Answer schedule & document FAQs",
        "Explain scholarships & process",
        "Share prospectus & forms",
        "Capture query details",
        "Escalate complex cases",
      ],
      outcomes: [
        "Shorter response times",
        "Lower staff load",
        "Consistent experience",
      ],
    },
    {
      key: "sales",
      title: "Sales & Telemarketing AI Agent",
      tagline: "Turn inquiries into enrollments",
      description:
        "Qualifies prospective students, books counseling calls, runs admission outreach, and follows up on incomplete applications.",
      capabilities: [
        "Capture admission inquiries",
        "Qualify course interest & fit",
        "Book counseling sessions",
        "Run admission outreach",
        "Follow up on applications",
      ],
      outcomes: [
        "Higher enrollment conversion",
        "Faster follow-up",
        "More counseling booked",
      ],
    },
    {
      key: "billing",
      title: "Collections & Billing AI Agent",
      tagline: "Keep fee payments on schedule",
      description:
        "Sends fee and installment reminders, shares payment links and receipts, answers fee questions, and escalates overdue dues.",
      capabilities: [
        "Send fee & installment reminders",
        "Share payment links & receipts",
        "Answer fee structure questions",
        "Confirm payment status",
        "Escalate overdue dues",
      ],
      outcomes: [
        "Faster fee collection",
        "Fewer missed payments",
        "Less manual chasing",
      ],
    },
    {
      key: "recruitment",
      title: "HR & Recruitment AI Agent",
      tagline: "Hire faculty and staff faster",
      description:
        "Screens teaching and administrative applicants, schedules interviews, and follows up automatically.",
      capabilities: [
        "Screen faculty & staff applicants",
        "Answer candidate questions",
        "Schedule interviews",
        "Send reminders & follow-ups",
        "Route to HR",
      ],
      outcomes: [
        "Faster hiring",
        "Better candidate experience",
        "Less scheduling work",
      ],
    },
    {
      key: "it",
      title: "IT / Help Desk AI Agent",
      tagline: "Support students, faculty, and LMS tools",
      description:
        "Captures issues with LMS, portals, and devices, guides troubleshooting, creates tickets, and escalates critical outages.",
      capabilities: [
        "Collect LMS & portal issues",
        "Guide quick troubleshooting",
        "Create and assign tickets",
        "Escalate critical outages",
        "Track resolution status",
      ],
      outcomes: ["Less downtime", "Faster resolution", "Smoother learning ops"],
    },
    {
      key: "research",
      title: "Market Research & Survey AI Agent",
      tagline: "Capture student and parent feedback",
      description:
        "Runs course and satisfaction surveys, gauges demand for new programs, and pushes insights into reporting.",
      capabilities: [
        "Send course & satisfaction surveys",
        "Ask structured questions",
        "Capture feedback & demand",
        "Follow up on non-responses",
        "Push data into reporting",
      ],
      outcomes: [
        "More feedback collected",
        "Clearer program demand",
        "Better decisions",
      ],
    },
  ],
  finance: [
    {
      key: "receptionist",
      title: "Front Desk AI Agent",
      tagline: "Greet every financial inquiry professionally",
      description:
        "Welcomes customers across channels, answers questions about products and eligibility, and routes qualified leads to advisors securely.",
      capabilities: [
        "Greet new inquiries instantly",
        "Share product & eligibility info",
        "Answer basic questions",
        "Route to the right advisor",
        "Handle after-hours requests",
      ],
      outcomes: [
        "Faster first response",
        "No missed inquiries",
        "Better advisor routing",
      ],
    },
    {
      key: "support",
      title: "Customer Support AI Agent",
      tagline: "Resolve customer queries with consistency",
      description:
        "Handles questions on documentation, status, and processes, captures details securely, and escalates sensitive matters to your team.",
      capabilities: [
        "Answer process & status FAQs",
        "Explain required documents",
        "Share forms & checklists",
        "Capture query details",
        "Escalate sensitive cases",
      ],
      outcomes: [
        "Shorter response times",
        "Lower team load",
        "Consistent service",
      ],
    },
    {
      key: "sales",
      title: "Sales & Telemarketing AI Agent",
      tagline: "Qualify and convert financial leads",
      description:
        "Engages leads for loans, insurance, and investments, qualifies eligibility, collects documents, and routes to advisors.",
      capabilities: [
        "Capture product inquiries",
        "Qualify eligibility & intent",
        "Collect required documents",
        "Run outbound campaigns",
        "Route to advisors",
      ],
      outcomes: [
        "Higher conversion",
        "Faster qualification",
        "Better document completion",
      ],
    },
    {
      key: "billing",
      title: "Collections & Billing AI Agent",
      tagline: "Automate EMI and premium follow-up",
      description:
        "Sends reminders for EMIs, premiums, and renewals, confirms payment status, and escalates overdue accounts professionally.",
      capabilities: [
        "Send EMI & premium reminders",
        "Share payment links & receipts",
        "Confirm payment status",
        "Answer billing questions",
        "Escalate overdue accounts",
      ],
      outcomes: [
        "Faster collections",
        "Fewer missed payments",
        "Less manual chasing",
      ],
    },
    {
      key: "recruitment",
      title: "HR & Recruitment AI Agent",
      tagline: "Hire advisors and agents faster",
      description:
        "Screens financial-advisor and support applicants, schedules interviews, and follows up automatically.",
      capabilities: [
        "Screen advisor & support applicants",
        "Answer candidate questions",
        "Schedule interviews",
        "Send reminders & follow-ups",
        "Route to HR",
      ],
      outcomes: [
        "Faster hiring",
        "Better candidate experience",
        "Less scheduling work",
      ],
    },
    {
      key: "it",
      title: "IT / Help Desk AI Agent",
      tagline: "Support core banking and CRM tools",
      description:
        "Captures issues with banking, CRM, and devices, guides troubleshooting, creates tickets, and escalates critical incidents.",
      capabilities: [
        "Collect system & device issues",
        "Guide quick troubleshooting",
        "Create and assign tickets",
        "Escalate critical incidents",
        "Track resolution status",
      ],
      outcomes: ["Less downtime", "Faster resolution", "Higher productivity"],
    },
    {
      key: "research",
      title: "Market Research & Survey AI Agent",
      tagline: "Understand customer needs and trust",
      description:
        "Runs satisfaction and product-interest surveys, captures feedback, and pushes structured insights into reporting.",
      capabilities: [
        "Send satisfaction surveys",
        "Ask structured questions",
        "Capture product interest",
        "Follow up on non-responses",
        "Push data into reporting",
      ],
      outcomes: [
        "More feedback collected",
        "Clearer product demand",
        "Better decisions",
      ],
    },
  ],
  retail: [
    {
      key: "receptionist",
      title: "Front Desk AI Agent",
      tagline: "Greet every shopper the moment they message",
      description:
        "Welcomes customers across WhatsApp, social, and web, answers product and store questions, and routes shoppers to the right team.",
      capabilities: [
        "Greet shoppers instantly",
        "Answer product & store FAQs",
        "Share catalogs & offers",
        "Route to the right team",
        "Handle after-hours messages",
      ],
      outcomes: [
        "Faster first response",
        "No missed messages",
        "Better routing",
      ],
    },
    {
      key: "support",
      title: "Customer Support AI Agent",
      tagline: "Resolve orders, returns, and queries fast",
      description:
        "Handles order status, returns, and product questions, shares live tracking, and escalates complex cases with full context.",
      capabilities: [
        "Answer order & return FAQs",
        "Share live order tracking",
        "Handle product questions",
        "Capture issue details",
        "Escalate complex cases",
      ],
      outcomes: [
        "Faster support replies",
        "Lower ticket load",
        "Better experience",
      ],
    },
    {
      key: "sales",
      title: "Sales & Telemarketing AI Agent",
      tagline: "Recover carts and drive repeat purchases",
      description:
        "Recommends products, recovers abandoned carts, runs promotions, and nudges customers toward repeat orders.",
      capabilities: [
        "Recommend products",
        "Recover abandoned carts",
        "Run promotional outreach",
        "Qualify buyer intent",
        "Nudge repeat purchases",
      ],
      outcomes: [
        "More repeat revenue",
        "Higher cart recovery",
        "Better conversion",
      ],
    },
    {
      key: "billing",
      title: "Collections & Billing AI Agent",
      tagline: "Streamline payments, COD, and refunds",
      description:
        "Sends payment links, confirms COD orders, shares invoices, answers billing questions, and follows up on pending payments.",
      capabilities: [
        "Send payment links",
        "Confirm COD orders",
        "Share invoices & receipts",
        "Answer billing questions",
        "Follow up on pending payments",
      ],
      outcomes: [
        "Faster payments",
        "Fewer failed orders",
        "Less manual follow-up",
      ],
    },
    {
      key: "recruitment",
      title: "HR & Recruitment AI Agent",
      tagline: "Hire store and support staff faster",
      description:
        "Screens store, warehouse, and support applicants, schedules interviews, and keeps hiring moving.",
      capabilities: [
        "Screen store & support applicants",
        "Answer candidate questions",
        "Schedule interviews",
        "Send reminders & follow-ups",
        "Route to HR",
      ],
      outcomes: [
        "Faster hiring",
        "Better candidate experience",
        "Less scheduling work",
      ],
    },
    {
      key: "it",
      title: "IT / Help Desk AI Agent",
      tagline: "Keep POS and storefront tools online",
      description:
        "Captures issues with POS, storefront, and devices, guides troubleshooting, creates tickets, and escalates outages.",
      capabilities: [
        "Collect POS & storefront issues",
        "Guide quick troubleshooting",
        "Create and assign tickets",
        "Escalate critical outages",
        "Track resolution status",
      ],
      outcomes: ["Less downtime", "Faster resolution", "Smoother operations"],
    },
    {
      key: "research",
      title: "Market Research & Survey AI Agent",
      tagline: "Capture shopper feedback at scale",
      description:
        "Runs post-purchase surveys, collects product feedback and reviews, and pushes insights into reporting.",
      capabilities: [
        "Send post-purchase surveys",
        "Collect reviews & ratings",
        "Ask structured questions",
        "Follow up on non-responses",
        "Push data into reporting",
      ],
      outcomes: [
        "More reviews collected",
        "Clearer product insight",
        "Better decisions",
      ],
    },
  ],
  events: [
    {
      key: "receptionist",
      title: "Front Desk AI Agent",
      tagline: "Welcome every guest inquiry instantly",
      description:
        "Greets guests across channels, answers questions about availability and packages, and routes bookings to the right team—24/7.",
      capabilities: [
        "Greet guest inquiries instantly",
        "Share availability & packages",
        "Answer venue & service FAQs",
        "Route to the right team",
        "Handle after-hours requests",
      ],
      outcomes: [
        "Faster first response",
        "No missed inquiries",
        "Better routing",
      ],
    },
    {
      key: "support",
      title: "Customer Support AI Agent",
      tagline: "Answer guest questions with consistency",
      description:
        "Handles questions about amenities, timings, and policies, captures special requests, and escalates complex cases to staff.",
      capabilities: [
        "Answer amenity & policy FAQs",
        "Share menus & brochures",
        "Capture special requests",
        "Log issue details",
        "Escalate complex cases",
      ],
      outcomes: [
        "Shorter response times",
        "Lower staff load",
        "Better guest experience",
      ],
    },
    {
      key: "sales",
      title: "Sales & Telemarketing AI Agent",
      tagline: "Convert inquiries into confirmed bookings",
      description:
        "Engages event and stay inquiries, checks availability, sends quotes, and follows up to confirm bookings.",
      capabilities: [
        "Capture booking inquiries",
        "Check availability & hold dates",
        "Send quotes & packages",
        "Run outbound follow-ups",
        "Route to sales team",
      ],
      outcomes: [
        "More confirmed bookings",
        "Faster response",
        "Higher conversion",
      ],
    },
    {
      key: "billing",
      title: "Collections & Billing AI Agent",
      tagline: "Keep deposits and balances on track",
      description:
        "Sends reminders for deposits and balance payments, shares invoices, confirms status, and escalates overdue accounts.",
      capabilities: [
        "Send deposit & balance reminders",
        "Share invoices & receipts",
        "Confirm payment status",
        "Answer billing questions",
        "Escalate overdue accounts",
      ],
      outcomes: [
        "Faster collections",
        "Fewer missed payments",
        "Less manual chasing",
      ],
    },
    {
      key: "recruitment",
      title: "HR & Recruitment AI Agent",
      tagline: "Hire event and hospitality staff faster",
      description:
        "Screens service, kitchen, and front-desk applicants, schedules interviews, and keeps hiring moving for peak seasons.",
      capabilities: [
        "Screen service & support applicants",
        "Answer candidate questions",
        "Schedule interviews",
        "Send reminders & follow-ups",
        "Route to HR",
      ],
      outcomes: [
        "Faster seasonal hiring",
        "Better candidate experience",
        "Less scheduling work",
      ],
    },
    {
      key: "it",
      title: "IT / Help Desk AI Agent",
      tagline: "Keep booking and PMS systems running",
      description:
        "Captures issues with booking, PMS, and devices, guides troubleshooting, creates tickets, and escalates outages.",
      capabilities: [
        "Collect booking & PMS issues",
        "Guide quick troubleshooting",
        "Create and assign tickets",
        "Escalate critical outages",
        "Track resolution status",
      ],
      outcomes: ["Less downtime", "Faster resolution", "Smoother operations"],
    },
    {
      key: "research",
      title: "Market Research & Survey AI Agent",
      tagline: "Measure guest satisfaction after every event",
      description:
        "Runs post-event and post-stay surveys, captures feedback, and pushes structured insights into reporting.",
      capabilities: [
        "Send post-event surveys",
        "Ask structured questions",
        "Capture guest satisfaction",
        "Follow up on non-responses",
        "Push data into reporting",
      ],
      outcomes: [
        "More feedback collected",
        "Better guest insight",
        "Higher satisfaction",
      ],
    },
  ],
};

/** Resolve a slug to its industry agents merged with shared meta. */
export function getIndustryAgents(slug: string): ResolvedIndustryAgent[] {
  const agents = industryAgents[slug];
  if (!agents) return [];
  return agents.map((agent) => ({ ...agentMeta[agent.key], ...agent }));
}
