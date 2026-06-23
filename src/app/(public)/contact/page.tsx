import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { ContactForm } from './_components/contact-form';
import { Reveal } from './_components/reveal';

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@auxify.live';
const supportEmailHref = `mailto:${supportEmail}`;
const phoneNumber = '+91 99711 14264';
const phoneHref = 'tel:+919971114264';
const officeAddress = 'MZ-2, Central Business Park, 1FA, Scheme No. 94, Ring Road, Indore, Madhya Pradesh 452016';
const mapEmbedSrc =
  'https://www.openstreetmap.org/export/embed.html?bbox=75.8948%2C22.7067%2C75.9122%2C22.7203&layer=mapnik&marker=22.713553279391594%2C75.90348987543356';
const mapLinkHref =
  'https://www.openstreetmap.org/?mlat=22.713553279391594&mlon=75.90348987543356#map=16/22.71355/75.90349';

export const metadata: Metadata = {
  title: 'Contact Auxify - Book a Product Walkthrough',
  description:
    'Contact Auxify to discuss AI voice agents, chat agents, workflow automation, CRM handoff, campaigns, and customer operations for your team.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Auxify - AI Customer Operations',
    description:
      'Talk with Auxify about AI-powered customer response, workflow automation, campaigns, inbox operations, and human handoff.',
    url: 'https://auxify.live/contact',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Auxify',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Auxify - Book a Product Walkthrough',
    description:
      'Reach the Auxify team for AI customer operations, voice agents, chat agents, and workflow automation.',
  },
  keywords: [
    'Auxify contact',
    'AI voice agent demo',
    'AI customer operations',
    'workflow automation consultation',
    'omni channel inbox demo',
    'AI call transfer platform',
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section aria-labelledby="contact-heading" className="w-full border-b border-[#04101f]/10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 p-4 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-end lg:gap-16 lg:pt-36 lg:pb-20">
          <Reveal delay={0.1} direction="up">
            <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#0b5c7e] uppercase">Contact</p>
            <h1
              className="mt-4 max-w-4xl text-4xl leading-none font-semibold tracking-normal text-balance text-[#04101f] sm:text-5xl lg:text-6xl"
              id="contact-heading"
            >
              Let&apos;s map your customer operations into Auxify.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-pretty text-[#12304a]/78 sm:text-lg">
              Tell us what you want to automate across voice, chat, campaigns, inbox workflows, CRM context, and human
              handoff. We&apos;ll help you choose the cleanest starting path.
            </p>
          </Reveal>

          <Reveal delay={0.2} direction="up">
            <div className="border border-[#04101f]/10 bg-[#fbfdff] p-5 sm:p-6">
              <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#0b5c7e] uppercase">Response window</p>
              <p className="mt-5 text-3xl leading-none font-semibold text-[#04101f]">Same business day</p>
              <p className="mt-3 text-sm leading-6 text-[#12304a]/72">
                Send a use case, demo request, or partnership note and the Auxify team will route it to the right desk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Auxify contact options" className="w-full">
        <div className="mx-auto w-full max-w-7xl p-4 py-10 sm:py-12">
          <div className="grid border border-[#04101f]/10 bg-white sm:grid-cols-3">
            <Reveal delay={0.05} className="h-full">
              <a
                href={phoneHref}
                className="group flex h-full min-h-32 items-start gap-4 border-[#04101f]/10 p-5 transition-colors hover:bg-[#f7fbff] sm:border-r sm:p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center border border-[#04101f]/10 bg-[#eef8ff] text-[#014baa]">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#12304a]/55 uppercase">Call</p>
                  <p className="mt-2 truncate text-sm font-semibold text-[#04101f]">{phoneNumber}</p>
                  <p className="mt-1 text-xs leading-5 text-[#12304a]/65">Mon-Sat, 10am-7pm IST</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <a
                href={supportEmailHref}
                className="group flex h-full min-h-32 items-start gap-4 border-t border-[#04101f]/10 p-5 transition-colors hover:bg-[#f7fbff] sm:border-t-0 sm:border-r sm:p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center border border-[#04101f]/10 bg-[#eef8ff] text-[#014baa]">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#12304a]/55 uppercase">Email</p>
                  <p className="mt-2 truncate text-sm font-semibold text-[#04101f]">{supportEmail}</p>
                  <p className="mt-1 text-xs leading-5 text-[#12304a]/65">For demo, support, billing, and legal help</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.15} className="h-full">
              <div className="group flex h-full min-h-32 items-start gap-4 border-t border-[#04101f]/10 p-5 transition-colors hover:bg-[#f7fbff] sm:border-t-0 sm:p-6">
                <div className="flex size-10 shrink-0 items-center justify-center border border-[#04101f]/10 bg-[#eef8ff] text-[#014baa]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#12304a]/55 uppercase">Office</p>
                  <p className="mt-2 text-sm font-semibold text-[#04101f]">Indore, Madhya Pradesh</p>
                  <p className="mt-1 text-xs leading-5 text-[#12304a]/65">{officeAddress}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-form-heading" className="w-full border-y border-[#04101f]/10 bg-[#fbfdff]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 p-4 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <Reveal delay={0.05} direction="up">
            <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#0b5c7e] uppercase">Request</p>
            <h2
              className="mt-3 text-3xl leading-none font-semibold tracking-normal text-balance text-[#04101f] sm:text-5xl"
              id="contact-form-heading"
            >
              Share the workflow you want Auxify to handle.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[#12304a]/72">
              A strong first brief includes your channels, team size, customer volume, current tools, and the point
              where AI should hand off to a human.
            </p>
          </Reveal>

          <Reveal delay={0.1} direction="up">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="office-map-heading" className="w-full">
        <div className="mx-auto grid w-full max-w-7xl gap-8 p-4 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:items-start lg:gap-16 lg:py-20">
          <Reveal delay={0.05} direction="up">
            <p className="font-mono text-[0.68rem] leading-4 font-medium text-[#0b5c7e] uppercase">Office</p>
            <h2
              className="mt-3 text-3xl leading-none font-semibold tracking-normal text-balance text-[#04101f] sm:text-5xl"
              id="office-map-heading"
            >
              Find Auxify in Indore.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[#12304a]/72">{officeAddress}</p>
            <a
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#014baa] underline-offset-4 hover:underline"
              href={mapLinkHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open in maps
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <div className="mt-6 flex items-center gap-2 text-[#12304a]/65">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-xs">GSTIN: 23AAMCG2755K1ZD</span>
            </div>
          </Reveal>

          <div className="overflow-hidden border border-[#04101f]/10 bg-[#eef8ff]">
            <div className="h-80 w-full sm:h-96 lg:h-112">
              <iframe
                className="block h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedSrc}
                title="Auxify office location in Indore"
              />
            </div>
            <div className="border-t border-[#04101f]/10 bg-white p-4 text-xs leading-5 text-[#12304a]/65">
              If the embedded map is blocked by your browser, use the external map link on the left.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
