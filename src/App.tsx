import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostPage from './pages/PostPage';
import UserProfilePage from './pages/UserProfilePage';
import { createFakeConfiguration } from './utils/utils';
import { ModalProvider } from './context/ModalContext';
import { PostsProvider } from './context/PostsContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { ROUTES } from './api/constants';
import type { UserData } from './types';

const App = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    setUser(createFakeConfiguration());
  }, []);

  return (
    <main className="posterr">
      <ThemeProvider>
        <ModalProvider>
          <BrowserRouter>
            {user && (
              <UserProvider user={user}>
                <PostsProvider userProfile={user}>
                  <Routes>
                    <Route path={ROUTES.profilePattern} element={<UserProfilePage />} />
                    <Route path={ROUTES.collectionPattern} element={<PostPage />} />
                    <Route path="*" element={<PostPage />} />
                  </Routes>
                </PostsProvider>
              </UserProvider>
            )}
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
      <Analytics />
    </main>
  );
};

export default App;
