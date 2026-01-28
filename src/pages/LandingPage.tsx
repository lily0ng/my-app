import { useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Terminal,
  Cpu,
  Zap,
  Lock,
  Globe,
  Database,
  ChevronDown,
  ChevronUp,
  Check,
  Play,
  Users,
  Shield,
  Layers,
} from "lucide-react";
export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "How does billing work?",
      a: "You only pay for the compute you use, measured in seconds. There are no idle costs or upfront fees.",
    },
    {
      q: "Can I use my own AWS/GCP account?",
      a: "Modal runs in its own cloud. You don't need to connect your own cloud provider account.",
    },
    {
      q: "What GPUs are available?",
      a: "We offer Nvidia H100s, A100s (40GB/80GB), A10Gs, L4s, and T4s.",
    },
    {
      q: "Is Modal secure?",
      a: "Yes. Every function runs in a gVisor-sandboxed container with strict isolation guarantees. We are SOC 2 Type II compliant.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-black font-sans transition-colors duration-300">
      <Nav />

      <main>
        {/* 1. Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(var(--accent-rgb),0.10)] via-[var(--bg-primary)] to-[var(--bg-primary)] pointer-events-none transition-colors duration-300" />
          <div className="max-w-5xl mx-auto relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              AI infrastructure that <br />
              <span className="text-[var(--accent)]">Next Generation Cloud </span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Deploy powerful cloud instances with ultra-fast NVMe SSD storage
              and flexible pay-as-you-go pricing. Powered by One Cloud Next-Gen
              — with 99.95% uptime.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 rounded-full bg-[var(--accent)] text-black font-bold text-lg hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-[0_0_30px_rgba(var(--accent-rgb),0.25)]">
                Start Free Trial
              </button>
              <button className="px-8 py-4 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-lg hover:bg-black/5 transition-all hover:scale-105">
                Views Pricing
              </button>
            </div>
          </div>

          {/* Hero Visual - Code Block */}
          <div className="mt-24 max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(var(--accent-rgb),0.9)] to-blue-600 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-2xl transition-colors duration-300">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="text-xs text-[var(--text-tertiary)] font-mono ml-2">
                  train_model.py
                </div>
              </div>
              <div className="p-8 text-left overflow-x-auto">
                <pre className="font-mono text-sm md:text-base leading-relaxed">
                  <code className="text-[var(--text-primary)]">
                    <span className="text-[var(--accent)]">import</span> modal{"\n\n"}
                    app = modal.App(
                    <span className="text-yellow-300">
                      "example-get-started"
                    </span>
                    ){"\n\n"}
                    <span className="text-[var(--accent)]">@app.function</span>(gpu=
                    <span className="text-yellow-300">"A100"</span>){"\n"}
                    <span className="text-[var(--accent)]">def</span>{" "}
                    <span className="text-blue-400">square</span>(x):{"\n"}
                    {"    "}print(
                    <span className="text-yellow-300">
                      "This code is running on a remote worker!"
                    </span>
                    ){"\n"}
                    {"    "}return x**2{"\n\n"}
                    <span className="text-[var(--accent)]">
                      @app.local_entrypoint
                    </span>
                    (){"\n"}
                    <span className="text-[var(--accent)]">def</span>{" "}
                    <span className="text-blue-400">main</span>():{"\n"}
                    {"    "}print(
                    <span className="text-yellow-300">"the square is"</span>,
                    square.remote(42))
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Customer Logos */}
        <section className="py-16 border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-gray-500 mb-10 uppercase tracking-wider font-semibold">
              Trusted by engineering teams at
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                "Ramp",
                "Substack",
                "Scale",
                "Vercel",
                "Replit",
                "Perplexity",
              ].map((name) => (
                <div
                  key={name}
                  className="text-2xl font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Features Grid */}
        <section className="py-32 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured Products
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                From prototype to production, Modal provides the primitives to
                build scalable AI applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Cloud Compute",
                  desc: "Deploy powerful virtual machines in seconds with scalable resources to meet your business needs.",
                },
                {
                  icon: Globe,
                  title: "Kubernetes",
                  desc: "Automate deployment, scaling, and management of containerized applications with our fully managed Kubernetes service.",
                },
                {
                  icon: Lock,
                  title: "Load Balancer",
                  desc: "Distribute traffic efficiently across multiple instances to ensure high availability and optimal performance.",
                },
                {
                  icon: Database,
                  title: "Block Storage",
                  desc: "Attach high-performance, scalable storage to your cloud instances for flexible data management.",
                },
                {
                  icon: Terminal,
                  title: "Local Dev Experience",
                  desc: "Develop against the cloud as if it were your laptop. Hot reloading included.",
                },
                {
                  icon: Cpu,
                  title: "Any GPU, Instantly",
                  desc: "Access H100s, A100s, and more without quotas or capacity planning.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mb-6 text-[#00ff88] group-hover:scale-110 transition-transform shadow-inner">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* 3.1 Service Reliability – Built for Uptime */}
        <section className="py-32 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
               Service Reliability – Built for Uptime
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Fully Redundant Architecture",
                  desc: "Our cloud is designed with multiple failover mechanisms, ensuring no single point of failure.",
                },
                {
                  icon: Globe,
                  title: "High Availability Design",
                  desc: "Our cloud infrastructure is engineered for 24/7 reliability, ensuring seamless operations even during peak demand. We guarantee 99.95% uptime, minimizing disruptions and keeping your business online.",
                },
                {
                  icon: Lock,
                  title: "Offsite Backup & Data Protection",
                  desc: "Your critical data is securely backed up at an offsite location, minimizing risks and ensuring fast recovery.",
                },
                {
                  icon: Database,
                  title: "Seamless Connectivity with Multi-Uplinks",
                  desc: "Multiple network uplinks provide high-speed, uninterrupted sconnectivity for optimal performance.",
                },
                {
                  icon: Terminal,
                  title: "Local Dev Experience",
                  desc: "Develop against the cloud as if it were your laptop. Hot reloading included.",
                },
                {
                  icon: Cpu,
                  title: "Any GPU, Instantly",
                  desc: "Access H100s, A100s, and more without quotas or capacity planning.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mb-6 text-[#00ff88] group-hover:scale-110 transition-transform shadow-inner">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Demo Section */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] font-medium text-sm mb-6">
                  Interactive Playground
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Try it yourself
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  See how easy it is to deploy a function to the cloud. Edit the
                  code and watch it run instantly.
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-[#00ff88] font-bold hover:underline underline-offset-4">
                    <Play size={20} /> Run Code
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    Reset
                  </button>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/10">
                  <span className="text-sm text-gray-400">hello_world.py</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                  </div>
                </div>
                <div className="p-6 font-mono text-sm h-80 overflow-y-auto">
                  <div className="text-gray-500 mb-4">
                    # Click 'Run Code' to execute
                  </div>
                  <div className="text-purple-400">import</div>{" "}
                  <div className="text-white inline">modal</div>
                  <br />
                  <br />
                  <div className="text-white">stub = modal.Stub()</div>
                  <br />
                  <div className="text-blue-400">@stub.function()</div>
                  <div className="text-purple-400">def</div>{" "}
                  <div className="text-yellow-300 inline">f</div>
                  <div className="text-white inline">(i):</div>
                  <div className="pl-4 text-purple-400">if</div>{" "}
                  <div className="text-white inline">i % 2 == 0:</div>
                  <div className="pl-8 text-purple-400">print</div>
                  <div className="text-white inline">
                    (f"Hello {`{i}`} from Modal!")
                  </div>
                  <div className="pl-8 text-purple-400">return</div>{" "}
                  <div className="text-white inline">i * i</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Technical Architecture */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              This isn add more content
            </p>
          </div>
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent rounded-3xl -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Financial Services</h3>
                <p className="text-gray-400">
                  Secure and compliant cloud solutions for banking, fintech, and financial applications.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center relative top-12">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Healthcare & Life Sciences</h3>
                <p className="text-gray-400">
                 Reliable infrastructure for patient data management, medical applications, and research analytics.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">E-Commerce & Retail</h3>
                <p className="text-gray-400">
                  Fast, secure, and scalable hosting for online stores, inventory management, and payment processing.
                </p>
              </div>
            </div>
          </div>
           <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent rounded-3xl -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Gaming & Entertainment</h3>
                <p className="text-gray-400">
                  Low-latency cloud infrastructure for online gaming, streaming platforms, and content delivery.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center relative top-12">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Manufacturing & Logistics</h3>
                <p className="text-gray-400">
                  Optimize operations with cloud-based ERP, supply chain management, and IoT applications.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#111] rounded-full flex items-center justify-center mb-6 text-[#00ff88]">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Education & E-Learning</h3>
                <p className="text-gray-400">
                  Seamless cloud solutions for virtual classrooms, learning management systems, and EdTech platforms.
                </p>
              </div>
            </div>
          </div>
        </section>




        {/* 6. Comparison Table */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Why developers choose Modal
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-gray-400 font-medium">
                      Feature
                    </th>
                    <th className="py-6 px-4 text-[#00ff88] font-bold text-xl">
                      Modal
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium">
                      AWS Lambda
                    </th>
                    <th className="py-6 px-4 text-gray-400 font-medium">
                      GCP Cloud Run
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Cold Start Time",
                      modal: "< 1s",
                      aws: "5-10s",
                      gcp: "5-10s",
                    },
                    {
                      feature: "GPU Support",
                      modal: "H100, A100, A10G",
                      aws: "Limited",
                      gcp: "Limited",
                    },
                    {
                      feature: "Max Execution Time",
                      modal: "Unlimited",
                      aws: "15 min",
                      gcp: "60 min",
                    },
                    {
                      feature: "Local Dev Experience",
                      modal: "Native",
                      aws: "Complex",
                      gcp: "Complex",
                    },
                    {
                      feature: "Storage",
                      modal: "Network Volumes",
                      aws: "EFS (Slow)",
                      gcp: "NFS (Slow)",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-6 px-4 font-medium">{row.feature}</td>
                      <td className="py-6 px-4 text-white font-bold">
                        {row.modal}
                      </td>
                      <td className="py-6 px-4 text-gray-500">{row.aws}</td>
                      <td className="py-6 px-4 text-gray-500">{row.gcp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. ROI Calculator */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-8">Calculate your savings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-[#111] rounded-xl">
                <div className="text-gray-400 mb-2">Current Spend</div>
                <div className="text-3xl font-bold">$10,000</div>
              </div>
              <div className="p-6 bg-[#111] rounded-xl">
                <div className="text-gray-400 mb-2">Modal Cost</div>
                <div className="text-3xl font-bold text-[#00ff88]">$4,000</div>
              </div>
              <div className="p-6 bg-[#111] rounded-xl">
                <div className="text-gray-400 mb-2">Savings</div>
                <div className="text-3xl font-bold text-white">60%</div>
              </div>
            </div>
            <p className="text-gray-400 mb-8">
              Based on typical inference workloads migrating from EC2.
            </p>
            <button className="text-[#00ff88] font-bold hover:underline">
              View detailed breakdown &rarr;
            </button>
          </div>
        </section>

        {/* 8. Integration Ecosystem */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              Integrates with your stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60">
              {[
                "Hugging Face",
                "LangChain",
                "LlamaIndex",
                "Weights & Biases",
                "GitHub",
                "Docker",
                "Python",
                "Pytorch",
                "TensorFlow",
                "FastAPI",
                "Ray",
                "Kubernetes",
              ].map((name) => (
                <div
                  key={name}
                  className="h-16 bg-[#111] rounded-lg flex items-center justify-center font-bold text-gray-400 hover:text-white hover:opacity-100 transition-all cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Video Walkthrough */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">See it in action</h2>
              <p className="text-gray-400">
                Watch how to deploy a Llama 3 inference endpoint in 3 minutes.
              </p>
            </div>
            <div className="aspect-video bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
              <div className="w-20 h-20 bg-[#00ff88] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-lg">
                <Play size={32} className="text-black ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* 10. Community Projects */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Built by the community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Turbo Art",
                  author: "modal-labs",
                  desc: "Real-time AI art generation with SDXL Turbo.",
                },
                {
                  title: "Doc Chatter",
                  author: "alex-smith",
                  desc: "Chat with your PDF documents using RAG.",
                },
                {
                  title: "Video Subtitler",
                  author: "sarah-j",
                  desc: "Auto-generate subtitles using Whisper.",
                },
              ].map((project, i) => (
                <div
                  key={i}
                  className="p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#00ff88] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Users size={16} /> {project.author}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#00ff88] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Security Certifications */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
              Enterprise-grade security
            </h2>
            <div className="flex flex-wrap justify-center gap-12 items-center">
              <div className="px-8 py-4 bg-[#111] rounded-xl border border-white/10 font-bold text-xl text-gray-300">
                SOC 2 Type II
              </div>
              <div className="px-8 py-4 bg-[#111] rounded-xl border border-white/10 font-bold text-xl text-gray-300">
                HIPAA Compliant
              </div>
              <div className="px-8 py-4 bg-[#111] rounded-xl border border-white/10 font-bold text-xl text-gray-300">
                GDPR Ready
              </div>
            </div>
          </div>
        </section>

        {/* 12. Performance Benchmarks */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Unmatched performance</h2>
              <p className="text-xl text-gray-400 mb-8">
                Our optimized container runtime delivers cold starts up to 10x
                faster than standard Docker containers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-[#00ff88]" /> 500ms cold starts
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-[#00ff88]" /> 100Gbps networking
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-[#00ff88]" /> NVMe SSD storage
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Modal</span>
                    <span className="text-[#00ff88]">0.8s</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00ff88] w-[10%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>AWS Lambda</span>
                    <span className="text-gray-400">8.5s</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700 w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>GCP Cloud Run</span>
                    <span className="text-gray-400">6.2s</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700 w-[62%]" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center">
                Cold start latency for 2GB container
              </p>
            </div>
          </div>
        </section>

        {/* 13. Migration Guide */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Migrating is easy</h2>
            <p className="text-xl text-gray-400 mb-12">
              Most teams migrate their first workload in less than an afternoon.
              No infrastructure configuration required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 border-l-2 border-[#00ff88] bg-[#0a0a0a]">
                <div className="text-[#00ff88] font-bold mb-2">Step 1</div>
                <h3 className="text-lg font-bold mb-2">Install SDK</h3>
                <p className="text-gray-400 text-sm">pip install modal</p>
              </div>
              <div className="p-6 border-l-2 border-[#00ff88] bg-[#0a0a0a]">
                <div className="text-[#00ff88] font-bold mb-2">Step 2</div>
                <h3 className="text-lg font-bold mb-2">Add Decorators</h3>
                <p className="text-gray-400 text-sm">
                  Add @app.function to your existing functions
                </p>
              </div>
              <div className="p-6 border-l-2 border-[#00ff88] bg-[#0a0a0a]">
                <div className="text-[#00ff88] font-bold mb-2">Step 3</div>
                <h3 className="text-lg font-bold mb-2">Deploy</h3>
                <p className="text-gray-400 text-sm">modal deploy app.py</p>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Testimonials */}
        <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Loved by developers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Modal is the first cloud platform that feels like it was designed for developers, not ops teams.",
                  author: "Guillermo Rauch",
                  role: "CEO, Vercel",
                },
                {
                  quote:
                    "We moved our entire inference pipeline to Modal and cut our costs by 60% while improving latency.",
                  author: "Rahul Sonwalkar",
                  role: "Founder, Julius",
                },
                {
                  quote:
                    "The ability to just write Python and have it scale to thousands of GPUs is magical.",
                  author: "Andrej Karpathy",
                  role: "AI Researcher",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-10 bg-[#0a0a0a] border border-white/10 rounded-2xl relative"
                >
                  <div className="absolute top-8 left-8 text-[#00ff88] opacity-20 text-6xl font-serif">
                    "
                  </div>
                  <p className="text-gray-300 mb-8 leading-relaxed relative z-10 text-lg">
                    {t.quote}
                  </p>
                  <div>
                    <div className="font-bold text-white text-lg">
                      {t.author}
                    </div>
                    <div className="text-sm text-[#00ff88]">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15. FAQ */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={20} className="text-[#00ff88]" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 16. Final CTA */}
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to ship?
            </h2>
            <p className="text-2xl text-gray-400 mb-12 font-light">
              Join thousands of developers building the future of AI on Modal.
              Get $30/mo in free credits to start.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,255,136,0.4)]">
                Sign Up for Free
              </button>
              <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                Read Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
