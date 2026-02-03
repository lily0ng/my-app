import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  Mic,
  Shield,
  Activity,
  Image as ImageIcon,
  Briefcase,
  BarChart,
  Server,
  Rocket } from
'lucide-react';
import { Link } from 'react-router-dom';
export function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const solutionLinks = useMemo(
    () => [
      {
        title: 'Audio Transcription',
        desc: 'Whisper at scale with batching and retries.',
        icon: Mic,
        to: '/solutions/audio-transcription',
      },
      {
        title: 'LLM Inference',
        desc: 'Serve open-source LLMs with stable P95.',
        icon: Zap,
        to: '/solutions/llm-inference',
      },
      {
        title: 'Coding Agents',
        desc: 'Isolated sandboxes for untrusted code.',
        icon: Shield,
        to: '/solutions/coding-agents',
      },
      {
        title: 'Computational Bio',
        desc: 'Reproducible pipelines across CPU/GPU.',
        icon: Activity,
        to: '/solutions/computational-bio',
      },
      {
        title: 'Image Generation',
        desc: 'Batch generation with presets and caching.',
        icon: ImageIcon,
        to: '/solutions/image-generation',
      },
      {
        title: 'Industry Solutions',
        desc: 'Reference architectures by vertical.',
        icon: Briefcase,
        to: '/solutions/industry-solutions',
      },
    ],
    []
  );
  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-hidden font-sans selection:bg-[color:var(--accent)] selection:text-black">
      <Nav />

      <main>
        <section className="pt-40 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">Resources</h1>
            <p className="text-xl text-[color:var(--text-secondary)] max-w-2xl mb-16">
              Everything you need to learn, build, and scale with Modal.
            </p>

            {/* Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
              <div className="bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl hover:border-[rgba(var(--accent-rgb),0.45)] transition-all">
                <div className="h-80 bg-[color:var(--bg-primary)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-rgb),0.20)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Placeholder for blog image */}
                  <div className="absolute inset-0 flex items-center justify-center text-[color:var(--text-tertiary)]">
                    <FileText size={64} />
                  </div>
                </div>
                <div className="p-10">
                  <div className="text-[color:var(--accent)] text-sm font-bold mb-4 tracking-wider">
                    LATEST BLOG POST
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-[color:var(--accent)] transition-colors">
                    Optimizing Cold Starts for Large Language Models
                  </h2>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg leading-relaxed">
                    Learn how we reduced boot times for 70B+ parameter models
                    from minutes to seconds using our custom container runtime.
                  </p>
                  <span className="text-[color:var(--text-primary)] font-bold underline decoration-[color:var(--accent)] underline-offset-4 flex items-center gap-2">
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
                  className="p-8 bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-3xl hover:border-[rgba(var(--accent-rgb),0.45)] transition-all cursor-pointer flex justify-between items-center group hover:translate-x-2">

                    <div>
                      <div className="text-xs text-[color:var(--text-tertiary)] mb-2">
                      BLOG • 5 MIN READ
                    </div>
                    <h3 className="font-bold text-xl group-hover:text-[color:var(--accent)] transition-colors">
                      {title}
                    </h3>
                  </div>
                  <ArrowRight
                  size={20}
                  className="text-[color:var(--text-tertiary)] group-hover:text-[color:var(--accent)]" />

                  </div>
                )}
              </div>
            </div>

            {/* Solutions */}
            <section className="mb-32">
              <div className="flex items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-bold">Solutions</h2>
                  <p className="mt-3 text-[color:var(--text-secondary)] max-w-2xl">
                    Explore end-to-end solution pages with Compute-style architecture patterns.
                  </p>
                </div>
                <Link
                  to="/solutions"
                  className="hidden md:inline-flex items-center gap-2 text-[color:var(--accent)] font-bold"
                >
                  View all <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {solutionLinks.map((x) => (
                  <motion.div
                    key={x.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <Link
                      to={x.to}
                      className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.45)] transition-all group block flex flex-col hover:-translate-y-1"
                    >
                      <x.icon className="text-[color:var(--accent)] mb-6" size={40} />
                      <h3 className="font-bold text-2xl mb-4">{x.title}</h3>
                      <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-2">
                        {x.desc}
                      </p>
                      <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Explore <ArrowRight size={16} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

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
                  className="p-8 rounded-3xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all cursor-pointer group">

                    <path.icon className="text-[color:var(--accent)] mb-6" size={40} />
                    <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                    <p className="text-[color:var(--text-secondary)] mb-6">{path.desc}</p>
                    <div className="w-full bg-[color:var(--bg-primary)] h-2 rounded-full overflow-hidden border border-[color:var(--border-color)]">
                      <div className="bg-[color:var(--accent)] h-full w-0 group-hover:w-1/3 transition-all duration-1000" />
                    </div>
                    <div className="mt-2 text-xs text-[color:var(--text-tertiary)]">
                      0% Complete
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Video Library */}
            <section className="mb-32 bg-[color:var(--bg-secondary)] border-y border-[color:var(--border-color)] -mx-6 px-6 py-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-4xl font-bold">Video Library</h2>
                  <button className="text-[color:var(--accent)] font-bold flex items-center gap-2">
                    View all videos <ArrowRight size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) =>
                  <div key={i} className="group cursor-pointer">
                      <div className="aspect-video bg-[color:var(--bg-primary)] rounded-2xl border border-[color:var(--border-color)] flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)] group-hover:bg-transparent transition-colors" />
                        <Play
                        size={48}
                        className="text-[color:var(--text-primary)] relative z-10 group-hover:scale-110 transition-transform" />

                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[color:var(--accent)] transition-colors">
                        Getting Started with Modal
                      </h3>
                      <p className="text-[color:var(--text-secondary)] text-sm">10 min • Tutorial</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Community & Open Source */}
            <section className="mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl font-bold mb-8">Community Highlights</h2>
                  <div className="space-y-6">
                    {[
                      {
                        user: 'alex_dev',
                        title: 'Built a podcast generator using Modal & OpenAI',
                        likes: 124,
                      },
                      {
                        user: 'sarah_ml',
                        title: 'Open sourced my Llama 3 fine-tuning script',
                        likes: 89,
                      },
                      {
                        user: 'david_k',
                        title: 'How to reduce cold starts to 500ms',
                        likes: 256,
                      },
                    ].map((post, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-2xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] hover:border-[rgba(var(--accent-rgb),0.35)] transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]" />
                          <span className="text-sm text-[color:var(--text-secondary)]">@{post.user}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                        <div className="text-xs text-[color:var(--accent)] font-bold">❤️ {post.likes} likes</div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 px-6 py-3 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors">
                    Join Discourse
                  </button>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-8">Open Source</h2>
                  <div className="p-8 rounded-3xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] h-full">
                    <p className="text-[color:var(--text-secondary)] mb-8 text-lg">
                      We believe in open source. Check out our GitHub for examples, client libraries, and community projects.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-[color:var(--bg-primary)] rounded-2xl border border-[color:var(--border-color)]">
                        <div className="font-bold text-2xl text-[color:var(--text-primary)]">2.5k+</div>
                        <div className="text-sm text-[color:var(--text-tertiary)]">Stars</div>
                      </div>
                      <div className="p-4 bg-[color:var(--bg-primary)] rounded-2xl border border-[color:var(--border-color)]">
                        <div className="font-bold text-2xl text-[color:var(--text-primary)]">500+</div>
                        <div className="text-sm text-[color:var(--text-tertiary)]">Forks</div>
                      </div>
                    </div>
                    <button className="w-full px-6 py-3 rounded-full bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] font-bold hover:bg-[color:var(--bg-tertiary)] transition-colors flex items-center justify-center gap-2">
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
                  className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all group block flex flex-col hover:-translate-y-1"
                >
                  <Rocket className="text-[color:var(--accent)] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">Marketplace Apps</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-1">
                    Browse ready-to-deploy apps and launch them in one click.
                  </p>
                  <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Marketplace <ArrowRight size={16} />
                  </div>
                </Link>
                <Link
                  to="/resources/events"
                  className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all group block flex flex-col hover:-translate-y-1"
                >
                  <Calendar className="text-[color:var(--accent)] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">Events</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-1">
                    Talks, meetups, announcements, and community sessions.
                  </p>
                  <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Events <ArrowRight size={16} />
                  </div>
                </Link>
                <Link
                  to="/docs/guides"
                  className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all group block flex flex-col hover:-translate-y-1"
                >
                  <BookOpen className="text-[color:var(--accent)] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">Guides</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-1">
                    Deep dives into core concepts. Written in markdown.
                  </p>
                  <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Guides <ArrowRight size={16} />
                  </div>
                </Link>
                <Link
                  to="/resources/gpu-glossary"
                  className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all group block flex flex-col hover:-translate-y-1"
                >
                  <Terminal className="text-[color:var(--accent)] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">GPU Glossary</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-1">
                    A comprehensive guide to understanding GPU specs, memory types, and terminology.
                  </p>
                  <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore Glossary <ArrowRight size={16} />
                  </div>
                </Link>
                <Link
                  to="/resources/llm-engine-advisor"
                  className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all group block flex flex-col hover:-translate-y-1"
                >
                  <Zap className="text-[color:var(--accent)] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">LLM Engine Advisor</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-1">
                    Find the best inference engine (vLLM, TGI, TensorRT) for your specific model and use case.
                  </p>
                  <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Start Advisor <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </section>

            {/* Company */}
            <section className="mb-32">
              <h2 className="text-4xl font-bold mb-12">Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link
                  to="/resources/about"
                  className="p-10 border border-[color:var(--border-color)] rounded-3xl bg-[color:var(--bg-secondary)] hover:border-[rgba(var(--accent-rgb),0.55)] transition-all group block flex flex-col hover:-translate-y-1"
                >
                  <Users className="text-[color:var(--accent)] mb-6" size={40} />
                  <h3 className="font-bold text-2xl mb-4">About</h3>
                  <p className="text-[color:var(--text-secondary)] mb-8 text-lg line-clamp-2">
                    Learn about the team structure, mission, and real-time platform vision.
                  </p>
                  <div className="text-[color:var(--accent)] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </section>

            {/* Newsletter */}
            <section className="mb-32 bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--accent-rgb),0.10)] to-transparent" />
              <h2 className="text-3xl font-bold mb-4 relative z-10">Subscribe to the Changelog</h2>
              <p className="text-[color:var(--text-secondary)] mb-8 max-w-xl mx-auto relative z-10">
                Get the latest updates on product releases, tutorials, and community highlights delivered to your inbox.
              </p>
              <div className="flex max-w-md mx-auto gap-4 relative z-10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-[color:var(--bg-primary)] border border-[color:var(--border-color)] rounded-full px-6 py-3 focus:outline-none focus:border-[color:var(--accent)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)]"
                />
                <button className="px-8 py-3 rounded-full bg-[color:var(--accent)] text-white font-bold hover:opacity-95 transition-colors">
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
                    a: 'We welcome contributions to our open source examples and documentation. Check out our GitHub repo.',
                  },
                  {
                    q: 'Where can I find tutorials?',
                    a: 'Check out our YouTube channel and blog for in-depth tutorials and walkthroughs.',
                  },
                  {
                    q: 'Is there a certification program?',
                    a: 'Yes, we offer a Modal Certified Developer program. Contact us for details.',
                  },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="border border-[color:var(--border-color)] rounded-2xl bg-[color:var(--bg-secondary)] overflow-hidden"
                  >
                    <button
                      className="w-full flex justify-between items-center p-6 text-left hover:bg-[color:var(--bg-tertiary)] transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      type="button"
                    >
                      <span className="font-medium text-lg">{faq.q}</span>
                      {openFaq === i ? (
                        <ChevronUp size={20} className="text-[color:var(--accent)]" />
                      ) : (
                        <ChevronDown size={20} className="text-[color:var(--text-secondary)]" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6 text-[color:var(--text-secondary)] leading-relaxed border-t border-[color:var(--border-color)] pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6 text-center border-t border-[color:var(--border-color)] bg-gradient-to-b from-[color:var(--bg-primary)] to-[rgba(var(--accent-rgb),0.08)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Start learning today</h2>
            <button className="px-12 py-5 rounded-full bg-[color:var(--accent)] text-white font-bold text-xl hover:opacity-95 transition-all hover:scale-105 shadow-[0_0_30px_rgba(var(--accent-rgb),0.25)]">
              Explore Docs
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}