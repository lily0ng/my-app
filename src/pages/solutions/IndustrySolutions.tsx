import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Factory,
  HeartPulse,
  Shield,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export function IndustrySolutionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const industries = useMemo(
    () => [
      { t: 'Fintech', d: 'Fraud detection, document OCR, risk scoring.', I: BarChart },
      { t: 'Healthcare', d: 'Imaging pipelines, de-identification, clinical NLP.', I: HeartPulse },
      { t: 'Retail', d: 'Personalization, visual search, catalog enrichment.', I: ShoppingCart },
      { t: 'Manufacturing', d: 'Defect detection, forecasting, digital twins.', I: Factory },
      { t: 'SaaS', d: 'Agent workflows, analytics, LLM endpoints.', I: Briefcase },
      { t: 'Public sector', d: 'Secure processing, airgapped deployments, audits.', I: Shield },
      { t: 'Media', d: 'Transcoding, captioning, content generation.', I: Sparkles },
      { t: 'Research', d: 'Large batch compute and reproducible pipelines.', I: BarChart },
      { t: 'Security', d: 'Log analysis, detection engineering, red teaming.', I: Shield },
      { t: 'Marketing', d: 'Creative generation and campaign automation.', I: Sparkles },
    ],
    []
  );

  const valueProps = useMemo(
    () => [
      { t: 'Predictable scaling', d: 'Scale up for peaks and down to zero when idle.' },
      { t: 'Fast provisioning', d: 'Bring workloads online in minutes, not weeks.' },
      { t: 'Security posture', d: 'Encrypt, isolate, and audit with enterprise controls.' },
      { t: 'Cost controls', d: 'Per-second pricing plus guardrails and budgets.' },
      { t: 'Migration friendly', d: 'Adopt incrementally—keep existing tools and flows.' },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'Do you offer industry-specific compliance?',
        a: 'You can meet common requirements using encryption, access controls, audit logs, and private networking. For advanced needs, we can help design a compliant architecture.',
      },
      {
        q: 'Can you help with migration?',
        a: 'Yes. We provide reference architectures and hands-on guidance to move workloads from existing providers with minimal downtime.',
      },
      {
        q: 'How do teams control cost?',
        a: 'Use per-tenant quotas, scale-to-zero defaults, bounded retries, and budget alerts tied to usage.',
      },
      {
        q: 'What does enterprise support include?',
        a: 'Priority support, architectural reviews, and SLAs depending on your plan.',
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
                    <Briefcase size={14} className="text-[color:var(--accent)]" />
                    Industry Solutions
                  </div>
                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    Solutions for
                    <br />
                    <span className="text-[color:var(--accent)]">every industry</span>
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
                    Reference architectures, patterns, and templates that help teams ship faster—with less infrastructure work.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Talk to an expert
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      View case studies
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
                    <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">QUICK WINS</div>
                    <div className="mt-2 text-lg font-bold">Common outcomes</div>
                    <div className="mt-5 space-y-3">
                      {[
                        'Cut cold start and provisioning overhead.',
                        'Scale batch jobs without new infra.',
                        'Deploy secure sandboxes for agents.',
                        'Ship inference endpoints with stable P95.',
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
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Industries */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">INDUSTRIES</div>
                <h2 className="mt-2 text-3xl font-bold">10+ solution areas</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <Sparkles size={16} className="text-[color:var(--accent)]" />
                templates
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((x) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 hover:border-[rgba(var(--accent-rgb),0.45)] transition-colors"
                >
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <x.I size={18} className="text-[color:var(--accent)]" />
                    {x.t}
                  </div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Value props */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">WHY THIS WORKS</div>
                <h2 className="mt-2 text-3xl font-bold">A consistent operating model</h2>
                <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                  Reuse the same patterns for storage, compute, isolation, and scaling across industries.
                </p>

                <div className="mt-8 space-y-3">
                  {valueProps.map((x) => (
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">ENGAGEMENT</div>
                <div className="mt-2 text-xl font-bold">A simple adoption path</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Start with a single template in one team.',
                    'Add guardrails and observability.',
                    'Scale to multiple workloads and tenants.',
                    'Standardize across business units.',
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

        {/* 4. Case study grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">OUTCOMES</div>
              <h2 className="mt-2 text-3xl font-bold">What success looks like</h2>
              <p className="mt-3 text-[color:var(--text-secondary)]">Examples of measurable impact across teams.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: 'Faster cycle times', d: 'Provision on demand and remove infra bottlenecks.' },
                { t: 'Lower unit cost', d: 'Pay per second and scale to zero by default.' },
                { t: 'Higher reliability', d: 'Guardrails, retries, and observability built-in.' },
              ].map((x) => (
                <motion.div
                  key={x.t}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
                >
                  <div className="text-xl font-bold">{x.t}</div>
                  <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Trust */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SECURITY</div>
                <div className="mt-2 text-xl font-bold">Enterprise-ready</div>
                <div className="mt-6 space-y-3">
                  {[
                    'Encryption in transit and at rest.',
                    'Role-based access and audit logs.',
                    'Private networking and allowlists.',
                    'Support for regulated workloads.',
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
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">ANALYTICS</div>
                <div className="mt-2 text-xl font-bold">Visibility across workloads</div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Per-tenant metrics', I: BarChart },
                    { t: 'SLA tracking', I: CheckCircle },
                    { t: 'Cost breakdowns', I: BarChart },
                    { t: 'Incident trails', I: Shield },
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
                <Briefcase size={14} className="text-[color:var(--accent)]" />
                Next step
              </div>
              <div className="mt-4 text-2xl font-bold">Find your best path</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">We’ll map patterns to your workload and requirements.</div>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Contact sales
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                >
                  View templates
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
