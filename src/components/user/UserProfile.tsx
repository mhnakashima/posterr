import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/PostsContext';
import { useProfile } from '../../context/UserContext';
import type { PostData, UserData } from '../../types';
import { AVATAR_FALLBACK_INITIAL, LABELS, ROUTES } from '../../api/constants';
import FollowButton from '../follow/FollowButton';
import FollowData from '../follow/FollowData';
import PostToolbar from '../posts/PostToolbar';
import Post from '../posts/view/Post';
import ProfileHeader from './profileHeader/ProfileHeader';

interface UserProfileProps {
  userData: UserData;
}

const UserProfile = ({ userData }: UserProfileProps) => {
  const { posts, onAddFollower, onToggleLike, onToggleRepost } = usePosts();
  const { profileInfo } = useProfile();
  const navigate = useNavigate();

  const handleOnClickFollowUser = (isFollowing: boolean) => {
    onAddFollower(userData?.userId, isFollowing);
  };

  const handleRepost = (postIndex: number) => {
    onToggleRepost(postIndex, profileInfo.userId);
  };

  return (
    <div className="userProfile container mx-auto max-w-lg">
      <div className="px-4">
        <div className="flex items-center">
          <ProfileHeader
            firstName={userData?.firstName || AVATAR_FALLBACK_INITIAL}
            lastName={userData?.lastName || AVATAR_FALLBACK_INITIAL}
            userName={userData?.userName || AVATAR_FALLBACK_INITIAL}
          />

          <div className="ml-auto">
            <FollowButton
              isFollowing={userData?.isFollowing}
              onClickFollowUser={() =>
                handleOnClickFollowUser(userData?.isFollowing ?? false)
              }
            />
          </div>
        </div>

        <FollowData
          numOfFollowers={userData?.numOfFollowers || 0}
          numOfFollowing={userData?.numOfFollowing || 0}
          numOfPosts={userData?.posts?.length || 0}
        />

        <hr className="block border-t border-gray-200 my-4" />
      </div>

      <div className="max-h-64 overflow-y-auto mt-4">
        <div className="px-0 sm:px-4">
          <ul className="post--list">
            {userData?.posts?.map((post, index) => {
              const fullPost: PostData = {
                ...post,
                user: {
                  userId: userData.userId,
                  firstName: userData?.firstName,
                  lastName: userData?.lastName,
                  userName: userData?.userName,
                },
              };
              const originalIndex = posts.indexOf(fullPost);
              const likes = post.likes ?? [];
              const isLiked = likes.includes(profileInfo.userId);
              const repostedBy = post.repostedBy ?? [];
              const isReposted = repostedBy.includes(profileInfo.userId);

              return (
                <li key={`post-${userData?.userId}-${index}`}>
                  <Post
                    post={fullPost}
                    isDisabled={true}
                    repostedByLabel={isReposted ? LABELS.repostedBySelf : undefined}
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
                        navigate(ROUTES.profile(userData.userId));
                      }}
                      repostCallback={() => handleRepost(originalIndex)}
                    />
                  </Post>

                  <hr className="block border-t border-gray-200 my-1" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
