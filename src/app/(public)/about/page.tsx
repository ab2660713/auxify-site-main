import type { Metadata } from "next";

import { AboutPage } from "./_components/about-page";

export const metadata: Metadata = {
  title: "About Auxify",
  description:
    "Learn how Auxify is building the AI workforce layer for customer operations across WhatsApp, calls, and digital channels.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
