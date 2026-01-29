import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LifeBuoy, ShieldQuestion, Wrench } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

type SideGroup = { title: string; items: { label: string; to: string }[] };

export function DocsHelpCenterPage() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p);

  const groups: SideGroup[] = [
    {
      title: 'Help Center',
      items: [
        { label: 'Overview', to: '/docs/guides/help-center/' },
        { label: 'Troubleshooting', to: '/docs/guides/help-center/' },
        { label: 'Account & billing', to: '/docs/guides/help-center/' },
      ],
    },
  ];

  const sidebar = (
    <div className="pr-2">
      <div className="pt-2 pb-6">
        <div className="text-lg font-semibold text-[color:var(--text-primary)] truncate">Help Center</div>
      </div>

      <div className="space-y-7 pb-6">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-3">
            {g.title}
          </div>
          <ul className="space-y-2">
            {g.items.map((it) => {
              const active = norm(pathname) === norm(it.to);
              return (
                <li key={it.label}>
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
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );

  const breadcrumbs = [{ label: 'Help Center', to: '/docs/guides/help-center/' }, { label: 'Overview' }];

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
          <div className="text-xs font-semibold text-[color:var(--docs-muted-2)] uppercase tracking-wider">Help Center</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">How can we help?</h1>
          <p className="text-[color:var(--docs-muted)] mt-3 max-w-2xl leading-relaxed">
            Find answers, troubleshoot issues, and learn best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{
            title: 'Troubleshooting',
            desc: 'Common issues and fixes for setup, build, and deployment.',
            icon: Wrench,
          },
          {
            title: 'Security',
            desc: 'Guidance on tokens, permissions, and safe defaults.',
            icon: ShieldQuestion,
          }].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6"
            >
              <card.icon size={28} className="text-[color:var(--accent)]" />
              <div className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">{card.title}</div>
              <p className="text-sm text-[color:var(--docs-muted)] mt-2 leading-relaxed">{card.desc}</p>
            </div>
          ))}

          <div className="rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6">
            <LifeBuoy size={28} className="text-[color:var(--accent)]" />
            <div className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">Contact support</div>
            <p className="text-sm text-[color:var(--docs-muted)] mt-2 leading-relaxed">
              Need a hand? Use the Contact page to reach the team.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex text-sm font-semibold text-[color:var(--accent)] hover:underline"
            >
              Go to Contact
            </Link>
          </div>
        </div>
      </div>
    </DocsShell>
  );
}
