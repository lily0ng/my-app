import { useState } from 'react';
import { DocsShell } from '../../components/DocsShell';

type SideGroup = { title: string; items: { label: string }[] };

export function CreateGuidePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  const groups: SideGroup[] = [
    { title: 'Guides', items: [{ label: 'Create a guide' }, { label: 'Structure' }, { label: 'Frontmatter' }] },
  ];

  const sidebar = (
    <div className="pr-2">
      <div className="pt-1 pb-4">
        <div className="text-[13px] font-semibold text-[color:var(--text-primary)] truncate">Guide</div>
      </div>

      <div className="space-y-6 pb-6">
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-[12px] font-semibold text-[color:var(--text-primary)] mb-2">{g.title}</h4>
            <ul className="space-y-0.5">
              {g.items.map((it) => (
                <li key={it.label}>
                  <div className="block w-full rounded-sm pr-3 py-2 leading-tight transition-colors pl-3 text-[13px] text-[color:var(--docs-muted)]">
                    {it.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const breadcrumbs = [{ label: 'Guide' }, { label: 'Create a guide' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--text-primary)]">Create a guide</h1>
        <p className="mt-4 text-[color:var(--docs-muted)] leading-relaxed max-w-2xl">
          Write guides as Markdown files and place them in <span className="text-[color:var(--text-primary)]">src/POST/guides</span>.
        </p>

        <div className="mt-8 rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-6">
          <div className="text-sm font-semibold text-[color:var(--text-primary)]">Frontmatter</div>
          <pre className="mt-3 text-sm overflow-auto rounded-lg border border-[color:var(--docs-border)] bg-[color:var(--docs-code-bg)] p-4 text-[color:var(--docs-muted)]">
{`---
title: Welcome
section: Introduction
order: 1
indent: false
---

# Welcome
`}</pre>
        </div>
      </div>
    </DocsShell>
  );
}
