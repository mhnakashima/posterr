import { usePosts } from "../context/UserContext";
import Results from "./Results";
import PostsSearch from "./posts/PostSearch";

function Header({ hideSearch }) {
    return (
      <header>
        <h1>
          Posterr
        </h1>
      </header>
    );
  }

  export default Header;