import { useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import uiDark from "../assets/images/UI Dark Thmes.png";
import uiLight from "../assets/images/UI Light Thmes.png";
import {
  Terminal,
  Cpu,
  Zap,
  Lock,
  Globe,
  Database,
  ChevronDown,
  ChevronUp,
  Check,
  Play,
  Users,
  Shield,
  Layers,
} from "lucide-react";
export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredConnectivityNode, setHoveredConnectivityNode] = useState<string | null>(null);
  const { theme } = useTheme();
  const faqs = [
    {
      q: "How does billing work?",
      a: "You only pay for the compute you use, measured in seconds. There are no idle costs or upfront fees.",
    },
    {
      q: "Can I use my own AWS/GCP account?",
      a: "Modal runs in its own cloud. You don't need to connect your own cloud provider account.",
    },
    {
      q: "What GPUs are available?",
      a: "We offer Nvidia H100s, A100s (40GB/80GB), A10Gs, L4s, and T4s.",
    },
    {
      q: "Is Modal secure?",
      a: "Yes. Every function runs in a gVisor-sandboxed container with strict isolation guarantees. We are SOC 2 Type II compliant.",
    },
  ];

  const connectivityNodes = [
    {
      id: "iaas",
      x: 120,
      y: 270,
      label: "1CNG",
      sublabel: "IaaS",
      tone: "primary" as const,
      desc: "Your workloads run on 1CNG infrastructure with predictable performance and private networking controls.",
    },
    {
      id: "local-as",
      x: 330,
      y: 270,
      label: "Local",
      sublabel: "AS",
      tone: "accent" as const,
      desc: "Local routing domain that aggregates uplinks and enforces policy for low-latency paths.",
    },
    {
      id: "globalnet",
      x: 650,
      y: 88,
      label: "GlobalNet",
      sublabel: "",
      tone: "primary" as const,
      desc: "Tier-1 backbone connectivity for high availability and long-haul performance.",
    },
    {
      id: "mpt",
      x: 650,
      y: 182,
      label: "MPT",
      sublabel: "",
      tone: "primary" as const,
      desc: "Multi-uplink provider for redundancy and fast convergence during failures.",
    },
    {
      id: "atom",
      x: 650,
      y: 276,
      label: "ATOM",
      sublabel: "",
      tone: "primary" as const,
      desc: "Peering and transit blend optimized for real-time workloads and burst traffic.",
    },
    {
      id: "hti",
      x: 650,
      y: 370,
      label: "HTI",
      sublabel: "",
      tone: "primary" as const,
      desc: "High-throughput interconnect path for bulk egress and large model artifacts.",
    },
    {
      id: "mmix",
      x: 650,
      y: 464,
      label: "MMIX",
      sublabel: "",
      tone: "primary" as const,
      desc: "Regional uplink mix that improves locality and reduces tail latency.",
    },
    {
      id: "internet",
      x: 920,
      y: 270,
      label: "Internet",
      sublabel: "",
      tone: "primary" as const,
      desc: "Global public endpoints reach your applications through multi-provider paths.",
    },
  ];

  const connectivityEdges = [
    { from: "iaas", to: "local-as", dir: "both" as const },
    { from: "local-as", to: "globalnet", dir: "both" as const },
    { from: "local-as", to: "mpt", dir: "both" as const },
    { from: "local-as", to: "atom", dir: "both" as const },
    { from: "local-as", to: "hti", dir: "both" as const },
    { from: "local-as", to: "mmix", dir: "both" as const },
    { from: "globalnet", to: "internet", dir: "both" as const },
    { from: "mpt", to: "internet", dir: "both" as const },
    { from: "atom", to: "internet", dir: "both" as const },
    { from: "hti", to: "internet", dir: "both" as const },
    { from: "mmix", to: "internet", dir: "both" as const },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-black font-sans transition-colors duration-300">
      <Nav />

      <main>
        {/* 1. Hero Section */}
        <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(var(--accent-rgb),0.12)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)] pointer-events-none transition-colors duration-300" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(var(--accent-rgb),0.22)_1px,transparent_1px)] [background-size:44px_44px] [background-position:0_0] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.05]">
              AI infrastructure that
              <br />
              developers{' '}
              <span className="text-[var(--accent)]">
                love
              </span>
            </h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
              Run inference, training, and batch processing with sub-second cold
              starts, instant autoscaling, and a developer experience that feels
              local.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors shadow-[0_0_22px_rgba(var(--accent-rgb),0.16)]"
              >
                Get Started
              </button>
              <button className="px-6 py-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-sm hover:bg-[rgba(var(--accent-rgb),0.06)] transition-colors">
                Contact Us
              </button>
            </div>
          </div>

          {/* Hero Visual - Code Block */}
          <div className="mt-16 flex justify-center relative">
            <div className="relative w-full max-w-5xl">
              <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.14),transparent_60%)] blur-2xl" />
              <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.10),transparent_65%)] blur-xl" />
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="ui-preview-frame relative rounded-3xl bg-[rgba(0,0,0,0.08)] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={theme === 'dark' ? uiDark : uiLight}
                  alt="Product UI"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Customer Logos */}
        <section className="py-10 border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-[var(--text-tertiary)] mb-8 uppercase tracking-wider font-semibold">
              Trusted by engineering teams at
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                "Ramp",
                "Substack",
                "Scale",
                "Vercel",
                "Replit",
                "Perplexity",
              ].map((name) => (
                <div
                  key={name}
                  className="text-2xl font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 px-6 bg-[#050505] border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for modern teams who need speed, reliability, and real-time visibility — without the ops burden.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Instant autoscaling',
                  desc: 'Scale from zero to peak traffic automatically — no pre-provisioning, no guesswork.'
                },
                {
                  icon: Shield,
                  title: 'Secure by default',
                  desc: 'Strong isolation boundaries and best-practice controls for production workloads.'
                },
                {
                  icon: Globe,
                  title: 'Global performance',
                  desc: 'Low-latency networking designed for real-time inference and data movement.'
                },
                {
                  icon: Lock,
                  title: 'Predictable costs',
                  desc: 'Pay for what you use and track usage clearly — with no hidden overhead.'
                },
                {
                  icon: Cpu,
                  title: 'GPU access on demand',
                  desc: 'Run H100/A100-class compute when you need it — without capacity planning.'
                },
                {
                  icon: Layers,
                  title: 'Real-time visibility',
                  desc: 'See what is running, what changed, and what to fix next — instantly.'
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden p-8 group hover:border-[#00ff88]/45 hover:shadow-[0_18px_60px_rgba(0,0,0,0.55)] transition-all"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-35 group-hover:opacity-55 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/4 to-transparent opacity-50" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[1px] rotate-45 blur-[0.5px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.16),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[1px] -rotate-45 blur-[0.5px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.16),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[8px] rotate-45 blur-[14px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.07),transparent)]" />
                    <div className="absolute left-[-35%] top-1/2 w-[170%] h-[8px] -rotate-45 blur-[14px] bg-[linear-gradient(90deg,transparent,rgba(0,255,136,0.07),transparent)]" />
                  </div>

                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center mb-6 text-[#00ff88] group-hover:scale-110 transition-transform shadow-inner">
                      <item.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Features Grid */}
        <section className="py-32 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured Products
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                From prototype to production, Modal provides the primitives to
                build scalable AI applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Cloud Compute",
                  desc: "Deploy powerful virtual machines in seconds with scalable resources to meet your business needs.",
                },
                {
                  icon: Globe,
                  title: "Kubernetes",
                  desc: "Automate deployment, scaling, and management of containerized applications with our fully managed Kubernetes service.",
                },
                {
                  icon: Lock,
                  title: "Load Balancer",
                  desc: "Distribute traffic efficiently across multiple instances to ensure high availability and optimal performance.",
                },
                {
                  icon: Database,
                  title: "Block Storage",
                  desc: "Attach high-performance, scalable storage to your cloud instances for flexible data management.",
                },
                {
                  icon: Terminal,
                  title: "Local Dev Experience",
                  desc: "Develop against the cloud as if it were your laptop. Hot reloading included.",
                },
                {
                  icon: Cpu,
                  title: "Any GPU, Instantly",
                  desc: "Access H100s, A100s, and more without quotas or capacity planning.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mb-6 text-[#00ff88] group-hover:scale-110 transition-transform shadow-inner">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* 3.1 Service Reliability – Built for Uptime */}
        <section className="py-32 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
               Service Reliability – Built for Uptime
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Fully Redundant Architecture",
                  desc: "Our cloud is designed with multiple failover mechanisms, ensuring no single point of failure.",
                },
                {
                  icon: Globe,
                  title: "High Availability Design",
                  desc: "Our cloud infrastructure is engineered for 24/7 reliability, ensuring seamless operations even during peak demand. We guarantee 99.95% uptime, minimizing disruptions and keeping your business online.",
                },
                {
                  icon: Lock,
                  title: "Offsite Backup & Data Protection",
                  desc: "Your critical data is securely backed up at an offsite location, minimizing risks and ensuring fast recovery.",
                },
                {
                  icon: Database,
                  title: "Seamless Connectivity with Multi-Uplinks",
                  desc: "Multiple network uplinks provide high-speed, uninterrupted sconnectivity for optimal performance.",
                },
                {
                  icon: Terminal,
                  title: "Local Dev Experience",
                  desc: "Develop against the cloud as if it were your laptop. Hot reloading included.",
                },
                {
                  icon: Cpu,
                  title: "Any GPU, Instantly",
                  desc: "Access H100s, A100s, and more without quotas or capacity planning.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mb-6 text-[#00ff88] group-hover:scale-110 transition-transform shadow-inner">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Demo Section */}
        <section
          className="relative overflow-hidden pt-24 pb-24 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]"
          style={{ ['--net-rgb' as any]: '56,189,248', ['--net-local-rgb' as any]: '250,204,21' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(var(--net-rgb),0.10),transparent_58%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(var(--net-rgb),0.08),transparent_56%)]" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(var(--net-rgb),0.16)_1px,transparent_1px)] [background-size:56px_56px]" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(var(--net-rgb),0.10)] text-[rgba(var(--net-rgb),0.95)] font-semibold text-sm mb-6 border border-[rgba(var(--net-rgb),0.22)]">
                Network Connectivity
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">1CNG Network Connectivity</h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                Multi-uplink routing with redundant providers to keep traffic flowing with low latency and fast failover.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-full border border-[var(--border-color)] bg-[color:var(--bg-primary)] text-sm text-[var(--text-secondary)]">
                  Local AS policies
                </div>
                <div className="px-4 py-2 rounded-full border border-[var(--border-color)] bg-[color:var(--bg-primary)] text-sm text-[var(--text-secondary)]">
                  Multi-provider transit
                </div>
                <div className="px-4 py-2 rounded-full border border-[var(--border-color)] bg-[color:var(--bg-primary)] text-sm text-[var(--text-secondary)]">
                  Real-time failover {'–'} Live topology
                </div>
              </div>
            </div>

            <div className="mt-12 relative rounded-3xl border border-[var(--border-color)] bg-[color:var(--bg-primary)] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
                <style>{`@keyframes cng-flow{to{stroke-dashoffset:-60}}@keyframes cng-flow-rev{to{stroke-dashoffset:60}}`}</style>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(var(--net-rgb),0.18),transparent_58%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.10),transparent_55%)]" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(var(--net-rgb),0.22)_1px,transparent_1px)] [background-size:46px_46px]" />
                </div>

                <div className="relative p-6 md:p-12">
                  <div className="relative w-full h-[420px] sm:h-[460px] md:h-[520px] lg:h-[600px]">
                    <svg
                      viewBox="0 0 1000 520"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      <defs>
                        <marker
                          id="cng-arrow"
                          viewBox="0 0 10 10"
                          refX="9"
                          refY="5"
                          markerWidth="7"
                          markerHeight="7"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill={`rgba(var(--net-rgb),0.92)`} />
                        </marker>
                      </defs>

                      {connectivityEdges.map((e, idx) => {
                        const from = connectivityNodes.find((n) => n.id === e.from);
                        const to = connectivityNodes.find((n) => n.id === e.to);
                        if (!from || !to) return null;
                        const dx = to.x - from.x;
                        const dy = to.y - from.y;
                        const len = Math.max(1, Math.hypot(dx, dy));
                        const ux = dx / len;
                        const uy = dy / len;
                        const offset = 12;
                        const sx = from.x + ux * 54;
                        const sy = from.y + uy * 54;
                        const tx = to.x - ux * 54;
                        const ty = to.y - uy * 54;
                        const ox = -uy * offset;
                        const oy = ux * offset;
                        const pathA = `M ${sx + ox} ${sy + oy} L ${tx + ox} ${ty + oy}`;
                        const pathB = `M ${tx - ox} ${ty - oy} L ${sx - ox} ${sy - oy}`;

                        return (
                          <g key={`${e.from}-${e.to}-${idx}`}>
                            <path
                              d={pathA}
                              fill="none"
                              stroke={`rgba(var(--net-rgb),0.18)`}
                              strokeWidth={3}
                              strokeLinecap="round"
                            />
                            <path
                              d={pathA}
                              fill="none"
                              stroke={`rgba(var(--net-rgb),0.78)`}
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeDasharray="10 10"
                              markerEnd="url(#cng-arrow)"
                              style={{ animation: "cng-flow 1.05s linear infinite" }}
                            />
                            {e.dir === "both" ? (
                              <>
                                <path
                                  d={pathB}
                                  fill="none"
                                  stroke={`rgba(var(--net-rgb),0.16)`}
                                  strokeWidth={3}
                                  strokeLinecap="round"
                                />
                                <path
                                  d={pathB}
                                  fill="none"
                                  stroke={`rgba(var(--net-rgb),0.62)`}
                                  strokeWidth={3}
                                  strokeLinecap="round"
                                  strokeDasharray="10 10"
                                  markerEnd="url(#cng-arrow)"
                                  style={{ animation: "cng-flow-rev 1.05s linear infinite" }}
                                />
                              </>
                            ) : null}
                          </g>
                        );
                      })}
                    </svg>

                    {connectivityNodes.map((n) => {
                      const isHovered = hoveredConnectivityNode === n.id;
                      const isAccent = n.tone === "accent";
                      const nodeKind =
                        n.id === 'iaas'
                          ? ('iaas' as const)
                          : n.id === 'local-as'
                            ? ('local' as const)
                            : n.id === 'internet'
                              ? ('internet' as const)
                              : ('provider' as const);
                      const wrapperClass =
                        "absolute -translate-x-1/2 -translate-y-1/2";
                      const circleClass =
                        "relative h-28 w-28 md:h-32 md:w-32 rounded-full border flex items-center justify-center transition-all" +
                        (isHovered
                          ? " shadow-[0_18px_60px_rgba(var(--net-rgb),0.20)]"
                          : "");
                      const borderClass = isHovered
                        ? "border-[rgba(var(--net-rgb),0.78)]"
                        : "border-[var(--border-color)]";
                      const fillClass = isAccent
                        ? "bg-[radial-gradient(circle_at_30%_25%,rgba(var(--net-local-rgb),0.60),rgba(var(--net-local-rgb),0.16)_52%,rgba(0,0,0,0)_100%)]"
                        : "bg-[radial-gradient(circle_at_30%_25%,rgba(var(--net-rgb),0.48),rgba(var(--net-rgb),0.12)_52%,rgba(0,0,0,0)_100%)]";

                      return (
                        <div
                          key={n.id}
                          className={wrapperClass}
                          style={{ left: `${(n.x / 1000) * 100}%`, top: `${(n.y / 520) * 100}%` }}
                        >
                          <button
                            type="button"
                            onMouseEnter={() => setHoveredConnectivityNode(n.id)}
                            onMouseLeave={() => setHoveredConnectivityNode((prev) => (prev === n.id ? null : prev))}
                            onFocus={() => setHoveredConnectivityNode(n.id)}
                            onBlur={() => setHoveredConnectivityNode((prev) => (prev === n.id ? null : prev))}
                            className="group"
                            aria-label={`${n.label} ${n.sublabel}`.trim()}
                          >
                            <div className="flex flex-col items-center">
                              {nodeKind === 'provider' ? (
                                <div className="mb-2 text-[11px] font-bold tracking-wide px-4 py-1 rounded-full bg-black/60 text-white border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                                  {n.label}
                                </div>
                              ) : null}

                              <div
                                className={`${circleClass} ${borderClass} ${fillClass} ${
                                  nodeKind === 'internet' ? 'rounded-[32px]' : ''
                                }`}
                              >
                                <div className="absolute inset-2 rounded-full bg-[color:var(--bg-primary)]/55 backdrop-blur-sm" />

                                {nodeKind === 'internet' ? (
                                  <svg
                                    width="62"
                                    height="62"
                                    viewBox="0 0 64 64"
                                    className="relative"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M22 45h26c6 0 10-4 10-10s-4-10-10-10h-2C44 18 38 14 31 14c-8 0-15 6-16 14h-1C8 28 4 32 4 38s4 7 8 7h10z"
                                      fill="rgba(var(--net-rgb),0.25)"
                                      stroke="rgba(var(--net-rgb),0.85)"
                                      strokeWidth="2"
                                      strokeLinejoin="round"
                                    />
                                    <text
                                      x="32"
                                      y="40"
                                      textAnchor="middle"
                                      fontSize="11"
                                      fontWeight="700"
                                      fill="rgba(var(--text-primary),0.92)"
                                    >
                                      Internet
                                    </text>
                                  </svg>
                                ) : nodeKind === 'iaas' ? (
                                  <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 64 64"
                                    className="relative"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M32 8 12 18v28l20 10 20-10V18L32 8z"
                                      fill="rgba(var(--net-rgb),0.18)"
                                      stroke="rgba(var(--net-rgb),0.85)"
                                      strokeWidth="2"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M32 8v28l20-10M32 36 12 26"
                                      fill="none"
                                      stroke="rgba(var(--net-rgb),0.55)"
                                      strokeWidth="2"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="38"
                                    height="38"
                                    viewBox="0 0 24 24"
                                    className="relative"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M12 3v18M3 12h18M7 7l-4 4 4 4M17 7l4 4-4 4M7 17l4 4 4-4"
                                      stroke={
                                        nodeKind === 'local'
                                          ? 'rgba(var(--net-local-rgb),0.95)'
                                          : 'rgba(var(--net-rgb),0.92)'
                                      }
                                      strokeWidth="1.9"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      fill="none"
                                    />
                                  </svg>
                                )}
                              </div>

                              {nodeKind !== 'provider' && nodeKind !== 'internet' ? (
                                <div className="mt-3 text-center">
                                  <div className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                                    {n.label}
                                  </div>
                                  {n.sublabel ? (
                                    <div className="text-xs font-semibold text-[var(--text-secondary)]">{n.sublabel}</div>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isHovered ? (
                              <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="absolute left-1/2 top-[-14px] -translate-x-1/2 -translate-y-full w-[240px] rounded-2xl border border-[var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3 shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
                              >
                                <div className="text-xs font-bold text-[rgba(var(--net-rgb),0.95)]">{n.label}{n.sublabel ? ` ${n.sublabel}` : ""}</div>
                                <div className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{n.desc}</div>
                                <div className="absolute left-1/2 bottom-[-6px] h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-[var(--border-color)] bg-[color:var(--bg-secondary)]" />
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 text-xs text-[var(--text-secondary)]">
                    Hover a node to see details. Arrows animate continuously to represent real-time routing flows.
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* 5. Technical Architecture */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              This isn add more content
            </p>
          </div>
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent rounded-3xl -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Financial Services</h3>
                <p className="text-gray-400">
                  Secure and compliant cloud solutions for banking, fintech, and financial applications.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center relative top-12">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Healthcare & Life Sciences</h3>
                <p className="text-gray-400">
                 Reliable infrastructure for patient data management, medical applications, and research analytics.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">E-Commerce & Retail</h3>
                <p className="text-gray-400">
                  Fast, secure, and scalable hosting for online stores, inventory management, and payment processing.
                </p>
              </div>
            </div>
          </div>
           <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent rounded-3xl -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Gaming & Entertainment</h3>
                <p className="text-gray-400">
                  Low-latency cloud infrastructure for online gaming, streaming platforms, and content delivery.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center relative top-12">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Manufacturing & Logistics</h3>
                <p className="text-gray-400">
                  Optimize operations with cloud-based ERP, supply chain management, and IoT applications.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Education & E-Learning</h3>
                <p className="text-gray-400">
                  Seamless cloud solutions for virtual classrooms, learning management systems, and EdTech platforms.
                </p>
              </div>
            </div>
          </div>
        </section>




        {/* 6. Comparison Table */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Why developers choose Modal
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-gray-400 font-medium">
                      Feature
                    </th>
                    <th className="py-6 px-4 text-[#00ff88] font-bold text-xl">
                      Modal
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium">
                      AWS Lambda
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium">
                      GCP Cloud Run
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Cold Start Time",
                      modal: "< 1s",
                      aws: "5-10s",
                      gcp: "5-10s",
                    },
                    {
                      feature: "GPU Support",
                      modal: "H100, A100, A10G",
                      aws: "Limited",
                      gcp: "Limited",
                    },
                    {
                      feature: "Max Execution Time",
                      modal: "Unlimited",
                      aws: "15 min",
                      gcp: "60 min",
                    },
                    {
                      feature: "Local Dev Experience",
                      modal: "Native",
                      aws: "Complex",
                      gcp: "Complex",
                    },
                    {
                      feature: "Storage",
                      modal: "Network Volumes",
                      aws: "EFS (Slow)",
                      gcp: "NFS (Slow)",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-6 px-4 font-medium">{row.feature}</td>
                      <td className="py-6 px-4 text-white font-bold">
                        {row.modal}
                      </td>
                      <td className="py-6 px-4 text-gray-500">{row.aws}</td>
                      <td className="py-6 px-4 text-gray-500">{row.gcp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. ROI Calculator */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-8">Calculate your savings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-[#111] rounded-xl">
                <div className="text-gray-400 mb-2">Current Spend</div>
                <div className="text-3xl font-bold">$10,000</div>
              </div>
              <div className="p-6 bg-[#111] rounded-xl">
                <div className="text-gray-400 mb-2">Modal Cost</div>
                <div className="text-3xl font-bold text-[#00ff88]">$4,000</div>
              </div>
              <div className="p-6 bg-[#111] rounded-xl">
                <div className="text-gray-400 mb-2">Savings</div>
                <div className="text-3xl font-bold text-white">60%</div>
              </div>
            </div>
            <p className="text-gray-400 mb-8">
              Based on typical inference workloads migrating from EC2.
            </p>
            <button className="text-[#00ff88] font-bold hover:underline">
              View detailed breakdown &rarr;
            </button>
          </div>
        </section>

        {/* 8. Integration Ecosystem */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Integrates with your stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60">
              {[
                "Hugging Face",
                "LangChain",
                "LlamaIndex",
                "Weights & Biases",
                "GitHub",
                "Docker",
                "Python",
                "Pytorch",
                "TensorFlow",
                "FastAPI",
                "Ray",
                "Kubernetes",
              ].map((name) => (
                <div
                  key={name}
                  className="h-16 bg-[#111] rounded-lg flex items-center justify-center font-bold text-gray-400 hover:text-white hover:opacity-100 transition-all cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Video Walkthrough */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">See it in action</h2>
              <p className="text-gray-400">
                Watch how to deploy a Llama 3 inference endpoint in 3 minutes.
              </p>
            </div>
            <div className="aspect-video bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
              <div className="w-20 h-20 bg-[#00ff88] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-lg">
                <Play size={32} className="text-black ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* 10. Community Projects */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Built by the community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Turbo Art",
                  author: "modal-labs",
                  desc: "Real-time AI art generation with SDXL Turbo.",
                },
                {
                  title: "Doc Chatter",
                  author: "alex-smith",
                  desc: "Chat with your PDF documents using RAG.",
                },
                {
                  title: "Video Subtitler",
                  author: "sarah-j",
                  desc: "Auto-generate subtitles using Whisper.",
                },
              ].map((project, i) => (
                <div
                  key={i}
                  className="p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#00ff88] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Users size={16} /> {project.author}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#00ff88] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Security Certifications */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
              Enterprise-grade security
            </h2>
            <div className="flex flex-wrap justify-center gap-12 items-center">
              <div className="px-8 py-4 bg-[#111] rounded-xl border border-white/10 font-bold text-xl text-gray-300">
                SOC 2 Type II
              </div>
              <div className="px-8 py-4 bg-[#111] rounded-xl border border-white/10 font-bold text-xl text-gray-300">
                HIPAA Compliant
              </div>
              <div className="px-8 py-4 bg-[#111] rounded-xl border border-white/10 font-bold text-xl text-gray-300">
                GDPR Ready
              </div>
            </div>
          </div>
        </section>

        {/* 12. Performance Benchmarks */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Unmatched performance</h2>
              <p className="text-xl text-gray-400 mb-8">
                Our optimized container runtime delivers cold starts up to 10x
                faster than standard Docker containers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-[#00ff88]" /> 500ms cold starts
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-[#00ff88]" /> 100Gbps networking
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-[#00ff88]" /> NVMe SSD storage
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Modal</span>
                    <span className="text-[#00ff88]">0.8s</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00ff88] w-[10%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>AWS Lambda</span>
                    <span className="text-gray-400">8.5s</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700 w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>GCP Cloud Run</span>
                    <span className="text-gray-400">6.2s</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700 w-[62%]" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center">
                Cold start latency for 2GB container
              </p>
            </div>
          </div>
        </section>

        {/* 13. Migration Guide */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Migrating is easy</h2>
            <p className="text-xl text-gray-400 mb-12">
              Most teams migrate their first workload in less than an afternoon.
              No infrastructure configuration required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 border-l-2 border-[#00ff88] bg-[#0a0a0a]">
                <div className="text-[#00ff88] font-bold mb-2">Step 1</div>
                <h3 className="text-lg font-bold mb-2">Install SDK</h3>
                <p className="text-gray-400 text-sm">pip install modal</p>
              </div>
              <div className="p-6 border-l-2 border-[#00ff88] bg-[#0a0a0a]">
                <div className="text-[#00ff88] font-bold mb-2">Step 2</div>
                <h3 className="text-lg font-bold mb-2">Add Decorators</h3>
                <p className="text-gray-400 text-sm">
                  Add @app.function to your existing functions
                </p>
              </div>
              <div className="p-6 border-l-2 border-[#00ff88] bg-[#0a0a0a]">
                <div className="text-[#00ff88] font-bold mb-2">Step 3</div>
                <h3 className="text-lg font-bold mb-2">Deploy</h3>
                <p className="text-gray-400 text-sm">modal deploy app.py</p>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Testimonials */}
        <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Loved by developers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Modal is the first cloud platform that feels like it was designed for developers, not ops teams.",
                  author: "Guillermo Rauch",
                  role: "CEO, Vercel",
                },
                {
                  quote:
                    "We moved our entire inference pipeline to Modal and cut our costs by 60% while improving latency.",
                  author: "Rahul Sonwalkar",
                  role: "Founder, Julius",
                },
                {
                  quote:
                    "The ability to just write Python and have it scale to thousands of GPUs is magical.",
                  author: "Andrej Karpathy",
                  role: "AI Researcher",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-10 bg-[#0a0a0a] border border-white/10 rounded-2xl relative"
                >
                  <div className="absolute top-8 left-8 text-[#00ff88] opacity-20 text-6xl font-serif">
                    "
                  </div>
                  <p className="text-gray-300 mb-8 leading-relaxed relative z-10 text-lg">
                    {t.quote}
                  </p>
                  <div>
                    <div className="font-bold text-white text-lg">
                      {t.author}
                    </div>
                    <div className="text-sm text-[#00ff88]">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15. FAQ */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={20} className="text-[#00ff88]" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 16. Final CTA */}
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to ship?
            </h2>
            <p className="text-2xl text-gray-400 mb-12 font-light">
              Join thousands of developers building the future of AI on Modal.
              Get $30/mo in free credits to start.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,255,136,0.4)]">
                Sign Up for Free
              </button>
              <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                Read Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
