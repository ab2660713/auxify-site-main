'use client';

import { Cable, Rocket, Settings2, UserPlus } from 'lucide-react';

const steps = [
  {
    title: 'Research & Ideation',
    detail:
      'We start by understanding user needs, market trends, and business goals to generate innovative product ideas.',
    icon: UserPlus,
    time: '~1 week',
  },
  {
    title: 'Design & Development',
    detail:
      'Concepts evolve into tangible experiences through structured UX design, polished interfaces, and agile engineering.',
    icon: Settings2,
    time: '~3 weeks',
  },
  {
    title: 'Production & Quality Testing',
    detail:
      'Each element of the product undergoes thorough validation. We test functionality, usability, accessibility, and performance.',
    icon: Cable,
    time: '~1 month',
  },
  {
    title: 'Launch & Support',
    detail:
      'Once launched, we monitor performance, resolve issues quickly, and continuously refine the product.',
    icon: Rocket,
    time: 'Launch Completed',
  },
] as const;

export default function Timeline() {
  return (
    <section aria-label="Product development lifecycle" className="w-full bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes growLine {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .timeline-line-bg {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 3px;
          background: #E2E8F0;
        }
        .timeline-line-fill {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 3px;
          background: #014baa;
          width: 0%;
          animation: growLine 4s ease-out forwards infinite;
        }
      `}} />

      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#4A5568] uppercase">Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#014baa] sm:text-4xl lg:text-5xl">
            Our Product Development Lifecycle
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4A5568]">
            We follow a streamlined lifecycle that ensures reliability and excellence at every stage from requirements to launch. Our lifecycle is built around clarity, collaboration, and continuous improvement.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated horizontal line — grows left to right then repeats */}
          <div className="hidden sm:block absolute left-0 right-0" style={{ top: '2rem' }}>
            <div className="timeline-line-bg" />
            <div className="timeline-line-fill" />
          </div>

          {/* Steps */}
          <div className="grid gap-8 sm:grid-cols-4 sm:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.title} className="relative flex flex-col items-center text-center sm:px-4">
                  {/* Icon circle */}
                  <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-[2.5px] border-[#014baa] bg-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#014baa]/20">
                    <Icon className="h-6 w-6 text-[#014baa]" strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="max-w-[15rem]">
                    <h3 className="text-base font-bold leading-snug text-[#0a0a0a] sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
                      {step.detail}
                    </p>
                  </div>

                  {/* Time marker */}
                  

                  {/* Arrow dot connector between steps */}
                  {!isLast && (
                    <div className="absolute right-0 top-[1.85rem] hidden -translate-y-1/2 translate-x-1/2 z-10 sm:block">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#014baa] shadow-sm">
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
