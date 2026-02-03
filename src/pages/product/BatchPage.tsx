import { useState } from 'react';
import { motion } from 'framer-motion';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import {
  Database,
  Video,
  FileText,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers,
  Play,
  Activity,
  Clock,
  Server,
  Users,
  AppWindow,
  ArrowLeftRight,
  Cpu,
} from 'lucide-react';
export function BatchPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroCards = [
    {
      icon: Database,
      title: 'Database-aware routing',
      desc: 'Route reads/writes intelligently and keep your data path resilient under load.',
    },
    {
      icon: Layers,
      title: 'Layer 7 traffic policy',
      desc: 'Weighted splits, sticky sessions, and path-based routing for production services.',
    },
    {
      icon: Activity,
      title: 'Health checks + failover',
      desc: 'Automatic target draining, retries, and fast recovery when instances degrade.',
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[var(--text-primary)] overflow-hidden font-sans">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(var(--accent-rgb),0.12)] via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(var(--accent-rgb),0.10)] text-[var(--accent)] text-sm font-medium mb-8 border border-[rgba(var(--accent-rgb),0.22)]">
              Load Balancer
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Reliable <br />{' '}
              <span className="text-[var(--accent)]">Load Balancing</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Distribute traffic efficiently across multiple instances to ensure high availability and optimal performance.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="px-9 py-4 rounded-full bg-[var(--accent)] text-white font-bold text-lg hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                Create Load Balancer
              </button>
              <button className="px-9 py-4 rounded-full border border-[color:var(--border-color)] text-[var(--text-primary)] font-medium text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-[1.02]">
                View Docs
              </button>
            </div>

            <div className="mt-12 max-w-6xl mx-auto bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-10 md:p-12 relative overflow-hidden">
              <style>{`@keyframes lbHeroDash{to{stroke-dashoffset:-160;}}`}</style>
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(var(--accent-rgb),0.14),transparent_58%)]" />
              <div className="relative aspect-[16/10] md:aspect-[21/8]">
                <svg
                  viewBox="0 0 120 60"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="lb-hero-arrow"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(var(--accent-rgb),0.55)" />
                    </marker>
                  </defs>

                  {[
                    { d: 'M 26 18 C 36 18, 42 18, 50 30', label: 'REQUEST 1' },
                    { d: 'M 26 24 C 38 24, 44 24, 50 30', label: 'REQUEST 2' },
                    { d: 'M 26 36 C 38 36, 44 36, 50 30', label: 'REQUEST 3' },
                    { d: 'M 26 42 C 36 42, 42 42, 50 30', label: 'REQUEST 4' },
                  ].map((p, idx) => (
                    <g key={`in-${idx}`}>
                      <path
                        d={p.d}
                        fill="none"
                        stroke="rgba(var(--accent-rgb),0.18)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                      <path
                        d={p.d}
                        fill="none"
                        stroke="rgba(var(--accent-rgb),0.70)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeDasharray="1 10"
                        style={{ animation: `lbHeroDash 2.6s linear infinite`, animationDelay: `${idx * 0.22}s` }}
                      />
                      <text
                        x={34}
                        y={idx === 0 ? 14 : idx === 1 ? 20 : idx === 2 ? 48 : 54}
                        fontSize="3.2"
                        style={{ fill: 'var(--text-tertiary)', letterSpacing: '0.06em' }}
                      >
                        {p.label}
                      </text>
                    </g>
                  ))}

                  {[
                    { d: 'M 70 22 C 78 22, 86 22, 94 18', label: 'REQUEST 1' },
                    { d: 'M 70 30 C 80 30, 88 30, 94 30', label: 'REQUEST 2' },
                    { d: 'M 70 38 C 78 38, 86 38, 94 42', label: 'REQUEST 3' },
                  ].map((p, idx) => (
                    <g key={`out-${idx}`}>
                      <path
                        d={p.d}
                        fill="none"
                        stroke="rgba(var(--accent-rgb),0.18)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        markerEnd="url(#lb-hero-arrow)"
                      />
                      <path
                        d={p.d}
                        fill="none"
                        stroke="rgba(var(--accent-rgb),0.70)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeDasharray="1 10"
                        markerEnd="url(#lb-hero-arrow)"
                        style={{ animation: `lbHeroDash 2.6s linear infinite`, animationDelay: `${0.4 + idx * 0.22}s` }}
                      />
                      <text
                        x={78}
                        y={idx === 0 ? 18 : idx === 1 ? 26 : 44}
                        fontSize="3.2"
                        style={{ fill: 'var(--text-tertiary)', letterSpacing: '0.06em' }}
                      >
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="absolute left-[2%] top-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-3 rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 px-5 py-4 shadow-sm shadow-black/5 dark:shadow-none">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(var(--accent-rgb),0.10)] ring-1 ring-[rgba(var(--accent-rgb),0.18)] flex items-center justify-center">
                      <Users size={22} className="text-[var(--accent)]" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">End Users</div>
                      <div className="text-xs text-[var(--text-tertiary)] mt-1">Clients & devices</div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[42%] top-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-3 rounded-2xl bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/10 px-6 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                    <div className="w-11 h-11 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                      <Layers size={22} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Load Balancer</div>
                      <div className="text-xs text-[var(--text-tertiary)] mt-1">Routes to healthy targets</div>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[2%] top-1/2 -translate-y-1/2">
                  <div className="rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 px-6 py-5">
                    <div className="text-xs font-bold text-[var(--text-tertiary)] tracking-wider">APPLICATION</div>
                    <div className="mt-4 grid gap-3">
                      {['Server 01', 'Server 02', 'Server 03'].map((name) => (
                        <div key={name} className="flex items-center gap-3 rounded-xl bg-[rgba(255,255,255,0.74)] dark:bg-[rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/10 px-4 py-3">
                          <Server size={18} className="text-[var(--accent)]" />
                          <div className="font-semibold">{name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
              {heroCards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(var(--accent-rgb),0.10)] ring-1 ring-[rgba(var(--accent-rgb),0.18)] flex items-center justify-center shrink-0">
                      <c.icon size={22} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-[var(--text-primary)]">{c.title}</div>
                      <div className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{c.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Code Example */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">
              Routing made simple
            </h2>
            <div className="bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10 p-8 text-left font-mono text-sm shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)] relative">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              <pre className="text-[var(--text-primary)] opacity-80">
                <code>{`# Create a load balancer and attach targets
lb = LoadBalancer(
    name="public-api",
    listeners=[{"port": 443, "protocol": "HTTPS"}],
    health_check={"path": "/health", "interval": "10s"},
)

lb.add_targets([
    "api-1.internal:8080",
    "api-2.internal:8080",
    "api-3.internal:8080",
])

lb.deploy()`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* 3. Traffic Visualization */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Load Balancing</h2>
            <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
              Compare static vs dynamic load balancing and how each approach routes traffic to servers.
            </p>

            <div className="mt-12 space-y-6">
              <style>{`@keyframes lbArrowPulse{0%,100%{opacity:.35;transform:translateX(0);}50%{opacity:.8;transform:translateX(6px);}}@keyframes lbDashMove{to{stroke-dashoffset:-120;}}`}</style>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="rounded-3xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 p-8 md:p-10 overflow-hidden"
              >
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <div className="text-left">
                    <div className="text-sm font-bold tracking-wide text-[rgba(var(--accent-rgb),0.95)]">STATIC LOAD BALANCING</div>
                    <div className="mt-2 text-2xl md:text-3xl font-bold">Rules-based routing</div>
                    <div className="mt-3 text-[var(--text-secondary)] max-w-xl">
                      Uses predefined rules (round‑robin, weights) without reacting to live server load.
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1.15fr] items-center gap-4 md:gap-6">
                  <div className="rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-5 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(var(--accent-rgb),0.10)] ring-1 ring-[rgba(var(--accent-rgb),0.18)] flex items-center justify-center">
                        <AppWindow size={22} className="text-[var(--accent)]" />
                      </div>
                      <div>
                        <div className="font-bold">Web application</div>
                        <div className="text-xs text-[var(--text-tertiary)] mt-1">Sends requests</div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                    <ArrowLeftRight size={26} className="text-[rgba(var(--accent-rgb),0.65)]" style={{ animation: 'lbArrowPulse 1.8s ease-in-out infinite' }} />
                  </div>

                  <div className="rounded-2xl bg-[rgba(255,255,255,0.74)] dark:bg-[rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/10 p-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center">
                        <Server size={20} className="text-[var(--accent)]" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Hardware load balancer</div>
                        <div className="text-xs text-[var(--text-tertiary)] mt-1">Static algorithm / rules</div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                    <ArrowLeftRight size={26} className="text-[rgba(var(--accent-rgb),0.65)]" style={{ animation: 'lbArrowPulse 1.8s ease-in-out infinite', animationDelay: '0.25s' }} />
                  </div>

                  <div className="rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-5 text-left">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold">Web servers</div>
                        <div className="text-xs text-[var(--text-tertiary)] mt-1">Targets</div>
                      </div>
                      <div className="grid gap-2">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-16 h-8 rounded-xl bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.32)] ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center">
                            <Server size={16} className="text-[rgba(var(--accent-rgb),0.85)]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                className="rounded-3xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 p-8 md:p-10 overflow-hidden"
              >
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <div className="text-left">
                    <div className="text-sm font-bold tracking-wide text-[rgba(var(--accent-rgb),0.95)]">DYNAMIC LOAD BALANCING</div>
                    <div className="mt-2 text-2xl md:text-3xl font-bold">Adapts to live traffic</div>
                    <div className="mt-3 text-[var(--text-secondary)] max-w-xl">
                      Routes based on health + load signals to keep latency stable and prevent overload.
                    </div>
                  </div>
                </div>

                <div className="mt-8 relative">
                  <svg
                    viewBox="0 0 100 34"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 58 18 L 92 18 L 92 32"
                      fill="none"
                      stroke="rgba(var(--accent-rgb),0.28)"
                      strokeWidth="1.2"
                      strokeDasharray="4 8"
                      style={{ animation: 'lbDashMove 3.2s linear infinite' }}
                    />
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1.15fr] items-center gap-4 md:gap-6">
                    <div className="rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[rgba(var(--accent-rgb),0.10)] ring-1 ring-[rgba(var(--accent-rgb),0.18)] flex items-center justify-center">
                          <AppWindow size={22} className="text-[var(--accent)]" />
                        </div>
                        <div>
                          <div className="font-bold">Web application</div>
                          <div className="text-xs text-[var(--text-tertiary)] mt-1">Sends requests</div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                      <ArrowLeftRight size={26} className="text-[rgba(var(--accent-rgb),0.65)]" style={{ animation: 'lbArrowPulse 1.8s ease-in-out infinite' }} />
                    </div>

                    <div className="rounded-2xl bg-[rgba(255,255,255,0.74)] dark:bg-[rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/10 p-5 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[rgba(var(--accent-rgb),0.12)] ring-1 ring-[rgba(var(--accent-rgb),0.20)] flex items-center justify-center">
                          <Cpu size={20} className="text-[var(--accent)]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold">Software load balancer</div>
                          <div className="text-xs text-[var(--text-tertiary)] mt-1">Dynamic algorithm</div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                      <ArrowLeftRight size={26} className="text-[rgba(var(--accent-rgb),0.65)]" style={{ animation: 'lbArrowPulse 1.8s ease-in-out infinite', animationDelay: '0.25s' }} />
                    </div>

                    <div className="rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-5 text-left">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-bold">Web servers</div>
                          <div className="text-xs text-[var(--text-tertiary)] mt-1">Targets</div>
                        </div>
                        <div className="grid gap-2">
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="w-16 h-8 rounded-xl bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.32)] ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center">
                              <Server size={16} className="text-[rgba(var(--accent-rgb),0.85)]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Common Scenarios */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-20 text-center">
              Common Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
              {
                icon: Video,
                title: 'Web apps & APIs',
                desc: 'Distribute HTTP traffic across multiple instances and regions.'
              },
              {
                icon: Database,
                title: 'High availability',
                desc: 'Route around failures with health checks and automatic failover.'
              },
              {
                icon: FileText,
                title: 'Traffic spikes',
                desc: 'Smooth bursty traffic during launches, incidents, and campaigns.'
              }].
              map((uc, i) =>
              <div
                key={i}
                className="p-8 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] hover:ring-[rgba(var(--accent-rgb),0.25)] transition-colors group">

                  <div className="w-12 h-12 rounded-2xl bg-[rgba(var(--accent-rgb),0.10)] ring-1 ring-[rgba(var(--accent-rgb),0.18)] flex items-center justify-center mb-6">
                    <uc.icon
                      className="text-[var(--accent)] group-hover:scale-110 transition-transform"
                      size={26}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{uc.title}</h3>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. Metrics */}
        <section className="py-32 px-6 border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">10k+</div>
              <div className="text-[var(--text-secondary)] uppercase tracking-wider font-medium">
                Concurrent Containers
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">99.9%</div>
              <div className="text-[var(--text-secondary)] uppercase tracking-wider font-medium">
                Success Rate
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">&lt; 1s</div>
              <div className="text-[var(--text-secondary)] uppercase tracking-wider font-medium">
                Scheduling Overhead
              </div>
            </div>
          </div>
        </section>

        {/* 6. Cost Calculator */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Calculate Savings
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Total Compute Hours
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]" />

                <div className="text-right text-[var(--accent)] font-bold mt-2">
                  5,000
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[color:var(--border-color)]">
                <div className="text-center">
                  <div className="text-[var(--text-secondary)] mb-2">Traditional LBs</div>
                  <div className="text-3xl font-bold text-[var(--text-primary)]">$12,500</div>
                </div>
                <div className="text-center">
                  <div className="text-[var(--text-secondary)] mb-2">Modal</div>
                  <div className="text-3xl font-bold text-[var(--accent)]">
                    $8,200
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Processing 1M Videos</h2>
              <p className="text-[var(--text-secondary)]">
                See how to build a massive scale video processing pipeline.
              </p>
            </div>
            <div className="aspect-video bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40 group-hover:bg-black/10 dark:group-hover:bg-black/25 transition-colors" />
              <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_18px_60px_rgba(0,0,0,0.14)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                <Play size={40} className="text-white ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Integrations */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-16">
              Connects with your data
            </h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-70">
              {['S3', 'GCS', 'Snowflake', 'Postgres', 'Kafka', 'Redis'].map(
                (name) =>
                <div
                  key={name}
                  className="text-2xl font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-default">

                    {name}
                  </div>

              )}
            </div>
          </div>
        </section>

        {/* 9. Monitoring */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[rgba(var(--accent-rgb),0.06)] dark:bg-[rgba(var(--accent-rgb),0.10)] translate-x-[10px] translate-y-[10px]" />
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-black/5 dark:bg-white/5 translate-x-[5px] translate-y-[5px]" />
              <div className="relative rounded-2xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 p-8 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(var(--accent-rgb),0.16),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(var(--accent-rgb),0.10)] ring-1 ring-[rgba(var(--accent-rgb),0.18)] flex items-center justify-center">
                      <Activity size={22} className="text-[var(--accent)]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Full observability</h2>
                  </div>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] mt-6">
                    Track requests, latency, and error rates in real-time. Debug
                    unhealthy targets with clear health signals.
                  </p>
                  <ul className="space-y-4 mt-8">
                    <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                      <Activity className="text-[var(--accent)]" /> Target health dashboard
                    </li>
                    <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                      <Activity className="text-[var(--accent)]" /> Request tracing
                    </li>
                    <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                      <Activity className="text-[var(--accent)]" /> Latency and error graphs
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[rgba(var(--accent-rgb),0.06)] dark:bg-[rgba(var(--accent-rgb),0.10)] -translate-x-[10px] translate-y-[10px]" />
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-black/5 dark:bg-white/5 -translate-x-[5px] translate-y-[5px]" />
              <div className="relative bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(var(--accent-rgb),0.14),transparent_60%)]" />
                <div className="relative space-y-4">
                  {[1, 2, 3, 4].map((i) =>
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-black/5 dark:bg-white/5 rounded-lg ring-1 ring-black/5 dark:ring-white/10">

                      <div className="flex items-center gap-4">
                        <div
                      className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-[var(--accent)]'}`} />

                        <span className="font-mono text-sm">target_{1000 + i}</span>
                      </div>
                      <span className="text-[var(--text-tertiary)] text-sm">
                        {i === 2 ? 'Failed' : 'Running'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 10. Scheduling */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Traffic controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <Clock className="mx-auto mb-6 text-[var(--accent)]" size={32} />
                <h3 className="text-xl font-bold mb-4">Health checks</h3>
                <p className="text-[var(--text-secondary)]">
                  Automatically route only to healthy instances.
                </p>
              </div>
              <div className="p-8 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <Zap className="mx-auto mb-6 text-[var(--accent)]" size={32} />
                <h3 className="text-xl font-bold mb-4">TLS termination</h3>
                <p className="text-[var(--text-secondary)]">
                  Offload encryption at the edge and simplify your services.
                </p>
              </div>
              <div className="p-8 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <Layers className="mx-auto mb-6 text-[var(--accent)]" size={32} />
                <h3 className="text-xl font-bold mb-4">Sticky sessions</h3>
                <p className="text-[var(--text-secondary)]">
                  Keep stateful users pinned to the same backend when needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">FAQ</h2>
            <div className="space-y-4">
              {[
              {
                q: 'Is there a limit to concurrency?',
                a: 'Soft limits exist but can be raised. We regularly run jobs with 10k+ containers.'
              },
              {
                q: 'How do I handle failures?',
                a: 'Modal automatically retries failed tasks. You can configure retry policies.'
              },
              {
                q: 'Can I access the internet?',
                a: 'Yes, all containers have full internet access.'
              },
              {
                q: 'What happens if a worker dies?',
                a: 'The task is automatically rescheduled on a healthy worker.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="ring-1 ring-black/5 dark:ring-white/10 rounded-xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] overflow-hidden hover:ring-[rgba(var(--accent-rgb),0.22)] transition-colors">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ?
                  <ChevronUp size={20} className="text-[var(--accent)]" /> :

                  <ChevronDown size={20} className="text-[var(--text-tertiary)]" />
                  }
                  </button>
                  <div
                  className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>

                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed border-t border-[color:var(--border-color)] pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 12. CTA */}
        <section className="py-40 px-6 text-center border-t border-[color:var(--border-color)] bg-gradient-to-b from-[color:var(--bg-primary)] to-[rgba(var(--accent-rgb),0.10)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">Scale your processing</h2>
            <p className="text-2xl text-[var(--text-secondary)] mb-12 font-light">
              Process millions of items in minutes, not days.
            </p>
            <button className="px-10 py-5 rounded-full bg-[var(--accent)] text-white font-bold text-xl hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              Create Load Balancer
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}