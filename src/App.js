import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { POSTERR_IS_TESTING } from "./api/constants";
import Footer from "./components/Footer";
import PostPage from "./components/pages/PostPage";
import { UserProvider } from "./context/UserContext";
import { createFakeConfiguration } from "./utils/utils";

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
    <section className="">
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <BrowserRouter>
        <UserProvider user={user} isTestingPosterr={isTestingPosterr}>
          <Routes>
            <Route path="/:collection" element={<PostPage />} />
            <Route path="/:profile" element={<PostPage />} />
            <Route path="/:collection?/:profile?" element={<PostPage />} />
            <Route path="*" element={<PostPage />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </section>
  );
}

export default App;
