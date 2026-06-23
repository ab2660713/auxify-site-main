import type { Metadata } from "next";

import { env } from "@/lib/env";

import { PricingPage } from "./_components/pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flexible Auxify pricing for CRM, WhatsApp conversations, AI employees, automation, campaigns, and voice usage as your team grows.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | Auxify",
    description:
      "Choose the Auxify plan that fits your team today and scale customer conversations, AI employees, campaigns, and voice automation as your business grows.",
    url: "/pricing",
    siteName: "Auxify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Auxify",
    description:
      "Flexible pricing for Auxify's unified customer operations platform.",
  },
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Auxify",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${env.NEXT_PUBLIC_SITE_URL}/pricing`,
  description:
    "Auxify combines CRM, WhatsApp conversations, AI employees, automation, campaigns, and voice in one unified platform.",
  offers: {
    "@type": "OfferCatalog",
    name: "Auxify pricing plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Tea",
        price: "0",
        priceCurrency: "INR",
        description: "15-day trial plan for exploring Auxify.",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Coffee",
        price: "5999",
        priceCurrency: "INR",
        description: "Starter monthly plan for startups and small teams.",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Energy Drink",
        price: "10999",
        priceCurrency: "INR",
        description:
          "Professional monthly plan for growing teams scaling automation.",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Rocket Fuel",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          description: "Custom enterprise pricing.",
        },
        description:
          "Enterprise plan for larger organizations with custom workflows, larger teams, advanced AI deployment, and compliance needs.",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

export default function PricingRoute() {
  return (
    <>
      <PricingPage />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
