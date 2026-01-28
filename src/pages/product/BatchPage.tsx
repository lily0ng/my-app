import React, { useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { HeroSection } from '../../components/HeroSection';
import {
  Database,
  Video,
  FileText,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers,
  Play,
  Activity,
  Clock,
  Server,
  CheckCircle } from
'lucide-react';
export function BatchPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff88]/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-medium mb-8 border border-[#00ff88]/20">
              Modal Batch
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Massive scale <br />{' '}
              <span className="text-[#00ff88]">Batch Jobs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Run parallel jobs across thousands of containers. Perfect for
              video processing, data pipelines, and scientific computing.
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                Run Batch Job
              </button>
              <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                View Examples
              </button>
            </div>
          </div>
        </section>

        {/* 2. Code Example */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">
              Parallelism made simple
            </h2>
            <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-8 text-left font-mono text-sm shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              <pre className="text-white/80">
                <code>{`@app.function()
def process_video(video_url):
    # This runs in parallel for each item
    ffmpeg.input(video_url).output("processed.mp4").run()

@app.local_entrypoint()
def main():
    # Map over 1000 videos instantly
    videos = ["video1.mp4", "video2.mp4", ...]
    for res in process_video.map(videos):
        print(f"Finished {res}")`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* 3. Parallelism Visualization */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">How it scales</h2>
            <div className="max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 relative overflow-hidden">
              <div className="flex justify-center items-center gap-4 relative z-10">
                <div className="p-4 bg-[#111] rounded-xl border border-white/10">
                  Job
                </div>
                <div className="text-gray-500">→</div>
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(15)].map((_, i) =>
                  <div
                    key={i}
                    className="w-8 h-8 bg-[#00ff88]/20 rounded flex items-center justify-center text-xs text-[#00ff88] animate-pulse">

                      {i + 1}
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-8 text-gray-400">
                Modal automatically provisions containers to match your
                parallelism.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Use Cases */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-20 text-center">
              Common Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
              {
                icon: Video,
                title: 'Video Transcoding',
                desc: 'Process thousands of hours of video in parallel using ffmpeg.'
              },
              {
                icon: Database,
                title: 'ETL Pipelines',
                desc: 'Process and transform large datasets efficiently.'
              },
              {
                icon: FileText,
                title: 'Document OCR',
                desc: 'Extract text from millions of PDFs using OCR models.'
              }].
              map((uc, i) =>
              <div
                key={i}
                className="p-10 rounded-2xl border border-white/10 bg-[#0a0a0a] hover:border-[#00ff88]/50 transition-colors group">

                  <uc.icon
                  className="text-[#00ff88] mb-6 group-hover:scale-110 transition-transform"
                  size={40} />

                  <h3 className="text-2xl font-bold mb-4">{uc.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. Metrics */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-4">10k+</div>
              <div className="text-gray-400 uppercase tracking-wider font-medium">
                Concurrent Containers
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-4">99.9%</div>
              <div className="text-gray-400 uppercase tracking-wider font-medium">
                Success Rate
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-4">&lt; 1s</div>
              <div className="text-gray-400 uppercase tracking-wider font-medium">
                Scheduling Overhead
              </div>
            </div>
          </div>
        </section>

        {/* 6. Cost Calculator */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Calculate Savings
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Total Compute Hours
                </label>
                <input
                  type="range"
                  className="w-full h-2 bg-[#111] rounded-lg appearance-none cursor-pointer accent-[#00ff88]" />

                <div className="text-right text-[#00ff88] font-bold mt-2">
                  5,000
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">AWS Batch</div>
                  <div className="text-3xl font-bold text-white">$12,500</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Modal</div>
                  <div className="text-3xl font-bold text-[#00ff88]">
                    $8,200
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Video Tutorial */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Processing 1M Videos</h2>
              <p className="text-gray-400">
                See how to build a massive scale video processing pipeline.
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

        {/* 8. Integrations */}
        <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-16">
              Connects with your data
            </h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-70">
              {['S3', 'GCS', 'Snowflake', 'Postgres', 'Kafka', 'Redis'].map(
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
              <h2 className="text-4xl font-bold mb-6">Full observability</h2>
              <p className="text-xl text-gray-400 mb-8">
                Track every job, container, and error in real-time. Debug
                failures with distributed logs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Job status dashboard
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Distributed tracing
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Activity className="text-[#00ff88]" /> Resource utilization
                  graphs
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) =>
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-[#111] rounded-lg border border-white/5">

                    <div className="flex items-center gap-4">
                      <div
                      className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-[#00ff88]'}`} />

                      <span className="font-mono text-sm">job_{1000 + i}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {i === 2 ? 'Failed' : 'Running'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 10. Scheduling */}
        <section className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Powerful Scheduling</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <Clock className="mx-auto mb-6 text-[#00ff88]" size={32} />
                <h3 className="text-xl font-bold mb-4">Cron Jobs</h3>
                <p className="text-gray-400">
                  Run jobs on a schedule with standard cron syntax.
                </p>
              </div>
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <Zap className="mx-auto mb-6 text-[#00ff88]" size={32} />
                <h3 className="text-xl font-bold mb-4">Event Driven</h3>
                <p className="text-gray-400">
                  Trigger jobs from webhooks or API calls.
                </p>
              </div>
              <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/10">
                <Layers className="mx-auto mb-6 text-[#00ff88]" size={32} />
                <h3 className="text-xl font-bold mb-4">Pipelines</h3>
                <p className="text-gray-400">
                  Chain jobs together to create complex workflows.
                </p>
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
                q: 'Is there a limit to concurrency?',
                a: 'Soft limits exist but can be raised. We regularly run jobs with 10k+ containers.'
              },
              {
                q: 'How do I handle failures?',
                a: 'Modal automatically retries failed tasks. You can configure retry policies.'
              },
              {
                q: 'Can I access the internet?',
                a: 'Yes, all containers have full internet access.'
              },
              {
                q: 'What happens if a worker dies?',
                a: 'The task is automatically rescheduled on a healthy worker.'
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
            <h2 className="text-5xl font-bold mb-8">Scale your processing</h2>
            <p className="text-2xl text-gray-400 mb-12 font-light">
              Process millions of items in minutes, not days.
            </p>
            <button className="px-10 py-5 rounded-full bg-[#00ff88] text-black font-bold text-xl hover:bg-[#00cc6a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
              Start Batch Job
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}