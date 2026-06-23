import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Layers3,
  MessagesSquare,
  Network,
  Route,
  UserRoundCheck,
  Zap,
  Globe,
} from "lucide-react";


const STORY_POINTS = [
  "Customer operations have become more complex than ever.",
  "Leads, support requests, follow-ups, and customer conversations are spread across channels — creating delays, missed opportunities, unnecessary manual work, and revenue loss.",
  "We believed there had to be a better way. That's why we built Auxify.",
  "Auxify brings customer conversations and workflows into one intelligent system powered by AI employees. From engaging leads to resolving support requests and recovering missed opportunities, Auxify helps businesses stay responsive, efficient, and connected.",
] as const;

const PILLARS = [
  {
    title: "AI employees that take action",
    text: "Respond, qualify, route, and follow up across customer conversations automatically.",
    icon: Bot,
  },
  {
    title: "AI across every channel",
    text: "Work across WhatsApp, voice, inbox, and digital customer touchpoints from one system.",
    icon: MessagesSquare,
  },
  {
    title: "AI + teams working together",
    text: "AI handles repetitive workflows while teams stay focused on conversations and outcomes.",
    icon: UserRoundCheck,
  },
  {
    title: "One intelligent operating layer",
    text: "Customer communication, follow-up, recovery, and visibility stay connected.",
    icon: Layers3,
  },
  {
    title: "Always active customer operations",
    text: "Every inquiry has context. Every workflow has a next step. Every team sees what matters.",
    icon: Route,
  },
] as const;

const pageX = "px-[clamp(1.25rem,5vw,5rem)]";

export function AboutPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#0a0a0a]">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF4FF_0%,#F0EEFF_40%,#E8F4FF_70%,#F8FAFC_100%)]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-center px-[clamp(1.25rem,5vw,5rem)] py-28 lg:min-h-[70vh] lg:py-36">
            <p className="text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">
              About Auxify
            </p>
            <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[1.05] font-black tracking-[-0.04em] text-[#0a0a0a]">
              We&apos;re building the{" "}
              <span className="text-[#1B3FFF]">AI employee layer</span>{" "}
              for customer operations.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
              Empower your business with AI employees that engage customers,
              automate workflows, and drive better outcomes — all from one connected platform.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1B3FFF] px-7 text-sm font-extrabold text-white shadow-lg shadow-[#1B3FFF]/25 transition hover:-translate-y-0.5 hover:bg-[#3B5EFF]"
                href="#story"
              >
                Meet Auxify
                <ArrowRight className="size-4" />
              </a>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-7 text-sm font-extrabold text-[#0a0a0a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F7F8FC]"
                href="/sign-up"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className={`mx-auto max-w-7xl py-20 lg:py-28 ${pageX}`} id="story">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">
                Brand Story
              </p>
              <h2 className="mt-5 max-w-lg text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] font-black tracking-[-0.03em] text-[#0a0a0a]">
                Why we built <span className="text-[#1B3FFF]">Auxify.</span>
              </h2>
            </div>

            <div className="grid gap-5 text-base leading-8 font-medium text-[#4A5568] sm:text-lg sm:leading-9">
              {STORY_POINTS.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-[#F8FAFC] py-20 lg:py-28">
          <div className={`mx-auto max-w-7xl ${pageX}`}>
            <p className="mb-10 text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">
              Vision & Mission
            </p>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left — Vision */}
              <div>
                <div className="flex items-center gap-2">
                  <Globe className="size-5 text-[#1B3FFF]" />
                  <p className="text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">Vision</p>
                </div>
                <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1] font-black text-[#0a0a0a]">
                  A world where no business ever loses a customer because of operational failure.
                </h3>
                <p className="mt-3 text-base leading-7 font-medium text-[#4A5568]">
                  Every interaction captured, every workflow intelligent, no opportunity lost.
                </p>
              </div>

              {/* Right — Mission */}
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="size-5 text-[#1B3FFF]" />
                  <p className="text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">Mission</p>
                </div>
                <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1] font-black text-[#0a0a0a]">
                  Build the intelligence infrastructure for modern businesses.
                </h3>
                <p className="mt-3 text-base leading-7 font-medium text-[#4A5568]">
                  To build the intelligence infrastructure that modern businesses need to engage every customer, coordinate every team, and automate every workflow — at the speed and scale that today&apos;s market demands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Pillars */}
        <section className={`mx-auto max-w-7xl py-20 lg:py-28 ${pageX}`} id="values">
          <div className="mb-14 grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-[#1B3FFF] uppercase">
                Value Pillars
              </p>
              <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] font-black tracking-[-0.03em] text-[#0a0a0a]">
                The operating principles behind{" "}
                <span className="text-[#1B3FFF]">Auxify AI Employees.</span>
              </h2>
            </div>
            <p className="text-base leading-7 font-medium text-[#4A5568] sm:text-lg">
              Every pillar supports one promise: customer operations should be
              intelligent, connected, visible, and always moving.
            </p>
          </div>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  className="border-l border-[#E2E8F0] p-6 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0"
                  key={pillar.title}
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#1B3FFF]/10">
                    <Icon className="size-5 text-[#1B3FFF]" />
                  </div>
                  <h3 className="mt-4 text-base leading-tight font-black text-[#0a0a0a]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 font-medium text-[#4A5568]">
                    {pillar.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Final CTA */}
      <section className="bg-[#014BAA] px-4 py-16 text-white sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.32fr)] lg:items-center">
          <div>
            {/* <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black tracking-[0.16em] uppercase ring-1 ring-white/18">
              <Network className="size-4" />
              One connected platform
            </p> */}
            <h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] font-black tracking-[-0.07em] text-balance">
              Build your AI workforce for customer operations.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 font-semibold text-white/76 sm:text-lg sm:leading-8">
              See how Auxify helps businesses automate customer engagement, keep conversations moving, and scale customer operations with AI.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#EEF5FF]"
              href="/sign-up"
            >
              Book a Demo
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/28 bg-white/10 px-7 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16"
              href="/pricing"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
