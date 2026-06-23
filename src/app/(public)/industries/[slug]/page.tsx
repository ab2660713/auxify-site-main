import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/lib/env";

import { industries } from "../_components/industries-data";
import { getIndustryAgents } from "../_components/industry-agents-data";
import { IndustryDetailPage } from "./_components/industry-detail-page";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return { title: "Industry" };
  }

  const url = `/industries/${industry.slug}`;
  const title = `${industry.title} AI Employees`;
  const description = `Seven specialized AI employees built for ${industry.title.toLowerCase()}—${industry.description}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Auxify`,
      description,
      url,
      siteName: "Auxify",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Auxify`,
      description: industry.description,
    },
  };
}

export default async function IndustryRoute({ params }: PageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const agents = getIndustryAgents(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${industry.title} AI Employees`,
    description: industry.description,
    url: `${env.NEXT_PUBLIC_SITE_URL}/industries/${industry.slug}`,
    itemListElement: agents.map((agent, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: agent.title,
      description: agent.description,
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <IndustryDetailPage slug={industry.slug} />
    </>
  );
}
