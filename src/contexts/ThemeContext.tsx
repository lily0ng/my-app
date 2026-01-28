import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  darkAccent: string;
  setDarkAccent: (accent: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'light';
  });

  const [darkAccent, setDarkAccent] = useState<string>(() => {
    const savedAccent = localStorage.getItem('darkAccent');
    if (typeof savedAccent === 'string' && savedAccent.trim().length > 0) {
      return savedAccent;
    }
    return '#3F5EBC';
  });

  const hexToRgb = (hex: string) => {
    const normalized = hex.replace('#', '').trim();
    const full = normalized.length === 3
      ? normalized.split('').map((c) => c + c).join('')
      : normalized;
    if (full.length !== 6) return null;
    const r = Number.parseInt(full.slice(0, 2), 16);
    const g = Number.parseInt(full.slice(2, 4), 16);
    const b = Number.parseInt(full.slice(4, 6), 16);
    if ([r, g, b].some((v) => Number.isNaN(v))) return null;
    return `${r}, ${g}, ${b}`;
  };

  const darkenHex = (hex: string, amount: number) => {
    const normalized = hex.replace('#', '').trim();
    const full = normalized.length === 3
      ? normalized.split('').map((c) => c + c).join('')
      : normalized;
    if (full.length !== 6) return hex;
    const clamp = (v: number) => Math.max(0, Math.min(255, v));
    const r = clamp(Number.parseInt(full.slice(0, 2), 16) - amount);
    const g = clamp(Number.parseInt(full.slice(2, 4), 16) - amount);
    const b = clamp(Number.parseInt(full.slice(4, 6), 16) - amount);
    const toHex = (v: number) => v.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('darkAccent', darkAccent);
  }, [darkAccent]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      const hover = darkenHex(darkAccent, 24);
      root.style.setProperty('--accent', darkAccent);
      root.style.setProperty('--accent-hover', hover);
      const rgb = hexToRgb(darkAccent);
      if (rgb) {
        root.style.setProperty('--accent-rgb', rgb);
      }
      return;
    }
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-hover');
    root.style.removeProperty('--accent-rgb');
  }, [theme, darkAccent]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, darkAccent, setDarkAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};