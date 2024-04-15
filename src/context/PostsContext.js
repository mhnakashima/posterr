import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { POSTERR_LOCAL_STORAGE_KEY } from "../api/constants";

/*
  Context creation
*/
const UserContext = createContext();

const PostsProvider = ({ userProfile, children }) =>{
  const [posts, setPosts] = useState([{ postBody: '' }]);
  const [collection, setCollection] = useState('all');
  const [quotedPost, setQuotedPost] = useState(undefined);
  const [user, setUser] = useState(userProfile);
  const [searchQuery, setSearchQuery] = useState("");
  
  /*
    TODO = It should have a contract telling which kind of data is
    provided by API, but for development purpose it will be
    done in a future task
  */
  useEffect(() => {

    /*
      TODO = It should call a API to get all posts
    */
    let postCollection = JSON.parse(window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY))?.posts ;
    setPosts(postCollection);

  }, []);

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

  const saveData = useCallback((updatedPosts) => {
    const objectToSave = {
      ...user,
      posts: updatedPosts,
    }

    window.localStorage.setItem(POSTERR_LOCAL_STORAGE_KEY, JSON.stringify(objectToSave));
  }, [user]);

  const handleAddPost = useCallback((post) => {
    
    let updatedPosts;
    updatedPosts = [post, ...posts];
    
    setPosts(updatedPosts);
    saveData(updatedPosts);

    // Handle the saved data
  }, [quotedPost, user, posts, saveData]);

  const handeQuotedPost = (post) => {
    setQuotedPost(post);
  }

  const handleClearPosts = () => {
    setPosts([]);
  }

  const handleAddFollower = useCallback((userId, isFollowing) => {
    const updatedPosts = posts.map(post => {
      if(post.user.userId === userId){
        return { ...post, user: { ...post.user, isFollowing: !isFollowing } };
      }

      return post;
    });

    /*
      Update post
    */
    setPosts(updatedPosts);
    saveData(updatedPosts);
  }, [posts, saveData]);

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      quotedPost,
      collection,
      onAddPost: handleAddPost,
      onAddQuotedPost: handeQuotedPost,
      onClearPosts: handleClearPosts,
      onAddFollower: handleAddFollower,
      searchQuery,
      setSearchQuery,
      setCollection,
    };
  },[collection, user, quotedPost, handleAddPost, handleAddFollower, searchedPosts, searchQuery]);

  return (
    // All chidren should receive values from Post Content Provider
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

const usePosts = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the PostsProvider");
  return context;
}

export { usePosts, PostsProvider };

