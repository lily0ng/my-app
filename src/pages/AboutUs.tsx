import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Bell,
  Cloud,
  Headphones,
  Network,
  Shield,
  Sparkles,
  Timer,
  Users } from
'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function useCountUp(target: number, active: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(target * eased);
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, durationMs, target]);

  return value;
}

export function AboutUsPage() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, () => ({
        top: clamp(Math.random() * 100, 6, 94),
        left: clamp(Math.random() * 100, 4, 96),
        size: clamp(Math.random() * 3 + 1.5, 1.5, 4.2),
        delay: Math.random() * 2.4
      })),
    []
  );

  const metricsRef = useRef<HTMLDivElement | null>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.25 });

  const uptime = useCountUp(99, metricsInView, 700);
  const latency = useCountUp(38, metricsInView, 850);
  const active = useCountUp(124, metricsInView, 950);

  const [hoveredTeamNode, setHoveredTeamNode] = useState<string | null>(null);

  const sectionVariant = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-20 px-6 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(0,255,136,0.20)_1px,transparent_1px)] [background-size:80px_80px]" />
          </div>

          <div className="max-w-6xl mx-auto relative">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 bg-[#0a0a0a]">
                  <Sparkles size={14} className="text-[#00ff88]" />
                  <span className="text-gray-300">About</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
                  Built for teams that ship in real-time
                </h1>
                <p className="text-gray-400 text-lg mt-5 leading-relaxed max-w-xl">
                  Our mission is to help builders move from idea to production with infrastructure that feels instantaneous, observable, and reliable.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <Link
                    to="/contact"
                    className="px-6 py-3 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-colors"
                  >
                    Talk to us
                  </Link>
                  <Link
                    to="/resources"
                    className="px-6 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                  >
                    Explore resources <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden relative">
                <div className="p-8">
                  <div className="text-sm font-bold text-[#00ff88] tracking-wider">OUR FOCUS</div>
                  <div className="text-2xl font-bold mt-3">Real-time collaboration, predictable infra</div>
                  <p className="text-gray-400 mt-3 leading-relaxed">
                    We design systems that make teams feel connected — with live visibility into what is running, what changed, and what matters next.
                  </p>
                </div>
                <div className="border-t border-white/10 p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[{ label: 'Latency', value: '< 50ms' }, { label: 'Reliability', value: '99.9%' }, { label: 'Visibility', value: 'Live' }].map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/10 bg-[#111] p-4">
                      <div className="text-xs text-gray-500">{s.label}</div>
                      <div className="text-lg font-bold mt-1">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-y border-white/5 bg-[#050505]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[{
                icon: Timer,
                title: 'Instant feedback',
                desc: 'See changes immediately with live status, logs, and health signals.'
              }, {
                icon: Bell,
                title: 'Always in sync',
                desc: 'Stay aligned across teams with consistent workflows and shared context.'
              }, {
                icon: Users,
                title: 'Built for humans',
                desc: 'A clean experience that reduces cognitive load and improves velocity.'
              }].map((c) => (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8"
                >
                  <div className="w-11 h-11 rounded-xl border border-white/10 bg-[#111] flex items-center justify-center">
                    <c.icon size={18} className="text-[#00ff88]" />
                  </div>
                  <div className="text-xl font-bold mt-5">{c.title}</div>
                  <div className="text-gray-400 mt-2 leading-relaxed">{c.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                variants={sectionVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <h2 className="text-4xl font-bold">Where we are headed</h2>
                <p className="text-gray-400 text-lg mt-4 leading-relaxed">
                  We are building a platform where infrastructure decisions become invisible, and teams can focus on what they are creating.
                </p>

                <div className="mt-10 space-y-4">
                  {[{
                    date: '2024',
                    title: 'Core platform maturity',
                    desc: 'Solid foundations for predictable deployments.'
                  }, {
                    date: '2025',
                    title: 'Real-time team workflows',
                    desc: 'Live status, collaboration primitives, and smarter feedback loops.'
                  }, {
                    date: 'Next',
                    title: 'Autonomous operations',
                    desc: 'Systems that self-heal and surface what matters.'
                  }].map((t) => (
                    <motion.div
                      key={t.title}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 flex gap-4"
                    >
                      <div className="w-16 shrink-0">
                        <div className="text-sm font-bold text-[#00ff88]">{t.date}</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{t.title}</div>
                        <div className="text-gray-400 mt-1">{t.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                ref={metricsRef}
                variants={sectionVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
              >
                <div className="p-8 border-b border-white/10">
                  <div className="text-sm font-bold text-[#00ff88] tracking-wider">LIVE METRICS</div>
                  <div className="text-2xl font-bold mt-3">Real-time connection</div>
                  <div className="text-gray-400 mt-2">
                    A small preview of the kind of visibility we optimize for.
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    {dots.map((d, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#00ff88]"
                        style={{
                          top: `${d.top}%`,
                          left: `${d.left}%`,
                          width: d.size,
                          height: d.size,
                          opacity: 0.18
                        }}
                        animate={{ opacity: [0.1, 0.45, 0.12] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>

                  {[{
                    icon: Cloud,
                    label: 'Uptime',
                    value: `${uptime}.9%`
                  }, {
                    icon: Network,
                    label: 'Latency',
                    value: `${latency}ms`
                  }, {
                    icon: Users,
                    label: 'Active',
                    value: `${active}`
                  }].map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/10 bg-[#111] p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-60" />
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-[#0a0a0a] flex items-center justify-center">
                          <m.icon size={18} className="text-[#00ff88]" />
                        </div>
                        <div className="text-xs text-gray-500 mt-4">{m.label}</div>
                        <div className="text-2xl font-bold mt-1 tabular-nums">{m.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden py-24 px-6 bg-[rgba(var(--team-rgb),0.06)]"
          style={{ ['--team-rgb' as any]: '56,189,248' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(var(--team-rgb),0.14),transparent_58%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_65%,rgba(var(--team-rgb),0.10),transparent_60%)]" />
          </div>
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold">Our Team Structure</h2>
              <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
                Real-time collaboration across specialized teams — connected through a single architecture layer.
              </p>
            </motion.div>

            <div className="mt-14">
              <div className="relative w-full max-w-5xl mx-auto">
                <div className="relative aspect-[16/10] rounded-3xl bg-[rgba(255,255,255,0.74)] dark:bg-[rgba(7,14,22,0.78)] backdrop-blur-md overflow-visible ring-1 ring-black/5 dark:ring-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.14)] dark:shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
                  <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(var(--team-rgb),0.12),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(var(--team-rgb),0.08),transparent_62%)]" />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(var(--team-rgb),0.18)_1px,transparent_1px)] [background-size:70px_70px]" />
                  </div>
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {[
                      { id: 'security', d: 'M 50 50 L 18 26', delay: 0 },
                      { id: 'network', d: 'M 50 50 L 82 26', delay: 0.35 },
                      { id: 'support', d: 'M 50 50 L 18 78', delay: 0.7 },
                      { id: 'architect', d: 'M 50 50 L 82 78', delay: 1.05 }
                    ].map((p) => {
                      const isActive = !hoveredTeamNode || hoveredTeamNode === p.id;
                      return (
                        <g key={p.id}>
                          <motion.path
                            d={p.d}
                            fill="none"
                            stroke={`rgba(var(--team-rgb),${isActive ? 0.40 : 0.10})`}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeDasharray="4 10"
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: -80 }}
                            transition={{ duration: 3.0, repeat: Infinity, ease: 'linear', delay: p.delay }}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  <TeamNode
                    className="absolute left-[12%] top-[16%]"
                    title="Cloud Security Team"
                    icon={Shield}
                    accentRgb="var(--team-rgb)"
                    id="security"
                    desc="Owns security posture, compliance, and threat response for critical infrastructure."
                    tooltipSide="right"
                    hovered={hoveredTeamNode === 'security'}
                    setHovered={setHoveredTeamNode}
                  />
                  <TeamNode
                    className="absolute right-[12%] top-[16%]"
                    title="Network & System Expert Team"
                    icon={Network}
                    accentRgb="var(--team-rgb)"
                    id="network"
                    desc="Maintains routing, connectivity, and low-latency paths across providers and regions."
                    tooltipSide="left"
                    hovered={hoveredTeamNode === 'network'}
                    setHovered={setHoveredTeamNode}
                  />
                  <TeamNode
                    className="absolute left-[12%] bottom-[14%]"
                    title="Professional Support Team"
                    icon={Headphones}
                    accentRgb="var(--team-rgb)"
                    id="support"
                    desc="Direct support with real-time triage, incident coordination, and customer success."
                    tooltipSide="right"
                    hovered={hoveredTeamNode === 'support'}
                    setHovered={setHoveredTeamNode}
                  />
                  <TeamNode
                    className="absolute right-[12%] bottom-[14%]"
                    title="Cloud Architect Team"
                    icon={Cloud}
                    accentRgb="var(--team-rgb)"
                    id="architect"
                    desc="Designs scalable architectures and optimizes performance, cost, and reliability."
                    tooltipSide="left"
                    hovered={hoveredTeamNode === 'architect'}
                    setHovered={setHoveredTeamNode}
                  />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="relative w-28 h-28 rounded-full bg-[rgba(255,255,255,0.32)] dark:bg-[rgba(0,0,0,0.28)] ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md flex items-center justify-center">
                        <div className="absolute -inset-5 -z-10 rounded-full bg-[radial-gradient(circle,rgba(var(--team-rgb),0.18),transparent_65%)]" />
                        <Users size={32} className="text-[rgba(var(--team-rgb),0.95)]" />
                      </div>
                      <div className="text-center mt-4">
                        <div className="inline-block px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.34)] ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md">
                          <div className="font-bold text-[var(--text-primary)]">Solution Architecture</div>
                          <div className="text-xs text-[var(--text-tertiary)] mt-1">Single source of truth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{
                    label: 'Live visibility',
                    desc: 'Status updates propagate instantly across teams.'
                  }, {
                    label: 'Clear ownership',
                    desc: 'Specialized teams with well-defined responsibilities.'
                  }, {
                    label: 'Fast feedback loops',
                    desc: 'Signals travel quickly through shared architecture.'
                  }].map((b) => (
                    <motion.div
                      key={b.label}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="rounded-2xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] backdrop-blur-sm p-6"
                    >
                      <div className="text-sm font-bold text-[rgba(var(--team-rgb),0.95)]">{b.label}</div>
                      <div className="text-[var(--text-secondary)] mt-2">{b.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 md:p-14 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/8 to-transparent" />
              <div className="relative">
                <h2 className="text-4xl font-bold">Ready to connect your team?</h2>
                <p className="text-gray-400 text-lg mt-4">
                  Explore resources, reach out, or start building now.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/signup"
                    className="px-7 py-3 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-colors"
                  >
                    Create an account
                  </Link>
                  <Link
                    to="/resources"
                    className="px-7 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
                  >
                    Browse resources
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TeamNode({
  className,
  title,
  icon: Icon,
  accentRgb,
  id,
  desc,
  tooltipSide,
  hovered,
  setHovered
}: {
  className: string;
  title: string;
  icon: any;
  accentRgb: string;
  id: string;
  desc: string;
  tooltipSide: 'left' | 'right';
  hovered: boolean;
  setHovered: (id: string | null) => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={className}
    >
      <div
        className="relative flex flex-col items-center gap-3"
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
      >
        <button
          type="button"
          onFocus={() => setHovered(id)}
          onBlur={() => setHovered(null)}
          className="group outline-none"
          aria-label={title}
        >
          <div className="relative">
            <motion.div
              animate={{ opacity: hovered ? [0.30, 0.75, 0.30] : [0.18, 0.45, 0.18] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-4 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.24), transparent 62%)` }}
            />
            <div
              className={
                "relative w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md flex items-center justify-center shadow-sm shadow-black/5 dark:shadow-none transition-transform duration-200 " +
                (hovered ? "scale-[1.03]" : "")
              }
            >
              <Icon size={26} style={{ color: `rgb(${accentRgb})` }} />
            </div>
          </div>

          <div className="text-center mt-3">
            <div className="text-sm font-bold text-[var(--text-primary)] leading-tight">{title}</div>
            <div className="text-xs text-[var(--text-tertiary)] mt-1">Connected</div>
          </div>
        </button>

        {hovered ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={
              "absolute top-1/2 -translate-y-1/2 w-[260px] rounded-2xl bg-[rgba(255,255,255,0.90)] dark:bg-[rgba(0,0,0,0.55)] ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.45)] z-20 " +
              (tooltipSide === 'left' ? "right-[calc(100%+14px)]" : "left-[calc(100%+14px)]")
            }
          >
            <div className="text-xs font-bold text-[rgba(var(--team-rgb),0.95)]">{title}</div>
            <div className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</div>
            <div
              className={
                "absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-[rgba(255,255,255,0.90)] dark:bg-[rgba(0,0,0,0.55)] " +
                (tooltipSide === 'left' ? "-right-1" : "-left-1")
              }
            />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
