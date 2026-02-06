import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import {
  ArrowRight,
  Zap,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Server,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  Activity,
  Shield,
  Globe,
  Layers,
  Play,
  Lock,
  Disc3,
} from 'lucide-react';
export function InferencePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const OsLogo = ({
    name,
    sources,
  }: {
    name: string;
    sources: string[];
  }) => {
    const [hovered, setHovered] = useState(false);

    const [sourceIndex, setSourceIndex] = useState(0);
    const src = sources[Math.min(sourceIndex, sources.length - 1)] ?? '';

    return (
      <motion.img
        src={src}
        alt=""
        className="h-16 w-16 sm:h-[72px] sm:w-[72px] object-contain"
        loading="lazy"
        aria-label={name}
        title={name}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.95 }}
        viewport={{ once: true, amount: 0.6 }}
        whileHover={{ scale: 1.12, opacity: 1, x: 6 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        whileTap={{ scale: 1.06 }}
        onError={(e) => {
          if (sourceIndex < sources.length - 1) {
            setSourceIndex((i) => i + 1);
            return;
          }
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
        style={{
          filter: hovered
            ? 'drop-shadow(0 14px 34px rgba(var(--accent-rgb), 0.22)) brightness(1.06)'
            : 'drop-shadow(0 10px 30px rgba(var(--accent-rgb), 0.12))',
        }}
      />
    );
  };

  const OsTile = ({ children, label }: { children: ReactNode; label: string }) => {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        {children}
        <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">{label}</div>
      </div>
    );
  };

  const heroInstances = [
    {
      id: 'vx1-4-16',
      family: 'VX1',
      name: 'Compute Optimized',
      label: 'vx1-c4',
      tagline: 'Great for low-latency services and throughput-sensitive workers.',
      vcpus: '4 vCPUs',
      memory: '16 GB',
      storage: '160 GB NVMe',
      bandwidth: '6.00 TB',
      price: '$0.070 / hr',
    },
    {
      id: 'vx1-8-32',
      family: 'VX1',
      name: 'Balanced Compute',
      label: 'vx1-c8',
      tagline: 'A strong default for API inference with steady load.',
      vcpus: '8 vCPUs',
      memory: '32 GB',
      storage: '320 GB NVMe',
      bandwidth: '8.00 TB',
      price: '$0.140 / hr',
    },
    {
      id: 'vx1-16-64',
      family: 'VX1',
      name: 'High Concurrency',
      label: 'vx1-c16',
      tagline: 'Room for more parallel requests and larger caches.',
      vcpus: '16 vCPUs',
      memory: '64 GB',
      storage: '640 GB NVMe',
      bandwidth: '10.00 TB',
      price: '$0.280 / hr',
    },
  ];
  const [heroInstanceId, setHeroInstanceId] = useState(heroInstances[0].id);
  const heroInstance = heroInstances.find((x) => x.id === heroInstanceId) ?? heroInstances[0];

  const aiInstances = [
    {
      name: 'Realtime Inference',
      tagline: 'Streaming endpoints with predictable P95 latency.',
      gpu: 'L4',
      vcpus: '16 vCPUs',
      memory: '64 GB',
      vram: '24 GB',
      price: '$0.000222 / sec',
      chips: ['Streaming', 'Autoscale', 'Low latency'],
    },
    {
      name: 'High Throughput',
      tagline: 'Batching + concurrency for high QPS workloads.',
      gpu: 'A10',
      vcpus: '24 vCPUs',
      memory: '96 GB',
      vram: '24 GB',
      price: '$0.000306 / sec',
      chips: ['Batching', 'High QPS', 'Cost efficient'],
    },
    {
      name: 'Long Context',
      tagline: 'KV-cache heavy workloads and longer prompts.',
      gpu: 'A100',
      vcpus: '32 vCPUs',
      memory: '192 GB',
      vram: '80 GB',
      price: '$0.000694 / sec',
      chips: ['Long context', 'High VRAM', 'Stable SLA'],
    },
  ];

  const nvidiaInstances = [
    {
      name: 'NVIDIA T4',
      note: 'Standard inference + light training',
      gpu: 'T4',
      vcpus: '8 vCPUs',
      memory: '32 GB',
      vram: '16 GB',
      price: '$0.000164 / sec',
    },
    {
      name: 'NVIDIA L4',
      note: 'Balanced inference + multimodal',
      gpu: 'L4',
      vcpus: '16 vCPUs',
      memory: '64 GB',
      vram: '24 GB',
      price: '$0.000222 / sec',
    },
    {
      name: 'NVIDIA A10',
      note: 'Fine-tuning + graphics workloads',
      gpu: 'A10',
      vcpus: '24 vCPUs',
      memory: '96 GB',
      vram: '24 GB',
      price: '$0.000306 / sec',
    },
    {
      name: 'NVIDIA A100',
      note: 'LLM training + large inference',
      gpu: 'A100',
      vcpus: '32 vCPUs',
      memory: '192 GB',
      vram: '80 GB',
      price: '$0.000694 / sec',
    },
    {
      name: 'NVIDIA H100',
      note: 'Highest throughput + frontier models',
      gpu: 'H100',
      vcpus: '48 vCPUs',
      memory: '384 GB',
      vram: '80 GB',
      price: '$0.001097 / sec',
    },
  ];

  const InstanceCard = ({
    title,
    subtitle,
    gpu,
    vcpus,
    memory,
    vram,
    price,
    chips,
  }: {
    title: string;
    subtitle?: string;
    gpu: string;
    vcpus: string;
    memory: string;
    vram: string;
    price: string;
    chips?: string[];
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6 transition-colors hover:border-[rgba(var(--accent-rgb),0.55)]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute -top-20 -left-20 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.16)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-bold">{title}</div>
            {subtitle ? (
              <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{subtitle}</div>
            ) : null}
          </div>
          <div className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)] whitespace-nowrap">
            {gpu}
          </div>
        </div>

        {chips?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((c) => (
              <div
                key={c}
                className="rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]"
              >
                {c}
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3">
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">vCPU</div>
            <div className="mt-1 text-sm font-semibold flex items-center gap-2">
              <Cpu size={16} className="text-[color:var(--accent)]" />
              {vcpus}
            </div>
          </div>
          <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3">
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">Memory</div>
            <div className="mt-1 text-sm font-semibold flex items-center gap-2">
              <MemoryStick size={16} className="text-[color:var(--accent)]" />
              {memory} RAM
            </div>
          </div>
          <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3">
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">Storage</div>
            <div className="mt-1 text-sm font-semibold flex items-center gap-2">
              <HardDrive size={16} className="text-[color:var(--accent)]" />
              NVMe
            </div>
          </div>
          <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3">
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">VRAM</div>
            <div className="mt-1 text-sm font-semibold flex items-center gap-2">
              <Server size={16} className="text-[color:var(--accent)]" />
              {vram} VRAM
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">Starting at</div>
            <div className="mt-1 font-mono text-sm font-bold text-[color:var(--accent)]">{price}</div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
          >
            Deploy <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] selection:bg-[color:var(--accent)] selection:text-black font-sans">
      <Nav />

      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-28 -left-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                <div className="absolute -bottom-28 -right-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:56px_56px]" />
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                    <Zap size={14} className="text-[color:var(--accent)]" />
                    Inference
                  </div>

                  <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                    Deploy <span className="text-[color:var(--accent)]">low-latency</span> inference
                    <br />
                    on elastic GPU compute
                  </h1>
                  <p className="mt-5 text-base md:text-lg text-[color:var(--text-secondary)] leading-relaxed">
                    Ship streaming endpoints with fast cold starts, predictable P95 latency, and per-second billing.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                    >
                      Deploy endpoint
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                    >
                      View docs
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6 md:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                      <div className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                    </div>

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">INSTANCE PREVIEW</div>
                          <div className="mt-2 text-lg font-bold">{heroInstance.name}</div>
                          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                            {heroInstance.tagline}
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                          <Server size={14} className="text-[color:var(--accent)]" />
                          {heroInstance.family}
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                        {heroInstances.map((x) => {
                          const active = x.id === heroInstanceId;
                          return (
                            <button
                              key={x.id}
                              type="button"
                              onClick={() => setHeroInstanceId(x.id)}
                              className={
                                'shrink-0 rounded-2xl border px-4 py-3 text-left transition-colors ' +
                                (active
                                  ? 'border-[rgba(var(--accent-rgb),0.55)] bg-[rgba(var(--accent-rgb),0.10)]'
                                  : 'border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.35)]')
                              }
                            >
                              <div className="text-sm font-semibold">{x.label}</div>
                              <div className="mt-1 text-xs text-[color:var(--text-secondary)]">{x.price}</div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {[{ k: 'vCPUs', v: heroInstance.vcpus, I: Cpu }, { k: 'Memory', v: heroInstance.memory, I: MemoryStick }, { k: 'NVMe', v: heroInstance.storage, I: HardDrive }, { k: 'Bandwidth', v: heroInstance.bandwidth, I: Server }].map((x) => (
                          <div
                            key={x.k}
                            className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                          >
                            <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">{x.k}</div>
                            <div className="mt-1 text-sm font-semibold flex items-center gap-2">
                              <x.I size={16} className="text-[color:var(--accent)]" />
                              {x.v}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">From</div>
                          <div className="mt-1 font-mono text-sm font-bold text-[color:var(--accent)]">{heroInstance.price}</div>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                        >
                          Configure <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Metrics Grid */}
        <section className="py-24 px-6 border-y border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
              {
                label: 'Cold Start',
                value: '< 500ms',
                desc: 'For optimized containers'
              },
              {
                label: 'Autoscaling',
                value: 'Instant',
                desc: '0 to 1000+ GPUs'
              },
              {
                label: 'Pricing',
                value: 'Per-second',
                desc: 'No idle costs'
              },
              {
                label: 'Uptime',
                value: '99.99%',
                desc: 'Enterprise SLA'
              }].
              map((stat, i) =>
              <div key={i} className="text-center md:text-left group">
                  <div className="text-4xl font-bold mb-2 group-hover:text-[color:var(--accent)] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[color:var(--accent)] font-medium mb-2 uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                  <div className="text-sm text-[color:var(--text-secondary)]">{stat.desc}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SUPPORTS OS</div>
                <h2 className="mt-2 text-3xl font-bold">Supports OS</h2>
              </div>
            </div>

            <div className="mt-14 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
              {[
                { name: 'Ubuntu', slugs: ['ubuntu'], color: '#E95420' },
                { name: 'Debian', slugs: ['debian'], color: '#A81D33' },
                { name: 'CentOS', slugs: ['centos'], color: '#262577' },
                { name: 'Fedora', slugs: ['fedora'], color: '#51A2DA' },
                { name: 'Arch', slugs: ['archlinux'], color: '#1793D1' },
                { name: 'Alpine', slugs: ['alpinelinux'], color: '#0D597F' },
                { name: 'Windows', slugs: ['microsoftwindows', 'windows11', 'windows'], color: '#0078D4' },
                { name: 'FreeBSD', slugs: ['freebsd'], color: '#AB2B28' },
                { name: 'Red Hat', slugs: ['redhat'], color: '#EE0000' },
                { name: 'SUSE', slugs: ['opensuse'], color: '#73BA25' },
              ].map((os) => {
                const hex = os.color.replace('#', '');
                const sources = os.slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${hex}`);
                if (os.name === 'Windows') {
                  const fallbackSvg = `data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#${hex}" d="M4 7.2 21 4.6v16.3H4V7.2zm0 20.9h17v16.3L4 41.8V28.1zm19 0h21v17.1L23 42.9V28.1zm0-23.8L44 1.9V20.9H23V4.3z"/></svg>`
                  )}`;
                  sources.push(fallbackSvg);
                }
                return (
                  <OsTile key={os.name} label={os.name}>
                    <OsLogo name={os.name} sources={sources} />
                  </OsTile>
                );
              })}

              <OsTile label="Custom OS">
                <motion.div
                  className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.95 }}
                  viewport={{ once: true, amount: 0.6 }}
                  whileHover={{ scale: 1.08, opacity: 1, x: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Disc3 size={28} className="text-[color:var(--text-secondary)]" />
                </motion.div>
              </OsTile>
            </div>
          </div>
        </section>

        {/* 3. Live Demo */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Live Compute Demo</h2>
              <p className="text-[color:var(--text-secondary)]">
                Experience the speed of provisioning and scaling firsthand.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-6xl mx-auto"
            >
              <div className="absolute inset-y-0 left-0 w-16 pointer-events-none bg-[linear-gradient(90deg,var(--bg-primary),transparent)]" />
              <div className="absolute inset-y-0 right-0 w-16 pointer-events-none bg-[linear-gradient(270deg,var(--bg-primary),transparent)]" />

              <div className="flex gap-3 overflow-x-auto pb-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { t: 'Batch summarization runner', I: Cpu },
                  { t: 'GPU warm-start test', I: Zap },
                  { t: 'Prompt evaluation harness', I: Code2 },
                  { t: 'Latency baseline suite', I: Clock },
                  { t: 'Streaming chat endpoint', I: Server },
                ].map((x) => (
                  <motion.div
                    key={x.t}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="shrink-0 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] flex items-center justify-center">
                        <x.I size={16} className="text-[color:var(--accent)]" />
                      </div>
                      <div className="text-sm font-semibold whitespace-nowrap">{x.t}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.03 }}
              className="mt-10 max-w-6xl mx-auto"
            >
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">CREATE INSTANCE</div>
                    <div className="mt-2 text-2xl font-bold">From size → running workload</div>
                    <div className="mt-2 text-[color:var(--text-secondary)]">
                      A simple flow that mirrors how teams provision compute for inference.
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-2 text-xs font-semibold text-[color:var(--text-secondary)]">
                    <CheckCircle size={14} className="text-[color:var(--accent)]" />
                    2–3 minutes
                  </div>
                </div>

                <div className="mt-8 relative">
                  <div className="hidden md:block pointer-events-none absolute left-6 right-6 top-1/2 -translate-y-1/2">
                    <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.35),transparent)]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      {
                        t: 'Choose a size',
                        d: 'Pick vCPU + RAM for your workload.',
                        I: Server,
                      },
                      {
                        t: 'Attach storage',
                        d: 'Use NVMe for fast reads and caching.',
                        I: HardDrive,
                      },
                      {
                        t: 'Deploy image',
                        d: 'Bring your runtime and dependencies.',
                        I: Code2,
                      },
                      {
                        t: 'Scale & observe',
                        d: 'Autoscale and keep P95 stable.',
                        I: Activity,
                      },
                    ].map((x) => (
                      <motion.div
                        key={x.t}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="relative rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5"
                      >
                        <div className="hidden md:block pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2">
                          <div className="h-4 w-4 rounded-full border border-[rgba(var(--accent-rgb),0.55)] bg-[color:var(--bg-primary)] shadow-[0_12px_40px_rgba(var(--accent-rgb),0.18)]" />
                        </div>
                        <div className="flex items-center gap-2 font-semibold">
                          <x.I size={18} className="text-[color:var(--accent)]" />
                          {x.t}
                        </div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.d}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mt-10 relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 max-w-4xl mx-auto shadow-[0_30px_90px_rgba(0,0,0,0.22)]"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.12)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                <div className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
              </div>

              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Enter a prompt..."
                  className="flex-1 bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-2xl px-5 py-3 text-[color:var(--text-primary)] focus:border-[color:var(--accent)] outline-none"
                  defaultValue="Explain quantum computing to a 5 year old" />

                <button
                  type="button"
                  className="px-7 py-3 rounded-2xl bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors"
                >
                  Generate
                </button>
              </div>

              <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6 min-h-[220px] text-[color:var(--text-secondary)] font-mono text-sm leading-relaxed">
                <span className="text-[color:var(--accent)] animate-pulse">▋</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4 text-xs text-[color:var(--text-secondary)]">
                <span>Model: Llama 3 70B</span>
                <span>Latency: 124ms</span>
              </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. Features */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Feature Instances</h2>
              <p className="text-[color:var(--text-secondary)]">
                Choose a profile, then size for VRAM, bandwidth, and tail latency.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">AI INSTANCES</div>
                    <div className="mt-2 text-2xl font-bold">Defaults built for inference</div>
                    <div className="mt-2 text-[color:var(--text-secondary)]">
                      Pick based on traffic shape, context length, and SLA.
                    </div>
                  </div>
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <Zap size={22} className="text-[color:var(--accent)]" />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4">
                  {aiInstances.map((x) => (
                    <InstanceCard
                      key={x.name}
                      title={x.name}
                      subtitle={x.tagline}
                      gpu={x.gpu}
                      vcpus={x.vcpus}
                      memory={x.memory}
                      vram={x.vram}
                      price={x.price}
                      chips={x.chips}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">NVIDIA INSTANCES</div>
                    <div className="mt-2 text-2xl font-bold">Choose the GPU family</div>
                    <div className="mt-2 text-[color:var(--text-secondary)]">
                      Match VRAM and bandwidth to your model and concurrency.
                    </div>
                  </div>
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                    <Server size={22} className="text-[color:var(--accent)]" />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {nvidiaInstances.map((x) => (
                    <InstanceCard
                      key={x.name}
                      title={x.name}
                      subtitle={x.note}
                      gpu={x.gpu}
                      vcpus={x.vcpus}
                      memory={x.memory}
                      vram={x.vram}
                      price={x.price}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
                <div>
                  <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">SIZING GUIDE</div>
                  <h2 className="mt-3 text-3xl font-bold">Match the bottleneck to the instance</h2>
                  <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                    Most inference surprises come from KV cache growth, memory bandwidth limits, and batching decisions.
                  </p>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        t: 'Fit VRAM first',
                        d: 'Weights + KV cache + overhead must stay on GPU for stable latency.',
                        I: MemoryStick,
                      },
                      {
                        t: 'Then bandwidth',
                        d: 'Decode is often memory-bound; faster HBM raises tokens/sec.',
                        I: HardDrive,
                      },
                      {
                        t: 'Protect P95',
                        d: 'Tune batching + concurrency to keep tail latency under load.',
                        I: Clock,
                      },
                    ].map((x) => (
                      <div
                        key={x.t}
                        className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-5"
                      >
                        <div className="flex items-center gap-2 font-semibold">
                          <x.I size={18} className="text-[color:var(--accent)]" />
                          {x.t}
                        </div>
                        <div className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">{x.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
                  <div className="text-sm font-semibold text-[color:var(--text-tertiary)]">QUICK CHECK</div>
                  <div className="mt-2 text-xl font-bold">Before you deploy</div>
                  <div className="mt-5 space-y-3">
                    {[
                      'Estimate KV cache from context length + concurrency.',
                      'Pick GPU family by VRAM, then validate tokens/sec.',
                      'Set batching limits for your P95 SLA.',
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
          </div>
        </section>

        {/* 5. Supported Models */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Run any model</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
              'Llama 3',
              'Mistral 7B',
              'Stable Diffusion XL',
              'Whisper v3',
              'CodeLlama',
              'Falcon 180B',
              'Mixtral 8x7B',
              'Custom Models'].
              map((model) =>
              <motion.div
                key={model}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="p-6 border border-[color:var(--border-color)] rounded-2xl bg-[color:var(--bg-secondary)] flex items-center gap-4 hover:border-[rgba(var(--accent-rgb),0.55)] transition-colors group cursor-default"
              >
                <CheckCircle
                  size={20}
                  className="text-[color:var(--accent)] group-hover:scale-110 transition-transform"
                />

                <span className="font-medium text-[color:var(--text-primary)] text-lg">
                  {model}
                </span>
              </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 6. Architecture Diagram */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">How it works</h2>
            <div className="max-w-4xl mx-auto bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Simplified CSS Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
                {(
                  [
                    { t: 'Compute Instance', I: Server },
                    { t: 'Network & Firewall', I: Shield },
                    { t: 'Global Network', I: Layers },
                    { t: 'Public Internet', I: Globe },
                    { t: 'TLS + Auth', I: Lock },
                  ] as const
                ).map((step, idx, arr) => (
                  <div key={step.t} className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="p-4 bg-[color:var(--bg-secondary)] rounded-2xl border border-[color:var(--border-color)] w-32 hover:border-[rgba(var(--accent-rgb),0.55)] transition-colors"
                    >
                      <step.I className="mx-auto mb-3 text-[color:var(--accent)]" size={26} />
                      <div className="font-bold text-xs leading-tight">{step.t}</div>
                    </motion.div>
                    {idx < arr.length - 1 ? (
                      <ArrowRight className="text-[color:var(--text-secondary)] hidden md:block" />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>
          </div>
        </section>

        {/* 7. Integration */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">OpenAI-compatible API</h2>
              <p className="text-xl text-[color:var(--text-secondary)] mb-8 leading-relaxed">
                Expose your models via a standard REST API that works with
                existing tools and libraries. Simply add the{' '}
                <code className="bg-[color:var(--bg-secondary)] px-2 py-1 rounded text-[color:var(--accent)] text-sm border border-[color:var(--border-color)]">
                  @web_endpoint
                </code>{' '}
                decorator.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-[color:var(--text-primary)] text-lg">
                  <div className="w-8 h-8 rounded-full bg-[rgba(var(--accent-rgb),0.10)] flex items-center justify-center text-[color:var(--accent)] border border-[color:var(--border-color)]">
                    <CheckCircle size={18} />
                  </div>
                  Works with LangChain, LlamaIndex, etc.
                </li>
                <li className="flex items-center gap-4 text-[color:var(--text-primary)] text-lg">
                  <div className="w-8 h-8 rounded-full bg-[rgba(var(--accent-rgb),0.10)] flex items-center justify-center text-[color:var(--accent)] border border-[color:var(--border-color)]">
                    <CheckCircle size={18} />
                  </div>
                  Streaming support out of the box
                </li>
                <li className="flex items-center gap-4 text-[color:var(--text-primary)] text-lg">
                  <div className="w-8 h-8 rounded-full bg-[rgba(var(--accent-rgb),0.10)] flex items-center justify-center text-[color:var(--accent)] border border-[color:var(--border-color)]">
                    <CheckCircle size={18} />
                  </div>
                  Custom authentication and rate limiting
                </li>
              </ul>
            </div>
            <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-3xl p-8 font-mono text-sm shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
              <pre className="text-[color:var(--text-secondary)]">
                <code>
                  <span className="text-[color:var(--accent)]">@app.function</span>(){'\n'}
                  <span className="text-[color:var(--accent)]">@modal.web_endpoint</span>
                  (method=<span className="text-yellow-300">"POST"</span>){'\n'}
                  <span className="text-[color:var(--accent)]">def</span>{' '}
                  <span className="text-blue-400">inference</span>(item: Item):
                  {'\n'}
                  {'    '}return model.generate(item.prompt)
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 8. Cost Calculator */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold">
              Instance pricing comparison
            </h2>
            <div className="mt-3 text-[color:var(--text-secondary)] max-w-2xl">
              Compare a similar CPU instance footprint across common providers. Rates vary by region and commitment.
            </div>

            {(() => {
              const hoursPerMonth = 730;
              const perMonth = (hourly: number) => `$${(hourly * hoursPerMonth).toFixed(2)} / mo`;

              const providers = [
                { k: '1cng', name: '1CNG', note: 'Recommended', accent: true },
                { k: 'aws', name: 'AWS', note: 'Comparable', accent: false },
                { k: 'do', name: 'DigitalOcean', note: 'Comparable', accent: false },
                { k: 'z', name: 'Z.com', note: 'Comparable', accent: false },
              ] as const;

              const rows = [
                {
                  label: 'VM Small',
                  values: {
                    '1cng': { price: perMonth(0.035), meta: '2 vCPU, 8 GB RAM' },
                    aws: { price: `From ${perMonth(0.07)}`, meta: '2 vCPU, 8 GB RAM (varies)' },
                    do: { price: `From ${perMonth(0.06)}`, meta: '2 vCPU, 8 GB RAM (Basic)' },
                    z: { price: `From ${perMonth(0.06)}`, meta: '2 vCPU, 8 GB RAM' },
                  } as const,
                },
                {
                  label: 'VM Medium',
                  values: {
                    '1cng': { price: perMonth(0.07), meta: '4 vCPU, 16 GB RAM' },
                    aws: { price: `From ${perMonth(0.14)}`, meta: '4 vCPU, 16 GB RAM (varies)' },
                    do: { price: `From ${perMonth(0.12)}`, meta: '4 vCPU, 16 GB RAM (Basic)' },
                    z: { price: `From ${perMonth(0.12)}`, meta: '4 vCPU, 16 GB RAM' },
                  } as const,
                },
                {
                  label: 'VM Large',
                  values: {
                    '1cng': { price: perMonth(0.14), meta: '8 vCPU, 32 GB RAM' },
                    aws: { price: `From ${perMonth(0.28)}`, meta: '8 vCPU, 32 GB RAM (varies)' },
                    do: { price: `From ${perMonth(0.24)}`, meta: '8 vCPU, 32 GB RAM (Basic)' },
                    z: { price: `From ${perMonth(0.24)}`, meta: '8 vCPU, 32 GB RAM' },
                  } as const,
                },
                {
                  label: 'Block Storage',
                  values: {
                    '1cng': { price: 'Included', meta: 'NVMe / attached storage' },
                    aws: { price: 'Varies', meta: 'EBS (per GB-month)' },
                    do: { price: 'From $10.00 / mo', meta: '100 GB volume' },
                    z: { price: 'Varies', meta: 'per GB-month' },
                  } as const,
                },
                {
                  label: 'Free egress allowance',
                  values: {
                    '1cng': { price: 'Included', meta: 'Depends on plan' },
                    aws: { price: 'Limited', meta: 'Depends on service' },
                    do: { price: 'Included', meta: 'Plan-dependent' },
                    z: { price: 'Varies', meta: 'Region-dependent' },
                  } as const,
                },
              ] as const;

              return (
                <div className="mt-10">
                  <table className="w-full table-fixed border-collapse text-left bg-[color:var(--bg-primary)]">
                    <colgroup>
                      <col style={{ width: '28%' }} />
                      {providers.map((p) => (
                        <col key={p.k} style={{ width: `${72 / providers.length}%` }} />
                      ))}
                    </colgroup>
                    <thead className="bg-[color:var(--bg-secondary)]">
                      <tr className="border-b border-[color:var(--border-color)]">
                        <th className="px-4 md:px-6 py-4 text-sm font-semibold text-[color:var(--text-primary)]">
                          Example configuration
                        </th>
                        {providers.map((p) => (
                          <th key={p.k} className="px-4 md:px-6 py-4">
                            <div className="font-semibold text-[color:var(--text-primary)]">{p.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr
                          key={row.label}
                          className="group border-b border-[color:var(--border-color)] last:border-b-0 transition-colors hover:bg-[rgba(var(--accent-rgb),0.06)]"
                        >
                          <td className="px-4 md:px-6 py-5">
                            <div className="text-sm font-medium text-[color:var(--text-primary)]">{row.label}</div>
                          </td>
                          {providers.map((p) => {
                            const cell = row.values[p.k];
                            return (
                              <td key={p.k} className="px-4 md:px-6 py-5 align-top">
                                <div className="text-sm font-medium text-[color:var(--text-primary)] transition-colors group-hover:text-[color:var(--accent)]">
                                  {cell.price}
                                </div>
                                <div className="mt-1 text-xs text-[color:var(--text-secondary)] leading-relaxed">
                                  {cell.meta}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}

            <div className="mt-10 border-t border-[color:var(--border-color)] pt-10">
              <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[color:var(--border-color)]">
                <div className="md:pr-10">
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">WHAT YOU GET</div>
                  <div className="mt-3 text-xl font-bold">Built for inference economics</div>
                  <div className="mt-5 grid gap-3 text-sm text-[color:var(--text-secondary)]">
                    {[
                      'Scale-to-zero defaults for spiky workloads.',
                      'Simple instance families tuned for latency.',
                      'Transparent pricing you can reason about.',
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-[color:var(--accent)] mt-0.5" />
                        <div>{t}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:pl-10">
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--text-tertiary)]">NEXT STEP</div>
                  <div className="mt-3 text-xl font-bold">Compare with your workload</div>
                  <div className="mt-3 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    Share your traffic shape and model sizes and we’ll propose an instance mix and scaling plan.
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] hover:underline underline-offset-4"
                    >
                      Contact sales
                      <ArrowRight size={16} />
                    </a>
                    <div className="text-sm text-[color:var(--text-tertiary)]">Updated rates available on request</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Watch the tutorial</h2>
              <p className="text-[color:var(--text-secondary)]">
                Learn how to deploy a production-ready inference endpoint.
              </p>
            </div>
            <div className="aspect-video bg-[color:var(--bg-secondary)] rounded-3xl border border-[color:var(--border-color)] flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="w-24 h-24 bg-[color:var(--accent)] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(var(--accent-rgb),0.30)]">
                <Play size={40} className="text-white ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 10. Monitoring Dashboard */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-3xl p-4 shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
              {/* Mock Chart */}
              <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-[color:var(--border-color)]">
                {[40, 60, 45, 70, 85, 60, 75, 50, 65, 80].map((h, i) =>
                <div
                  key={i}
                  className="w-full bg-[rgba(var(--accent-rgb),0.18)] rounded-t-sm hover:bg-[rgba(var(--accent-rgb),0.55)] transition-colors"
                  style={{
                    height: `${h}%`
                  }} />

                )}
              </div>
              <div className="flex justify-between text-xs text-[color:var(--text-secondary)] mt-2 px-4">
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">
                Real-time observability
              </h2>
              <p className="text-xl text-[color:var(--text-secondary)] mb-8">
                Monitor throughput, latency, and error rates in real-time. Drill
                down into individual request logs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[color:var(--text-primary)]">
                  <Activity className="text-[color:var(--accent)]" /> Live metric streaming
                </li>
                <li className="flex items-center gap-3 text-[color:var(--text-primary)]">
                  <Activity className="text-[color:var(--accent)]" /> Structured logging
                </li>
                <li className="flex items-center gap-3 text-[color:var(--text-primary)]">
                  <Activity className="text-[color:var(--accent)]" /> Custom alerts
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 11. Security */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Secure by design</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[color:var(--bg-secondary)] rounded-3xl border border-[color:var(--border-color)]">
                <Shield className="mx-auto mb-6 text-[color:var(--accent)]" size={32} />
                <h3 className="text-xl font-bold mb-4">
                  End-to-End Encryption
                </h3>
                <p className="text-[color:var(--text-secondary)]">
                  Data is encrypted in transit and at rest.
                </p>
              </div>
              <div className="p-8 bg-[color:var(--bg-secondary)] rounded-3xl border border-[color:var(--border-color)]">
                <Lock className="mx-auto mb-6 text-[color:var(--accent)]" size={32} />
                <h3 className="text-xl font-bold mb-4">Private Networking</h3>
                <p className="text-[color:var(--text-secondary)]">Connect securely to your VPC.</p>
              </div>
              <div className="p-8 bg-[color:var(--bg-secondary)] rounded-3xl border border-[color:var(--border-color)]">
                {/* <Users className="mx-auto mb-6 text-[color:var(--accent)]" size={32} /> */}
                <h3 className="text-xl font-bold mb-4">RBAC</h3>
                <p className="text-[color:var(--text-secondary)]">
                  Fine-grained access controls for your team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Case Studies */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 bg-[color:var(--bg-primary)] rounded-3xl border border-[color:var(--border-color)]">
                <div className="text-[color:var(--accent)] font-bold mb-4">RAMP</div>
                <h3 className="text-2xl font-bold mb-4">
                  Scaling OCR to millions of documents
                </h3>
                <p className="text-[color:var(--text-secondary)] mb-8">
                  "We reduced our invoice processing costs by 70% while
                  improving accuracy."
                </p>
                <a
                  href="#"
                  className="text-[color:var(--accent)] font-bold hover:underline">

                  Read case study &rarr;
                </a>
              </div>
              <div className="p-10 bg-[color:var(--bg-primary)] rounded-3xl border border-[color:var(--border-color)]">
                <div className="text-[color:var(--accent)] font-bold mb-4">SUBSTACK</div>
                <h3 className="text-2xl font-bold mb-4">
                  Personalized recommendations at scale
                </h3>
                <p className="text-[color:var(--text-secondary)] mb-8">
                  "Modal enabled us to deploy a complex recommendation engine in
                  days, not months."
                </p>
                <a
                  href="#"
                  className="text-[color:var(--accent)] font-bold hover:underline">

                  Read case study &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Migration Guide */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Migrating from SageMaker?
            </h2>
            <div className="bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-8 mb-8 border-b border-[color:var(--border-color)] pb-8">
                <div>
                  <h4 className="font-bold mb-4 text-red-400">SageMaker</h4>
                  <ul className="space-y-2 text-[color:var(--text-secondary)] text-sm">
                    <li>• Complex configuration</li>
                    <li>• Slow deployment times</li>
                    <li>• Expensive idle instances</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-[color:var(--accent)]">Modal</h4>
                  <ul className="space-y-2 text-[color:var(--text-secondary)] text-sm">
                    <li>• Pure Python definition</li>
                    <li>• Instant deployment</li>
                    <li>• Scale to zero</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <button className="text-[color:var(--text-primary)] font-bold hover:text-[color:var(--accent)] transition-colors">
                  View migration guide &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 14. API Reference Preview */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Developer-first API
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-[color:var(--bg-primary)] rounded-2xl border border-[color:var(--border-color)] font-mono text-sm">
                <div className="text-[color:var(--accent)] mb-2">modal.App</div>
                <p className="text-[color:var(--text-secondary)]">
                  Define your application and its resources.
                </p>
              </div>
              <div className="p-6 bg-[color:var(--bg-primary)] rounded-2xl border border-[color:var(--border-color)] font-mono text-sm">
                <div className="text-[color:var(--accent)] mb-2">modal.Image</div>
                <p className="text-[color:var(--text-secondary)]">
                  Define container environments in code.
                </p>
              </div>
              <div className="p-6 bg-[color:var(--bg-primary)] rounded-2xl border border-[color:var(--border-color)] font-mono text-sm">
                <div className="text-[color:var(--accent)] mb-2">modal.Volume</div>
                <p className="text-[color:var(--text-secondary)]">
                  Persist data across function calls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 15. FAQ */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">FAQ</h2>
            <div className="space-y-4">
              {[
              {
                q: 'How fast are cold starts?',
                a: 'For most models, cold starts are under 1 second. We use a custom container runtime and file system to achieve this.'
              },
              {
                q: 'Do you support streaming?',
                a: 'Yes, Modal supports streaming responses for both HTTP endpoints and internal function calls.'
              },
              {
                q: 'Can I use private models?',
                a: 'Yes, you can load models from private Hugging Face repos or your own secure storage.'
              },
              {
                q: 'What about custom dependencies?',
                a: 'You can install any pip package or system dependency directly in your image definition.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="border border-[color:var(--border-color)] rounded-2xl bg-[color:var(--bg-secondary)] overflow-hidden hover:border-[rgba(var(--accent-rgb),0.35)] transition-colors">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ?
                  <ChevronUp size={20} className="text-[color:var(--accent)]" /> :

                  <ChevronDown size={20} className="text-[color:var(--text-secondary)]" />
                  }
                  </button>
                  <div
                  className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>

                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-[color:var(--text-secondary)] leading-relaxed border-t border-[color:var(--border-color)] pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 16. CTA */}
        <section className="py-40 px-6 text-center border-t border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">
              Start deploying in minutes
            </h2>
            <p className="text-2xl text-[color:var(--text-secondary)] mb-12 font-light">
              Get $30 in free credits every month. No credit card required to
              start.
            </p>
            <button className="px-10 py-5 rounded-full bg-[color:var(--accent)] text-white font-bold text-xl hover:opacity-95 transition-all hover:scale-105 shadow-[0_0_30px_rgba(var(--accent-rgb),0.30)]">
              Deploy your first model
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>);

}