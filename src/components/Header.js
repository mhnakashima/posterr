import { usePosts } from "../context/PosterrContext";
import Results from "./Results";
import PostsSearch from "./PostSearch";

function Header() {
    const { onClearPosts } = usePosts();
  
    return (
      <header>
        <h1>
          Posterr
        </h1>
        <div>
          <Results />
          <PostsSearch />
          <button onClick={onClearPosts}>Clear posts</button>
        </div>
      </header>
    );
  }

  export default Header;