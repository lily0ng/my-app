import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  HardDrive,
  Layers,
  MemoryStick,
  Timer,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

export function GpuGlossaryPage() {
  const [openMyth, setOpenMyth] = useState<number | null>(0);

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
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">QUICK START</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">The 3 numbers to check first</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
            When you’re picking GPUs for LLM inference, focus on capacity, bandwidth, and latency targets.
          </p>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { k: 'Capacity', v: 'VRAM', icon: MemoryStick },
              { k: 'Bandwidth', v: 'GB/s', icon: HardDrive },
              { k: 'Latency', v: 'P95/P99', icon: Timer },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5">
                <div className="flex items-center gap-2 font-semibold">
                  <x.icon size={18} className="text-[color:var(--accent)]" />
                  {x.k}
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{x.v}</div>
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
              <div key={t.term} className="grid grid-cols-[0.8fr_1.2fr_1.5fr] gap-0 px-5 py-4 border-b last:border-b-0 border-[color:var(--border-color)]">
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
