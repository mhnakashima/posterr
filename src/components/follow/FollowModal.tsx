import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserData } from '../../types';
import Avatar from '../avatar/Avatar';
import { useModal } from '../../context/ModalContext';

type Tab = 'followers' | 'following';

interface FollowModalProps {
  followers: UserData[];
  following: UserData[];
  initialTab?: Tab;
}

const FollowModal = ({
  followers,
  following,
  initialTab = 'followers',
}: FollowModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const activeList = activeTab === 'followers' ? followers : following;

  const handleUserClick = (userId: string) => {
    closeModal();
    navigate(`/profile/${userId}`);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('followers')}
          className={`flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
            activeTab === 'followers'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          Followers ({followers.length})
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
            activeTab === 'following'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          Following ({following.length})
        </button>
      </div>

      {/* User list */}
      {activeList.length > 0 ? (
        <ul className="max-h-80 overflow-y-scroll divide-y divide-gray-50 dark:divide-gray-800">
          {activeList.map((user, i) => (
            <li key={`${activeTab}-${user.userId}-${i}`}>
              <button
                onClick={() => handleUserClick(user.userId)}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.userName}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-8 text-sm text-gray-400 dark:text-gray-500 text-center">
          No {activeTab} yet.
        </div>
      )}
    </div>
  );
};

export default FollowModal;
