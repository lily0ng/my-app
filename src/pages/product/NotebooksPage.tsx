import { useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import {
  Users,
  Share2,
  ChevronDown,
  ChevronUp,
  Cloud,
  MessageSquare,
  Play,
  Database,
  Lock,
  GitBranch,
  Layout,
  ArrowRight } from
'lucide-react';
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  type NodeProps,
  type Edge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

type DevFlowNodeData = {
  title: string;
  detail?: string;
  icon: 'dev' | 'org' | 'chat' | 'cloud';
};

function DevFlowNode({ data }: NodeProps<DevFlowNodeData>) {
  const icon =
    data.icon === 'dev' ? (
      <div className="h-8 w-8 rounded-lg bg-[#6d7cff]/15 border border-[#6d7cff]/30 flex items-center justify-center text-[#6d7cff]">
        <Layout size={16} />
      </div>
    ) : data.icon === 'org' ? (
      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
        <Users size={16} />
      </div>
    ) : data.icon === 'chat' ? (
      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
        <MessageSquare size={16} />
      </div>
    ) : (
      <div className="h-8 w-8 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/25 flex items-center justify-center text-[#00ff88]">
        <Cloud size={16} />
      </div>
    );

  return (
    <div className="min-w-[180px] rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <div className="flex items-start gap-3">
        {icon}
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-white truncate">{data.title}</div>
          {data.detail ? (
            <div className="mt-0.5 text-[11px] text-gray-500 leading-snug">{data.detail}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export function NotebooksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [nodes] = useNodesState<DevFlowNodeData>([
    {
      id: 'dev',
      type: 'dev',
      position: { x: 30, y: 120 },
      data: { title: 'Developer', detail: 'VS Code + hot reload', icon: 'dev' },
    },
    {
      id: 'org',
      type: 'dev',
      position: { x: 285, y: 55 },
      data: { title: 'Org / Team', detail: 'Shared environments', icon: 'org' },
    },
    {
      id: 'chat',
      type: 'dev',
      position: { x: 285, y: 185 },
      data: { title: 'Review & Chat', detail: 'Context + logs', icon: 'chat' },
    },
    {
      id: 'cloud',
      type: 'dev',
      position: { x: 560, y: 120 },
      data: { title: 'Cloud Runtime', detail: 'GPUs • storage • services', icon: 'cloud' },
    },
  ]);

  const [edges] = useEdgesState<Edge>([
    {
      id: 'e-dev-org',
      source: 'dev',
      target: 'org',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: 'rgba(109,124,255,0.9)', strokeWidth: 2 },
    },
    {
      id: 'e-dev-chat',
      source: 'dev',
      target: 'chat',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: 'rgba(109,124,255,0.55)', strokeWidth: 2 },
    },
    {
      id: 'e-org-cloud',
      source: 'org',
      target: 'cloud',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: 'rgba(0,255,136,0.7)', strokeWidth: 2 },
    },
    {
      id: 'e-chat-cloud',
      source: 'chat',
      target: 'cloud',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: 'rgba(0,255,136,0.45)', strokeWidth: 2 },
    },
  ]);
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
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d7cff]" />
                Local Dev Experience
              </div>
              <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight">
                Local <span className="text-[#6d7cff]">Dev Experience</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Develop against the cloud as if it were your laptop. Hot reloading included.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <button className="px-7 py-3.5 rounded-full bg-[#6d7cff] text-white font-semibold hover:bg-[#5b69ff] transition-colors">
                  Get Started
                </button>
                <button className="px-7 py-3.5 rounded-full border border-white/15 text-white/90 font-semibold hover:bg-white/5 transition-colors">
                  View Documentation
                </button>
              </div>
            </div>

            <div className="mt-14 relative rounded-[28px] border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6d7cff]/20 via-transparent to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-[#0f0f10]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-2 text-xs text-gray-500 font-mono">Developer → Org → Cloud</div>
                <div className="ml-auto text-xs text-gray-500">live topology</div>
              </div>

              <div className="h-[320px] md:h-[380px]">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={{ dev: DevFlowNode }}
                  fitView
                  fitViewOptions={{ padding: 0.22 }}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  panOnDrag={false}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                  proOptions={{ hideAttribution: true }}
                  defaultEdgeOptions={{ animated: true, markerEnd: { type: MarkerType.ArrowClosed } }}
                >
                  <Background color="rgba(255,255,255,0.12)" gap={18} size={1} />
                  <Controls
                    showInteractive={false}
                    position="bottom-right"
                    style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.10)' }}
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
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              How teams use Local Dev
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-gradient-to-br from-[#0a2a1a] to-[#05150d] p-10 rounded-2xl border border-white/10">
                <div className="h-12 w-32 bg-white/10 rounded mb-8 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">
                  Accelerating Research
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  "Local Dev Experience allowed our research team to iterate 10x
                  faster. We can spin up an H100 for an hour to test a
                  hypothesis and shut it down immediately, saving thousands in
                  idle costs."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700" />
                  <div>
                    <div className="font-bold">Sarah Chen</div>
                    <div className="text-sm text-gray-400">
                      Lead AI Researcher
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#0a2a1a] to-[#05150d] p-10 rounded-2xl border border-white/10">
                <div className="h-12 w-32 bg-white/10 rounded mb-8 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">
                  Collaborative Education
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  "We use Local Dev Experience for our internal ML bootcamp. Being able to
                  share a link to a running environment with all dependencies
                  pre-installed removed so much friction for our students."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700" />
                  <div>
                    <div className="font-bold">David Miller</div>
                    <div className="text-sm text-gray-400">
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