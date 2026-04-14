import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserGroupIcon,
  ArrowPathRoundedSquareIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { usePosts } from '../../context/PostsContext';
import { useProfile } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import { FeedCollection, Theme } from '../../types';
import { LABELS, ROUTES } from '../../api/constants';

const navItems = [
  { key: FeedCollection.All, to: ROUTES.feed(FeedCollection.All), icon: HomeIcon, title: 'Home' },
  { key: FeedCollection.Following, to: ROUTES.feed(FeedCollection.Following), icon: UserGroupIcon, title: 'Following' },
  { key: FeedCollection.Reposts, to: ROUTES.feed(FeedCollection.Reposts), icon: ArrowPathRoundedSquareIcon, title: 'Reposts' },
] as const;

const Sidebar = () => {
  const { collection } = usePosts();
  const { profileInfo } = useProfile();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:items-center lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-16 lg:border-r lg:border-gray-200/60 dark:lg:border-gray-800 bg-white dark:bg-gray-950 z-40 py-4">
      <Link to={ROUTES.home} className="mb-8">
        <ChatBubbleLeftRightIcon className="h-7 w-7 text-blue-500" />
      </Link>

      <nav className="flex flex-col items-center gap-6 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={`p-2 rounded-lg transition-colors ${
              collection === item.key
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
            title={item.title}
          >
            <item.icon className="h-6 w-6" />
          </Link>
        ))}

        <Link
          to={ROUTES.profile(profileInfo.userId)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          title="Profile"
        >
          <UserCircleIcon className="h-6 w-6" />
        </Link>
      </nav>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        title={theme === Theme.Dark ? LABELS.lightMode : LABELS.darkMode}
      >
        {theme === Theme.Dark ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
