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
    }else{
      setUserQuotedPost();
    }

  }, [posts, userQuotedPost, quotedPost, collection, profile, profileInfo, setCollection]);

  const onCloseModal = () => {
    setUserProfile(undefined);
    setUserQuotedPost(undefined);
  }

  return (
    <>
      <Header />
      <div className="mt-4 container mx-auto" >
        <div className="grid grid-cols-12 gap-4">
          <section className="lg:col-span-8 col-span-12" >
            <div className="flex justify-end mb-4 gap-2">
              <PostToogle />
            </div>
            <PostContainer />
          </section>
          <aside className="lg:col-span-4 col-span-12" >
            <UserProfileInfo />
          </aside>
        </div>
      </div>
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
    </>
  );
}

export default PostPage;