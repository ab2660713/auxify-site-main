import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const consoleSignUpHref = 'https://app.auxify.live/sign-up';
const ctaImageSrc = '/assets/cta.jpg';

export default function CTA() {
  return (
    <section
      aria-label="Auxify call to action"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#d7eef6] py-20 sm:py-24"
      id="pricing"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30">
        <Image alt="" className="object-cover object-bottom" fill sizes="100vw" src={ctaImageSrc} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.64)_0%,rgba(255,255,255,0.16)_34%,rgba(4,16,31,0.05)_68%,rgba(4,16,31,0.18)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/3 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0)_100%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid h-full w-full grid-cols-6 divide-x divide-[#04101f]/8 sm:grid-cols-12 sm:divide-[#04101f]/10">
          {/* <div className="col-span-1" />
          <div className="col-span-1 sm:col-span-3" />
          <div className="col-span-2 sm:col-span-4" />
          <div className="col-span-1 sm:col-span-3" />
          <div className="col-span-1" /> */}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(92svh-10rem)] w-full max-w-7xl items-center justify-center p-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center text-[#04101f]">
          <p className="mb-6 text-sm leading-6 font-medium text-[#0b5c7e] sm:text-base">
            AI customer operations for teams ready to move faster
          </p>

          <h2 className="max-w-5xl text-center font-serif text-4xl leading-[0.98] font-medium text-balance text-[#04101f] italic sm:text-5xl md:text-6xl lg:text-7xl">
            Ready to scale every customer conversation?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 font-normal text-pretty text-[#12304a]/88 sm:text-lg md:text-xl md:leading-8">
            Auxify brings sales, support, follow-ups, and handoffs into one AI-powered workspace so every customer gets
            momentum.
          </p>

          <Link
            aria-label="Start free trial with Auxify"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group mt-10 h-auto gap-2 rounded-full border border-[#04101f]/10 bg-[#04101f] p-1 font-normal text-white shadow-[0_24px_70px_rgba(4,16,31,0.22)] transition-transform duration-200 outline-none hover:-translate-y-0.5 hover:bg-[#07172a] focus-visible:ring-2 focus-visible:ring-[#04101f]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#d7eef6] active:translate-y-0',
            )}
            href={consoleSignUpHref}
          >
            <span className="px-5 py-3 text-sm font-medium text-white sm:px-6 sm:py-3.5 sm:text-base">
              Start Free Trial
            </span>
            <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[#04101f] transition-colors duration-300 ease-out group-hover:bg-[#dff5ff] sm:size-12">
              <ArrowUpRight
                aria-hidden="true"
                className="absolute size-5 translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10"
              />
              <ArrowUpRight
                aria-hidden="true"
                className="absolute size-5 -translate-x-10 translate-y-10 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
