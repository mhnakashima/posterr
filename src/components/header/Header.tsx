import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <nav className="lg:hidden sticky top-0 z-40 w-full backdrop-blur flex-none border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center h-14 px-4">
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500" />
        <span className="text-xl font-semibold ml-1 text-gray-900 dark:text-gray-100">Posterr</span>
      </div>
    </nav>
  );
};

export default Header;
