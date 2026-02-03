import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Mic,
  Zap,
  Shield,
  Activity,
  Image as ImageIcon,
  Briefcase,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Users,
  BarChart,
  Lock,
  Play,
  CheckCircle } from
'lucide-react';
import { Link } from 'react-router-dom';
export function SolutionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const solutions = useMemo(
    () => [
      {
        icon: Mic,
        title: 'Audio Transcription',
        desc: 'Process thousands of hours of audio in parallel using Whisper or custom models.',
        link: '/solutions/audio-transcription',
      },
      {
        icon: Zap,
        title: 'LLM Inference',
        desc: 'Serve open-source LLMs with high throughput and low latency using vLLM or TGI.',
        link: '/solutions/llm-inference',
      },
      {
        icon: Shield,
        title: 'Coding Agents',
        desc: 'Execute untrusted code securely in sandboxed environments for AI agents.',
        link: '/solutions/coding-agents',
      },
      {
        icon: Activity,
        title: 'Computational Bio',
        desc: 'Accelerate protein folding, drug discovery, and genomics workloads.',
        link: '/solutions/computational-bio',
      },
      {
        icon: ImageIcon,
        title: 'Image Generation',
        desc: 'Generate images at scale with Stable Diffusion, ComfyUI, or Flux.',
        link: '/solutions/image-generation',
      },
      {
        icon: Briefcase,
        title: 'Industry Solutions',
        desc: 'Reference architectures and templates for teams across every vertical.',
        link: '/solutions/industry-solutions',
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-hidden font-sans selection:bg-[color:var(--accent)] selection:text-black">
      <Nav />

      <main>
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-10 md:p-14 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-28 -left-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.14)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
                <div className="absolute -bottom-28 -right-28 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.10)_0%,rgba(var(--accent-rgb),0.00)_62%)]" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative"
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                  Solutions for <span className="text-[color:var(--accent)]">Builders</span>
                </h1>
                <p className="text-base md:text-lg text-[color:var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                  See how engineering teams are solving infrastructure challenges across industries.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) =>
            <motion.div key={sol.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                <Link
                  to={sol.link}
                  className="block p-10 rounded-3xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.45)] transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] flex items-center justify-center mb-8 text-[color:var(--accent)]">
                    <sol.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{sol.title}</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 h-20 text-lg leading-relaxed">
                    {sol.desc}
                  </p>
                  <div className="flex items-center text-[color:var(--accent)] font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* Industry Demos */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)]">
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
                  className="flex gap-6 p-6 rounded-2xl hover:bg-[color:var(--bg-tertiary)] transition-colors cursor-pointer group border border-transparent hover:border-[color:var(--border-color)]">

                    <div className="w-12 h-12 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] flex items-center justify-center shrink-0 text-[color:var(--accent)] group-hover:scale-110 transition-transform">
                      <ind.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[color:var(--accent)] transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-[color:var(--text-secondary)]">{ind.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-[color:var(--accent)]">
                  <BarChart size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-6">ROI Calculator</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-2">
                      Monthly Compute Hours
                    </label>
                    <input type="range" className="w-full accent-[color:var(--accent)]" />
                    <div className="flex justify-between text-xs text-[color:var(--text-tertiary)] mt-1">
                      <span>100</span>
                      <span>100,000</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-2">
                      Current Cloud Spend
                    </label>
                    <div className="text-3xl font-bold">$15,000</div>
                  </div>
                  <div className="p-4 bg-[color:var(--bg-secondary)] rounded-2xl border border-[rgba(var(--accent-rgb),0.35)]">
                    <div className="text-sm text-[color:var(--text-secondary)] mb-1">
                      Estimated Savings with Modal
                    </div>
                    <div className="text-4xl font-bold text-[color:var(--accent)]">
                      $6,500 / mo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Deep Dive */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <div className="text-[color:var(--accent)] font-bold tracking-wider text-sm mb-6 uppercase">
                  Featured Case Study
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  How Ramp uses Modal to process millions of receipts
                </h2>
                <p className="text-xl text-[color:var(--text-secondary)] mb-10 leading-relaxed">
                  "Modal allowed us to scale our OCR pipeline from processing
                  hundreds to millions of documents per day without managing a
                  single server. We reduced our infrastructure costs by 60%
                  while improving reliability."
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors">
                    Read the story
                  </button>
                  <button className="px-8 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors">
                    Watch video
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full aspect-video bg-[color:var(--bg-secondary)] rounded-3xl border border-[color:var(--border-color)] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-rgb),0.16)] to-transparent opacity-60" />
                <span className="text-6xl font-bold relative z-10">
                  ramp
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)]">
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
                className="h-20 bg-[color:var(--bg-primary)] rounded-2xl flex items-center justify-center font-bold text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:opacity-100 transition-all cursor-pointer border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.35)]">

                  {partner}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="py-20 px-6 border-y border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Enterprise Ready
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">
                <Shield className="text-[color:var(--accent)] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Security</h3>
                <ul className="space-y-3 text-[color:var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" /> SOC 2
                    Type II
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" />{' '}
                    End-to-end Encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" /> SSO &
                    RBAC
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-3xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">
                <Lock className="text-[color:var(--accent)] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Compliance</h3>
                <ul className="space-y-3 text-[color:var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" /> HIPAA
                    Available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" /> GDPR
                    Compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" /> BAA
                    Support
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-3xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">
                <Users className="text-[color:var(--accent)] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">Support</h3>
                <ul className="space-y-3 text-[color:var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" />{' '}
                    Dedicated Slack Channel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" />{' '}
                    Priority Support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--accent)]" /> 99.99%
                    Uptime SLA
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-[color:var(--bg-secondary)]">
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
                className="border border-[color:var(--border-color)] rounded-2xl bg-[color:var(--bg-primary)] overflow-hidden">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-[color:var(--bg-tertiary)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ?
                  <ChevronUp size={20} className="text-[color:var(--accent)]" /> :

                  <ChevronDown size={20} className="text-[color:var(--text-secondary)]" />
                  }
                  </button>
                  {openFaq === i &&
                <div className="px-6 pb-6 text-[color:var(--text-secondary)] leading-relaxed border-t border-[color:var(--border-color)] pt-4">
                      {faq.a}
                    </div>
                }
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6 text-center border-t border-[color:var(--border-color)] bg-gradient-to-b from-[color:var(--bg-primary)] to-[rgba(var(--accent-rgb),0.08)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Build your solution
            </h2>
            <p className="text-xl text-[color:var(--text-secondary)] mb-12 max-w-2xl mx-auto">
              Ready to scale? Let's discuss your infrastructure needs.
            </p>
            <button className="px-12 py-5 rounded-full bg-[color:var(--accent)] text-white font-bold text-xl hover:opacity-95 transition-all hover:scale-105 shadow-[0_0_30px_rgba(var(--accent-rgb),0.25)]">
              Talk to an Expert
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}