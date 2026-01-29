import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Shield, Sliders, Sparkles } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

type SideItem = {
  label: string;
  to?: string;
  indent?: boolean;
};

type SideGroup = {
  title: string;
  items: SideItem[];
};

export function DocsProductPage() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p);

  const groups: SideGroup[] = [
    {
      title: 'Build with Acme',
      items: [
        { label: 'Welcome', to: '/docs/guides/product/' },
        { label: 'Quickstart', to: '/docs/guides/quickstart' },
        { label: 'Concepts', to: '/docs/guides/markdown-style' },
      ],
    },
    {
      title: 'Security',
      items: [
        { label: 'Overview', to: '/docs/guides/help-center/' },
        { label: 'Best practices', to: '/docs/guides/help-center/' },
      ],
    },
  ];

  const sidebar = (
    <div className="pr-2">
      <div className="pt-2 pb-6">
        <div className="text-lg font-semibold text-[color:var(--text-primary)] truncate">Product</div>
      </div>

      <div className="space-y-7 pb-6">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-3">
            {g.title}
          </div>
          <ul className="space-y-2">
            {g.items.map((it) => {
              const active = it.to ? norm(pathname) === norm(it.to) : false;
              return (
                <li key={it.label}>
                  {it.to ? (
                    <Link
                      to={it.to}
                      className={
                        'block rounded-md px-3 py-2 text-[14px] transition-colors ' +
                        (active
                          ? 'bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)] font-semibold'
                          : 'text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)]')
                      }
                    >
                      {it.label}
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
          <div className="text-xs font-semibold text-[color:var(--docs-muted-2)] uppercase tracking-wider">Getting Started</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">Welcome</h1>
          <p className="text-[color:var(--docs-muted)] mt-3 max-w-2xl leading-relaxed">
            Everything you need to get up and running. Use the left navigation to explore guides and core concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/docs/guides/quickstart"
            className="group rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6 hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Guides</div>
                <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">
                  Quick start
                </div>
              </div>
              <BookOpen size={18} className="text-[color:var(--accent)] mt-1 shrink-0" />
            </div>
            <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">
              Get up and running fast with setup and your first guide.
            </p>
          </Link>

          <Link
            to="/docs/guides/api/"
            className="group rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6 hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Reference</div>
                <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">API</div>
              </div>
              <Sparkles size={18} className="text-[color:var(--accent)] mt-1 shrink-0" />
            </div>
            <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">Explore endpoints and authentication.</p>
          </Link>

          <Link
            to="/docs/guides/help-center/"
            className="group rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6 hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Support</div>
                <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">
                  Help Center
                </div>
              </div>
              <Shield size={18} className="text-[color:var(--accent)] mt-1 shrink-0" />
            </div>
            <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">Guidance and best practices.</p>
          </Link>

          <Link
            to="/docs/guides"
            className="group rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6 hover:bg-[color:var(--docs-panel-2)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-[color:var(--docs-muted-2)] mb-2">Browse</div>
                <div className="text-lg font-bold mb-2 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">Guides</div>
              </div>
              <Sliders size={18} className="text-[color:var(--accent)] mt-1 shrink-0" />
            </div>
            <p className="text-sm text-[color:var(--docs-muted)] leading-relaxed">Deep dives and how-to docs.</p>
          </Link>
        </div>
      </div>
    </DocsShell>
  );
}
