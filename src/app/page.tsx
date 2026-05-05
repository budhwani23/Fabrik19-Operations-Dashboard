import * as React from 'react';

import {
  CalendarDays,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';

import { Fabrik19OperationsDashboard } from '@/components/ui/fabrik19-operations-dashboard';

const focusCards = [
  {
    icon: Wrench,
    title: 'Maintenance first',
    description:
      'Show how live websites, app screens, and booking flows can stay reliable while still evolving.',
  },
  {
    icon: Sparkles,
    title: 'Feature updates with context',
    description:
      'Minor changes should fit existing systems, not fight them. The interface keeps that visible.',
  },
  {
    icon: ShieldCheck,
    title: 'Customer-facing clarity',
    description:
      'Receipts, confirmations, and support states are easy to follow for both teams and users.',
  },
  {
    icon: Megaphone,
    title: 'Product breadth',
    description:
      'The design maps naturally to mos., screem, FRED, and ontever without feeling generic.',
  },
  {
    icon: CalendarDays,
    title: 'Booking and handoff',
    description:
      'Appointment flows stay calm, readable, and ready for real-world customer interaction.',
  },
];

function FocusCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.08]">
      <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
        <Icon className="size-4" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#06111d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(102,227,255,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(255,173,92,0.12),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(102,239,181,0.08),transparent_26%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-300/70">
              Digital. Innovativ. Fabrik19.
            </div>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              A service-focused concept for the teams building mos., screem, FRED, and ontever.
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              Built to reflect Fabrik19's focus on mobile technologies, digital platforms,
              low-code delivery, and clear customer-facing experiences across live projects.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Design intent</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Calm, structured, and easy to extend for real product work.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Scope</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Maintenance, minor features, support, signage, and booking flows.
              </p>
            </div>
          </div>
        </header>

        <Fabrik19OperationsDashboard />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {focusCards.map((card) => (
            <FocusCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
