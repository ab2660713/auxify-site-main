import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Layers3,
  MessagesSquare,
  Route,
  UserRoundCheck,
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

const labelClass =
  "inline-flex items-center gap-3 text-xs font-black uppercase tracking-normal text-[#014BAA]";
const pageX = "px-[clamp(1.25rem,5vw,5rem)]";

export function AboutPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white [font-family:var(--font-roboto),ui-sans-serif,system-ui,sans-serif] text-[#014BAA]">
      <main className={pageX}>
        <section className="mx-auto max-w-5xl py-16 lg:py-20">
          <p className="text-xs font-black uppercase tracking-normal text-[#014BAA]">
            About Auxify
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl leading-tight font-black text-[#014BAA] sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            AI Powered Workforce Layer{" "}
            <span className="text-[#1B3FFF]">For Modern </span>
            customer operations.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
            Empower your business with AI employees that engage customers,
            automate workflows, and drive better outcomes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#014BAA] px-6 text-sm font-extrabold text-white transition hover:bg-[#1B3FFF]"
              href="#story"
            >
              Meet Auxify
              <ArrowRight className="size-4" />
            </a>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-6 text-sm font-extrabold text-[#014BAA] transition hover:bg-[#F7F8FC]"
              href="/sign-up"
            >
              Book a Demo
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl py-12 lg:py-16" id="story">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1fr)]">
            <div>
              <p className={labelClass}>

                Brand Story
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl leading-tight font-black text-[#014BAA] sm:text-5xl">
                Customer operations have become more complex than ever.
              </h2>
            </div>

            <div className="grid gap-5 text-base leading-8 font-medium text-[#4A5568] sm:text-lg sm:leading-9">
              {STORY_POINTS.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl py-12 lg:py-16" id="vision">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className={labelClass}>

                Vision
              </p>
              <h2 className="mt-5 max-w-xl text-3xl leading-tight font-black text-[#014BAA] sm:text-4xl">
                A world where no business ever loses a customer because of operational failure.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 font-medium text-[#4A5568]">
                We envision a future where every customer interaction is captured, every workflow is intelligent, and no opportunity is lost to operational gaps.
              </p>
            </div>

            <div>
              <p className={labelClass}>

                Mission
              </p>
              <h2 className="mt-5 max-w-xl text-3xl leading-tight font-black text-[#014BAA] sm:text-4xl">
                Build the intelligence infrastructure for modern businesses.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 font-medium text-[#4A5568]">
                To build the intelligence infrastructure that modern businesses need to engage every customer, coordinate every team, and automate every workflow — at the speed and scale that today&apos;s market demands.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl py-12 lg:py-16" id="values">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className={labelClass}>

                Value Pillars
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl leading-tight font-black text-[#014BAA] sm:text-5xl">
                The operating principles behind Auxify AI Employees.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 font-medium text-[#4A5568] sm:text-lg sm:leading-8">
              Every pillar supports one promise: customer operations should be
              intelligent, connected, visible, and always moving.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article key={pillar.title}>
                  <Icon className="size-6 text-[#014BAA]" />
                  <h3 className="mt-4 text-lg leading-tight font-black text-[#014BAA]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 font-medium text-[#4A5568]">
                    {pillar.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <section className={`bg-[#014BAA] py-16 text-white lg:py-20 ${pageX}`}>
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.34fr)] lg:items-center">
          <div>
            <h2 className="max-w-5xl text-3xl leading-tight font-black sm:text-5xl">
              Build your AI employees for customer operations.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 font-medium text-white/76 sm:text-lg sm:leading-8">
              See how Auxify helps businesses automate customer engagement,
              keep conversations moving, and scale customer operations with
              AI.
            </p>
          </div>

          <div className="grid gap-3">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-[#014BAA] transition hover:bg-[#EEF5FF]"
              href="/sign-up"
            >
              Book a Demo
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/28 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/16"
              href="/pricing"
            >
              View Pricing
              <Route className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
