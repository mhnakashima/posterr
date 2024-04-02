import { faker } from "@faker-js/faker";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

/*
  Context creation
*/
const PostContext = createContext();

function PostProvider({ children, isTestingPosterr }) {
  const [posts, setPosts] = useState([{body: '', firstName: 'User', lastName: 'Sicrano', userId: ''}]);
  /*
    () =>
      Array.from({ length: 30 }, () => createRandomPost())
    );
  */

  /*
    TODO = isTestingPosterr
    isTestingPosterr is a function that will create fake data 
    till the api is read.

    It should have a contract telling which kind of data is
    provided by API, but for development purpose it will be
    done in a future task
  */
  useEffect(() => {
    // loads user data entry from API or LocalStorage
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  function handleSelectAll(){

  }

  function handleSelectFollowing(){

  }

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onSelectAllPosts: handleSelectAll,
      onSelectFollowing: handleSelectFollowing,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return (
    // All chidren should receive values from Post Content Provider
    <PostContext.Provider value={value}>{children}</PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
