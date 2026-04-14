import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { Theme } from '../../types';
import {
  DARK_CLASS_NAME,
  PREFERS_DARK_MEDIA_QUERY,
  THEME_STORAGE_KEY,
} from '../../api/constants';

const ThemeConsumer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove(DARK_CLASS_NAME);
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('defaults to light when OS prefers light and nothing stored', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Light);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);
  });

  it('defaults to dark when OS prefers dark and nothing stored', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === PREFERS_DARK_MEDIA_QUERY,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Dark);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);
  });

  it('reads stored "dark" from localStorage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, Theme.Dark);

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Dark);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);
  });

  it('reads stored "light" from localStorage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, Theme.Light);

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Light);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);
  });

  it('ignores invalid localStorage values and falls back to OS preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'invalid');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Light);
  });

  it('toggles from light to dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Light);

    await user.click(screen.getByRole('button', { name: /toggle/i }));

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Dark);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.Dark);
  });

  it('toggles from dark to light', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, Theme.Dark);
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Dark);

    await user.click(screen.getByRole('button', { name: /toggle/i }));

    expect(screen.getByTestId('theme-value').textContent).toBe(Theme.Light);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.Light);
  });

  it('persists theme across multiple toggles', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.Dark);

    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.Light);

    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.Dark);
  });

  it('throws when useTheme is used outside ThemeProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within ThemeProvider',
    );

    consoleError.mockRestore();
  });
});
