'use client';

import {
  BarChart3,
  Bot,
  BrainCircuit,
  GitBranch,
  Headphones,
  Inbox,
  Megaphone,
  MessageSquareText,
  PhoneForwarded,
  Waypoints,
} from 'lucide-react';

const features = [
  {
    id: 'voice-agent',
    label: 'Voice Agent',
    icon: Headphones,
    description: 'Multi-lingual voice agents answer, qualify, and route customer calls around the clock.',
    gradient: 'from-[#E8F5E9] to-[#C8E6C9]',
    iconBg: 'bg-[#2E7D32]',
  },
  {
    id: 'chat-agent',
    label: 'Chat Agent',
    icon: MessageSquareText,
    description: 'Guided chat support captures intent, answers questions, and keeps conversations moving.',
    gradient: 'from-[#E3F2FD] to-[#BBDEFB]',
    iconBg: 'bg-[#1565C0]',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    description: 'Run outbound sequences for follow-ups, launches, reminders, and reactivation.',
    gradient: 'from-[#FFF3E0] to-[#FFE0B2]',
    iconBg: 'bg-[#E65100]',
  },
  {
    id: 'omni-channel-inbox',
    label: 'Omni-Channel Inbox',
    icon: Inbox,
    description: 'Unify customer messages from voice, chat, and channels into one operating queue.',
    gradient: 'from-[#F3E5F5] to-[#E1BEE7]',
    iconBg: 'bg-[#6A1B9A]',
  },
  {
    id: 'workflow-automation',
    label: 'Workflow Automation',
    icon: GitBranch,
    description: 'Build routing, task creation, reminders, escalation, and follow-up flows without friction.',
    gradient: 'from-[#E8EAF6] to-[#C5CAE9]',
    iconBg: 'bg-[#283593]',
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    icon: Bot,
    description: 'Give operators context-aware help for replies, summaries, next steps, and decisions.',
    gradient: 'from-[#E0F7FA] to-[#B2EBF2]',
    iconBg: 'bg-[#00838F]',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: Waypoints,
    description: 'Keep customer records, activity, and relationship context close to every interaction.',
    gradient: 'from-[#FCE4EC] to-[#F8BBD0]',
    iconBg: 'bg-[#AD1457]',
  },
  {
    id: 'human-call-transfer',
    label: 'Human Call Transfer',
    icon: PhoneForwarded,
    description: 'Move from AI to a human teammate when a customer needs care, nuance, or approval.',
    gradient: 'from-[#FBE9E7] to-[#FFCCBC]',
    iconBg: 'bg-[#BF360C]',
  },
  {
    id: 'self-learning',
    label: 'Self Learning',
    icon: BrainCircuit,
    description: 'Learn from your guidance, resolved conversations, operating notes, and business context.',
    gradient: 'from-[#EDE7F6] to-[#D1C4E9]',
    iconBg: 'bg-[#4527A0]',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Track signals, outcomes, handoffs, volume, response quality, and customer trends.',
    gradient: 'from-[#E0F2F1] to-[#B2DFDB]',
    iconBg: 'bg-[#00695C]',
  },
];

export default function Feature() {
  return (
    <section aria-label="Auxify features" className="w-full bg-white" id="features">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mb-12 text-center">
          <p className="text-xs font-black tracking-[0.16em] uppercase text-[#0a0a0a]">
            10 AI Agents. One Platform.
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.03em] text-[#07111D] sm:text-4xl lg:text-5xl">
            Everything you need to automate customer operations.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-[#4A5568] sm:text-lg">
            Each agent handles a specific function — from voice calls to analytics — working together as one connected workforce.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.id}
                className="group flex h-55 flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_-12px_rgba(1,35,84,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(1,35,84,0.14)]"
              >
                <div className={`flex h-24 shrink-0 items-center justify-center bg-linear-to-br ${feature.gradient}`}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-black leading-tight text-[#07111D]">
                    {feature.label}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-[11px] leading-4 font-medium text-[#4A5568]">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
