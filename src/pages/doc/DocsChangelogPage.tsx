import { useState } from 'react';
import { DocsShell } from '../../components/DocsShell';

export function DocsChangelogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebar = (
    <div className="text-sm text-[color:var(--text-secondary)] pr-2">
      <div className="text-[11px] font-bold text-[color:var(--text-tertiary)] uppercase tracking-wider mb-2">Changelog</div>
      <div className="space-y-2">
        <div className="border-l-2 border-l-[color:var(--accent)] pl-3 py-1 text-[color:var(--text-primary)] font-semibold">Latest</div>
        <div className="pl-3 py-1">2025</div>
        <div className="pl-3 py-1">2024</div>
      </div>
    </div>
  );

  const breadcrumbs = [{ label: 'Changelog', to: '/docs/changelog' }];

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
          <div className="text-xs font-semibold text-[color:var(--text-tertiary)] uppercase tracking-wider">Changelog</div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Product updates</h1>
          <p className="text-[color:var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
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
              <div className="text-xs text-[color:var(--text-tertiary)]">{e.date}</div>
              <h2 className="text-2xl font-bold mt-2">{e.title}</h2>
              <p className="text-[color:var(--text-secondary)] mt-3 leading-relaxed">{e.body}</p>
              <div className="mt-6 h-px bg-[color:var(--border-color)]" />
            </div>
          ))}
        </div>
      </div>
    </DocsShell>
  );
}
