import { motion } from 'framer-motion';
import { ArrowRight, Boxes, Cpu, Gauge, Layers, Rocket, Sparkles, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

type EngineKey = 'vllm' | 'tgi' | 'trtllm' | 'custom';

export function LlmEngineAdvisorPage() {
  const [engine, setEngine] = useState<EngineKey>('vllm');

  const engineRows = useMemo(
    () =>
      ({
        vllm: {
          name: 'vLLM',
          bestFor: 'High-throughput + fast iteration',
          tradeoff: 'Operational tuning (batching, cache)',
          notes: 'Great default for many serving workloads',
        },
        tgi: {
          name: 'TGI',
          bestFor: 'Fast time-to-serve with opinionated defaults',
          tradeoff: 'Less flexibility for bespoke routing',
          notes: 'Excellent for stable, repeated deployments',
        },
        trtllm: {
          name: 'TensorRT-LLM',
          bestFor: 'Tight latency targets + GPU-specific tuning',
          tradeoff: 'Build complexity and engine compilation',
          notes: 'Best when you can invest in optimization',
        },
        custom: {
          name: 'Custom runtime',
          bestFor: 'Special constraints (custom kernels, routing)',
          tradeoff: 'You own reliability + upgrades',
          notes: 'Worth it only when the constraints demand it',
        },
      }) as const,
    []
  );

  const row = engineRows[engine];

  return (
    <ResourceLayout
      kicker="LLM ENGINE ADVISOR"
      title="Pick the right inference engine"
      subtitle="Use a clear set of tradeoffs to choose between vLLM, TGI, TensorRT‑LLM, and custom stacks — without guesswork."
      icon={Zap}
      primaryCta={{ label: 'Try the Playground', to: '/resources/playground' }}
      secondaryCta={{ label: 'Review GPU Glossary', to: '/resources/gpu-glossary' }}
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {[{
          title: 'Latency targets',
          desc: 'Streaming UX, tail latency, and warmup time.',
          icon: Gauge,
        },
        {
          title: 'Throughput scaling',
          desc: 'Batching, scheduling, and concurrency behavior.',
          icon: Boxes,
        },
        {
          title: 'Ops + upgrades',
          desc: 'Observability, rollbacks, and safe migrations.',
          icon: Layers,
        }].map((c) => (
          <motion.div
            key={c.title}
            variants={sectionReveal}
            className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_60%)]" />
            </div>
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
                <c.icon size={22} className="text-[color:var(--accent)]" />
              </div>
              <div>
                <div className="text-lg font-bold">{c.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">{c.desc}</div>
              </div>
            </div>
          </motion.div>
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
            <div className="text-2xl font-bold tracking-tight">Comparison snapshot</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Click an engine to see a compact tradeoff summary.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {([
              { key: 'vllm', label: 'vLLM' },
              { key: 'tgi', label: 'TGI' },
              { key: 'trtllm', label: 'TensorRT‑LLM' },
              { key: 'custom', label: 'Custom' },
            ] as const).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setEngine(t.key)}
                className={
                  engine === t.key
                    ? 'rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white'
                    : 'rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]'
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-4">
          {[{
            label: 'Best for',
            value: row.bestFor,
            icon: Sparkles,
          },
          {
            label: 'Main tradeoff',
            value: row.tradeoff,
            icon: Cpu,
          },
          {
            label: 'Ops notes',
            value: row.notes,
            icon: Layers,
          },
          {
            label: 'Next step',
            value: 'Benchmark on representative prompts',
            icon: Rocket,
          }].map((cell) => (
            <div
              key={cell.label}
              className="border-t border-[color:var(--border-color)] p-7 md:border-t-0 md:border-l"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                <cell.icon size={14} className="text-[color:var(--accent)]" />
                {cell.label}
              </div>
              <div className="mt-3 text-base font-semibold leading-snug">{cell.value}</div>
            </div>
          ))}
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
            <div className="text-2xl font-bold tracking-tight">Decision flow</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              A fast way to narrow your choices.
            </div>

            <div className="mt-7 space-y-4">
              {[{
                q: 'Need the lowest possible latency?',
                a: 'Start with TensorRT‑LLM. Measure build + ops complexity early.',
              },
              {
                q: 'Optimizing throughput per GPU?',
                a: 'vLLM is a strong default. Tune batching + KV cache behavior.',
              },
              {
                q: 'Want opinionated defaults and quick rollout?',
                a: 'TGI can be great for stable deployments and iteration speed.',
              }].map((n, idx) => (
                <div
                  key={n.q}
                  className="relative rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                    Step {idx + 1}
                  </div>
                  <div className="mt-2 text-base font-bold">{n.q}</div>
                  <div className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">{n.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-2xl font-bold tracking-tight">Production checklist</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Expand the items you’ll want to validate before shipping.
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  t: 'Representative prompts',
                  d: 'Replay real traffic and measure end‑to‑end (not just tokens/sec).',
                },
                {
                  t: 'Warmup + autoscaling',
                  d: 'Know your cold‑start and scale‑out behavior for tail latency.',
                },
                {
                  t: 'Failure testing',
                  d: 'Kill a worker, drop a node, and confirm graceful degradation.',
                },
                {
                  t: 'Observability',
                  d: 'Trace prompts through the stack and watch GPU utilization.',
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
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.16),rgba(var(--accent-rgb),0.02))] p-7">
            <div className="text-2xl font-bold tracking-tight">Need runway to benchmark?</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Startup credits can cover meaningful evaluation runs while you settle on an architecture.
            </div>
            <div className="mt-6">
              <Link
                to="/resources/startup-credits"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
              >
                See Startup Credits
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
          >
            <div className="text-2xl font-bold tracking-tight">Suggested next actions</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Fast paths depending on where you are in the lifecycle.
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  t: 'Prototype',
                  d: 'Try streaming prompts in the Playground and capture p95/p99.',
                  to: '/resources/playground',
                },
                {
                  t: 'Benchmark',
                  d: 'Run a fixed prompt suite across engines and log results.',
                  to: '/resources/gpu-glossary',
                },
                {
                  t: 'Productionize',
                  d: 'Add tracing, load tests, and rollback strategy before launch.',
                  to: '/resources/partners',
                },
              ].map((x) => (
                <motion.div
                  key={x.t}
                  variants={sectionReveal}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4"
                >
                  <div>
                    <div className="font-semibold">{x.t}</div>
                    <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                  </div>
                  <Link
                    to={x.to}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-2 text-sm font-semibold"
                  >
                    Open
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </ResourceLayout>
  );
}
