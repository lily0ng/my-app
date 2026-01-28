import React, { useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { HeroSection } from '../../components/HeroSection';
import {
  Layers,
  HardDrive,
  Network,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
  Play,
  BarChart,
  Activity,
  Shield,
  Code2,
  Database } from
'lucide-react';
export function TrainingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00ff88]/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-medium mb-8 border border-[#00ff88]/20">
              Modal Training
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Fine-tune models <br />{' '}
              <span className="text-[#00ff88]">at scale</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Train and fine-tune custom models on thousands of GPUs without
              managing infrastructure.
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                Start Training
              </button>
              <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                View Benchmarks
              </button>
            </div>
          </div>
        </section>

        {/* 2. Features Grid */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
              {
                icon: Cpu,
                title: 'Instant GPU Access',
                desc: 'Access H100s, A100s, and A10Gs instantly. No quotas, no waiting.'
              },
              {
                icon: Network,
                title: 'Distributed Training',
                desc: 'Scale across multiple nodes effortlessly with PyTorch DDP or Ray.'
              },
              {
                icon: HardDrive,
                title: 'Persistent Storage',
                desc: 'Mount high-performance network volumes to save checkpoints and datasets.'
              }].
              map((feature, i) =>
              <div
                key={i}
                className="p-10 rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-[#00ff88]/50 transition-all duration-300 group hover:-translate-y-2">

                  <div className="w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center mb-8 text-[#00ff88] group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. Interactive Simulator */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Estimate Training Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Model Size (Params)
                  </label>
                  <input
                    type="range"
                    className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                  <div className="text-right text-[#00ff88] font-bold mt-2">
                    7B
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Dataset Size (Tokens)
                  </label>
                  <input
                    type="range"
                    className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                  <div className="text-right text-[#00ff88] font-bold mt-2">
                    10B
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    GPU Count (H100)
                  </label>
                  <input
                    type="range"
                    className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                  <div className="text-right text-[#00ff88] font-bold mt-2">
                    8
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center bg-[#111] rounded-xl p-8">
                <div className="text-gray-400 mb-2">Estimated Time</div>
                <div className="text-5xl font-bold text-white mb-4">4h 12m</div>
                <div className="text-gray-400 mb-2">Estimated Cost</div>
                <div className="text-3xl font-bold text-[#00ff88]">$120.00</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Frameworks */}
        <section className="py-32 px-6 border-y border-white/5 bg-[#050505]">
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
                className="text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default">

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
                Distributed training made simple
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Spin up a cluster of GPUs with a single decorator. Modal handles
                the networking, scheduling, and fault tolerance.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-300 text-lg">
                  <CheckCircle className="text-[#00ff88]" /> Automatic node
                  discovery
                </li>
                <li className="flex items-center gap-4 text-gray-300 text-lg">
                  <CheckCircle className="text-[#00ff88]" /> Fast interconnect
                  between nodes
                </li>
                <li className="flex items-center gap-4 text-gray-300 text-lg">
                  <CheckCircle className="text-[#00ff88]" /> Stream logs from
                  all workers to your terminal
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 font-mono text-sm shadow-2xl">
              <pre className="text-gray-300">
                <code>
                  <span className="text-[#00ff88]">@app.function</span>(gpu=
                  <span className="text-yellow-300">"H100:8"</span>){'\n'}
                  <span className="text-[#00ff88]">def</span>{' '}
                  <span className="text-blue-400">train</span>():{'\n'}
                  {'    '}# This runs on 8 H100s{'\n'}
                  {'    '}dist.init_process_group(){'\n'}
                  {'    '}model = DDP(model){'\n'}
                  {'    '}...
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 6. Architecture Diagram */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Distributed Architecture
            </h2>
            <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 relative">
              <div className="grid grid-cols-3 gap-8 relative z-10">
                <div className="col-span-3 flex justify-center mb-8">
                  <div className="p-4 bg-[#111] rounded-xl border border-white/10 w-48 font-bold text-[#00ff88]">
                    Orchestrator
                  </div>
                </div>
                {[1, 2, 3].map((i) =>
                <div
                  key={i}
                  className="p-6 bg-[#111] rounded-xl border border-white/10">

                    <Cpu className="mx-auto mb-4 text-blue-400" />
                    <div className="font-bold">Worker {i}</div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>
          </div>
        </section>

        {/* 7. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Fine-tuning Llama 3</h2>
              <p className="text-gray-400">
                Watch how to fine-tune a 70B model on your own data.
              </p>
            </div>
            <div className="aspect-video bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="w-24 h-24 bg-[#00ff88] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                <Play size={40} className="text-black ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Checkpoint Management */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6 p-4 bg-[#111] rounded-xl border border-white/5">
                <Database className="text-[#00ff88]" />
                <div>
                  <div className="font-bold">checkpoint_1000.pt</div>
                  <div className="text-xs text-gray-500">24GB • Just now</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6 p-4 bg-[#111] rounded-xl border border-white/5 opacity-70">
                <Database className="text-gray-500" />
                <div>
                  <div className="font-bold text-gray-400">
                    checkpoint_500.pt
                  </div>
                  <div className="text-xs text-gray-500">24GB • 1h ago</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">Persistent Storage</h2>
              <p className="text-xl text-gray-400 mb-8">
                Mount high-performance network volumes to save checkpoints and
                datasets. Access them from any worker or your local machine.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#00ff88]" /> High throughput
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#00ff88]" /> Concurrent access
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#00ff88]" /> Durable persistence
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Metrics Dashboard */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Real-time Training Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-gray-400 mb-2">Loss</div>
                <div className="text-4xl font-bold text-white mb-4">0.042</div>
                <div className="h-16 bg-[#111] rounded-lg"></div>
              </div>
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-gray-400 mb-2">Throughput</div>
                <div className="text-4xl font-bold text-white mb-4">
                  4.2k tok/s
                </div>
                <div className="h-16 bg-[#111] rounded-lg"></div>
              </div>
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-gray-400 mb-2">GPU Util</div>
                <div className="text-4xl font-bold text-[#00ff88] mb-4">
                  98%
                </div>
                <div className="h-16 bg-[#111] rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Customer Stories */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-[#00ff88] font-bold mb-4">SCALE AI</div>
                <h3 className="text-2xl font-bold mb-4">
                  Training RLHF models
                </h3>
                <p className="text-gray-400 mb-8">
                  "Modal's infrastructure allowed us to iterate on our reward
                  models 5x faster."
                </p>
                <a
                  href="#"
                  className="text-[#00ff88] font-bold hover:underline">

                  Read case study &rarr;
                </a>
              </div>
              <div className="p-10 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-[#00ff88] font-bold mb-4">PERPLEXITY</div>
                <h3 className="text-2xl font-bold mb-4">
                  Custom LLM fine-tuning
                </h3>
                <p className="text-gray-400 mb-8">
                  "We fine-tune models daily on fresh data using Modal's batch
                  jobs."
                </p>
                <a
                  href="#"
                  className="text-[#00ff88] font-bold hover:underline">

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
                q: 'How do I manage checkpoints?',
                a: 'Use Modal Volumes to persist checkpoints across runs. Volumes are high-performance network file systems.'
              },
              {
                q: 'Can I use Spot instances?',
                a: 'Yes, you can request spot instances to save costs on training jobs.'
              },
              {
                q: 'What is the network bandwidth?',
                a: 'We provide high-bandwidth networking suitable for distributed training workloads.'
              },
              {
                q: 'Do you support custom containers?',
                a: 'Yes, you can bring your own Docker image or define one in Python.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ?
                  <ChevronUp size={20} className="text-[#00ff88]" /> :

                  <ChevronDown size={20} className="text-gray-500" />
                  }
                  </button>
                  <div
                  className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>

                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
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
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">Start training today</h2>
            <p className="text-2xl text-gray-400 mb-12 font-light">
              Get access to H100s instantly. No waiting list.
            </p>
            <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
              Launch Training Job
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}