'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CalendarDays,
  ChevronRight,
  History,
  Layers3,
  LayoutDashboard,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  Workflow,
} from 'lucide-react';

import { cn } from '@/lib/utils';

type ModeKey = 'mos' | 'screem' | 'fred' | 'ontever';

type QuickAction = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type Activity = {
  icon: React.ElementType;
  title: string;
  time: string;
  status: string;
  tone: 'emerald' | 'sky' | 'amber' | 'violet';
};

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type ModuleCard = {
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
  hasAction?: boolean;
};

type ModeContent = {
  tabLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  status: string;
  statusTone: 'emerald' | 'sky' | 'amber' | 'violet';
  metrics: Metric[];
  quickActions: QuickAction[];
  recentActivity: Activity[];
  signalTitle: string;
  signalNumber: string;
  signalHeadline: string;
  signalDetail: string;
};

const statusToneClasses: Record<ModeContent['statusTone'], string> = {
  emerald: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
  sky: 'border-sky-400/20 bg-sky-400/10 text-sky-100',
  amber: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
  violet: 'border-violet-400/20 bg-violet-400/10 text-violet-100',
};

const moduleCards: ModuleCard[] = [
  {
    icon: Workflow,
    title: 'mos. Mobility Suite',
    description: 'Low-code delivery for mobile and digital platform work.',
    badge: 'Core platform',
  },
  {
    icon: Megaphone,
    title: 'screem Digital Signage',
    description: 'Keep screens, announcements, and public communication up to date.',
    badge: 'Live content',
    hasAction: true,
  },
  {
    icon: Sparkles,
    title: 'FRED White-label Apps',
    description: 'Branded city and region apps with a clear service flow.',
    badge: 'White-label',
    hasAction: true,
  },
  {
    icon: CalendarDays,
    title: 'ontever Appointment Booking',
    description: 'Online scheduling, confirmations, and follow-up handoff.',
    badge: 'Scheduling',
  },
];

const modes: Record<ModeKey, ModeContent> = {
  mos: {
    tabLabel: 'mos.',
    eyebrow: 'Low-code delivery',
    headline: 'Keep mobile and web releases moving without losing control.',
    summary:
      'This view reflects Fabrik19\'s Mobility Suite mindset: coordinate updates, keep support visible, and ship changes with care across customer projects.',
    status: 'Release ready',
    statusTone: 'emerald',
    metrics: [
      { value: '18', label: 'open fixes', detail: 'Live issues being tracked' },
      { value: '7', label: 'modules updated', detail: 'Front-end and back-end touchpoints' },
      { value: '96%', label: 'validation pass', detail: 'Checks completed before release' },
      { value: '3', label: 'client queues', detail: 'Teams waiting on deployment' },
    ],
    quickActions: [
      { icon: Wrench, title: 'Bug fix', description: 'Patch a live site or workflow' },
      { icon: Sparkles, title: 'Feature update', description: 'Ship a minor change safely' },
      { icon: Workflow, title: 'Support queue', description: 'Handle customer requests in context' },
      { icon: ShieldCheck, title: 'Release review', description: 'Validate before launch' },
    ],
    recentActivity: [
      { icon: Wrench, title: 'Maintenance patch deployed', time: '12 min ago', status: 'Fixed', tone: 'emerald' },
      { icon: ShieldCheck, title: 'Receipt flow checked', time: 'Today 09:20', status: 'Ready', tone: 'sky' },
      { icon: Workflow, title: 'Customer update approved', time: 'Yesterday', status: 'Live', tone: 'amber' },
    ],
    signalTitle: 'Maintenance lane',
    signalNumber: '24',
    signalHeadline: 'Support task moving to release',
    signalDetail:
      'Route bug fixes and minor adjustments with clear ownership, transparent handoff, and a clean finish for the customer.',
  },
  screem: {
    tabLabel: 'screem',
    eyebrow: 'Digital signage',
    headline: 'Keep public communication current across screens and locations.',
    summary:
      'A signage-first workflow makes it easy to publish content, verify rollout state, and keep every surface aligned with the latest message.',
    status: 'Screens in sync',
    statusTone: 'sky',
    metrics: [
      { value: '12', label: 'screens online', detail: 'Active display endpoints' },
      { value: '5', label: 'templates refreshed', detail: 'Brand updates ready for rollout' },
      { value: '99%', label: 'content uptime', detail: 'Screens staying current' },
      { value: '4', label: 'approved posts', detail: 'Queued for publish' },
    ],
    quickActions: [
      { icon: Megaphone, title: 'Publish update', description: 'Push new signage content' },
      { icon: LayoutDashboard, title: 'Template check', description: 'Review layout and spacing' },
      { icon: Workflow, title: 'Rollout monitor', description: 'Track device status live' },
      { icon: ShieldCheck, title: 'Fallback audit', description: 'Verify safety content is ready' },
    ],
    recentActivity: [
      { icon: Megaphone, title: 'Morning bulletin published', time: '08:05', status: 'Live', tone: 'sky' },
      { icon: LayoutDashboard, title: 'Queue screen synced', time: '37 min ago', status: 'Ready', tone: 'emerald' },
      { icon: ShieldCheck, title: 'Fallback content verified', time: 'Yesterday', status: 'Safe', tone: 'amber' },
    ],
    signalTitle: 'Content lane',
    signalNumber: '08',
    signalHeadline: 'Message ready for the next location',
    signalDetail:
      'A calm operations view for screen updates, status checks, and clean publishing across the network.',
  },
  fred: {
    tabLabel: 'FRED',
    eyebrow: 'White-label apps',
    headline: 'Deliver branded city and region apps with clear service journeys.',
    summary:
      'White-label apps work best when the content, forms, and status updates feel consistent from the first tap to the final confirmation.',
    status: 'Branding approved',
    statusTone: 'violet',
    metrics: [
      { value: '9', label: 'app sections', detail: 'Key journeys mapped' },
      { value: '6', label: 'branding touches', detail: 'Style and content aligned' },
      { value: '93%', label: 'handoff clarity', detail: 'Clear next-step visibility' },
      { value: '2', label: 'city requests', detail: 'Awaiting review' },
    ],
    quickActions: [
      { icon: Sparkles, title: 'Branding review', description: 'Check the white-label look' },
      { icon: ShieldCheck, title: 'Form QA', description: 'Validate input and confirmations' },
      { icon: Workflow, title: 'Receipt handoff', description: 'Confirm the final message flow' },
      { icon: Wrench, title: 'Support request', description: 'Handle a client change safely' },
    ],
    recentActivity: [
      { icon: Sparkles, title: 'City app layout refined', time: '14 min ago', status: 'Ready', tone: 'violet' },
      { icon: ShieldCheck, title: 'Notification delivered', time: 'Today 11:10', status: 'Live', tone: 'emerald' },
      { icon: Workflow, title: 'Launch checklist cleared', time: 'Yesterday', status: 'Approved', tone: 'sky' },
    ],
    signalTitle: 'App lane',
    signalNumber: '17',
    signalHeadline: 'The next release is ready to package',
    signalDetail:
      'A branded flow for approval, confirmation, and handoff that keeps the user and the customer team aligned.',
  },
  ontever: {
    tabLabel: 'ontever',
    eyebrow: 'Appointment booking',
    headline: 'Make scheduling, confirmations, and follow-up feel effortless.',
    summary:
      'Booking journeys work best when every step is visible, the state is clear, and the confirmation reaches the right place automatically.',
    status: 'Slots confirmed',
    statusTone: 'amber',
    metrics: [
      { value: '31', label: 'open slots', detail: 'Appointments available today' },
      { value: '14', label: 'confirmed visits', detail: 'Bookings completed smoothly' },
      { value: '97%', label: 'user clarity', detail: 'Clear next-step guidance' },
      { value: '1', label: 'pending review', detail: 'Customer follow-up waiting' },
    ],
    quickActions: [
      { icon: CalendarDays, title: 'Slot update', description: 'Adjust available booking times' },
      { icon: ShieldCheck, title: 'Booking QA', description: 'Check validation and errors' },
      { icon: Workflow, title: 'Customer follow-up', description: 'Track post-booking responses' },
      { icon: Sparkles, title: 'Confirmation flow', description: 'Refine the receipt message' },
    ],
    recentActivity: [
      { icon: CalendarDays, title: 'New slots published', time: '9 min ago', status: 'Live', tone: 'amber' },
      { icon: ShieldCheck, title: 'Email confirmation tested', time: 'Today 10:30', status: 'Ready', tone: 'emerald' },
      { icon: History, title: 'Support case closed', time: 'Yesterday', status: 'Fixed', tone: 'sky' },
    ],
    signalTitle: 'Booking lane',
    signalNumber: '11',
    signalHeadline: 'The next appointment is ready to confirm',
    signalDetail:
      'A scheduling flow that keeps booking, validation, and completion visually clear for users and teams.',
  },
};

function IconBadge({
  icon: Icon,
  className,
}: {
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white',
        className
      )}
    >
      <Icon className="size-4" />
    </div>
  );
}

export function Fabrik19OperationsDashboard() {
  const [activeMode, setActiveMode] = React.useState<ModeKey>('mos');
  const shouldReduceMotion = useReducedMotion();
  const content = modes[activeMode];

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(102,227,255,0.13),transparent_34%),radial-gradient(circle_at_15%_18%,rgba(255,173,92,0.11),transparent_22%)]" />
      <div className="relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-300/70">
              <span className="size-2 rounded-full bg-emerald-400" />
              Fabrik19 digital concept
            </div>
            <div className="max-w-4xl space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                {content.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {content.headline}
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                {content.summary}
              </p>
            </div>
          </div>

          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium',
              statusToneClasses[content.statusTone]
            )}
          >
            <ShieldCheck className="size-4" />
            {content.status}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Fabrik19 platform modes">
          {(Object.keys(modes) as ModeKey[]).map((mode) => {
            const isActive = mode === activeMode;
            return (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-pressed={isActive}
                onClick={() => setActiveMode(mode)}
                className={cn(
                  'min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06111d]',
                  isActive
                    ? 'border-white/20 bg-white/[0.12] text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)]'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                )}
              >
                {content.tabLabel === mode ? content.tabLabel : modes[mode].tabLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <label className="sr-only" htmlFor="fabrik19-search">
            Search modules or tasks
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-300/70" />
            <input
              id="fabrik19-search"
              type="text"
              placeholder="Search projects, releases, support tickets, or clients..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-16 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-sky-300/40 focus:ring-2 focus:ring-sky-300/20"
            />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300/70 sm:inline-flex">
              ⌘K
            </kbd>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: 'easeOut' }}
          >
            <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {content.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-3xl font-semibold tracking-tight text-white tabular-nums">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-100">
                        {metric.label}
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="size-5 text-slate-300" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
                      Operational focus
                    </h3>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {content.quickActions.map((action) => (
                      <button
                        key={action.title}
                        type="button"
                        className="group min-h-[92px] rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-left transition hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/30"
                      >
                        <IconBadge icon={action.icon} className="mb-3 bg-white/5 text-slate-100 transition group-hover:bg-white/10" />
                        <div className="text-sm font-medium text-white">{action.title}</div>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{action.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <History className="size-5 text-slate-300" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
                      Recent activity
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {content.recentActivity.map((item) => (
                      <li key={item.title} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                        <div className="flex items-center gap-3">
                          <IconBadge icon={item.icon} className="bg-white/5 text-slate-100" />
                          <div>
                            <p className="text-sm font-medium text-white">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.time}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            'rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap',
                            statusToneClasses[item.tone]
                          )}
                        >
                          {item.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                        Live preview
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {content.signalTitle}
                      </h3>
                    </div>
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-2xl font-semibold text-white tabular-nums">
                      {content.signalNumber}
                    </div>
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-100">
                    {content.signalHeadline}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {content.signalDetail}
                  </p>

                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
                      <span>Frontend update</span>
                      <span className="text-sky-200">Ready</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
                      <span>Backend handoff</span>
                      <span className="text-emerald-200">Synced</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
                      <span>Customer communication</span>
                      <span className="text-amber-200">Queued</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {moduleCards.map((module) => (
                <div
                  key={module.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.08]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <IconBadge icon={module.icon} className="bg-white/5 text-slate-100" />
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
                      {module.badge}
                    </span>
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-white">
                    {module.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {module.description}
                  </p>
                  {module.hasAction ? (
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-200">
                      View module
                      <ChevronRight className="size-4" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
