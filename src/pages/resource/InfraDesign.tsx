import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Gauge,
  Network,
  Shield,
  Server,
  Cpu,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ResourceLayout, sectionReveal, stagger } from "./ResourceLayout";
import mptLogo from "../../assets/images/mpt.png";
import htiLogo from "../../assets/images/hti.png";
import atomLogo from "../../assets/images/Atom.png";
import mmixLogo from "../../assets/images/mmix-b.png";
import oneCngLogo from "../../assets/images/1clodung.png";
import globalNetLogo from "../../assets/images/GlobalNet.svg";
import ayarnetLogo from "../../assets/images/ayarnet.jpg";

export function InfraDesignPage() {
  const { theme } = useTheme();
  const beamColor =
    theme === "dark" ? "rgba(0, 191, 255, 0.95)" : "rgba(0, 140, 255, 0.90)";
  const beamSoft =
    theme === "dark" ? "rgba(0, 191, 255, 0.22)" : "rgba(0, 140, 255, 0.18)";

  const topologyNodes = [
    {
      id: "internet",
      label: "Internet",
      x: 500,
      y: 70,
      kind: "cloud" as const,
    },
    {
      id: "hti",
      label: "HORIZON",
      x: 170,
      y: 220,
      kind: "provider" as const,
      logoSrc: htiLogo,
    },
    {
      id: "mpt",
      label: "MPT",
      x: 340,
      y: 220,
      kind: "provider" as const,
      logoSrc: mptLogo,
    },
    {
      id: "globalnet",
      label: "GlobalNet",
      x: 500,
      y: 220,
      kind: "provider" as const,
      logoSrc: globalNetLogo,
    },
    {
      id: "atom",
      label: "ATOM",
      x: 660,
      y: 220,
      kind: "provider" as const,
      logoSrc: atomLogo,
    },
    {
      id: "mmix",
      label: "MMIX",
      x: 830,
      y: 220,
      kind: "provider" as const,
      logoSrc: mmixLogo,
    },
    {
      id: "ayarnet",
      label: "AyarNet",
      x: 500,
      y: 360,
      kind: "mid" as const,
      logoSrc: ayarnetLogo,
    },
    {
      id: "onecloud",
      label: "One Cloud",
      x: 500,
      y: 472,
      kind: "core" as const,
      logoSrc: oneCngLogo,
    },
  ];

  const topologyEdges = [
    { from: "internet", to: "hti", t: 3.4, d: 0.0 },
    { from: "internet", to: "mpt", t: 3.1, d: 0.12 },
    { from: "internet", to: "globalnet", t: 2.8, d: 0.2 },
    { from: "internet", to: "atom", t: 3.15, d: 0.16 },
    { from: "internet", to: "mmix", t: 3.55, d: 0.08 },
    { from: "hti", to: "ayarnet", t: 3.0, d: 0.18 },
    { from: "mpt", to: "ayarnet", t: 2.85, d: 0.22 },
    { from: "globalnet", to: "ayarnet", t: 2.65, d: 0.12 },
    { from: "atom", to: "ayarnet", t: 2.9, d: 0.24 },
    { from: "mmix", to: "ayarnet", t: 3.05, d: 0.16 },
    { from: "ayarnet", to: "onecloud", t: 2.6, d: 0.1 },
  ];

  return (
    <ResourceLayout
      kicker="Infrastructure"
      title="Infra Design"
      subtitle="A real-time, data center-first view of how connectivity, topology, and operations come together—designed for low latency, high availability, and rapid iteration."
      icon={Network}
      primaryCta={{ label: "Explore topology", to: "#network-topology" }}
      secondaryCta={{ label: "Jump to operations", to: "#control-room" }}
      aside={
        <div className="w-full max-w-sm rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
              <Gauge size={22} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--text-secondary)]">
                Real-time
              </div>
              <div className="mt-1 text-lg font-bold">Datacenter posture</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              "Edge routing",
              "Fabric design",
              "Observability",
              "Change control",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
              >
                {t}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
            >
              Talk to an architect
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      }
      asideClassName="w-full max-w-sm"
    >
      <style>{`
        @keyframes infra-dash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }
        @keyframes infra-pulse {
          0%, 100% { transform: scale(1); opacity: 0.65; }
          50% { transform: scale(1.10); opacity: 1; }
        }
        @keyframes infra-glow {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.95; }
        }
      `}</style>

      <section
        className="mt-14 rounded-3xl border border-[color:var(--border-color)] overflow-hidden"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg,rgba(13,22,34,0.72),rgba(10,16,26,0.86))"
              : "linear-gradient(180deg, rgba(248,250,252,1), rgba(241,245,249,0.92))",
        }}
      >
        <div className="relative p-8 md:p-12">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-36 -left-36 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]"
              style={{ opacity: theme === "dark" ? 1 : 0.25 }}
            />
            <div
              className="absolute -bottom-36 -right-36 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]"
              style={{ opacity: theme === "dark" ? 1 : 0.22 }}
            />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                Real-time Data Center
              </div>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
                Animated telemetry from edge to rack
              </h2>
              <p className="mt-4 text-[color:var(--text-secondary)] leading-relaxed">
                Visualize ingress, routing, and service health as a living
                topology. The diagram below is an animated overview—optimized
                for clarity across light and dark themes.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  { icon: Activity, label: "Live status", value: "Healthy" },
                  {
                    icon: Shield,
                    label: "Security posture",
                    value: "Hardened",
                  },
                  { icon: Server, label: "Capacity", value: "Elastic" },
                  {
                    icon: AlertTriangle,
                    label: "Alerts",
                    value: "Auto-routed",
                  },
                ].map((x) => (
                  <div
                    key={x.label}
                    className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4"
                    style={{
                      boxShadow:
                        theme === "dark"
                          ? "none"
                          : "0 18px 40px rgba(2, 6, 23, 0.06), 0 2px 8px rgba(2, 6, 23, 0.04)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--text-tertiary)]">
                        <x.icon
                          size={14}
                          className="text-[color:var(--accent)]"
                        />
                        {x.label}
                      </div>
                      <div className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                    </div>
                    <div className="mt-3 text-lg font-bold">{x.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-6 md:p-7"
              style={{
                boxShadow:
                  theme === "dark"
                    ? "none"
                    : "0 24px 70px rgba(2, 6, 23, 0.08), 0 2px 10px rgba(2, 6, 23, 0.04)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-[color:var(--text-secondary)]">
                  Real-time flow
                </div>
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]"
                  style={{ animation: "infra-glow 2.4s ease-in-out infinite" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                    style={{
                      animation: "infra-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  Streaming
                </div>
              </div>

              <div
                className="mt-5 relative h-[260px] w-full overflow-hidden rounded-2xl border border-[color:var(--border-color)]"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(180deg, rgba(15,23,42,0.55), rgba(15,23,42,0.18))"
                      : "linear-gradient(180deg, rgba(248,250,252,1), rgba(241,245,249,0.92))",
                }}
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="infra-line" x1="0" y1="0" x2="1" y2="1">
                      <stop
                        offset="0%"
                        stopColor="rgba(var(--accent-rgb),0.15)"
                      />
                      <stop
                        offset="45%"
                        stopColor="rgba(var(--accent-rgb),0.85)"
                      />
                      <stop
                        offset="100%"
                        stopColor="rgba(var(--accent-rgb),0.25)"
                      />
                    </linearGradient>
                    <marker
                      id="infra-arrow"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path
                        d="M0 0 L8 4 L0 8 Z"
                        fill="rgba(var(--accent-rgb),0.95)"
                      />
                    </marker>
                  </defs>

                  <g opacity="0.95">
                    <path
                      d="M 34 70 C 120 20 210 20 290 68"
                      fill="none"
                      stroke="rgba(var(--accent-rgb),0.22)"
                      strokeWidth="2"
                      strokeDasharray="1 10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 34 70 C 120 20 210 20 290 68"
                      fill="none"
                      stroke="url(#infra-line)"
                      strokeWidth="2.6"
                      strokeDasharray="1 8"
                      strokeLinecap="round"
                      markerEnd="url(#infra-arrow)"
                      style={{ animation: "infra-dash 3.2s linear infinite" }}
                    />

                    <path
                      d="M 34 132 C 124 160 204 164 290 132"
                      fill="none"
                      stroke="rgba(var(--accent-rgb),0.22)"
                      strokeWidth="2"
                      strokeDasharray="1 10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 34 132 C 124 160 204 164 290 132"
                      fill="none"
                      stroke="url(#infra-line)"
                      strokeWidth="2.6"
                      strokeDasharray="1 8"
                      strokeLinecap="round"
                      markerEnd="url(#infra-arrow)"
                      style={{ animation: "infra-dash 3.9s linear infinite" }}
                    />

                    <path
                      d="M 34 196 C 128 212 200 212 290 194"
                      fill="none"
                      stroke="rgba(var(--accent-rgb),0.22)"
                      strokeWidth="2"
                      strokeDasharray="1 10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 34 196 C 128 212 200 212 290 194"
                      fill="none"
                      stroke="url(#infra-line)"
                      strokeWidth="2.6"
                      strokeDasharray="1 8"
                      strokeLinecap="round"
                      markerEnd="url(#infra-arrow)"
                      style={{ animation: "infra-dash 4.5s linear infinite" }}
                    />
                  </g>
                </svg>

                <div className="absolute inset-0 p-5 grid grid-cols-3 gap-3">
                  {[
                    { t: "Edge", s: "Ingress + BGP", Icon: Network },
                    { t: "Core", s: "Fabric + LB", Icon: Server },
                    { t: "Rack", s: "Compute + Storage", Icon: Cpu },
                  ].map((x, idx) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-[color:var(--border-color)] px-4 py-3"
                      style={{
                        background:
                          theme === "dark"
                            ? "rgba(2, 6, 23, 0.32)"
                            : "rgba(255, 255, 255, 0.82)",
                        boxShadow:
                          theme === "dark"
                            ? "inset 0 1px 0 rgba(255,255,255,0.06)"
                            : "0 10px 26px rgba(2, 6, 23, 0.06)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {idx !== 0 ? (
                        <div
                          className="absolute left-[-7px] top-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full"
                          style={{
                            background:
                              theme === "dark"
                                ? "rgba(2,6,23,0.88)"
                                : "rgba(255,255,255,0.96)",
                            border:
                              theme === "dark"
                                ? "1.5px solid rgba(255,255,255,0.28)"
                                : "1.5px solid rgba(15,23,42,0.16)",
                            boxShadow:
                              theme === "dark"
                                ? "0 0 0 3px rgba(var(--accent-rgb),0.10)"
                                : "0 0 0 3px rgba(37,99,235,0.06)",
                          }}
                        >
                          <div
                            className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                              background:
                                theme === "dark"
                                  ? "rgba(var(--accent-rgb),0.95)"
                                  : "rgba(37,99,235,0.70)",
                            }}
                          />
                        </div>
                      ) : null}
                      {idx !== 2 ? (
                        <div
                          className="absolute right-[-7px] top-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full"
                          style={{
                            background:
                              theme === "dark"
                                ? "rgba(2,6,23,0.88)"
                                : "rgba(255,255,255,0.96)",
                            border:
                              theme === "dark"
                                ? "1.5px solid rgba(255,255,255,0.28)"
                                : "1.5px solid rgba(15,23,42,0.16)",
                            boxShadow:
                              theme === "dark"
                                ? "0 0 0 3px rgba(var(--accent-rgb),0.10)"
                                : "0 0 0 3px rgba(37,99,235,0.06)",
                          }}
                        >
                          <div
                            className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                              background:
                                theme === "dark"
                                  ? "rgba(var(--accent-rgb),0.95)"
                                  : "rgba(37,99,235,0.70)",
                            }}
                          />
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                          {x.t}
                        </div>
                        <x.Icon
                          size={14}
                          className="text-[color:var(--accent)]"
                        />
                      </div>
                      <div className="mt-2 text-sm font-semibold">{x.s}</div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                    style={{
                      animation: "infra-pulse 1.4s ease-in-out infinite",
                    }}
                  />
                  Latency-aware routing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="network-topology" className="mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Network topology
          </h2>
          <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
            Split view: network security & firewall policy on the left, and a
            real-time connectivity map on the right (animated dashed links).
          </p>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={sectionReveal}
            className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
          >
            <div className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold">
                    Firewall & network policy
                  </div>
                  <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
                    North/south traffic is inspected at the edge, segmented
                    across zones, and logged for audit and incident response.
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                  <Shield size={22} className="text-[color:var(--accent)]" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                {[
                  {
                    title: "Ingress zone",
                    desc: "DDoS filtering, WAF, rate limits, bot controls.",
                  },
                  {
                    title: "DMZ zone",
                    desc: "NAT gateways, L7 proxies, TLS termination.",
                  },
                  {
                    title: "Core zone",
                    desc: "Service-to-service policy, micro-segmentation.",
                  },
                ].map((x) => (
                  <div
                    key={x.title}
                    className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-5 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">{x.title}</div>
                      <div className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                    </div>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                      {x.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-7">
              <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                FLOW
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { t: "Internet", Icon: Network },
                  { t: "Firewall", Icon: Shield },
                  { t: "Services", Icon: Server },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                        {x.t}
                      </div>
                      <x.Icon
                        size={14}
                        className="text-[color:var(--accent)]"
                      />
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]">
                      <div className="h-full w-2/3 bg-[color:var(--accent)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
          >
            <div className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold">
                    Real-time connectivity map
                  </div>
                  <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
                    Internet to upstream providers, down to AyarNet, then into
                    One Cloud.
                  </p>
                </div>
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]"
                  style={{ animation: "infra-glow 2.4s ease-in-out infinite" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                    style={{
                      animation: "infra-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  Real-time
                </div>
              </div>

              <div className="mt-6 relative h-[380px] w-full rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative h-full max-w-full aspect-[1000/520]">
                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 1000 520"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="infra-topo-line"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={beamSoft} />
                          <stop offset="45%" stopColor={beamColor} />
                          <stop offset="100%" stopColor={beamSoft} />
                        </linearGradient>
                        <filter
                          id="infra-topo-glow"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
                            result="glow"
                          />
                          <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <marker
                          id="infra-topo-arrow"
                          markerWidth="9"
                          markerHeight="9"
                          refX="8"
                          refY="4.5"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M0 0 L9 4.5 L0 9 Z" fill={beamColor} />
                        </marker>
                      </defs>

                      {topologyEdges.map((e, idx) => {
                        const from = topologyNodes.find((n) => n.id === e.from);
                        const to = topologyNodes.find((n) => n.id === e.to);
                        if (!from || !to) return null;

                        const sx = from.x;
                        const sy = from.y;
                        const ex = to.x;
                        const ey = to.y;

                        const dx = ex - sx;
                        const dy = ey - sy;
                        const len = Math.max(1, Math.hypot(dx, dy));
                        const nx = -dy / len;
                        const ny = dx / len;
                        const dir = dx === 0 ? 1 : Math.sign(dx);
                        const bend = Math.min(70, len * 0.18);

                        const c1x = sx + dx * 0.25 + nx * bend * dir;
                        const c1y = sy + dy * 0.25 + ny * bend * dir;
                        const c2x = sx + dx * 0.75 + nx * bend * dir;
                        const c2y = sy + dy * 0.75 + ny * bend * dir;
                        const d = `M ${sx} ${sy} C ${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`;

                        return (
                          <g key={`${e.from}-${e.to}-${idx}`} opacity="0.98">
                            <path
                              d={d}
                              fill="none"
                              stroke={beamSoft}
                              strokeWidth="2"
                              strokeDasharray="1 10"
                              strokeLinecap="round"
                            />
                            <path
                              d={d}
                              fill="none"
                              stroke="url(#infra-topo-line)"
                              strokeWidth="2.6"
                              strokeDasharray="1 8"
                              strokeLinecap="round"
                              markerEnd="url(#infra-topo-arrow)"
                              filter={
                                theme === "dark"
                                  ? "url(#infra-topo-glow)"
                                  : undefined
                              }
                              style={{
                                animation: `infra-dash ${e.t}s linear infinite`,
                                animationDelay: `${e.d}s`,
                              }}
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {topologyNodes.map((n) => {
                      const isCloud = n.kind === "cloud";
                      const isProvider = n.kind === "provider";
                      const isCore = n.kind === "core";
                      const isMid = n.kind === "mid";

                      const sizeClassName = isCloud
                        ? "h-[56px] w-[220px]"
                        : isProvider
                          ? "h-[44px] w-[132px]"
                          : isMid
                            ? "h-[50px] w-[170px]"
                            : "h-[62px] w-[240px]";

                      const outerClassName = isCloud
                        ? `rounded-full border border-[rgba(0,191,255,0.42)] bg-[rgba(255,255,255,0.06)] shadow-[0_14px_40px_rgba(0,0,0,0.22)] ${
                            theme === "dark"
                              ? "shadow-[0_0_22px_rgba(0,191,255,0.16)]"
                              : ""
                          }`
                        : "rounded-full border border-[rgba(0,191,255,0.40)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(240,248,255,0.72))] shadow-[0_18px_44px_rgba(0,0,0,0.26)]";

                      const logoHeightClassName = isProvider
                        ? "h-[24px]"
                        : isCore
                          ? "h-[38px]"
                          : "h-[30px]";

                      return (
                        <div
                          key={n.id}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 ${sizeClassName} ${outerClassName} backdrop-blur`}
                          style={{
                            left: `${(n.x / 1000) * 100}%`,
                            top: `${(n.y / 520) * 100}%`,
                          }}
                        >
                          <div className="h-full w-full flex items-center justify-center px-4">
                            {"logoSrc" in n && n.logoSrc ? (
                              <img
                                src={n.logoSrc}
                                alt={n.label}
                                className={`${logoHeightClassName} w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.20)]`}
                                loading="lazy"
                                draggable={false}
                              />
                            ) : (
                              <div className="text-sm font-semibold tracking-wide text-[color:var(--text-primary)]">
                                {n.label}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="infra-design" className="mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Infrastructure design
          </h2>
          <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
            Design patterns that keep compute, storage, and security
            aligned—without slowing down shipping velocity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-8 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
        >
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider text-[color:var(--text-tertiary)]">
                  REFERENCE MODEL
                </div>
                <div className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                  IaaS virtualization layers
                </div>
                <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed max-w-2xl">
                  Cloud consumers connect to an IaaS provider, consuming virtual
                  compute/network/storage mapped through a virtualization layer
                  onto physical resources.
                </p>
              </div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]"
                style={{ animation: "infra-glow 2.4s ease-in-out infinite" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                  style={{ animation: "infra-pulse 1.6s ease-in-out infinite" }}
                />
                Real-time links
              </div>
            </div>

            <div
              className="mt-8 relative w-full h-[520px] rounded-2xl border border-[color:var(--border-color)] overflow-hidden"
              style={{
                background:
                  theme === "dark"
                    ? "radial-gradient(1200px 520px at 50% 0%, rgba(0,255,102,0.10), rgba(0,0,0,0.88))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.92))",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-full max-w-full aspect-[1000/700]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1000 700"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="iaas-green"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.95)"
                              : "rgba(16,185,129,0.95)"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.70)"
                              : "rgba(16,185,129,0.78)"
                          }
                        />
                      </linearGradient>
                      <filter
                        id="iaas-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
                          result="glow"
                        />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* consumer group box */}
                    <rect
                      x="110"
                      y="40"
                      width="780"
                      height="120"
                      rx="14"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(2,6,23,0.02)"
                      }
                      stroke={
                        theme === "dark"
                          ? "rgba(0,255,102,0.14)"
                          : "rgba(16,185,129,0.22)"
                      }
                      strokeWidth="2"
                    />

                    {/* three consumer monitors */}
                    {[
                      { x: 210, label: "Cloud consumer 1" },
                      { x: 500, label: "Cloud consumer 2" },
                      { x: 790, label: "Cloud consumer n" },
                    ].map((c) => (
                      <g key={c.label}>
                        <rect
                          x={c.x - 44}
                          y={60}
                          width="88"
                          height="58"
                          rx="8"
                          fill={
                            theme === "dark"
                              ? "rgba(0,0,0,0.65)"
                              : "rgba(15,23,42,0.06)"
                          }
                          stroke="url(#iaas-green)"
                          strokeWidth="2"
                          filter={
                            theme === "dark" ? "url(#iaas-glow)" : undefined
                          }
                        />
                        <rect
                          x={c.x - 36}
                          y={70}
                          width="72"
                          height="32"
                          rx="6"
                          fill={
                            theme === "dark"
                              ? "rgba(0,255,102,0.10)"
                              : "rgba(16,185,129,0.10)"
                          }
                        />
                        <rect
                          x={c.x - 18}
                          y={120}
                          width="36"
                          height="8"
                          rx="4"
                          fill={
                            theme === "dark"
                              ? "rgba(0,255,102,0.55)"
                              : "rgba(16,185,129,0.55)"
                          }
                        />
                        <text
                          x={c.x}
                          y={150}
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight="700"
                          fill={
                            theme === "dark"
                              ? "rgba(255,255,255,0.78)"
                              : "rgba(10,15,25,0.70)"
                          }
                        >
                          {c.label}
                        </text>
                      </g>
                    ))}

                    {/* provider pills */}
                    <rect
                      x="340"
                      y="200"
                      width="320"
                      height="46"
                      rx="23"
                      fill="url(#iaas-green)"
                      opacity={theme === "dark" ? 1 : 0.92}
                      filter={theme === "dark" ? "url(#iaas-glow)" : undefined}
                    />
                    <text
                      x="500"
                      y="230"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="900"
                      fill={
                        theme === "dark"
                          ? "rgba(0,0,0,0.88)"
                          : "rgba(0,0,0,0.88)"
                      }
                    >
                      IaaS Cloud provider
                    </text>

                    <rect
                      x="375"
                      y="260"
                      width="250"
                      height="44"
                      rx="22"
                      fill="url(#iaas-green)"
                      opacity={theme === "dark" ? 1 : 0.92}
                      filter={theme === "dark" ? "url(#iaas-glow)" : undefined}
                    />
                    <text
                      x="500"
                      y="288"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="900"
                      fill={
                        theme === "dark"
                          ? "rgba(0,0,0,0.88)"
                          : "rgba(0,0,0,0.88)"
                      }
                    >
                      Virtual resources
                    </text>

                    {/* animated connectors */}
                    <g opacity="0.98">
                      {[
                        { x1: 500, y1: 160, x2: 500, y2: 200, t: 2.8, d: 0.0 },
                        { x1: 500, y1: 246, x2: 500, y2: 260, t: 2.8, d: 0.12 },
                        { x1: 500, y1: 304, x2: 220, y2: 340, t: 3.2, d: 0.06 },
                        { x1: 500, y1: 304, x2: 500, y2: 340, t: 3.0, d: 0.16 },
                        { x1: 500, y1: 304, x2: 780, y2: 340, t: 3.35, d: 0.1 },
                      ].map((l, idx) => (
                        <g key={idx}>
                          <line
                            x1={l.x1}
                            y1={l.y1}
                            x2={l.x2}
                            y2={l.y2}
                            stroke={
                              theme === "dark"
                                ? "rgba(0,255,102,0.20)"
                                : "rgba(16,185,129,0.22)"
                            }
                            strokeWidth="3"
                            strokeDasharray="1 10"
                            strokeLinecap="round"
                          />
                          <line
                            x1={l.x1}
                            y1={l.y1}
                            x2={l.x2}
                            y2={l.y2}
                            stroke={
                              theme === "dark"
                                ? "rgba(0,255,102,0.95)"
                                : "rgba(16,185,129,0.85)"
                            }
                            strokeWidth="3.2"
                            strokeDasharray="1 8"
                            strokeLinecap="round"
                            filter={
                              theme === "dark" ? "url(#iaas-glow)" : undefined
                            }
                            style={{
                              animation: `infra-dash ${l.t}s linear infinite`,
                              animationDelay: `${l.d}s`,
                            }}
                          />
                        </g>
                      ))}
                    </g>

                    {/* three virtual stacks */}
                    {[
                      { x: 220, title: "compute" },
                      { x: 500, title: "network" },
                      { x: 780, title: "storage" },
                    ].map((col) => (
                      <g key={col.title}>
                        <rect
                          x={col.x - 120}
                          y={340}
                          width="240"
                          height="210"
                          rx="10"
                          fill={
                            theme === "dark"
                              ? "rgba(255,255,255,0.04)"
                              : "rgba(2,6,23,0.04)"
                          }
                          stroke={
                            theme === "dark"
                              ? "rgba(0,255,102,0.18)"
                              : "rgba(16,185,129,0.20)"
                          }
                          strokeWidth="2"
                        />
                        {["compute", "network", "storage"].map((row, rIdx) => (
                          <g key={row}>
                            <rect
                              x={col.x - 86}
                              y={360 + rIdx * 60}
                              width="172"
                              height="46"
                              rx="6"
                              fill={
                                theme === "dark"
                                  ? "rgba(248,250,252,0.92)"
                                  : "rgba(248,250,252,0.92)"
                              }
                              opacity={theme === "dark" ? 0.1 : 0.7}
                              stroke={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.18)"
                                  : "rgba(15,23,42,0.20)"
                              }
                              strokeWidth="1.5"
                            />
                            <text
                              x={col.x}
                              y={391 + rIdx * 60}
                              textAnchor="middle"
                              fontSize="18"
                              fontWeight="700"
                              fill={
                                theme === "dark"
                                  ? "rgba(235,245,238,0.88)"
                                  : "rgba(10,15,25,0.72)"
                              }
                            >
                              {row}
                            </text>
                          </g>
                        ))}
                      </g>
                    ))}

                    {/* virtualization layer */}
                    <text
                      x="500"
                      y="575"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="800"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.34)"
                          : "rgba(10,15,25,0.34)"
                      }
                    >
                      Virtualization
                    </text>
                    <line
                      x1="150"
                      y1="560"
                      x2="850"
                      y2="560"
                      stroke={
                        theme === "dark"
                          ? "rgba(0,255,102,0.22)"
                          : "rgba(16,185,129,0.20)"
                      }
                      strokeWidth="3"
                      strokeDasharray="1 10"
                      strokeLinecap="round"
                    />

                    {/* physical resources */}
                    <rect
                      x="160"
                      y="600"
                      width="680"
                      height="72"
                      rx="14"
                      fill={
                        theme === "dark"
                          ? "rgba(248,250,252,0.08)"
                          : "rgba(2,6,23,0.06)"
                      }
                      stroke={
                        theme === "dark"
                          ? "rgba(0,255,102,0.18)"
                          : "rgba(16,185,129,0.20)"
                      }
                      strokeWidth="2"
                    />
                    <rect
                      x="375"
                      y="580"
                      width="250"
                      height="44"
                      rx="22"
                      fill="url(#iaas-green)"
                      opacity={theme === "dark" ? 1 : 0.92}
                      filter={theme === "dark" ? "url(#iaas-glow)" : undefined}
                    />
                    <text
                      x="500"
                      y="608"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="900"
                      fill={
                        theme === "dark"
                          ? "rgba(0,0,0,0.88)"
                          : "rgba(0,0,0,0.88)"
                      }
                    >
                      Physical resources
                    </text>

                    {[
                      { x: 260, t: "compute" },
                      { x: 500, t: "storage" },
                      { x: 740, t: "network" },
                    ].map((b) => (
                      <g key={b.t}>
                        <rect
                          x={b.x - 90}
                          y={622}
                          width="180"
                          height="40"
                          rx="6"
                          fill={
                            theme === "dark"
                              ? "rgba(248,250,252,0.90)"
                              : "rgba(248,250,252,0.90)"
                          }
                          opacity={theme === "dark" ? 0.1 : 0.7}
                          stroke={
                            theme === "dark"
                              ? "rgba(255,255,255,0.18)"
                              : "rgba(15,23,42,0.18)"
                          }
                          strokeWidth="1.4"
                        />
                        <text
                          x={b.x}
                          y={648}
                          textAnchor="middle"
                          fontSize="18"
                          fontWeight="700"
                          fill={
                            theme === "dark"
                              ? "rgba(235,245,238,0.88)"
                              : "rgba(10,15,25,0.72)"
                          }
                        >
                          {b.t}
                        </text>
                      </g>
                    ))}

                    {/* stack-to-physical connectors */}
                    <g opacity="0.98">
                      {[
                        { x: 220, y1: 550, y2: 600, t: 3.0, d: 0.04 },
                        { x: 500, y1: 550, y2: 600, t: 2.9, d: 0.12 },
                        { x: 780, y1: 550, y2: 600, t: 3.2, d: 0.08 },
                      ].map((v, idx) => (
                        <g key={idx}>
                          <line
                            x1={v.x}
                            y1={v.y1}
                            x2={v.x}
                            y2={v.y2}
                            stroke={
                              theme === "dark"
                                ? "rgba(0,255,102,0.18)"
                                : "rgba(16,185,129,0.18)"
                            }
                            strokeWidth="3"
                            strokeDasharray="1 10"
                            strokeLinecap="round"
                          />
                          <line
                            x1={v.x}
                            y1={v.y1}
                            x2={v.x}
                            y2={v.y2}
                            stroke={
                              theme === "dark"
                                ? "rgba(0,255,102,0.95)"
                                : "rgba(16,185,129,0.85)"
                            }
                            strokeWidth="3.2"
                            strokeDasharray="1 8"
                            strokeLinecap="round"
                            filter={
                              theme === "dark" ? "url(#iaas-glow)" : undefined
                            }
                            style={{
                              animation: `infra-dash ${v.t}s linear infinite`,
                              animationDelay: `${v.d}s`,
                            }}
                          />
                        </g>
                      ))}
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="mt-10 relative w-full h-[480px] rounded-2xl border border-[color:var(--border-color)] overflow-hidden"
              style={{
                background:
                  theme === "dark"
                    ? "radial-gradient(1000px 520px at 50% 0%, rgba(0,255,102,0.08), rgba(0,0,0,0.92))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.92))",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-full max-w-full aspect-[1000/520]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1000 520"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="iaas2-green"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.95)"
                              : "rgba(16,185,129,0.95)"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.70)"
                              : "rgba(16,185,129,0.78)"
                          }
                        />
                      </linearGradient>
                      <filter
                        id="iaas2-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
                          result="glow"
                        />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <linearGradient
                        id="iaas2-link"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="0%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.20)"
                              : "rgba(16,185,129,0.22)"
                          }
                        />
                        <stop
                          offset="50%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.95)"
                              : "rgba(16,185,129,0.90)"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(0,255,102,0.20)"
                              : "rgba(16,185,129,0.22)"
                          }
                        />
                      </linearGradient>
                    </defs>

                    {/* IaaS pill */}
                    <rect
                      x="420"
                      y="36"
                      width="160"
                      height="46"
                      rx="23"
                      fill="url(#iaas2-green)"
                      filter={theme === "dark" ? "url(#iaas2-glow)" : undefined}
                    />
                    <text
                      x="500"
                      y="66"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="900"
                      fill="rgba(0,0,0,0.88)"
                    >
                      IaaS
                    </text>

                    {/* outer frame */}
                    <rect
                      x="120"
                      y="78"
                      width="840"
                      height="392"
                      rx="16"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.01)"
                          : "rgba(2,6,23,0.02)"
                      }
                      stroke={
                        theme === "dark"
                          ? "rgba(0,255,102,0.14)"
                          : "rgba(16,185,129,0.20)"
                      }
                      strokeWidth="2"
                    />

                    {/* left actors */}
                    <g>
                      <circle
                        cx="70"
                        cy="120"
                        r="28"
                        fill={
                          theme === "dark"
                            ? "rgba(0,255,102,0.18)"
                            : "rgba(16,185,129,0.18)"
                        }
                        stroke="url(#iaas2-green)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="70"
                        cy="112"
                        r="10"
                        fill={
                          theme === "dark"
                            ? "rgba(0,255,102,0.65)"
                            : "rgba(16,185,129,0.55)"
                        }
                      />
                      <path
                        d="M 52 138 Q 70 122 88 138"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.65)"
                            : "rgba(16,185,129,0.55)"
                        }
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <text
                        x="70"
                        y="170"
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill={
                          theme === "dark"
                            ? "rgba(255,255,255,0.72)"
                            : "rgba(10,15,25,0.70)"
                        }
                      >
                        Users
                      </text>
                    </g>
                    <g>
                      <circle
                        cx="70"
                        cy="358"
                        r="28"
                        fill={
                          theme === "dark"
                            ? "rgba(0,255,102,0.10)"
                            : "rgba(16,185,129,0.10)"
                        }
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.30)"
                            : "rgba(16,185,129,0.30)"
                        }
                        strokeWidth="2"
                      />
                      <path
                        d="M 44 356 C 52 334 66 330 76 342 C 90 330 102 336 96 358 C 108 362 106 382 90 382 H 54 C 38 382 36 362 44 356 Z"
                        fill={
                          theme === "dark"
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(2,6,23,0.04)"
                        }
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.26)"
                            : "rgba(16,185,129,0.26)"
                        }
                        strokeWidth="2"
                      />
                      <text
                        x="70"
                        y="410"
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="800"
                        fill={
                          theme === "dark"
                            ? "rgba(255,255,255,0.72)"
                            : "rgba(10,15,25,0.70)"
                        }
                      >
                        System Admin
                      </text>
                    </g>

                    {/* pills helper */}
                    {(
                      [
                        { x: 220, y: 110, w: 160, label: "Firewall" },
                        { x: 420, y: 110, w: 200, label: "Load balancer" },
                        { x: 680, y: 110, w: 220, label: "Virtual Web Server" },
                        { x: 220, y: 250, w: 260, label: "Storage" },
                        { x: 680, y: 220, w: 220, label: "Virtual Compute" },
                        { x: 680, y: 360, w: 240, label: "VM automation" },
                        { x: 720, y: 420, w: 200, label: "Monitoring" },
                      ] as const
                    ).map((p) => (
                      <g key={p.label}>
                        <rect
                          x={p.x}
                          y={p.y}
                          width={p.w}
                          height="42"
                          rx="21"
                          fill={
                            theme === "dark"
                              ? "rgba(255,255,255,0.92)"
                              : "rgba(255,255,255,0.98)"
                          }
                          stroke={
                            theme === "dark"
                              ? "rgba(0,255,102,0.22)"
                              : "rgba(16,185,129,0.22)"
                          }
                          strokeWidth="2"
                        />
                        <text
                          x={p.x + p.w / 2}
                          y={p.y + 27}
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight="800"
                          fill="rgba(0,0,0,0.82)"
                        >
                          {p.label}
                        </text>
                      </g>
                    ))}

                    {/* Virtual compute content */}
                    <rect
                      x="650"
                      y="260"
                      width="300"
                      height="118"
                      rx="12"
                      fill={
                        theme === "dark"
                          ? "rgba(248,250,252,0.10)"
                          : "rgba(2,6,23,0.04)"
                      }
                      stroke={
                        theme === "dark"
                          ? "rgba(0,255,102,0.14)"
                          : "rgba(16,185,129,0.18)"
                      }
                      strokeWidth="2"
                    />
                    {(
                      [
                        { y: 276, label: "Data processing" },
                        { y: 316, label: "Data processing" },
                      ] as const
                    ).map((r) => (
                      <g key={r.y}>
                        <rect
                          x="695"
                          y={r.y}
                          width="210"
                          height="34"
                          rx="17"
                          fill={
                            theme === "dark"
                              ? "rgba(255,255,255,0.90)"
                              : "rgba(255,255,255,0.95)"
                          }
                          opacity={theme === "dark" ? 0.1 : 0.85}
                          stroke={
                            theme === "dark"
                              ? "rgba(0,255,102,0.14)"
                              : "rgba(16,185,129,0.18)"
                          }
                          strokeWidth="1.6"
                        />
                        <text
                          x="800"
                          y={r.y + 22}
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="800"
                          fill={
                            theme === "dark"
                              ? "rgba(235,245,238,0.88)"
                              : "rgba(10,15,25,0.74)"
                          }
                        >
                          {r.label}
                        </text>
                      </g>
                    ))}

                    {/* Storage content */}
                    <rect
                      x="180"
                      y="286"
                      width="360"
                      height="170"
                      rx="12"
                      fill={
                        theme === "dark"
                          ? "rgba(248,250,252,0.10)"
                          : "rgba(2,6,23,0.04)"
                      }
                      stroke={
                        theme === "dark"
                          ? "rgba(0,255,102,0.14)"
                          : "rgba(16,185,129,0.18)"
                      }
                      strokeWidth="2"
                    />
                    {(
                      [
                        { x: 250, label: "VM 1" },
                        { x: 430, label: "VM 2" },
                      ] as const
                    ).map((vm) => (
                      <g key={vm.label}>
                        <rect
                          x={vm.x - 44}
                          y="318"
                          width="88"
                          height="86"
                          rx="10"
                          fill={
                            theme === "dark"
                              ? "rgba(0,0,0,0.55)"
                              : "rgba(255,255,255,0.60)"
                          }
                          stroke={
                            theme === "dark"
                              ? "rgba(0,255,102,0.18)"
                              : "rgba(16,185,129,0.20)"
                          }
                          strokeWidth="2"
                        />
                        <circle
                          cx={vm.x - 22}
                          cy="342"
                          r="3"
                          fill={
                            theme === "dark"
                              ? "rgba(0,255,102,0.80)"
                              : "rgba(16,185,129,0.80)"
                          }
                        />
                        <circle
                          cx={vm.x + 22}
                          cy="342"
                          r="3"
                          fill={
                            theme === "dark"
                              ? "rgba(0,255,102,0.80)"
                              : "rgba(16,185,129,0.80)"
                          }
                        />
                        <rect
                          x={vm.x - 26}
                          y="360"
                          width="52"
                          height="30"
                          rx="6"
                          fill={
                            theme === "dark"
                              ? "rgba(0,255,102,0.18)"
                              : "rgba(16,185,129,0.18)"
                          }
                          stroke={
                            theme === "dark"
                              ? "rgba(0,255,102,0.45)"
                              : "rgba(16,185,129,0.45)"
                          }
                          strokeWidth="1.6"
                        />
                        <text
                          x={vm.x}
                          y="444"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="800"
                          fill={
                            theme === "dark"
                              ? "rgba(255,255,255,0.70)"
                              : "rgba(10,15,25,0.70)"
                          }
                        >
                          {vm.label}
                        </text>
                      </g>
                    ))}

                    {/* connectors (static + animated overlays) */}
                    <g opacity="0.95">
                      <path
                        d="M 98 120 L 220 131"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.24)"
                            : "rgba(16,185,129,0.26)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 380 131 L 420 131"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.24)"
                            : "rgba(16,185,129,0.26)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 620 131 L 680 131"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.24)"
                            : "rgba(16,185,129,0.26)"
                        }
                        strokeWidth="3"
                      />

                      <path
                        d="M 520 152 L 520 250"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.22)"
                            : "rgba(16,185,129,0.24)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 520 250 L 350 250"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.22)"
                            : "rgba(16,185,129,0.24)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 520 250 L 760 220"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.22)"
                            : "rgba(16,185,129,0.24)"
                        }
                        strokeWidth="3"
                      />

                      <path
                        d="M 430 370 L 680 381"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.16)"
                            : "rgba(16,185,129,0.18)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 800 262 L 800 360"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.16)"
                            : "rgba(16,185,129,0.18)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 840 402 L 840 420"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.16)"
                            : "rgba(16,185,129,0.18)"
                        }
                        strokeWidth="3"
                      />
                      <path
                        d="M 98 358 L 180 360"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(0,255,102,0.22)"
                            : "rgba(16,185,129,0.22)"
                        }
                        strokeWidth="3"
                      />
                    </g>

                    <g opacity="0.98">
                      {[
                        { d: "M 98 120 L 220 131", t: 2.4, delay: 0.0 },
                        { d: "M 380 131 L 420 131", t: 2.7, delay: 0.08 },
                        { d: "M 620 131 L 680 131", t: 2.9, delay: 0.14 },
                        { d: "M 520 152 L 520 250", t: 3.2, delay: 0.06 },
                        { d: "M 520 250 L 760 220", t: 3.4, delay: 0.12 },
                        { d: "M 430 370 L 680 381", t: 3.6, delay: 0.18 },
                      ].map((l) => (
                        <path
                          key={l.d}
                          d={l.d}
                          fill="none"
                          stroke="url(#iaas2-link)"
                          strokeWidth="3.2"
                          strokeDasharray="1 8"
                          strokeLinecap="round"
                          filter={
                            theme === "dark" ? "url(#iaas2-glow)" : undefined
                          }
                          style={{
                            animation: `infra-dash ${l.t}s linear infinite`,
                            animationDelay: `${l.delay}s`,
                          }}
                        />
                      ))}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="cloud-technology" className="mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Cloud technology
          </h2>
          <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
            A high-level service map for cloud capabilities, with real-time link
            animations.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-8 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
        >
          <div className="relative p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider text-[color:var(--text-tertiary)]">
                  ISOMETRIC INFOGRAPHIC
                </div>
                <div className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                  Cloud services overview
                </div>
                <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed max-w-2xl">
                  Branched service domains (storage, security, communication,
                  analytics) connected through a common cloud platform.
                </p>
              </div>

              <div
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]"
                style={{ animation: "infra-glow 2.4s ease-in-out infinite" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                  style={{ animation: "infra-pulse 1.6s ease-in-out infinite" }}
                />
                Real-time links
              </div>
            </div>

            <div
              className="mt-8 relative w-full h-[520px] rounded-2xl border border-[color:var(--border-color)] overflow-hidden"
              style={{
                background:
                  theme === "dark"
                    ? "radial-gradient(900px 520px at 50% 0%, rgba(56,189,248,0.08), rgba(2,6,23,0.92))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.92))",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-full max-w-full aspect-[1000/520]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1000 520"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="ct-grid"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 24 0 L 0 0 0 24"
                          fill="none"
                          stroke={
                            theme === "dark"
                              ? "rgba(148,163,184,0.10)"
                              : "rgba(148,163,184,0.14)"
                          }
                          strokeWidth="1"
                        />
                      </pattern>
                      <linearGradient id="ct-title" x1="0" y1="0" x2="1" y2="0">
                        <stop
                          offset="0%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(56,189,248,0.30)"
                              : "rgba(37,99,235,0.16)"
                          }
                        />
                        <stop
                          offset="50%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(56,189,248,0.12)"
                              : "rgba(37,99,235,0.08)"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(56,189,248,0.30)"
                              : "rgba(37,99,235,0.16)"
                          }
                        />
                      </linearGradient>
                      <linearGradient id="ct-link" x1="0" y1="0" x2="1" y2="0">
                        <stop
                          offset="0%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(15,23,42,0.10)"
                          }
                        />
                        <stop
                          offset="50%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(255,255,255,0.86)"
                              : "rgba(15,23,42,0.72)"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            theme === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(15,23,42,0.10)"
                          }
                        />
                      </linearGradient>
                      <filter
                        id="ct-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3.2" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0"
                          result="glow"
                        />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter
                        id="ct-accent-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3.2" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
                          result="glow"
                        />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <g transform="translate(500 260) rotate(-22) translate(-500 -260)">
                      <rect
                        x="0"
                        y="0"
                        width="1000"
                        height="520"
                        fill="url(#ct-grid)"
                        opacity={theme === "dark" ? 1 : 0.85}
                      />
                    </g>

                    <g opacity={theme === "dark" ? 0.9 : 0.75}>
                      <path
                        d="M 240 260 L 760 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(255,255,255,0.18)"
                            : "rgba(15,23,42,0.14)"
                        }
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 500 150 L 500 370"
                        stroke={
                          theme === "dark"
                            ? "rgba(255,255,255,0.16)"
                            : "rgba(15,23,42,0.12)"
                        }
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* central title */}
                    <rect
                      x="270"
                      y="220"
                      width="460"
                      height="78"
                      rx="39"
                      fill={
                        theme === "dark"
                          ? "rgba(15,23,42,0.92)"
                          : "rgba(255,255,255,0.92)"
                      }
                      stroke={
                        theme === "dark"
                          ? "rgba(255,255,255,0.22)"
                          : "rgba(15,23,42,0.16)"
                      }
                      strokeWidth="2"
                    />
                    <rect
                      x="286"
                      y="236"
                      width="428"
                      height="46"
                      rx="23"
                      fill="url(#ct-title)"
                      opacity={theme === "dark" ? 1 : 0.9}
                    />
                    <text
                      x="500"
                      y="270"
                      textAnchor="middle"
                      fontSize="30"
                      fontWeight="900"
                      letterSpacing="2"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.92)"
                          : "rgba(15,23,42,0.82)"
                      }
                    >
                      CLOUD TECHNOLOGY
                    </text>

                    {/* link layout */}
                    {(
                      [
                        {
                          id: "datacenter",
                          label: "DATACENTER",
                          x: 140,
                          y: 120,
                        },
                        {
                          id: "cloud-storage",
                          label: "CLOUD STORAGE",
                          x: 160,
                          y: 210,
                        },
                        {
                          id: "master-password",
                          label: "MASTER PASSWORD",
                          x: 170,
                          y: 320,
                        },
                        {
                          id: "data-sync",
                          label: "DATA SYNCHRONIZATION",
                          x: 190,
                          y: 420,
                        },
                        {
                          id: "working-files",
                          label: "WORKING FILES",
                          x: 280,
                          y: 470,
                        },
                        {
                          id: "personal-data",
                          label: "PERSONAL DATA",
                          x: 430,
                          y: 120,
                        },
                        {
                          id: "data-exchange",
                          label: "DATA EXCHANGE",
                          x: 420,
                          y: 390,
                        },
                        { id: "wifi", label: "WI-FI", x: 610, y: 240 },
                        {
                          id: "cloud-medicine",
                          label: "CLOUD MEDICINE",
                          x: 770,
                          y: 330,
                        },
                        {
                          id: "cloud-comm",
                          label: "CLOUD COMMUNICATION",
                          x: 650,
                          y: 460,
                        },
                        {
                          id: "media-files",
                          label: "MEDIA FILES",
                          x: 840,
                          y: 150,
                        },
                        {
                          id: "email-service",
                          label: "EMAIL SERVICE",
                          x: 860,
                          y: 240,
                        },
                      ] as const
                    ).map((n) => {
                      const anchorX = n.x < 500 ? 260 : 740;
                      const anchorY = n.y < 260 ? 240 : 280;
                      const elbowX =
                        n.x < 500
                          ? Math.min(n.x + 90, 360)
                          : Math.max(n.x - 90, 640);
                      const elbowY = n.y;
                      const d = `M ${anchorX} ${anchorY} L ${elbowX} ${anchorY} L ${elbowX} ${elbowY} L ${n.x} ${n.y}`;
                      return (
                        <g key={n.id}>
                          <path
                            d={d}
                            fill="none"
                            stroke={
                              theme === "dark"
                                ? "rgba(255,255,255,0.38)"
                                : "rgba(15,23,42,0.28)"
                            }
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <path
                            d={d}
                            fill="none"
                            stroke="url(#ct-link)"
                            strokeWidth="3.2"
                            strokeDasharray="1 8"
                            strokeLinecap="round"
                            filter={
                              theme === "dark" ? "url(#ct-glow)" : undefined
                            }
                            style={{
                              animation: `infra-dash ${n.x < 500 ? 3.4 : 3.9}s linear infinite`,
                              animationDelay: `${(n.y % 80) / 200}s`,
                            }}
                          />
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="7"
                            fill={
                              theme === "dark"
                                ? "rgba(2,6,23,0.85)"
                                : "rgba(255,255,255,0.92)"
                            }
                            stroke={
                              theme === "dark"
                                ? "rgba(255,255,255,0.55)"
                                : "rgba(15,23,42,0.32)"
                            }
                            strokeWidth="2"
                          />
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="3"
                            fill={
                              theme === "dark"
                                ? "rgba(56,189,248,0.92)"
                                : "rgba(37,99,235,0.74)"
                            }
                            filter={
                              theme === "dark"
                                ? "url(#ct-accent-glow)"
                                : undefined
                            }
                          />
                          <text
                            x={n.x}
                            y={n.y + 28}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.70)"
                                : "rgba(15,23,42,0.68)"
                            }
                            transform={`rotate(${n.x < 500 ? -24 : 24} ${n.x} ${n.y + 28})`}
                          >
                            {n.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* endpoints (simple icon cards) */}
                    {(
                      [
                        { id: "s1", x: 120, y: 92, kind: "server" },
                        { id: "s2", x: 120, y: 184, kind: "folder" },
                        { id: "s3", x: 120, y: 296, kind: "lock" },
                        { id: "s4", x: 160, y: 400, kind: "sync" },
                        { id: "s5", x: 250, y: 448, kind: "files" },
                        { id: "s6", x: 430, y: 92, kind: "cloud" },
                        { id: "s7", x: 420, y: 362, kind: "exchange" },
                        { id: "s8", x: 590, y: 210, kind: "wifi" },
                        { id: "s9", x: 810, y: 300, kind: "med" },
                        { id: "s10", x: 650, y: 432, kind: "comm" },
                        { id: "s11", x: 860, y: 122, kind: "media" },
                        { id: "s12", x: 880, y: 212, kind: "mail" },
                      ] as const
                    ).map((i) => (
                      <g key={i.id}>
                        <rect
                          x={i.x - 24}
                          y={i.y - 24}
                          width="48"
                          height="48"
                          rx="12"
                          fill={
                            theme === "dark"
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(15,23,42,0.04)"
                          }
                          stroke={
                            theme === "dark"
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(15,23,42,0.10)"
                          }
                          strokeWidth="2"
                        />
                        {i.kind === "server" ? (
                          <g>
                            <rect
                              x={i.x - 10}
                              y={i.y - 14}
                              width="20"
                              height="28"
                              rx="4"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.16)"
                                  : "rgba(15,23,42,0.12)"
                              }
                            />
                            <rect
                              x={i.x - 7}
                              y={i.y - 9}
                              width="14"
                              height="3"
                              rx="2"
                              fill={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.65)"
                                  : "rgba(37,99,235,0.45)"
                              }
                            />
                            <circle
                              cx={i.x - 5}
                              cy={i.y + 10}
                              r="2"
                              fill={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.85)"
                                  : "rgba(37,99,235,0.65)"
                              }
                            />
                          </g>
                        ) : null}
                        {i.kind === "folder" ? (
                          <g>
                            <path
                              d={`M ${i.x - 12} ${i.y - 6} H ${i.x - 2} L ${i.x + 2} ${i.y - 11} H ${i.x + 12} V ${i.y + 12} H ${i.x - 12} Z`}
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.12)"
                                  : "rgba(15,23,42,0.10)"
                              }
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.55)"
                                  : "rgba(37,99,235,0.35)"
                              }
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                          </g>
                        ) : null}
                        {i.kind === "lock" ? (
                          <g>
                            <rect
                              x={i.x - 10}
                              y={i.y - 2}
                              width="20"
                              height="16"
                              rx="4"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.12)"
                                  : "rgba(15,23,42,0.10)"
                              }
                            />
                            <path
                              d={`M ${i.x - 6} ${i.y - 2} V ${i.y - 8} C ${i.x - 6} ${i.y - 14} ${i.x + 6} ${i.y - 14} ${i.x + 6} ${i.y - 8} V ${i.y - 2}`}
                              fill="none"
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.65)"
                                  : "rgba(37,99,235,0.45)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        ) : null}
                        {i.kind === "wifi" ? (
                          <g>
                            <path
                              d={`M ${i.x - 14} ${i.y + 2} Q ${i.x} ${i.y - 10} ${i.x + 14} ${i.y + 2}`}
                              fill="none"
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.50)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d={`M ${i.x - 9} ${i.y + 6} Q ${i.x} ${i.y - 2} ${i.x + 9} ${i.y + 6}`}
                              fill="none"
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.50)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle
                              cx={i.x}
                              cy={i.y + 10}
                              r="3"
                              fill={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.85)"
                                  : "rgba(37,99,235,0.65)"
                              }
                            />
                          </g>
                        ) : null}
                        {i.kind === "mail" ? (
                          <g>
                            <rect
                              x={i.x - 14}
                              y={i.y - 10}
                              width="28"
                              height="20"
                              rx="4"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.12)"
                                  : "rgba(15,23,42,0.10)"
                              }
                            />
                            <path
                              d={`M ${i.x - 14} ${i.y - 8} L ${i.x} ${i.y + 2} L ${i.x + 14} ${i.y - 8}`}
                              fill="none"
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.65)"
                                  : "rgba(37,99,235,0.45)"
                              }
                              strokeWidth="2"
                            />
                          </g>
                        ) : null}
                        {i.kind === "med" ? (
                          <g>
                            <circle
                              cx={i.x}
                              cy={i.y}
                              r="13"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.10)"
                                  : "rgba(15,23,42,0.08)"
                              }
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.45)"
                                  : "rgba(37,99,235,0.30)"
                              }
                              strokeWidth="2"
                            />
                            <path
                              d={`M ${i.x} ${i.y - 7} V ${i.y + 7} M ${i.x - 7} ${i.y} H ${i.x + 7}`}
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.75)"
                                  : "rgba(37,99,235,0.55)"
                              }
                              strokeWidth="2.6"
                              strokeLinecap="round"
                            />
                          </g>
                        ) : null}
                        {i.kind === "cloud" ? (
                          <g>
                            <path
                              d={`M ${i.x - 10} ${i.y + 6} C ${i.x - 18} ${i.y + 6} ${i.x - 18} ${i.y - 2} ${i.x - 10} ${i.y - 2} C ${i.x - 8} ${i.y - 10} ${i.x + 4} ${i.y - 12} ${i.x + 8} ${i.y - 4} C ${i.x + 18} ${i.y - 6} ${i.x + 18} ${i.y + 6} ${i.x + 10} ${i.y + 6} H ${i.x - 10} Z`}
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.12)"
                                  : "rgba(15,23,42,0.08)"
                              }
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.60)"
                                  : "rgba(37,99,235,0.35)"
                              }
                              strokeWidth="2"
                            />
                          </g>
                        ) : null}
                        {i.kind === "comm" ? (
                          <g>
                            <rect
                              x={i.x - 12}
                              y={i.y - 10}
                              width="24"
                              height="18"
                              rx="6"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.10)"
                                  : "rgba(15,23,42,0.08)"
                              }
                            />
                            <path
                              d={`M ${i.x - 2} ${i.y + 8} L ${i.x + 2} ${i.y + 8} L ${i.x} ${i.y + 14} Z`}
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.10)"
                                  : "rgba(15,23,42,0.08)"
                              }
                            />
                            <path
                              d={`M ${i.x - 6} ${i.y - 2} H ${i.x + 6}`}
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.45)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        ) : null}
                        {i.kind === "media" ? (
                          <g>
                            <rect
                              x={i.x - 12}
                              y={i.y - 12}
                              width="24"
                              height="24"
                              rx="6"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.10)"
                                  : "rgba(15,23,42,0.08)"
                              }
                            />
                            <path
                              d={`M ${i.x - 5} ${i.y - 4} L ${i.x + 7} ${i.y + 2} L ${i.x - 5} ${i.y + 8} Z`}
                              fill={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.75)"
                                  : "rgba(37,99,235,0.55)"
                              }
                            />
                          </g>
                        ) : null}
                        {i.kind === "sync" ? (
                          <g>
                            <path
                              d={`M ${i.x - 10} ${i.y + 2} A 10 10 0 0 0 ${i.x + 6} ${i.y + 6}`}
                              fill="none"
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.50)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d={`M ${i.x + 10} ${i.y - 2} A 10 10 0 0 1 ${i.x - 6} ${i.y - 6}`}
                              fill="none"
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.50)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        ) : null}
                        {i.kind === "files" ? (
                          <g>
                            <rect
                              x={i.x - 12}
                              y={i.y - 10}
                              width="20"
                              height="22"
                              rx="4"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.10)"
                                  : "rgba(15,23,42,0.08)"
                              }
                            />
                            <rect
                              x={i.x - 6}
                              y={i.y - 14}
                              width="20"
                              height="22"
                              rx="4"
                              fill={
                                theme === "dark"
                                  ? "rgba(255,255,255,0.06)"
                                  : "rgba(15,23,42,0.06)"
                              }
                            />
                            <path
                              d={`M ${i.x - 4} ${i.y - 2} H ${i.x + 10}`}
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.65)"
                                  : "rgba(37,99,235,0.45)"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        ) : null}
                        {i.kind === "exchange" ? (
                          <g>
                            <path
                              d={`M ${i.x - 12} ${i.y - 2} H ${i.x + 8}`}
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.50)"
                              }
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <path
                              d={`M ${i.x + 6} ${i.y - 8} L ${i.x + 12} ${i.y - 2} L ${i.x + 6} ${i.y + 4}`}
                              fill={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.70)"
                                  : "rgba(37,99,235,0.50)"
                              }
                            />
                            <path
                              d={`M ${i.x + 12} ${i.y + 2} H ${i.x - 8}`}
                              stroke={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.55)"
                                  : "rgba(37,99,235,0.40)"
                              }
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <path
                              d={`M ${i.x - 6} ${i.y - 4} L ${i.x - 12} ${i.y + 2} L ${i.x - 6} ${i.y + 8}`}
                              fill={
                                theme === "dark"
                                  ? "rgba(56,189,248,0.55)"
                                  : "rgba(37,99,235,0.40)"
                              }
                            />
                          </g>
                        ) : null}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="data-center" className="mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Data Center (DC)
          </h2>
          <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
            Physical design translates directly into uptime and performance:
            power, cooling, and cabling discipline.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-8 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden"
        >
          <div className="relative p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider text-[color:var(--text-tertiary)]">
                  AN ILLUSTRATIVE
                </div>
                <div className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                  Data Center Diagram
                </div>
                <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed max-w-2xl">
                  Routing and firewalls connect to a protected core of
                  processing + storage. The animated links represent real-time
                  paths and health signals.
                </p>
              </div>

              <div
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]"
                style={{ animation: "infra-glow 2.4s ease-in-out infinite" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                  style={{ animation: "infra-pulse 1.6s ease-in-out infinite" }}
                />
                Real-time links
              </div>
            </div>

            <div
              className="mt-8 relative w-full h-[420px] rounded-2xl border border-[color:var(--border-color)] overflow-hidden"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg,rgba(13,22,34,0.92),rgba(10,16,26,0.92))"
                    : "linear-gradient(135deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))",
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute -top-36 -left-36 h-[520px] w-[520px] rounded-full opacity-70"
                  style={{
                    background:
                      theme === "dark"
                        ? "radial-gradient(circle_at_center,rgba(0,191,255,0.16)_0%,rgba(0,191,255,0.00)_62%)"
                        : "radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,rgba(37,99,235,0.00)_62%)",
                  }}
                />
                <div
                  className="absolute -bottom-36 -right-36 h-[520px] w-[520px] rounded-full opacity-70"
                  style={{
                    background:
                      theme === "dark"
                        ? "radial-gradient(circle_at_center,rgba(0,191,255,0.12)_0%,rgba(0,191,255,0.00)_62%)"
                        : "radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,rgba(37,99,235,0.00)_62%)",
                  }}
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-full max-w-full aspect-[1000/560]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1000 560"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="dc-link" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={beamSoft} />
                        <stop offset="50%" stopColor={beamColor} />
                        <stop offset="100%" stopColor={beamSoft} />
                      </linearGradient>
                      <filter
                        id="dc-link-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="3.2" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
                          result="glow"
                        />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter
                        id="dc-ddn-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="2.8" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0"
                          result="glow"
                        />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <rect
                      x="0"
                      y="0"
                      width="1000"
                      height="560"
                      fill="transparent"
                    />

                    <text
                      x="500"
                      y="42"
                      textAnchor="middle"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.92)"
                          : "rgba(10,15,25,0.82)"
                      }
                      fontSize="22"
                      fontWeight="800"
                    >
                      Data Center Network Diagram
                    </text>

                    {/* dashed zones */}
                    <g>
                      <rect
                        x="545"
                        y="95"
                        width="410"
                        height="175"
                        fill="transparent"
                        stroke={
                          theme === "dark"
                            ? "rgba(248,113,113,0.62)"
                            : "rgba(239,68,68,0.72)"
                        }
                        strokeWidth="2"
                        strokeDasharray="6 10"
                        rx="10"
                      />
                      <rect
                        x="545"
                        y="330"
                        width="410"
                        height="190"
                        fill="transparent"
                        stroke={
                          theme === "dark"
                            ? "rgba(248,113,113,0.62)"
                            : "rgba(239,68,68,0.72)"
                        }
                        strokeWidth="2"
                        strokeDasharray="6 10"
                        rx="10"
                      />
                      <text
                        x="735"
                        y="116"
                        textAnchor="middle"
                        fill={
                          theme === "dark"
                            ? "rgba(255,255,255,0.78)"
                            : "rgba(10,15,25,0.66)"
                        }
                        fontSize="14"
                        fontWeight="700"
                      >
                        Data Center
                      </text>
                      <text
                        x="735"
                        y="352"
                        textAnchor="middle"
                        fill={
                          theme === "dark"
                            ? "rgba(255,255,255,0.78)"
                            : "rgba(10,15,25,0.66)"
                        }
                        fontSize="14"
                        fontWeight="700"
                      >
                        Client Center
                      </text>
                    </g>

                    {/* helper device primitives */}
                    <g fill="none" stroke="none">
                      <defs>
                        <g id="dc-server">
                          <rect
                            x="0"
                            y="0"
                            width="34"
                            height="50"
                            rx="5"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.14)"
                                : "rgba(15,23,42,0.14)"
                            }
                          />
                          <rect
                            x="4"
                            y="6"
                            width="26"
                            height="7"
                            rx="3"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.18)"
                                : "rgba(15,23,42,0.10)"
                            }
                          />
                          <rect
                            x="4"
                            y="18"
                            width="26"
                            height="7"
                            rx="3"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.14)"
                                : "rgba(15,23,42,0.08)"
                            }
                          />
                          <rect
                            x="4"
                            y="30"
                            width="26"
                            height="7"
                            rx="3"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.12)"
                                : "rgba(15,23,42,0.06)"
                            }
                          />
                          <circle cx="8" cy="44" r="2" fill={beamColor} />
                        </g>
                        <g id="dc-switch">
                          <rect
                            x="0"
                            y="0"
                            width="78"
                            height="22"
                            rx="6"
                            fill={
                              theme === "dark"
                                ? "rgba(56,189,248,0.18)"
                                : "rgba(37,99,235,0.16)"
                            }
                          />
                          <rect
                            x="8"
                            y="7"
                            width="62"
                            height="3"
                            rx="2"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.22)"
                                : "rgba(15,23,42,0.16)"
                            }
                          />
                          <circle cx="12" cy="15" r="2" fill={beamColor} />
                          <circle cx="20" cy="15" r="2" fill={beamColor} />
                          <circle cx="28" cy="15" r="2" fill={beamColor} />
                        </g>
                        <g id="dc-router">
                          <ellipse
                            cx="34"
                            cy="14"
                            rx="34"
                            ry="14"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.12)"
                                : "rgba(15,23,42,0.10)"
                            }
                          />
                          <path
                            d="M 10 14 L 58 14"
                            stroke={
                              theme === "dark"
                                ? "rgba(255,255,255,0.22)"
                                : "rgba(15,23,42,0.18)"
                            }
                            strokeWidth="2"
                          />
                          <circle cx="18" cy="14" r="2" fill={beamColor} />
                          <circle cx="50" cy="14" r="2" fill={beamColor} />
                        </g>
                        <g id="dc-pc">
                          <rect
                            x="0"
                            y="0"
                            width="32"
                            height="22"
                            rx="3"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.14)"
                                : "rgba(15,23,42,0.12)"
                            }
                          />
                          <rect
                            x="3"
                            y="3"
                            width="26"
                            height="14"
                            rx="2"
                            fill={
                              theme === "dark"
                                ? "rgba(0,191,255,0.12)"
                                : "rgba(37,99,235,0.10)"
                            }
                          />
                          <rect
                            x="10"
                            y="22"
                            width="12"
                            height="4"
                            rx="2"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.20)"
                                : "rgba(15,23,42,0.14)"
                            }
                          />
                        </g>
                        <g id="dc-firewall">
                          <rect
                            x="0"
                            y="0"
                            width="44"
                            height="36"
                            rx="6"
                            fill={
                              theme === "dark"
                                ? "rgba(239,68,68,0.22)"
                                : "rgba(239,68,68,0.18)"
                            }
                          />
                          <path
                            d="M 6 10 H 38"
                            stroke={
                              theme === "dark"
                                ? "rgba(255,255,255,0.26)"
                                : "rgba(15,23,42,0.16)"
                            }
                            strokeWidth="2"
                          />
                          <path
                            d="M 6 18 H 38"
                            stroke={
                              theme === "dark"
                                ? "rgba(255,255,255,0.22)"
                                : "rgba(15,23,42,0.14)"
                            }
                            strokeWidth="2"
                          />
                          <path
                            d="M 6 26 H 38"
                            stroke={
                              theme === "dark"
                                ? "rgba(255,255,255,0.20)"
                                : "rgba(15,23,42,0.12)"
                            }
                            strokeWidth="2"
                          />
                        </g>
                        <g id="dc-cloud">
                          <path
                            d="M 28 26 C 18 26 18 14 28 14 C 30 8 38 7 42 12 C 48 10 54 14 52 20 C 58 20 58 30 50 30 H 28 Z"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.14)"
                                : "rgba(15,23,42,0.10)"
                            }
                            stroke={
                              theme === "dark"
                                ? "rgba(56,189,248,0.55)"
                                : "rgba(37,99,235,0.50)"
                            }
                            strokeWidth="2"
                          />
                          <text
                            x="40"
                            y="25"
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="700"
                            fill={
                              theme === "dark"
                                ? "rgba(255,255,255,0.80)"
                                : "rgba(10,15,25,0.68)"
                            }
                          >
                            Internet
                          </text>
                        </g>
                      </defs>
                    </g>

                    {/* left-top (data center group) */}
                    <use href="#dc-server" x="120" y="100" />
                    <text
                      x="137"
                      y="168"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      File Server
                    </text>

                    <use href="#dc-server" x="190" y="90" />
                    <text
                      x="207"
                      y="158"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      WWW Server
                    </text>

                    <use href="#dc-server" x="110" y="188" />
                    <use href="#dc-server" x="160" y="188" />
                    <text
                      x="153"
                      y="256"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Database
                    </text>

                    <use href="#dc-server" x="270" y="150" />
                    <use href="#dc-server" x="315" y="150" />
                    <text
                      x="314"
                      y="218"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Communicate
                    </text>

                    <use href="#dc-switch" x="255" y="250" />
                    <text
                      x="294"
                      y="285"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Switch
                    </text>

                    <use href="#dc-firewall" x="360" y="298" />
                    <text
                      x="382"
                      y="348"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Firewall
                    </text>

                    <use href="#dc-router" x="430" y="252" />
                    <text
                      x="464"
                      y="288"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Router
                    </text>

                    {/* right-top (secondary data center) */}
                    <use href="#dc-router" x="585" y="160" />
                    <text
                      x="619"
                      y="196"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Router
                    </text>
                    <use href="#dc-switch" x="670" y="150" />
                    <text
                      x="709"
                      y="186"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Switch
                    </text>
                    <use href="#dc-server" x="580" y="110" />
                    <text
                      x="597"
                      y="178"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Database
                    </text>
                    <use href="#dc-pc" x="908" y="110" />
                    <use href="#dc-pc" x="908" y="146" />
                    <use href="#dc-pc" x="908" y="182" />
                    <use href="#dc-pc" x="908" y="218" />
                    <text
                      x="948"
                      y="126"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Record
                    </text>
                    <text
                      x="948"
                      y="162"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Finance
                    </text>
                    <text
                      x="948"
                      y="198"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Custom
                    </text>
                    <text
                      x="948"
                      y="234"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Others
                    </text>

                    {/* internet clouds */}
                    <use href="#dc-cloud" x="470" y="320" />

                    {/* client center bottom */}
                    <use href="#dc-server" x="585" y="382" />
                    <text
                      x="602"
                      y="450"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Communicate
                    </text>
                    <use href="#dc-switch" x="690" y="410" />
                    <text
                      x="729"
                      y="446"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.78)"
                          : "rgba(10,15,25,0.70)"
                      }
                    >
                      Switch
                    </text>
                    <use href="#dc-pc" x="908" y="382" />
                    <use href="#dc-pc" x="908" y="418" />
                    <use href="#dc-pc" x="908" y="454" />
                    <text
                      x="948"
                      y="398"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Record
                    </text>
                    <text
                      x="948"
                      y="434"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Finance
                    </text>
                    <text
                      x="948"
                      y="470"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Others
                    </text>

                    <use href="#dc-pc" x="90" y="200" />
                    <use href="#dc-pc" x="90" y="236" />
                    <use href="#dc-pc" x="90" y="272" />
                    <use href="#dc-pc" x="90" y="308" />
                    <text
                      x="78"
                      y="216"
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Manager
                    </text>
                    <text
                      x="78"
                      y="252"
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Manager
                    </text>
                    <text
                      x="78"
                      y="288"
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Finance
                    </text>
                    <text
                      x="78"
                      y="324"
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="700"
                      fill={
                        theme === "dark"
                          ? "rgba(255,255,255,0.76)"
                          : "rgba(10,15,25,0.68)"
                      }
                    >
                      Monitor
                    </text>

                    {/* blue links */}
                    <g opacity="0.95">
                      <path
                        d="M 137 150 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.82)"
                            : "rgba(37,99,235,0.75)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 207 140 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.82)"
                            : "rgba(37,99,235,0.75)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 153 240 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.72)"
                            : "rgba(37,99,235,0.65)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 314 205 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.72)"
                            : "rgba(37,99,235,0.65)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 106 211 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.70)"
                            : "rgba(37,99,235,0.62)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 106 247 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.70)"
                            : "rgba(37,99,235,0.62)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 106 283 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.70)"
                            : "rgba(37,99,235,0.62)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 106 319 L 294 260"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.70)"
                            : "rgba(37,99,235,0.62)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 294 260 L 382 316"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.78)"
                            : "rgba(37,99,235,0.72)"
                        }
                        strokeWidth="2.6"
                        fill="none"
                      />
                      <path
                        d="M 404 316 L 464 266"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.78)"
                            : "rgba(37,99,235,0.72)"
                        }
                        strokeWidth="2.6"
                        fill="none"
                      />
                      <path
                        d="M 619 174 L 709 162"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.70)"
                            : "rgba(37,99,235,0.62)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 709 162 L 908 126"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.70)"
                            : "rgba(37,99,235,0.62)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 709 162 L 908 162"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.64)"
                            : "rgba(37,99,235,0.58)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 709 162 L 908 198"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.64)"
                            : "rgba(37,99,235,0.58)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 709 162 L 908 234"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.64)"
                            : "rgba(37,99,235,0.58)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 602 420 L 729 422"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.72)"
                            : "rgba(37,99,235,0.64)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 729 422 L 908 398"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.72)"
                            : "rgba(37,99,235,0.64)"
                        }
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 729 422 L 908 434"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.62)"
                            : "rgba(37,99,235,0.56)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                      <path
                        d="M 729 422 L 908 470"
                        stroke={
                          theme === "dark"
                            ? "rgba(56,189,248,0.62)"
                            : "rgba(37,99,235,0.56)"
                        }
                        strokeWidth="2.2"
                        fill="none"
                      />
                    </g>

                    {/* animated real-time blue links */}
                    <g opacity="0.98">
                      <path
                        d="M 464 266 L 619 174"
                        fill="none"
                        stroke={beamSoft}
                        strokeWidth="3"
                        strokeDasharray="1 10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 464 266 L 619 174"
                        fill="none"
                        stroke="url(#dc-link)"
                        strokeWidth="3.2"
                        strokeDasharray="1 8"
                        strokeLinecap="round"
                        filter={
                          theme === "dark" ? "url(#dc-link-glow)" : undefined
                        }
                        style={{ animation: "infra-dash 3.6s linear infinite" }}
                      />
                    </g>

                    <g opacity="0.98">
                      <path
                        d="M 709 162 L 908 126"
                        fill="none"
                        stroke={beamSoft}
                        strokeWidth="3"
                        strokeDasharray="1 10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 709 162 L 908 126"
                        fill="none"
                        stroke="url(#dc-link)"
                        strokeWidth="3.2"
                        strokeDasharray="1 8"
                        strokeLinecap="round"
                        filter={
                          theme === "dark" ? "url(#dc-link-glow)" : undefined
                        }
                        style={{
                          animation: "infra-dash 4.1s linear infinite",
                          animationDelay: "0.18s",
                        }}
                      />
                    </g>

                    {/* yellow DDN / lightning links */}
                    <g opacity="0.98">
                      <polyline
                        points="498,266 525,248 508,238 548,220 526,210 560,196 542,186 585,174"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(250,204,21,0.92)"
                            : "rgba(234,179,8,0.92)"
                        }
                        strokeWidth="4"
                        strokeLinejoin="round"
                        filter={
                          theme === "dark" ? "url(#dc-ddn-glow)" : undefined
                        }
                      />
                      <polyline
                        points="498,266 525,248 508,238 548,220 526,210 560,196 542,186 585,174"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(250,204,21,0.98)"
                            : "rgba(234,179,8,0.98)"
                        }
                        strokeWidth="4"
                        strokeLinejoin="round"
                        strokeDasharray="10 12"
                        filter={
                          theme === "dark" ? "url(#dc-ddn-glow)" : undefined
                        }
                        style={{ animation: "infra-dash 2.7s linear infinite" }}
                      />
                      <text
                        x="540"
                        y="230"
                        fill={
                          theme === "dark"
                            ? "rgba(234,179,8,0.92)"
                            : "rgba(161,98,7,0.85)"
                        }
                        fontSize="12"
                        fontWeight="800"
                      >
                        DDN
                      </text>

                      <polyline
                        points="468,280 486,295 474,306 500,318 488,330 512,342"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(250,204,21,0.92)"
                            : "rgba(234,179,8,0.92)"
                        }
                        strokeWidth="4"
                        strokeLinejoin="round"
                        filter={
                          theme === "dark" ? "url(#dc-ddn-glow)" : undefined
                        }
                      />
                      <polyline
                        points="468,280 486,295 474,306 500,318 488,330 512,342"
                        fill="none"
                        stroke={
                          theme === "dark"
                            ? "rgba(250,204,21,0.92)"
                            : "rgba(234,179,8,0.92)"
                        }
                        strokeWidth="4"
                        strokeLinejoin="round"
                        strokeDasharray="10 12"
                        filter={
                          theme === "dark" ? "url(#dc-ddn-glow)" : undefined
                        }
                        style={{
                          animation: "infra-dash 3.1s linear infinite",
                          animationDelay: "0.12s",
                        }}
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {[
            {
              title: "Power paths",
              desc: "Redundant feeds, UPS strategy, and breaker-level visibility for rapid isolation.",
              Icon: Gauge,
            },
            {
              title: "Cooling envelope",
              desc: "Hot/cold aisle containment with telemetry and automated alarms on drift.",
              Icon: Activity,
            },
            {
              title: "Rack standards",
              desc: "Repeatable rack bill of materials, labeling, and cabling to minimize MTTR.",
              Icon: Server,
            },
          ].map((x) => (
            <motion.div
              key={x.title}
              variants={sectionReveal}
              className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                <x.Icon size={22} className="text-[color:var(--accent)]" />
              </div>
              <div className="mt-6 text-xl font-semibold">{x.title}</div>
              <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
                {x.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="control-room" className="mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Control Room (CR) & operations
          </h2>
          <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
            The “and more” layer: monitoring, incident response, and change
            controls that keep systems stable during growth.
          </p>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {[
            {
              title: "Dashboards",
              desc: "Golden signals with topology context so engineers find root cause faster.",
              Icon: Eye,
            },
            {
              title: "Alert routing",
              desc: "Noise reduced with SLO-based paging and auto-escalation policies.",
              Icon: AlertTriangle,
            },
            {
              title: "Runbooks",
              desc: "Repeatable playbooks with automation hooks for safe remediation.",
              Icon: Shield,
            },
            {
              title: "Change control",
              desc: "Progressive rollouts, guardrails, and audit trails to prevent regressions.",
              Icon: Activity,
            },
          ].map((x) => (
            <motion.div
              key={x.title}
              variants={sectionReveal}
              className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.10)]">
                <x.Icon size={22} className="text-[color:var(--accent)]" />
              </div>
              <div className="mt-6 text-lg font-semibold">{x.title}</div>
              <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed">
                {x.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-10 rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-12"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Want the full architecture walkthrough?
              </h3>
              <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
                We can tailor an infrastructure design review for your traffic
                profile, availability goals, and compliance requirements.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Request a review
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </ResourceLayout>
  );
}
