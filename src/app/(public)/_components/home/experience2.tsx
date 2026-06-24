'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  Send,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/brand/logo';

const agents = [
  {
    id: 'customer-support',
    label: 'Customer Support AI Agent',
    icon: Headphones,
    replies: ['I can help with that! Let me check your account.', 'Your issue has been prioritized. A specialist will follow up shortly.', 'I\'ve found 3 similar cases resolved successfully.'],
    suggestions: ['Track my order', 'Refund status', 'Speak to human'],
  },
  {
    id: 'hr-recruitment',
    label: 'HR Recruitment AI Agent',
    icon: Users,
    replies: ['I\'ve shortlisted 5 candidates matching your criteria.', 'Interview scheduled for tomorrow at 2 PM.', 'The candidate\'s profile score is 92%.'],
    suggestions: ['Screen resumes', 'Schedule interview', 'Job posting'],
  },
  {
    id: 'it-helpdesk',
    label: 'IT Helpdesk AI Agent',
    icon: Monitor,
    replies: ['Running diagnostics on your system now...', 'Found the issue — your VPN certificate expired. Renewing it.', 'Ticket #4521 created and assigned to infra team.'],
    suggestions: ['Reset password', 'VPN issue', 'New laptop'],
  },
  {
    id: 'collection-billing',
    label: 'Collection & Billing AI Agent',
    icon: Receipt,
    replies: ['Payment of ₹24,500 received on June 18.', 'I\'ve generated your invoice and sent it via email.', 'Your next billing cycle starts July 1.'],
    suggestions: ['Pending invoices', 'Payment history', 'Update plan'],
  },
  {
    id: 'market-research',
    label: 'Market Research & Survey AI Agent',
    icon: BarChart3,
    replies: ['Survey response rate is at 67% — above benchmark.', 'Top competitor launched a new feature last week.', 'I\'ve compiled the sentiment analysis report.'],
    suggestions: ['Run survey', 'Competitor analysis', 'Trends report'],
  },
  {
    id: 'receptionist',
    label: 'Receptionist / Frontdesk AI Agent',
    icon: Building2,
    replies: ['Visitor pass generated for Mr. Sharma — Gate 2.', 'Meeting room B3 is available from 3–5 PM.', 'I\'ve notified the team about the delivery.'],
    suggestions: ['Book room', 'Visitor entry', 'Call directory'],
  },
  {
    id: 'outbound-sales',
    label: 'Outbound Sales AI Agent',
    icon: PhoneOutgoing,
    replies: ['Reached 45 leads today — 12 showed interest.', 'Follow-up call scheduled with Acme Corp at 4 PM.', 'Conversion rate is up 18% this week.'],
    suggestions: ['Call next lead', 'Today\'s pipeline', 'Follow-ups'],
  },
] as const;

const leftAgents = agents.slice(0, 4);
const rightAgents = agents.slice(4);

const AUTO_PLAY_INTERVAL = 3000;

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  exiting: boolean;
}

export default function Experience2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const msgIdRef = useRef(0);
  const replyIndexRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
    replyIndexRef.current = 0;
  }, [activeIndex]);

  const activeAgent = agents[activeIndex];


  const trimMessages = (msgs: ChatMessage[]): ChatMessage[] => {
    if (msgs.length > 3) {
      const oldest = msgs[0];
      setTimeout(() => {
        setMessages((curr) => curr.filter((m) => m.id !== oldest.id));
      }, 300);
      return msgs.map((m, i) => (i === 0 ? { ...m, exiting: true } : m));
    }
    return msgs;
  };

  const sendAiReply = () => {
    const replies = activeAgent.replies;
    const replyText = replies[replyIndexRef.current % replies.length];
    replyIndexRef.current += 1;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      msgIdRef.current += 1;
      const aiMsg: ChatMessage = { id: msgIdRef.current, text: replyText, sender: 'ai', exiting: false };
      setMessages((prev) => trimMessages([...prev, aiMsg]));
    }, 1000 + Math.random() * 500);
  };

  const handleSend = (text?: string) => {
    const msg = (text ?? inputValue).trim();
    if (!msg) return;

    msgIdRef.current += 1;
    const userMsg: ChatMessage = { id: msgIdRef.current, text: msg, sender: 'user', exiting: false };
    setMessages((prev) => trimMessages([...prev, userMsg]));
    setInputValue('');

    setTimeout(sendAiReply, 400);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const chatContent = (compact?: boolean) => (
    <>
      {/* Header */}
      <div className="mb-3 flex items-center gap-2.5 border-b border-[#E2E8F0] pb-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-[#1B3FFF] to-[#3B5EFF] shadow-sm">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold text-[#0a0a0a]">{activeAgent.label}</p>
          <p className="text-[9px] text-[#00C6A7] font-medium">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className={cn('mb-3 flex flex-col gap-2 overflow-hidden', compact ? 'min-h-16' : 'min-h-20')}>
        {messages.length === 0 && !isTyping && (
          <p className="text-center text-[11px] text-[#4A5568]/50 mt-3">
            Ask me anything or pick a suggestion below
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed',
              msg.exiting ? 'chat-msg-exit' : 'chat-msg-enter',
              msg.sender === 'user'
                ? 'self-end rounded-br-sm bg-[#1B3FFF] text-white'
                : 'self-start rounded-bl-sm bg-[#F7F8FC] text-[#0a0a0a] border border-[#E2E8F0]'
            )}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="chat-msg-enter self-start flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#F7F8FC] border border-[#E2E8F0] px-3 py-2">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#4A5568]/50" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#4A5568]/50" style={{ animationDelay: '0.15s' }} />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#4A5568]/50" style={{ animationDelay: '0.3s' }} />
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {activeAgent.suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSend(s)}
            className="rounded-full border border-[#1B3FFF]/15 bg-[#1B3FFF]/5 px-2.5 py-1 text-[10px] font-medium text-[#1B3FFF] transition-all hover:bg-[#1B3FFF]/10 hover:border-[#1B3FFF]/30 active:scale-95"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F7F8FC] px-3 py-2 transition-all focus-within:border-[#1B3FFF]/30 focus-within:ring-2 focus-within:ring-[#1B3FFF]/10">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-xs text-[#0a0a0a] placeholder:text-[#4A5568]/40 outline-none"
        />
        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!inputValue.trim()}
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all active:scale-90',
            inputValue.trim()
              ? 'bg-[#1B3FFF] text-white shadow-sm shadow-[#1B3FFF]/30 hover:bg-[#3B5EFF]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          <Send className="h-3 w-3" />
        </button>
      </div>
    </>
  );

  return (
    <section aria-label="AI Employees" className="w-full bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msgFadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); max-height: 60px; }
          to { opacity: 0; transform: translateY(-8px) scale(0.85); max-height: 0; }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-msg-enter { animation: msgFadeIn 0.35s ease-out both; }
        .chat-msg-exit { animation: msgFadeOut 0.3s ease-in both; }
        .typing-dot { animation: typingBounce 1.2s ease-in-out infinite; }
      `}} />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
        {/* ── Top: Heading + Description + CTAs ── */}
        <div className="mb-12 flex flex-col gap-6 text-center lg:mb-16 lg:flex-row lg:items-center lg:text-left">
          <div className="lg:flex-1">
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-6xl">
              AI employees
              <br />
              that work{' '}
              <span className="text-[#1B3FFF]">for you</span>
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

        {/* ── Bottom: Agent cards + Center logo + Chat ── */}
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

            {/* Chat box — mobile */}
            <div className="w-full max-w-sm rounded-2xl border border-[#E2E8F0] bg-white/90 p-3 shadow-xl shadow-gray-200/50 backdrop-blur-sm">
              {chatContent(true)}
            </div>

            {/* Agent buttons */}
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

            {/* Center - Logo with circles + Chat */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative flex h-72 w-72 items-center justify-center xl:h-80 xl:w-80">
                <div className="absolute inset-0 rounded-full border border-gray-200/60" />
                <div className="absolute inset-5 rounded-full border border-gray-200/80" />
                <div className="absolute inset-10 rounded-full border border-gray-300/60" />
                <div className="absolute inset-16 rounded-full border border-blue-100 bg-blue-50/30" />
                <div className="absolute inset-4 animate-[spin_25s_linear_infinite] rounded-full border-2 border-transparent border-t-[#1B3FFF] border-r-[#3B5EFF] opacity-50" />

                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-gray-200/60 ring-1 ring-gray-100 xl:h-24 xl:w-24">
                  <Logo size={48} inkColor="#0a0a0a" aria-hidden />
                </div>

                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-gray-200/60 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-gray-200/60 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg"
                >
                  <ArrowRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>

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

              {/* Chat box — desktop */}
              <div className="w-80 xl:w-[22rem] rounded-2xl border border-[#E2E8F0] bg-white/90 p-4 shadow-xl shadow-gray-200/50 backdrop-blur-sm">
                {chatContent(false)}
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
