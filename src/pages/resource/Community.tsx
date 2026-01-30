import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  CalendarDays,
  Code2,
  Handshake,
  MessageSquare,
  Play,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

type ChannelKey = 'help' | 'showcase' | 'performance' | 'releases';

export function CommunityPage() {
  const [channel, setChannel] = useState<ChannelKey>('help');

  const channels = useMemo(
    () =>
      ({
        help: {
          name: '#help',
          desc: 'Questions, edge cases, and debugging workflows.',
          starter: 'Post a minimal repro and include what you tried.',
        },
        showcase: {
          name: '#showcase',
          desc: 'Demos, templates, and things you shipped.',
          starter: 'Share a screenshot + a short writeup of learnings.',
        },
        performance: {
          name: '#performance',
          desc: 'Latency, throughput, autoscaling, and GPU tuning.',
          starter: 'Include p95/p99 and your GPU type when asking.',
        },
        releases: {
          name: '#releases',
          desc: 'Changelog, upcoming features, and launch notes.',
          starter: 'Follow for updates and early-access announcements.',
        },
      }) as const,
    []
  );

  const active = channels[channel];

  return (
    <ResourceLayout
      kicker="COMMUNITY"
      title="Join the developer community"
      subtitle="Connect with builders, share patterns, and learn from real workloads. Find events, examples, and places to ask questions."
      icon={MessageSquare}
      primaryCta={{ label: 'Browse Events', to: '/resources/events' }}
      secondaryCta={{ label: 'Open Playground', to: '/resources/playground' }}
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {[
          {
            title: 'Ask questions',
            desc: 'Get help with real workflows and edge cases.',
            icon: MessageSquare,
            to: '/resources/community',
            cta: 'Join',
          },
          {
            title: 'Share examples',
            desc: 'Post snippets and learn from others’ deployments.',
            icon: Boxes,
            to: '/docs/examples/',
            cta: 'Examples',
          },
          {
            title: 'Stay current',
            desc: 'Follow launches, changelogs, and technical talks.',
            icon: Sparkles,
            to: '/resources/events',
            cta: 'Events',
          },
        ].map((c) => (
          <div
            key={c.title}
            className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
            </div>
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
                <c.icon size={22} className="text-[color:var(--accent)]" />
              </div>
              <div className="mt-5 text-xl font-bold">{c.title}</div>
              <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{c.desc}</div>
              <div className="mt-6">
                <Link
                  to={c.to}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-3 text-sm font-semibold"
                >
                  {c.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10 overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]"
      >
        <div className="flex flex-col gap-6 border-b border-[color:var(--border-color)] p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">Weekly rhythm</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              A schedule strip so the page doesn’t feel like a “cards grid”.
            </div>
          </div>
          <Link
            to="/resources/events"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Browse events
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-0 md:grid-cols-4">
          {[
            { day: 'Tue', title: 'Office hours', icon: CalendarDays, note: 'Bring a repro + metrics' },
            { day: 'Wed', title: 'Performance clinic', icon: Zap, note: 'Latency + throughput tuning' },
            { day: 'Thu', title: 'Show & tell', icon: Play, note: 'Demos + shipping stories' },
            { day: 'Fri', title: 'Docs jam', icon: BookOpen, note: 'Improve guides together' },
          ].map((s, idx) => (
            <div
              key={s.day}
              className={
                idx === 0
                  ? 'border-t border-[color:var(--border-color)] p-7 md:border-t-0'
                  : 'border-t border-[color:var(--border-color)] p-7 md:border-l md:border-t-0'
              }
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">{s.day}</div>
                <s.icon size={18} className="text-[color:var(--accent)]" />
              </div>
              <div className="mt-3 text-lg font-bold">{s.title}</div>
              <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{s.note}</div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10 grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
          <div className="text-2xl font-bold tracking-tight">Channels</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Pick a channel to see guidance and starter prompts.
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {([
              { key: 'help', label: '#help' },
              { key: 'showcase', label: '#showcase' },
              { key: 'performance', label: '#performance' },
              { key: 'releases', label: '#releases' },
            ] as const).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setChannel(t.key)}
                className={
                  channel === t.key
                    ? 'rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white'
                    : 'rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]'
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">Selected</div>
            <div className="mt-2 text-xl font-bold">{active.name}</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{active.desc}</div>
            <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3 text-sm">
              <span className="font-semibold">Starter:</span> {active.starter}
            </div>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
        >
          <div className="text-2xl font-bold tracking-tight">Community resources</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">Fast links you’ll use a lot.</div>

          <div className="mt-6 space-y-3">
            {[
              { t: 'Playground links', d: 'Share a runnable version of what you’re testing.', icon: Play, to: '/resources/playground' },
              { t: 'Partner templates', d: 'Explore integrations people actually use.', icon: Handshake, to: '/resources/partners' },
              { t: 'Engine advisor', d: 'Pick a runtime based on your latency/throughput goals.', icon: Zap, to: '/resources/llm-engine-advisor' },
              { t: 'Docs examples', d: 'Copy-pasteable snippets for common workflows.', icon: Code2, to: '/docs/examples/' },
            ].map((x) => (
              <motion.div key={x.t} variants={sectionReveal}>
                <Link
                  to={x.to}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4 transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(var(--accent-rgb),0.10)]">
                      <x.icon size={18} className="text-[color:var(--accent)]" />
                    </div>
                    <div>
                      <div className="font-semibold">{x.t}</div>
                      <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[color:var(--text-secondary)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-[color:var(--border-color)] bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.18),rgba(var(--accent-rgb),0.03))] p-7">
            <div className="text-2xl font-bold tracking-tight">Want to help build with us?</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              We’re building with the community. If you want to help, check out open roles and how we hire.
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/resources/careers"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
              >
                See Careers
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/resources/about"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-6 py-3 text-sm font-semibold"
              >
                Learn About Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-sm font-semibold text-[color:var(--text-secondary)]">What you’ll get</div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: 'Response time', v: 'Fast' },
                { l: 'Examples', v: 'Plenty' },
                { l: 'Connections', v: 'Real' },
                { l: 'Momentum', v: 'High' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">{s.l}</div>
                  <div className="mt-2 text-lg font-bold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </ResourceLayout>
  );
}
