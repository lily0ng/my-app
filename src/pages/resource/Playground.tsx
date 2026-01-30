import { motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  Code2,
  Cpu,
  Gauge,
  MessageSquare,
  Play,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

export function PlaygroundPage() {
  return (
    <ResourceLayout
      kicker="PLAYGROUND"
      title="Explore Modal in the browser"
      subtitle="Spin up quick experiments, share links, and validate ideas before you commit to a full project structure."
      icon={Play}
      primaryCta={{ label: 'Open Playground', to: '/resources/playground' }}
      secondaryCta={{ label: 'Browse Docs', to: '/docs' }}
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">FAST FEEDBACK LOOP</div>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">Prototype, measure, share</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
            The Playground is built for iteration. Keep the surface small, learn quickly, and only promote what works.
          </p>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: 'Instant runs', desc: 'Tight loop from idea to output.', icon: Zap },
              { title: 'Shareable sessions', desc: 'Link teammates to a runnable result.', icon: MessageSquare },
              { title: 'Reusable snippets', desc: 'Turn experiments into templates.', icon: Boxes },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={sectionReveal}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <f.icon size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="font-semibold">{f.title}</div>
                </div>
                <div className="mt-3 text-sm text-[color:var(--text-secondary)]">{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">PREVIEW</div>
              <div className="mt-2 text-lg font-semibold">A runnable snippet</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
              <Terminal size={18} className="text-[color:var(--accent)]" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--border-color)]">
              <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">playground.ts</div>
              <div className="text-xs text-[color:var(--text-tertiary)]">Live preview</div>
            </div>
            <pre className="p-4 text-xs leading-relaxed text-[color:var(--text-secondary)] overflow-x-auto">
{`import modal

@modal.function(gpu="A10G")
def run(prompt: str):
    return model.generate(prompt, max_tokens=128)

print(run("Summarize the logs"))`}
            </pre>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[{ k: 'Latency', v: 'P95 < 1s', icon: Gauge }, { k: 'Throughput', v: 'High', icon: Cpu }].map((m) => (
              <div key={m.k} className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <m.icon size={16} className="text-[color:var(--accent)]" />
                  {m.k}
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{m.v}</div>
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
        className="mt-10 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
      >
        <div className="px-8 py-7 border-b border-[color:var(--border-color)]">
          <h2 className="text-2xl font-semibold tracking-tight">Popular experiments</h2>
          <p className="mt-2 text-[color:var(--text-secondary)]">A quick scan of the patterns people try first.</p>
        </div>
        <div className="marquee py-6">
          <div className="marquee__track gap-3 px-6" style={{ ['--marquee-duration' as any]: '28s' }}>
            {[
              { t: 'Streaming chat endpoint', i: Sparkles },
              { t: 'Batch summarization runner', i: Boxes },
              { t: 'GPU warm-start test', i: Cpu },
              { t: 'Prompt evaluation harness', i: Code2 },
              { t: 'Latency baseline suite', i: Gauge },
              { t: 'Token-per-second probe', i: Zap },
              { t: 'Streaming chat endpoint', i: Sparkles },
              { t: 'Batch summarization runner', i: Boxes },
              { t: 'GPU warm-start test', i: Cpu },
              { t: 'Prompt evaluation harness', i: Code2 },
              { t: 'Latency baseline suite', i: Gauge },
              { t: 'Token-per-second probe', i: Zap },
            ].map((x, idx) => (
              <div key={`${x.t}-${idx}`} className="min-w-[240px] rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <x.i size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="font-semibold">{x.t}</div>
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
        className="mt-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <h2 className="text-2xl font-semibold tracking-tight">From idea to deploy</h2>
          <p className="mt-2 text-[color:var(--text-secondary)]">A lightweight workflow that keeps risk low while you learn.</p>

          <div className="mt-7 space-y-5">
            {[
              { t: 'Prototype', d: 'Start from a minimal prompt or script.' },
              { t: 'Measure', d: 'Track latency, throughput, and output quality.' },
              { t: 'Promote', d: 'Move the best approach into a repeatable flow.' },
              { t: 'Harden', d: 'Add observability, safety checks, and runbooks.' },
            ].map((s, idx) => (
              <div key={s.t} className="relative pl-8">
                <div className="absolute left-1 top-0 bottom-0 w-px bg-[color:var(--border-color)]" />
                <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[color:var(--accent)]" />
                <div className="text-sm font-semibold">{idx + 1}. {s.t}</div>
                <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Promote only what wins</h2>
              <p className="mt-2 text-[color:var(--text-secondary)]">A quick comparison grid to keep decisions explicit.</p>
            </div>
            <Link
              to="/resources/llm-engine-advisor"
              className="text-sm font-semibold text-[color:var(--accent)] inline-flex items-center gap-2"
            >
              Use Advisor
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { k: 'Latency', v: 'P95 + tail', icon: Gauge },
              { k: 'Throughput', v: 'Tokens/sec', icon: Cpu },
              { k: 'Ops fit', v: 'Observability', icon: Boxes },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5">
                <div className="flex items-center gap-2 font-semibold">
                  <c.icon size={18} className="text-[color:var(--accent)]" />
                  {c.k}
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{c.v}</div>
                <div className="mt-4 h-2 rounded-full bg-[color:var(--bg-tertiary)] overflow-hidden">
                  <div className="h-full w-[70%] bg-[rgba(var(--accent-rgb),0.55)]" />
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
        className="mt-10 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Next: choose an inference engine</h2>
            <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
              When you’re ready to move beyond experiments, the advisor helps you pick the right engine and deployment strategy.
            </p>
          </div>
          <Link
            to="/resources/llm-engine-advisor"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Open LLM Engine Advisor
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>
    </ResourceLayout>
  );
}
