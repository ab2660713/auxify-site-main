'use client';

import Link from 'next/link';
import { ArrowRight, Phone, MessageSquareText, Zap, Users, TrendingUp } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { ShaderBackground } from '@/components/ui/shader';
import { cn } from '@/lib/utils';

const consoleSignUpHref = 'https://app.auxify.live/sign-up';
const consoleSignInHref = 'https://app.auxify.live/sign-in';

const heroPrimaryCtaClassName = cn(
  buttonVariants({ size: 'lg' }),
  'group/hero-primary relative isolate h-12 overflow-hidden rounded-full border border-white/20 bg-[#1B3FFF] px-7 text-base font-semibold text-white shadow-[0_20px_50px_-12px_rgba(27,63,255,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B5EFF] hover:shadow-[0_25px_60px_-12px_rgba(27,63,255,0.9)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#3B5EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040816] focus-visible:outline-none sm:min-w-44',
);
const heroSecondaryCtaClassName = cn(
  buttonVariants({ size: 'lg' }),
  'group/hero-secondary relative isolate h-12 overflow-hidden rounded-full border border-white/20 bg-white/8 px-7 text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/14 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040816] focus-visible:outline-none sm:min-w-40',
);

const stats = [
  { value: '10M+', label: 'Conversations handled', icon: MessageSquareText },
  { value: '98%', label: 'Resolution rate', icon: TrendingUp },
  { value: '24/7', label: 'Always available', icon: Phone },
];

export function Hero() {
  return (
    <section
      aria-label="Auxify hero"
      className="h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-background p-2"
      id="platform"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(0, 198, 167, 0.4); }
          50% { box-shadow: 0 0 20px rgba(0, 198, 167, 0.7); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .hero-badge { animation: fadeInUp 0.6s ease-out both; }
        .hero-heading { animation: fadeInUp 0.7s ease-out 0.1s both; }
        .hero-subtitle { animation: fadeInUp 0.7s ease-out 0.2s both; }
        .hero-ctas { animation: fadeInUp 0.7s ease-out 0.3s both; }
        .hero-stats { animation: fadeInUp 0.7s ease-out 0.45s both; }
        .hero-trust { animation: fadeIn 1s ease-out 0.7s both; }
        .hero-float { animation: float 4s ease-in-out infinite; }
      `}} />

      <div className="mx-auto flex h-full min-h-0 w-full flex-col">
        <ShaderBackground className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 shadow-[0_28px_90px_-52px_rgba(1,75,170,0.95),0_18px_60px_-42px_rgba(2,6,23,0.9)] ring-1 ring-black/5">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(4,16,31,0.15)_100%)]"
          />

          {/* Floating decorative elements */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <div className="hero-float absolute left-[8%] top-[20%] hidden h-14 w-14 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md lg:flex items-center justify-center shadow-lg" style={{ animationDelay: '0s' }}>
              <Phone className="h-6 w-6 text-[#00C6A7]" />
            </div>
            <div className="hero-float absolute right-[10%] top-[25%] hidden h-14 w-14 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md lg:flex items-center justify-center shadow-lg" style={{ animationDelay: '1.5s' }}>
              <MessageSquareText className="h-6 w-6 text-white" />
            </div>
            <div className="hero-float absolute left-[12%] bottom-[28%] hidden h-12 w-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md lg:flex items-center justify-center shadow-lg" style={{ animationDelay: '2.5s' }}>
              <Users className="h-5 w-5 text-[#F5A623]" />
            </div>
            <div className="hero-float absolute right-[14%] bottom-[32%] hidden h-12 w-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md lg:flex items-center justify-center shadow-lg" style={{ animationDelay: '3.5s' }}>
              <Zap className="h-5 w-5 text-[#00C6A7]" />
            </div>
          </div>

          <div className="relative mx-auto flex h-full min-h-0 w-full max-w-7xl items-center justify-center p-4 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-5 sm:pt-20 sm:pb-7">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

              {/* Animated badge */}
              <div className="hero-badge mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#00C6A7]/30 bg-[#00C6A7]/10 px-4 py-2 backdrop-blur-sm" style={{ animation: 'pulse-glow 3s ease-in-out infinite, fadeInUp 0.6s ease-out both' }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C6A7] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C6A7]" />
                </span>
                <span className="text-xs font-semibold text-[#00C6A7] sm:text-sm">AI Employees — Live & Operating</span>
              </div>

              {/* Headline */}
              <h1 className="hero-heading max-w-5xl font-serif text-[clamp(2.6rem,8.5vw,6.5rem)] leading-[0.92] font-medium text-balance text-white italic">
                Customer operations, finally effortless.
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle mt-5 max-w-2xl text-base leading-7 font-medium text-pretty text-white/75 sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
                Deploy AI employees for sales, support, billing, and growth —
                one platform, every channel, always on.
              </p>

              {/* CTAs */}
              <div className="hero-ctas mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  aria-label="Start a free Auxify trial"
                  className={heroPrimaryCtaClassName}
                  href={consoleSignUpHref}
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="relative z-10 size-4 transition-transform duration-300 group-hover/hero-primary:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
                <Link aria-label="Sign in to Auxify" className={heroSecondaryCtaClassName} href={consoleSignInHref}>
                  <span className="relative z-10">Sign in</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="relative z-10 size-4 opacity-60 transition-transform duration-300 group-hover/hero-secondary:translate-x-0.5"
                  />
                </Link>
              </div>

              {/* Stats row */}
              <div className="hero-stats mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 backdrop-blur-sm">
                      <stat.icon className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white sm:text-base">{stat.value}</p>
                      <p className="text-[10px] text-white/50 sm:text-xs">{stat.label}</p>
                    </div>
                    {i < stats.length - 1 && (
                      <div className="ml-4 hidden h-8 w-px bg-white/10 sm:ml-6 sm:block" />
                    )}
                  </div>
                ))}
              </div>

              {/* Trust text */}
           
            </div>
          </div>
        </ShaderBackground>
      </div>
    </section>
  );
}
