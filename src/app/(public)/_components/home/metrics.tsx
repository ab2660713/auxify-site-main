'use client';

import { useEffect, useRef, useState } from 'react';

const metrics = [
  { prefix: '', numeric: 40, suffix: '%', label: 'Lower Operational Costs' },
  { prefix: '', numeric: 2, suffix: '×', label: 'Higher Lead Conversion' },
  { prefix: '', numeric: 3, suffix: '×', label: 'Faster Response Time' },
  { prefix: '<', numeric: 600, suffix: 'ms', label: 'AI Response Latency' },
];

/* count-up hook */
function useCounter(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

/* scroll progress hook */
function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.round((window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return pct;
}

/* scroll progress bar — top only */
function ScrollProgress({ pct }: { pct: number }) {
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full">
      <div className="h-full bg-[#0b5c7e] transition-[width] duration-150 ease-linear" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* single metric card */
function MetricCard({ metric, index, inView }: { metric: (typeof metrics)[number]; index: number; inView: boolean }) {
  const count = useCounter(metric.numeric, inView, 1400 + index * 100);

  return (
    <div className="flex flex-col items-center text-center px-3 py-8">
      {/* big number */}
      <dd className="font-mono text-5xl font-bold tabular-nums leading-none text-[#014baa] sm:text-6xl">
        {metric.prefix}
        {inView ? count.toLocaleString() : 0}
        {metric.suffix}
      </dd>

      {/* label */}
      <dt className="mt-3 text-sm font-medium text-slate-500 leading-snug">{metric.label}</dt>
    </div>
  );
}

/* main export */
export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const scrollPct = useScrollProgress();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress pct={scrollPct} />
      <section ref={sectionRef} aria-label="Auxify operating metrics" className="w-full py-16 sm:py-20">
        <div className="mx-auto w-full max-w-5xl px-4">
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} inView={inView} />
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
