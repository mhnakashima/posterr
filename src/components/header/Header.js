import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className='flex items-center'>
          <ChatBubbleLeftRightIcon className="ml-4 h-6 w-6 text-blue-500" />
          <span class="text-2xl font-semibold whitespace-nowrap dark:text-white">Posterr</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;