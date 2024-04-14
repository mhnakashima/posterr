import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { ModalProvider } from "./components/modal/ModalContext";
import { UserProvider } from "./context/UserContext";
import PostPage from "./pages/PostPage";
import { createFakeConfiguration } from "./utils/utils";
import Modal from "./components/modal/Modal";

const App = () => {
  const [user, setUser] = useState(createFakeConfiguration());

  return (
    <main className="posterr">
      <ModalProvider>
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
      </ModalProvider>
      <Footer />
    </main >
  );
}

export default App;
