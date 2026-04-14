import type { PostData } from '../../../types';
import Quote from '../view/Quote';
import PostAdd from './PostAdd';

interface PostQuoteProps {
  post: PostData;
  typeOfPost?: string;
}

const PostQuote = ({ post }: PostQuoteProps) => {
  return (
    <div className="p-4">
      <PostAdd quotedPost={post} typeOfPost={post.typeOfPost} />
      <Quote post={post} isDisabled={true} />
    </div>
  );
};

export default PostQuote;
