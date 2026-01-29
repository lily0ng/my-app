import { useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import {
  Calendar,
  BookOpen,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  Code,
  Terminal,
  Zap,
  BarChart,
  Server,
  Rocket } from
'lucide-react';
import { Link } from 'react-router-dom';
export function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">Resources</h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-16">
              Everything you need to learn, build, and scale with Modal.
            </p>

            {/* Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer shadow-2xl hover:border-[#00ff88]/50 transition-all">
                <div className="h-80 bg-[#111] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Placeholder for blog image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                    <FileText size={64} />
                  </div>
                </div>
                <div className="p-10">
                  <div className="text-[#00ff88] text-sm font-bold mb-4 tracking-wider">
                    LATEST BLOG POST
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-[#00ff88] transition-colors">
                    Optimizing Cold Starts for Large Language Models
                  </h2>
                  <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                    Learn how we reduced boot times for 70B+ parameter models
                    from minutes to seconds using our custom container runtime.
                  </p>
                  <span className="text-white font-bold underline decoration-[#00ff88] underline-offset-4 flex items-center gap-2">
                    Read article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {[
                'Announcing Modal Sandboxes: Secure Code Execution',
                'Fine-tuning Llama 3 on H100s: A Comprehensive Guide',
                'Building a coding agent with Modal and LangChain',
                'The state of serverless GPU inference in 2024'].
                map((title, i) =>
                <div
                  key={i}
                  className="p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#00ff88]/50 transition-all cursor-pointer flex justify-between items-center group hover:translate-x-2">

                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        BLOG • 5 MIN READ
                      </div>
                      <h3 className="font-bold text-xl group-hover:text-[#00ff88] transition-colors">
                        {title}
                      </h3>
                    </div>
                    <ArrowRight
                    size={20}
                    className="text-gray-500 group-hover:text-[#00ff88]" />

                  </div>
                )}
              </div>
            </div>

            {/* Learning Paths */}
            <section className="mb-32">
              <h2 className="text-4xl font-bold mb-12">Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                {
                  title: 'ML Engineer',
                  desc: 'Master model deployment, fine-tuning, and inference scaling.',
                  icon: Code
                },
                {
                  title: 'Data Scientist',
                  desc: 'Learn to run notebooks, process data, and visualize results.',
                  icon: BarChart
                },
                {
                  title: 'Platform Engineer',
                  desc: 'Understand architecture, security, and infrastructure management.',
                  icon: Server
                }].
                map((path, i) =>
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88] transition-all cursor-pointer group">

                    <path.icon className="text-[#00ff88] mb-6" size={40} />
                    <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                    <p className="text-gray-400 mb-6">{path.desc}</p>
                    <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00ff88] h-full w-0 group-hover:w-1/3 transition-all duration-1000" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      0% Complete
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Video Library */}
            <section className="mb-32 bg-[#050505] -mx-6 px-6 py-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-4xl font-bold">Video Library</h2>
                  <button className="text-[#00ff88] font-bold flex items-center gap-2">
                    View all videos <ArrowRight size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) =>
                  <div key={i} className="group cursor-pointer">
                      <div className="aspect-video bg-[#111] rounded-xl border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors" />
                        <Play
                        size={48}
                        className="text-white relative z-10 group-hover:scale-110 transition-transform" />

                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ff88] transition-colors">
                        Getting Started with Modal
                      </h3>
                      <p className="text-gray-400 text-sm">10 min • Tutorial</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Community & Open Source */}
            <section className="mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl font-bold mb-8">
                    Community Highlights
                  </h2>
                  <div className="space-y-6">
                    {[
                    {
                      user: 'alex_dev',
                      title: 'Built a podcast generator using Modal & OpenAI',
                      likes: 124
                    },
                    {
                      user: 'sarah_ml',
                      title: 'Open sourced my Llama 3 fine-tuning script',
                      likes: 89
                    },
                    {
                      user: 'david_k',
                      title: 'How to reduce cold starts to 500ms',
                      likes: 256
                    }].
                    map((post, i) =>
                    <div
                      key={i}
                      className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#00ff88]/30 transition-colors">

                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gray-700" />
                          <span className="text-sm text-gray-400">
                            @{post.user}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                        <div className="text-xs text-[#00ff88] font-bold">
                          ❤️ {post.likes} likes
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="mt-8 px-6 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                    Join Discourse
                  </button>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-8">Open Source</h2>
                  <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 h-full">
                    <p className="text-gray-400 mb-8 text-lg">
                      We believe in open source. Check out our GitHub for
                      examples, client libraries, and community projects.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-[#111] rounded-lg border border-white/5">
                        <div className="font-bold text-2xl text-white">
                          2.5k+
                        </div>
                        <div className="text-sm text-gray-500">Stars</div>
                      </div>
                      <div className="p-4 bg-[#111] rounded-lg border border-white/5">
                        <div className="font-bold text-2xl text-white">
                          500+
                        </div>
                        <div className="text-sm text-gray-500">Forks</div>
                      </div>
                    </div>
                    <button className="w-full px-6 py-3 rounded-full bg-[#111] border border-white/20 text-white font-bold hover:bg-[#222] transition-colors flex items-center justify-center gap-2">
                      View on GitHub <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools */}
            <section className="mb-32">
              <h2 className="text-4xl font-bold mb-12">Tools & Utilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link
                  to="/resources/marketplace-apps"
                  className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all group block flex flex-col"
                >
                  <Rocket className="text-[#00ff88] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">Marketplace Apps</h3>
                  <p className="text-gray-400 mb-8 text-lg line-clamp-1">
                    Browse ready-to-deploy apps and launch them in one click.
                  </p>
                  <div className="text-[#00ff88] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Marketplace <ArrowRight size={16} />
                  </div>
                </Link>
                <Link
                  to="/resources/events"
                  className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all group block flex flex-col"
                >
                  <Calendar className="text-[#00ff88] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">Events</h3>
                  <p className="text-gray-400 mb-8 text-lg line-clamp-1">
                    Talks, meetups, announcements, and community sessions.
                  </p>
                  <div className="text-[#00ff88] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Events <ArrowRight size={16} />
                  </div>
                </Link>
                <Link
                  to="/docs/guides"
                  className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all group block flex flex-col"
                >
                  <BookOpen className="text-[#00ff88] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">Guides</h3>
                  <p className="text-gray-400 mb-8 text-lg line-clamp-1">
                    Deep dives into core concepts. Written in markdown.
                  </p>
                  <div className="text-[#00ff88] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Guides <ArrowRight size={16} />
                  </div>
                </Link>
                <div className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all group flex flex-col">
                  <Terminal className="text-[#00ff88] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">GPU Glossary</h3>
                  <p className="text-gray-400 mb-8 text-lg line-clamp-1">
                    A comprehensive guide to understanding GPU specs, memory
                    types, and terminology.
                  </p>
                  <button className="text-[#00ff88] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore Glossary <ArrowRight size={16} />
                  </button>
                </div>
                <div className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all group flex flex-col">
                  <Zap className="text-[#00ff88] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">
                    LLM Engine Advisor
                  </h3>
                  <p className="text-gray-400 mb-8 text-lg line-clamp-1">
                    Find the best inference engine (vLLM, TGI, TensorRT) for
                    your specific model and use case.
                  </p>
                  <button className="text-[#00ff88] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Start Advisor <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* Company */}
            <section className="mb-32">
              <h2 className="text-4xl font-bold mb-12">Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link
                  to="/resources/about"
                  className="p-10 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:border-[#00ff88] transition-all group block flex flex-col"
                >
                  <Users className="text-[#00ff88] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">About</h3>
                  <p className="text-gray-400 mb-8 text-lg line-clamp-1">
                    Learn about the team structure, mission, and real-time platform vision.
                  </p>
                  <div className="text-[#00ff88] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </section>

            {/* Newsletter */}
            <section className="mb-32 bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 to-transparent" />
              <h2 className="text-3xl font-bold mb-4 relative z-10">
                Subscribe to the Changelog
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                Get the latest updates on product releases, tutorials, and
                community highlights delivered to your inbox.
              </p>
              <div className="flex max-w-md mx-auto gap-4 relative z-10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-[#111] border border-white/20 rounded-full px-6 py-3 focus:outline-none focus:border-[#00ff88] text-white" />

                <button className="px-8 py-3 rounded-full bg-[#00ff88] text-black font-bold hover:bg-[#00cc6a] transition-colors">
                  Subscribe
                </button>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-4xl font-bold mb-12">FAQ</h2>
              <div className="space-y-4">
                {[
                {
                  q: 'How can I contribute?',
                  a: 'We welcome contributions to our open source examples and documentation. Check out our GitHub repo.'
                },
                {
                  q: 'Where can I find tutorials?',
                  a: 'Check out our YouTube channel and blog for in-depth tutorials and walkthroughs.'
                },
                {
                  q: 'Is there a certification program?',
                  a: 'Yes, we offer a Modal Certified Developer program. Contact us for details.'
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Start learning today
            </h2>
            <button className="px-12 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              Explore Docs
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}