'use client';

import { useState } from 'react';
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
  Mic,
  Phone,
  Globe,
  Send,
  User,
  Mail,
  Bell,
  CheckCircle2,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 'voice-agent',
    label: 'Voice Agent',
    icon: Headphones,
    description: 'Multi-lingual voice agents answer, qualify, and route customer calls around the clock.',
    backGradient: 'from-[#0f7b6c] to-[#00C6A7]',
  },
  {
    id: 'chat-agent',
    label: 'Chat Agent',
    icon: MessageSquareText,
    description: 'Guided chat support captures intent, answers questions, and keeps conversations moving.',
    backGradient: 'from-[#1B3FFF] to-[#6366f1]',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    description: 'Run outbound sequences for follow-ups, launches, reminders, and reactivation.',
    backGradient: 'from-[#e85d04] to-[#F5A623]',
  },
  {
    id: 'omni-channel-inbox',
    label: 'Omni-Channel Inbox',
    icon: Inbox,
    description: 'Unify customer messages from voice, chat, and channels into one operating queue.',
    backGradient: 'from-[#7c3aed] to-[#a78bfa]',
  },
  {
    id: 'workflow-automation',
    label: 'Workflow Automation',
    icon: GitBranch,
    description: 'Build routing, task creation, reminders, escalation, and follow-up flows without friction.',
    backGradient: 'from-[#014baa] to-[#3B5EFF]',
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    icon: Bot,
    description: 'Give operators context-aware help for replies, summaries, next steps, and decisions.',
    backGradient: 'from-[#0891b2] to-[#22d3ee]',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: Waypoints,
    description: 'Keep customer records, activity, and relationship context close to every interaction.',
    backGradient: 'from-[#be185d] to-[#f472b6]',
  },
  {
    id: 'human-call-transfer',
    label: 'Human Call Transfer',
    icon: PhoneForwarded,
    description: 'Move from AI to a human teammate when a customer needs care, nuance, or approval.',
    backGradient: 'from-[#065f46] to-[#34d399]',
  },
  {
    id: 'self-learning',
    label: 'Self Learning',
    icon: BrainCircuit,
    description: 'Learn from your guidance, resolved conversations, operating notes, and business context.',
    backGradient: 'from-[#4c1d95] to-[#8b5cf6]',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Track signals, outcomes, handoffs, volume, response quality, and customer trends.',
    backGradient: 'from-[#1e293b] to-[#475569]',
  },
];

function VoiceAgentCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#00C6A7]/10">
        <Mic className="h-11 w-11 text-[#0a0a0a]" strokeWidth={1.5} />
        <div className="absolute inset-0 animate-ping rounded-full bg-[#00C6A7]/20 opacity-30" />
      </div>
      <div className="flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 shadow-md ring-1 ring-[#E2E8F0]">
        <Phone className="h-5 w-5 text-[#00C6A7]" />
        <span className="text-sm font-bold text-[#0a0a0a]">Live call — 2:34</span>
      </div>
      <div className="flex gap-2.5">
        <span className="rounded-full bg-[#1B3FFF]/10 px-4 py-1.5 text-sm font-bold text-[#1B3FFF]">EN</span>
        <span className="rounded-full bg-[#00C6A7]/10 px-4 py-1.5 text-sm font-bold text-[#00C6A7]">HI</span>
        <span className="rounded-full bg-[#F5A623]/10 px-4 py-1.5 text-sm font-bold text-[#F5A623]">ES</span>
      </div>
    </div>
  );
}

function ChatAgentCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0]">
          <User className="h-4 w-4 text-[#4A5568]" />
        </div>
        <div className="rounded-xl rounded-tl-sm bg-[#F1F5F9] px-4 py-2.5 shadow-sm">
          <p className="text-sm text-[#0a0a0a]">Help with order #4521</p>
        </div>
      </div>
      <div className="flex items-start justify-end gap-2.5">
        <div className="rounded-xl rounded-tr-sm bg-[#1B3FFF] px-4 py-2.5">
          <p className="text-sm font-medium text-white">Shipping today! 🚀</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B3FFF]">
          <Bot className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5">
        <span className="flex-1 text-sm text-[#4A5568]/60">Type a message...</span>
        <Send className="h-4 w-4 text-[#1B3FFF]" />
      </div>
    </div>
  );
}

function CampaignsCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="rounded-xl bg-white p-4 shadow-md ring-1 ring-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#0a0a0a]">Follow-up</span>
          <span className="rounded-full bg-[#00C6A7]/10 px-3 py-1 text-xs font-bold text-[#00C6A7]">Active</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-[#E2E8F0]">
          <div className="h-full w-3/4 rounded-full bg-[#00C6A7]" />
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-md ring-1 ring-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#0a0a0a]">Reactivation</span>
          <span className="rounded-full bg-[#F5A623]/10 px-3 py-1 text-xs font-bold text-[#F5A623]">Scheduled</span>
        </div>
        <div className="mt-2 flex gap-4 text-xs font-medium text-[#4A5568]">
          <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> 2,400</span>
          <span className="flex items-center gap-1.5"><Bell className="h-4 w-4" /> Tomorrow</span>
        </div>
      </div>
    </div>
  );
}

function OmniChannelCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      {[
        { icon: Phone, name: 'Voice', color: 'bg-[#00C6A7]/10 text-[#00C6A7]' },
        { icon: MessageSquareText, name: 'WhatsApp', color: 'bg-[#00C6A7]/15 text-[#00C6A7]' },
        { icon: Mail, name: 'Email', color: 'bg-[#1B3FFF]/10 text-[#1B3FFF]' },
        { icon: Globe, name: 'Web', color: 'bg-[#3B5EFF]/10 text-[#3B5EFF]' },
      ].map((item) => (
        <div key={item.name} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-md ring-1 ring-[#E2E8F0]">
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', item.color)}>
            <item.icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold text-[#0a0a0a]">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function WorkflowCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-0 p-6">
      {['Inquiry', 'Qualify', 'Assign', 'Follow Up'].map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 shadow-md ring-1 ring-[#E2E8F0]">
            <CheckCircle2 className="h-5 w-5 text-[#00C6A7]" />
            <span className="text-sm font-bold text-[#0a0a0a]">{step}</span>
          </div>
          {i < 3 && <div className="h-5 w-px bg-[#1B3FFF]/30" />}
        </div>
      ))}
    </div>
  );
}

function AiAssistantCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-[#F5A623]" />
        <span className="text-sm font-bold text-[#0a0a0a]">AI Suggestions</span>
      </div>
      <div className="space-y-2.5">
        <div className="rounded-xl bg-[#1B3FFF]/5 px-4 py-2.5 text-sm font-medium text-[#1B3FFF]">Offer 15% discount</div>
        <div className="rounded-xl bg-[#00C6A7]/10 px-4 py-2.5 text-sm font-medium text-[#00C6A7]">Schedule demo call</div>
        <div className="rounded-xl bg-[#F5A623]/10 px-4 py-2.5 text-sm font-medium text-[#F5A623]">Enterprise interest</div>
      </div>
    </div>
  );
}

function CrmCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-md ring-1 ring-[#E2E8F0]">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B3FFF]/10">
          <User className="h-5 w-5 text-[#1B3FFF]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#0a0a0a]">Rahul Sharma</p>
          <p className="text-xs text-[#4A5568]">Enterprise</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-[#F8FAFC] p-3 text-center ring-1 ring-[#E2E8F0]">
          <p className="text-lg font-black text-[#0a0a0a]">12</p>
          <p className="text-[10px] font-medium text-[#4A5568]">Chats</p>
        </div>
        <div className="rounded-xl bg-[#F8FAFC] p-3 text-center ring-1 ring-[#E2E8F0]">
          <p className="text-lg font-black text-[#0a0a0a]">3</p>
          <p className="text-[10px] font-medium text-[#4A5568]">Deals</p>
        </div>
        <div className="rounded-xl bg-[#00C6A7]/5 p-3 text-center ring-1 ring-[#00C6A7]/20">
          <p className="text-lg font-black text-[#00C6A7]">Hot</p>
          <p className="text-[10px] font-medium text-[#4A5568]">Lead</p>
        </div>
      </div>
    </div>
  );
}

function HumanTransferCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E2E8F0]">
          <Bot className="h-7 w-7 text-[#4A5568]" />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B3FFF]/10">
          <ArrowRight className="h-5 w-5 text-[#1B3FFF]" />
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1B3FFF]/10">
          <User className="h-7 w-7 text-[#1B3FFF]" />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-[#F5A623]/10 px-4 py-2">
        <Shield className="h-4 w-4 text-[#F5A623]" />
        <span className="text-sm font-bold text-[#F5A623]">Escalation triggered</span>
      </div>
    </div>
  );
}

function SelfLearningCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3B5EFF]/10">
        <BrainCircuit className="h-9 w-9 text-[#3B5EFF]" />
      </div>
      <div className="w-full space-y-2.5">
        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-[#E2E8F0]">
          <span className="text-sm font-medium text-[#4A5568]">Learned</span>
          <span className="text-sm font-black text-[#0a0a0a]">2,847</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-[#E2E8F0]">
          <span className="text-sm font-medium text-[#4A5568]">Accuracy</span>
          <span className="text-sm font-black text-[#00C6A7]">+23%</span>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl bg-white p-3 shadow-md ring-1 ring-[#E2E8F0]">
          <p className="text-xs font-medium text-[#4A5568]">Calls</p>
          <p className="text-xl font-black text-[#0a0a0a]">8.4K</p>
          <TrendingUp className="mt-1 h-4 w-4 text-[#00C6A7]" />
        </div>
        <div className="flex-1 rounded-xl bg-white p-3 shadow-md ring-1 ring-[#E2E8F0]">
          <p className="text-xs font-medium text-[#4A5568]">Resolved</p>
          <p className="text-xl font-black text-[#0a0a0a]">94%</p>
          <TrendingUp className="mt-1 h-4 w-4 text-[#00C6A7]" />
        </div>
      </div>
      <div className="flex items-end gap-1 rounded-xl bg-white p-4 shadow-md ring-1 ring-[#E2E8F0]">
        {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-[#1B3FFF]" style={{ height: `${h * 0.5}px`, opacity: 0.7 + i * 0.04 }} />
        ))}
      </div>
    </div>
  );
}

const cardVisuals: Record<string, () => React.JSX.Element> = {
  'voice-agent': VoiceAgentCard,
  'chat-agent': ChatAgentCard,
  'campaigns': CampaignsCard,
  'omni-channel-inbox': OmniChannelCard,
  'workflow-automation': WorkflowCard,
  'ai-assistant': AiAssistantCard,
  'crm': CrmCard,
  'human-call-transfer': HumanTransferCard,
  'self-learning': SelfLearningCard,
  'analytics': AnalyticsCard,
};

export default function Features2() {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const displayCards = [...features, ...features];

  return (
    <section aria-label="Auxify features" className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24" id="features">
      {/* Custom styles for 3D flip + marquee */}
      <style jsx>{`
        .flip-container {
          perspective: 1400px;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .flip-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-front,
        .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .marquee-track:hover,
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Section heading */}
        <div className="mb-14 text-center">
          {/* <p className="mb-4 inline-block rounded-full border border-[#1B3FFF]/20 bg-[#1B3FFF]/5 px-4 py-1.5 text-xs font-semibold text-[#1B3FFF]">
            10 AI Agents. One Platform.
          </p> */}
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl">
            Everything you need to{' '}
            <span className="text-[#1B3FFF]">automate revenue.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#4A5568] sm:text-lg">
            Boost your operations with high-impact AI agents. Our platform is ready to propel your business forward.
          </p>
        </div>
      </div>

      {/* Continuous marquee cards with flip */}
      <div className="relative w-full overflow-hidden py-12">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white to-transparent sm:w-32 lg:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white to-transparent sm:w-32 lg:w-44" />

        <div
          className={cn('marquee-track', isPaused && 'paused')}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setFlippedId(null);
          }}
        >
          {displayCards.map((feature, i) => {
            const Visual = cardVisuals[feature.id];
            const isFlipped = feature.id === flippedId;

            return (
              <div
                key={`${feature.id}-${i}`}
                className="flip-container shrink-0 transition-all duration-500 ease-out hover:z-20 hover:scale-[1.08]"
                style={{
                  width: '20rem',
                  height: '26rem',
                }}
                onMouseEnter={() => setFlippedId(feature.id)}
                onMouseLeave={() => setFlippedId(null)}
                onClick={() => setFlippedId(isFlipped ? null : feature.id)}
              >
                <div className={cn('flip-inner', isFlipped && 'flipped')}>
                  {/* Front face - Visual */}
                  <div className="flip-front border border-[#E2E8F0] bg-white shadow-xl shadow-gray-200/60">
                    <div className="flex h-full flex-col">
                      <div className="flex-1 overflow-hidden bg-[#F8FAFC]">
                        <Visual />
                      </div>
                      <div className="border-t border-[#E2E8F0] bg-white px-4 py-4 text-center">
                        <feature.icon className="mx-auto h-6 w-6 text-[#1B3FFF]" />
                        <p className="mt-1.5 text-sm font-bold text-[#0a0a0a]">{feature.label}</p>
                      </div>
                    </div>
                  </div>

                  {/* Back face - Vibrant gradient */}
                  <div className={cn('flip-back bg-linear-to-br shadow-2xl', feature.backGradient)}>
                    {/* Decorative circles */}
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />

                    <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg shadow-black/10 backdrop-blur-sm">
                        <feature.icon className="h-8 w-8 text-white" strokeWidth={1.8} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{feature.label}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/90">
                        {feature.description}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                        <span>Learn more</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#1B3FFF] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1B3FFF]/25 transition-all hover:-translate-y-0.5 hover:bg-[#3B5EFF] hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
