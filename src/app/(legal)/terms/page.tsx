import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const companyName = 'GETIT EXPRESS PRIVATE LIMITED';
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@auxify.live';

export const metadata: Metadata = {
  title: 'Terms',
  description: `Terms for Auxify, a product of ${companyName}.`,
  alternates: {
    canonical: '/terms',
  },
};

const sections = [
  {
    title: 'Use of Auxify',
    items: [
      'Auxify is provided for business communication, customer operations, workflow automation, and related commercial use.',
      'Customers are responsible for configuring workflows, integrations, data sources, user access, and customer-facing communications lawfully.',
      'You may not use Auxify to abuse, disrupt, reverse engineer, or interfere with the platform or other users.',
    ],
  },
  {
    title: 'Customer Data and Integrations',
    items: [
      'Customers control the information, prompts, workflows, and third-party systems they connect to Auxify.',
      'Customer outcomes depend on configuration, integrations, source data quality, usage, and operational review.',
      'You are responsible for permissions, notices, consents, and compliance requirements that apply to your business data.',
    ],
  },
  {
    title: 'Service Changes',
    items: [
      'Auxify may update website content, product features, pricing, availability, and integrations as the platform evolves.',
      'We may suspend or restrict access when required for security, abuse prevention, legal compliance, or platform stability.',
    ],
  },
  {
    title: 'Contact',
    items: [`For terms, billing, privacy, or service questions, contact ${supportEmail}.`],
  },
] as const;

export default function TermsPage() {
  return (
    <section className="w-full pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto w-full max-w-4xl p-4">
        <Link className={cn(buttonVariants({ variant: 'link' }), 'h-auto px-0')} href="/">
          Back to home
        </Link>
        <div className="mt-8 space-y-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Legal</p>
          <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">Terms</h1>
          <p className="max-w-3xl text-base leading-7 text-foreground/68 sm:text-lg sm:leading-8">
            These terms apply to Auxify, a business communication and workflow automation product developed by
            {` ${companyName}`}.
          </p>
          <p className="text-sm text-foreground/58">Last updated: June 8, 2026</p>
        </div>

        <div className="mt-12 grid gap-10">
          {sections.map((section) => (
            <section className="space-y-4" key={section.title}>
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">{section.title}</h2>
              <ul className="grid gap-3 text-base leading-7 text-foreground/68">
                {section.items.map((item) => (
                  <li className="rounded-lg border border-border/70 bg-background/70 p-4" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
