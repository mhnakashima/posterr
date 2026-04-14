import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { PostsProvider } from '../context/PostsContext';
import { UserProvider } from '../context/UserContext';
import { ModalProvider } from '../context/ModalContext';
import type { UserData } from '../types';
import type { ReactElement, ReactNode } from 'react';

const mockUser: UserData = {
  userId: 'test-user-1',
  firstName: 'Test',
  lastName: 'User',
  userName: '@TestUser',
  isFollower: false,
  isFollowing: false,
  numOfFollowers: 5,
  numOfFollowing: 3,
  posts: [],
};

interface WrapperOptions {
  initialRoute?: string;
  user?: UserData;
}

const createWrapper = ({ initialRoute = '/all', user = mockUser }: WrapperOptions = {}) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <ModalProvider>
          <UserProvider user={user}>
            <PostsProvider userProfile={user}>{children}</PostsProvider>
          </UserProvider>
        </ModalProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

const renderWithProviders = (
  ui: ReactElement,
  options?: WrapperOptions & Omit<RenderOptions, 'wrapper'>,
) => {
  const { initialRoute, user, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ initialRoute, user }),
    ...renderOptions,
  });
};

export { renderWithProviders, mockUser };
