import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, FlaskConical, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { DocsShell } from '../../components/DocsShell';

export function DocsHomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const MotionLink = motion.create(Link);

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

              <MotionLink
                to="/resources"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-green px-4 py-2 text-[13px] font-semibold text-black hover:bg-[#00cc6a] transition-colors"
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Try the playground
                <span className="text-black/70">↗</span>
              </MotionLink>
            </div>

            <div className="hidden lg:block">
              <div className="relative h-[280px] w-[420px]">
                <motion.div
                  className="absolute right-0 top-0 h-[240px] w-[240px] rounded-2xl border border-[rgba(0,255,136,0.35)]"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: [0.65, 1, 0.65],
                        }
                  }
                  transition={prefersReducedMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                  className="absolute right-[110px] top-[70px] h-[200px] w-[200px] rounded-2xl border border-[rgba(0,255,136,0.25)]"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: [0.55, 0.95, 0.55],
                          y: [0, -4, 0],
                        }
                  }
                  transition={prefersReducedMotion ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                  className="absolute right-[220px] top-[150px] h-[96px] w-[96px] rounded-2xl bg-accent-green/90"
                  style={{ filter: 'hue-rotate(0deg)' }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          filter: ['hue-rotate(0deg)', 'hue-rotate(60deg)', 'hue-rotate(0deg)'],
                          scale: [1, 1.05, 1],
                        }
                  }
                  transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                  className="absolute right-[240px] top-[170px] h-[56px] w-[56px] rounded-xl border border-black/30 bg-black/20"
                  animate={prefersReducedMotion ? undefined : { y: [0, 3, 0] }}
                  transition={prefersReducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <MotionLink
                to="/docs/guides/product/"
                className="group p-6 border-b lg:border-b-0 lg:border-r border-[color:var(--docs-border)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -2,
                        boxShadow: '0 18px 50px rgba(0,0,0,0.25)',
                      }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <motion.span
                  animate={prefersReducedMotion ? undefined : { rotate: [0, -6, 0] }}
                  transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <BookOpen size={16} className="text-accent-green" />
                </motion.span>
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Guide</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Everything you need to know to run code on Modal. Dive deep into all of our features and best practices.
                </div>
              </MotionLink>

              <MotionLink
                to="/docs/examples/"
                className="group p-6 border-b md:border-b-0 md:border-r border-[color:var(--docs-border)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -2,
                        boxShadow: '0 18px 50px rgba(0,0,0,0.25)',
                      }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <motion.span
                  animate={prefersReducedMotion ? undefined : { y: [0, -2, 0] }}
                  transition={prefersReducedMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <FlaskConical size={16} className="text-accent-green" />
                </motion.span>
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Examples</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Powerful applications built with Modal. Explore guided starting points for your use case.
                </div>
              </MotionLink>

              <MotionLink
                to="/docs/guides/api/"
                className="group p-6 border-b lg:border-b-0 lg:border-r border-[color:var(--docs-border)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -2,
                        boxShadow: '0 18px 50px rgba(0,0,0,0.25)',
                      }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <motion.span
                  animate={prefersReducedMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
                  transition={prefersReducedMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <Code2 size={16} className="text-accent-green" />
                </motion.span>
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Reference</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Technical information about the Modal API. Quickly refer to basic descriptions of various programming
                  functionalities.
                </div>
              </MotionLink>

              <MotionLink
                to="/resources"
                className="group p-6 hover:bg-[color:var(--docs-panel-2)] transition-colors"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -2,
                        boxShadow: '0 18px 50px rgba(0,0,0,0.25)',
                      }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <motion.span
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }}
                  transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <Play size={16} className="text-accent-green" />
                </motion.span>
                <div className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Playground</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">
                  Interactive tutorials to learn how to start using Modal. Run serverless cloud functions from your
                  browser.
                </div>
              </MotionLink>
            </div>
          </div>

          <div className="mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6">
                <div className="text-sm font-semibold text-[color:var(--text-primary)]">Getting started</div>
                <div className="mt-2 text-[13px] text-[color:var(--docs-muted)] leading-relaxed">
                  Install, run your first app, and learn the basics.
                </div>
                <div className="mt-4 space-y-2 text-[13px]">
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Introduction</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/create-guide/">Create a new guide</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/examples/">Browse examples</Link>
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6">
                <div className="text-sm font-semibold text-[color:var(--text-primary)]">Core concepts</div>
                <div className="mt-2 text-[13px] text-[color:var(--docs-muted)] leading-relaxed">
                  Learn the primitives you’ll use across guides and examples.
                </div>
                <div className="mt-4 space-y-2 text-[13px]">
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Apps, Functions, and entrypoints</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/api/">API Reference</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Deployments</Link>
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6">
                <div className="text-sm font-semibold text-[color:var(--text-primary)]">Scaling & performance</div>
                <div className="mt-2 text-[13px] text-[color:var(--docs-muted)] leading-relaxed">
                  Patterns for concurrency, batching, and throughput.
                </div>
                <div className="mt-4 space-y-2 text-[13px]">
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Scaling out</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Batch processing</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Job queues</Link>
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6">
                <div className="text-sm font-semibold text-[color:var(--text-primary)]">GPUs & resources</div>
                <div className="mt-2 text-[13px] text-[color:var(--docs-muted)] leading-relaxed">
                  Configure accelerators and resource limits.
                </div>
                <div className="mt-4 space-y-2 text-[13px]">
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">GPU acceleration</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Container images</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/product/">Secrets and environment variables</Link>
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6 md:col-span-2">
                <div className="text-sm font-semibold text-[color:var(--text-primary)]">Help & updates</div>
                <div className="mt-2 text-[13px] text-[color:var(--docs-muted)] leading-relaxed">
                  Release notes, troubleshooting, and support resources.
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px]">
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/changelog/">Changelog</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/guides/help-center/">Help Center</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/resources">Playground</Link>
                  <Link className="block text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors" to="/docs/examples/">Examples</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="h-24" />
        </div>
      </div>
    </DocsShell>
  );
}
