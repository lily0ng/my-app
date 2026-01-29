import type { ChangeEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import logo from '../assets/images/Logo.png';

type Breadcrumb = {
  label: string;
  to?: string;
};

type DocsShellProps = {
  breadcrumbs: Breadcrumb[];
  sidebar: ReactNode;
  children: ReactNode;
  rightRail?: ReactNode;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
};

export function DocsShell({
  breadcrumbs,
  sidebar,
  children,
  rightRail,
  sidebarOpen,
  onToggleSidebar,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: DocsShellProps) {
  const { pathname } = useLocation();

  const hasSearchHandler = typeof onSearchChange === 'function';

  const topItems = [
    { label: 'Product', href: '/docs/product', active: pathname.startsWith('/docs/product') || pathname.startsWith('/docs/guides') },
    { label: 'API', href: '/docs/api', active: pathname.startsWith('/docs/api') },
    { label: 'Help Center', href: '/docs/help-center', active: pathname.startsWith('/docs/help-center') },
    { label: 'Changelog', href: '/docs/changelog', active: pathname.startsWith('/docs/changelog') },
  ];

  return (
    <div className="min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--bg-primary)] border-b border-[color:var(--border-color)]">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="h-14 flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-7 w-auto" loading="eager" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {topItems.map((it) => (
                <Link
                  key={it.label}
                  to={it.href}
                  className={
                    'text-sm font-medium transition-colors relative pb-4 -mb-4 ' +
                    (it.active
                      ? 'text-[color:var(--text-primary)]'
                      : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]')
                  }
                >
                  {it.label}
                  {it.active && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[color:var(--accent)]" />}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden lg:block relative w-[420px]">
                <Search className="absolute left-3 top-2.5 text-[color:var(--text-tertiary)]" size={16} />
                <input
                  type="text"
                  placeholder={searchPlaceholder ?? 'Search...'}
                  {...(hasSearchHandler
                    ? {
                        value: searchValue ?? '',
                        onChange: (e: ChangeEvent<HTMLInputElement>) => onSearchChange?.(e.target.value),
                      }
                    : {})}
                  className="w-full bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-lg py-2 pl-9 pr-16 text-sm text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-[color:var(--bg-tertiary)] border border-[color:var(--border-color)] text-[color:var(--text-tertiary)]">
                  Ctrl
                  <span className="px-1 rounded bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)]">K</span>
                </div>
              </div>

              <button
                type="button"
                className="hidden md:inline-flex items-center justify-center rounded-lg border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-2 text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent)] transition-colors"
              >
                Ask
              </button>

              <Link
                to="/login"
                className="text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-14 z-40 bg-[color:var(--bg-primary)] border-b border-[color:var(--border-color)]">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="h-11 flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="hidden lg:inline-flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent)] transition-colors"
            >
              {sidebarOpen ? 'Hide' : 'Show'}
            </button>

            <div className="flex items-center gap-2 text-xs text-[color:var(--text-tertiary)] overflow-hidden whitespace-nowrap">
              {breadcrumbs.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 min-w-0">
                  {idx > 0 && <span className="text-[color:var(--text-tertiary)]">/</span>}
                  {b.to ? (
                    <Link to={b.to} className="hover:text-[color:var(--text-primary)] transition-colors truncate">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-[color:var(--text-primary)] truncate">{b.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 pt-6">
        <div
          className={
            'grid grid-cols-1 gap-10 items-start ' +
            (sidebarOpen
              ? 'lg:grid-cols-[280px_minmax(0,760px)_240px]'
              : 'lg:grid-cols-[minmax(0,760px)_240px]')
          }
        >
          {sidebarOpen && (
            <aside className="hidden lg:block sticky top-[7.75rem] h-[calc(100vh-8.25rem)] overflow-y-auto border-r border-[color:var(--border-color)] pr-6">
              {sidebar}
            </aside>
          )}

          <main className="min-w-0">{children}</main>

          <aside className="hidden lg:block sticky top-[7.75rem] h-[calc(100vh-8.25rem)]">
            {rightRail}
          </aside>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
