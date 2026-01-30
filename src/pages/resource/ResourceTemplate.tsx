import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

type IconType = React.ComponentType<{ size?: number | string; className?: string }>;

type Card = {
  title: string;
  desc: string;
  icon: IconType;
};

type Step = {
  title: string;
  desc: string;
};

type Stat = {
  label: string;
  value: string;
};

export type ResourcePageConfig = {
  kicker: string;
  title: string;
  subtitle: string;
  icon: IconType;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  section1: { title: string; cards: Card[] };
  section2: { title: string; steps: Step[] };
  section3: { title: string; cards: Card[] };
  section4: { title: string; stats: Stat[] };
  section5: { title: string; desc: string; cta: { label: string; to: string } };
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export function ResourceTemplate({ config }: { config: ResourcePageConfig }) {
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                {config.kicker}
              </div>

              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{config.title}</h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed">{config.subtitle}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to={config.primaryCta.to} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5">
                      {config.primaryCta.label}
                      <ArrowRight size={18} />
                    </Link>
                    <Link to={config.secondaryCta.to} className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]">
                      {config.secondaryCta.label}
                    </Link>
                  </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                      <Icon size={22} className="text-[color:var(--accent)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[color:var(--text-secondary)]">Theme-safe</div>
                      <div className="mt-1 text-lg font-bold">Light + Dark</div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    {['Animated sections', 'Reusable layout', 'Navbar routes', '5 sections'].map((t) => (
                      <div key={t} className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <SectionCards title={config.section1.title} cards={config.section1.cards} />
          <SectionSteps title={config.section2.title} steps={config.section2.steps} />
          <SectionCards title={config.section3.title} cards={config.section3.cards} />
          <SectionStats title={config.section4.title} stats={config.section4.stats} />
          <SectionCta title={config.section5.title} desc={config.section5.desc} cta={config.section5.cta} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SectionCards({ title, cards }: { title: string; cards: Card[] }) {
  return (
    <section className="mt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-[color:var(--text-secondary)]">Fast building blocks to keep momentum.</p>
      </div>
      <motion.div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        {cards.map((c) => {
          const I = c.icon;
          return (
            <motion.div key={c.title} variants={item} whileHover={{ y: -3, scale: 1.01 }} transition={{ duration: 0.16, ease: 'easeOut' }} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                <I size={22} className="text-[color:var(--accent)]" />
              </div>
              <div className="mt-6 text-xl font-semibold">{c.title}</div>
              <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">{c.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function SectionSteps({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className="mt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-[color:var(--text-secondary)]">A simple flow that matches how teams evaluate and ship.</p>
      </div>
      <motion.div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        {steps.map((s, idx) => (
          <motion.div key={s.title} variants={item} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">STEP {idx + 1}</div>
              <div className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
            </div>
            <div className="mt-5 text-lg font-semibold">{s.title}</div>
            <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function SectionStats({ title, stats }: { title: string; stats: Stat[] }) {
  return (
    <section className="mt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-[color:var(--text-secondary)]">A quick snapshot of typical targets.</p>
      </div>
      <motion.div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        {stats.map((st) => (
          <motion.div key={st.label} variants={item} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7">
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">{st.label}</div>
            <div className="mt-4 text-3xl font-bold tracking-tight">{st.value}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function SectionCta({ title, desc, cta }: { title: string; desc: string; cta: { label: string; to: string } }) {
  return (
    <section className="mt-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">{desc}</p>
          </div>
          <Link to={cta.to} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5">
            {cta.label}
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
