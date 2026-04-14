import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '../Sidebar';
import { renderWithProviders } from '../../../test/test-utils';

describe('Sidebar', () => {
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

  it('renders navigation links', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTitle('Home')).toBeInTheDocument();
    expect(screen.getByTitle('Following')).toBeInTheDocument();
    expect(screen.getByTitle('Reposts')).toBeInTheDocument();
    expect(screen.getByTitle('Profile')).toBeInTheDocument();
  });

  it('renders theme toggle button with "Dark mode" title in light mode', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTitle('Dark mode')).toBeInTheDocument();
  });

  it('shows "Light mode" title after toggling to dark', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByTitle('Dark mode'));

    expect(screen.getByTitle('Light mode')).toBeInTheDocument();
  });

  it('toggles dark class on documentElement when theme button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(screen.getByTitle('Dark mode'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light when clicked twice', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByTitle('Dark mode'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByTitle('Light mode'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('renders correct nav link hrefs', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTitle('Home').closest('a')).toHaveAttribute('href', '/all');
    expect(screen.getByTitle('Following').closest('a')).toHaveAttribute('href', '/following');
    expect(screen.getByTitle('Reposts').closest('a')).toHaveAttribute('href', '/reposts');
  });
});
