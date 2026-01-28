import React, { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Quote,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Globe,
  Users,
  Building,
  BarChart,
  Play,
  ArrowRight } from
'lucide-react';
export function CustomersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-32 px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Trusted by <span className="text-[#00ff88]">Innovators</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            From fast-growing startups to public companies, engineering teams
            rely on Modal to power their mission-critical AI workloads.
          </p>
        </section>

        {/* Logo Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {[
              'Ramp',
              'Substack',
              'Scale',
              'Vercel',
              'Replit',
              'Perplexity',
              'Descript',
              'Runway',
              'Pika',
              'Suno',
              'Cursor',
              'Linear'].
              map((name) =>
              <div
                key={name}
                className="h-20 bg-[#111] rounded-xl flex items-center justify-center text-xl font-bold text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-all cursor-default">

                  {name}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Interactive Map Placeholder */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Powering AI Globally</h2>
            <p className="text-xl text-gray-400 mb-16">
              Teams across 30+ countries build on Modal.
            </p>
            <div className="aspect-[2/1] bg-[#0a0a0a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff88]/10 to-transparent opacity-50" />
              <Globe size={200} className="text-gray-800 opacity-50" />
              {/* Dots representing locations */}
              {[...Array(10)].map((_, i) =>
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`
                }} />

              )}
            </div>
          </div>
        </section>

        {/* Detailed Case Studies */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Success Stories
            </h2>
            <div className="space-y-24">
              {[
              {
                company: 'Ramp',
                title: 'Scaling OCR to Millions',
                desc: 'How Ramp built a zero-ops document processing pipeline that scales to millions of receipts daily.',
                stat: '60% Cost Reduction'
              },
              {
                company: 'Substack',
                title: 'Personalized Recommendations',
                desc: 'Delivering custom reading recommendations to millions of users with low-latency inference.',
                stat: '10x Faster Deployments'
              },
              {
                company: 'Scale AI',
                title: 'Generative Media Pipeline',
                desc: 'Processing petabytes of image and video data for generative AI model training.',
                stat: 'Zero Ops Headcount'
              }].
              map((study, i) =>
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">

                  <div
                  className={`order-2 ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>

                    <div className="text-[#00ff88] font-bold mb-4 uppercase tracking-wider">
                      {study.company}
                    </div>
                    <h3 className="text-4xl font-bold mb-6">{study.title}</h3>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                      {study.desc}
                    </p>
                    <div className="flex items-center gap-8 mb-8">
                      <div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {study.stat}
                        </div>
                        <div className="text-sm text-gray-500">Key Result</div>
                      </div>
                    </div>
                    <button className="text-[#00ff88] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Read Case Study <ArrowRight size={20} />
                    </button>
                  </div>
                  <div
                  className={`order-1 ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} aspect-video bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden relative group-hover:border-[#00ff88]/50 transition-colors`}>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white opacity-20">
                        {study.company}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Hear from our customers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) =>
              <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-[#111] rounded-xl border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors" />
                    <Play
                    size={48}
                    className="text-white relative z-10 group-hover:scale-110 transition-transform" />

                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <div>
                      <div className="font-bold text-white">Jane Doe</div>
                      <div className="text-xs text-gray-500">CTO, TechCorp</div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    "Modal changed the way we think about infrastructure."
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Real Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <div className="text-6xl font-bold text-[#00ff88] mb-4">
                  60%
                </div>
                <div className="text-xl text-white font-bold mb-2">
                  Cost Reduction
                </div>
                <div className="text-gray-400">
                  Average savings vs legacy cloud
                </div>
              </div>
              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <div className="text-6xl font-bold text-[#00ff88] mb-4">
                  10x
                </div>
                <div className="text-xl text-white font-bold mb-2">
                  Faster Deployment
                </div>
                <div className="text-gray-400">From code to production</div>
              </div>
              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <div className="text-6xl font-bold text-[#00ff88] mb-4">0</div>
                <div className="text-xl text-white font-bold mb-2">
                  Ops Headcount
                </div>
                <div className="text-gray-400">
                  Required to manage infrastructure
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Breakdown */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Diverse Use Cases</h2>
              <p className="text-xl text-gray-400 mb-8">
                Modal powers workloads across every major industry, from
                generative AI startups to Fortune 500 enterprises.
              </p>
              <ul className="space-y-4">
                {[
                {
                  label: 'Generative AI',
                  pct: '40%'
                },
                {
                  label: 'Fintech',
                  pct: '25%'
                },
                {
                  label: 'Healthcare & Bio',
                  pct: '20%'
                },
                {
                  label: 'Media & Entertainment',
                  pct: '15%'
                }].
                map((item, i) =>
                <div key={i}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>{item.label}</span>
                      <span>{item.pct}</span>
                    </div>
                    <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden">
                      <div
                      className="bg-[#00ff88] h-full"
                      style={{
                        width: item.pct
                      }} />

                    </div>
                  </div>
                )}
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex items-center justify-center">
              {/* Placeholder for Pie Chart */}
              <div className="w-64 h-64 rounded-full border-8 border-[#111] relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">1000+</div>
                  <div className="text-sm text-gray-500">Customers</div>
                </div>
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
                q: 'Can I read detailed case studies?',
                a: 'Yes, check out our blog for deep dives into how customers architect their systems on Modal.'
              },
              {
                q: 'Do you sign BAAs?',
                a: 'Yes, we sign BAAs for Enterprise customers in healthcare and life sciences.'
              },
              {
                q: 'How do you handle data privacy?',
                a: 'We are SOC 2 Type II compliant and encrypt all data at rest and in transit.'
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
              Join the leaders
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Start building on the infrastructure chosen by the world's best
              engineering teams.
            </p>
            <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              Contact Sales
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}