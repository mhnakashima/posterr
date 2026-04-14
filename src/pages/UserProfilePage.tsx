import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/sidebar/Sidebar';
import BottomNav from '../components/bottomNav/BottomNav';
import Header from '../components/header/Header';
import Modal from '../components/modal/Modal';
import Avatar from '../components/avatar/Avatar';
import FollowButton from '../components/follow/FollowButton';
import FollowData from '../components/follow/FollowData';
import PostToolbar from '../components/posts/PostToolbar';
import Post from '../components/posts/view/Post';
import { usePosts } from '../context/PostsContext';
import { useProfile } from '../context/UserContext';
import { useModal } from '../context/ModalContext';
import PostQuote from '../components/posts/post/PostQuote';
import type { PostData, UserData } from '../types';

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { posts, onAddFollower, onToggleLike, onToggleRepost } = usePosts();
  const { profileInfo } = useProfile();
  const { openModal } = useModal();

  const userData: UserData | undefined = (() => {
    if (userId === profileInfo.userId) return profileInfo;
    const userPost = posts.find((p) => p.user.userId === userId);
    return userPost?.user;
  })();

  if (!userData) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <Header />
        <main className="lg:ml-16 pb-16 lg:pb-0">
          <section className="max-w-[600px] mx-auto bg-white dark:bg-gray-900 p-8 text-center text-gray-500 dark:text-gray-400" aria-label="User not found">
            <p>User not found.</p>
            <button
              onClick={() => navigate('/all')}
              className="block mx-auto mt-4 text-blue-500 hover:underline"
            >
              Go back
            </button>
          </section>
        </main>
        <BottomNav />
      </div>
    );
  }

  const isOwnProfile = userData.userId === profileInfo.userId;

  const userPosts: PostData[] = isOwnProfile
    ? posts.filter((p) => p.user.userId === profileInfo.userId)
    : userData.posts?.map((p) => ({ ...p, user: userData })) ?? [];

  const handleFollow = () => {
    onAddFollower(userData.userId, userData.isFollowing ?? false);
  };

  const handleRepost = (postIndex: number) => {
    onToggleRepost(postIndex, profileInfo.userId);
  };

  const uniqueUsers = new Map<string, UserData>();
  posts.forEach((p) => {
    if (!uniqueUsers.has(p.user.userId)) {
      uniqueUsers.set(p.user.userId, p.user);
    }
  });

  const followersList = Array.from(uniqueUsers.values()).filter(
    (u) => u.isFollower,
  );
  const followingList = Array.from(uniqueUsers.values()).filter(
    (u) => u.isFollowing,
  );

  const followerCount = isOwnProfile
    ? followersList.length
    : userData.numOfFollowers ?? 0;

  const followingCount = isOwnProfile
    ? followingList.length
    : userData.numOfFollowing ?? 0;

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <Header />

      <main className="lg:ml-16 pb-16 lg:pb-0">
        <div className="max-w-[600px] mx-auto">
          <header className="sticky top-0 lg:top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-800">
            <div className="flex items-center h-14 px-4 gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-base font-semibold leading-tight text-gray-900 dark:text-gray-100">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userPosts.length} posts
                </p>
              </div>
            </div>
          </header>

          <section aria-label="Profile information" className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  firstName={userData.firstName}
                  lastName={userData.lastName}
                  size="lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{userData.userName}</p>
                </div>
              </div>

              {!isOwnProfile && (
                <FollowButton
                  isFollowing={userData.isFollowing}
                  onClickFollowUser={handleFollow}
                />
              )}
            </div>

            <div className="mt-4">
              <FollowData
                numOfFollowers={followerCount}
                numOfFollowing={followingCount}
                numOfPosts={userPosts.length}
                followers={isOwnProfile ? followersList : []}
                following={isOwnProfile ? followingList : []}
              />
            </div>
          </section>

          <section aria-label="User posts" className="mt-2">
            {userPosts.length > 0 ? (
              <ul aria-label="Posts" className="flex flex-col gap-px bg-gray-200/60 dark:bg-gray-800/60">
                {userPosts.map((post, index) => {
                  const originalIndex = posts.indexOf(post);
                  const likes = post.likes ?? [];
                  const isLiked = likes.includes(profileInfo.userId);
                  const repostedBy = post.repostedBy ?? [];
                  const isReposted = repostedBy.includes(profileInfo.userId);

                  return (
                    <li key={`profile-post-${index}`} className="bg-white dark:bg-gray-900 list-none">
                      <Post
                        post={{
                          ...post,
                          user: userData,
                        }}
                        isDisabled={true}
                        repostedByLabel={isReposted ? 'You reposted' : undefined}
                      >
                        <PostToolbar
                          likeCount={likes.length}
                          isLiked={isLiked}
                          onToggleLike={() =>
                            onToggleLike(originalIndex, profileInfo.userId)
                          }
                          isReposted={isReposted}
                          repostCount={repostedBy.length}
                          quotePostCallback={() => {
                            openModal(
                              <PostQuote
                                post={{
                                  postBody: post.postBody,
                                  user: userData,
                                  typeOfPost: 'quote',
                                }}
                                typeOfPost="quote"
                              />,
                            );
                          }}
                          repostCallback={() => handleRepost(originalIndex)}
                        />
                      </Post>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="bg-white dark:bg-gray-900 p-8 text-center text-gray-400 dark:text-gray-500">
                No posts yet.
              </p>
            )}
          </section>
        </div>
      </main>

      <BottomNav />
      <Modal />
    </div>
  );
};

export default UserProfilePage;
