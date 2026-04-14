import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Theme } from '../types';
import {
  DARK_CLASS_NAME,
  PREFERS_DARK_MEDIA_QUERY,
  THEME_STORAGE_KEY,
} from '../api/constants';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === Theme.Dark || stored === Theme.Light) return stored;
  return window.matchMedia(PREFERS_DARK_MEDIA_QUERY).matches
    ? Theme.Dark
    : Theme.Light;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === Theme.Dark) {
      root.classList.add(DARK_CLASS_NAME);
    } else {
      root.classList.remove(DARK_CLASS_NAME);
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === Theme.Dark ? Theme.Light : Theme.Dark));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
