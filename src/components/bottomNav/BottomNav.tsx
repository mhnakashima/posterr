import { Link } from 'react-router-dom';
import {
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
import { ROUTES } from '../../api/constants';

const navItems = [
  { key: FeedCollection.All, to: ROUTES.feed(FeedCollection.All), icon: HomeIcon, label: 'Home' },
  { key: FeedCollection.Following, to: ROUTES.feed(FeedCollection.Following), icon: UserGroupIcon, label: 'Following' },
  { key: FeedCollection.Reposts, to: ROUTES.feed(FeedCollection.Reposts), icon: ArrowPathRoundedSquareIcon, label: 'Reposts' },
] as const;

const BottomNav = () => {
  const { collection } = usePosts();
  const { profileInfo } = useProfile();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              collection === item.key
                ? 'text-blue-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        ))}

        <Link
          to={ROUTES.profile(profileInfo.userId)}
          className="flex flex-col items-center justify-center flex-1 h-full text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors"
        >
          <UserCircleIcon className="h-6 w-6" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </Link>

        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center flex-1 h-full text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors"
        >
          {theme === Theme.Dark ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
          <span className="text-[10px] mt-0.5">Theme</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
