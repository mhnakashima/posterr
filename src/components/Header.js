import { usePosts } from "../context/PosterrContext";
import Results from "./Results";
import PostsSearch from "./posts/PostSearch";

function Header({ hideSearch }) {
    const { onClearPosts } = usePosts();
  
    return (
      <header>
        <h1>
          Posterr
        </h1>
        <div className={`${hideSearch ? 'displayNone' : ''}`}>
          <Results />
          <PostsSearch />
          <button onClick={onClearPosts}>Clear posts</button>
        </div>
      </header>
    );
  }

  export default Header;