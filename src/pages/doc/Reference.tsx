import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, Copy } from 'lucide-react';
import { DocsShell } from '../../components/DocsShell';

type SideItem = { label: string; to: string };

type SideGroup = { title: string; items: SideItem[] };

export function ReferencePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const groups: SideGroup[] = [
    {
      title: 'Changelog',
      items: [{ label: 'API reference', to: '/docs/guides/api/' }],
    },
    {
      title: 'API reference',
      items: [
        { label: 'modal.App', to: '/docs/guides/api/' },
        { label: 'modal.Client', to: '/docs/guides/api/' },
        { label: 'modal.CloudBucketMount', to: '/docs/guides/api/' },
        { label: 'modal.Cls', to: '/docs/guides/api/' },
        { label: 'modal.Cron', to: '/docs/guides/api/' },
        { label: 'modal.Dict', to: '/docs/guides/api/' },
        { label: 'modal.Error', to: '/docs/guides/api/' },
        { label: 'modal.FilePatternMatcher', to: '/docs/guides/api/' },
        { label: 'modal.Function', to: '/docs/guides/api/' },
        { label: 'modal.FunctionCall', to: '/docs/guides/api/' },
        { label: 'modal.Image', to: '/docs/guides/api/' },
        { label: 'modal.NetworkFileSystem', to: '/docs/guides/api/' },
        { label: 'modal.Period', to: '/docs/guides/api/' },
        { label: 'modal.Proxy', to: '/docs/guides/api/' },
        { label: 'modal.Queue', to: '/docs/guides/api/' },
        { label: 'modal.Retries', to: '/docs/guides/api/' },
        { label: 'modal.Sandbox', to: '/docs/guides/api/' },
        { label: 'modal.SandboxSnapshot', to: '/docs/guides/api/' },
        { label: 'modal.Secret', to: '/docs/guides/api/' },
        { label: 'modal.Server', to: '/docs/guides/api/' },
        { label: 'modal.Tunnel', to: '/docs/guides/api/' },
        { label: 'modal.Volume', to: '/docs/guides/api/' },
      ],
    },
  ];

  const sidebar = (
    <div className="pr-2">
      <div className="pt-1 pb-4">
        <div className="text-[13px] font-semibold text-[color:var(--text-primary)] truncate">Reference</div>
      </div>

      <div className="space-y-7 pb-6">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="text-[11px] font-bold text-[color:var(--docs-muted-2)] uppercase tracking-wider mb-3">
            {g.title}
          </div>
          <ul className="space-y-0.5">
            {g.items.map((it) => {
              const active = g.title === 'API reference' && it.label === 'modal.App';
              return (
                <li key={it.label}>
                  <Link
                    to={it.to}
                    className={
                      'block w-full rounded-sm px-3 py-2 text-[12px] font-mono leading-tight transition-colors ' +
                      (active
                        ? 'bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)]'
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

  const sections = [
    'Application construction',
    'Serverless execution',
    'Extended Function configuration',
    'Class parametrization',
    'Lifecycle hooks',
    'Web integrations',
    'Function semantics',
    'Scheduling',
    'Exception handling',
    'Sandbox execution',
    'Container configuration',
    'Data primitives',
    'Persistent storage',
    'In-memory storage',
    'Networking',
  ];

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const rightRail = (
    <div className="rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-3">
      <div className="text-[11px] font-semibold text-[color:var(--docs-muted)] uppercase tracking-wider">API Reference</div>
      <div className="mt-3 space-y-2">
        {sections.map((t) => (
          <a
            key={t}
            href={`#${slugify(t)}`}
            className="block text-[12px] text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors"
          >
            {t}
          </a>
        ))}
      </div>
    </div>
  );

  const breadcrumbs = [{ label: 'Reference', to: '/docs/guides/api/' }, { label: 'API Reference' }];

  return (
    <DocsShell
      breadcrumbs={breadcrumbs}
      sidebar={sidebar}
      rightRail={rightRail}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
    >
      <div>
        <div className="mb-10">
          <div className="mt-2 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--text-primary)]">API Reference</h1>
              <p className="text-[color:var(--docs-muted)] mt-3 max-w-2xl leading-relaxed">
                This is the API reference for the <span className="px-1 rounded bg-[color:var(--docs-panel-2)] text-[color:var(--text-primary)]">modal</span> Python package.
              </p>
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                } catch {}
              }}
              className="shrink-0 inline-flex items-center gap-2 rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] px-3 py-2 text-[12px] font-semibold text-[color:var(--text-primary)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
            >
              {copied ? <Check size={14} className="text-[color:var(--accent)]" /> : <Copy size={14} className="text-[color:var(--docs-muted)]" />}
              Copy page
              <ChevronDown size={14} className="text-[color:var(--docs-muted-2)]" />
            </button>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 id="application-construction" className="text-2xl font-semibold text-[color:var(--text-primary)]">Application construction</h2>
            <div className="mt-4 rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden">
              <div className="grid grid-cols-2 border-b border-[color:var(--docs-border)]">
                <div className="px-4 py-3 text-[12px] text-[color:var(--docs-muted-2)]">Name</div>
                <div className="px-4 py-3 text-[12px] text-[color:var(--docs-muted-2)]">Description</div>
              </div>
              {[
                { k: 'App', v: 'The main unit of deployment for code on Modal.' },
                { k: 'App.function', v: 'Decorator for registering a function with an App.' },
                { k: 'App.cls', v: 'Decorator for registering a class with an App.' },
              ].map((r) => (
                <div key={r.k} className="grid grid-cols-2 border-b last:border-b-0 border-[color:var(--docs-border)]">
                  <div className="px-4 py-3">
                    <span className="inline-flex rounded bg-[color:var(--docs-panel-2)] px-2 py-1 text-[11px] font-mono text-accent-green">
                      {r.k}
                    </span>
                  </div>
                  <div className="px-4 py-3 text-[13px] leading-relaxed text-[color:var(--docs-muted)]">{r.v}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 id="serverless-execution" className="text-2xl font-semibold text-[color:var(--text-primary)]">Serverless execution</h2>
            <div className="mt-4 rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] overflow-hidden">
              <div className="grid grid-cols-2 border-b border-[color:var(--docs-border)]">
                <div className="px-4 py-3 text-[12px] text-[color:var(--docs-muted-2)]">Name</div>
                <div className="px-4 py-3 text-[12px] text-[color:var(--docs-muted-2)]">Description</div>
              </div>
              {[
                { k: 'Function', v: 'A serverless function backed by an autoscaling container pool.' },
                { k: 'Cls', v: 'A serverless class supporting parametrization and lifecycle hooks.' },
              ].map((r) => (
                <div key={r.k} className="grid grid-cols-2 border-b last:border-b-0 border-[color:var(--docs-border)]">
                  <div className="px-4 py-3">
                    <span className="inline-flex rounded bg-[color:var(--docs-panel-2)] px-2 py-1 text-[11px] font-mono text-accent-green">
                      {r.k}
                    </span>
                  </div>
                  <div className="px-4 py-3 text-sm text-[color:var(--docs-muted)]">{r.v}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 id="extended-function-configuration" className="text-2xl font-semibold text-[color:var(--text-primary)]">Extended Function configuration</h2>
            <div className="mt-4 rounded-xl border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-4 text-sm text-[color:var(--docs-muted)]">
              Configure mounts, secrets, retries, timeouts, and resource requirements.
            </div>
          </section>
        </div>
      </div>
    </DocsShell>
  );
}
