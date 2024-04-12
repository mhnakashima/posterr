import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { POSTERR_IS_TESTING } from "./api/constants";
import { UserProvider } from "./context/UserContext";
import { createFakeConfiguration } from "./utils/utils";
import PostPage from "./pages/PostPage";
import Footer from "./components/footer/Footer";

const App = () => {
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  const [isFakeDark, setIsFakeDark] = useState(false);
  const [isTestingPosterr] = useState(POSTERR_IS_TESTING);
  const [user, setUser] = useState(createFakeConfiguration());

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]
  );

  return (
    <main className="posterr">
      <BrowserRouter>
        <UserProvider user={user}>
          <Routes>
            <Route path="/:collection" element={<PostPage />} />
            <Route path="/:profile" element={<PostPage />} />
            <Route path="/:collection?/:profile?" element={<PostPage />} />
            <Route path="*" element={<PostPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <Footer />
    </main>
  );
}

export default App;
