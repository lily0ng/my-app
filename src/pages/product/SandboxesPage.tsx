import React, { useState, memo } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { HeroSection } from '../../components/HeroSection';
import {
  Shield,
  Code,
  Lock,
  ChevronDown,
  ChevronUp,
  Terminal,
  Play,
  Activity,
  Globe,
  CheckCircle,
  Server } from
'lucide-react';
export function SandboxesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#00ff88]/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-medium mb-8 border border-[#00ff88]/20">
              Modal Sandboxes
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Secure <br /> <span className="text-[#00ff88]">Sandboxes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Execute untrusted code in secure, ephemeral environments. Ideal
              for AI agents, code interpreters, and CI/CD.
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                Start Sandboxing
              </button>
              <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                Read Docs
              </button>
            </div>
          </div>
        </section>

        {/* 2. Features */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
            {
              icon: Shield,
              title: 'gVisor Isolation',
              desc: 'Every sandbox runs in a gVisor container, providing strong isolation from the host.'
            },
            {
              icon: Code,
              title: 'Any Language',
              desc: 'Run Python, Node.js, Go, Rust, or any other language via custom images.'
            },
            {
              icon: Lock,
              title: 'Network Control',
              desc: 'Restrict network access or allow specific domains for security.'
            }].
            map((f, i) =>
            <div
              key={i}
              className="p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 group hover:-translate-y-2">

                <f.icon
                className="text-[#00ff88] mb-6 group-hover:scale-110 transition-transform"
                size={40} />

                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {f.desc}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. Live Demo */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Live Sandbox Demo</h2>
              <p className="text-gray-400">
                Execute code securely in the browser.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-gray-400 font-mono text-sm">
                  print("Hello from sandbox!")
                </div>
                <button className="bg-[#00ff88] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00cc6a] transition-colors">
                  Run
                </button>
              </div>
              <div className="bg-[#111] rounded-lg p-6 min-h-[150px] text-gray-300 font-mono text-sm leading-relaxed">
                <span className="text-[#00ff88]">root@sandbox:~#</span> python
                script.py
                <br />
                Hello from sandbox!
              </div>
            </div>
          </div>
        </section>

        {/* 4. Code Example */}
        <section className="py-32 px-6 border-y border-white/5 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Execute code safely</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Perfect for building AI agents that write and execute code. The
                sandbox is ephemeral and destroyed immediately after execution.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#00ff88]" /> Ephemeral
                  environment
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#00ff88]" /> Custom timeouts
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#00ff88]" /> Resource limits
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 font-mono text-sm shadow-2xl">
              <pre className="text-gray-300">
                <code>
                  sandbox = modal.Sandbox.create({' \n'}
                  {'    '}image=modal.Image.debian_slim(),{'\n'}
                  {'    '}app=app,{'\n'}){'\n\n'}
                  sandbox.exec(<span className="text-yellow-300">
                    "echo"
                  </span>,{' '}
                  <span className="text-yellow-300">"hello world"</span>){'\n'}
                  sandbox.terminate()
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 5. Security Architecture */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">Defense in Depth</h2>
            <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 relative">
              <div className="flex flex-col gap-4 relative z-10">
                <div className="p-4 bg-[#111] rounded-xl border border-white/10 w-full font-bold text-red-400">
                  Untrusted Code
                </div>
                <div className="p-4 bg-[#111] rounded-xl border border-[#00ff88] w-full font-bold text-[#00ff88]">
                  gVisor Sandbox
                </div>
                <div className="p-4 bg-[#111] rounded-xl border border-white/10 w-full font-bold text-blue-400">
                  Host Kernel
                </div>
              </div>
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-20 text-center">Built for</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-colors">
                <h3 className="text-2xl font-bold mb-4">
                  AI Code Interpreters
                </h3>
                <p className="text-gray-400 text-lg">
                  Let LLMs write and run code to solve problems.
                </p>
              </div>
              <div className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-colors">
                <h3 className="text-2xl font-bold mb-4">Online IDEs</h3>
                <p className="text-gray-400 text-lg">
                  Provide secure execution environments for users.
                </p>
              </div>
              <div className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-colors">
                <h3 className="text-2xl font-bold mb-4">Auto-grading</h3>
                <p className="text-gray-400 text-lg">
                  Safely grade student code submissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Building a Code Interpreter
              </h2>
              <p className="text-gray-400">
                Learn how to build a secure code interpreter for your AI agent.
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

        {/* 8. Language Support */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-16">Run any language</h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-70">
              {['Python', 'Node.js', 'Go', 'Rust', 'C++', 'Java', 'Ruby'].map(
                (name) =>
                <div
                  key={name}
                  className="text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default">

                    {name}
                  </div>

              )}
            </div>
          </div>
        </section>

        {/* 9. Monitoring */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Monitor execution</h2>
              <p className="text-xl text-gray-400 mb-8">
                Capture stdout/stderr, exit codes, and resource usage for every
                sandbox execution.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Live logs
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Memory usage tracking
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Execution time metrics
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl font-mono text-sm">
              <div className="text-gray-400 mb-2">sandbox_id: sb-12345</div>
              <div className="text-white mb-2">
                status: <span className="text-[#00ff88]">completed</span>
              </div>
              <div className="text-white mb-2">exit_code: 0</div>
              <div className="text-white mb-2">duration: 1.2s</div>
              <div className="text-white">memory: 45MB</div>
            </div>
          </div>
        </section>

        {/* 10. Pricing Calculator */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Estimate Costs
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Executions per month
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                <div className="text-right text-[#00ff88] font-bold mt-2">
                  1,000,000
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="text-xl font-bold">Estimated Cost</span>
                <span className="text-4xl font-bold text-[#00ff88]">
                  $250.00
                </span>
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
                q: 'How long do sandboxes persist?',
                a: 'Sandboxes are ephemeral and persist only as long as you need them, up to a maximum timeout.'
              },
              {
                q: 'Can I install packages?',
                a: 'Yes, you can install packages at runtime or bake them into the image.'
              },
              {
                q: 'Is there a startup latency?',
                a: 'Sandboxes start in milliseconds.'
              },
              {
                q: 'Can I access the internet?',
                a: 'Yes, you can configure network access policies.'
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
            <h2 className="text-5xl font-bold mb-8">Secure by design</h2>
            <p className="text-2xl text-gray-400 mb-12 font-light">
              Run untrusted code with confidence.
            </p>
            <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
              Start Building
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}