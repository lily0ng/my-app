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

        <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
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
              <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
                Real-time collaboration across specialized teams — connected through a single architecture layer.
              </p>
            </motion.div>

            <div className="mt-14">
              <div className="relative w-full max-w-5xl mx-auto">
                <div className="relative aspect-[16/10] rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <motion.line
                      x1="50"
                      y1="50"
                      x2="18"
                      y2="26"
                      stroke="rgba(0,255,136,0.55)"
                      strokeWidth="0.9"
                      strokeDasharray="4 6"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -40 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.line
                      x1="50"
                      y1="50"
                      x2="82"
                      y2="26"
                      stroke="rgba(0,255,136,0.55)"
                      strokeWidth="0.9"
                      strokeDasharray="4 6"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -40 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.4 }}
                    />
                    <motion.line
                      x1="50"
                      y1="50"
                      x2="18"
                      y2="78"
                      stroke="rgba(0,255,136,0.55)"
                      strokeWidth="0.9"
                      strokeDasharray="4 6"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -40 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                    />
                    <motion.line
                      x1="50"
                      y1="50"
                      x2="82"
                      y2="78"
                      stroke="rgba(0,255,136,0.55)"
                      strokeWidth="0.9"
                      strokeDasharray="4 6"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -40 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 1.2 }}
                    />
                  </svg>

                  <TeamNode
                    className="absolute left-[12%] top-[16%]"
                    title="Cloud Security Team"
                    icon={Shield}
                    accent="#00ff88"
                  />
                  <TeamNode
                    className="absolute right-[10%] top-[16%]"
                    title="Network & System Expert Team"
                    icon={Network}
                    accent="#00ff88"
                  />
                  <TeamNode
                    className="absolute left-[10%] bottom-[14%]"
                    title="Professional Support Team"
                    icon={Headphones}
                    accent="#00ff88"
                  />
                  <TeamNode
                    className="absolute right-[12%] bottom-[14%]"
                    title="Cloud Architect Team"
                    icon={Cloud}
                    accent="#00ff88"
                  />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="relative w-28 h-28 rounded-full border border-white/10 bg-[#111] flex items-center justify-center">
                        <Users size={32} className="text-[#00ff88]" />
                      </div>
                      <div className="text-center mt-4">
                        <div className="font-bold">Solution Architecture</div>
                        <div className="text-xs text-gray-500 mt-1">Single source of truth</div>
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
                      className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6"
                    >
                      <div className="text-sm font-bold text-[#00ff88]">{b.label}</div>
                      <div className="text-gray-400 mt-2">{b.desc}</div>
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
  accent
}: {
  className: string;
  title: string;
  icon: any;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={className}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <motion.div
            animate={{ opacity: [0.22, 0.6, 0.22] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-3 rounded-full"
            style={{ background: `${accent}14` }}
          />
          <div className="relative w-20 h-20 rounded-full border border-white/10 bg-[#111] flex items-center justify-center">
            <Icon size={26} style={{ color: accent }} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-xs text-gray-500 mt-1">Connected</div>
        </div>
      </div>
    </motion.div>
  );
}
