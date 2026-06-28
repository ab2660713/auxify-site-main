'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Stethoscope, ShoppingCart, Home, Landmark, ArrowRight } from 'lucide-react';

const industries = [
  {
    icon: Home,
    title: 'Real Estate',
    description: 'Convert property inquiries into site visits, broker follow-ups, and faster closures.',
    accent: '#00C6A7',
    bg: 'bg-[#00C6A7]/10',
  },
  {
    icon: Landmark,
    title: 'Finance',
    description: 'Qualify leads, collect documents, and streamline customer follow-ups securely.',
    accent: '#1B3FFF',
    bg: 'bg-[#1B3FFF]/10',
  },
  {
    icon: ShoppingCart,
    title: 'Retail & Ecommerce',
    description: 'Respond faster, resolve customer queries, and increase repeat purchases.',
    accent: '#F5A623',
    bg: 'bg-[#F5A623]/10',
  },
  {
    icon: CalendarDays,
    title: 'Events & Hospitality',
    description: 'Handle bookings, guest communication, reminders, and event coordination clearly.',
    accent: '#3B5EFF',
    bg: 'bg-[#3B5EFF]/10',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare & Clinics',
    description: 'Manage patient inquiries, appointment bookings, reminders, and follow-ups in one workflow.',
    accent: '#014baa',
    bg: 'bg-[#014baa]/10',
  },
];

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % industries.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section aria-label="Industries for Auxify" className="relative w-full overflow-hidden bg-white py-20 sm:py-28">
      {/* Background dots pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-16 text-center">
          {/* <p className="mb-4 inline-block rounded-full border border-[#1B3FFF]/20 bg-[#1B3FFF]/5 px-4 py-1.5 text-xs font-semibold text-[#1B3FFF]">
            
          </p> */}
          <h2 className="text-4xl font-bold tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl">
            Built for businesses where
            <br />
            every inquiry drives{' '}
            <span className="text-[#1B3FFF]">revenue</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#4A5568]">
            Auxify AI agents adapt to your industry workflows, capturing inquiries, automating follow-ups, and turning
            conversations into revenue.
          </p>
        </div>

        {/* Cards in curved layout */}
        <div className="relative mx-auto flex h-80 max-w-6xl items-center justify-center">
          {industries.map((industry, index) => {
            const total = industries.length;
            let offset = index - activeIndex;
            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            const isVisible = Math.abs(offset) <= 2;
            const isActive = offset === 0;
            const translateX = offset * 270;
            const translateY = Math.pow(offset, 2) * 14;
            const rotation = offset * 3;
            const zIndex = 10 - Math.abs(offset);
            const scale = isActive ? 1.08 : 0.92;
            const opacity = isVisible ? 1 : 0;

            return (
              <div
                key={industry.title}
                className="absolute cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
                onClick={() => {
                  setActiveIndex(index);
                  setPaused(true);
                  setTimeout(() => setPaused(false), 5000);
                }}
              >
                <div
                  className={`w-60 rounded-2xl border p-6 transition-all duration-500 sm:w-64 ${
                    isActive
                      ? 'border-transparent bg-white shadow-2xl shadow-[#1B3FFF]/15 ring-1 ring-[#1B3FFF]/20'
                      : 'border-[#E2E8F0] bg-white/80 shadow-lg shadow-gray-200/50'
                  }`}
                >
                  <div className="mb-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${industry.bg}`}
                    >
                      <industry.icon className="h-5 w-5" style={{ color: industry.accent }} />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0a0a0a]">{industry.title}</h3>

                  <div
                    className="my-3 h-0.5 w-10 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: industry.accent,
                      width: isActive ? '2.5rem' : '1.5rem',
                    }}
                  />

                  <p className="text-sm leading-relaxed text-[#4A5568]">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {industries.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setPaused(true);
                setTimeout(() => setPaused(false), 5000);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? 'h-2.5 w-6 bg-[#1B3FFF]' : 'h-2.5 w-2.5 bg-[#E2E8F0] hover:bg-[#3B5EFF]/40'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#1B3FFF] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1B3FFF]/25 transition-all hover:-translate-y-0.5 hover:bg-[#3B5EFF] hover:shadow-xl hover:shadow-[#1B3FFF]/30"
          >
            Explore Industry Solutions
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
