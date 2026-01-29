import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search, ArrowRight, ChevronRight } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

type GuideFrontmatter = {
  title?: string;
  description?: string;
  section?: string;
  order?: number;
  slug?: string;
  updated?: string;
};

type GuidePost = {
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
  updated: string | undefined;
  content: string;
};

const slugFromPath = (path: string) => {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.md$/i, '');
};

const parseFrontmatter = (raw: string): { data: GuideFrontmatter; content: string } => {
  const trimmed = raw ?? '';
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: trimmed };
  }

  const endIdx = trimmed.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { data: {}, content: trimmed };
  }

  const header = trimmed.slice(3, endIdx).trim();
  const body = trimmed.slice(endIdx + '\n---'.length).replace(/^\s*\n/, '');

  const data: GuideFrontmatter = {};
  for (const line of header.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const idx = t.indexOf(':');
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    let value = t.slice(idx + 1).trim();
    value = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '');

    if (key === 'order') {
      const n = Number(value);
      if (!Number.isNaN(n)) {
        data.order = n;
      }
      continue;
    }

    if (key === 'title') data.title = value;
    if (key === 'description') data.description = value;
    if (key === 'section') data.section = value;
    if (key === 'slug') data.slug = value;
    if (key === 'updated') data.updated = value;
  }

  return { data, content: body };
};

export function GuidesPage() {
  const { slug } = useParams();
  const [query, setQuery] = useState('');

  const posts = useMemo<GuidePost[]>(() => {
    const modules = import.meta.glob(['../POST/guides/*.md', '/src/POST/guides/*.md'], {
      eager: true,
      query: '?raw',
      import: 'default',
    }) as Record<string, unknown>;

    return Object.entries(modules)
      .map((entry): GuidePost | null => {
        const [path, raw] = entry;
        try {
          const rawText = typeof raw === 'string' ? raw : '';
          const parsed = parseFrontmatter(rawText);
          const data = parsed.data ?? {};
          const derivedSlug = (data.slug ?? slugFromPath(path)).toString();

          return {
            slug: derivedSlug,
            title: (data.title ?? derivedSlug).toString(),
            description: (data.description ?? '').toString(),
            section: (data.section ?? 'Getting Started').toString(),
            order: typeof data.order === 'number' ? data.order : 999,
            updated: typeof data.updated === 'string' ? data.updated : undefined,
            content: parsed.content,
          };
        } catch {
          return null;
        }
      })
      .filter((p): p is GuidePost => {
        if (p === null) return false;
        if (p.title.trim().length === 0) return false;
        if (p.slug.toLowerCase() === 'readme') return false;
        return true;
      })
      .sort((a, b) => {
        if (a.section !== b.section) return a.section.localeCompare(b.section);
        if (a.order !== b.order) return a.order - b.order;
        return a.title.localeCompare(b.title);
      });
  }, []);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const hay = `${p.title} ${p.description} ${p.section}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query]);

  const selected = useMemo(() => {
    if (!slug) return null;
    return posts.find((p) => p.slug === slug) ?? null;
  }, [posts, slug]);

  const sections = useMemo(() => {
    const map = new Map<string, GuidePost[]>();
    for (const p of filteredPosts) {
      const arr = map.get(p.section) ?? [];
      arr.push(p);
      map.set(p.section, arr);
    }
    return Array.from(map.entries()).map(([section, items]) => ({ section, items }));
  }, [filteredPosts]);

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-hidden font-sans selection:bg-[color:var(--accent)] selection:text-black">
      <Nav />

      <main className="flex pt-24">
        <aside className="w-80 fixed left-0 top-24 bottom-0 border-r border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 hidden lg:block overflow-y-auto z-10">
          <div className="mb-7">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-[color:var(--text-tertiary)]" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides..."
                className="w-full bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-8">
            {sections.map(({ section, items }) => (
              <div key={section}>
                <h4 className="text-xs font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider mb-4">{section}</h4>
                <ul className="space-y-2 text-sm">
                  {items.map((p) => {
                    const active = p.slug === slug;
                    return (
                      <li key={p.slug}>
                        <Link
                          to={`/docs/guides/${p.slug}`}
                          className={
                            'flex items-center justify-between gap-3 rounded-lg px-3 py-2 border transition-colors ' +
                            (active
                              ? 'bg-[color:var(--bg-tertiary)] border-[color:var(--border-color)] text-[color:var(--text-primary)]'
                              : 'border-transparent text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]')
                          }
                        >
                          <span className="truncate">{p.title}</span>
                          <ChevronRight
                            size={16}
                            className={active ? 'text-[color:var(--accent)]' : 'text-[color:var(--text-tertiary)]'}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 lg:ml-80 p-8 md:p-16 w-full">
          {!selected && (
            <div className="max-w-6xl">
              <div className="mb-12">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="text-sm text-[color:var(--text-tertiary)]">Docs</div>
                    <h1 className="text-5xl md:text-6xl font-bold mt-2">Guides</h1>
                    <p className="text-[color:var(--text-secondary)] mt-4 max-w-2xl">
                      Deep dives into core concepts. Add new guides by dropping markdown files into{' '}
                      <span className="text-white">src/POST/guides</span>.
                    </p>
                  </div>
                  <div className="hidden md:inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-secondary)] whitespace-nowrap">
                    {posts.length} guide{posts.length === 1 ? '' : 's'} loaded
                  </div>
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-8">
                  <div className="text-xl font-bold">No guides found</div>
                  <p className="text-[color:var(--text-secondary)] mt-2 leading-relaxed">
                    Add a markdown post in <span className="text-white">src/POST/guides</span> (for example,
                    <span className="text-white"> welcome.md</span>) and refresh.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/docs/guides/${p.slug}`}
                      className="group rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-7 hover:border-[color:var(--accent)] transition-colors hover:shadow-[0_22px_70px_rgba(0,0,0,0.14)]"
                    >
                      <div className="text-xs text-[color:var(--text-tertiary)] mb-3">{p.section}</div>
                      <div className="text-xl font-bold mb-2 group-hover:text-[color:var(--accent)] transition-colors">
                        {p.title}
                      </div>
                      <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed line-clamp-2">
                        {p.description || 'Open the guide to read the full walkthrough.'}
                      </p>
                      <div className="mt-6 text-[color:var(--accent)] font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read guide <ArrowRight size={16} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {selected && (
            <div className="max-w-3xl">
              <div className="mb-10">
                <Link
                  to="/docs/guides"
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight className="rotate-180" size={16} /> Back to Guides
                </Link>

                <div className="mt-6 text-xs text-[color:var(--text-tertiary)]">{selected.section}</div>
                <h1 className="text-4xl md:text-5xl font-bold mt-2">{selected.title}</h1>
                {selected.description && (
                  <p className="text-[color:var(--text-secondary)] mt-4 leading-relaxed">{selected.description}</p>
                )}
              </div>

              <article className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[color:var(--text-primary)] prose-code:text-[color:var(--text-primary)] prose-pre:bg-[color:var(--bg-tertiary)] prose-pre:border prose-pre:border-[color:var(--border-color)]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.content}</ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
