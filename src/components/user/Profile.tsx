import { useMemo } from 'react';
import { usePosts } from '../../context/PostsContext';
import { useProfile } from '../../context/UserContext';
import type { UserData } from '../../types';
import FollowData from '../follow/FollowData';
import ProfileHeader from './profileHeader/ProfileHeader';

const Profile = () => {
  const { posts } = usePosts();
  const { profileInfo } = useProfile();

  const { followersList, followingList, numOfPosts } = useMemo(() => {
    if (!posts) return { followersList: [], followingList: [], numOfPosts: 0 };

    const unique = new Map<string, UserData>();
    posts.forEach((p) => {
      if (!unique.has(p.user.userId)) {
        unique.set(p.user.userId, p.user);
      }
    });

    return {
      followersList: Array.from(unique.values()).filter((u) => u.isFollower),
      followingList: Array.from(unique.values()).filter((u) => u.isFollowing),
      numOfPosts: posts.filter((p) => p.user.userId === profileInfo.userId).length,
    };
  }, [posts, profileInfo]);

  return (
    <section className="flex flex-col gap-3 p-4">
      <ProfileHeader
        firstName={profileInfo?.firstName || 'x'}
        lastName={profileInfo?.lastName || 'x'}
        userName={profileInfo?.userName || 'x'}
      />

      <FollowData
        numOfFollowers={followersList.length}
        numOfFollowing={followingList.length}
        numOfPosts={numOfPosts}
        followers={followersList}
        following={followingList}
      />
    </section>
  );
};

export default Profile;
