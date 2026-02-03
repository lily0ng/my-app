import { useState } from 'react';
import { motion } from 'framer-motion';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import {
  Network,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Play,
  Database,
} from 'lucide-react';
export function TrainingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[var(--text-primary)] overflow-hidden font-sans">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(var(--accent-rgb),0.22),transparent_55%)]" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(var(--accent-rgb),0.10)] text-[var(--accent)] text-sm font-medium mb-8 border border-[rgba(var(--accent-rgb),0.22)]">
              Kubernetes
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Fully managed <br />{' '}
              <span className="text-[var(--accent)]">Kubernetes</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Automate deployment, scaling, and management of containerized applications with our fully managed Kubernetes service.
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-10 py-5 rounded-full bg-[var(--accent)] text-white font-bold text-xl hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                Create Cluster
              </button>
              <button className="px-10 py-5 rounded-full border border-[color:var(--border-color)] text-[var(--text-primary)] font-medium text-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-105">
                View Docs
              </button>
            </div>
          </div>
        </section>

        {/* 2. Features Grid */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold">Kubernetes Architectural Overview</h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
                A control plane manages cluster state and schedules workloads onto nodes that run the data plane.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
              className="mt-12 rounded-3xl bg-[rgba(255,255,255,0.78)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 p-8 md:p-10 overflow-hidden"
            >
              <style>{`@keyframes kubeDash{to{stroke-dashoffset:-160;}}`}</style>

              <div className="relative rounded-3xl bg-[rgba(255,255,255,0.78)] dark:bg-[rgba(255,255,255,0.03)] ring-1 ring-black/5 dark:ring-white/10 p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(var(--accent-rgb),0.14),transparent_62%)]" />
                <div className="flex items-center gap-3 text-left">
                  <div className="relative w-9 h-9 rounded-lg bg-[rgba(var(--accent-rgb),0.12)] ring-1 ring-[rgba(var(--accent-rgb),0.22)] flex items-center justify-center">
                    <Network size={18} className="text-[rgba(var(--accent-rgb),0.95)]" />
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">Kubernetes Cluster</div>
                </div>

                <div className="relative mt-6 aspect-[16/10] md:aspect-[21/10]">
                  <svg
                    viewBox="0 0 1000 520"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="xMidYMin meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="kubeBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="rgba(var(--accent-rgb),0.55)" />
                        <stop offset="1" stopColor="rgba(var(--accent-rgb),0.28)" />
                      </linearGradient>
                      <linearGradient id="kubeCyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="rgba(255,255,255,0.88)" />
                        <stop offset="1" stopColor="rgba(255,255,255,0.72)" />
                      </linearGradient>
                      <marker id="kubeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(var(--accent-rgb),0.65)" />
                      </marker>
                    </defs>

                    <rect x="20" y="20" width="960" height="480" rx="14" fill="rgba(var(--accent-rgb),0.04)" stroke="rgba(var(--accent-rgb),0.18)" strokeWidth="2" />

                    <text x="60" y="70" fontSize="22" fontWeight="700" fill="var(--text-primary)">Kubernetes Cluster</text>

                    <rect x="260" y="90" width="480" height="160" rx="22" fill="url(#kubeBlue)" stroke="rgba(var(--accent-rgb),0.22)" strokeWidth="2" />
                    <text x="500" y="125" fontSize="20" fontWeight="700" textAnchor="middle" fill="rgba(255,255,255,0.94)">Kubernetes Master Server(s)</text>

                    {[
                      { x: 290, label: 'etcd' },
                      { x: 440, label: 'API Server' },
                      { x: 610, label: 'Scheduler' },
                    ].map((b) => (
                      <g key={b.label}>
                        <rect x={b.x} y="145" width="120" height="42" rx="12" fill="url(#kubeCyan)" stroke="rgba(var(--accent-rgb),0.20)" strokeWidth="2" />
                        <text x={b.x + 60} y="172" fontSize="16" fontWeight="700" textAnchor="middle" fill="rgba(var(--accent-rgb),0.95)">{b.label}</text>
                      </g>
                    ))}
                    <rect x="290" y="195" width="450" height="42" rx="12" fill="url(#kubeCyan)" stroke="rgba(var(--accent-rgb),0.20)" strokeWidth="2" />
                    <text x="515" y="222" fontSize="16" fontWeight="700" textAnchor="middle" fill="rgba(var(--accent-rgb),0.95)">Controller Manager</text>

                    <text x="650" y="285" fontSize="18" fontWeight="600" fill="var(--text-secondary)">Linux Server(s)</text>

                    {[
                      { x: 100, labelX: 225 },
                      { x: 375, labelX: 500 },
                      { x: 650, labelX: 775 },
                    ].map((n, i) => (
                      <g key={i}>
                        <rect x={n.x} y="310" width="250" height="150" rx="22" fill="url(#kubeBlue)" stroke="rgba(var(--accent-rgb),0.22)" strokeWidth="2" />
                        <text x={n.x + 125} y="345" fontSize="18" fontWeight="700" textAnchor="middle" fill="rgba(255,255,255,0.94)">Kubernetes Node</text>

                        <rect x={n.x + 18} y="362" width="102" height="40" rx="12" fill="url(#kubeCyan)" stroke="rgba(var(--accent-rgb),0.20)" strokeWidth="2" />
                        <text x={n.x + 69} y="388" fontSize="16" fontWeight="700" textAnchor="middle" fill="rgba(var(--accent-rgb),0.95)">Docker</text>

                        <rect x={n.x + 130} y="362" width="102" height="40" rx="12" fill="url(#kubeCyan)" stroke="rgba(var(--accent-rgb),0.20)" strokeWidth="2" />
                        <text x={n.x + 181} y="388" fontSize="16" fontWeight="700" textAnchor="middle" fill="rgba(var(--accent-rgb),0.95)">Kubelet</text>

                        <rect x={n.x + 18} y="408" width="214" height="40" rx="12" fill="url(#kubeCyan)" stroke="rgba(var(--accent-rgb),0.20)" strokeWidth="2" />
                        <text x={n.x + 125} y="434" fontSize="16" fontWeight="700" textAnchor="middle" fill="rgba(var(--accent-rgb),0.95)">Kubernetes Proxy</text>

                        <text x={n.labelX} y="498" fontSize="18" fontWeight="600" textAnchor="middle" fill="var(--text-secondary)">Linux Server</text>
                      </g>
                    ))}

                    {[
                      { d: 'M 500 250 C 420 270, 300 295, 225 310', delay: 0 },
                      { d: 'M 500 250 C 500 275, 500 295, 500 310', delay: 0.15 },
                      { d: 'M 500 250 C 580 270, 700 295, 775 310', delay: 0.3 },
                    ].map((p) => (
                      <g key={p.d}>
                        <path d={p.d} fill="none" stroke="rgba(var(--accent-rgb),0.30)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#kubeArrow)" />
                        <path
                          d={p.d}
                          fill="none"
                          stroke="rgba(var(--accent-rgb),0.55)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="10 18"
                          markerEnd="url(#kubeArrow)"
                          style={{ animation: 'kubeDash 3.4s linear infinite', animationDelay: `${p.delay}s` }}
                        />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Interactive Simulator */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-12 shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Estimate Cluster Size
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Model Size (Params)
                  </label>
                  <input
                    type="range"
                    className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]" />

                  <div className="text-right text-[var(--accent)] font-bold mt-2">
                    7B
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Dataset Size (Tokens)
                  </label>
                  <input
                    type="range"
                    className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]" />

                  <div className="text-right text-[var(--accent)] font-bold mt-2">
                    10B
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    GPU Count (H100)
                  </label>
                  <input
                    type="range"
                    className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]" />

                  <div className="text-right text-[var(--accent)] font-bold mt-2">
                    8
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 rounded-xl p-8">
                <div className="text-[var(--text-secondary)] mb-2">Estimated Time</div>
                <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">4h 12m</div>
                <div className="text-[var(--text-secondary)] mb-2">Estimated Cost</div>
                <div className="text-3xl font-bold text-[var(--accent)]">$120.00</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Frameworks */}
        <section className="py-32 px-6 border-y border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-16">
              Works with your favorite tools
            </h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-70">
              {[
              'PyTorch',
              'TensorFlow',
              'JAX',
              'Hugging Face',
              'DeepSpeed',
              'Ray',
              'WandB'].
              map((name) =>
              <div
                key={name}
                className="text-2xl font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-default">

                  {name}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. Code Example */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Kubernetes made simple
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                Spin up a cluster of GPUs with a single decorator. Modal handles
                the networking, scheduling, and fault tolerance.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-[var(--text-secondary)] text-lg">
                  <CheckCircle className="text-[var(--accent)]" /> Automatic node
                  discovery
                </li>
                <li className="flex items-center gap-4 text-[var(--text-secondary)] text-lg">
                  <CheckCircle className="text-[var(--accent)]" /> Fast interconnect
                  between nodes
                </li>
                <li className="flex items-center gap-4 text-[var(--text-secondary)] text-lg">
                  <CheckCircle className="text-[var(--accent)]" /> Stream logs from
                  all workers to your terminal
                </li>
              </ul>
            </div>
            <div className="bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-8 font-mono text-sm shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <pre className="text-[var(--text-secondary)]">
                <code>
                  <span className="text-[var(--accent)]">@app.function</span>(gpu=
                  <span className="text-[var(--text-primary)] opacity-80">"H100:8"</span>){'\n'}
                  <span className="text-[var(--accent)]">def</span>{' '}
                  <span className="text-[rgba(var(--accent-rgb),0.95)]">deploy</span>():{'\n'}
                  {'    '}# This runs on your cluster{'\n'}
                  {'    '}dist.init_process_group(){'\n'}
                  {'    '}model = DDP(model){'\n'}
                  {'    '}...
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 6. Architecture Diagram */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Distributed Architecture
            </h2>
            <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(var(--accent-rgb),0.12),transparent_60%)]" />
              <div className="grid grid-cols-3 gap-8 relative z-10">
                <div className="col-span-3 flex justify-center mb-8">
                  <div className="p-4 bg-black/5 dark:bg-white/5 rounded-xl ring-1 ring-black/5 dark:ring-white/10 w-48 font-bold text-[var(--accent)]">
                    Orchestrator
                  </div>
                </div>
                {[1, 2, 3].map((i) =>
                <div
                  key={i}
                  className="p-6 bg-black/5 dark:bg-white/5 rounded-xl ring-1 ring-black/5 dark:ring-white/10">

                    <Cpu className="mx-auto mb-4 text-[rgba(var(--accent-rgb),0.85)]" />
                    <div className="font-bold">Worker {i}</div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:26px_26px]" />
            </div>
          </div>
        </section>

        {/* 7. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Deploying your first workload</h2>
              <p className="text-[var(--text-secondary)]">
                Watch how to deploy and scale a service on your cluster.
              </p>
            </div>
            <div className="aspect-video bg-black/5 dark:bg-white/5 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors" />
              <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_18px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                <Play size={40} className="text-white ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Stateful workloads */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6 p-4 bg-black/5 dark:bg-white/5 rounded-xl ring-1 ring-black/5 dark:ring-white/10">
                <Database className="text-[var(--accent)]" />
                <div>
                  <div className="font-bold">pv-logs</div>
                  <div className="text-xs text-[var(--text-tertiary)]">24GB • Just now</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6 p-4 bg-black/5 dark:bg-white/5 rounded-xl ring-1 ring-black/5 dark:ring-white/10 opacity-70">
                <Database className="text-[var(--text-tertiary)]" />
                <div>
                  <div className="font-bold text-[var(--text-secondary)]">pv-data</div>
                  <div className="text-xs text-[var(--text-tertiary)]">24GB • 1h ago</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">Persistent Storage</h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8">
                Use persistent volumes to run stateful services and store data
                safely. Access them from any node in your cluster.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CheckCircle className="text-[var(--accent)]" /> High throughput
                </li>
                <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CheckCircle className="text-[var(--accent)]" /> Concurrent access
                </li>
                <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CheckCircle className="text-[var(--accent)]" /> Durable persistence
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Metrics Dashboard */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Cluster Health & Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="text-[var(--text-secondary)] mb-2">Loss</div>
                <div className="text-4xl font-bold text-[var(--text-primary)] mb-4">0.042</div>
                <div className="h-16 bg-black/5 dark:bg-white/5 rounded-lg"></div>
              </div>
              <div className="p-8 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="text-[var(--text-secondary)] mb-2">Throughput</div>
                <div className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                  4.2k tok/s
                </div>
                <div className="h-16 bg-black/5 dark:bg-white/5 rounded-lg"></div>
              </div>
              <div className="p-8 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="text-[var(--text-secondary)] mb-2">GPU Util</div>
                <div className="text-4xl font-bold text-[var(--accent)] mb-4">
                  98%
                </div>
                <div className="h-16 bg-black/5 dark:bg-white/5 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Customer Stories */}
        <section className="py-32 px-6 bg-[color:var(--bg-tertiary)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="text-[var(--accent)] font-bold mb-4">SCALE AI</div>
                <h3 className="text-2xl font-bold mb-4">
                  Running production workloads
                </h3>
                <p className="text-[var(--text-secondary)] mb-8">
                  "Modal's infrastructure allowed us to iterate on our reward
                  models 5x faster."
                </p>
                <a
                  href="#"
                  className="text-[var(--accent)] font-bold hover:underline">

                  Read case study &rarr;
                </a>
              </div>
              <div className="p-10 bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="text-[var(--accent)] font-bold mb-4">PERPLEXITY</div>
                <h3 className="text-2xl font-bold mb-4">
                  Scaling services safely
                </h3>
                <p className="text-[var(--text-secondary)] mb-8">
                  "We deploy new services daily and rely on a managed control plane
                  to keep clusters stable."
                </p>
                <a
                  href="#"
                  className="text-[var(--accent)] font-bold hover:underline">

                  Read case study &rarr;
                </a>
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
                q: 'How do I run stateful workloads?',
                a: 'Use persistent volumes and StatefulSets to keep data across restarts and reschedules.'
              },
              {
                q: 'Can I use Spot instances?',
                a: 'Yes, you can request spot capacity to reduce costs for fault-tolerant workloads.'
              },
              {
                q: 'What is the network bandwidth?',
                a: 'We provide high-bandwidth networking suitable for cluster workloads and service-to-service traffic.'
              },
              {
                q: 'Do you support custom containers?',
                a: 'Yes, you can bring your own Docker image or define one in Python.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="border border-[color:var(--border-color)] rounded-xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 transition-colors">

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
        <section className="py-40 px-6 text-center border-t border-[color:var(--border-color)] bg-[radial-gradient(circle_at_top,rgba(var(--accent-rgb),0.18),transparent_55%)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">Ship faster with Kubernetes</h2>
            <p className="text-2xl text-[var(--text-secondary)] mb-12 font-light">
              Create a cluster in minutes and scale with confidence.
            </p>
            <button className="px-10 py-5 rounded-full bg-[var(--accent)] text-white font-bold text-xl hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-[0_18px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
              Create your first cluster
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}