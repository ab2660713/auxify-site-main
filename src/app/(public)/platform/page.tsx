import type { Metadata } from "next";

import { env } from "@/lib/env";

import { PlatformPage } from "./_components/platform-page";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "AI-powered customer operations built to accelerate revenue. Auxify connects conversations, customer data, workflows, and AI employees in one platform.",
  alternates: {
    canonical: "/platform",
  },
  openGraph: {
    title: "Platform | Auxify",
    description:
      "Respond faster, convert more leads, and scale revenue-driving operations with Auxify's connected AI platform—Voice AI, Chat AI, Campaigns, Inbox, Automation, and AI employees.",
    url: "/platform",
    siteName: "Auxify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform | Auxify",
    description:
      "Conversations, customer data, workflows, and AI employees in one connected platform.",
  },
};

const platformJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Auxify",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${env.NEXT_PUBLIC_SITE_URL}/platform`,
  description:
    "Auxify connects conversations, customer data, workflows, and AI employees in one platform—Voice AI, Chat AI, Campaigns, Omnichannel Inbox, Workflow Automation, AI Copilot, Analytics, and Integrations.",
};

export default function PlatformRoute() {
  return (
    <>
      <PlatformPage />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformJsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
