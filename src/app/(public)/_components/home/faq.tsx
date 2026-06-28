'use client';

import { useState } from 'react';
import { Plus, HelpCircle, MessageCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type FAQItem = {
  question: string;
  answer: string;
};
type FAQSectionProps = {
  title?: string;
  faqs?: FAQItem[];
};
const defaultFAQs: FAQItem[] = [
  {
    question: 'What is Auxify and how does it help businesses manage customers?',
    answer:
      'Auxify is an AI-powered workforce platform that provides AI employees for sales, customer support, and customer operations. Combining AI agents, CRM, omnichannel communication, and workflow automation, Auxify helps businesses increase productivity, improve customer experiences, and drive revenue growth.',
  },
  {
    question: 'Does Auxify support WhatsApp, Meta, and omnichannel customer communication?',
    answer:
      'Yes. Auxify brings customer conversations from WhatsApp, Meta, website chat, email, and voice into one unified inbox. This helps teams manage omnichannel customer communication without switching between multiple tools',
  },
  {
    question: ' Can Auxify automate lead follow-ups and sales workflows?',
    answer:
      'Yes. Auxify automates lead assignment, follow-up reminders, pipeline updates, customer notifications, and repetitive sales workflows. This helps businesses reduce manual work, improve response times, and increase lead conversion.',
  },
  {
    question: 'Does Auxify include AI chat and voice agents??',
    answer:
      'Yes. Auxify includes AI assistants for customer messaging and AI voice agents for inbound and outbound calls. Businesses can automate responses, qualify leads, answer customer questions, and hand off conversations to team members when needed.',
  },
  {
    question: 'Which businesses can use Auxify?',
    answer:
      'Auxify is built for businesses that manage customer inquiries and follow-ups at scale, including real estate, healthcare, education, finance, retail & ecommerce, events, and service-based teams.',
  },
   {
    question: 'Is Auxify suitable for startups and growing businesses?',
    answer:
      'Yes. Auxify is designed for startups, SMBs, and growing teams that need CRM, customer communication, and automation in one scalable platform—without the complexity of enterprise software.',
  },
];

export const FAQSection = ({ title = 'Frequently asked questions', faqs = defaultFAQs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-label="Auxify frequently asked questions" className="w-full bg-white px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Title + decoration */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0a0a0a]" />
                <p className="font-mono text-xs font-medium tracking-wide text-[#0b5c7e] uppercase">FAQ</p>
              </div>
              <h2 className="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Can&apos;t find what you&apos;re looking for? Reach out to our team and we&apos;ll get back to you.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                Contact us
              </a>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className={cn(
                      'group rounded-xl border bg-white transition-all duration-300',
                      isOpen
                        ? 'border-[#0b5c7e]/20 shadow-md shadow-[#0b5c7e]/5'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors duration-300',
                            isOpen ? 'bg-[#014baa] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200',
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'text-base font-medium transition-colors duration-200 sm:text-lg',
                            isOpen ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900',
                          )}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                          isOpen
                            ? 'rotate-45 border-[#0b5c7e]/30 bg-[#0b5c7e]/10 text-[#0b5c7e]'
                            : 'border-gray-200 bg-white text-gray-400 group-hover:border-gray-300 group-hover:text-gray-600',
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </div>
                    </button>

                    <div
                      className={cn(
                        'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="border-t border-gray-100 px-5 pt-4 pb-5 sm:px-6 sm:pl-17">
                          <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
