import type { Metadata } from "next";

import { AgentsPage } from "./_components/agents-page";

export const metadata: Metadata = {
  title: "AI Employees",
  description:
    "Auxify AI employees are built for real customer-facing operations—each agent works inside your channels, follows your rules, and hands off to your team the moment human action is needed.",
  alternates: {
    canonical: "/agents",
  },
  openGraph: {
    title: "AI Employees | Auxify",
    description:
      "Purpose-built AI employees for sales, support, recruitment, IT, billing, research, and front desk—working inside your workflows, not outside them.",
    url: "/agents",
    siteName: "Auxify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Employees | Auxify",
    description:
      "AI employees built for real customer-facing operations—qualify, answer, schedule, route, escalate, and update records inside one connected workflow.",
  },
};

export default function AgentsRoute() {
  return <AgentsPage />;
}
