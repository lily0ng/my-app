import React, { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Search,
  Book,
  Code,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Zap,
  Shield,
  Database,
  ArrowRight,
  FileText,
  CheckCircle } from
'lucide-react';
export function DocsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-72 fixed left-0 top-16 bottom-0 border-r border-white/10 bg-[#050505] p-6 hidden lg:block overflow-y-auto z-10">
          <div className="mb-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={16} />

              <input
                type="text"
                placeholder="Search docs..."
                className="w-full bg-[#111] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00ff88] transition-colors" />

            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Getting Started
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="text-[#00ff88] font-medium flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />{' '}
                  Introduction
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Installation
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Your first app
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Deploying
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Core Concepts
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Functions
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Classes
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Images & Dependencies
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Volumes
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Secrets
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Guides
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Web Endpoints
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Scheduling
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  GPU Acceleration
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Distributed Training
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 lg:ml-72 p-8 md:p-16 max-w-5xl">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Documentation
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Modal is a serverless cloud computing platform that lets you run
              code in the cloud without having to configure infrastructure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all cursor-pointer group">
              <Terminal
                className="text-[#00ff88] mb-6 group-hover:scale-110 transition-transform"
                size={32} />

              <h3 className="font-bold text-2xl mb-3">Quickstart</h3>
              <p className="text-gray-400 mb-6">
                Deploy your first function in less than 5 minutes.
              </p>
              <span className="text-[#00ff88] font-bold flex items-center gap-2">
                Start Tutorial <ArrowRight size={16} />
              </span>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all cursor-pointer group">
              <Code
                className="text-[#00ff88] mb-6 group-hover:scale-110 transition-transform"
                size={32} />

              <h3 className="font-bold text-2xl mb-3">Examples</h3>
              <p className="text-gray-400 mb-6">
                Browse dozens of copy-pasteable examples.
              </p>
              <span className="text-[#00ff88] font-bold flex items-center gap-2">
                View Examples <ArrowRight size={16} />
              </span>
            </div>
          </div>

          {/* Interactive Playground */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Try it now</h2>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-4 text-xs text-gray-500 font-mono">
                  hello_world.py
                </div>
                <button className="ml-auto bg-[#00ff88] text-black text-xs font-bold px-3 py-1 rounded hover:bg-[#00cc6a] transition-colors flex items-center gap-1">
                  <PlayCircle size={12} /> Run
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 font-mono text-sm border-r border-white/10">
                  <pre className="text-gray-300">
                    <code>
                      <span className="text-[#00ff88]">import</span> modal
                      {'\n\n'}
                      app = modal.App(
                      <span className="text-yellow-300">"hello-world"</span>)
                      {'\n\n'}
                      <span className="text-[#00ff88]">@app.function</span>()
                      {'\n'}
                      <span className="text-[#00ff88]">def</span>{' '}
                      <span className="text-blue-400">hello</span>():{'\n'}
                      {'    '}print(
                      <span className="text-yellow-300">
                        "Hello from the cloud!"
                      </span>
                      ){'\n'}
                      {'    '}return{' '}
                      <span className="text-yellow-300">"Success"</span>
                    </code>
                  </pre>
                </div>
                <div className="p-6 font-mono text-sm bg-[#050505]">
                  <div className="text-gray-500 mb-2"># Output</div>
                  <div className="text-gray-300">
                    ✓ Created app hello-world
                    <br />
                    ✓ Created function hello
                    <br />
                    Hello from the cloud!
                    <br />
                    <span className="text-[#00ff88]">Success</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Tutorials */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) =>
              <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-[#111] rounded-xl flex items-center justify-center border border-white/10 hover:border-[#00ff88] transition-all relative overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors" />
                    <PlayCircle
                    size={64}
                    className="text-white relative z-10 group-hover:scale-110 transition-transform" />

                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-[#00ff88] transition-colors">
                    Mastering Modal Functions
                  </h3>
                  <p className="text-gray-400">
                    Learn the basics of defining and running functions.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="text-[#00ff88]" size={20} /> Performance
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Use shared volumes for large datasets</li>
                  <li>• Optimize container images for faster cold starts</li>
                  <li>• Use async functions for I/O bound tasks</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Shield className="text-[#00ff88]" size={20} /> Security
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Use Secrets for API keys</li>
                  <li>• Implement role-based access control</li>
                  <li>• Audit logs regularly</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Migration Guides */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Migration Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['AWS Lambda', 'Google Cloud Functions', 'Celery'].map(
                (platform) =>
                <div
                  key={platform}
                  className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88] transition-colors cursor-pointer">

                    <h3 className="font-bold mb-2">Migrate from {platform}</h3>
                    <p className="text-sm text-gray-400">
                      Step-by-step guide to moving your workloads.
                    </p>
                  </div>

              )}
            </div>
          </section>

          {/* Changelog */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Changelog</h2>
            <div className="space-y-8 border-l border-white/10 pl-8 relative">
              {[
              {
                ver: 'v0.62.0',
                date: 'Oct 24, 2023',
                desc: 'Added support for H100 GPUs and improved volume performance.'
              },
              {
                ver: 'v0.61.0',
                date: 'Oct 10, 2023',
                desc: 'Introduced Modal Sandboxes for secure code execution.'
              },
              {
                ver: 'v0.60.0',
                date: 'Sep 28, 2023',
                desc: 'New web dashboard with real-time logs and metrics.'
              }].
              map((log, i) =>
              <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#00ff88] border-4 border-black" />
                  <div className="flex items-baseline gap-4 mb-2">
                    <h3 className="font-bold text-xl text-white">{log.ver}</h3>
                    <span className="text-sm text-gray-500 font-mono">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-gray-400">{log.desc}</p>
                </div>
              )}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">FAQ</h2>
            <div className="space-y-4">
              {[
              {
                q: 'Do I need Docker?',
                a: 'No, Modal handles containerization for you. You can define your environment in Python.'
              },
              {
                q: 'What Python versions are supported?',
                a: 'We support Python 3.8 and above.'
              },
              {
                q: 'How do I debug?',
                a: 'Logs are streamed in real-time to your terminal and the web dashboard. You can also use `modal shell` to debug interactively.'
              }].
              map((faq, i) =>
              <div
                key={i}
                className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden">

                  <button
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>

                    <span className="font-medium">{faq.q}</span>
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
        </div>
      </main>
      <Footer />
    </div>);

}