import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import PostPage from "./components/pages/PostPage";
import { PostProvider } from "./context/PosterrContext";

function App() {
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <PostPage />
        <Footer />
      </PostProvider>
    </section>
  );
}

export default App;
