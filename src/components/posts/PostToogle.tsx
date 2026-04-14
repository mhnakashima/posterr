import { Link } from 'react-router-dom';
import { usePosts } from '../../context/PostsContext';

const tabs = [
  { key: 'all', label: 'All Posts', to: '/all' },
  { key: 'following', label: 'Following', to: '/following' },
  { key: 'reposts', label: 'Reposts', to: '/reposts' },
] as const;

const PostToogle = () => {
  const { collection } = usePosts();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 rounded-t-2xl overflow-hidden">
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            to={tab.to}
            className={`flex-1 text-center py-3 text-sm font-semibold transition-colors border-b-2 ${
              collection === tab.key
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostToogle;
