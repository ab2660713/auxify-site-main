'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  Database,
  TrendingUp,
  Users,
  FileText,
  Shield,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const features = [
  {
    id: 'voice-agent',
    label: 'Voice Agent',
    icon: Headphones,
    description: 'Multi-lingual voice agents answer, qualify, and route customer calls around the clock.',
  },
  {
    id: 'chat-agent',
    label: 'Chat Agent',
    icon: MessageSquareText,
    description: 'Guided chat support captures intent, answers questions, and keeps conversations moving.',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    description: 'Run outbound sequences for follow-ups, launches, reminders, and reactivation.',
  },
  {
    id: 'omni-channel-inbox',
    label: 'Omni-Channel Inbox',
    icon: Inbox,
    description: 'Unify customer messages from voice, chat, and channels into one operating queue.',
  },
  {
    id: 'workflow-automation',
    label: 'Workflow Automation',
    icon: GitBranch,
    description: 'Build routing, task creation, reminders, escalation, and follow-up flows without friction.',
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    icon: Bot,
    description: 'Give operators context-aware help for replies, summaries, next steps, and decisions.',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: Waypoints,
    description: 'Keep customer records, activity, and relationship context close to every interaction.',
  },
  {
    id: 'human-call-transfer',
    label: 'Human Call Transfer',
    icon: PhoneForwarded,
    description: 'Move from AI to a human teammate when a customer needs care, nuance, or approval.',
  },
  {
    id: 'self-learning',
    label: 'Self Learning',
    icon: BrainCircuit,
    description: 'Learn from your guidance, resolved conversations, operating notes, and business context.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Track signals, outcomes, handoffs, volume, response quality, and customer trends.',
  },
];

function VoiceAgentVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <Mic className="h-10 w-10 text-green-600" />
        <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-30" />
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
        <Phone className="h-4 w-4 text-green-600" />
        <span className="text-xs font-medium text-gray-700">Live call — 2:34</span>
      </div>
      <div className="flex gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-medium text-blue-700">English</span>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-medium text-purple-700">Hindi</span>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-medium text-orange-700">Spanish</span>
      </div>
      <div className="flex w-full max-w-48 items-center gap-1">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex-1 rounded-full bg-green-400" style={{ height: `${8 + Math.sin(i * 0.8) * 12}px`, opacity: 0.5 + Math.sin(i * 0.5) * 0.3 }} />
        ))}
      </div>
    </div>
  );
}

function ChatAgentVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="flex items-start gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200">
          <User className="h-3.5 w-3.5 text-gray-600" />
        </div>
        <div className="rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
          <p className="text-xs text-gray-700">Hi, I need help with my order #4521</p>
        </div>
      </div>
      <div className="flex items-start justify-end gap-2">
        <div className="rounded-xl rounded-tr-sm bg-gray-900 px-3 py-2">
          <p className="text-xs text-white">Let me check that for you. Your order is being shipped today!</p>
        </div>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200">
          <User className="h-3.5 w-3.5 text-gray-600" />
        </div>
        <div className="rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
          <p className="text-xs text-gray-700">Great! Can I change the address?</p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
        <span className="flex-1 text-xs text-gray-400">Type a message...</span>
        <Send className="h-3.5 w-3.5 text-gray-900" />
      </div>
    </div>
  );
}

function CampaignsVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-900">Follow-up Campaign</span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">Active</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
          <div className="h-full w-3/4 rounded-full bg-green-500" />
        </div>
        <p className="mt-1 text-[10px] text-gray-500">742 / 1,000 sent</p>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-900">Reactivation</span>
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-700">Scheduled</span>
        </div>
        <div className="mt-2 flex gap-3 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> 2,400</span>
          <span className="flex items-center gap-1"><Bell className="h-3 w-3" /> Tomorrow</span>
        </div>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-900">Product Launch</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">Draft</span>
        </div>
        <div className="mt-2 flex gap-3 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 5,200 contacts</span>
        </div>
      </div>
    </div>
  );
}

function OmniChannelVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-6">
      {[
        { icon: Phone, name: 'Voice Call', msg: 'Missed call from +91...', time: '2m ago', color: 'bg-green-100 text-green-600' },
        { icon: MessageSquareText, name: 'WhatsApp', msg: 'Need pricing for bulk order', time: '5m ago', color: 'bg-emerald-100 text-emerald-600' },
        { icon: Mail, name: 'Email', msg: 'Re: Partnership proposal', time: '12m ago', color: 'bg-blue-100 text-blue-600' },
        { icon: Globe, name: 'Web Chat', msg: 'How do I integrate the API?', time: '18m ago', color: 'bg-purple-100 text-purple-600' },
      ].map((item) => (
        <div key={item.name} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', item.color)}>
            <item.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-900">{item.name}</span>
              <span className="text-[9px] text-gray-400">{item.time}</span>
            </div>
            <p className="truncate text-[10px] text-gray-500">{item.msg}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkflowVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-0 p-6">
      {[
        { label: 'New Inquiry', color: 'bg-blue-100 text-blue-700' },
        { label: 'Qualify Lead', color: 'bg-purple-100 text-purple-700' },
        { label: 'Assign Agent', color: 'bg-orange-100 text-orange-700' },
        { label: 'Follow Up', color: 'bg-green-100 text-green-700' },
      ].map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          <div className={cn('flex items-center gap-2 rounded-lg px-4 py-2', step.color)}>
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{step.label}</span>
          </div>
          {i < 3 && (
            <div className="flex h-6 flex-col items-center justify-center">
              <div className="h-full w-px bg-gray-300" />
              <ArrowRight className="h-3 w-3 rotate-90 text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AiAssistantVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-yellow-500" />
          <span className="text-[11px] font-semibold text-gray-900">AI Suggestions</span>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="rounded bg-blue-50 px-2 py-1.5 text-[10px] text-blue-700">Suggest: Offer 15% discount for retention</div>
          <div className="rounded bg-green-50 px-2 py-1.5 text-[10px] text-green-700">Next step: Schedule a demo call</div>
          <div className="rounded bg-purple-50 px-2 py-1.5 text-[10px] text-purple-700">Summary: Customer wants enterprise plan</div>
        </div>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-gray-900" />
          <span className="text-[11px] font-medium text-gray-700">Drafting reply...</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-2 w-full rounded bg-gray-100" />
          <div className="h-2 w-4/5 rounded bg-gray-100" />
          <div className="h-2 w-3/5 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function CrmVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Rahul Sharma</p>
            <p className="text-[10px] text-gray-500">Enterprise • Mumbai</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded bg-gray-50 p-2 text-center">
            <p className="text-sm font-bold text-gray-900">12</p>
            <p className="text-[9px] text-gray-500">Interactions</p>
          </div>
          <div className="rounded bg-gray-50 p-2 text-center">
            <p className="text-sm font-bold text-gray-900">3</p>
            <p className="text-[9px] text-gray-500">Deals</p>
          </div>
          <div className="rounded bg-gray-50 p-2 text-center">
            <p className="text-sm font-bold text-green-600">Hot</p>
            <p className="text-[9px] text-gray-500">Lead</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-white p-2 shadow-sm">
          <Database className="h-3.5 w-3.5 text-gray-500" />
          <p className="mt-1 text-[9px] font-medium text-gray-700">4,200 contacts</p>
        </div>
        <div className="flex-1 rounded-lg bg-white p-2 shadow-sm">
          <FileText className="h-3.5 w-3.5 text-gray-500" />
          <p className="mt-1 text-[9px] font-medium text-gray-700">89 active deals</p>
        </div>
      </div>
    </div>
  );
}

function HumanTransferVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Bot className="h-7 w-7 text-gray-600" />
          </div>
          <span className="text-[10px] font-medium text-gray-600">AI Agent</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="h-5 w-5 text-gray-400" />
          <span className="text-[9px] text-gray-400">Transfer</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <User className="h-7 w-7 text-blue-600" />
          </div>
          <span className="text-[10px] font-medium text-gray-600">Human</span>
        </div>
      </div>
      <div className="w-full max-w-52 rounded-lg bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-[10px] font-medium text-gray-700">Escalation triggered</span>
        </div>
        <p className="mt-1 text-[9px] text-gray-500">Customer needs approval for refund &gt; $500</p>
      </div>
    </div>
  );
}

function SelfLearningVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
        <BrainCircuit className="h-8 w-8 text-purple-600" />
      </div>
      <div className="w-full max-w-56 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm">
          <span className="text-[10px] text-gray-700">Conversations learned</span>
          <span className="text-[10px] font-bold text-gray-900">2,847</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm">
          <span className="text-[10px] text-gray-700">Accuracy improvement</span>
          <span className="text-[10px] font-bold text-green-600">+23%</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm">
          <span className="text-[10px] text-gray-700">Knowledge base</span>
          <span className="text-[10px] font-bold text-gray-900">142 docs</span>
        </div>
      </div>
      <div className="h-1.5 w-full max-w-56 rounded-full bg-gray-100">
        <div className="h-full w-4/5 rounded-full bg-purple-500" />
      </div>
      <span className="text-[9px] text-gray-400">Model training: 84% complete</span>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
          <p className="text-[9px] text-gray-500">Total Calls</p>
          <p className="text-lg font-bold text-gray-900">8,432</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-[9px] text-green-600">+12%</span>
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
          <p className="text-[9px] text-gray-500">Resolved</p>
          <p className="text-lg font-bold text-gray-900">94%</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-[9px] text-green-600">+5%</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <p className="text-[10px] font-medium text-gray-700">Weekly Overview</p>
        <div className="mt-2 flex items-end gap-1.5">
          {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gray-900" style={{ height: `${h}px` , opacity: 0.7 + i * 0.04 }} />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[8px] text-gray-400">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </div>
  );
}

const featureVisuals: Record<string, () => React.JSX.Element> = {
  'voice-agent': VoiceAgentVisual,
  'chat-agent': ChatAgentVisual,
  'campaigns': CampaignsVisual,
  'omni-channel-inbox': OmniChannelVisual,
  'workflow-automation': WorkflowVisual,
  'ai-assistant': AiAssistantVisual,
  'crm': CrmVisual,
  'human-call-transfer': HumanTransferVisual,
  'self-learning': SelfLearningVisual,
  'analytics': AnalyticsVisual,
};

const AUTO_PLAY_INTERVAL = 3000;

export default function Feature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animTimeoutRef = useRef<number | null>(null);

  const changeFeature = useCallback((newIndex: number) => {
    if (newIndex === activeIndex) return;
    setActiveIndex(newIndex);
  }, [activeIndex]);

  const nextStep = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => window.clearInterval(interval);
  }, [isPaused, nextStep]);

  const activeFeature = features[activeIndex];

  return (
    <section aria-label="Auxify features" className="w-full bg-white" id="features">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-500 uppercase">10 AI Agents. One Platform.</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to{' '}
            <span className="bg-linear-to-r from-[#0066ff] to-[#00c9a7] bg-clip-text text-transparent">
              automate revenue.
            </span>
          </h2>
        </div>

        {/* Feature tabs - all 10 visible */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => {
                  changeFeature(index);
                  setIsPaused(true);
                  if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
                  animTimeoutRef.current = window.setTimeout(() => setIsPaused(false), 5000);
                }}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{feature.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main content area */}
        <div
          className="overflow-hidden rounded-2xl bg-gray-50 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_40px_-12px_rgba(0,0,0,0.08)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: Visual */}
            <div className="relative min-h-[360px] overflow-hidden sm:min-h-[420px]">
              {features.map((feature, index) => {
                const FeatureVisual = featureVisuals[feature.id];
                const isActive = index === activeIndex;
                return (
                  <div
                    key={feature.id}
                    className={cn(
                      'absolute inset-0 transition-all duration-500 ease-out',
                      isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    )}
                  >
                    <FeatureVisual />
                  </div>
                );
              })}
            </div>

            {/* Right: Text content */}
            <div className="flex flex-col justify-center border-t border-gray-200 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div key={activeFeature.id} className="animate-[fadeSlideIn_0.4s_ease-out]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900">
                  <activeFeature.icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                  {activeFeature.label}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-gray-500 sm:text-lg">
                  {activeFeature.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-8 flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                  </span>
                  <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gray-900 transition-all duration-500"
                      style={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
