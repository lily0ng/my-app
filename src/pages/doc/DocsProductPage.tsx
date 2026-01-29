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
    <div className="space-y-7 pr-2">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="text-[11px] font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider mb-2">
            {g.title}
          </div>
          <ul className="space-y-1 text-sm">
            {g.items.map((it) => {
              const active = it.to ? norm(pathname) === norm(it.to) : false;
              return (
                <li key={it.label}>
                  {it.to ? (
                    <Link
                      to={it.to}
                      className={
                        'flex items-center rounded-md px-3 py-2 transition-colors border-l-2 ' +
                        (active
                          ? 'border-l-[color:var(--accent)] bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-semibold'
                          : 'border-l-transparent text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]')
                      }
                    >
                      {it.label}
                    </Link>
                  ) : (
                    <div className="px-3 py-2 text-[color:var(--text-secondary)]">{it.label}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
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
      searchPlaceholder="Search..."
    >
      <div>
        <div className="mb-10">
          <div className="text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">Getting Started</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Welcome</h1>
          <p className="text-[color:var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            Everything you need to get up and running. Use the left navigation to explore guides and core concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/docs/guides/quickstart"
            className="group rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden hover:border-[color:var(--accent)] transition-colors"
          >
            <div className="h-28 bg-[color:var(--bg-tertiary)] flex items-center justify-center">
              <BookOpen size={34} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-lg font-bold mb-2">Quick start</div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">
                Get up and running fast with setup and your first guide.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/guides/api/"
            className="group rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden hover:border-[color:var(--accent)] transition-colors"
          >
            <div className="h-28 bg-[color:var(--bg-tertiary)] flex items-center justify-center">
              <Sparkles size={34} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-lg font-bold mb-2">API</div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">Explore endpoints and authentication.</p>
            </div>
          </Link>

          <Link
            to="/docs/guides/help-center/"
            className="group rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden hover:border-[color:var(--accent)] transition-colors"
          >
            <div className="h-28 bg-[color:var(--bg-tertiary)] flex items-center justify-center">
              <Shield size={34} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-lg font-bold mb-2">Security</div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">Guidance and best practices.</p>
            </div>
          </Link>

          <Link
            to="/docs/guides"
            className="group rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] overflow-hidden hover:border-[color:var(--accent)] transition-colors"
          >
            <div className="h-28 bg-[color:var(--bg-tertiary)] flex items-center justify-center">
              <Sliders size={34} className="text-[color:var(--accent)]" />
            </div>
            <div className="p-6">
              <div className="text-lg font-bold mb-2">Guides</div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">Deep dives and how-to docs.</p>
            </div>
          </Link>
        </div>
      </div>
    </DocsShell>
  );
}
