import Avatar from '../../avatar/Avatar';
import type { PostData } from '../../../types';

interface QuoteProps {
  post: PostData;
  onClickCallback?: () => void;
  isDisabled?: boolean;
}

const Quote = ({ post, onClickCallback, isDisabled }: QuoteProps) => {
  return (
    <div className="mt-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex gap-2 items-center mb-1">
        <button
          onClick={() => onClickCallback?.()}
          className={`shrink-0 ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={isDisabled}
        >
          <Avatar
            firstName={post?.user?.firstName?.charAt(0) || 'X'}
            lastName={post?.user?.lastName?.charAt(0) || 'X'}
            size="xs"
          />
        </button>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {post?.user?.firstName} {post?.user?.lastName}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {post?.postBody}
      </p>
    </div>
  );
};

export default Quote;
