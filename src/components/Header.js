import { usePosts } from "../context/UserContext";
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={onClearPosts}>Clear posts</button>
        </div>
      </header>
    );
  }

  export default Header;