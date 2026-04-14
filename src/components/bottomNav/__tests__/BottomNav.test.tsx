import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BottomNav from '../BottomNav';
import { renderWithProviders, mockUser } from '../../../test/test-utils';
import { DARK_CLASS_NAME, ROUTES, THEME_STORAGE_KEY } from '../../../api/constants';
import { FeedCollection, Theme } from '../../../types';

describe('BottomNav', () => {
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

    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);

    const themeButton = screen.getByText('Theme').closest('button')!;
    await user.click(themeButton);

    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);
  });

  it('toggles back to light on second click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BottomNav />);

    const themeButton = screen.getByText('Theme').closest('button')!;

    await user.click(themeButton);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(true);

    await user.click(themeButton);
    expect(document.documentElement.classList.contains(DARK_CLASS_NAME)).toBe(false);
  });

  it('persists theme preference to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BottomNav />);

    const themeButton = screen.getByText('Theme').closest('button')!;
    await user.click(themeButton);

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.Dark);
  });

  it('renders correct nav link hrefs', () => {
    renderWithProviders(<BottomNav />);

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', ROUTES.feed(FeedCollection.All));
    expect(screen.getByText('Following').closest('a')).toHaveAttribute('href', ROUTES.feed(FeedCollection.Following));
    expect(screen.getByText('Reposts').closest('a')).toHaveAttribute('href', ROUTES.feed(FeedCollection.Reposts));
  });

  it('renders Profile link with user ID', () => {
    renderWithProviders(<BottomNav />);

    expect(screen.getByText('Profile').closest('a')).toHaveAttribute(
      'href',
      ROUTES.profile(mockUser.userId),
    );
  });
});
