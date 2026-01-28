import React, { useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import {
  ArrowRight,
  Zap,
  Clock,
  Server,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BarChart,
  Code2,
  Activity,
  Shield,
  Globe,
  Cpu,
  Layers,
  Play,
  Lock } from
'lucide-react';
export function InferencePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#00ff88] selection:text-black font-sans">
      <Nav />

      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00ff88]/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-medium mb-8 border border-[#00ff88]/20">
                Modal Inference
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                High-performance <br />
                <span className="text-[#00ff88]">Inference</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                Deploy LLMs, image generation models, and audio models with
                sub-second cold starts and instant autoscaling. Pay only for the
                compute you use.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 rounded-full bg-[#00ff88] text-black font-bold text-lg hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                  Deploy Model
                </button>
                <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/5 transition-all hover:scale-105">
                  View Examples
                </button>
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 font-mono text-sm shadow-2xl relative group">
              <div className="absolute -top-6 -right-6 bg-[#00ff88] text-black text-xs font-bold px-4 py-2 rounded-lg shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                RUNS IN &lt; 1s
              </div>
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <pre className="text-gray-300 overflow-x-auto">
                <code>
                  <span className="text-[#00ff88]">@app.cls</span>(gpu=
                  <span className="text-yellow-300">"A100"</span>){'\n'}
                  <span className="text-[#00ff88]">class</span>{' '}
                  <span className="text-blue-400">Model</span>:{'\n'}
                  {'    '}
                  <span className="text-[#00ff88]">@modal.enter</span>(){'\n'}
                  {'    '}
                  <span className="text-[#00ff88]">def</span>{' '}
                  <span className="text-blue-400">load</span>(self):{'\n'}
                  {'        '}self.pipe = pipeline(
                  <span className="text-yellow-300">"text-generation"</span>)
                  {'\n\n'}
                  {'    '}
                  <span className="text-[#00ff88]">@modal.method</span>(){'\n'}
                  {'    '}
                  <span className="text-[#00ff88]">def</span>{' '}
                  <span className="text-blue-400">generate</span>(self, prompt):
                  {'\n'}
                  {'        '}return self.pipe(prompt)
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 2. Metrics Grid */}
        <section className="py-24 px-6 border-y border-white/5 bg-[#050505]">
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
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[#00ff88] font-medium mb-2 uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">{stat.desc}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. Live Demo */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Live Inference Demo</h2>
              <p className="text-gray-400">
                Experience the speed of Modal inference firsthand.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Enter a prompt..."
                  className="flex-1 bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00ff88] outline-none"
                  defaultValue="Explain quantum computing to a 5 year old" />

                <button className="bg-[#00ff88] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00cc6a] transition-colors">
                  Generate
                </button>
              </div>
              <div className="bg-[#111] rounded-lg p-6 min-h-[200px] text-gray-300 font-mono text-sm leading-relaxed">
                <span className="text-[#00ff88] animate-pulse">▋</span>
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Model: Llama 3 70B</span>
                <span>Latency: 124ms</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Features */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-20 text-center">
              Why Modal for Inference?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
              {
                icon: Clock,
                title: 'Serverless that feels local',
                desc: 'Develop and test your inference code locally, then deploy with a single command. We handle the containerization.'
              },
              {
                icon: Zap,
                title: 'Blazing fast cold starts',
                desc: 'Our custom container runtime and file system are optimized for AI workloads, enabling sub-second boot times.'
              },
              {
                icon: Server,
                title: 'Any hardware you need',
                desc: 'Access H100s, A100s, A10Gs, and more. Mix and match GPU types within the same application.'
              }].
              map((feature, i) =>
              <div
                key={i}
                className="flex flex-col items-start p-8 rounded-2xl hover:bg-[#0a0a0a] transition-colors">

                  <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-8 text-[#00ff88] shadow-lg">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              )}
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
              <div
                key={model}
                className="p-6 border border-white/10 rounded-xl bg-[#0a0a0a] flex items-center gap-4 hover:border-[#00ff88] transition-colors group cursor-default">

                  <CheckCircle
                  size={20}
                  className="text-[#00ff88] group-hover:scale-110 transition-transform" />

                  <span className="font-medium text-gray-300 text-lg">
                    {model}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. Architecture Diagram */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">How it works</h2>
            <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 relative overflow-hidden">
              {/* Simplified CSS Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="p-6 bg-[#111] rounded-xl border border-white/10 w-48">
                  <Code2 className="mx-auto mb-4 text-blue-400" size={32} />
                  <div className="font-bold">Your Code</div>
                </div>
                <ArrowRight className="text-gray-600 hidden md:block" />
                <div className="p-6 bg-[#111] rounded-xl border border-white/10 w-48">
                  <Layers className="mx-auto mb-4 text-[#00ff88]" size={32} />
                  <div className="font-bold">Modal Cloud</div>
                </div>
                <ArrowRight className="text-gray-600 hidden md:block" />
                <div className="p-6 bg-[#111] rounded-xl border border-white/10 w-48">
                  <Globe className="mx-auto mb-4 text-purple-400" size={32} />
                  <div className="font-bold">API Endpoint</div>
                </div>
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
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Expose your models via a standard REST API that works with
                existing tools and libraries. Simply add the{' '}
                <code className="bg-[#1a1a1a] px-2 py-1 rounded text-[#00ff88] text-sm">
                  @web_endpoint
                </code>{' '}
                decorator.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-300 text-lg">
                  <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                    <CheckCircle size={18} />
                  </div>
                  Works with LangChain, LlamaIndex, etc.
                </li>
                <li className="flex items-center gap-4 text-gray-300 text-lg">
                  <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                    <CheckCircle size={18} />
                  </div>
                  Streaming support out of the box
                </li>
                <li className="flex items-center gap-4 text-gray-300 text-lg">
                  <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                    <CheckCircle size={18} />
                  </div>
                  Custom authentication and rate limiting
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 font-mono text-sm shadow-2xl">
              <pre className="text-gray-300">
                <code>
                  <span className="text-[#00ff88]">@app.function</span>(){'\n'}
                  <span className="text-[#00ff88]">@modal.web_endpoint</span>
                  (method=<span className="text-yellow-300">"POST"</span>){'\n'}
                  <span className="text-[#00ff88]">def</span>{' '}
                  <span className="text-blue-400">inference</span>(item: Item):
                  {'\n'}
                  {'    '}return model.generate(item.prompt)
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 8. Cost Calculator */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Estimate your costs
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Requests per day
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                <div className="text-right text-[#00ff88] font-bold mt-2">
                  100,000
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Avg. Execution Time
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                <div className="text-right text-[#00ff88] font-bold mt-2">
                  500ms
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="text-xl font-bold">
                  Estimated Monthly Cost
                </span>
                <span className="text-4xl font-bold text-[#00ff88]">
                  $145.00
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Watch the tutorial</h2>
              <p className="text-gray-400">
                Learn how to deploy a production-ready inference endpoint.
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

        {/* 10. Monitoring Dashboard */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl">
              {/* Mock Chart */}
              <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-white/10">
                {[40, 60, 45, 70, 85, 60, 75, 50, 65, 80].map((h, i) =>
                <div
                  key={i}
                  className="w-full bg-[#00ff88]/20 rounded-t-sm hover:bg-[#00ff88] transition-colors"
                  style={{
                    height: `${h}%`
                  }} />

                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">
                Real-time observability
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Monitor throughput, latency, and error rates in real-time. Drill
                down into individual request logs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Live metric streaming
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Structured logging
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Custom alerts
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
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <Shield className="mx-auto mb-6 text-[#00ff88]" size={32} />
                <h3 className="text-xl font-bold mb-4">
                  End-to-End Encryption
                </h3>
                <p className="text-gray-400">
                  Data is encrypted in transit and at rest.
                </p>
              </div>
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <Lock className="mx-auto mb-6 text-[#00ff88]" size={32} />
                <h3 className="text-xl font-bold mb-4">Private Networking</h3>
                <p className="text-gray-400">Connect securely to your VPC.</p>
              </div>
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                {/* <Users className="mx-auto mb-6 text-[#00ff88]" size={32} /> */}
                <h3 className="text-xl font-bold mb-4">RBAC</h3>
                <p className="text-gray-400">
                  Fine-grained access controls for your team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Case Studies */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-[#00ff88] font-bold mb-4">RAMP</div>
                <h3 className="text-2xl font-bold mb-4">
                  Scaling OCR to millions of documents
                </h3>
                <p className="text-gray-400 mb-8">
                  "We reduced our invoice processing costs by 70% while
                  improving accuracy."
                </p>
                <a
                  href="#"
                  className="text-[#00ff88] font-bold hover:underline">

                  Read case study &rarr;
                </a>
              </div>
              <div className="p-10 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <div className="text-[#00ff88] font-bold mb-4">SUBSTACK</div>
                <h3 className="text-2xl font-bold mb-4">
                  Personalized recommendations at scale
                </h3>
                <p className="text-gray-400 mb-8">
                  "Modal enabled us to deploy a complex recommendation engine in
                  days, not months."
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

        {/* 13. Migration Guide */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Migrating from SageMaker?
            </h2>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-8 mb-8 border-b border-white/10 pb-8">
                <div>
                  <h4 className="font-bold mb-4 text-red-400">SageMaker</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Complex configuration</li>
                    <li>• Slow deployment times</li>
                    <li>• Expensive idle instances</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-[#00ff88]">Modal</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Pure Python definition</li>
                    <li>• Instant deployment</li>
                    <li>• Scale to zero</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <button className="text-white font-bold hover:text-[#00ff88] transition-colors">
                  View migration guide &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 14. API Reference Preview */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Developer-first API
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-[#0a0a0a] rounded-xl border border-white/10 font-mono text-sm">
                <div className="text-[#00ff88] mb-2">modal.App</div>
                <p className="text-gray-500">
                  Define your application and its resources.
                </p>
              </div>
              <div className="p-6 bg-[#0a0a0a] rounded-xl border border-white/10 font-mono text-sm">
                <div className="text-[#00ff88] mb-2">modal.Image</div>
                <p className="text-gray-500">
                  Define container environments in code.
                </p>
              </div>
              <div className="p-6 bg-[#0a0a0a] rounded-xl border border-white/10 font-mono text-sm">
                <div className="text-[#00ff88] mb-2">modal.Volume</div>
                <p className="text-gray-500">
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

        {/* 16. CTA */}
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">
              Start deploying in minutes
            </h2>
            <p className="text-2xl text-gray-400 mb-12 font-light">
              Get $30 in free credits every month. No credit card required to
              start.
            </p>
            <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
              Deploy your first model
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>);

}