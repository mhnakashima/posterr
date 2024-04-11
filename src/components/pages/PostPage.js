import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostContainer from "../../containers/PostContainer";
import { usePosts } from "../../context/UserContext";
import Header from "../Header";
import Modal from "../modal/Modal";
import PostToogle from "../posts/PostToogle";
import UserProfile from "../user/UserProfile";
import UserProfileInfo from "../user/UserProfileInfo";

const PostPage = () => {
  const { collection, profile } = useParams();
  const { profileInfo, posts, setCollection } = usePosts();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (collection) {
      setCollection(collection);
    }

    if (!profile) {
      return;
    }

    const userProfileData = posts.find((post => post?.user?.userId === profile))?.user;

    if (!userProfileData || userProfileData?.userId === profileInfo?.userId) {
      return;
    }

    setUserProfile(userProfileData);
  }, [posts, collection, profile, profileInfo, setCollection]);

  const onCloseModal = () => {
    setUserProfile(undefined);
  }

  return (
    <>
      <div className="mt-4 container mx-auto" >
        <div className="grid grid-cols-12 gap-4">
          <aside className="lg:col-span-4 col-span-12" >
            <Header />
            <UserProfileInfo />
          </aside>
          <section className="lg:col-span-8 col-span-12" >
            <div className="flex justify-end my-4 gap-2">
              <PostToogle />
            </div>
            <PostContainer />
          </section>
        </div>
      </div>
      {
        !!userProfile && (
          <Modal isOpen={userProfile} onClose={onCloseModal}>
            <UserProfile userData={userProfile} />
          </Modal>
        )
      }
    </>
  );
}

export default PostPage;