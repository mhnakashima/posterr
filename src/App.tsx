import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostPage from './pages/PostPage';
import UserProfilePage from './pages/UserProfilePage';
import { createFakeConfiguration } from './utils/utils';
import { ModalProvider } from './context/ModalContext';
import { PostsProvider } from './context/PostsContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
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
                    <Route path="/profile/:userId" element={<UserProfilePage />} />
                    <Route path="/:collection" element={<PostPage />} />
                    <Route path="*" element={<PostPage />} />
                  </Routes>
                </PostsProvider>
              </UserProvider>
            )}
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
    </main>
  );
};

export default App;
