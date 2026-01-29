import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRight, BookOpen, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { DocsShell } from '../components/DocsShell';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const sidebar = (
    <div className="pr-2">
      <div className="space-y-6 pb-6">
        {sections.map(({ section, items }) => (
          <div key={section}>
            <h4 className="text-[11px] font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider mb-2">
              {section}
            </h4>
            <ul className="space-y-1 text-sm">
              {items.map((p) => {
                const active = p.slug === slug;
                return (
                  <li key={p.slug}>
                    <Link
                      to={`/docs/guides/${p.slug}`}
                      className={
                        'flex items-center gap-3 rounded-md px-3 py-2 transition-colors border-l-2 ' +
                        (active
                          ? 'border-l-[color:var(--accent)] bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-semibold'
                          : 'border-l-transparent text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]')
                      }
                    >
                      <span className="truncate">{p.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const rightRail = selected ? (
    <div className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4">
      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] px-3 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent)] transition-colors"
      >
        <MessageCircle size={16} className="text-[color:var(--text-tertiary)]" /> Ask
      </button>

      <div className="mt-6">
        <div className="text-xs font-semibold text-[color:var(--text-tertiary)]">Was this helpful?</div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] hover:border-[color:var(--accent)] transition-colors"
            aria-label="Helpful"
          >
            <ThumbsUp size={16} className="text-[color:var(--text-secondary)]" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border-color)] bg-[color:var(--bg-tertiary)] hover:border-[color:var(--accent)] transition-colors"
            aria-label="Not helpful"
          >
            <ThumbsDown size={16} className="text-[color:var(--text-secondary)]" />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const breadcrumbs = selected
    ? [
        { label: 'API', to: '/docs/api' },
        { label: 'Guides', to: '/docs/guides' },
        { label: selected.title },
      ]
    : [{ label: 'API', to: '/docs/api' }, { label: 'Guides' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      rightRail={rightRail}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="Search..."
    >
      {!selected && (
        <div>
          <div className="mb-10">
            <div className="text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">Guides</div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Welcome</h1>
            <p className="text-[color:var(--text-secondary)] mt-3 max-w-2xl">
              Choose a guide to get started. New guides are loaded automatically from{' '}
              <span className="text-[color:var(--text-primary)]">src/POST/guides</span>.
            </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/docs/guides/${p.slug}`}
                  className="group rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden hover:border-[color:var(--accent)] transition-colors"
                >
                  <div className="h-28 bg-[color:var(--bg-tertiary)] flex items-center justify-center">
                    <BookOpen size={34} className="text-[color:var(--accent)]" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[color:var(--text-tertiary)] mb-2">{p.section}</div>
                    <div className="text-lg font-bold mb-2 group-hover:text-[color:var(--accent)] transition-colors">
                      {p.title}
                    </div>
                    <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed line-clamp-2">
                      {p.description || 'Open the guide to read the full walkthrough.'}
                    </p>
                    <div className="mt-5 text-[color:var(--accent)] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {selected && (
        <div>
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

          <article className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[color:var(--text-primary)] prose-code:text-[color:var(--text-primary)] prose-pre:bg-[color:var(--bg-tertiary)] prose-pre:border prose-pre:border-[color:var(--border-color)] prose-table:mx-auto prose-img:mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.content}</ReactMarkdown>
          </article>
        </div>
      )}
    </DocsShell>
  );
}
