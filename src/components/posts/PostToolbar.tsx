import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import RepostMenu from './RepostMenu';

interface PostToolbarProps {
  quotePostCallback: () => void;
  repostCallback: () => void;
  likeCount: number;
  isLiked: boolean;
  onToggleLike: () => void;
  isReposted?: boolean;
  repostCount?: number;
}

const PostToolbar = ({
  quotePostCallback,
  repostCallback,
  likeCount,
  isLiked,
  onToggleLike,
  isReposted = false,
  repostCount = 0,
}: PostToolbarProps) => {
  return (
    <div className="flex items-center gap-1 pt-1 pb-1">
      <button
        onClick={onToggleLike}
        className={`flex items-center gap-1 p-1.5 rounded-full transition-colors ${
          isLiked
            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        {isLiked ? (
          <HeartIconSolid className="h-[18px] w-[18px]" />
        ) : (
          <HeartIcon className="h-[18px] w-[18px]" />
        )}
        {likeCount > 0 && (
          <span className="text-xs font-medium min-w-[1ch]">{likeCount}</span>
        )}
      </button>

      <div className="flex items-center">
        <RepostMenu
          onQuotePost={quotePostCallback}
          onRepost={repostCallback}
          isReposted={isReposted}
        />
        {repostCount > 0 && (
          <span className={`text-xs font-medium -ml-0.5 ${isReposted ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {repostCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostToolbar;
