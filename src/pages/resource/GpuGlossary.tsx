import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Timer,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

export function GpuGlossaryPage() {
  const [openMyth, setOpenMyth] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  const terms = useMemo(
    () => [
      {
        term: 'VRAM',
        meaning: 'GPU memory used for weights, activations, and KV cache.',
        whyItMatters: 'If you run out, you page/quantize or move to larger GPUs.'
      },
      {
        term: 'Bandwidth',
        meaning: 'How fast data moves between memory and compute.',
        whyItMatters: 'Often the real limiter for throughput, especially decode.'
      },
      {
        term: 'KV Cache',
        meaning: 'Stored attention keys/values used during generation.',
        whyItMatters: 'Scales with context length and concurrency; can dominate VRAM.'
      },
      {
        term: 'Batching',
        meaning: 'Grouping requests to improve GPU utilization.',
        whyItMatters: 'Boosts throughput but can increase tail latency.'
      },
      {
        term: 'Quantization',
        meaning: 'Using lower precision formats to reduce memory and speed compute.',
        whyItMatters: 'Enables larger models or higher concurrency at lower cost.'
      },
    ],
    []
  );

  const heroAside = (
    <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.18)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
        <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.12)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">GPU × AI VISUAL</div>
            <div className="mt-2 text-lg font-bold">Inference load map</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              VRAM hosts weights + KV cache. Bandwidth feeds compute.
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
            <Cpu size={14} className="text-[color:var(--accent)]" />
            mental model
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5">
          <div className="grid grid-cols-[0.9fr_1.2fr_0.9fr] gap-3 items-center">
            <div className="space-y-2">
              {['HBM', 'HBM', 'HBM'].map((t, idx) => (
                <div
                  key={`${t}-${idx}`}
                  className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-2"
                >
                  <div className="text-[10px] font-semibold text-[color:var(--text-tertiary)]">{t}</div>
                  <div className="text-sm font-semibold">VRAM</div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.16)_0%,rgba(var(--accent-rgb),0.00)_62%)] blur-2xl" />
              <div className="relative rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold">GPU</div>
                  <div className="inline-flex items-center gap-2 text-xs rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-1 text-[color:var(--text-secondary)]">
                    <Network size={14} className="text-[color:var(--accent)]" />
                    tokens
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-6 gap-2">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.35 }}
                      animate={
                        reduceMotion
                          ? { opacity: 0.55 }
                          : { opacity: [0.35, 0.7, 0.35] }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 3.1,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: (i % 6) * 0.06,
                            }
                      }
                      className="h-5 rounded-lg border border-[color:var(--border-color)] bg-[rgba(var(--accent-rgb),0.08)]"
                    />
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[{ t: 'Compute', v: 'SMs' }, { t: 'Decode', v: 'BW' }].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2"
                    >
                      <div className="text-[10px] font-semibold text-[color:var(--text-tertiary)]">{x.t}</div>
                      <div className="text-sm font-semibold">{x.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {['KV', 'ACT', 'WTS'].map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-2"
                >
                  <div className="text-[10px] font-semibold text-[color:var(--text-tertiary)]">LOAD</div>
                  <div className="text-sm font-semibold">{t}</div>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 -translate-y-1/2">
              <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.35),transparent)]" />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[{ t: 'VRAM', i: MemoryStick }, { t: 'GB/s', i: HardDrive }, { t: 'P95', i: Timer }].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-3 text-sm"
            >
              <div className="flex items-center gap-2 font-semibold">
                <x.i size={16} className="text-[color:var(--accent)]" />
                {x.t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const myths = useMemo(
    () => [
      {
        q: '“More TFLOPS always means faster inference.”',
        a: 'For many LLM workloads, memory bandwidth and KV cache behavior matter more than peak compute.'
      },
      {
        q: '“Batching is always good.”',
        a: 'Batching improves throughput, but aggressive batching can hurt P95/P99 latency and UX.'
      },
      {
        q: '“VRAM only needs to fit weights.”',
        a: 'KV cache and overhead can exceed weights for long contexts and high concurrency.'
      },
    ],
    []
  );

  return (
    <ResourceLayout
      kicker="GPU GLOSSARY"
      title="A fast guide to GPU concepts"
      subtitle="Decode memory, bandwidth, and architecture terms so you can make confident decisions about cost, latency, and throughput."
      icon={BookOpen}
      primaryCta={{ label: 'Explore Glossary', to: '/resources/gpu-glossary' }}
      secondaryCta={{ label: 'Open Advisor', to: '/resources/llm-engine-advisor' }}
      aside={heroAside}
      asideClassName="w-full max-w-xl"
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">QUICK START</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">The 3 numbers to check first</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
            For LLM inference, capacity and bandwidth usually beat peak TFLOPs.
          </p>

          <div className="mt-7 relative">
            <div className="hidden md:block pointer-events-none absolute left-8 right-8 top-[38px]">
              <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.35),transparent)]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { k: 'Capacity', v: 'VRAM', icon: MemoryStick },
                { k: 'Bandwidth', v: 'GB/s', icon: HardDrive },
                { k: 'Latency', v: 'P95/P99', icon: Timer },
              ].map((x) => (
                <div
                  key={x.k}
                  className="group relative rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5 transition-colors hover:border-[rgba(var(--accent-rgb),0.55)]"
                >
                  <div className="hidden md:block pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2">
                    <div className="h-4 w-4 rounded-full border border-[rgba(var(--accent-rgb),0.55)] bg-[color:var(--bg-primary)] shadow-[0_12px_40px_rgba(var(--accent-rgb),0.18)]" />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-semibold">
                      <x.icon size={18} className="text-[color:var(--accent)]" />
                      {x.k}
                    </div>
                    <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">CHECK</div>
                  </div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{x.v}</div>

                  <div className="mt-4 h-1.5 rounded-full bg-[color:var(--bg-secondary)] overflow-hidden">
                    <div className="h-full w-2/3 bg-[linear-gradient(90deg,rgba(var(--accent-rgb),0.25),rgba(var(--accent-rgb),0.05))] group-hover:w-4/5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'If VRAM is tight',
                icon: MemoryStick,
                a: 'Quantize, shorten context, or reduce concurrency so the KV cache fits.'
              },
              {
                t: 'If throughput is low',
                icon: Zap,
                a: 'You may be bandwidth-bound—optimize kernels, batching, or move to faster memory.'
              },
              {
                t: 'If P95 spikes',
                icon: AlertTriangle,
                a: 'Dial back batching, tune scheduler limits, and stream tokens earlier.'
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5 transition-colors hover:border-[rgba(var(--accent-rgb),0.45)]"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <x.icon size={18} className="text-[color:var(--accent)]" />
                  {x.t}
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <h2 className="text-2xl font-semibold tracking-tight">GPU term sheet</h2>
          <p className="mt-2 text-[color:var(--text-secondary)]">A compact glossary with what matters and why.</p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)]">
            <div className="grid grid-cols-[0.8fr_1.2fr_1.5fr] gap-0 border-b border-[color:var(--border-color)] px-5 py-3 text-xs font-semibold text-[color:var(--text-tertiary)]">
              <div>TERM</div>
              <div>MEANING</div>
              <div>WHY IT MATTERS</div>
            </div>
            {terms.map((t) => (
              <div
                key={t.term}
                className="grid grid-cols-[0.8fr_1.2fr_1.5fr] gap-0 px-5 py-4 border-b last:border-b-0 border-[color:var(--border-color)] hover:bg-[color:var(--bg-tertiary)] transition-colors"
              >
                <div className="font-semibold">{t.term}</div>
                <div className="text-sm text-[color:var(--text-secondary)] pr-4">{t.meaning}</div>
                <div className="text-sm text-[color:var(--text-secondary)]">{t.whyItMatters}</div>
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
        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Memory hierarchy (intuition)</h2>
          <p className="mt-2 text-[color:var(--text-secondary)]">Think in layers: the closer the memory, the faster it is.</p>

          <div className="mt-6 space-y-3">
            {[
              { t: 'On-chip cache', d: 'Fastest, smallest. Helps hot paths.' },
              { t: 'VRAM', d: 'Where weights + KV cache usually live.' },
              { t: 'Host RAM', d: 'Fallback/paging if VRAM is tight (usually slower).' },
            ].map((x, idx) => (
              <div
                key={x.t}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5"
                style={{ transform: `translateX(${idx * 10}px)` }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{x.t}</div>
                  <div className="text-xs text-[color:var(--text-tertiary)]">LAYER {idx + 1}</div>
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Myths (and reality)</h2>
          <p className="mt-2 text-[color:var(--text-secondary)]">Common misconceptions that cause surprise bills and slowdowns.</p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-6 space-y-3"
          >
            {myths.map((m, i) => {
              const open = openMyth === i;
              return (
                <motion.div
                  key={m.q}
                  variants={sectionReveal}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenMyth(open ? null : i)}
                    type="button"
                  >
                    <div className="font-semibold">{m.q}</div>
                    {open ? (
                      <ChevronUp size={18} className="text-[color:var(--text-tertiary)]" />
                    ) : (
                      <ChevronDown size={18} className="text-[color:var(--text-tertiary)]" />
                    )}
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                      {m.a}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Turn terms into a decision</h2>
            <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
              If you already know your model and traffic profile, the advisor helps you pick an inference engine and deployment strategy.
            </p>
          </div>
          <Link
            to="/resources/llm-engine-advisor"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start Advisor
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>
    </ResourceLayout>
  );
}
