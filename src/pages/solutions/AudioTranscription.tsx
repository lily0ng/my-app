import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Headphones,
  Mic,
  Server,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export function AudioTranscriptionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const workloadCards = useMemo(
    () => [
      {
        title: 'Call center QA',
        desc: 'Transcribe and summarize conversations for compliance and coaching.',
      },
      {
        title: 'Podcast indexing',
        desc: 'Searchable transcripts + chapter markers at scale.',
      },
      {
        title: 'Meeting notes',
        desc: 'Speaker diarization and action items from long recordings.',
      },
      {
        title: 'Live captions',
        desc: 'Low-latency streaming transcription for broadcasts.',
      },
      {
        title: 'Multilingual content',
        desc: 'Auto-detect language and normalize punctuation.',
      },
      {
        title: 'Media archives',
        desc: 'Batch process large back catalogs with retries and checkpoints.',
      },
      {
        title: 'Education',
        desc: 'Accessible captions and topic extraction for lectures.',
      },
      {
        title: 'Legal discovery',
        desc: 'Fast search across hours of deposition audio.',
      },
      {
        title: 'Moderation',
        desc: 'Flag policy violations and sensitive segments automatically.',
      },
      {
        title: 'Analytics',
        desc: 'Keyword trends, sentiment, and conversion signals.',
      },
    ],
    []
  );

  const modelRows = useMemo(
    () => [
      { name: 'Whisper large-v3', tag: 'Highest accuracy' },
      { name: 'Whisper medium', tag: 'Balanced' },
      { name: 'Whisper small', tag: 'Fast + affordable' },
      { name: 'Distil-Whisper', tag: 'Compact' },
      { name: 'NVIDIA NeMo ASR', tag: 'Streaming' },
      { name: 'wav2vec2', tag: 'Classic' },
      { name: 'Conformer', tag: 'Robust' },
      { name: 'Custom CTC', tag: 'Domain vocab' },
      { name: 'Speaker diarization', tag: 'Who spoke' },
      { name: 'Punctuation restoration', tag: 'Readable' },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'Do you support streaming transcription?',
        a: 'Yes. Stream audio chunks to a long-lived worker and emit partial hypotheses with a stable API.',
      },
      {
        q: 'How do I handle retries for long files?',
        a: 'Split audio into segments, checkpoint progress, and retry only failed segments while keeping ordering.',
      },
      {
        q: 'Can I run this on CPU?',
        a: 'Yes for smaller models and offline batch jobs. GPUs are recommended for high throughput and large models.',
      },
      {
        q: 'What about security and PII?',
        a: 'Encrypt data in transit and at rest, isolate workloads, and redact sensitive spans after transcription.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] selection:bg-[color:var(--accent)] selection:text-black font-sans">
      <Nav />
      <main>
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
                    <Mic size={14} className="text-[color:var(--accent)]" />
                    Audio Transcription
                  </div>
                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    Speech-to-text
                    <br />
                    <span className="text-[color:var(--accent)]">at scale</span>
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
                    Batch thousands of hours, stream live captions, and ship clean transcripts with predictable cost and latency.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Start pipeline
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      View reference
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
                        <div className="mt-2 text-lg font-bold">Streaming + batch ready</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          Segment audio, transcribe in parallel, then merge + post-process.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                        <Headphones size={14} className="text-[color:var(--accent)]" />
                        v3
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5">
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { t: 'Upload', d: 'S3/GCS/local files' },
                          { t: 'Segment', d: 'VAD + fixed windows' },
                          { t: 'Transcribe', d: 'GPU workers' },
                          { t: 'Post-process', d: 'Diarize + punctuate' },
                        ].map((x) => (
                          <div
                            key={x.t}
                            className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="font-semibold">{x.t}</div>
                              <div className="text-xs text-[color:var(--text-tertiary)]">OK</div>
                            </div>
                            <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[{ t: 'P95', I: Clock }, { t: 'SOC 2', I: Shield }, { t: 'Auto', I: Sparkles }].map((x) => (
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

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">USE CASES</div>
                <h2 className="mt-2 text-3xl font-bold">What teams build</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <Server size={16} className="text-[color:var(--accent)]" />
                10 templates
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workloadCards.map((x) => (
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

        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">REFERENCE ARCHITECTURE</div>
                <h2 className="mt-2 text-3xl font-bold">Scale safely and predictably</h2>
                <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                  Keep latency steady by segmenting early, bounding retries, and batching at the worker.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'Segment audio by voice activity + max duration.',
                    'Use idempotent tasks and checkpoint partial progress.',
                    'Separate transcription from enrichment (diarization, punctuation).',
                    'Emit structured results (timestamps, speakers, confidence).',
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">MODELS</div>
                <div className="mt-2 text-xl font-bold">Choose accuracy vs. throughput</div>

                <div className="mt-6 space-y-2">
                  {modelRows.map((r) => (
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

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">OPERATIONS</div>
              <h2 className="mt-2 text-3xl font-bold">Built for production pipelines</h2>
              <p className="mt-3 text-[color:var(--text-secondary)]">
                Keep jobs moving with predictable concurrency, retries, and observability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  t: 'Bounded retries',
                  d: 'Retry segments, not entire files, to keep cost controlled.',
                  I: Shield,
                },
                {
                  t: 'Streaming outputs',
                  d: 'Emit partial hypotheses and stabilize before final merge.',
                  I: Server,
                },
                {
                  t: 'P95 visibility',
                  d: 'Track queue time, decode time, and post-processing separately.',
                  I: Clock,
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

        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">INTEGRATIONS</div>
                <div className="mt-2 text-xl font-bold">Fits your stack</div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    'S3 / GCS',
                    'Kafka',
                    'Snowflake',
                    'Postgres',
                    'Elasticsearch',
                    'Datadog',
                    'OpenTelemetry',
                    'LangChain',
                    'Airflow',
                    'dbt',
                  ].map((t) => (
                    <div
                      key={t}
                      className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-2 text-sm font-semibold text-[color:var(--text-secondary)]"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">FAST START</div>
                <div className="mt-2 text-xl font-bold">Your first job in minutes</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Pick a model profile (fast vs accurate).',
                    'Upload audio and run segmentation.',
                    'Scale workers to throughput targets.',
                    'Export JSON + subtitles + summaries.',
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
            </div>
          </div>
        </section>

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
                <Sparkles size={14} className="text-[color:var(--accent)]" />
                Ready to ship
              </div>
              <div className="mt-4 text-2xl font-bold">Build your transcription pipeline</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">Start small, then scale to thousands of hours.</div>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Deploy template
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  Talk to an expert
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
