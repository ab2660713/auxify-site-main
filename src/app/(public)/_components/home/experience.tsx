'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Headphones,
  Users,
  Monitor,
  Receipt,
  BarChart3,
  Building2,
  PhoneOutgoing,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/brand/logo';

const agents = [
  { id: 'customer-support', label: 'Customer Support AI Agent', icon: Headphones },
  { id: 'hr-recruitment', label: 'HR Recruitment AI Agent', icon: Users },
  { id: 'it-helpdesk', label: 'IT Helpdesk AI Agent', icon: Monitor },
  { id: 'collection-billing', label: 'Collection & Billing AI Agent', icon: Receipt },
  { id: 'market-research', label: 'Market Research & Survey AI Agent', icon: BarChart3 },
  { id: 'receptionist', label: 'Receptionist / Frontdesk AI Agent', icon: Building2 },
  { id: 'outbound-sales', label: 'Outbound Sales AI Agent', icon: PhoneOutgoing },
] as const;

const leftAgents = agents.slice(0, 4);
const rightAgents = agents.slice(4);

const AUTO_PLAY_INTERVAL = 3000;

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % agents.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + agents.length) % agents.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(next, AUTO_PLAY_INTERVAL);
    return () => window.clearInterval(interval);
  }, [isPaused, next]);

  const activeAgent = agents[activeIndex];

  return (
    <section aria-label="AI Employees" className="w-full bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
        {/* ── Top: Heading + Description + CTAs ── */}
        <div className="mb-12 flex flex-col gap-6 text-center lg:mb-16 lg:flex-row lg:items-center lg:text-left">
          <div className="lg:flex-1">
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-6xl">
              AI employees
              <br />
              that work{' '}
              <span className="text-[#1B3FFF]">for you.</span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-sm leading-relaxed text-[#4A5568] sm:text-base lg:text-lg">
              Deploy voice-first AI agents for sales, support, front desk, billing, research, and back-office workflows
              from one operating layer.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1B3FFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#1B3FFF]/25 transition-all hover:-translate-y-0.5 hover:bg-[#3B5EFF]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:-translate-y-0.5 hover:border-[#014baa]/30 hover:shadow-sm"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#014baa]">
                  <ArrowRight className="h-2.5 w-2.5 text-white" />
                </span>
                See Auxify in Action
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom: Agent cards + Center logo ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ─── Mobile/Tablet: Vertical layout ─── */}
          <div className="flex flex-col items-center gap-8 lg:hidden">
            {/* Center logo */}
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
              <div className="absolute inset-0 rounded-full border border-gray-200/60" />
              <div className="absolute inset-4 rounded-full border border-gray-200/80" />
              <div className="absolute inset-8 rounded-full border border-gray-300/60" />
              <div className="absolute inset-14 rounded-full border border-blue-100 bg-blue-50/30" />
              <div className="absolute inset-3 animate-[spin_25s_linear_infinite] rounded-full border-2 border-transparent border-t-[#1B3FFF] border-r-[#3B5EFF] opacity-50" />

              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-gray-200/60 ring-1 ring-gray-100 sm:h-24 sm:w-24">
                <Logo size={44} inkColor="#0a0a0a" aria-hidden />
              </div>

              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-200/60 transition-all hover:scale-110"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-200/60 transition-all hover:scale-110"
              >
                <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>

            {/* Agent name + dots */}
            <div className="text-center">
              <p className="text-base font-bold text-[#0a0a0a]">{activeAgent.label}</p>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {agents.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === activeIndex ? 'h-2 w-5 bg-[#1B3FFF]' : 'h-2 w-2 bg-gray-300 hover:bg-gray-400'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Agent buttons - scrollable grid */}
            <div className="grid w-full max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
              {agents.map((agent, i) => {
                const Icon = agent.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-all duration-300',
                      isActive
                        ? 'border-[#1B3FFF]/20 bg-white shadow-md shadow-[#1B3FFF]/10'
                        : 'border-[#E2E8F0] bg-white/70 hover:border-gray-300 hover:bg-white'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isActive ? 'bg-[#1B3FFF]/10 text-[#1B3FFF]' : 'bg-gray-100 text-[#4A5568]'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={cn(
                        'text-xs font-semibold transition-colors sm:text-sm',
                        isActive ? 'text-[#0a0a0a]' : 'text-[#4A5568]'
                      )}
                    >
                      {agent.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Desktop: 3-column curved layout ─── */}
          <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            {/* Left column - 4 agents curved */}
            <div className="flex flex-col items-end gap-3">
              {leftAgents.map((agent, i) => {
                const Icon = agent.icon;
                const isActive = i === activeIndex;
                const curveOffset = [0, 20, 28, 20][i];
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    style={{ marginRight: `${curveOffset}px` }}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300',
                      isActive
                        ? 'border-[#1B3FFF]/20 bg-white shadow-lg shadow-[#1B3FFF]/10 scale-[1.02]'
                        : 'border-[#E2E8F0] bg-white/80 hover:border-gray-300 hover:bg-white hover:shadow-sm'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isActive ? 'bg-[#1B3FFF]/10 text-[#1B3FFF]' : 'bg-gray-100 text-[#4A5568]'
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span
                      className={cn(
                        'text-sm font-semibold whitespace-nowrap transition-colors',
                        isActive ? 'text-[#0a0a0a]' : 'text-[#4A5568]'
                      )}
                    >
                      {agent.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center - Logo with circles */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative flex h-80 w-80 items-center justify-center xl:h-88 xl:w-88">
                <div className="absolute inset-0 rounded-full border border-gray-200/60" />
                <div className="absolute inset-5 rounded-full border border-gray-200/80" />
                <div className="absolute inset-10 rounded-full border border-gray-300/60" />
                <div className="absolute inset-16 rounded-full border border-blue-100 bg-blue-50/30" />
                <div className="absolute inset-4 animate-[spin_25s_linear_infinite] rounded-full border-2 border-transparent border-t-[#1B3FFF] border-r-[#3B5EFF] opacity-50" />

                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl shadow-gray-200/60 ring-1 ring-gray-100 xl:h-28 xl:w-28">
                  <Logo size={56} inkColor="#0a0a0a" aria-hidden />
                </div>

                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-5 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-gray-200/60 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-5 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-gray-200/60 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg"
                >
                  <ArrowRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <p className="text-center text-lg font-bold text-[#0a0a0a]">
                {activeAgent.label}
              </p>

              <div className="flex items-center gap-2">
                {agents.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === activeIndex ? 'h-2.5 w-6 bg-[#1B3FFF]' : 'h-2.5 w-2.5 bg-gray-300 hover:bg-gray-400'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Right column - 3 agents curved */}
            <div className="flex flex-col items-start gap-3">
              {rightAgents.map((agent, i) => {
                const Icon = agent.icon;
                const globalIndex = i + 4;
                const isActive = globalIndex === activeIndex;
                const curveOffset = [12, 24, 12][i];
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setActiveIndex(globalIndex)}
                    style={{ marginLeft: `${curveOffset}px` }}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300',
                      isActive
                        ? 'border-[#1B3FFF]/20 bg-white shadow-lg shadow-[#1B3FFF]/10 scale-[1.02]'
                        : 'border-[#E2E8F0] bg-white/80 hover:border-gray-300 hover:bg-white hover:shadow-sm'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isActive ? 'bg-[#1B3FFF]/10 text-[#1B3FFF]' : 'bg-gray-100 text-[#4A5568]'
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span
                      className={cn(
                        'text-sm font-semibold whitespace-nowrap transition-colors',
                        isActive ? 'text-[#0a0a0a]' : 'text-[#4A5568]'
                      )}
                    >
                      {agent.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
