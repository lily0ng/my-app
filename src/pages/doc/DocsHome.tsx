import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, FlaskConical, Play } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

export function DocsHomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DocsShell
      layout="home"
      breadcrumbs={[]}
      sidebar={null}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
    >
      <div className="w-full">
        <div className="mx-auto w-full max-w-[1100px] pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[color:var(--text-primary)]">
                Modal Documentation
              </h1>
              <p className="mt-6 text-[15px] leading-relaxed text-[color:var(--docs-muted)] max-w-[560px]">
                Modal provides a serverless cloud for engineers and researchers who want to build compute-intensive
                applications without thinking about infrastructure.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-[color:var(--docs-muted)] max-w-[560px]">
                Run generative AI models, large-scale batch workflows, job queues, and more, all faster than ever before.
              </p>

              <Link
                to="/resources"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-green px-4 py-2 text-[13px] font-semibold text-black hover:bg-[#00cc6a] transition-colors"
              >
                Try the playground
                <span className="text-black/70">↗</span>
              </Link>
            </div>

            <div className="hidden lg:block">
              <div className="relative h-[280px] w-[420px]">
                <div className="absolute right-0 top-0 h-[240px] w-[240px] rounded-2xl border border-[rgba(0,255,136,0.35)]" />
                <div className="absolute right-[110px] top-[70px] h-[200px] w-[200px] rounded-2xl border border-[rgba(0,255,136,0.25)]" />
                <div className="absolute right-[220px] top-[150px] h-[96px] w-[96px] rounded-2xl bg-accent-green/90" />
                <div className="absolute right-[240px] top-[170px] h-[56px] w-[56px] rounded-xl border border-black/30 bg-black/20" />
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Link
                to="/docs/guides/product/"
                className="group p-6 border-b lg:border-b-0 lg:border-r border-[color:var(--docs-border)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
              >
                <BookOpen size={16} className="text-accent-green" />
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Guide</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Everything you need to know to run code on Modal. Dive deep into all of our features and best practices.
                </div>
              </Link>

              <Link
                to="/docs/examples/"
                className="group p-6 border-b md:border-b-0 md:border-r border-[color:var(--docs-border)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
              >
                <FlaskConical size={16} className="text-accent-green" />
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Examples</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Powerful applications built with Modal. Explore guided starting points for your use case.
                </div>
              </Link>

              <Link
                to="/docs/guides/api/"
                className="group p-6 border-b lg:border-b-0 lg:border-r border-[color:var(--docs-border)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
              >
                <Code2 size={16} className="text-accent-green" />
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Reference</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Technical information about the Modal API. Quickly refer to basic descriptions of various programming
                  functionalities.
                </div>
              </Link>

              <Link
                to="/resources"
                className="group p-6 hover:bg-[color:var(--docs-panel-2)] transition-colors"
              >
                <Play size={16} className="text-accent-green" />
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Playground</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Interactive tutorials to learn how to start using Modal. Run serverless cloud functions from your
                  browser.
                </div>
              </Link>
            </div>
          </div>

          <div className="h-24" />
        </div>
      </div>
    </DocsShell>
  );
}
