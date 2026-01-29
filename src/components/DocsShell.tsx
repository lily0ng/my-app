import type { ChangeEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const hasSearchHandler = typeof onSearchChange === 'function';

  const topItems = [
    {
      label: 'Guide',
      href: '/docs/guides/product/',
      active: pathname.startsWith('/docs/guides/product'),
    },
    {
      label: 'Examples',
      href: '/docs/guides',
      active:
        (pathname === '/docs/guides' || pathname.startsWith('/docs/guides/')) &&
        !pathname.startsWith('/docs/guides/product') &&
        !pathname.startsWith('/docs/guides/api') &&
        !pathname.startsWith('/docs/guides/help-center') &&
        !pathname.startsWith('/docs/guides/changelog'),
    },
    {
      label: 'Reference',
      href: '/docs/guides/api/',
      active: pathname.startsWith('/docs/guides/api'),
    },
    {
      label: 'Playground',
      href: '/resources',
      active: pathname.startsWith('/resources'),
    },
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!hasSearchHandler) return;
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasSearchHandler]);

  const breadcrumbA11y = breadcrumbs.map((b) => b.label).join(' / ');

  return (
    <div className="min-h-screen w-full bg-[color:var(--docs-bg)] text-[color:var(--text-primary)]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--docs-bg)]/95 backdrop-blur border-b border-[color:var(--docs-border)]">
        <div className="mx-auto w-full max-w-[1320px] px-6">
          <div className="h-12 flex items-center gap-8">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] text-[color:var(--docs-muted)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
              aria-label="Toggle navigation"
              title="Toggle navigation"
            >
              <Menu size={16} />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-4 w-4 rounded-full bg-accent-green shadow-[0_0_0_2px_rgba(0,255,136,0.18)]" />
              <span className="text-sm font-semibold tracking-tight">Modal Docs</span>
            </Link>

            <nav className="hidden md:flex items-center gap-5">
              {topItems.map((it) => (
                <Link
                  key={it.label}
                  to={it.href}
                  className={
                    'text-[13px] font-medium transition-colors relative pb-2 -mb-2 ' +
                    (it.active ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--docs-muted-2)] hover:text-[color:var(--text-primary)]')
                  }
                >
                  {it.label}
                  {it.active && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-accent-green" />}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden lg:block relative w-[280px]">
                <Search className="absolute left-3 top-2.5 text-[color:var(--docs-muted-2)]" size={16} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={searchPlaceholder ?? 'Search'}
                  value={hasSearchHandler ? searchValue ?? '' : ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange?.(e.target.value)}
                  disabled={!hasSearchHandler}
                  className="w-full bg-[color:var(--docs-input-bg)] border border-[color:var(--docs-input-border)] rounded-md py-2 pl-9 pr-14 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--docs-muted-2)] focus:outline-none focus:border-[color:var(--accent)] transition-colors disabled:opacity-60"
                />
                <div className="absolute right-2 top-2 inline-flex items-center rounded border border-[color:var(--docs-border)] bg-[color:var(--docs-panel-2)] px-1.5 text-[11px] text-[color:var(--docs-muted-2)]">
                  ⌘ K
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] text-[color:var(--docs-muted)] hover:bg-[color:var(--docs-panel-2)] transition-colors"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <Link to="/login" className="hidden sm:block text-sm font-medium text-[color:var(--docs-muted)] hover:text-[color:var(--text-primary)] transition-colors">
                Log in
              </Link>
              <Link
                to="/signup"
                className="hidden sm:inline-flex items-center rounded-md bg-accent-green px-3 py-1.5 text-sm font-semibold text-black hover:bg-[#00cc6a] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="h-12" />

      <div className="mx-auto w-full max-w-[1320px] px-6 pt-8">
        <nav className="sr-only" aria-label="Breadcrumbs">
          {breadcrumbA11y}
        </nav>

        {sidebarOpen && (
          <div className="lg:hidden mb-6 rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-3">
            {sidebar}
          </div>
        )}

        <div
          className={
            'grid grid-cols-1 gap-10 items-start transition-all duration-200 ' +
            (sidebarOpen
              ? 'lg:grid-cols-[320px_minmax(0,780px)_260px]'
              : 'lg:grid-cols-[56px_minmax(0,780px)_260px]')
          }
        >
          <aside className="hidden lg:block sticky top-[4.5rem] h-[calc(100vh-5.25rem)] overflow-y-auto border-r border-[color:var(--docs-border)] pr-6">
            {sidebarOpen ? sidebar : <div className="h-full" />}
          </aside>

          <main className="min-w-0">{children}</main>

          <aside className="hidden lg:block sticky top-[4.5rem] h-[calc(100vh-5.25rem)]">
            {rightRail}
          </aside>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
