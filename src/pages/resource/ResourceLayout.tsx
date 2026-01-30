import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

type IconType = React.ComponentType<{ size?: number | string; className?: string }>;

type Cta = {
  label: string;
  to: string;
};

export function ResourceLayout({
  kicker,
  title,
  subtitle,
  icon: Icon,
  primaryCta,
  secondaryCta,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  icon: IconType;
  primaryCta: Cta;
  secondaryCta: Cta;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-28 -left-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
              <div className="absolute -bottom-28 -right-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                <Sparkles size={14} className="text-[color:var(--accent)]" />
                <span>{kicker}</span>
              </div>

              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed">{subtitle}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={primaryCta.to}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      {primaryCta.label}
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      to={secondaryCta.to}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      {secondaryCta.label}
                    </Link>
                  </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                      <Icon size={22} className="text-[color:var(--accent)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[color:var(--text-secondary)]">Resources</div>
                      <div className="mt-1 text-lg font-bold">Theme-safe UI</div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    {['Unique layouts', 'Motion included', 'Light/Dark', 'Fast to scan'].map((t) => (
                      <div
                        key={t}
                        className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <div className="mt-14">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const sectionReveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
