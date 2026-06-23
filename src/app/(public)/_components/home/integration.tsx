'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

type IntegrationApp = {
  name: string;
  logo: string;
};

type IntegrationCarouselProps = {
  topRowApps?: IntegrationApp[];
  bottomRowApps?: IntegrationApp[];
};

const defaultTopRowApps: IntegrationApp[] = [
  { name: 'Salesforce', logo: '/images/integrations/salesforce.png' },
  { name: 'HubSpot', logo: '/images/integrations/hubspot.png' },
  { name: 'Zoho', logo: '/images/integrations/zoho.png' },
  { name: 'Pipedrive', logo: '/images/integrations/pipedrive.png' },
  { name: 'Freshsales', logo: '/images/integrations/freshsales.png' },
  { name: 'LeadSquared', logo: '/images/integrations/leadsquared.png' },
  { name: 'Google Sheets', logo: '/images/integrations/googleSheets.png' },
  { name: 'Excel', logo: '/images/integrations/Excel.png' },
  { name: 'Gmail', logo: '/images/integrations/gmail.jpg' },
  { name: 'Outlook', logo: '/images/integrations/outlook.png' },
  { name: 'Shopify', logo: '/images/integrations/Shopify.png' },
  { name: 'WooCommerce', logo: '/images/integrations/WooCommerce.png' },
  { name: 'Practo', logo: '/images/integrations/Practo.png' },
];

const defaultBottomRowApps: IntegrationApp[] = [
  { name: 'Justdial', logo: '/images/integrations/Justdial.png' },
  { name: 'Policybazaar', logo: '/images/integrations/Policybazaar.png' },
  { name: 'BankBazaar', logo: '/images/integrations/BankBazaar.png' },
  { name: 'Paisabazaar', logo: '/images/integrations/Paisabazaar.png' },
  { name: 'Magicbricks', logo: '/images/integrations/Magicbricks.png' },
  { name: '99acres', logo: '/images/integrations/99acres.png' },
  { name: 'Housing.com', logo: '/images/integrations/Housing.com.png' },
  { name: 'NoBroker', logo: '/images/integrations/nobroker.webp' },
  { name: 'Apollo247', logo: '/images/integrations/Apollo247.png' },
  { name: 'CollegeDekho', logo: '/images/integrations/CollegeDekho.png' },
  { name: 'Shiksha', logo: '/images/integrations/Shiksha.jfif' },
  { name: 'WeddingWire', logo: '/images/integrations/weddingwire.png' },
  { name: 'WedMeGood', logo: '/images/integrations/wedmegood.png' },
];

export const IntegrationCarousel = ({
  topRowApps = defaultTopRowApps,
  bottomRowApps = defaultBottomRowApps,
}: IntegrationCarouselProps) => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;
    if (!topRow || !bottomRow) return;

    const measureSetWidth = (row: HTMLDivElement, count: number) => {
      const children = Array.from(row.children) as HTMLElement[];
      if (children.length > count) {
        return children[count].offsetLeft - children[0].offsetLeft;
      }
      return row.scrollWidth / 3;
    };

    const topSetWidth = measureSetWidth(topRow, topRowApps.length);
    const bottomSetWidth = measureSetWidth(bottomRow, bottomRowApps.length);

    let topPosition = 0;
    let bottomPosition = -bottomSetWidth;
    let topAnimationId: number;
    let bottomAnimationId: number;

    const animateTopRow = () => {
      topPosition -= 0.4;
      if (Math.abs(topPosition) >= topSetWidth) {
        topPosition += topSetWidth;
      }
      topRow.style.transform = `translateX(${topPosition}px)`;
      topAnimationId = requestAnimationFrame(animateTopRow);
    };

    const animateBottomRow = () => {
      bottomPosition += 0.5;
      if (bottomPosition >= 0) {
        bottomPosition -= bottomSetWidth;
      }
      bottomRow.style.transform = `translateX(${bottomPosition}px)`;
      bottomAnimationId = requestAnimationFrame(animateBottomRow);
    };

    topAnimationId = requestAnimationFrame(animateTopRow);
    bottomAnimationId = requestAnimationFrame(animateBottomRow);
    return () => {
      cancelAnimationFrame(topAnimationId);
      cancelAnimationFrame(bottomAnimationId);
    };
  }, [topRowApps, bottomRowApps]);

  return (
    <section aria-label="Auxify integrations" className="w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-4 inline-block rounded-full border border-[#1B3FFF]/20 bg-[#1B3FFF]/5 px-4 py-1.5 text-xs font-semibold text-[#1B3FFF]">
            Integrations
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#014baa] sm:text-4xl lg:text-5xl">
            Seamless Integrations
            <br />
            with Your{' '}
            <span className="text-[#1B3FFF]">Tech Stack</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#4A5568]">
            Connect Auxify with the tools you already use. Our platform integrates with 50+ apps across CRM, email, marketplaces, and more.
          </p>
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent sm:w-40 lg:w-56" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent sm:w-40 lg:w-56" />

        {/* Top row — scrolls left */}
        <div className="mb-5 overflow-hidden">
          <div
            ref={topRowRef}
            className="flex items-center gap-6"
            style={{ willChange: 'transform' }}
          >
            {[...topRowApps, ...topRowApps, ...topRowApps].map((app, index) => (
              <div
                key={`top-${index}`}
                className="group flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-md shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B3FFF]/20 hover:shadow-lg hover:shadow-[#1B3FFF]/10 sm:h-40 sm:w-40 sm:p-4 lg:h-44 lg:w-44"
              >
                <Image
                  src={app.logo}
                  alt={app.name}
                  width={140}
                  height={140}
                  unoptimized={app.logo.endsWith('.svg')}
                  className="block h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — scrolls right */}
        <div className="overflow-hidden">
          <div
            ref={bottomRowRef}
            className="flex items-center gap-6"
            style={{ willChange: 'transform' }}
          >
            {[...bottomRowApps, ...bottomRowApps, ...bottomRowApps].map((app, index) => (
              <div
                key={`bottom-${index}`}
                className="group flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-md shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B3FFF]/20 hover:shadow-lg hover:shadow-[#1B3FFF]/10 sm:h-40 sm:w-40 sm:p-4 lg:h-44 lg:w-44"
              >
                <Image
                  src={app.logo}
                  alt={app.name}
                  width={140}
                  height={140}
                  unoptimized={app.logo.endsWith('.svg')}
                  className="block h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#1B3FFF] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1B3FFF]/25 transition-all hover:-translate-y-0.5 hover:bg-[#3B5EFF] hover:shadow-xl hover:shadow-[#1B3FFF]/30"
          >
            View All Integrations
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
