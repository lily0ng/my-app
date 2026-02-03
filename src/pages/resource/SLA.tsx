import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  HelpCircle,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

type VersionKey = 'pdf' | 'docx';

export function SlaPage() {
  const [version, setVersion] = useState<VersionKey>('pdf');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pdfUrl = useMemo(
    () => new URL('../../assets/File/1CNG_Cloud Services Agreement.pdf', import.meta.url).toString(),
    []
  );

  const docxUrl = useMemo(
    () => new URL('../../assets/File/1CNG_Cloud Services Agreement.docx', import.meta.url).toString(),
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'What does this SLA cover?',
        a: 'This agreement outlines service availability targets, support expectations, and how service credits may be calculated when applicable.',
      },
      {
        q: 'Which version should I use (PDF vs DOCX)?',
        a: 'Use the PDF for the canonical version and sharing. Use the DOCX if you need redlines or internal review workflows.',
      },
      {
        q: 'How do I request changes or addenda?',
        a: 'Contact sales and we can walk through requirements (security, procurement, billing) and determine what changes are possible.',
      },
      {
        q: 'Who can I contact for legal or procurement questions?',
        a: 'Use the Contact Sales flow and include “SLA / Agreement” in your message so it routes to the right team.',
      },
    ],
    []
  );

  const qna = useMemo(
    () => [
      {
        q: 'Do you support private networking?',
        a: 'Yes. We can support private connectivity patterns depending on your environment and compliance requirements.',
      },
      {
        q: 'Can we align on incident communications?',
        a: 'We can define escalation paths, response times, and points of contact as part of your engagement.',
      },
      {
        q: 'Do you offer an enterprise support plan?',
        a: 'Yes—enterprise support options can include priority response, architectural reviews, and SLAs depending on plan.',
      },
    ],
    []
  );

  const versionTabs: Array<{ k: VersionKey; t: string; d: string }> = useMemo(
    () => [
      { k: 'pdf', t: 'PDF', d: 'Preview + download' },
      { k: 'docx', t: 'DOCX', d: 'Download for redlines' },
    ],
    []
  );

  const heroAside = (
    <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
          <Shield size={22} className="text-[color:var(--accent)]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[color:var(--text-secondary)]">Agreement</div>
          <div className="mt-1 text-lg font-bold">Cloud Services SLA</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {versionTabs.map((x) => (
          <button
            key={x.k}
            type="button"
            onClick={() => setVersion(x.k)}
            className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
              version === x.k
                ? 'border-[rgba(var(--accent-rgb),0.55)] bg-[rgba(var(--accent-rgb),0.14)]'
                : 'border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-tertiary)]'
            }`}
          >
            <div className="text-sm font-bold">{x.t}</div>
            <div className="mt-1 text-xs text-[color:var(--text-secondary)]">{x.d}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3">
        <a
          href={pdfUrl}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
          download
        >
          Download PDF
          <Download size={16} />
        </a>
        <a
          href={docxUrl}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
          download
        >
          Download DOCX
          <Download size={16} />
        </a>
      </div>

      <div className="mt-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4">
        <div className="flex items-start gap-3">
          <CheckCircle size={18} className="text-[color:var(--accent)] mt-0.5" />
          <div>
            <div className="text-sm font-semibold">Need changes?</div>
            <div className="mt-1 text-xs text-[color:var(--text-secondary)]">
              We can help map requirements to the right support + reliability plan.
            </div>
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)]"
            >
              Contact sales
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ResourceLayout
      kicker="SLA"
      title="Cloud Services Agreement"
      subtitle="Preview the agreement, download the PDF/DOCX versions, and get answers to common SLA questions."
      icon={FileText}
      primaryCta={{ label: 'Contact Sales', to: '/contact' }}
      secondaryCta={{ label: 'Back to Resources', to: '/resources' }}
      aside={heroAside}
      asideClassName="w-full max-w-md"
    >
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-6"
      >
        <motion.div variants={sectionReveal} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[color:var(--border-color)] p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
                <FileText size={20} className="text-[color:var(--accent)]" />
              </div>
              <div>
                <div className="text-sm font-semibold">File preview</div>
                <div className="mt-1 text-xs text-[color:var(--text-secondary)]">Switch between PDF and DOCX</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {versionTabs.map((x) => (
                <button
                  key={x.k}
                  type="button"
                  onClick={() => setVersion(x.k)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    version === x.k
                      ? 'border-[rgba(var(--accent-rgb),0.55)] bg-[rgba(var(--accent-rgb),0.14)] text-[color:var(--text-primary)]'
                      : 'border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-tertiary)]'
                  }`}
                >
                  {x.t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {version === 'pdf' ? (
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] overflow-hidden">
                <iframe
                  title="Cloud Services Agreement PDF"
                  src={pdfUrl}
                  className="h-[70vh] w-full"
                />
              </div>
            ) : (
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
                    <Download size={20} className="text-[color:var(--accent)]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">DOCX version</div>
                    <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                      DOCX preview isn’t rendered in-browser. Download the DOCX for redlines or internal review.
                    </div>
                    <a
                      href={docxUrl}
                      download
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Download DOCX
                      <Download size={16} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-6 lg:grid-cols-3">
          {[{ t: 'Availability', d: 'Understand uptime commitments and how they’re measured.' }, { t: 'Support', d: 'Know escalation paths, response windows, and communication expectations.' }, { t: 'Credits', d: 'Review the process for service credits when applicable.' }].map(
            (x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
              >
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">HIGHLIGHT</div>
                <div className="mt-2 text-xl font-bold">{x.t}</div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.d}</div>
              </div>
            )
          )}
        </motion.div>

        <motion.div variants={sectionReveal} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
              <HelpCircle size={22} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">FAQ</div>
              <div className="mt-1 text-2xl font-bold">Common questions</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="font-semibold">{faq.q}</div>
                    <div className="text-xs font-semibold text-[color:var(--text-secondary)]">
                      {openFaq === i ? 'Hide' : 'Show'}
                    </div>
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[color:var(--border-color)] px-5 pb-5 pt-4 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={sectionReveal} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
              <MessageCircle size={22} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">Q&A</div>
              <div className="mt-1 text-2xl font-bold">Practical guidance</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {qna.map((x) => (
              <div
                key={x.q}
                className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6"
              >
                <div className="font-bold">{x.q}</div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.a}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={sectionReveal}
          className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8"
        >
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row md:items-center">
            <div>
              <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">CONTACT SALES</div>
              <div className="mt-2 text-2xl font-bold">Need a tailored agreement?</div>
              <div className="mt-2 text-[color:var(--text-secondary)]">
                Share your requirements and we’ll help map them to the right reliability + support plan.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
              >
                Contact Sales
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
              >
                View other resources
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              'Procurement-ready downloads',
              'Fast answers on coverage',
              'Escalation paths defined',
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[color:var(--accent)]" />
                  <div className="text-[color:var(--text-secondary)]">{t}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </ResourceLayout>
  );
}
