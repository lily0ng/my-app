import { useMemo, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function DarkThemeAccentPalette() {
  const { theme, darkAccent, setDarkAccent } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const colors = useMemo(
    () => [
      '#7F84B3',
      '#6A83DF',
      '#3F5EBC',
      '#4D5B92',
      '#283E80',
      '#3A2D86',
      '#1C1549',
    ],
    [],
  );

  if (theme !== 'dark') return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-full px-3 py-2 flex items-center justify-between gap-3 text-sm font-medium text-[var(--text-primary)]"
          aria-label="Toggle dark theme palette"
        >
          <span>Theme color</span>
          <span className="text-[var(--text-tertiary)]">{isOpen ? 'Hide' : 'Show'}</span>
        </button>
        {isOpen && (
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2">
              {colors.map((c) => {
                const isActive = c.toLowerCase() === darkAccent.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Set theme color ${c}`}
                    onClick={() => setDarkAccent(c)}
                    className={`h-6 w-6 rounded-full border transition-transform ${
                      isActive
                        ? 'border-white/60 ring-2 ring-white/50 scale-105'
                        : 'border-white/15 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
