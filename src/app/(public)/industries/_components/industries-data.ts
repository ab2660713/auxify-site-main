import type { ComponentType } from "react";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Database,
  GraduationCap,
  Home,
  Landmark,
  MessageCircle,
  PhoneCall,
  ShoppingCart,
  Stethoscope,
  Workflow,
} from "lucide-react";

export type IconComponent = ComponentType<{ className?: string }>;

export type Industry = {
  /** Hex accent used for icons, glows, and gradients. */
  accent: string;
  /** Secondary accent for gradient endpoints. */
  accentSoft: string;
  cta: string;
  description: string;
  /** Conversation-to-conversion stages handled by the platform. */
  flow: readonly string[];
  focus: string;
  icon: IconComponent;
  /** A representative inbound customer message for the live showcase. */
  inbound: string;
  outcomes: readonly string[];
  /** Soft background tint (hex). */
  soft: string;
  slug: string;
  /** The AI-driven next step shown after the inbound message. */
  step: string;
  title: string;
};

export const pageX = "px-5 sm:px-8 lg:px-12 xl:px-20";

export const navItems = [
  { label: "Real Estate", href: "#real-estate" },
  { label: "Healthcare", href: "#healthcare" },
  { label: "Education", href: "#education" },
  { label: "Finance", href: "#finance" },
] as const;

export const capabilities = [
  { label: "Lead Capture", icon: MessageCircle },
  { label: "CRM", icon: Database },
  { label: "Voice AI", icon: PhoneCall },
  { label: "Automation", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
] as const;

export const platformStats = [
  { value: "24/7", label: "Always-on AI response" },
  { value: "6+", label: "Channels in one system" },
  { value: "<1 min", label: "First-touch response" },
  { value: "1", label: "Connected platform" },
] as const;

export const industries: readonly Industry[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    focus: "Inquiry to site visit",
    description:
      "Convert more property inquiries into site visits and faster closings with instant capture, buyer qualification, AI follow-up, and broker visibility.",
    cta: "Book a Real Estate Demo",
    icon: Home,
    accent: "#1B3FFF",
    accentSoft: "#5B7BFF",
    soft: "#EAF2FF",
    inbound: "Is the 3BHK on Palm Drive still available?",
    step: "Qualified the buyer and booked a Saturday site visit.",
    flow: [
      "Property Inquiry",
      "Auxify AI",
      "Buyer Qualification",
      "Site Visit Booking",
      "WhatsApp Follow-up",
      "Deal Movement",
    ],
    outcomes: [
      "Faster buyer response",
      "More site visits booked",
      "Fewer missed follow-ups",
      "Better broker visibility",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare & Clinics",
    focus: "Inquiry to confirmed visit",
    description:
      "Turn patient inquiries into confirmed appointments while AI-assisted coordination manages booking requests, reminders, and support workflows.",
    cta: "Book a Healthcare Demo",
    icon: Stethoscope,
    accent: "#008756",
    accentSoft: "#39C58C",
    soft: "#E8F8F1",
    inbound: "Can I see Dr. Rao for a check-up this week?",
    step: "Offered open slots and confirmed Thursday 5:30 PM.",
    flow: [
      "Patient Inquiry",
      "Auxify AI",
      "Appointment Request",
      "Confirmation",
      "Reminder",
      "Visit Completed",
    ],
    outcomes: [
      "Faster patient response",
      "Reduced front-desk workload",
      "Fewer missed appointments",
      "Better patient communication",
    ],
  },
  {
    slug: "education",
    title: "Education",
    focus: "Inquiry to enrollment",
    description:
      "Move every admission inquiry toward enrollment with qualification, counseling coordination, reminders, and document follow-up.",
    cta: "Book an Education Demo",
    icon: GraduationCap,
    accent: "#6D4AFF",
    accentSoft: "#9B82FF",
    soft: "#F1EDFF",
    inbound: "What's the fee structure for the data science course?",
    step: "Shared details and scheduled a counseling call.",
    flow: [
      "Admission Inquiry",
      "Auxify AI",
      "Qualification",
      "Counseling Booking",
      "Document Follow-up",
      "Enrollment",
    ],
    outcomes: [
      "Faster inquiry handling",
      "Better counselor coordination",
      "Improved follow-up discipline",
      "Higher enrollment conversion",
    ],
  },
  {
    slug: "finance",
    title: "Finance",
    focus: "Inquiry to conversion",
    description:
      "Keep financial conversations moving with structured qualification, document collection, advisor routing, and organized customer updates.",
    cta: "Book a Finance Demo",
    icon: Landmark,
    accent: "#D97800",
    accentSoft: "#F5A623",
    soft: "#FFF4E6",
    inbound: "I want to apply for a home loan — what do I need?",
    step: "Collected documents and routed to an advisor.",
    flow: [
      "Customer Inquiry",
      "Auxify AI",
      "Qualification",
      "Document Follow-up",
      "Advisor Routing",
      "Conversion",
    ],
    outcomes: [
      "Faster lead qualification",
      "Better document completion",
      "Structured customer follow-up",
      "Higher team visibility",
    ],
  },
  {
    slug: "retail",
    title: "Retail & Ecommerce",
    focus: "Message to repeat purchase",
    description:
      "Turn customer conversations into repeat purchases across support conversations, campaign replies, product inquiries, and repeat engagement.",
    cta: "Book a Retail Demo",
    icon: ShoppingCart,
    accent: "#E0427A",
    accentSoft: "#FF6FA3",
    soft: "#FFF0F5",
    inbound: "Where is my order? I placed it on Monday.",
    step: "Shared live tracking and recommended a refill.",
    flow: [
      "Customer Message",
      "Auxify AI",
      "Product / Order Help",
      "Support or Campaign Flow",
      "Follow-up",
      "Repeat Purchase",
    ],
    outcomes: [
      "Faster support replies",
      "Better campaign response handling",
      "Improved customer experience",
      "More repeat revenue",
    ],
  },
  {
    slug: "events",
    title: "Events & Hospitality",
    focus: "Inquiry to guest experience",
    description:
      "Manage bookings and guest communication with AI-powered workflows for inquiries, confirmations, reminders, and guest updates.",
    cta: "Book an Events Demo",
    icon: CalendarDays,
    accent: "#00A6A6",
    accentSoft: "#3FD6D6",
    soft: "#E7FAFA",
    inbound: "Do you have a hall available for 200 guests on the 12th?",
    step: "Checked availability and held the date with a quote.",
    flow: [
      "Guest Inquiry",
      "Auxify AI",
      "Booking",
      "Confirmation",
      "Reminder",
      "Guest Experience",
    ],
    outcomes: [
      "Faster booking coordination",
      "Better guest communication",
      "Fewer missed follow-ups",
      "More organized operations",
    ],
  },
] as const;

export const agentActions = ["Respond", "Qualify", "Route", "Recover"] as const;

export const AiIcon = Bot;
