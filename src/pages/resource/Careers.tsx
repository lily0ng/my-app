import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  Briefcase,
  ChevronRight,
  Code2,
  Cpu,
  Handshake,
  LayoutGrid,
  Layers,
  List,
  Rocket,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

type RoleTrack = 'engineering' | 'product' | 'gtm' | 'all';
type ViewMode = 'grid' | 'list';

export function CareersPage() {
  const [track, setTrack] = useState<RoleTrack>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [openRoleTitle, setOpenRoleTitle] = useState<string>('');

  const roles = useMemo(
    () =>
      [
        {
          title: 'Frontend Engineer',
          track: 'engineering',
          level: 'Senior',
          focus: 'Product surfaces + motion',
          location: 'Remote / US timezones',
          type: 'Full-time',
          highlights: ['Design systems', 'Animation + polish', 'React + TypeScript'],
          icon: Sparkles,
        },
        {
          title: 'Platform Engineer',
          track: 'engineering',
          level: 'Senior',
          focus: 'Runtime + performance',
          location: 'Remote / SF optional',
          type: 'Full-time',
          highlights: ['Latency tuning', 'GPU scheduling', 'Reliability'],
          icon: Cpu,
        },
        {
          title: 'Developer Advocate',
          track: 'gtm',
          level: 'Mid/Senior',
          focus: 'Examples + community',
          location: 'Remote',
          type: 'Full-time',
          highlights: ['Workshops', 'Docs + examples', 'Community programs'],
          icon: Handshake,
        },
        {
          title: 'Product Designer',
          track: 'product',
          level: 'Senior',
          focus: 'UX + craft',
          location: 'Remote / SF optional',
          type: 'Full-time',
          highlights: ['Visual systems', 'UX flows', 'Prototyping'],
          icon: Boxes,
        },
        {
          title: 'Docs Engineer',
          track: 'engineering',
          level: 'Mid/Senior',
          focus: 'Guides + tooling',
          location: 'Remote',
          type: 'Full-time',
          highlights: ['DX', 'Tooling', 'API docs'],
          icon: Code2,
        },
        {
          title: 'Ecosystem PM',
          track: 'product',
          level: 'Senior',
          focus: 'Partners + integrations',
          location: 'Remote',
          type: 'Full-time',
          highlights: ['Partnerships', 'Roadmaps', 'Launches'],
          icon: Layers,
        },
      ] as const,
    []
  );

  const filtered = roles.filter((r) => (track === 'all' ? true : r.track === track));

  return (
    <ResourceLayout
      kicker="CAREERS"
      title="We’re hiring across engineering"
      subtitle="Help us build a real-time platform experience that developers love — with strong product taste, infra fundamentals, and high ownership."
      icon={Briefcase}
      primaryCta={{ label: 'Contact Us', to: '/contact' }}
      secondaryCta={{ label: 'Learn About Us', to: '/resources/about' }}
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]"
      >
        <div className="flex flex-col gap-6 border-b border-[color:var(--border-color)] p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">Open roles (sample board)</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Filter by track to quickly find where you fit.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {([
                { key: 'all', label: 'All' },
                { key: 'engineering', label: 'Engineering' },
                { key: 'product', label: 'Product' },
                { key: 'gtm', label: 'GTM' },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTrack(t.key)}
                  className={
                    track === t.key
                      ? 'rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white'
                      : 'rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]'
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="ml-0 md:ml-2 flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={
                  viewMode === 'grid'
                    ? 'inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-3 py-2 text-xs font-semibold text-white'
                    : 'inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-[color:var(--text-primary)]'
                }
              >
                <LayoutGrid size={14} />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={
                  viewMode === 'list'
                    ? 'inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-3 py-2 text-xs font-semibold text-white'
                    : 'inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-[color:var(--text-primary)]'
                }
              >
                <List size={14} />
                List
              </button>
            </div>
          </div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} className="p-7">
          <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-3'}>
            {filtered.map((r) => {
              const isOpen = openRoleTitle === r.title;
              const CardIcon = r.icon;

              return (
                <motion.div
                  key={r.title}
                  variants={sectionReveal}
                  className={
                    viewMode === 'grid'
                      ? 'group rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-6 py-5 transition-colors hover:bg-[color:var(--bg-tertiary)]'
                      : 'group rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4 transition-colors hover:bg-[color:var(--bg-tertiary)]'
                  }
                >
                  <div className={viewMode === 'grid' ? 'flex items-start justify-between gap-4' : 'flex flex-col gap-4 md:flex-row md:items-start md:justify-between'}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                        <CardIcon size={18} className="text-[color:var(--accent)]" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">{r.title}</div>
                        <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{r.focus}</div>
                        <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                          {r.level} • {r.type} • {r.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-1 text-xs font-semibold">
                        {r.track}
                      </span>
                      <button
                        type="button"
                        onClick={() => setOpenRoleTitle((cur) => (cur === r.title ? '' : r.title))}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-2 text-xs font-semibold"
                      >
                        View details
                        <ChevronRight
                          size={14}
                          className={
                            isOpen
                              ? 'text-[color:var(--text-secondary)] rotate-90 transition-transform'
                              : 'text-[color:var(--text-secondary)] transition-transform'
                          }
                        />
                      </button>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-white"
                      >
                        Apply
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5">
                          <div className="text-sm font-semibold">Role details</div>
                          <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                            You’ll own a real product surface end-to-end: shipping UX, building performance intuition, and collaborating tightly across disciplines.
                          </div>

                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {r.highlights.map((h) => (
                              <div
                                key={h}
                                className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3 text-sm"
                              >
                                {h}
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white"
                            >
                              Apply now
                              <ArrowRight size={16} />
                            </Link>
                            <Link
                              to="/resources/about"
                              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-3 text-sm font-semibold"
                            >
                              Learn more
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10 grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
          <div className="text-2xl font-bold tracking-tight">What we value</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            A mosaic layout so this page doesn’t resemble the other resource layouts.
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[{
              t: 'Ownership',
              d: 'Ship end-to-end and own outcomes, not just tasks.',
              icon: Layers,
              span: 'md:col-span-2',
            },
            {
              t: 'Craft',
              d: 'Strong product taste and attention to detail.',
              icon: Sparkles,
              span: '',
            },
            {
              t: 'Performance',
              d: 'Measure and optimize latency, reliability, and cost.',
              icon: Zap,
              span: '',
            }].map((v) => (
              <div
                key={v.t}
                className={`${v.span} relative overflow-hidden rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6`}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                </div>
                <div className="relative flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <v.icon size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{v.t}</div>
                    <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{v.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]">
          <div className="border-b border-[color:var(--border-color)] p-7">
            <div className="text-2xl font-bold tracking-tight">Hiring process</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Transparent steps, optimized for signal.
            </div>
          </div>
          <div className="p-7">
            {[
              { t: 'Intro chat', d: 'Align on scope, role fit, and what you’re looking for.' },
              { t: 'Deep dive', d: 'Work through realistic problems and tradeoffs.' },
              { t: 'Team match', d: 'Meet collaborators and align on ownership.' },
              { t: 'Offer', d: 'Decide together and move quickly.' },
            ].map((s, idx) => (
              <div key={s.t} className={idx === 0 ? 'relative pl-10' : 'relative mt-4 pl-10'}>
                <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent)] text-xs font-bold text-white">
                  {idx + 1}
                </div>
                <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4">
                  <div className="font-semibold">{s.t}</div>
                  <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
          <div className="text-2xl font-bold tracking-tight">Teams you might join</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            A wide strip of tiles instead of a uniform grid of cards.
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {[
              { t: 'Platform', d: 'Core infrastructure and runtime performance.', icon: Cpu },
              { t: 'Product', d: 'Developer UX, tooling, and docs that feel effortless.', icon: Boxes },
              { t: 'Ecosystem', d: 'Integrations, partners, and community enablement.', icon: Handshake },
            ].map((x) => (
              <div
                key={x.t}
                className="relative overflow-hidden rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.12)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                </div>
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <x.icon size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="mt-4 text-lg font-bold">{x.t}</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.14)]">
                <Rocket size={22} className="text-[color:var(--accent)]" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">Not sure where to start?</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">
                  If you’re excited about the mission but unsure about the right role, reach out and we’ll help you map your strengths.
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/resources/community"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-6 py-3 text-sm font-semibold"
              >
                Meet the community
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-sm font-semibold text-[color:var(--text-secondary)]">What we optimize for</div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: 'Iteration speed', v: 'High' },
                { l: 'Quality bar', v: 'High' },
                { l: 'Reliability', v: 'High' },
                { l: 'Autonomy', v: 'High' },
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
