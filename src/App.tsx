import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createFakeConfiguration } from './utils/utils';
import { ModalProvider } from './context/ModalContext';
import { PostsProvider } from './context/PostsContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ROUTES } from './api/constants';
import type { UserData } from './types';

const PostPage = lazy(() => import('./pages/PostPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));

const PageFallback = () => (
  <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    createFakeConfiguration().then(setUser);
  }, []);

  return (
    <main className="posterr">
      <ThemeProvider>
        <ModalProvider>
          <BrowserRouter>
            {user && (
              <UserProvider user={user}>
                <PostsProvider userProfile={user}>
                  <Suspense fallback={<PageFallback />}>
                    <Routes>
                      <Route path={ROUTES.profilePattern} element={<UserProfilePage />} />
                      <Route path={ROUTES.collectionPattern} element={<PostPage />} />
                      <Route path="*" element={<PostPage />} />
                    </Routes>
                  </Suspense>
                </PostsProvider>
              </UserProvider>
            )}
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </main>
  );
};

export default App;
