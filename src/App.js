import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import PostPage from "./pages/PostPage";
import { createFakeConfiguration } from "./utils/utils";
import { ModalProvider } from "./context/ModalContext";
import { PostsProvider } from "./context/PostsContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  /*
    TODO: it should call an API to get the posts
    and the user profile configuration
  */
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    /*
      API call
    */
    setUser(createFakeConfiguration());
  }, []);


  return (
    <main className="posterr">
      <ModalProvider>
        <BrowserRouter>
          {user && (
            <UserProvider user={user}>
              <PostsProvider userProfile={user} >
                <Routes>
                  <Route path="/:collection" element={<PostPage />} />
                  <Route path="/:profile" element={<PostPage />} />
                  <Route path="/:collection?/:profile?" element={<PostPage />} />
                  <Route path="*" element={<PostPage />} />
                </Routes>
              </PostsProvider>
            </UserProvider>
          )}
        </BrowserRouter>
      </ModalProvider>
      <Footer />
    </main >
  );
}

export default App;
