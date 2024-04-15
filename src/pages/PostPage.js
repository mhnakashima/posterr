import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Modal from "../components/modal/Modal";
import PostAdd from "../components/posts/post/PostAdd";
import UserProfileInfo from "../components/user/Profile";
import { usePosts } from "../context/PostsContext";
import PostContainer from "../features/PostContainer";

const PostPage = () => {
  const { collection, profile } = useParams();
  const { profileInfo, posts, quotedPost, setCollection } = usePosts();
  const [userQuotedPost, setUserQuotedPost] = useState();

  useEffect(() => {
    if (collection) {
      setCollection(collection);
    }

    /*
      Open modal from quoted post
    */
    if (quotedPost) {
      /*
        I must setProfile to undefined
        It should be refactored, to open a modal
        is necessary only if it's open, the content and close behaviour
      */
      setUserQuotedPost(quotedPost);
    } else {
      setUserQuotedPost();
    }

  }, [posts, userQuotedPost, quotedPost, collection, profile, profileInfo, setCollection]);

  return (

    <div className="page w-full h-full">
      <Header />

      <main className="page--container border-l border-r border-gray-200 mx-auto h-full w-full">
        <section className="flex flex-wrap justify-center w-full flex gap-12">
          <div className="w-full">
            <UserProfileInfo />
            <hr className="block border-t border-gray-200 my-1" />
            <PostAdd />
            <PostContainer />
          </div>
        </section>
      </main>

      <Modal />
    </div>

  );
}

export default PostPage;