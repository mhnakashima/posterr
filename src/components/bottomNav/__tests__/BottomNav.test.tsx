import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BottomNav from '../BottomNav';
import { renderWithProviders } from '../../../test/test-utils';

describe('BottomNav', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
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

  it('renders all navigation items', () => {
    renderWithProviders(<BottomNav />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Following')).toBeInTheDocument();
    expect(screen.getByText('Reposts')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderWithProviders(<BottomNav />);

    const themeButton = screen.getByText('Theme').closest('button');
    expect(themeButton).toBeInTheDocument();
  });

  it('toggles theme when Theme button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BottomNav />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const themeButton = screen.getByText('Theme').closest('button')!;
    await user.click(themeButton);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light on second click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BottomNav />);

    const themeButton = screen.getByText('Theme').closest('button')!;

    await user.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme preference to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BottomNav />);

    const themeButton = screen.getByText('Theme').closest('button')!;
    await user.click(themeButton);

    expect(localStorage.getItem('posterr-theme')).toBe('dark');
  });

  it('renders correct nav link hrefs', () => {
    renderWithProviders(<BottomNav />);

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/all');
    expect(screen.getByText('Following').closest('a')).toHaveAttribute('href', '/following');
    expect(screen.getByText('Reposts').closest('a')).toHaveAttribute('href', '/reposts');
  });

  it('renders Profile link with user ID', () => {
    renderWithProviders(<BottomNav />);

    expect(screen.getByText('Profile').closest('a')).toHaveAttribute(
      'href',
      '/profile/test-user-1',
    );
  });
});
