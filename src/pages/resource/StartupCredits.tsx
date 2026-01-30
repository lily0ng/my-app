import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Boxes, CalendarDays, Layers, Sparkles, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

type TierKey = 'pilot' | 'launch' | 'scale';

export function StartupCreditsPage() {
  const [tier, setTier] = useState<TierKey>('pilot');

  const tiers = useMemo(
    () =>
      ({
        pilot: {
          name: 'Pilot',
          for: 'Prove a demo + baseline unit economics',
          emphasis: 'Benchmarking + iteration speed',
          allocation: { eval: 55, finetune: 25, batch: 20 },
        },
        launch: {
          name: 'Launch',
          for: 'Ship a v1 product with real users',
          emphasis: 'Reliability + autoscaling readiness',
          allocation: { eval: 40, finetune: 25, batch: 35 },
        },
        scale: {
          name: 'Scale',
          for: 'Harden infra + expand workload coverage',
          emphasis: 'Cost/latency tuning at concurrency',
          allocation: { eval: 30, finetune: 30, batch: 40 },
        },
      }) as const,
    []
  );

  const selected = tiers[tier];

  return (
    <ResourceLayout
      kicker="STARTUP CREDITS"
      title="Get credits to start building"
      subtitle="Apply for credits to test GPU inference, training, and batch workflows while you’re proving out your product."
      icon={Layers}
      primaryCta={{ label: 'Apply for Credits', to: '/resources/startup-credits' }}
      secondaryCta={{ label: 'Contact Sales', to: '/contact' }}
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
              <BadgeCheck size={22} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">Eligibility (typical)</div>
              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">Fast, lightweight checks for builder teams.</div>
            </div>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mt-6 space-y-3">
            {[
              { t: 'You’re building an AI product', d: 'Inference or training is core to your roadmap.' },
              { t: 'Clear near-term evaluation plan', d: 'Benchmarks + success criteria are defined.' },
              { t: 'Small team, moving fast', d: 'Credits accelerate iteration and early learnings.' },
            ].map((x) => (
              <motion.div
                key={x.t}
                variants={sectionReveal}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4"
              >
                <div className="font-semibold">{x.t}</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]">
          <div className="border-b border-[color:var(--border-color)] p-7">
            <div className="text-2xl font-bold tracking-tight">Choose a credit tier</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">Pick the stage that best matches where you are today.</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {([
                { key: 'pilot', label: 'Pilot' },
                { key: 'launch', label: 'Launch' },
                { key: 'scale', label: 'Scale' },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTier(t.key)}
                  className={
                    tier === t.key
                      ? 'rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white'
                      : 'rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]'
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            {[
              { label: 'Stage', value: selected.for, icon: Sparkles },
              { label: 'Emphasis', value: selected.emphasis, icon: Zap },
              { label: 'Typical focus', value: 'Inference + iteration + measurement', icon: Boxes },
            ].map((cell, i) => (
              <div
                key={cell.label}
                className={
                  i === 0
                    ? 'border-t border-[color:var(--border-color)] p-7 md:border-t-0'
                    : 'border-t border-[color:var(--border-color)] p-7 md:border-l md:border-t-0'
                }
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                  <cell.icon size={14} className="text-[color:var(--accent)]" />
                  {cell.label}
                </div>
                <div className="mt-3 text-sm font-semibold leading-relaxed">{cell.value}</div>
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
          <div className="text-2xl font-bold tracking-tight">Suggested allocation</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            A simple way to split credits while you’re learning what matters.
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)]">
                {[{
                  label: 'Inference evaluation',
                  value: selected.allocation.eval,
                  icon: Zap,
                },
                {
                  label: 'Fine-tuning pilots',
                  value: selected.allocation.finetune,
                  icon: Layers,
                },
                {
                  label: 'Batch processing',
                  value: selected.allocation.batch,
                  icon: Boxes,
                }].map((r, idx) => (
                  <div
                    key={r.label}
                    className={idx === 0 ? 'p-5' : 'border-t border-[color:var(--border-color)] p-5'}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                          <r.icon size={18} className="text-[color:var(--accent)]" />
                        </div>
                        <div className="font-semibold">{r.label}</div>
                      </div>
                      <div className="text-sm font-semibold text-[color:var(--text-secondary)]">{r.value}%</div>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-[color:var(--bg-tertiary)]">
                      <div
                        className="h-2 rounded-full bg-[color:var(--accent)]"
                        style={{ width: `${r.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border-color)] bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.18),rgba(var(--accent-rgb),0.03))] p-6">
              <div className="text-sm font-semibold text-[color:var(--text-secondary)]">Rule of thumb</div>
              <div className="mt-3 text-lg font-bold">Measure first, optimize second.</div>
              <div className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Run an evaluation suite across GPU types and engines before investing in deep optimization.
              </div>
              <div className="mt-6">
                <Link
                  to="/resources/llm-engine-advisor"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-3 text-sm font-semibold"
                >
                  Open LLM Engine Advisor
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
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
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
                <CalendarDays size={22} className="text-[color:var(--accent)]" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">Application timeline</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">Typical end-to-end flow.</div>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {[
                { t: 'Tell us what you’re building', d: 'Workload, model, latency goals, and target users.' },
                { t: 'Align on success criteria', d: 'What “good” looks like for cost/latency/quality.' },
                { t: 'Run focused benchmarks', d: 'Measure representative prompts, not synthetic tests.' },
                { t: 'Share results + next steps', d: 'We’ll help you pick a path to production.' },
              ].map((s, idx) => (
                <div key={s.t} className="relative pl-10">
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

          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-2xl font-bold tracking-tight">FAQ</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Quick answers to common questions.
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  t: 'How long does approval take?',
                  d: 'If your plan is clear, it’s often fast — we optimize for builders moving quickly.',
                },
                {
                  t: 'Can credits be used for evaluation?',
                  d: 'Yes. We encourage benchmarking engines and GPU types with representative traffic.',
                },
                {
                  t: 'Do you require production usage?',
                  d: 'No — credits are explicitly for learning and proving out early economics.',
                },
                {
                  t: 'Can we get help with integrations?',
                  d: 'Yes. Partners can help with observability, deployment automation, and data pipelines.',
                },
              ].map((it) => (
                <details
                  key={it.t}
                  className="group rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold">
                    <div className="flex items-center justify-between gap-3">
                      <span>{it.t}</span>
                      <span className="text-[color:var(--text-secondary)] transition-transform group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">{it.d}</div>
                </details>
              ))}
            </div>
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
            <div className="text-2xl font-bold tracking-tight">Ready to apply?</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Send a short note with your workload and success criteria — we’ll take it from there.
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/resources/startup-credits"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
              >
                Apply for Credits
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/resources/partners"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-6 py-3 text-sm font-semibold"
              >
                Explore Partners
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-sm font-semibold text-[color:var(--text-secondary)]">What teams track</div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: 'Weeks to MVP', v: '2–6' },
                { l: 'Experiments', v: 'Dozens' },
                { l: 'Cost visibility', v: 'High' },
                { l: 'Iteration speed', v: 'Fast' },
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
            <div className="mt-6 text-sm text-[color:var(--text-secondary)]">
              Credits are meant to compress learning cycles — then you can optimize with confidence.
            </div>
          </div>
        </div>
      </motion.section>
    </ResourceLayout>
  );
}
