import type { Metadata } from "next";

import { SolutionsPage } from "./_components/solutions-page";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "One intelligent customer operations platform for sales, support, marketing, and operations teams—connecting AI employees, channels, workflows, and customer data.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Solutions | Auxify",
    description:
      "Sales, support, marketing, and operations teams work differently—Auxify connects every customer conversation in one shared, AI-powered workspace.",
    url: "/solutions",
    siteName: "Auxify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | Auxify",
    description:
      "One connected AI operating layer for every customer-facing team.",
  },
};

export default function SolutionsRoute() {
  return <SolutionsPage />;
}
