import { forwardRef, useRef, useState, type RefObject } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedBeam } from "../components/AnimatedBeam";
import uiDark from "../assets/images/UI Dark Thmes.png";
import uiLight from "../assets/images/UI Light Thmes.png";
import mptLogo from "../assets/images/mpt.png";
import htiLogo from "../assets/images/hti.png";
import atomLogo from "../assets/images/Atom.png";
import mmixLogo from "../assets/images/mmix-b.png";
import oneCngLogo from "../assets/images/1clodung.png";
import globalNetLogo from "../assets/images/GlobalNet.svg";
import ayarnetLogo from "../assets/images/ayarnet.jpg";
import { newsPosts } from "./eventNewsData";
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

const ConnectivityCircle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={
        "z-10 flex items-center justify-center rounded-full border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.55)] transition-transform duration-200 ease-out will-change-transform group-hover:scale-[1.04] group-focus-visible:scale-[1.04] " +
        (className ?? "")
      }
    >
      {children}
    </div>
  );
});

ConnectivityCircle.displayName = "ConnectivityCircle";
export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredConnectivityNode, setHoveredConnectivityNode] = useState<string | null>(null);
  const { theme } = useTheme();

  const connectivityContainerRef = useRef<HTMLDivElement>(null);
  const internetRef = useRef<HTMLDivElement>(null);
  const globalnetRef = useRef<HTMLDivElement>(null);
  const mptRef = useRef<HTMLDivElement>(null);
  const htiRef = useRef<HTMLDivElement>(null);
  const atomRef = useRef<HTMLDivElement>(null);
  const mmixRef = useRef<HTMLDivElement>(null);
  const localAsRef = useRef<HTMLDivElement>(null);
  const iaasRef = useRef<HTMLDivElement>(null);

  const connectivityNodeRefById: Partial<Record<string, RefObject<HTMLDivElement>>> = {
    internet: internetRef,
    globalnet: globalnetRef,
    mpt: mptRef,
    hti: htiRef,
    atom: atomRef,
    mmix: mmixRef,
    'local-as': localAsRef,
    iaas: iaasRef,
  };

  const connectivityNodeLogoById: Record<string, string> = {
    mpt: mptLogo,
    hti: htiLogo,
    atom: atomLogo,
    mmix: mmixLogo,
    globalnet: globalNetLogo,
    iaas: oneCngLogo,
    'local-as': ayarnetLogo,
  };

  const formatViews = (views: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(views);
    } catch {
      return String(views);
    }
  };
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
      x: 500,
      y: 575,
      label: "1CNG",
      sublabel: "IaaS",
      tone: "primary" as const,
      desc: "Your workloads run on 1CNG infrastructure with predictable performance and private networking controls.",
    },
    {
      id: "local-as",
      x: 500,
      y: 395,
      label: "Local",
      sublabel: "AS",
      tone: "accent" as const,
      desc: "Local routing domain that aggregates uplinks and enforces policy for low-latency paths.",
    },
    {
      id: "globalnet",
      x: 170,
      y: 240,
      label: "GlobalNet",
      sublabel: "",
      tone: "primary" as const,
      desc: "Tier-1 backbone connectivity for high availability and long-haul performance.",
    },
    {
      id: "mpt",
      x: 350,
      y: 240,
      label: "MPT",
      sublabel: "",
      tone: "primary" as const,
      desc: "Multi-uplink provider for redundancy and fast convergence during failures.",
    },
    {
      id: "atom",
      x: 650,
      y: 240,
      label: "ATOM",
      sublabel: "",
      tone: "primary" as const,
      desc: "Peering and transit blend optimized for real-time workloads and burst traffic.",
    },
    {
      id: "hti",
      x: 500,
      y: 240,
      label: "HTI",
      sublabel: "",
      tone: "primary" as const,
      desc: "High-throughput interconnect path for bulk egress and large model artifacts.",
    },
    {
      id: "mmix",
      x: 830,
      y: 240,
      label: "MMIX",
      sublabel: "",
      tone: "primary" as const,
      desc: "Regional uplink mix that improves locality and reduces tail latency.",
    },
    {
      id: "internet",
      x: 500,
      y: 92,
      label: "Internet",
      sublabel: "",
      tone: "primary" as const,
      desc: "Global public endpoints reach your applications through multi-provider paths.",
    },
  ];

  type ConnectivityEdge = { from: string; to: string; dir: 'single' | 'both' };
  const connectivityEdges: ConnectivityEdge[] = [
    { from: "internet", to: "globalnet", dir: "single" as const },
    { from: "internet", to: "mpt", dir: "single" as const },
    { from: "internet", to: "hti", dir: "single" as const },
    { from: "internet", to: "atom", dir: "single" as const },
    { from: "internet", to: "mmix", dir: "single" as const },
    { from: "globalnet", to: "local-as", dir: "single" as const },
    { from: "mpt", to: "local-as", dir: "single" as const },
    { from: "hti", to: "local-as", dir: "single" as const },
    { from: "atom", to: "local-as", dir: "single" as const },
    { from: "mmix", to: "local-as", dir: "single" as const },
    { from: "local-as", to: "iaas", dir: "single" as const },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-black font-sans transition-colors duration-300">
      <Nav />

      <main>
        <style>{`
          @keyframes eventNewsMarquee {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .eventNewsMarquee {
            animation: eventNewsMarquee 70s linear infinite;
            will-change: transform;
          }
        `}</style>
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

        <section className="relative px-6 py-3 bg-[color:var(--bg-secondary)] border-y border-[var(--border-color)] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(var(--accent-rgb),0.06),transparent)]" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="relative overflow-hidden">
              <div className="eventNewsMarquee flex min-w-max items-center gap-12 pr-12 text-xs sm:text-sm">
                {[...newsPosts, ...newsPosts].map((p, idx) => (
                  <div key={`${p.slug}-${idx}`} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="font-medium text-[color:var(--text-secondary)]">{p.title}</span>
                    <Link
                      to={`/resources/events/news/${p.slug}`}
                      className="font-semibold text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors"
                      aria-label={`View ${p.title}`}
                    >
                      {formatViews(p.views)} views
                    </Link>
                    <span className="mx-2 h-1 w-1 rounded-full bg-[color:var(--border-color)]" />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(to_right,var(--bg-secondary),transparent)]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(to_left,var(--bg-secondary),transparent)]" />
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
          className={`relative overflow-hidden pt-24 pb-24 px-6 text-[color:var(--text-primary)] ${
            theme === 'dark'
              ? 'bg-[color:var(--bg-tertiary)]'
              : 'bg-[color:var(--bg-primary)]'
          }`}
          style={{
            ['--net-rgb' as any]: '255,255,255',
            ['--net-local-rgb' as any]: '255,255,255',
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute inset-0 ${
                theme === 'dark'
                  ? 'bg-[radial-gradient(circle_at_18%_35%,rgba(var(--net-rgb),0.02),transparent_58%)]'
                  : 'bg-[radial-gradient(circle_at_18%_35%,rgba(var(--net-rgb),0.10),transparent_58%)]'
              }`}
            />
            <div
              className={`absolute inset-0 ${
                theme === 'dark'
                  ? 'bg-[radial-gradient(circle_at_78%_35%,rgba(var(--net-rgb),0.015),transparent_56%)]'
                  : 'bg-[radial-gradient(circle_at_78%_35%,rgba(var(--net-rgb),0.08),transparent_56%)]'
              }`}
            />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div
                className={`text-sm font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white/70' : 'text-[color:var(--text-secondary)]'
                }`}
              >
                Network Connectivity
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">1CNG Network Connectivity</h2>
              <p
                className={`text-lg md:text-xl mb-8 leading-relaxed ${
                  theme === 'dark' ? 'text-white/70' : 'text-[color:var(--text-secondary)]'
                }`}
              >
                Multi-uplink routing with redundant providers to keep traffic flowing with low latency and fast failover.
              </p>

              <div className="flex flex-wrap gap-3">
                <div
                  className={`px-4 py-2 rounded-full backdrop-blur-sm text-sm ${
                    theme === 'dark'
                      ? 'bg-white/10 text-white/75'
                      : 'bg-black/5 text-[color:var(--text-secondary)]'
                  }`}
                >
                  Local AS policies
                </div>
                <div
                  className={`px-4 py-2 rounded-full backdrop-blur-sm text-sm ${
                    theme === 'dark'
                      ? 'bg-white/10 text-white/75'
                      : 'bg-black/5 text-[color:var(--text-secondary)]'
                  }`}
                >
                  Multi-provider transit
                </div>
                <div
                  className={`px-4 py-2 rounded-full backdrop-blur-sm text-sm ${
                    theme === 'dark'
                      ? 'bg-white/10 text-white/75'
                      : 'bg-black/5 text-[color:var(--text-secondary)]'
                  }`}
                >
                  Real-time failover {'–'} Live topology
                </div>
              </div>
            </div>

            <div className="mt-12 relative overflow-hidden rounded-3xl bg-[#07070a] ring-1 ring-white/10">
                <style>{`@keyframes cng-beam{to{stroke-dashoffset:-320}}@keyframes cng-beam-rev{to{stroke-dashoffset:320}}`}</style>
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_26%_40%,rgba(255,255,255,0.10),transparent_62%)]"
                  />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_76%_46%,rgba(255,255,255,0.08),transparent_60%)]"
                  />
                </div>

                <div className="relative p-6 md:p-8">
                  <div
                    className="relative w-full h-[460px] sm:h-[500px] md:h-[560px] lg:h-[620px]"
                    ref={connectivityContainerRef}
                  >
                    {connectivityEdges.map((e, idx) => {
                      const fromRef = connectivityNodeRefById[e.from];
                      const toRef = connectivityNodeRefById[e.to];
                      if (!fromRef || !toRef) return null;

                      const isLocalAsToIaas = e.from === 'local-as' && e.to === 'iaas';

                      const baseCurvature =
                        (e.from === 'local-as' && e.to === 'iaas') ||
                        (e.from === 'internet' && e.to === 'hti')
                          ? 0
                          : e.from === 'local-as' || e.to === 'local-as'
                            ? 0.22
                            : 0.18;
                      const duration = 3.1 + (idx % 3) * 0.25;
                      const delay = (idx % 6) * 0.12;

                      return (
                        <AnimatedBeam
                          key={`${e.from}-${e.to}-${idx}`}
                          containerRef={connectivityContainerRef}
                          fromRef={fromRef}
                          toRef={toRef}
                          duration={isLocalAsToIaas ? 3.8 : duration}
                          delay={delay}
                          curvature={baseCurvature}
                          dashArray={isLocalAsToIaas ? '6 10' : undefined}
                          pingPong={isLocalAsToIaas ? false : true}
                          reverse={isLocalAsToIaas ? true : undefined}
                          beamOpacity={isLocalAsToIaas ? 0.92 : undefined}
                          baseOpacity={isLocalAsToIaas ? 0.22 : undefined}
                          beamWidth={isLocalAsToIaas ? 1.8 : undefined}
                          className="z-0"
                        />
                      );
                    })}

                    {connectivityNodes.map((n) => {
                      const isHovered = hoveredConnectivityNode === n.id;
                      const logoSrc = connectivityNodeLogoById[n.id];
                      const nodeKind =
                        n.id === 'iaas'
                          ? ('iaas' as const)
                          : n.id === 'local-as'
                            ? ('local' as const)
                          : n.id === 'internet'
                              ? ('internet' as const)
                              : ('provider' as const);
                      const wrapperClass =
                        `absolute -translate-x-1/2 -translate-y-1/2 ${isHovered ? 'z-50' : 'z-10'}`;
                      const nodeBaseClass = 'relative h-16 w-16 md:h-20 md:w-20';
                      const circleSkinClass = 'border-black/10 bg-white';
                      const circleHoverClass = isHovered
                        ? theme === 'dark'
                          ? 'border-[rgba(var(--accent-rgb),0.45)]'
                          : 'border-[rgba(var(--accent-rgb),0.35)]'
                        : '';
                      const internetStroke = 'rgba(0,0,0,0.72)';
                      const internetFill = 'rgba(0,0,0,0.04)';
                      const internetText = 'rgba(0,0,0,0.78)';

                      return (
                        <div
                          key={n.id}
                          className={wrapperClass}
                          style={{ left: `${(n.x / 1000) * 100}%`, top: `${(n.y / 600) * 100}%` }}
                          onMouseEnter={() => setHoveredConnectivityNode(n.id)}
                          onMouseLeave={() =>
                            setHoveredConnectivityNode((prev) =>
                              prev === n.id ? null : prev
                            )
                          }
                        >
                          <button
                            type="button"
                            onFocus={() => setHoveredConnectivityNode(n.id)}
                            onBlur={() => setHoveredConnectivityNode((prev) => (prev === n.id ? null : prev))}
                            className="group"
                            aria-label={`${n.label} ${n.sublabel}`.trim()}
                          >
                            <div className="flex flex-col items-center">

                              <ConnectivityCircle
                                className={`${nodeBaseClass} ${circleSkinClass} ${circleHoverClass} ${
                                  'p-3 md:p-3.5'
                                }`}
                                ref={connectivityNodeRefById[n.id]}
                              >
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
                                      fill={internetFill}
                                      stroke={internetStroke}
                                      strokeWidth="2"
                                      strokeLinejoin="round"
                                    />
                                    <text
                                      x="32"
                                      y="41"
                                      textAnchor="middle"
                                      fontSize="12"
                                      fontWeight="700"
                                      fill={internetText}
                                    >
                                      Internet
                                    </text>
                                  </svg>
                                ) : logoSrc ? (
                                  <img
                                    src={logoSrc}
                                    alt={n.label}
                                    className={`relative z-10 block object-contain max-h-full max-w-full ${
                                      n.id === 'iaas' || n.id === 'local-as'
                                        ? 'h-9 w-14 md:h-10 md:w-16'
                                        : 'h-8 w-10 md:h-9 md:w-12'
                                    }`}
                                    loading="lazy"
                                    draggable={false}
                                  />
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
                                      fill="rgba(var(--net-rgb),0.10)"
                                      stroke="rgba(var(--net-rgb),0.95)"
                                      strokeWidth="2"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M32 8v28l20-10M32 36 12 26"
                                      fill="none"
                                      stroke="rgba(var(--net-rgb),0.65)"
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
                              </ConnectivityCircle>

                              {nodeKind !== 'provider' && nodeKind !== 'internet' ? (
                                <div className="mt-3 text-center">
                                  <div className="text-sm font-bold leading-tight text-white">
                                    {n.label}
                                  </div>
                                  {n.sublabel ? (
                                    <div className="text-xs font-semibold text-white/70">{n.sublabel}</div>
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
                                className="pointer-events-none absolute left-1/2 bottom-full -translate-x-1/2 mb-4 w-[220px] rounded-2xl backdrop-blur-xl px-3.5 py-3 shadow-[0_18px_55px_rgba(0,0,0,0.50)] z-30 bg-black/65 ring-1 ring-white/10"
                              >
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                  {n.label}
                                  {n.sublabel ? ` ${n.sublabel}` : ""}
                                </div>
                                <div className="mt-1.5 text-[13px] leading-relaxed text-white/70">
                                  {n.desc}
                                </div>
                                <div
                                  className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-black/65 ring-1 ring-white/10"
                                />
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 text-xs text-white/60">
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
