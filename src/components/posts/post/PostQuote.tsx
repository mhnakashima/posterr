import type { PostData } from '../../../types';
import Quote from '../view/Quote';
import PostAdd from './PostAdd';

interface PostQuoteProps {
  post: PostData;
  typeOfPost?: string;
}

const PostQuote = ({ post }: PostQuoteProps) => {
  return (
    <section className="p-4" aria-label="Quote post">
      <PostAdd quotedPost={post} typeOfPost={post.typeOfPost} />
      <Quote post={post} isDisabled={true} />
    </section>
  );
};

export default PostQuote;
