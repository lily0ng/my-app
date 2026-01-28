import React, { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Mic,
  Zap,
  Shield,
  Activity,
  Image as ImageIcon,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Users,
  Building,
  BarChart,
  Code,
  Lock,
  Play,
  CheckCircle } from
'lucide-react';
export function SolutionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const solutions = [
  {
    icon: Mic,
    title: 'Audio Transcription',
    desc: 'Process thousands of hours of audio in parallel using Whisper or custom models.',
    link: '/examples/audio'
  },
  {
    icon: Zap,
    title: 'LLM Inference',
    desc: 'Serve open-source LLMs with high throughput and low latency using vLLM or TGI.',
    link: '/examples/llm'
  },
  {
    icon: Shield,
    title: 'Coding Agents',
    desc: 'Execute untrusted code securely in sandboxed environments for AI agents.',
    link: '/examples/agents'
  },
  {
    icon: Activity,
    title: 'Computational Bio',
    desc: 'Accelerate protein folding, drug discovery, and genomics workloads.',
    link: '/examples/bio'
  },
  {
    icon: ImageIcon,
    title: 'Image Generation',
    desc: 'Generate images at scale with Stable Diffusion, ComfyUI, or Flux.',
    link: '/examples/image'
  }];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-32 px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Solutions for <span className="text-[#00ff88]">Builders</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            See how engineering teams are using Modal to solve complex
            infrastructure challenges across every industry.
          </p>
        </section>

        {/* Solutions Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) =>
            <div
              key={i}
              className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/30 transition-all duration-300 hover:scale-105 group">

                <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mb-8 text-[#00ff88]">
                  <sol.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {sol.title}
                </h3>
                <p className="text-gray-400 mb-8 h-20 text-lg leading-relaxed">
                  {sol.desc}
                </p>
                <div className="flex items-center text-[#00ff88] font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                  View example <ArrowRight size={16} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Industry Demos */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Industry Solutions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                {[
                {
                  title: 'Fintech',
                  desc: 'Real-time fraud detection and risk analysis on millions of transactions.',
                  icon: BarChart
                },
                {
                  title: 'Healthcare',
                  desc: 'Secure processing of medical imaging and genomic data.',
                  icon: Activity
                },
                {
                  title: 'Media & Entertainment',
                  desc: 'Automated video editing, transcoding, and content generation.',
                  icon: Play
                },
                {
                  title: 'E-commerce',
                  desc: 'Personalized recommendations and visual search at scale.',
                  icon: Users
                }].
                map((ind, i) =>
                <div
                  key={i}
                  className="flex gap-6 p-6 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">

                    <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center shrink-0 text-[#00ff88] group-hover:scale-110 transition-transform">
                      <ind.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ff88] transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-gray-400">{ind.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-[#00ff88]">
                  <BarChart size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-6">ROI Calculator</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Monthly Compute Hours
                    </label>
                    <input type="range" className="w-full accent-[#00ff88]" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>100</span>
                      <span>100,000</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Current Cloud Spend
                    </label>
                    <div className="text-3xl font-bold text-white">$15,000</div>
                  </div>
                  <div className="p-4 bg-[#111] rounded-xl border border-[#00ff88]/30">
                    <div className="text-sm text-gray-400 mb-1">
                      Estimated Savings with Modal
                    </div>
                    <div className="text-4xl font-bold text-[#00ff88]">
                      $6,500 / mo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Deep Dive */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <div className="text-[#00ff88] font-bold tracking-wider text-sm mb-6 uppercase">
                  Featured Case Study
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  How Ramp uses Modal to process millions of receipts
                </h2>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                  "Modal allowed us to scale our OCR pipeline from processing
                  hundreds to millions of documents per day without managing a
                  single server. We reduced our infrastructure costs by 60%
                  while improving reliability."
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                    Read the story
                  </button>
                  <button className="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                    Watch video
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full aspect-video bg-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-50" />
                <span className="text-6xl font-bold text-white relative z-10">
                  ramp
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Integrates with your stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60">
              {[
              'OpenAI',
              'Hugging Face',
              'LangChain',
              'LlamaIndex',
              'Pinecone',
              'Weaviate',
              'Supabase',
              'Vercel',
              'AWS',
              'GCP',
              'GitHub',
              'Docker'].
              map((partner) =>
              <div
                key={partner}
                className="h-20 bg-[#111] rounded-xl flex items-center justify-center font-bold text-gray-400 hover:text-white hover:opacity-100 transition-all cursor-pointer border border-white/5 hover:border-[#00ff88]/30">

                  {partner}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Enterprise Ready
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <Shield className="text-[#00ff88] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Security</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" /> SOC 2
                    Type II
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" />{' '}
                    End-to-end Encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" /> SSO &
                    RBAC
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <Lock className="text-[#00ff88] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Compliance</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" /> HIPAA
                    Available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" /> GDPR
                    Compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" /> BAA
                    Support
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <Users className="text-[#00ff88] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Support</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" />{' '}
                    Dedicated Slack Channel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" />{' '}
                    Priority Support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00ff88]" /> 99.99%
                    Uptime SLA
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">FAQ</h2>
            <div className="space-y-4">
              {[
              {
                q: 'Can I get a custom solution?',
                a: 'Yes, our solutions engineering team can help architect your application and provide custom implementation support.'
              },
              {
                q: 'Do you offer enterprise support?',
                a: 'Yes, Enterprise plans include dedicated support, SLAs, and private Slack channels.'
              },
              {
                q: 'How does migration work?',
                a: 'We provide migration guides and hands-on support to help you move workloads from AWS, GCP, or other providers.'
              },
              {
                q: 'Is there a volume discount?',
                a: 'Yes, we offer volume discounts for high-scale usage. Contact sales for details.'
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
              Build your solution
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to scale? Let's discuss your infrastructure needs.
            </p>
            <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              Talk to an Expert
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}