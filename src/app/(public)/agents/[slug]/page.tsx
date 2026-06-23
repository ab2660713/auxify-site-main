import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/lib/env";

import { agents } from "../../platform/_components/platform-data";
import { AgentDetailPage } from "./_components/agent-detail-page";

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    return { title: "AI Employee" };
  }

  const url = `/agents/${agent.slug}`;

  return {
    title: agent.title,
    description: agent.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${agent.title} | Auxify`,
      description: agent.description,
      url,
      siteName: "Auxify",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${agent.title} | Auxify`,
      description: agent.tagline,
    },
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: agent.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${env.NEXT_PUBLIC_SITE_URL}/agents/${agent.slug}`,
    description: agent.description,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <AgentDetailPage slug={agent.slug} />
    </>
  );
}
