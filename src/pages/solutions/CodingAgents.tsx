import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  Cpu,
  Lock,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export function CodingAgentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const patterns = useMemo(
    () => [
      { title: 'Sandboxed evals', desc: 'Run untrusted code with strict egress + timeouts.' },
      { title: 'Tool calling', desc: 'Expose curated tools: git, tests, linters, docs search.' },
      { title: 'Secure runners', desc: 'Ephemeral workspaces per task, reproducible builds.' },
      { title: 'CI copilots', desc: 'Auto-triage failures, propose diffs, run checks.' },
      { title: 'PR reviewers', desc: 'Summarize changes, enforce style and policy.' },
      { title: 'Refactor assistants', desc: 'Large-scale edits with guardrails and snapshots.' },
      { title: 'Data agents', desc: 'Read-only SQL tools + governed writes.' },
      { title: 'Doc agents', desc: 'Index docs, answer questions, generate examples.' },
      { title: 'Reliability agents', desc: 'Observe metrics, open incidents, suggest rollbacks.' },
      { title: 'DevEx bots', desc: 'Generate scaffolds and templates across repos.' },
    ],
    []
  );

  const guardrails = useMemo(
    () => [
      { t: 'Egress controls', d: 'Block outbound traffic by default; allowlist only what you need.' },
      { t: 'Resource limits', d: 'CPU, memory, disk, and wall time bounds per run.' },
      { t: 'Filesystem isolation', d: 'Per-task workspace snapshots and clean teardown.' },
      { t: 'Secrets hygiene', d: 'Scoped secrets injection; never expose tokens to model output.' },
      { t: 'Auditability', d: 'Every tool call and diff is logged and replayable.' },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'How do I run untrusted code safely?',
        a: 'Use sandboxed containers with no network egress, read-only mounts, tight timeouts, and explicit allowlists for tools and dependencies.',
      },
      {
        q: 'How do agents avoid breaking the repo?',
        a: 'Run tests and linters after each change, gate merges behind CI, and keep diffs small and reviewable.',
      },
      {
        q: 'Can I use my existing CI pipeline?',
        a: 'Yes. Agents can trigger your existing workflows and consume results as structured signals.',
      },
      {
        q: 'How do you handle secrets?',
        a: 'Inject secrets only into the runtime, scope them to the minimal permissions, and ensure they never appear in logs or model-visible output.',
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
                    <Shield size={14} className="text-[color:var(--accent)]" />
                    Coding Agents
                  </div>
                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    Secure code
                    <br />
                    <span className="text-[color:var(--accent)]">execution</span>
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
                    Run agent tool calls, unit tests, and refactors inside isolated sandboxes with clear guardrails.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Launch sandbox
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      View blueprint
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
                        <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">SANDBOX FLOW</div>
                        <div className="mt-2 text-lg font-bold">Tooling with guardrails</div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                          Allowlist tools and enforce limits on every run.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                        <Lock size={14} className="text-[color:var(--accent)]" />
                        locked
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3">
                      {[
                        { t: 'Plan', d: 'LLM decides next step', I: Zap },
                        { t: 'Run', d: 'execute inside sandbox', I: Terminal },
                        { t: 'Verify', d: 'tests + lint + policy', I: CheckCircle },
                        { t: 'Propose', d: 'small diff for review', I: Code2 },
                      ].map((x) => (
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
                      {[{ t: 'No egress', I: Lock }, { t: 'Timeouts', I: Cpu }, { t: 'Audit', I: Shield }].map((x) => (
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

        {/* 2. Patterns */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">PATTERNS</div>
                <h2 className="mt-2 text-3xl font-bold">What teams automate</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <Shield size={16} className="text-[color:var(--accent)]" />
                10+ tasks
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {patterns.map((x) => (
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

        {/* 3. Guardrails */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">GUARDRAILS</div>
                <h2 className="mt-2 text-3xl font-bold">Policy by default</h2>
                <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                  Give agents power without giving them privilege. Make constraints explicit and observable.
                </p>

                <div className="mt-8 space-y-3">
                  {guardrails.map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3"
                    >
                      <div className="font-semibold">{x.t}</div>
                      <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">RUNTIME</div>
                <div className="mt-2 text-xl font-bold">A safe execution envelope</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Readonly mounts', I: Lock },
                    { t: 'Tmp workspace', I: Terminal },
                    { t: 'CPU + RAM caps', I: Cpu },
                    { t: 'Signed artifacts', I: CheckCircle },
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

                <div className="mt-8 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5">
                  <div className="text-sm font-semibold">Recommended default</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)]">No network egress, 2 vCPU, 4 GB RAM, 90s timeout.</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['deny egress', 'readonly', 'timeout', 'audit'].map((t) => (
                      <div
                        key={t}
                        className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text-secondary)]"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Integration */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">INTEGRATION</div>
              <h2 className="mt-2 text-3xl font-bold">Fits your SDLC</h2>
              <p className="mt-3 text-[color:var(--text-secondary)]">Connect tools and keep diffs reviewable.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: 'Repo tools', d: 'git, tests, linters, build caches', I: Code2 },
                { t: 'CI signals', d: 'trigger pipelines and parse results', I: CheckCircle },
                { t: 'Policy checks', d: 'license, secrets, dependency rules', I: Shield },
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

        {/* 5. Reliability */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">REPRODUCIBILITY</div>
                <div className="mt-2 text-xl font-bold">Every run is replayable</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Pin dependencies and runtime images.',
                    'Log inputs/outputs for each tool call.',
                    'Capture diffs and test results.',
                    'Use deterministic seeds for evals when possible.',
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">COST</div>
                <div className="mt-2 text-xl font-bold">Pay only when tools run</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Scale to zero', I: Zap },
                    { t: 'Cache builds', I: Cpu },
                    { t: 'Short-lived sandboxes', I: Terminal },
                    { t: 'Bounded retries', I: Shield },
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
                <Shield size={14} className="text-[color:var(--accent)]" />
                Secure by design
              </div>
              <div className="mt-4 text-2xl font-bold">Ship agents safely</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">Protect your codebase while speeding up delivery.</div>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Start sandbox
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  Request demo
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
