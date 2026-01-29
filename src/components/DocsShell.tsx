import type { ChangeEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Menu, Moon, Search, Sun, Twitter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/images/Logo.png';

type Breadcrumb = {
  label: string;
  to?: string;
};

type DocsShellProps = {
  breadcrumbs: Breadcrumb[];
  sidebar: ReactNode | null;
  children: ReactNode;
  rightRail?: ReactNode;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  layout?: 'default' | 'home';
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
  layout = 'default',
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
      href: '/docs/examples/',
      active: pathname.startsWith('/docs/examples'),
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
  const isHome = layout === 'home';

  return (
    <div className="min-h-screen w-full bg-[color:var(--docs-bg)] text-[color:var(--text-primary)] flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--docs-bg)]/95 backdrop-blur border-b border-[color:var(--docs-border)]">
        <div className="mx-auto w-full max-w-none px-6 lg:px-8">
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

            <Link to="/" className="flex items-center">
              <img src={logo} alt="1CNG" className="h-4 w-auto" loading="eager" />
            </Link>

            <nav className="hidden md:flex items-center gap-5">
              {topItems.map((it) => (
                <Link
                  key={it.label}
                  to={it.href}
                  className={
                    'text-[13px] font-medium transition-colors relative pb-2 -mb-2 ' +
                    (it.active ? 'text-accent-green' : 'text-[color:var(--docs-muted-2)] hover:text-[color:var(--text-primary)]')
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

      <div className="mx-auto w-full max-w-none px-6 lg:px-8 pt-8 flex-1">
        <nav className="sr-only" aria-label="Breadcrumbs">
          {breadcrumbA11y}
        </nav>

        {isHome ? (
          <main className="min-w-0">{children}</main>
        ) : (
          <>
            {sidebarOpen && sidebar && (
              <div className="lg:hidden mb-6 rounded-md border border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] p-3">
                {sidebar}
              </div>
            )}

            <div
              className={
                'grid grid-cols-1 gap-10 items-start transition-all duration-200 ' +
                (sidebarOpen
                  ? 'lg:grid-cols-[260px_minmax(0,1fr)_260px]'
                  : 'lg:grid-cols-[56px_minmax(0,1fr)_260px]')
              }
            >
              <aside className="hidden lg:block sticky top-[4.5rem] h-[calc(100vh-5.25rem)] overflow-y-auto border-r border-[color:var(--docs-border)] bg-[color:var(--docs-panel)] px-3 py-4">
                {sidebarOpen ? sidebar : <div className="h-full" />}
              </aside>

              <main className="min-w-0">
                <div className="mx-auto w-full max-w-[760px]">{children}</div>
              </main>

              <aside className="hidden lg:block sticky top-[4.5rem] h-[calc(100vh-5.25rem)]">
                {rightRail}
              </aside>
            </div>
          </>
        )}

        <div className="h-14" />
      </div>

      <footer className="border-t border-[color:var(--docs-border)] bg-[color:var(--docs-bg)]">
        <div className="mx-auto w-full max-w-none px-6 lg:px-8">
          <div className="h-12 flex items-center gap-6 text-[12px] text-[color:var(--docs-muted-2)]">
            <div className="shrink-0 flex items-center gap-2">
              <span className="font-semibold text-[color:var(--text-primary)]">1CNG</span>
              <span>© 2026</span>
            </div>

            <div className="hidden lg:flex items-center gap-5 ml-auto">
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                About
              </a>
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                Status
              </a>
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                Changelog
              </a>
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                Slack Community
              </a>
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-[color:var(--text-primary)] transition-colors">
                Examples
              </a>
              <div className="flex items-center gap-3 pl-2">
                <a href="#" aria-label="LinkedIn" className="hover:text-[color:var(--text-primary)] transition-colors">
                  <Linkedin size={14} />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-[color:var(--text-primary)] transition-colors">
                  <Twitter size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
