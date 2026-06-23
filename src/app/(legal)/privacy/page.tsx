import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const companyName = 'GETIT EXPRESS PRIVATE LIMITED';
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@auxify.live';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for Auxify, a product of ${companyName}.`,
  alternates: {
    canonical: '/privacy',
  },
};

const sections = [
  {
    title: 'Information We Collect',
    items: [
      'Contact, company, and account information you provide when you ask about Auxify or use the service.',
      'Communication, workflow, and integration data that customers configure Auxify to process.',
      'Website, device, usage, and diagnostic information used to operate, secure, and improve Auxify.',
    ],
  },
  {
    title: 'How We Use Information',
    items: [
      'To provide business communication, workflow automation, support, onboarding, and service updates.',
      'To operate integrations, troubleshoot issues, maintain security, and improve product performance.',
      'To respond to privacy, compliance, support, and commercial requests from customers and prospects.',
    ],
  },
  {
    title: 'Sharing and Retention',
    items: [
      'Auxify uses service providers and integrations only as needed to operate the website and configured services.',
      'Customer-configured integrations may exchange information with third-party systems selected by the customer.',
      'We retain information only as needed for operations, legal obligations, dispute resolution, and customer instructions.',
    ],
  },
  {
    title: 'Privacy Requests',
    items: [
      `To request access, correction, deletion, or details about privacy handling, contact ${supportEmail}.`,
      'We may need to verify your request before acting on account, company, or customer data.',
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto w-full max-w-4xl p-4">
        <Link className={cn(buttonVariants({ variant: 'link' }), 'h-auto px-0')} href="/">
          Back to home
        </Link>
        <div className="mt-8 space-y-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Legal</p>
          <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">Privacy Policy</h1>
          <p className="max-w-3xl text-base leading-7 text-foreground/68 sm:text-lg sm:leading-8">
            Auxify is a business communication and workflow automation product developed by {companyName}. This policy
            explains how information is handled across the Auxify public website and configured Auxify services.
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
