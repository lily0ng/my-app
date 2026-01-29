import { useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import {
  Cpu,
  Zap,
  ChevronDown,
  ChevronUp,
  Globe,
  Lock,
  Database,
  CheckCircle,
  Play,
  ArrowRight } from
'lucide-react';
export function CorePlatformPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />
      <main>
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00ff88]/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-medium mb-8 border border-[#00ff88]/20">
                Accelerators
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                Any GPU, <br />{' '}
                <span className="text-[#00ff88]">Instantly</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed">
                Access H100s, A100s, and more without quotas or capacity planning.
              </p>
              <div className="flex gap-6">
                <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                  Browse GPUs
                </button>
                <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                  View pricing
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: 'H100',
                    memory: '80 GB',
                    desc: 'Best for foundation models and training.',
                    price: '$/hr',
                  },
                  {
                    name: 'A100',
                    memory: '80 GB',
                    desc: 'Great for LLM fine-tuning and research.',
                    price: '$/hr',
                  },
                  {
                    name: 'L40S',
                    memory: '48 GB',
                    desc: 'Ideal for image/video and mixed workloads.',
                    price: '$/hr',
                  },
                  {
                    name: 'A10G',
                    memory: '24 GB',
                    desc: 'Cost-effective for inference and apps.',
                    price: '$/hr',
                  },
                ].map((g) => (
                  <div
                    key={g.name}
                    className="group rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 hover:border-[#00ff88]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Cpu size={18} className="text-[#00ff88]" />
                          <div className="text-lg font-bold text-white">{g.name}</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-400 leading-relaxed">{g.desc}</div>
                      </div>
                      <div className="shrink-0 inline-flex items-center rounded-full bg-[#00ff88]/10 text-[#00ff88] px-2.5 py-1 text-xs font-semibold">
                        {g.memory}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-gray-500">On-demand</span>
                      <span className="text-[#00ff88] font-mono">{g.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-500">
                GPUs shown for illustration. Availability varies by region.
              </div>
            </div>
          </div>
        </section>


        {/* Architecture Diagram */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Reimagined from the kernel up
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We didn't just wrap Kubernetes. We built a custom container
                runtime optimized for millisecond cold starts and massive
                concurrency.
              </p>
            </div>

            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="text-center p-6 border border-white/5 rounded-xl bg-[#111]">
                  <div className="w-16 h-16 mx-auto bg-[#00ff88]/10 rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Custom Runtime</h3>
                  <p className="text-gray-400 text-sm">
                    Replaces standard Docker runtime. Optimized for image
                    caching and rapid container creation.
                  </p>
                </div>
                <div className="text-center p-6 border border-white/5 rounded-xl bg-[#111]">
                  <div className="w-16 h-16 mx-auto bg-[#00ff88]/10 rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                    <Database size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Distributed FS</h3>
                  <p className="text-gray-400 text-sm">
                    High-performance global file system that mounts volumes in
                    milliseconds.
                  </p>
                </div>
                <div className="text-center p-6 border border-white/5 rounded-xl bg-[#111]">
                  <div className="w-16 h-16 mx-auto bg-[#00ff88]/10 rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Global Scheduler</h3>
                  <p className="text-gray-400 text-sm">
                    Intelligent placement of workloads across regions based on
                    data locality and GPU availability.
                  </p>
                </div>
              </div>

              {/* Connecting lines visualization could go here */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/50 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">Why Modal?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    <th className="py-6 px-4 text-[#00ff88] font-bold text-xl w-1/4">
                      Modal
                    </th>
                    <th className="py-6 px-4 text-gray-500 font-medium w-1/4">
                      AWS Lambda
                    </th>
                    <th className="py-6 px-4 text-gray-500 font-medium w-1/4">
                      Kubernetes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                  {
                    feat: 'Cold Start',
                    modal: '< 500ms',
                    aws: '~5-10s (GPU)',
                    k8s: 'Minutes'
                  },
                  {
                    feat: 'GPU Support',
                    modal: 'Any (H100, A100...)',
                    aws: 'Limited',
                    k8s: 'Manual Config'
                  },
                  {
                    feat: 'Max Runtime',
                    modal: 'Unlimited',
                    aws: '15 mins',
                    k8s: 'Unlimited'
                  },
                  {
                    feat: 'Developer Exp',
                    modal: 'Python Code',
                    aws: 'Zip files / Console',
                    k8s: 'YAML Hell'
                  },
                  {
                    feat: 'Concurrency',
                    modal: '10k+ Containers',
                    aws: 'Quota Limited',
                    k8s: 'Cluster Limited'
                  }].
                  map((row, i) =>
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4 font-bold text-white">
                        {row.feat}
                      </td>
                      <td className="py-6 px-4 text-[#00ff88] font-bold">
                        {row.modal}
                      </td>
                      <td className="py-6 px-4 text-gray-400">{row.aws}</td>
                      <td className="py-6 px-4 text-gray-400">{row.k8s}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Enterprise-grade Security
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Security isn't an afterthought. It's baked into the core of our
                runtime.
              </p>
              <ul className="space-y-6">
                {[
                'gVisor Sandboxing: Kernel-level isolation for every container',
                'SOC 2 Type II Compliant',
                'End-to-end Encryption for all data in transit and at rest',
                'Granular RBAC and SSO integration'].
                map((item, i) =>
                <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="text-[#00ff88] mt-1 shrink-0" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                )}
              </ul>
              <div className="flex gap-6 mt-10">
                <div className="h-16 w-16 bg-[#111] rounded border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">
                  SOC 2
                </div>
                <div className="h-16 w-16 bg-[#111] rounded border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">
                  HIPAA
                </div>
                <div className="h-16 w-16 bg-[#111] rounded border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">
                  GDPR
                </div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Lock size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-6">Isolation Model</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#111] rounded border border-white/5">
                  <div className="text-[#00ff88] font-mono text-sm mb-1">
                    User Code
                  </div>
                  <div className="h-2 bg-gray-800 rounded w-3/4" />
                </div>
                <div className="p-4 bg-[#1a1a1a] rounded border border-[#00ff88]/30">
                  <div className="text-white font-mono text-sm mb-1">
                    gVisor Sandbox
                  </div>
                  <div className="text-xs text-gray-500">
                    Syscall interception & validation
                  </div>
                </div>
                <div className="p-4 bg-[#111] rounded border border-white/5">
                  <div className="text-gray-400 font-mono text-sm mb-1">
                    Host Kernel
                  </div>
                  <div className="h-2 bg-gray-800 rounded w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tour */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Under the hood</h2>
            <p className="text-xl text-gray-400 mb-12">
              See how we built a cloud from scratch to serve AI workloads.
            </p>
            <div className="aspect-video bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center group cursor-pointer hover:border-[#00ff88] transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <Play
                size={64}
                className="text-white fill-white opacity-80 group-hover:scale-110 transition-transform relative z-10" />

              <div className="absolute bottom-8 left-8 text-left z-10">
                <h3 className="text-2xl font-bold mb-2">
                  Modal Architecture Deep Dive
                </h3>
                <p className="text-gray-300">12:45 • Technical Talk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Scale without limits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
              {
                label: 'Uptime SLA',
                value: '99.99%',
                desc: 'Guaranteed reliability'
              },
              {
                label: 'Global Regions',
                value: '12+',
                desc: 'Low latency worldwide'
              },
              {
                label: 'Daily Jobs',
                value: '1M+',
                desc: 'Processed successfully'
              },
              {
                label: 'Data Processed',
                value: 'PB+',
                desc: 'Monthly throughput'
              }].
              map((stat, i) =>
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 text-center hover:border-[#00ff88]/30 transition-colors">

                  <div className="text-5xl font-bold text-white mb-4">
                    {stat.value}
                  </div>
                  <div className="text-[#00ff88] font-bold text-lg mb-2">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.desc}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Disaster Recovery */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-4xl font-bold mb-6">Resilience built-in</h2>
              <p className="text-gray-400 text-lg">
                Our platform is designed to handle failures gracefully, ensuring
                your mission-critical workloads never stop.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
              {
                title: 'Auto-Healing',
                desc: 'Failed containers are automatically replaced instantly.'
              },
              {
                title: 'Multi-AZ',
                desc: 'Workloads are spread across availability zones for redundancy.'
              },
              {
                title: 'Data Durability',
                desc: 'Volumes are replicated 3x for 99.999999999% durability.'
              },
              {
                title: 'Traffic Shifting',
                desc: 'Seamlessly route traffic away from unhealthy regions.'
              }].
              map((item, i) =>
              <div
                key={i}
                className="p-6 rounded-xl bg-[#111] border border-white/5">

                  <h3 className="text-xl font-bold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Customer Stories */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Infrastructure Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <div className="text-[#00ff88] font-bold mb-4">SCALE AI</div>
                <h3 className="text-2xl font-bold mb-4">
                  Processing Petabytes of Data
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  "We needed an infrastructure that could handle bursty
                  workloads processing millions of images. Modal's autoscaling
                  handled the spikes perfectly without any manual intervention."
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  Read Case Study <ArrowRight size={16} />
                </div>
              </div>
              <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <div className="text-[#00ff88] font-bold mb-4">RAMP</div>
                <h3 className="text-2xl font-bold mb-4">
                  Zero-Ops OCR Pipeline
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  "Moving our OCR pipeline to Modal eliminated the need for a
                  dedicated DevOps engineer. The platform just works, scaling
                  from 0 to 1000 GPUs in seconds."
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  Read Case Study <ArrowRight size={16} />
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
                q: 'Where is the data stored?',
                a: 'Data is stored in our secure, distributed file system with encryption at rest. We use top-tier cloud providers for physical infrastructure.'
              },
              {
                q: 'Are you SOC 2 compliant?',
                a: 'Yes, Modal is SOC 2 Type II compliant. We undergo regular third-party audits.'
              },
              {
                q: 'Can I peer with my VPC?',
                a: 'Yes, Enterprise plans support VPC peering to securely connect to your existing data sources.'
              },
              {
                q: 'How do you handle secrets?',
                a: 'We have a built-in Secrets manager that encrypts sensitive environment variables and injects them securely into containers.'
              },
              {
                q: 'What is the SLA?',
                a: 'We offer a 99.99% uptime SLA for Enterprise customers, with financial credits for any downtime.'
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
              Infrastructure that scales
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Stop managing servers. Start shipping code.
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