import type { ComponentType } from "react";
import {
  BarChart3,
  Bot,
  ClipboardList,
  CreditCard,
  Headset,
  Inbox,
  Layers,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  PhoneCall,
  Plug,
  Sparkles,
  TrendingUp,
  UserCog,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export type IconComponent = ComponentType<{ className?: string }>;

export type ModuleVisualKind =
  | "voice"
  | "chat"
  | "campaigns"
  | "inbox"
  | "automation"
  | "copilot"
  | "analytics"
  | "leads";

export type AgentVisualKind =
  | "sales"
  | "support"
  | "recruitment"
  | "it"
  | "billing"
  | "research"
  | "receptionist";

export type PlatformModule = {
  accent: string;
  capabilities: readonly string[];
  description: string;
  icon: IconComponent;
  impact: readonly string[];
  slug: string;
  soft: string;
  tagline: string;
  title: string;
  visual: ModuleVisualKind;
};

export type AiAgent = {
  accent: string;
  capabilities: readonly string[];
  description: string;
  icon: IconComponent;
  outcomes: readonly string[];
  slug: string;
  tagline: string;
  title: string;
  visual: AgentVisualKind;
};

export const pageX = "px-5 sm:px-8 lg:px-12 xl:px-20";

export const navItems = [
  { label: "Modules", href: "#modules" },
  { label: "AI Employees", href: "#ai-agents" },
  { label: "Handoff", href: "#handoff" },
  { label: "Training", href: "#training" },
] as const;

export const connectedPoints = [
  "One customer view",
  "One shared workspace",
  "One automation layer",
  "One AI-powered system",
] as const;

export const disconnectedPoints = [
  "Messages and calls stay scattered",
  "Follow-ups get missed",
  "Teams switch between platforms",
  "Customer context gets lost",
  "Manual work slows growth",
] as const;

export const modules: readonly PlatformModule[] = [
  {
    slug: "voice-ai",
    title: "Voice AI",
    tagline: "Turn inbound and outbound calls into tracked customer actions",
    description:
      "Calls drive high-intent opportunities—but missed follow-ups slow growth. Auxify Voice AI handles calls, captures intent, and triggers next steps automatically—so teams can focus on closing more opportunities.",
    icon: PhoneCall,
    accent: "#1B3FFF",
    soft: "bg-[#EAF2FF]",
    visual: "voice",
    capabilities: [
      "AI inbound call handling",
      "AI outbound calling",
      "Missed-call recovery",
      "Call transcription",
      "Call summaries",
      "Lead qualification on calls",
      "Appointment confirmation",
      "Human handoff when needed",
      "CRM updates after calls",
      "Intent detection",
      "Voice workflow automation",
    ],
    impact: [
      "Faster lead response",
      "Higher call conversion",
      "Fewer missed opportunities",
      "Better follow-up discipline",
      "Full call visibility for managers",
    ],
  },
  {
    slug: "chat-ai",
    title: "Chat AI",
    tagline: "Respond instantly and keep conversations moving",
    description:
      "Customers expect fast replies—and growing teams can't manage every conversation manually. Auxify Chat AI responds instantly, captures intent, qualifies leads, and keeps conversations moving with AI. Faster replies without losing context.",
    icon: MessageCircle,
    accent: "#008756",
    soft: "bg-[#E8F8F1]",
    visual: "chat",
    capabilities: [
      "Instant AI replies",
      "FAQ handling",
      "Lead qualification conversations",
      "Intent detection",
      "Smart reply suggestions",
      "AI-assisted follow-ups",
      "Customer routing",
      "Business knowledge retrieval",
      "Multi-language conversation support",
    ],
    impact: [
      "Better response speed",
      "Reduced manual workload",
      "Higher customer engagement",
      "More consistent conversations",
      "Improved lead qualification",
    ],
  },
  {
    slug: "campaigns",
    title: "Campaigns",
    tagline: "Run targeted campaigns that convert conversations into action",
    description:
      "Launch personalized WhatsApp and voice campaigns from one connected platform. Automate follow-ups, reminders, and outreach while keeping every customer interaction tracked in one place.",
    icon: Megaphone,
    accent: "#6D4AFF",
    soft: "bg-[#F1EDFF]",
    visual: "campaigns",
    capabilities: [
      "Lead nurturing",
      "Promotional campaigns",
      "Appointment reminders",
      "Event communication",
      "Re-engagement campaigns",
      "Customer updates",
      "Renewal reminders",
    ],
    impact: [
      "More engagement",
      "Better timing",
      "Faster follow-ups",
      "Higher conversions",
      "Clear campaign performance visibility",
    ],
  },
  {
    slug: "omnichannel-inbox",
    title: "Omnichannel Inbox",
    tagline: "Every customer conversation in one shared workspace",
    description:
      "Customers connect across multiple channels—your team should manage everything from one place. Auxify brings WhatsApp, social messaging, website chat, email, and calls into one shared inbox connected to CRM and AI. Every conversation stays visible, organized, and ready for action.",
    icon: Inbox,
    accent: "#D97800",
    soft: "bg-[#FFF4E6]",
    visual: "inbox",
    capabilities: [
      "Shared inbox",
      "Channel history",
      "Team assignment",
      "Internal notes",
      "Tags",
      "SLA tracking",
      "Conversation status",
      "AI reply suggestions",
      "Escalation workflows",
    ],
    impact: [
      "Faster team collaboration",
      "Better customer continuity",
      "Fewer missed messages",
      "Cleaner handoffs",
      "Faster replies",
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    tagline: "Turn customer signals into automatic actions",
    description:
      "Manual coordination slows growth. Auxify helps businesses automate repetitive operational work across conversations and customer workflows. Every trigger can become the next action—without manual coordination.",
    icon: Workflow,
    accent: "#1B3FFF",
    soft: "bg-[#EAF2FF]",
    visual: "automation",
    capabilities: [
      "New lead → assign owner",
      "Missed call → send callback",
      "Pricing inquiry → notify sales",
      "No reply → follow-up sequence",
      "Appointment booked → reminder workflow",
      "Escalation → manager notification",
    ],
    impact: [
      "Faster execution",
      "Better consistency",
      "Less manual work",
      "Higher operational efficiency",
    ],
  },
  {
    slug: "ai-copilot",
    title: "AI Copilot",
    tagline: "Give every team member AI assistance inside their workflow",
    description:
      "Auxify Copilot helps teams work faster with context-aware recommendations. Instead of searching through records or rewriting the same replies, teams get AI assistance inside every conversation.",
    icon: Sparkles,
    accent: "#6D4AFF",
    soft: "bg-[#F1EDFF]",
    visual: "copilot",
    capabilities: [
      "Summarize customer history",
      "Suggest replies",
      "Draft follow-ups",
      "Recommend next actions",
      "Pull customer insights",
      "Help agents respond faster",
    ],
    impact: [
      "Higher productivity",
      "Faster execution",
      "Better decisions",
      "Reduced repetitive work",
    ],
  },
  {
    slug: "analytics",
    title: "Analytics",
    tagline: "Understand performance across every lead, team, and AI workflow",
    description:
      "Track conversations, leads, campaigns, calls, and AI performance from one dashboard. Get the visibility your team needs to move faster and make smarter decisions.",
    icon: BarChart3,
    accent: "#008756",
    soft: "bg-[#E8F8F1]",
    visual: "analytics",
    capabilities: [
      "Lead volume",
      "Lead conversion",
      "Response time",
      "Team performance",
      "Call activity",
      "Campaign performance",
      "AI resolution rate",
      "Workflow performance",
    ],
    impact: [
      "Better operational visibility",
      "Faster decisions",
      "Improved accountability",
      "Clearer growth tracking",
    ],
  },
  {
    slug: "lead-management",
    title: "Smart Contact & Lead Management",
    tagline:
      "Keep every lead and customer organized from first inquiry to conversion",
    description:
      "Every lead needs visibility and every customer needs context. Auxify connects customer profiles with conversations, calls, notes, tasks, campaigns, ownership, and workflow history. Teams always know where a customer stands and what needs to happen next.",
    icon: Users,
    accent: "#1B3FFF",
    soft: "bg-[#EAF2FF]",
    visual: "leads",
    capabilities: [
      "Contact profiles",
      "Lead stages",
      "Customer timeline",
      "Source tracking",
      "Notes",
      "Tasks",
      "Ownership",
      "Custom fields",
      "Pipeline visibility",
    ],
    impact: [
      "Better organization",
      "Cleaner pipelines",
      "Faster follow-ups",
      "Higher lead conversion",
    ],
  },
] as const;

export const agents: readonly AiAgent[] = [
  {
    slug: "sales",
    title: "Sales & Telemarketing AI Employee",
    tagline: "Qualify faster, follow up consistently, and convert more",
    description:
      "Auxify Sales AI engages leads instantly across messaging and voice—starting the conversation, capturing intent, scoring the lead, and moving the opportunity forward, even outside working hours.",
    icon: TrendingUp,
    accent: "#1B3FFF",
    visual: "sales",
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
    title: "Customer Support AI Employee",
    tagline: "Resolve common questions without slowing down your team",
    description:
      "Auxify Support AI answers common questions using your business knowledge, guides customers through standard requests, captures issue details, and routes complex cases to the right human team.",
    icon: LifeBuoy,
    accent: "#008756",
    visual: "support",
    capabilities: [
      "Answer FAQs instantly",
      "Inbound call handling",
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
    title: "HR & Recruitment AI Employee",
    tagline: "Automate repetitive hiring communication",
    description:
      "Auxify Recruitment AI keeps hiring communication moving while your team focuses on decision-making—screening applicants, scheduling interviews, and following up automatically.",
    icon: UserCog,
    accent: "#6D4AFF",
    visual: "recruitment",
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
    slug: "it-helpdesk",
    title: "IT / Help Desk AI Employee",
    tagline: "Resolve internal and customer-facing support faster",
    description:
      "Auxify IT AI captures the problem immediately and moves support faster—collecting issue details, guiding troubleshooting, creating tickets, and escalating critical issues.",
    icon: Wrench,
    accent: "#0E7FB8",
    visual: "it",
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
    title: "Collections & Billing AI Employee",
    tagline: "Automate payment follow-up and reduce revenue delays",
    description:
      "Auxify Billing AI automates reminders while keeping communication professional and consistent—confirming payment status, answering billing questions, and escalating overdue accounts.",
    icon: CreditCard,
    accent: "#D97800",
    visual: "billing",
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
    title: "Market Research & Survey AI Employee",
    tagline: "Collect customer feedback at scale and turn it into insights",
    description:
      "Auxify Survey AI automates customer research workflows—sending surveys, asking structured questions, capturing replies, and pushing data into reporting.",
    icon: ClipboardList,
    accent: "#C2185B",
    visual: "research",
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
    slug: "receptionist",
    title: "Receptionist / Front Desk AI Employee",
    tagline: "Always available for first-touch conversations",
    description:
      "Auxify Receptionist AI handles front-line communication automatically and routes customers correctly—answering calls, welcoming inquiries, scheduling appointments, and managing after-hours requests across all channels.",
    icon: Headset,
    accent: "#014BAA",
    visual: "receptionist",
    capabilities: [
      "Answer inbound calls automatically",
      "Greet and qualify walk-in inquiries",
      "Route calls to the right department",
      "Schedule and confirm appointments",
      "Collect visitor and customer details",
      "Send appointment reminders via WhatsApp/SMS",
      "Handle after-hours calls and messages",
      "Transfer to human when requested",
      "Log all interactions to CRM",
    ],
    outcomes: [
      "Zero missed calls",
      "Faster first response",
      "Better routing accuracy",
      "24/7 availability without extra staff",
    ],
  },
] as const;

export const agentVoiceResponses: Record<string, Record<string, string>> = {
  sales: {
    "Capture incoming leads instantly":
      "When a new lead comes in from any channel — website, WhatsApp, phone call, or social media — I capture their details immediately and log them in your CRM. No lead ever slips through the cracks, even at 3 AM.",
    "Ask qualification questions automatically":
      "I ask smart questions based on your sales criteria — budget, timeline, decision-making authority, and specific needs — so only qualified leads reach your sales reps.",
    "Score lead intent and readiness":
      "I analyze every interaction to score how ready a lead is to buy. High-intent leads get fast-tracked to your team, while others get nurtured until they're ready.",
    "Handle repetitive outbound follow-up":
      "I take care of all the repetitive follow-ups — checking in, sending reminders, sharing resources — so your reps can focus on closing deals instead of chasing callbacks.",
    "Book demos and appointments":
      "When a lead is ready to talk, I check your team's availability and book the meeting right there in the conversation. No back-and-forth scheduling emails needed.",
    "Route hot leads to sales reps":
      "When I detect a high-value opportunity, I instantly route it to the right sales rep based on territory, expertise, or availability — with full context attached.",
    "Recover missed inquiries":
      "If a lead reaches out and doesn't get a response, I follow up automatically within minutes — recovering opportunities that would otherwise be lost to competitors.",
    "Log notes inside CRM":
      "Every conversation, preference, and action gets logged in your CRM automatically. Your reps always have complete context without manual data entry.",
    "Trigger reminders and tasks":
      "I create follow-up tasks and reminders for your team at exactly the right time — so no promise goes unfulfilled and no opportunity goes cold.",
    "Surface next-best actions for reps":
      "Based on where each lead is in the pipeline, I recommend the best next step — whether that's sending a case study, scheduling a call, or making an offer.",
  },
  support: {
    "Answer FAQs instantly":
      "I handle your most common questions in seconds — return policies, pricing, hours, shipping — using your actual business knowledge so answers are always accurate.",
    "Inbound call handling":
      "I answer inbound support calls automatically — greet the customer, understand their issue, provide instant help for common problems, and route complex cases to your team with full context.",
    "Retrieve knowledge-base answers":
      "I search through your entire knowledge base — help articles, product docs, SOPs — to find the exact answer customers need, summarized clearly.",
    "Guide customers through common requests":
      "For multi-step processes like password resets, order tracking, or account changes, I walk customers through each step in a natural conversation.",
    "Capture issue details":
      "Before any human gets involved, I gather all the relevant details — account info, what happened, when it started, what they've tried — saving your team valuable time.",
    "Classify conversation type":
      "I automatically categorize every conversation — billing question, technical issue, feature request, complaint — so the right team sees it immediately.",
    "Detect urgency or escalation needs":
      "I recognize when something is urgent or when a customer is frustrated, and I escalate immediately instead of making them wait in a queue.",
    "Create tickets or tasks":
      "When an issue needs follow-up, I create a structured ticket with all context attached — priority, category, customer details, and conversation history.",
    "Route complex conversations":
      "Issues I can't resolve get routed to the right specialist — not just any available agent, but the person with the right skills and context.",
    "Summarize issues for agents":
      "When your team takes over, they get a clear summary of what happened, what the customer needs, and what's already been tried — no re-explaining needed.",
  },
  recruitment: {
    "Screen applicants with preset criteria":
      "I check every application against your hiring criteria — experience level, required skills, location, availability — and shortlist qualified candidates automatically.",
    "Answer candidate questions":
      "Candidates ask about salary range, benefits, work culture, and role details. I answer using your hiring guidelines so every candidate gets consistent, accurate information.",
    "Schedule interviews automatically":
      "I coordinate between the candidate's availability and your hiring team's calendar to book interview slots — no email ping-pong needed.",
    "Send reminders":
      "I send interview reminders to both candidates and interviewers, reducing no-shows and keeping the hiring process on track.",
    "Follow up with applicants":
      "After each stage, I follow up with candidates — confirming receipt, sharing next steps, and keeping them engaged throughout the process.",
    "Collect required information":
      "I gather everything you need from candidates — portfolios, references, documents, availability — before the interview stage so your team is fully prepared.",
    "Route candidates internally":
      "Based on the role and qualifications, I route candidates to the right hiring manager or department for review — no manual sorting needed.",
    "Share hiring updates":
      "I keep candidates informed about their application status and share updates with your hiring team — so nobody is left wondering what's happening next.",
  },
  "it-helpdesk": {
    "Collect issue details":
      "When someone reports a problem, I gather all the details — what device, what software, what error message, when it started — so your IT team can diagnose faster.",
    "Categorize requests":
      "I sort every request into the right category — access request, hardware issue, software bug, network problem — for faster routing and resolution.",
    "Guide troubleshooting":
      "For common issues, I walk users through step-by-step troubleshooting — restart this, check that setting, clear this cache — resolving many tickets without human involvement.",
    "Suggest knowledge articles":
      "I find and share relevant help articles and guides that can solve the user's problem immediately, often before a ticket even needs to be created.",
    "Create tickets":
      "When an issue needs IT attention, I create a detailed ticket with all context — screenshots, error logs, steps already tried — so the technician can jump straight to solving it.",
    "Assign to correct team":
      "Network issues go to the network team, access requests go to security, hardware problems go to desktop support — automatically, based on the issue type.",
    "Escalate critical issues":
      "System outages, security incidents, or anything affecting multiple users gets escalated immediately with high priority and all relevant details.",
    "Track status updates":
      "I keep users informed about their ticket progress — when it's assigned, when someone is working on it, and when it's resolved. No more status-check emails.",
  },
  billing: {
    "Send payment reminders":
      "I send professional, friendly payment reminders at the right intervals — before due date, on due date, and after — keeping collections consistent without being aggressive.",
    "Confirm payment status":
      "When a customer says they've paid, I can check your system and confirm receipt — or let them know if the payment hasn't been processed yet.",
    "Answer billing questions":
      "Questions about charges, invoice breakdowns, payment methods, or due dates — I answer them instantly using your billing records.",
    "Share invoices and reminders":
      "I send invoices, payment links, and statement summaries directly in the conversation — making it easy for customers to pay immediately.",
    "Escalate overdue accounts":
      "When payments are significantly overdue, I escalate to your collections team with the full history of reminders sent and customer responses received.",
    "Trigger follow-up workflows":
      "After each payment interaction, I trigger the right next step — a thank-you message after payment, another reminder if still pending, or an escalation if needed.",
    "Notify internal teams":
      "Your finance team gets notified about payment confirmations, disputes, or issues that need attention — in real-time, with full customer context.",
  },
  research: {
    "Send surveys":
      "I reach out to customers through their preferred channels — WhatsApp, SMS, email — with your survey, at the optimal time for responses.",
    "Ask structured questions":
      "I guide respondents through your questions in a conversational way — rating scales, multiple choice, or open-ended — making it feel natural rather than like filling out a form.",
    "Capture replies":
      "Every response gets captured, structured, and stored — whether it's a quick rating or a detailed paragraph of feedback.",
    "Follow up for missing responses":
      "If someone starts but doesn't finish, or doesn't respond at all, I send a gentle follow-up — significantly improving your completion rates.",
    "Segment responses":
      "I organize responses by customer type, purchase history, region, or any criteria you set — so you can spot patterns across different segments.",
    "Identify patterns":
      "I flag recurring themes, sentiment shifts, and emerging issues across all responses — turning raw feedback into actionable patterns.",
    "Push data into reporting":
      "All collected data flows directly into your analytics and reporting dashboards — no manual exports or copy-pasting needed.",
  },
  receptionist: {
    "Answer inbound calls automatically":
      "I pick up every call instantly — no hold music, no missed rings. I greet the caller, understand their request, and either resolve it or route them to the right person with full context.",
    "Greet and qualify walk-in inquiries":
      "The moment someone reaches out — by phone, message, or chat — I greet them, ask what they need, and qualify whether they need sales, support, or scheduling.",
    "Route calls to the right department":
      "Based on what the customer needs, I connect them to the right department — sales for new business, support for issues, billing for payments — with context attached.",
    "Schedule and confirm appointments":
      "I check availability across your team's calendars and book appointments in real-time — confirming the slot with both the customer and the team member instantly.",
    "Collect visitor and customer details":
      "Before routing or scheduling, I gather everything needed — name, contact info, reason for calling, any relevant account details — so the receiving team is fully prepared.",
    "Send appointment reminders via WhatsApp/SMS":
      "After booking, I send confirmation and reminder messages via WhatsApp or SMS to both the customer and your team — reducing no-shows significantly.",
    "Handle after-hours calls and messages":
      "When your team is offline, I'm still active — answering calls, capturing leads, taking messages, and scheduling callbacks for the next business day.",
    "Transfer to human when requested":
      "If the caller asks for a real person or the issue is complex, I transfer them immediately to an available team member — with a full summary of the conversation so far.",
    "Log all interactions to CRM":
      "Every call, message, and appointment gets automatically logged in your CRM — no manual data entry, complete interaction history for every contact.",
  },
};

export const handoffContext = [
  "Full conversation history",
  "Customer profile",
  "AI summary",
  "Recommended next action",
] as const;

export const trainingSources = [
  "FAQs",
  "SOPs",
  "Product documents",
  "Pricing rules",
  "Website content",
  "Internal workflows",
  "CRM data",
  "Team guidelines",
] as const;

export const agentConnections = [
  "Customer conversations",
  "CRM records",
  "Lead stages",
  "Campaigns",
  "Call workflows",
  "Internal knowledge base",
  "Tasks and reminders",
  "Analytics dashboards",
  "Team routing rules",
] as const;

export const handoffTriggers = [
  "High-value lead detected",
  "Complex support issue",
  "Payment discussion",
  "Customer requests human support",
  "Sensitive account matter",
  "AI confidence below threshold",
  "Priority customer routing",
] as const;

export const heroStats = [
  { value: "9", label: "Platform modules", icon: Layers },
  { value: "7", label: "Specialized AI agents", icon: Bot },
  { value: "1", label: "Connected system", icon: Sparkles },
] as const;

export const orbitChannels = [
  { label: "Voice AI", icon: PhoneCall },
  { label: "Chat AI", icon: MessageCircle },
  { label: "Campaigns", icon: Megaphone },
  { label: "Inbox", icon: Inbox },
  { label: "Automation", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
  { label: "Integrations", icon: Plug },
  { label: "Copilot", icon: Sparkles },
] as const;
