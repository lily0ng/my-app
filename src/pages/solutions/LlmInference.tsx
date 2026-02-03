import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  Gauge,
  Layers,
  Server,
  Shield,
  Zap,
} from 'lucide-react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export function LlmInferencePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const workloads = useMemo(
    () => [
      { title: 'Chat completions', desc: 'Streaming tokens with predictable P95 latency.' },
      { title: 'RAG retrieval', desc: 'High-concurrency short prompts for search & QA.' },
      { title: 'Batch labeling', desc: 'Mass classification and extraction on backlogs.' },
      { title: 'Tool calling', desc: 'Reliable JSON outputs and structured schemas.' },
      { title: 'Long context', desc: 'Large KV cache profiles for 32k–128k.' },
      { title: 'Code generation', desc: 'High throughput decoding for IDE-like UX.' },
      { title: 'Moderation', desc: 'Fast small models for policy enforcement.' },
      { title: 'Evaluation', desc: 'Side-by-side runs with prompts and scoring.' },
      { title: 'Embeddings', desc: 'Vectorize documents with batching + caching.' },
      { title: 'Multi-tenant', desc: 'Isolate traffic and enforce quotas per customer.' },
    ],
    []
  );

  const engines = useMemo(
    () => [
      { name: 'vLLM', tag: 'PagedAttention + high throughput' },
      { name: 'TGI', tag: 'HF serving + production knobs' },
      { name: 'SGLang', tag: 'Tooling + agent workloads' },
      { name: 'TensorRT-LLM', tag: 'Max performance' },
      { name: 'llama.cpp', tag: 'Edge + CPU' },
      { name: 'Custom runtime', tag: 'Bring your own stack' },
      { name: 'Spec decoding', tag: 'Lower latency' },
      { name: 'Continuous batching', tag: 'Better utilization' },
      { name: 'Prefix caching', tag: 'Reuse context' },
      { name: 'Quantization', tag: 'Lower cost' },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'How do I size instances for KV cache?',
        a: 'Estimate KV per request from context length × layers × hidden size, then multiply by concurrency. Choose VRAM with headroom for fragmentation and weights.',
      },
      {
        q: 'How do I keep P95 stable under load?',
        a: 'Cap batch size, separate fast/slow queues, and scale replicas based on queue time (not just CPU/GPU utilization).',
      },
      {
        q: 'Do you support OpenAI-compatible APIs?',
        a: 'Yes. You can expose chat/completions endpoints with streaming and route traffic to the engine you choose.',
      },
      {
        q: 'Can I run private models?',
        a: 'Yes. Pull weights from private registries or object storage and lock down access with network policies and IAM.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] selection:bg-[color:var(--accent)] selection:text-black font-sans">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-28 -left-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                <div className="absolute -bottom-28 -right-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                    <Zap size={14} className="text-[color:var(--accent)]" />
                    LLM Inference
                  </div>
                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    Low-latency
                    <br />
                    <span className="text-[color:var(--accent)]">inference at scale</span>
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
                    Serve open-source models with streaming, autoscaling, and per-second billing—without managing GPU fleets.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Deploy endpoint
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      Benchmark guide
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
                  className="relative"
                >
                  <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6 md:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">REQUEST PATH</div>
                        <div className="mt-2 text-lg font-bold">Queue → batch → decode</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          Control P95 by shaping concurrency, batching, and KV usage.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                        <Gauge size={14} className="text-[color:var(--accent)]" />
                        P95
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { t: 'Queue', d: 'admission control', I: Layers },
                          { t: 'Batch', d: 'continuous batching', I: Cpu },
                          { t: 'Decode', d: 'tokens/sec', I: Zap },
                        ].map((x) => (
                          <div
                            key={x.t}
                            className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3"
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                              <x.I size={16} className="text-[color:var(--accent)]" />
                              {x.t}
                            </div>
                            <div className="mt-1 text-xs text-[color:var(--text-secondary)]">{x.d}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {[
                          { t: 'KV cache', d: 'context × concurrency' },
                          { t: 'Bandwidth', d: 'HBM → tokens/sec' },
                        ].map((x) => (
                          <div
                            key={x.t}
                            className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3"
                          >
                            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">{x.t}</div>
                            <div className="mt-1 text-sm font-semibold">{x.d}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[{ t: 'Autoscale', I: Server }, { t: 'Secure', I: Shield }, { t: 'Cold start', I: Clock }].map((x) => (
                        <div
                          key={x.t}
                          className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-3 text-sm"
                        >
                          <div className="flex items-center gap-2 font-semibold">
                            <x.I size={16} className="text-[color:var(--accent)]" />
                            {x.t}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Use cases */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">WORKLOADS</div>
                <h2 className="mt-2 text-3xl font-bold">Ship fast experiences</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <Zap size={16} className="text-[color:var(--accent)]" />
                10+ patterns
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workloads.map((x) => (
                <motion.div
                  key={x.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 hover:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                >
                  <div className="text-lg font-bold">{x.title}</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Engine picker */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">ENGINES</div>
                <h2 className="mt-2 text-3xl font-bold">Pick the right runtime</h2>
                <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                  Different engines win for different goals: tokens/sec, latency, tool calling, or simplicity.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'Use continuous batching to maximize utilization.',
                    'Enable prefix caching for repeated system prompts.',
                    'Quantize to fit more replicas per GPU.',
                    'Separate long-context traffic from short prompts.',
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3"
                    >
                      <CheckCircle size={18} className="text-[color:var(--accent)] mt-0.5" />
                      <div className="text-sm text-[color:var(--text-secondary)]">{t}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SUGGESTED</div>
                <div className="mt-2 text-xl font-bold">Common production stacks</div>
                <div className="mt-6 space-y-2">
                  {engines.map((r) => (
                    <div
                      key={r.name}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                    >
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs font-semibold text-[color:var(--text-secondary)] rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1">
                        {r.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Scaling guide */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SIZING</div>
              <h2 className="mt-2 text-3xl font-bold">Keep P95 predictable</h2>
              <p className="mt-3 text-[color:var(--text-secondary)]">
                Stable latency comes from controlling queue time and keeping KV on GPU.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  t: 'Admission control',
                  d: 'Reject or shed load early to protect tail latency.',
                  I: Layers,
                },
                {
                  t: 'Batching limits',
                  d: 'Cap batch size and max tokens to avoid spikes.',
                  I: Cpu,
                },
                {
                  t: 'Replica scaling',
                  d: 'Scale by queue time and saturation, not averages.',
                  I: Server,
                },
              ].map((x) => (
                <motion.div
                  key={x.t}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
                >
                  <div className="h-11 w-11 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] flex items-center justify-center">
                    <x.I size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="mt-5 text-xl font-bold">{x.t}</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Observability */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">METRICS</div>
                <div className="mt-2 text-xl font-bold">Measure what matters</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Queue time and batch formation time.',
                    'Tokens/sec and prefill vs decode split.',
                    'Cache hit rate (prefix/kv) and memory pressure.',
                    'Error budgets by endpoint and customer.',
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                    >
                      <CheckCircle size={18} className="text-[color:var(--accent)] mt-0.5" />
                      <div className="text-sm text-[color:var(--text-secondary)]">{t}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SECURITY</div>
                <div className="mt-2 text-xl font-bold">Multi-tenant by default</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Auth + rate limits', I: Shield },
                    { t: 'Private networking', I: Server },
                    { t: 'Per-tenant quotas', I: Layers },
                    { t: 'Audit trails', I: Clock },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        <x.I size={16} className="text-[color:var(--accent)]" />
                        {x.t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ + CTA */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className="border border-[color:var(--border-color)] rounded-2xl bg-[color:var(--bg-secondary)] overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    type="button"
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={20} className="text-[color:var(--accent)]" />
                    ) : (
                      <ChevronDown size={20} className="text-[color:var(--text-secondary)]" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-[color:var(--text-secondary)] leading-relaxed border-t border-[color:var(--border-color)] pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                <Zap size={14} className="text-[color:var(--accent)]" />
                Ready to deploy
              </div>
              <div className="mt-4 text-2xl font-bold">Launch your inference endpoint</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">Benchmark, tune, and scale in production.</div>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Create deployment
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  Talk to sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
