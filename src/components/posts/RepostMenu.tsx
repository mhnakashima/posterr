import { useEffect, useRef, useState } from 'react';
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface RepostMenuProps {
  onQuotePost: () => void;
  onRepost: () => void;
  isReposted?: boolean;
}

const RepostMenu = ({ onQuotePost, onRepost, isReposted = false }: RepostMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${
          isReposted
            ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-950'
            : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="Share options"
      >
        <ArrowPathRoundedSquareIcon className="h-[18px] w-[18px]" />
      </button>

      {isOpen && (
        <ul role="menu" aria-label="Share options" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-950/50 border border-gray-200 dark:border-gray-700 py-1 z-20">
          <li role="none">
            <button
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onQuotePost();
              }}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Quote Post
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onRepost();
              }}
              className={`flex items-center w-full px-3 py-2 text-sm transition-colors ${
                isReposted
                  ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <ArrowPathRoundedSquareIcon className={`h-4 w-4 mr-2 ${isReposted ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} />
              {isReposted ? 'Undo Repost' : 'Repost'}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default RepostMenu;
