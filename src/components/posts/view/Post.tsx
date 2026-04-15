import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import Avatar from '../../avatar/Avatar';
import { PostType, type PostData } from '../../../types';
import { AVATAR_FALLBACK_INITIAL } from '../../../api/constants';
import type { ReactNode } from 'react';

interface PostProps {
  post: PostData;
  onClickCallback?: () => void;
  isDisabled?: boolean;
  children?: ReactNode;
  repostedByLabel?: string;
}

const Post = ({ post, onClickCallback, isDisabled, children, repostedByLabel }: PostProps) => {
  return (
    <article aria-label={`Post by ${post?.user?.firstName} ${post?.user?.lastName}`}>
      {repostedByLabel && (
        <p className="flex items-center gap-1.5 px-4 pt-2 pl-14 text-xs text-gray-500 dark:text-gray-400">
          <ArrowPathRoundedSquareIcon className="h-3.5 w-3.5" />
          <span>{repostedByLabel}</span>
        </p>
      )}

      <div className="flex gap-3 px-4 pt-3 pb-1">
        <button
          onClick={() => onClickCallback?.()}
          className={`shrink-0 self-start mt-0.5 ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={isDisabled}
        >
          <Avatar
            firstName={post?.user?.firstName?.charAt(0) || AVATAR_FALLBACK_INITIAL}
            lastName={post?.user?.lastName?.charAt(0) || AVATAR_FALLBACK_INITIAL}
          />
        </button>

        <div className="flex-1 min-w-0">
          <header className="flex items-center gap-2 mb-1">
            <button
              onClick={() => onClickCallback?.()}
              className={`text-sm font-semibold text-gray-900 dark:text-gray-100 hover:underline truncate ${isDisabled ? 'pointer-events-none' : ''}`}
              disabled={isDisabled}
            >
              {post?.user?.firstName} {post?.user?.lastName}
            </button>

            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {post?.user?.userName}
            </span>

            {post?.user?.isFollowing && (
              <span className="ml-auto shrink-0 text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                Following
              </span>
            )}

            {post?.typeOfPost === PostType.Quote && (
              <span className="ml-auto shrink-0 flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                <ArrowPathRoundedSquareIcon className="w-3 h-3" />
                Quote
              </span>
            )}
          </header>

          <p className="text-[15px] text-gray-800 dark:text-gray-200 leading-relaxed">
            {post?.postBody}
          </p>

          {children}
        </div>
      </div>
    </article>
  );
};

export default Post;
