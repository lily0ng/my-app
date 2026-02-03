import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Dna,
  FlaskConical,
  Microscope,
  Server,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export function ComputationalBioPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const useCases = useMemo(
    () => [
      { title: 'Protein folding', desc: 'Run structure prediction at scale with GPU scheduling.' },
      { title: 'Docking screens', desc: 'Parallelize large compound libraries across workers.' },
      { title: 'Genomics pipelines', desc: 'Alignment, variant calling, and QC in batches.' },
      { title: 'Single-cell analysis', desc: 'Process sparse matrices, embeddings, and clustering.' },
      { title: 'Molecular dynamics', desc: 'Long simulations with checkpointing and restarts.' },
      { title: 'Cryo-EM', desc: 'Acceleration for reconstruction and denoising workloads.' },
      { title: 'Lab automation', desc: 'Ingest instrument outputs and trigger downstream compute.' },
      { title: 'Bio foundation models', desc: 'Embed sequences and predict properties.' },
      { title: 'Clinical ETL', desc: 'De-identify and transform datasets securely.' },
      { title: 'Reproducible science', desc: 'Pin environments and rerun experiments reliably.' },
    ],
    []
  );

  const workflow = useMemo(
    () => [
      { t: 'Ingest', d: 'Object storage + metadata', I: Server },
      { t: 'Transform', d: 'CPU-heavy preprocessing', I: Cpu },
      { t: 'Accelerate', d: 'GPU kernels and models', I: Sparkles },
      { t: 'Validate', d: 'QC checks + reports', I: Shield },
    ],
    []
  );

  const stacks = useMemo(
    () => [
      { name: 'AlphaFold / OpenFold', tag: 'structure' },
      { name: 'GROMACS', tag: 'dynamics' },
      { name: 'Rosetta', tag: 'design' },
      { name: 'BLAST / MMseqs2', tag: 'search' },
      { name: 'BWA / minimap2', tag: 'alignment' },
      { name: 'GATK', tag: 'variants' },
      { name: 'Scanpy', tag: 'single-cell' },
      { name: 'PyTorch', tag: 'models' },
      { name: 'JAX', tag: 'accelerate' },
      { name: 'Snakemake / Nextflow', tag: 'orchestration' },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'How do you keep workflows reproducible?',
        a: 'Pin container images, lock dependencies, capture input manifests, and store artifacts with deterministic metadata.',
      },
      {
        q: 'Can I run HPC-style jobs?',
        a: 'Yes. You can run long jobs with checkpointing and resume, and scale out embarrassingly-parallel workloads easily.',
      },
      {
        q: 'Do you support regulated workloads?',
        a: 'Use encryption, strict access controls, private networking, and audit logs to meet compliance requirements.',
      },
      {
        q: 'How do I handle large datasets?',
        a: 'Stream data from object storage, use caching for hot shards, and store intermediate artifacts in durable volumes.',
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
                    <Microscope size={14} className="text-[color:var(--accent)]" />
                    Computational Bio
                  </div>
                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    Accelerate
                    <br />
                    <span className="text-[color:var(--accent)]">scientific workloads</span>
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
                    Run reproducible pipelines across CPUs and GPUs for drug discovery, genomics, and foundation models.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Run workflow
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      View templates
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
                        <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">PIPELINE MAP</div>
                        <div className="mt-2 text-lg font-bold">Ingest → compute → validate</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          A common shape for bio pipelines across modalities.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                        <Dna size={14} className="text-[color:var(--accent)]" />
                        v1
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3">
                      {workflow.map((x) => (
                        <div
                          key={x.t}
                          className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                        >
                          <div className="flex items-center gap-2 font-semibold">
                            <x.I size={16} className="text-[color:var(--accent)]" />
                            {x.t}
                          </div>
                          <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[{ t: 'CPU', I: Cpu }, { t: 'GPU', I: Sparkles }, { t: 'Secure', I: Shield }].map((x) => (
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
                <h2 className="mt-2 text-3xl font-bold">10+ common pipelines</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <FlaskConical size={16} className="text-[color:var(--accent)]" />
                production-ready
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
                <h2 className="mt-2 text-3xl font-bold">Bring your tools</h2>
                <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                  Keep your preferred frameworks while simplifying orchestration and scaling.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'Containerize once, run everywhere.',
                    'Use caching for reference genomes and model weights.',
                    'Separate CPU preprocessing from GPU acceleration.',
                    'Export artifacts with provenance metadata.',
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">COMMON</div>
                <div className="mt-2 text-xl font-bold">Popular toolchains</div>
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

        {/* 4. Reliability */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">RELIABILITY</div>
              <h2 className="mt-2 text-3xl font-bold">Reproducible, restartable runs</h2>
              <p className="mt-3 text-[color:var(--text-secondary)]">Checkpoint long jobs and keep audits for every artifact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: 'Checkpointing', d: 'Resume expensive jobs without starting over.', I: Server },
                { t: 'Provenance', d: 'Track inputs, configs, and outputs automatically.', I: Shield },
                { t: 'Parallelism', d: 'Scale out across samples, shards, or compounds.', I: Cpu },
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

        {/* 5. Compliance */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">DATA</div>
                <div className="mt-2 text-xl font-bold">Large datasets, simple access</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Stream from object storage; cache hot references.',
                    'Use durable volumes for intermediate artifacts.',
                    'Store manifests alongside results for re-runs.',
                    'Keep per-project ACLs and audit logs.',
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
                <div className="mt-2 text-xl font-bold">Built for regulated work</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Encryption', I: Shield },
                    { t: 'Private networking', I: Server },
                    { t: 'Access controls', I: Cpu },
                    { t: 'Audit trails', I: FlaskConical },
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
                <Microscope size={14} className="text-[color:var(--accent)]" />
                Ready to run
              </div>
              <div className="mt-4 text-2xl font-bold">Scale your next experiment</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">Start from templates and keep everything reproducible.</div>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Start workflow
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  Talk to scientist
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
