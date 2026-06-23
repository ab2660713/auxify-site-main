import type { Metadata } from "next";

import { IndustriesPage } from "./_components/industries-page";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Explore how Auxify helps real estate, healthcare, education, finance, retail, and events teams automate customer communication with AI employees.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesRoute() {
  return <IndustriesPage />;
}
