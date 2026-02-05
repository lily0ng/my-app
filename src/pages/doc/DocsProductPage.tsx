import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Code2, Layers, Rocket, Shield, Sparkles, type LucideIcon } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

type SideItem = {
  label: string;
  to?: string;
  indent?: boolean;
  Icon?: LucideIcon;
};

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

export function DocsProductPage() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p);

  const posts = useMemo<GuidePost[]>(() => {
    const modules = import.meta.glob(['../../POST/guides/*.md', '/src/POST/guides/*.md'], {
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
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const hay = `${p.title} ${p.description} ${p.section}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, search]);

  const sidebarPosts = useMemo(() => {
    return filteredPosts.filter((p) => p.slug.toLowerCase() !== 'welcome');
  }, [filteredPosts]);

  const sections = useMemo(() => {
    const map = new Map<string, GuidePost[]>();
    for (const p of sidebarPosts) {
      const arr = map.get(p.section) ?? [];
      arr.push(p);
      map.set(p.section, arr);
    }
    return Array.from(map.entries()).map(([section, items]) => ({ section, items }));
  }, [sidebarPosts]);

  const iconForSlug = (slug: string): LucideIcon => {
    const s = slug.toLowerCase();
    if (s === 'quickstart') return Rocket;
    if (s === 'markdown-style') return Sparkles;
    if (s.includes('concept')) return Layers;
    return BookOpen;
  };

  const staticGroups: { title: string; items: SideItem[] }[] = [
    {
      title: 'Reference',
      items: [{ label: 'API', to: '/docs/guides/api/', Icon: Code2 }],
    },
    {
      title: 'Support',
      items: [{ label: 'Help Center', to: '/docs/guides/help-center/', Icon: Shield }],
    },
  ];

  const sidebar = (
    <div className="pr-2">
      <div className="pt-2 pb-5">
        <div className="text-lg font-semibold text-[color:var(--text-primary)] truncate">Product</div>
      </div>

      <div className="space-y-6 pb-6">
        <div>
          <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-2">
            Getting started
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/docs/guides/product/"
                className={
                  'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors ' +
                  (norm(pathname) === norm('/docs/guides/product/')
                    ? 'bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)] font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-[color:var(--accent)]'
                    : 'text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]')
                }
              >
                <span
                  className={
                    'flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] ' +
                    (norm(pathname) === norm('/docs/guides/product/')
                      ? 'text-[color:var(--accent)]'
                      : 'text-[color:var(--docs-muted-2)] group-hover:text-[color:var(--accent)]')
                  }
                >
                  <BookOpen size={15} />
                </span>
                <span className="truncate">Welcome</span>
              </Link>
            </li>
          </ul>
        </div>

        {sections.map(({ section, items }) => (
          <div key={section}>
            <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-2">
              {section}
            </div>
            <ul className="space-y-1">
              {items.map((p) => {
                const to = `/docs/guides/${p.slug}`;
                const active = norm(pathname) === norm(to);
                const pad = p.indent ? 'pl-8' : '';
                const Icon = iconForSlug(p.slug);
                return (
                  <li key={p.slug}>
                    <Link
                      to={to}
                      className={
                        'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors ' +
                        pad +
                        (active
                          ? 'bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)] font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-[color:var(--accent)]'
                          : 'text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]')
                      }
                    >
                      <span
                        className={
                          'flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] ' +
                          (active
                            ? 'text-[color:var(--accent)]'
                            : 'text-[color:var(--docs-muted-2)] group-hover:text-[color:var(--accent)]')
                        }
                      >
                        <Icon size={15} />
                      </span>
                      <span className="truncate">{p.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {staticGroups.map((g) => (
          <div key={g.title}>
            <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-2">
              {g.title}
            </div>
            <ul className="space-y-1">
              {g.items.map((it) => {
                const active = it.to ? norm(pathname) === norm(it.to) : false;
                const Icon = it.Icon;
                return (
                  <li key={it.label}>
                    {it.to ? (
                      <Link
                        to={it.to}
                        className={
                          'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors ' +
                          (active
                            ? 'bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)] font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-[color:var(--accent)]'
                            : 'text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]')
                        }
                      >
                        {Icon ? (
                          <span
                            className={
                              'flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] ' +
                              (active
                                ? 'text-[color:var(--accent)]'
                                : 'text-[color:var(--docs-muted-2)] group-hover:text-[color:var(--accent)]')
                            }
                          >
                            <Icon size={15} />
                          </span>
                        ) : null}
                        <span className="truncate">{it.label}</span>
                      </Link>
                    ) : (
                      <div className="px-3 py-2 text-[color:var(--docs-muted)]">{it.label}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const breadcrumbs = [{ label: 'Product', to: '/docs/guides/product/' }, { label: 'Welcome' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      rightRail={null}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
    >
      <div>
        <div className="mb-10">
          <div className="text-xs font-semibold text-[color:var(--docs-muted-2)] uppercase tracking-wider">Getting started</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">Welcome to 1CNG</h1>
          <p className="text-[color:var(--docs-muted)] mt-3 max-w-2xl leading-relaxed">
            Everything you need to get up and running. Use the left navigation to explore guides, reference, and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/docs/guides/quickstart"
            className="group rounded-2xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="h-36 bg-[rgba(var(--accent-rgb),0.08)] border-b border-[color:var(--docs-border)] flex items-center justify-center">
              <Rocket size={48} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Guide</div>
              <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">
                Quick start
              </div>
              <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">
                Create your first app, deploy it, and understand the project structure.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/guides/api/"
            className="group rounded-2xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="h-36 bg-[rgba(var(--accent-rgb),0.08)] border-b border-[color:var(--docs-border)] flex items-center justify-center">
              <Code2 size={48} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Reference</div>
              <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">API</div>
              <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">Explore endpoints and authentication.</p>
            </div>
          </Link>

          <Link
            to="/docs/guides/markdown-style"
            className="group rounded-2xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="h-36 bg-[rgba(var(--accent-rgb),0.08)] border-b border-[color:var(--docs-border)] flex items-center justify-center">
              <Sparkles size={48} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Concepts</div>
              <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">
                Writing guides
              </div>
              <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">
                Frontmatter, code blocks, tables, and best practices for clean docs.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/guides/help-center/"
            className="group rounded-2xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="h-36 bg-[rgba(var(--accent-rgb),0.08)] border-b border-[color:var(--docs-border)] flex items-center justify-center">
              <Shield size={48} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Support</div>
              <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">
                Help Center
              </div>
              <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">Guidance, FAQs, and best practices.</p>
            </div>
          </Link>
        </div>
      </div>
    </DocsShell>
  );
}
