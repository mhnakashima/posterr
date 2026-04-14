import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '../Sidebar';
import { renderWithProviders } from '../../../test/test-utils';
import { DARK_CLASS_NAME, LABELS, ROUTES } from '../../../api/constants';
import { FeedCollection } from '../../../types';

describe('Sidebar', () => {
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

  it('renders navigation links', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTitle('Home')).toBeInTheDocument();
    expect(screen.getByTitle('Following')).toBeInTheDocument();
    expect(screen.getByTitle('Reposts')).toBeInTheDocument();
    expect(screen.getByTitle('Profile')).toBeInTheDocument();
  });

  it('renders theme toggle button with "Dark mode" title in light mode', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTitle(LABELS.darkMode)).toBeInTheDocument();
  });

  it('shows "Light mode" title after toggling to dark', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByTitle(LABELS.darkMode));

    expect(screen.getByTitle(LABELS.lightMode)).toBeInTheDocument();
  });

  it('toggles dark class on documentElement when theme button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);

    await user.click(screen.getByTitle(LABELS.darkMode));

    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);
  });

  it('toggles back to light when clicked twice', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByTitle(LABELS.darkMode));
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);

    await user.click(screen.getByTitle(LABELS.lightMode));
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);
  });

  it('renders correct nav link hrefs', () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTitle('Home').closest('a')).toHaveAttribute('href', ROUTES.feed(FeedCollection.All));
    expect(screen.getByTitle('Following').closest('a')).toHaveAttribute('href', ROUTES.feed(FeedCollection.Following));
    expect(screen.getByTitle('Reposts').closest('a')).toHaveAttribute('href', ROUTES.feed(FeedCollection.Reposts));
  });
});
