import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brush,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Image as ImageIcon,
  Layers,
  Server,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export function ImageGenerationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const useCases = useMemo(
    () => [
      { title: 'Marketing creatives', desc: 'Generate variants and pick winners via A/B testing.' },
      { title: 'Product shots', desc: 'Consistent backgrounds and lighting at scale.' },
      { title: 'Game assets', desc: 'Textures, sprites, and concept art pipelines.' },
      { title: 'E-commerce', desc: 'Catalog enrichment and personalized visuals.' },
      { title: 'Video keyframes', desc: 'Storyboard and keyframe generation for editors.' },
      { title: 'Style transfer', desc: 'Brand-safe presets and LoRA adapters.' },
      { title: 'Inpainting', desc: 'Fix details with masks and control nets.' },
      { title: 'Upscaling', desc: 'Sharper outputs with SR models.' },
      { title: 'Batch generation', desc: 'Queue massive runs with retries and checkpoints.' },
      { title: 'Moderation', desc: 'Filter unsafe prompts and outputs.' },
    ],
    []
  );

  const stacks = useMemo(
    () => [
      { name: 'Stable Diffusion XL', tag: 'general' },
      { name: 'Flux', tag: 'quality' },
      { name: 'ComfyUI', tag: 'pipelines' },
      { name: 'ControlNet', tag: 'control' },
      { name: 'LoRA', tag: 'customize' },
      { name: 'IP-Adapter', tag: 'reference' },
      { name: 'Real-ESRGAN', tag: 'upscale' },
      { name: 'Segment Anything', tag: 'masking' },
      { name: 'CLIP', tag: 'ranking' },
      { name: 'Safety models', tag: 'policy' },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'How do I keep style consistent?',
        a: 'Use fixed seeds, shared negative prompts, and LoRA/embeddings. Lock versions of weights and preprocessing.',
      },
      {
        q: 'How do I control cost for batch runs?',
        a: 'Bound concurrency, checkpoint batches, and scale down automatically when queues drain.',
      },
      {
        q: 'Do you support ComfyUI workflows?',
        a: 'Yes. Package the graph as an artifact, then run workers that execute the pipeline deterministically.',
      },
      {
        q: 'How do I handle safety and moderation?',
        a: 'Run prompt filters + output classifiers, log decisions, and enforce per-tenant policies.',
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
                    <ImageIcon size={14} className="text-[color:var(--accent)]" />
                    Image Generation
                  </div>
                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    High-performance
                    <br />
                    <span className="text-[color:var(--accent)]">generation</span>
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
                    Build brand-safe image pipelines with batching, caching, and autoscaling—then ship to production.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Deploy pipeline
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      Browse presets
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
                        <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">PIPELINE PREVIEW</div>
                        <div className="mt-2 text-lg font-bold">Queue → render → post</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          Run consistent generation with masks, adapters, and upscalers.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                        <Sparkles size={14} className="text-[color:var(--accent)]" />
                        fast
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { t: 'Preset', d: 'style + LoRA', I: Brush },
                          { t: 'Control', d: 'masks + hints', I: Layers },
                          { t: 'Render', d: 'batched GPU', I: Zap },
                          { t: 'Deliver', d: 'store + CDN', I: Server },
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
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[{ t: 'P95', I: Clock }, { t: 'Autoscale', I: Server }, { t: 'Batch', I: Layers }].map((x) => (
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">USE CASES</div>
                <h2 className="mt-2 text-3xl font-bold">10+ production workflows</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <ImageIcon size={16} className="text-[color:var(--accent)]" />
                templates
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((x) => (
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

        {/* 3. Stack */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">STACK</div>
                <h2 className="mt-2 text-3xl font-bold">Composable pipelines</h2>
                <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                  Mix and match models and post-processing while keeping outputs deterministic.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'Use presets to lock brand style and quality.',
                    'Batch requests to maximize throughput.',
                    'Cache repeated prompts and reference images.',
                    'Post-process with upscalers and safety filters.',
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">COMPATIBLE</div>
                <div className="mt-2 text-xl font-bold">Popular building blocks</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stacks.map((x) => (
                    <div
                      key={x.name}
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold">{x.name}</div>
                        <div className="text-xs font-semibold text-[color:var(--text-secondary)] rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1">
                          {x.tag}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Performance */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">PERFORMANCE</div>
              <h2 className="mt-2 text-3xl font-bold">Keep throughput high</h2>
              <p className="mt-3 text-[color:var(--text-secondary)]">Batching, caching, and autoscaling for predictable cost.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: 'Batching', d: 'Group prompts to keep GPUs utilized.', I: Layers },
                { t: 'Caching', d: 'Reuse hot inputs and artifacts.', I: Server },
                { t: 'Autoscale', d: 'Scale up on queue time, down to zero when idle.', I: Zap },
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

        {/* 5. Delivery */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">DELIVERY</div>
                <div className="mt-2 text-xl font-bold">Serve or batch—same code</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Expose endpoints for interactive generation.',
                    'Queue batch requests for large campaigns.',
                    'Write outputs to object storage + CDN.',
                    'Attach metadata for search and analytics.',
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SAFETY</div>
                <div className="mt-2 text-xl font-bold">Policy and moderation</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Prompt filtering', I: Layers },
                    { t: 'Output classifiers', I: Sparkles },
                    { t: 'Tenant isolation', I: Server },
                    { t: 'Audit logs', I: Clock },
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
                <ImageIcon size={14} className="text-[color:var(--accent)]" />
                Ready to ship
              </div>
              <div className="mt-4 text-2xl font-bold">Build your generation stack</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">Start from presets, then customize for your brand.</div>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Deploy now
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  Contact us
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
