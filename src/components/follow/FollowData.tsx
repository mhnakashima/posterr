import type { UserData } from '../../types';
import { useModal } from '../../context/ModalContext';
import Avatar from '../avatar/Avatar';
import FollowModal from './FollowModal';

interface FollowDataProps {
  numOfFollowers: number;
  numOfFollowing: number;
  numOfPosts: number;
  followers?: UserData[];
  following?: UserData[];
}

const FollowData = ({
  numOfFollowers,
  numOfFollowing,
  numOfPosts,
  followers = [],
  following = [],
}: FollowDataProps) => {
  const { openModal } = useModal();

  const previewUsers = followers.slice(0, 3);

  const handleOpenFollowers = () => {
    openModal(
      <FollowModal
        followers={followers}
        following={following}
        initialTab="followers"
      />,
    );
  };

  const handleOpenFollowing = () => {
    openModal(
      <FollowModal
        followers={followers}
        following={following}
        initialTab="following"
      />,
    );
  };

  return (
    <section aria-label="Profile stats" className="flex items-center justify-between">
      {/* Stacked avatars + follower count */}
      <button
        onClick={handleOpenFollowers}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {previewUsers.length > 0 && (
          <div className="flex -space-x-2">
            {previewUsers.map((user, i) => (
              <div
                key={`preview-${user.userId}-${i}`}
                className="ring-2 ring-white dark:ring-gray-900 rounded-full"
              >
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  size="xs"
                />
              </div>
            ))}
          </div>
        )}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{numOfFollowers}</span>{' '}
          followers
        </span>
      </button>

      {/* Following + Posts counts */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <button
          onClick={handleOpenFollowing}
          className="hover:opacity-80 transition-opacity"
        >
          <span className="font-semibold text-gray-900 dark:text-gray-100">{numOfFollowing}</span>{' '}
          following
        </button>
        <span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">{numOfPosts}</span>{' '}
          posts
        </span>
      </div>
    </section>
  );
};

export default FollowData;
