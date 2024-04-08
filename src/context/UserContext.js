import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';

/*
  Context creation
*/
const UserContext = createContext();

function UserProvider({ user, children, isTestingPosterr }) {
  const [posts, setPosts] = useState([{ postBody: '' }]);
  const [collection, setCollection] = useState('all');
  
  /*
    TODO = isTestingPosterr
    isTestingPosterr is a function that will create fake data 
    till the api is read.

    It should have a contract telling which kind of data is
    provided by API, but for development purpose it will be
    done in a future task
  */
  useEffect(() => {
    let postCollection;

    if (collection !== "following") {
      postCollection = user?.posts;
    } else {
      postCollection = user?.posts.filter(post => post.user?.isFollowing);
    }

    if (!user) {
      return;
    }

    setPosts(postCollection);

    /*
      TODO = In a real scenario we must use a API call
      for now, we are going to use a fake configuration
    */
  }, [isTestingPosterr, collection]);

  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  let searchedPosts;

  if (posts) {
    searchedPosts = searchQuery.length > 0
      ? posts.filter((post) =>
        `${post.postBody}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      : posts;
  }

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
      setCollection,
    };
  }, [searchedPosts, searchQuery]);

  return (
    // All chidren should receive values from Post Content Provider
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

function usePosts() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the UserProvider");
  return context;
}

export { usePosts, UserProvider };

