import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none border transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
      <div className="backdrop-blur-lg transition-all duration-300 w-full">
        <div className='flex items-center h-16'>
          <ChatBubbleLeftRightIcon className="ml-4 h-6 w-6 text-blue-500" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Posterr</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;