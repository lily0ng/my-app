import { useMemo, useRef, useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Users,
  Share2,
  ChevronDown,
  ChevronUp,
  Cloud,
  Play,
  Database,
  Lock,
  GitBranch,
  Layout,
  ArrowRight,
  Terminal,
  Globe,
  Shield,
  Zap,
  Braces } from
'lucide-react';
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  type ReactFlowInstance,
  type NodeProps,
  type Edge,
  type Node,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';


type TurboNodeData = {
  title: string;
  subtitle?: string;
  kind: 'developer' | 'portal' | 'api' | 'auth' | 'db' | 'compute' | 'job';
  tone?: 'purple' | 'blue';
};

type TurboEdgeData = {
  tone?: 'purple' | 'blue';
};

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '').trim();
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  if (full.length !== 6) return `rgba(168,85,247,${alpha})`;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((v) => Number.isNaN(v))) return `rgba(168,85,247,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

function TurboNode({ data }: NodeProps<TurboNodeData>) {
  const { theme, darkAccent } = useTheme();
  const Icon =
    data.kind === 'developer'
      ? Terminal
      : data.kind === 'portal'
        ? Globe
        : data.kind === 'auth'
          ? Shield
          : data.kind === 'db'
            ? Database
            : data.kind === 'compute'
              ? Cloud
              : data.kind === 'job'
                ? Zap
                : Braces;

  const isPurple = (data.tone ?? 'purple') === 'purple';
  const purpleA = theme === 'dark' ? hexToRgba(darkAccent, 0.95) : 'rgba(124,58,237,0.85)';
  const gradA = isPurple ? purpleA : theme === 'dark' ? 'rgba(59,130,246,0.95)' : 'rgba(37,99,235,0.80)';
  const gradB = isPurple ? (theme === 'dark' ? 'rgba(236,72,153,0.95)' : 'rgba(236,72,153,0.75)') : theme === 'dark' ? 'rgba(34,211,238,0.95)' : 'rgba(34,211,238,0.70)';
  const innerBg = theme === 'dark' ? 'rgba(11,11,16,0.92)' : 'rgba(255,255,255,0.92)';
  const innerBorder = theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(17,24,39,0.10)';
  const titleColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subColor = theme === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(17,24,39,0.55)';
  const iconBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(17,24,39,0.04)';
  const iconBorder = theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(17,24,39,0.10)';
  const iconColor = theme === 'dark' ? '#ffffff' : '#111827';

  return (
    <div
      className="w-[220px] rounded-xl p-[1px]"
      style={{
        background: `linear-gradient(90deg, ${gradA}, ${gradB})`,
        boxShadow:
          theme === 'dark'
            ? `0 0 18px rgba(168,85,247,0.28), 0 0 22px rgba(59,130,246,0.18)`
            : `0 0 18px rgba(124,58,237,0.18), 0 0 18px rgba(37,99,235,0.12)`,
      }}
    >
      <div className="rounded-[11px] px-4 py-3" style={{ backgroundColor: innerBg, border: `1px solid ${innerBorder}` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: iconBg, border: `1px solid ${iconBorder}`, color: iconColor }}
            >
              <Icon size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate" style={{ color: titleColor }}>
                {data.title}
              </div>
              {data.subtitle ? (
                <div className="mt-0.5 text-[11px] truncate" style={{ color: subColor }}>
                  {data.subtitle}
                </div>
              ) : null}
            </div>
          </div>
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${innerBorder}`, backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.20)' : 'rgba(17,24,39,0.04)' }}
          >
            <div
              className="h-3.5 w-3.5 rounded-full"
              style={{ border: `1px solid ${innerBorder}`, backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(17,24,39,0.08)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const turboNodes: Node<TurboNodeData>[] = [
  {
    id: 'dev',
    type: 'turbo',
    position: { x: 50, y: 150 },
    data: { title: 'Developer', subtitle: 'Local', kind: 'developer', tone: 'purple' },
  },
  {
    id: 'api',
    type: 'turbo',
    position: { x: 310, y: 70 },
    data: { title: 'API Client', subtitle: 'CLI + SDK', kind: 'api', tone: 'blue' },
  },
  {
    id: 'job',
    type: 'turbo',
    position: { x: 310, y: 230 },
    data: { title: 'Hot Reload', subtitle: 'Sync + rebuild', kind: 'job', tone: 'purple' },
  },
  {
    id: 'portal',
    type: 'turbo',
    position: { x: 600, y: 150 },
    data: { title: '1CNG Portal', subtitle: 'Public', kind: 'portal', tone: 'blue' },
  },
  {
    id: 'auth',
    type: 'turbo',
    position: { x: 860, y: 70 },
    data: { title: 'Auth', subtitle: 'SSO + API keys', kind: 'auth', tone: 'purple' },
  },
  {
    id: 'compute',
    type: 'turbo',
    position: { x: 860, y: 230 },
    data: { title: 'Cloud Compute', subtitle: 'GPU + CPU', kind: 'compute', tone: 'blue' },
  },
  {
    id: 'db',
    type: 'turbo',
    position: { x: 1120, y: 150 },
    data: { title: 'Data', subtitle: 'Storage + secrets', kind: 'db', tone: 'purple' },
  },
];

const turboEdges: Edge<TurboEdgeData>[] = [
  {
    id: 'e-dev-api',
    source: 'dev',
    target: 'api',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'blue' },
  },
  {
    id: 'e-dev-job',
    source: 'dev',
    target: 'job',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'purple' },
  },
  {
    id: 'e-api-portal',
    source: 'api',
    target: 'portal',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'blue' },
  },
  {
    id: 'e-job-portal',
    source: 'job',
    target: 'portal',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'purple' },
  },
  {
    id: 'e-portal-auth',
    source: 'portal',
    target: 'auth',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'purple' },
  },
  {
    id: 'e-portal-compute',
    source: 'portal',
    target: 'compute',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'blue' },
  },
  {
    id: 'e-auth-db',
    source: 'auth',
    target: 'db',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'purple' },
  },
  {
    id: 'e-compute-db',
    source: 'compute',
    target: 'db',
    type: 'smoothstep',
    animated: true,
    data: { tone: 'blue' },
  },
];
export function NotebooksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { theme, darkAccent } = useTheme();
  const [nodes] = useNodesState<TurboNodeData>(turboNodes);
  const [edges] = useEdgesState<TurboEdgeData>(turboEdges);
  const flowRef = useRef<ReactFlowInstance | null>(null);

  const styledEdges = useMemo(() => {
    const baseBlue = theme === 'dark' ? 'rgba(59,130,246,0.72)' : 'rgba(37,99,235,0.55)';
    const basePurple = theme === 'dark' ? hexToRgba(darkAccent, 0.72) : 'rgba(124,58,237,0.55)';
    const shadowBlue =
      theme === 'dark'
        ? 'drop-shadow(0px 0px 12px rgba(59,130,246,0.35))'
        : 'drop-shadow(0px 0px 10px rgba(37,99,235,0.18))';
    const shadowPurple =
      theme === 'dark'
        ? `drop-shadow(0px 0px 12px ${hexToRgba(darkAccent, 0.35)})`
        : 'drop-shadow(0px 0px 10px rgba(124,58,237,0.18))';

    return edges.map((e) => {
      const tone = e.data?.tone ?? 'blue';
      const stroke = tone === 'purple' ? basePurple : baseBlue;
      const filter = tone === 'purple' ? shadowPurple : shadowBlue;
      return { ...e, animated: true, style: { stroke, strokeWidth: 2, filter } };
    });
  }, [darkAccent, edges, theme]);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />
      <main>
        <section className="pt-28 pb-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/6 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#6d7cff]/12 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-gray-200 text-sm font-medium border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                Local Dev Experience
              </div>
              <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight">
                Local <span className="text-[#8b5cf6]">Dev Experience</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Develop against the cloud as if it were your laptop. Hot reloading included.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <button className="px-7 py-3.5 rounded-full bg-[#8b5cf6] text-white font-semibold hover:bg-[#7c3aed] transition-colors">
                  Get Started
                </button>
                <button className="px-7 py-3.5 rounded-full border border-white/15 text-white/90 font-semibold hover:bg-white/5 transition-colors">
                  View Documentation
                </button>
              </div>
            </div>

            <div className="mt-14 w-full">
              <div
                className="h-[340px] md:h-[420px] w-full"
                style={{
                  backgroundColor: theme === 'dark' ? '#07070c' : '#ffffff',
                }}
              >
                <ReactFlow
                  nodes={nodes}
                  edges={styledEdges}
                  nodeTypes={{ turbo: TurboNode }}
                  fitView
                  fitViewOptions={{ padding: 0.2 }}
                  onInit={(instance) => {
                    flowRef.current = instance;
                    instance.fitView({ padding: 0.2 });
                    requestAnimationFrame(() => instance.fitView({ padding: 0.2 }));
                    window.setTimeout(() => instance.fitView({ padding: 0.2 }), 0);
                  }}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  panOnDrag={false}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                  preventScrolling
                  proOptions={{ hideAttribution: true }}
                >
                  <Background
                    variant={BackgroundVariant.Dots}
                    color={theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(17,24,39,0.10)'}
                    gap={18}
                    size={1}
                  />
                </ReactFlow>
              </div>
            </div>
          </div>
        </section>


        {/* Live Demo Section */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experience the power
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Instant startup. Real-time collaboration. Infinite compute.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
              <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-3 text-xs text-gray-500 font-mono">onecloud / local-dev</div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono">⌘K</span>
                  <span className="text-xs text-[#00ff88] font-medium px-2 py-1 rounded bg-[#00ff88]/10">Synced</span>
                </div>
              </div>

              <div className="grid grid-cols-[220px_1fr]">
                <div className="border-r border-white/10 bg-[#0b0b0b]">
                  <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-gray-500">Explorer</div>
                  <div className="px-3 pb-3 font-mono text-[12px] text-gray-300 space-y-1">
                    <div className="text-gray-400">src/</div>
                    <div className="pl-3">main.ts</div>
                    <div className="pl-3">cloud.ts</div>
                    <div className="pl-3 text-[#00ff88]">dev.ts</div>
                    <div className="text-gray-400 mt-2">configs/</div>
                    <div className="pl-3">dev.json</div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-[#111] px-4 py-2">
                    <div className="text-xs font-mono text-gray-400">dev.ts</div>
                    <div className="ml-auto text-xs text-gray-500">hot reload enabled</div>
                  </div>

                  <div className="p-5 font-mono text-[12px] leading-relaxed">
                    <div className="grid grid-cols-[24px_1fr] gap-3">
                      <div className="text-gray-600 text-right select-none">1</div>
                      <div className="text-gray-300">
                        <span className="text-[#00ff88]">import</span> {'{'} createDevSession {'}'} <span className="text-[#00ff88]">from</span> <span className="text-yellow-300">'./cloud'</span>
                      </div>

                      <div className="text-gray-600 text-right select-none">2</div>
                      <div className="text-gray-300">
                        <span className="text-[#00ff88]">import</span> {'{'} app {'}'} <span className="text-[#00ff88]">from</span> <span className="text-yellow-300">'./main'</span>
                      </div>

                      <div className="text-gray-600 text-right select-none">3</div>
                      <div className="text-gray-500">// Develop against the cloud like it’s your laptop</div>

                      <div className="text-gray-600 text-right select-none">4</div>
                      <div className="text-gray-300">
                        <span className="text-[#00ff88]">const</span> dev = <span className="text-blue-400">createDevSession</span>({'{'} hotReload: <span className="text-blue-400">true</span> {'}'})
                      </div>

                      <div className="text-gray-600 text-right select-none">5</div>
                      <div className="text-gray-300">
                        dev.<span className="text-blue-400">run</span>(app)
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 bg-[#0b0b0b] px-4 py-3 font-mono text-[12px] text-gray-300">
                    <div className="text-gray-500">Terminal</div>
                    <div className="mt-2">
                      <span className="text-[#00ff88]">$</span> dev start
                    </div>
                    <div className="text-gray-500">listening on http://localhost:5173 • syncing to cloud…</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Built for modern AI teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
              {
                icon: Cloud,
                title: 'Cloud parity',
                desc: 'Develop locally while targeting the same cloud runtime and resources you use in production.'
              },
              {
                icon: Users,
                title: 'Real-time Collab',
                desc: 'Edit code and view outputs together with your team, just like Google Docs.'
              },
              {
                icon: Share2,
                title: 'Instant previews',
                desc: 'Preview changes immediately with hot reload and share a link to a running environment.'
              },
              {
                icon: Database,
                title: 'Persistent Storage',
                desc: 'Mount network volumes to keep datasets and models across sessions.'
              },
              {
                icon: GitBranch,
                title: 'Version Control',
                desc: 'Integrated with Git. Commit and push directly from the interface.'
              },
              {
                icon: Lock,
                title: 'Secure Environment',
                desc: 'Enterprise-grade security with SSO and role-based access control.'
              }].
              map((f, i) =>
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 hover:scale-105 group">

                  <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mb-6 text-[#00ff88] group-hover:scale-110 transition-transform">
                    <f.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {f.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GPU Comparison */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Choose your power
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider">
                      GPU Type
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider">
                      Memory
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider">
                      Best For
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                  {
                    name: 'NVIDIA T4',
                    mem: '16 GB',
                    perf: 'Standard',
                    use: 'Inference, Light Training',
                    price: '$0.000164/sec'
                  },
                  {
                    name: 'NVIDIA A10G',
                    mem: '24 GB',
                    perf: 'High',
                    use: 'Fine-tuning, Graphics',
                    price: '$0.000306/sec'
                  },
                  {
                    name: 'NVIDIA A100',
                    mem: '40/80 GB',
                    perf: 'Ultra',
                    use: 'LLM Training, Research',
                    price: '$0.001097/sec'
                  },
                  {
                    name: 'NVIDIA H100',
                    mem: '80 GB',
                    perf: 'Extreme',
                    use: 'Foundation Models',
                    price: '$0.001261/sec'
                  }].
                  map((gpu, i) =>
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4 font-bold text-white">
                        {gpu.name}
                      </td>
                      <td className="py-6 px-4 text-gray-300">{gpu.mem}</td>
                      <td className="py-6 px-4 text-gray-300">{gpu.perf}</td>
                      <td className="py-6 px-4 text-gray-300">{gpu.use}</td>
                      <td className="py-6 px-4 text-[#00ff88] font-mono">
                        {gpu.price}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">See it in action</h2>
            <p className="text-xl text-gray-400 mb-12">
              Watch how easy it is to develop locally against cloud resources.
            </p>
            <div className="aspect-video bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center group cursor-pointer hover:border-[#00ff88] transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <Play
                size={64}
                className="text-white fill-white opacity-80 group-hover:scale-110 transition-transform relative z-10" />

              <div className="absolute bottom-8 left-8 text-left z-10">
                <h3 className="text-2xl font-bold mb-2">
                  Getting Started with Local Dev
                </h3>
                <p className="text-gray-300">3:45 • Walkthrough</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Gallery */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  Start faster with templates
                </h2>
                <p className="text-xl text-gray-400">
                  Clone these templates to get up and running in seconds.
                </p>
              </div>
              <button className="text-[#00ff88] font-bold hover:text-[#00cc6a] flex items-center gap-2">
                View all templates <ArrowRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
              {
                title: 'Hot reload starter',
                desc: 'A minimal setup with instant feedback loops and cloud parity.',
                tags: ['Dev', 'Local']
              },
              {
                title: 'Stable Diffusion XL',
                desc: 'Interactive image generation app with fast iteration and live preview.',
                tags: ['Image Gen', 'App']
              },
              {
                title: 'Data Exploration',
                desc: 'Pandas and Polars setup with high-memory instance.',
                tags: ['Data', 'Analysis']
              },
              {
                title: 'RAG Pipeline',
                desc: 'Build a RAG system with LangChain and Vector DB.',
                tags: ['RAG', 'LangChain']
              },
              {
                title: 'Whisper Transcription',
                desc: 'Audio processing pipeline using OpenAI Whisper.',
                tags: ['Audio', 'Inference']
              },
              {
                title: 'Computer Vision',
                desc: 'Object detection using YOLOv8 and custom datasets.',
                tags: ['CV', 'App']
              }].
              map((t, i) =>
              <div
                key={i}
                className="p-8 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88] transition-all cursor-pointer group">

                  <div className="flex gap-2 mb-4">
                    {t.tags.map((tag) =>
                  <span
                    key={tag}
                    className="text-xs font-bold px-2 py-1 rounded bg-white/5 text-gray-300">

                        {tag}
                      </span>
                  )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ff88] transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{t.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Layout size={16} /> Use Template
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Customer Stories */}
        <section className="py-32 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              How teams use Local Dev
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="relative overflow-hidden p-10 rounded-2xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(var(--accent-rgb),0.16),transparent_58%)]" />
                <div className="relative h-12 w-32 bg-black/10 dark:bg-white/10 rounded mb-8 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">
                  Accelerating Research
                </h3>
                <p className="text-[color:var(--text-secondary)] mb-8 leading-relaxed">
                  "Local Dev Experience allowed our research team to iterate 10x
                  faster. We can spin up an H100 for an hour to test a
                  hypothesis and shut it down immediately, saving thousands in
                  idle costs."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10" />
                  <div>
                    <div className="font-bold">Sarah Chen</div>
                    <div className="text-sm text-[color:var(--text-tertiary)]">
                      Lead AI Researcher
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden p-10 rounded-2xl bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(var(--accent-rgb),0.16),transparent_58%)]" />
                <div className="relative h-12 w-32 bg-black/10 dark:bg-white/10 rounded mb-8 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">
                  Collaborative Education
                </h3>
                <p className="text-[color:var(--text-secondary)] mb-8 leading-relaxed">
                  "We use Local Dev Experience for our internal ML bootcamp. Being able to
                  share a link to a running environment with all dependencies
                  pre-installed removed so much friction for our students."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10" />
                  <div>
                    <div className="font-bold">David Miller</div>
                    <div className="text-sm text-[color:var(--text-tertiary)]">
                      Engineering Manager
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Develop locally, deploy confidently</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0 text-[#00ff88] font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Run locally
                  </h3>
                  <p className="text-gray-400">
                    Start your app on your laptop with hot reload.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0 text-[#00ff88] font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Import to Modal</h3>
                  <p className="text-gray-400">
                    Deploy the same code to the cloud without changing your workflow.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0 text-[#00ff88] font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Select your GPU</h3>
                  <p className="text-gray-400">
                    Choose the resources you need and iterate quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">FAQ</h2>
            <div className="space-y-4">
              {[
              {
                q: 'Can I use my own environment?',
                a: 'Yes, you can define custom container images for your dev environment using standard Dockerfiles or your existing tooling.'
              },
              {
                q: 'How much does it cost?',
                a: 'You pay for the compute resources (CPU/GPU) used while your environment is running, per second. No upfront fees.'
              },
              {
                q: 'Are files persistent?',
                a: 'Your project files can persist via attached storage. Mount volumes to keep data and artifacts across restarts.'
              },
              {
                q: 'Can I schedule jobs?',
                a: 'Yes, you can run scheduled tasks and background jobs alongside your dev workflow.'
              },
              {
                q: 'Is it secure?',
                a: 'Yes, environments are isolated and can be protected with SSO and granular permission controls for enterprise teams.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ?
                  <ChevronUp size={20} className="text-gray-500" /> :

                  <ChevronDown size={20} className="text-gray-500" />
                  }
                  </button>
                  {openFaq === i &&
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                }
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Start coding in the cloud
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Get $30/mo in free credits. Spin up your first cloud environment in
              seconds.
            </p>
            <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              Get Started
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}