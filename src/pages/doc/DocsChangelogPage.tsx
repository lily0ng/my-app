import { useState } from 'react';
import { DocsShell } from '../../components/DocsShell';

export function DocsChangelogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const sidebar = (
    <div className="pr-2">
      <div className="pt-2 pb-6">
        <div className="text-lg font-semibold text-[color:var(--text-primary)] truncate">Changelog</div>
      </div>

      <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-3">Changelog</div>
      <div className="space-y-2">
        <div className="rounded-md bg-[color:var(--docs-panel-2)] px-3 py-2 text-[14px] text-[color:var(--text-primary)] font-semibold">Latest</div>
        <div className="rounded-md px-3 py-2 text-[14px] text-[color:var(--docs-muted)] hover:bg-[color:var(--docs-panel-2)] hover:text-[color:var(--text-primary)] transition-colors">2025</div>
        <div className="rounded-md px-3 py-2 text-[14px] text-[color:var(--docs-muted)] hover:bg-[color:var(--docs-panel-2)] hover:text-[color:var(--text-primary)] transition-colors">2024</div>
      </div>
    </div>
  );

  const breadcrumbs = [{ label: 'Changelog', to: '/docs/guides/changelog/' }];

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
          <div className="text-xs font-semibold text-[color:var(--docs-muted-2)] uppercase tracking-wider">Changelog</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[color:var(--text-primary)]">Product updates</h1>
          <p className="text-[color:var(--docs-muted)] mt-3 max-w-2xl leading-relaxed">
            A running list of improvements, fixes, and new features.
          </p>
        </div>

        <div className="space-y-10">
          {[
            {
              date: 'December 10, 2025',
              title: 'A refresh for Console, improved navigation, and more',
              body: 'We updated the Console to make cluster operations clearer, improved navigation, and shipped a batch of reliability fixes.',
            },
            {
              date: 'October 24, 2025',
              title: 'More helpful operator experience',
              body: 'Refinements across the UI to give critical information more breathing room—especially when monitoring nodes, workloads, and health.',
            },
          ].map((e) => (
            <div key={e.date} className="max-w-2xl">
              <div className="text-xs text-[color:var(--docs-muted-2)]">{e.date}</div>
              <h2 className="text-2xl font-bold mt-2 text-[color:var(--text-primary)]">{e.title}</h2>
              <p className="text-[color:var(--docs-muted)] mt-3 leading-relaxed">{e.body}</p>
              <div className="mt-6 h-px bg-[color:var(--docs-border)]" />
            </div>
          ))}
        </div>
      </div>
    </DocsShell>
  );
}
