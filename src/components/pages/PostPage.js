import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostContainer from "../../containers/PostContainer";
import { usePosts } from "../../context/UserContext";
import Header from "../Header";

function PostPage() {
  const { collection, profile } = useParams();
  const { posts, setCollection } = usePosts();
  const [ userProfile, setUserProfile ] = useState();

  useEffect(() => {
    if (collection) {
      setCollection(collection);
    }

    if (!profile) {
      return;
    }

    const userProfileData = posts.find((post => post?.user?.userId === profile))?.user;

    if(!userProfileData){
      return;
    }

    setUserProfile(userProfileData);
  }, [collection, profile]);

  return (
    <>
      <Header />
      <PostContainer />
    </>
  );
}

export default PostPage;