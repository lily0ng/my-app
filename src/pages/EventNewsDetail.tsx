import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { getNewsPost } from './eventNewsData';

export function EventNewsDetailPage() {
  const { slug } = useParams();
  const post = getNewsPost(slug);

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] font-sans selection:bg-[rgba(var(--accent-rgb),0.30)] selection:text-[color:var(--bg-primary)]">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              to="/resources/events#news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Event &amp; News
            </Link>
          </div>

          {post ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8 md:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                      <Newspaper size={14} className="text-[color:var(--accent)]" />
                      NEWS
                    </div>

                    <h1 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                      <div className="text-[color:var(--text-secondary)]">{post.date}</div>
                      <div className="h-1 w-1 rounded-full bg-[color:var(--border-color)]" />
                      <div className="text-[color:var(--text-secondary)]">{post.tag}</div>
                    </div>

                    <p className="mt-6 text-[color:var(--text-secondary)] leading-relaxed">{post.desc}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to="/resources/events#events"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 py-3 font-semibold text-white shadow-[0_18px_50px_rgba(var(--accent-rgb),0.22)] transition-transform hover:-translate-y-0.5"
                      >
                        Browse events
                        <ArrowRight size={18} />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] px-7 py-3 font-semibold text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--bg-tertiary)]"
                      >
                        Share an update
                      </Link>
                    </div>
                  </div>

                  <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)]">
                    <Newspaper size={22} className="text-[color:var(--accent)]" />
                  </div>
                </div>
              </motion.div>

              <div className="mt-10 space-y-8">
                {post.sections.map((s) => (
                  <motion.section
                    key={s.heading}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7 md:p-8"
                  >
                    <h2 className="text-xl font-bold">{s.heading}</h2>
                    <div className="mt-4 space-y-3 text-[color:var(--text-secondary)] leading-relaxed">
                      {s.body.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-10">
              <div className="text-2xl font-bold">News item not found</div>
              <div className="mt-3 text-[color:var(--text-secondary)]">
                This news link may be outdated. Return to Event &amp; News to pick another update.
              </div>
              <Link
                to="/resources/events#news"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] hover:underline underline-offset-4"
              >
                Back to News <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
