import React, { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calculator,
  CreditCard,
  Shield,
  Zap,
  HelpCircle } from
'lucide-react';
export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'hour' | 'second'>(
    'second'
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [usage, setUsage] = useState(50);
  const gpuTasks = [
  {
    name: 'Nvidia B200',
    price: 0.001736
  },
  {
    name: 'Nvidia H200',
    price: 0.001261
  },
  {
    name: 'Nvidia H100',
    price: 0.001097
  },
  {
    name: 'Nvidia A100, 80 GB',
    price: 0.000694
  },
  {
    name: 'Nvidia A100, 40 GB',
    price: 0.000583
  },
  {
    name: 'Nvidia L40S',
    price: 0.000542
  },
  {
    name: 'Nvidia A10',
    price: 0.000306
  },
  {
    name: 'Nvidia L4',
    price: 0.000222
  },
  {
    name: 'Nvidia T4',
    price: 0.000164
  }];

  const formatPrice = (price: number) => {
    if (billingPeriod === 'hour') {
      return `$${(price * 3600).toFixed(2)} / hr`;
    }
    return `$${price.toFixed(6)} / sec`;
  };
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Hero Text */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                Pricing as <br />
                <span className="text-[#00ff88]">magical</span> as our <br />
                product
              </h1>
              <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
                With Modal, you always pay for what you use and nothing more.
                You never pay for idle resources — just actual compute time, by
                the CPU cycle.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Compute Costs Table */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Compute costs</h2>
                <div className="bg-[#1a1a1a] rounded-full p-1 flex items-center border border-white/10">
                  <button
                    onClick={() => setBillingPeriod('hour')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === 'hour' ? 'bg-[#00ff88] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>

                    Per hour
                  </button>
                  <button
                    onClick={() => setBillingPeriod('second')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === 'second' ? 'bg-[#00ff88] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>

                    Per second
                  </button>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      GPU Tasks
                    </h3>
                  </div>
                  {gpuTasks.map((gpu) =>
                  <div
                    key={gpu.name}
                    className="flex justify-between items-center text-sm hover:bg-white/5 p-2 rounded transition-colors">

                      <span className="text-gray-300 font-medium">
                        {gpu.name}
                      </span>
                      <span className="font-mono text-[#00ff88] font-bold">
                        {formatPrice(gpu.price)}
                      </span>
                    </div>
                  )}

                  <div className="border-b border-white/10 pb-2 mb-4 mt-8">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      CPU & Memory
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">
                      Physical core (2 vCPU)
                    </span>
                    <div className="text-right">
                      <span className="font-mono text-white font-bold">
                        {billingPeriod === 'hour' ?
                        '$0.047 / core / hr' :
                        '$0.0000131 / core / sec'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2">
                    <span className="text-gray-300 font-medium">Memory</span>
                    <span className="font-mono text-white font-bold">
                      {billingPeriod === 'hour' ?
                      '$0.008 / GiB / hr' :
                      '$0.00000222 / GiB / sec'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-32">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-12 text-center">
              Pricing Plans
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="bg-gradient-to-b from-[#0a2a1a] to-[#05150d] border border-white/10 rounded-2xl p-10 flex flex-col hover:border-[#00ff88]/30 transition-all duration-300 hover:scale-105 group">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold text-white">$0</span>
                  <span className="text-sm text-gray-400 font-medium">
                    + compute / month
                  </span>
                </div>
                <p className="text-gray-400 mb-8 h-12 leading-relaxed">
                  Built for small teams and independent developers looking to
                  level up.
                </p>
                <button className="w-full py-4 rounded-full bg-[#00ff88] text-black font-bold text-sm mb-8 hover:bg-[#00cc6a] transition-colors shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                  Get started with $30 / month free credit
                </button>
                <ul className="space-y-4">
                  {[
                  '$30 / month free credits',
                  '3 workspace seats included',
                  '100 containers + 10 GPU concurrency',
                  'Crons and web endpoints (limited)',
                  'Real-time metrics and logs',
                  'Region selection'].
                  map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300">

                      <div className="mt-0.5 rounded-full bg-[#00ff88] p-0.5 shrink-0">
                        <Check size={12} className="text-black" />
                      </div>
                      {item}
                    </li>
                  )}
                </ul>
              </div>

              {/* Team */}
              <div className="bg-gradient-to-b from-[#0a2a1a] to-[#05150d] border border-white/10 rounded-2xl p-10 flex flex-col hover:border-[#00ff88]/30 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-[#00ff88]" />
                <h3 className="text-2xl font-bold text-white mb-2">Team</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold text-white">$250</span>
                  <span className="text-sm text-gray-400 font-medium">
                    + compute / month
                  </span>
                </div>
                <p className="text-gray-400 mb-8 h-12 leading-relaxed">
                  Built for startups and larger organizations looking to scale
                  quickly.
                </p>
                <button className="w-full py-4 rounded-full border border-white/20 text-white font-bold text-sm mb-8 hover:bg-white/5 transition-colors">
                  Sign in to upgrade
                </button>
                <ul className="space-y-4">
                  {[
                  '$100 / month free credits',
                  'Unlimited seats',
                  '1000 containers + 50 GPU concurrency',
                  'Unlimited crons and web endpoints',
                  'Custom domains',
                  'Static IP proxy',
                  'Deployment rollbacks'].
                  map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300">

                      <div className="mt-0.5 rounded-full bg-[#00ff88] p-0.5 shrink-0">
                        <Check size={12} className="text-black" />
                      </div>
                      {item}
                    </li>
                  )}
                </ul>
              </div>

              {/* Enterprise */}
              <div className="bg-gradient-to-b from-[#0a2a1a] to-[#05150d] border border-white/10 rounded-2xl p-10 flex flex-col hover:border-[#00ff88]/30 transition-all duration-300 hover:scale-105 group">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold text-white">Custom</span>
                </div>
                <p className="text-gray-400 mb-8 h-12 leading-relaxed">
                  For organizations prioritizing security, support, and
                  everlasting confidence.
                </p>
                <button className="w-full py-4 rounded-full border border-white/20 text-white font-bold text-sm mb-8 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  Get in touch <ArrowRight size={16} />
                </button>
                <ul className="space-y-4">
                  {[
                  'Volume-based discounts',
                  'Unlimited seats',
                  'Higher GPU concurrency',
                  'Embedded ML engineering services',
                  'Support via private Slack',
                  'Audit logs, Okta SSO, and HIPAA'].
                  map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300">

                      <div className="mt-0.5 rounded-full bg-[#00ff88] p-0.5 shrink-0">
                        <Check size={12} className="text-black" />
                      </div>
                      {item}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Cost Calculator */}
          <section className="py-32 px-6 bg-[#050505] -mx-6 mb-32">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">
                Estimate your costs
              </h2>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-lg font-bold mb-4">
                      GPU Usage (A100 hours/month)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={usage}
                      onChange={(e) => setUsage(parseInt(e.target.value))}
                      className="w-full accent-[#00ff88] h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />

                    <div className="mt-4 text-4xl font-bold text-white">
                      {usage} hours
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-gray-400 mb-2">
                      Estimated Monthly Cost
                    </div>
                    <div className="text-5xl font-bold text-[#00ff88]">
                      ${(usage * 3.95).toFixed(2)}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      *Based on A100 pricing. Actual costs may vary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-32">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Compare Plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    <th className="py-6 px-4 text-white font-bold text-xl w-1/4">
                      Starter
                    </th>
                    <th className="py-6 px-4 text-[#00ff88] font-bold text-xl w-1/4">
                      Team
                    </th>
                    <th className="py-6 px-4 text-white font-bold text-xl w-1/4">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                  {
                    feat: 'Monthly Credits',
                    s: '$30',
                    t: '$100',
                    e: 'Custom'
                  },
                  {
                    feat: 'Concurrency Limit',
                    s: '100',
                    t: '1000',
                    e: 'Unlimited'
                  },
                  {
                    feat: 'GPU Limit',
                    s: '10',
                    t: '50',
                    e: 'Custom'
                  },
                  {
                    feat: 'Seats',
                    s: '3',
                    t: 'Unlimited',
                    e: 'Unlimited'
                  },
                  {
                    feat: 'SSO',
                    s: '-',
                    t: '-',
                    e: 'Included'
                  },
                  {
                    feat: 'Support',
                    s: 'Community',
                    t: 'Standard',
                    e: 'Dedicated Slack'
                  }].
                  map((row, i) =>
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4 font-bold text-white">
                        {row.feat}
                      </td>
                      <td className="py-6 px-4 text-gray-300">{row.s}</td>
                      <td className="py-6 px-4 text-[#00ff88] font-bold">
                        {row.t}
                      </td>
                      <td className="py-6 px-4 text-white font-bold">
                        {row.e}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 border-t border-white/5">
            <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
              {
                q: 'Are there any hidden fees?',
                a: 'No. You only pay for the compute resources you use. There are no seat fees or platform fees.'
              },
              {
                q: 'Do you offer startup credits?',
                a: 'Yes, we have a startup program. Apply to get up to $5,000 in credits.'
              },
              {
                q: 'How does billing work?',
                a: 'We bill monthly based on your usage in the previous month. You can set spending limits to avoid surprises.'
              },
              {
                q: 'Can I pay with invoice?',
                a: 'Yes, Team and Enterprise plans support invoicing.'
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
          </section>

          {/* CTA */}
          <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Ready to start?
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of developers building the future of AI on Modal.
              </p>
              <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                Sign Up Now
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>);

}