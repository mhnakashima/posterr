import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostContainer from "../containers/PostContainer";
import { usePosts } from "../context/UserContext";
import PostToogle from "../components/posts/PostToogle";
import UserProfile from "../components/user/UserProfile";
import UserProfileInfo from "../components/user/UserProfileInfo";
import PostQuote from "../components/posts/PostQuote";
import Header from "../components/header/Header";
import Modal from "../components/modal/Modal";
import PostAdd from "../components/posts/PostAdd";
import { ModalProvider } from "../components/modal/ModalContext";

const PostPage = () => {
  const { collection, profile } = useParams();
  const { profileInfo, posts, quotedPost, setCollection } = usePosts();
  const [userProfile, setUserProfile] = useState();
  const [userQuotedPost, setUserQuotedPost] = useState();

  useEffect(() => {
    if (collection) {
      setCollection(collection);
    }

    /*
      Open modal from profile
    */
    if (profile) {
      const userProfileData = posts.find((post => post?.user?.userId === profile))?.user;

      if (userProfileData || userProfileData?.userId === profileInfo?.userId) {
        setUserProfile(userProfileData);
      }
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
      setUserProfile(undefined);
      setUserQuotedPost(quotedPost);
    } else {
      setUserQuotedPost();
    }

  }, [posts, userQuotedPost, quotedPost, collection, profile, profileInfo, setCollection]);

  const onCloseModal = () => {
    setUserProfile(undefined);
    setUserQuotedPost(undefined);
  }

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

      {/* 
      {
        !!userProfile && (
          <>
            <Modal isOpen={userProfile} onClose={onCloseModal}>
              {!!userProfile && (<UserProfile userData={userProfile} />)}
            </Modal>
          </>
        )
      }
      {
        !!userQuotedPost && (
          <>
            <Modal isOpen={userQuotedPost} onClose={onCloseModal}>
              {!!quotedPost && (<PostQuote typeOfPost='quote' />)}
            </Modal>
          </>
        )

      }
      */}
      <Modal />
    </div>
    
  );
}

export default PostPage;