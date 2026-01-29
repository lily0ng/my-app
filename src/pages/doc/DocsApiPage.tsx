import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

type SideItem = { label: string; to: string };

type SideGroup = { title: string; items: SideItem[] };

export function DocsApiPage() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p);

  const groups: SideGroup[] = [
    {
      title: 'Acme API',
      items: [
        { label: 'Auth tokens', to: '/docs/guides/api/' },
        { label: 'Policies', to: '/docs/guides/api/' },
        { label: 'Audit logs', to: '/docs/guides/api/' },
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
              const active = norm(pathname) === norm(it.to);
              return (
                <li key={it.label}>
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
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  const rightRail = (
    <div className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-4">
      <div className="text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">The AuthToken object</div>
      <div className="mt-4 space-y-3 text-sm">
        {[
          { m: 'GET', c: 'bg-emerald-500/15 text-emerald-700', t: 'Get an auth token' },
          { m: 'PATCH', c: 'bg-violet-500/15 text-violet-700', t: 'Update an auth token' },
          { m: 'POST', c: 'bg-amber-500/15 text-amber-700', t: 'Regenerate an auth token' },
        ].map((x) => (
          <div key={x.m} className="flex items-start gap-3">
            <span className={'text-[11px] px-2 py-0.5 rounded border border-[color:var(--border-color)] ' + x.c}>{x.m}</span>
            <span className="text-[color:var(--text-secondary)]">{x.t}</span>
          </div>
        ))}
      </div>

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
  );

  const breadcrumbs = [{ label: 'API', to: '/docs/guides/api/' }, { label: 'API Reference' }, { label: 'Auth tokens' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      rightRail={rightRail}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchPlaceholder="Search..."
    >
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">
            <Code2 size={14} /> API Reference
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Auth tokens</h1>
          <p className="text-[color:var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            Manage the tokens used to authenticate requests. Create and rotate tokens for users and services.
          </p>
        </div>

        <div className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-6 mb-10">
          <div className="text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">The AuthToken object</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-semibold mb-2">Attributes</div>
              <ul className="text-sm text-[color:var(--text-secondary)] space-y-2">
                <li>
                  <span className="font-semibold text-[color:var(--text-primary)]">id</span> — string
                </li>
                <li>
                  <span className="font-semibold text-[color:var(--text-primary)]">createdAt</span> — timestamp
                </li>
                <li>
                  <span className="font-semibold text-[color:var(--text-primary)]">scopes</span> — string[]
                </li>
              </ul>
            </div>
            <div className="bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] rounded-lg p-4 font-mono text-sm overflow-auto">
              <pre className="text-[color:var(--text-primary)]">
{`{
  "backend": "custom",
  "object": "publishing-auth",
  "privateKey": "text",
  "fallbackURL": "https://example.com",
  "integration": "text"
}`}</pre>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Get an auth token by ID</h2>
          <p className="text-[color:var(--text-secondary)] mt-2 leading-relaxed">
            Use the endpoint below to fetch a token, then pass it as a Bearer token in the Authorization header.
          </p>
        </div>

        <div className="rounded-xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] p-5 font-mono text-sm text-[color:var(--text-secondary)]">
          <span className="inline-flex items-center gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded border border-[color:var(--border-color)] bg-emerald-500/15 text-emerald-700">GET</span>
            https://api.acme.com/v1/orgs/{`{organizationId}`}/auth/tokens/{`{tokenId}`}
          </span>
        </div>
      </div>
    </DocsShell>
  );
}
