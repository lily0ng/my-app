import { motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  ChevronRight,
  Cpu,
  Handshake,
  Layers,
  Lock,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResourceLayout, sectionReveal, stagger } from './ResourceLayout';

export function PartnersPage() {
  const partners = [
    { name: 'Observability', tag: 'Tracing + metrics' },
    { name: 'Data', tag: 'Storage + ETL' },
    { name: 'CI/CD', tag: 'Build + deploy' },
    { name: 'Security', tag: 'Secrets + IAM' },
    { name: 'Model Tools', tag: 'Eval + routing' },
    { name: 'MLOps', tag: 'Pipelines' },
    { name: 'Infra', tag: 'Networking' },
    { name: 'DevEx', tag: 'Tooling' },
    { name: 'Support', tag: 'Services' },
    { name: 'Storage', tag: 'Artifacts' },
    { name: 'Monitoring', tag: 'Dashboards' },
    { name: 'Identity', tag: 'Auth' },
  ];

  return (
    <ResourceLayout
      kicker="PARTNERS"
      title="Integrations and ecosystem partners"
      subtitle="Discover tools and services that plug into your workflow: observability, data, CI, and deployment automation."
      icon={Handshake}
      primaryCta={{ label: 'View Marketplace Apps', to: '/resources/marketplace-apps' }}
      secondaryCta={{ label: 'Join Community', to: '/resources/community' }}
    >
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]"
      >
        <div className="border-b border-[color:var(--border-color)] p-7">
          <div className="text-2xl font-bold tracking-tight">Partner directory (sample)</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            A themed “logo wall” that feels different from the other resource pages.
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-4"
        >
          {partners.map((p, idx) => (
            <motion.div
              key={`${p.name}-${idx}`}
              variants={sectionReveal}
              className="group border-t border-[color:var(--border-color)] p-6 md:border-l"
            >
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5 transition-colors group-hover:bg-[color:var(--bg-tertiary)]">
                <div className="text-base font-bold">{p.name}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                  {p.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10 grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
              <Sparkles size={22} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">Integration categories</div>
              <div className="mt-1 text-sm text-[color:var(--text-secondary)]">Organize tools by what they unlock.</div>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            {[
              { t: 'Observability', d: 'Trace prompts, measure p95/p99, monitor GPU utilization.', icon: Cpu },
              { t: 'Data workflows', d: 'Move datasets in/out, transform, version, and audit.', icon: Boxes },
              { t: 'Security posture', d: 'Secrets, IAM, and least-privilege patterns.', icon: Lock },
              { t: 'Automation', d: 'CI/CD, drift detection, and safe rollouts.', icon: Wrench },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <x.icon size={18} className="text-[color:var(--accent)]" />
                  </div>
                  <div>
                    <div className="font-semibold">{x.t}</div>
                    <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{x.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]">
          <div className="border-b border-[color:var(--border-color)] p-7">
            <div className="text-2xl font-bold tracking-tight">Integration path</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              A simple “rails” layout to show how teams adopt partners.
            </div>
          </div>
          <div className="grid gap-0 md:grid-cols-3">
            {[{
              title: 'Connect',
              desc: 'Wire credentials, webhooks, or SDK hooks.',
            },
            {
              title: 'Validate',
              desc: 'Run a representative workload and confirm metrics.',
            },
            {
              title: 'Operationalize',
              desc: 'Dashboards, alerts, runbooks, and rollbacks.',
            }].map((s, idx) => (
              <div
                key={s.title}
                className={
                  idx === 0
                    ? 'border-t border-[color:var(--border-color)] p-7 md:border-t-0'
                    : 'border-t border-[color:var(--border-color)] p-7 md:border-l md:border-t-0'
                }
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">Phase {idx + 1}</div>
                <div className="mt-2 text-lg font-bold">{s.title}</div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{s.desc}</div>
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
        className="mt-10"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Build with us',
              desc: 'Have an integration idea? We’ll help with patterns + launch support.',
              icon: Handshake,
              to: '/contact',
              cta: 'Contact',
            },
            {
              title: 'Ship templates',
              desc: 'Publish examples so teams can go from 0→1 quickly.',
              icon: Layers,
              to: '/resources/playground',
              cta: 'See Playground',
            },
            {
              title: 'Show outcomes',
              desc: 'Share benchmarks, runbooks, and best practices.',
              icon: Sparkles,
              to: '/resources/community',
              cta: 'Join Community',
            },
          ].map((c) => (
            <div
              key={c.title}
              className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
              </div>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)]">
                  <c.icon size={22} className="text-[color:var(--accent)]" />
                </div>
                <div className="mt-5 text-xl font-bold">{c.title}</div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">{c.desc}</div>
                <div className="mt-6">
                  <Link
                    to={c.to}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-3 text-sm font-semibold"
                  >
                    {c.cta}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10"
      >
        <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
          <div className="text-2xl font-bold tracking-tight">Implementation playbooks</div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Three “playbooks” with a compact, linky layout.
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {[
              {
                t: 'Latency dashboard',
                d: 'Track prompt latency, tail behavior, and GPU saturation.',
                to: '/resources/llm-engine-advisor',
              },
              {
                t: 'Secure secrets',
                d: 'Rotate keys safely and lock down runtime access.',
                to: '/resources/partners',
              },
              {
                t: 'Deploy from CI',
                d: 'Automate rollouts with canary + rollback patterns.',
                to: '/resources/marketplace-apps',
              },
            ].map((p) => (
              <Link
                key={p.t}
                to={p.to}
                className="group rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4 transition-colors hover:bg-[color:var(--bg-tertiary)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{p.t}</div>
                    <div className="mt-1 text-sm text-[color:var(--text-secondary)]">{p.d}</div>
                  </div>
                  <ChevronRight className="text-[color:var(--text-secondary)] transition-transform group-hover:translate-x-0.5" size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-10"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-[color:var(--border-color)] bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.18),rgba(var(--accent-rgb),0.03))] p-7">
            <div className="text-2xl font-bold tracking-tight">Want to be listed as a partner?</div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              We can help you ship a reference integration and publish it in the marketplace.
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
              >
                Reach out
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/resources/marketplace-apps"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-6 py-3 text-sm font-semibold"
              >
                Browse Marketplace Apps
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-sm font-semibold text-[color:var(--text-secondary)]">Why teams partner</div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: 'Setup time', v: 'Hours' },
                { l: 'Time saved', v: 'Weeks' },
                { l: 'Risk reduced', v: 'High' },
                { l: 'Support', v: 'Ongoing' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">{s.l}</div>
                  <div className="mt-2 text-lg font-bold">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/resources/community"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-3 text-sm font-semibold"
              >
                Meet the community
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </ResourceLayout>
  );
}
