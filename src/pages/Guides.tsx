import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRight, BookOpen, Check, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { DocsShell } from '../components/DocsShell';
import { useTheme } from '../contexts/ThemeContext';

type GuideFrontmatter = {
  title?: string;
  description?: string;
  section?: string;
  order?: number;
  indent?: boolean;
  slug?: string;
  updated?: string;
};

type GuidePost = {
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
  indent: boolean;
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
    if (key === 'indent') data.indent = value === 'true' || value === '1' || value === 'yes';
    if (key === 'slug') data.slug = value;
    if (key === 'updated') data.updated = value;
  }

  return { data, content: body };
};

const slugifyHeading = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const nodeText = (node: unknown): string => {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (typeof node === 'object' && node && 'props' in (node as any)) return nodeText((node as any).props?.children);
  return '';
};

export function GuidesPage() {
  const { slug } = useParams();
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

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
            indent: data.indent === true,
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

  const toc = useMemo(() => {
    if (!selected) return [] as { id: string; title: string; level: number }[];
    const items: { id: string; title: string; level: number }[] = [];
    const lines = selected.content.split(/\r?\n/);
    for (const line of lines) {
      const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!m) continue;
      const level = m[1].length;
      const title = m[2].trim().replace(/\s+#+\s*$/, '');
      const id = slugifyHeading(title);
      if (!id) continue;
      items.push({ id, title, level });
    }
    return items;
  }, [selected]);

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
      <div className="pt-1 pb-4">
        <div className="text-[13px] font-semibold text-[color:var(--text-primary)] truncate">
          {selected ? selected.title : 'Guides'}
        </div>
      </div>

      <div className="space-y-6 pb-6">
        {sections.map(({ section, items }) => (
          <div key={section}>
            <h4 className="text-[12px] font-semibold text-[color:var(--text-primary)] mb-2">
              {section}
            </h4>
            <ul className="space-y-0.5">
              {items.map((p) => {
                const active = p.slug === slug;
                const basePad = p.indent ? 'pl-8' : 'pl-3';
                const size = p.indent ? 'text-[12px]' : 'text-[13px]';
                const idleColor = p.indent ? 'text-[color:var(--docs-muted-2)]' : 'text-[color:var(--docs-muted)]';
                return (
                  <li key={p.slug}>
                    <Link
                      to={`/docs/guides/${p.slug}`}
                      className={
                        'block w-full -mx-3 px-3 pr-3 py-2 leading-tight transition-colors ' +
                        basePad +
                        ' ' +
                        size +
                        (active
                          ? ' bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)]'
                          : ` ${idleColor} hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]`)
                      }
                    >
                      <span className="truncate block">{p.title}</span>
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
    <div className="space-y-4">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] px-3 py-2 text-[12px] font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
      >
        {copied ? <Check size={14} className="text-[color:var(--accent)]" /> : <Copy size={14} className="text-[color:var(--docs-muted)]" />}
        {copied ? 'Copied' : 'Copy page'}
        <ChevronDown size={14} className="text-[color:var(--docs-muted-2)]" />
      </button>

      <div className="rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-3">
        <div className="text-[11px] font-semibold text-[color:var(--docs-muted)] uppercase tracking-wider">{selected.title.toUpperCase()}</div>
        <div className="mt-3 space-y-2">
          {toc.length === 0 ? (
            <div className="text-sm text-[color:var(--docs-muted-2)]">No sections</div>
          ) : (
            (() => {
              let h2Index = 0;
              return toc
                .filter((t) => t.level === 2 || t.level === 3)
                .slice(0, 10)
                .map((t) => {
                  const isH2 = t.level === 2;
                  const number = isH2 ? ++h2Index : null;
                  return (
                    <a
                      key={t.id + t.title}
                      href={`#${t.id}`}
                      className={
                        'block text-sm transition-colors hover:text-[color:var(--text-primary)] ' +
                        (t.level === 3 ? 'pl-3 text-[color:var(--docs-muted-2)]' : 'text-[color:var(--docs-muted)]')
                      }
                    >
                      {isH2 ? `${number}) ${t.title}` : t.title}
                    </a>
                  );
                });
            })()
          )}
        </div>
      </div>

      <div className="rounded-md border border-[color:rgba(0,255,136,0.35)] bg-[color:var(--docs-panel)] p-3">
        <div className="text-[11px] font-semibold text-[color:var(--docs-muted)] uppercase tracking-wider">See it in action</div>
        <div className="mt-2 text-sm text-[color:var(--docs-muted)]">
          <div className="flex items-center justify-between gap-3">
            <span>Hello, world!</span>
            <ExternalLink size={14} className="text-[color:var(--docs-muted-2)]" />
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span>A simple web scraper</span>
            <ExternalLink size={14} className="text-[color:var(--docs-muted-2)]" />
          </div>
        </div>
      </div>
    </div>
  ) : null;

  const breadcrumbs = selected
    ? [
        { label: 'API', to: '/docs/guides/api/' },
        { label: 'Guides', to: '/docs/guides' },
        { label: selected.title },
      ]
    : [{ label: 'API', to: '/docs/guides/api/' }, { label: 'Guides' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      rightRail={rightRail}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="Search"
    >
      {!selected && (
        <div>
          <div className="mb-10">
            <div className="text-[11px] font-semibold text-[color:var(--docs-muted-2)] uppercase tracking-wider">Getting Started</div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">Welcome</h1>
            <p className="text-[color:var(--docs-muted)] mt-3 max-w-2xl">
              Everything you need to get up and running. Use the left navigation to explore guides and core concepts.
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-8">
              <div className="text-xl font-bold text-[color:var(--text-primary)]">No guides found</div>
              <p className="text-[color:var(--docs-muted)] mt-2 leading-relaxed">
                Add a markdown post in <span className="text-[color:var(--text-primary)]">src/POST/guides</span> (for example,{' '}
                <span className="text-[color:var(--text-primary)]">welcome.md</span>) and refresh.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/docs/guides/${p.slug}`}
                  className="group rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-5 hover:bg-[color:var(--docs-panel-2)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-2">{p.section}</div>
                      <div className="text-base font-semibold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">
                        {p.title}
                      </div>
                    </div>
                    <BookOpen size={18} className="text-[color:var(--accent)] mt-1 shrink-0" />
                  </div>
                  <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed line-clamp-2">
                    {p.description || 'Open the guide to read the full walkthrough.'}
                  </p>
                  <div className="mt-5 text-[color:var(--accent)] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read <ArrowRight size={16} />
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
              className="text-sm text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-2"
            >
              <ArrowRight className="rotate-180" size={16} /> Back to Guides
            </Link>

            <div className="mt-6">
              <div className="text-xs text-[color:var(--docs-muted-2)]">{selected.section}</div>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">{selected.title}</h1>
            </div>
            {selected.description && (
              <p className="text-[color:var(--docs-muted)] mt-4 leading-relaxed">{selected.description}</p>
            )}
          </div>

          <article
            className={
              'prose max-w-none prose-headings:scroll-mt-24 prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline prose-pre:bg-[color:var(--docs-code-bg)] prose-pre:border prose-pre:border-[color:var(--docs-border)] prose-table:mx-auto prose-img:mx-auto ' +
              (theme === 'dark' ? 'prose-invert' : '')
            }
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = nodeText(children);
                  return (
                    <h2 id={slugifyHeading(text)} {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = nodeText(children);
                  return (
                    <h3 id={slugifyHeading(text)} {...props}>
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {selected.content}
            </ReactMarkdown>
          </article>
        </div>
      )}
    </DocsShell>
  );
}
