import { usePosts } from '../../context/PostsContext';
import { APP_NAME } from '../../api/constants';

const PostResults = () => {
  const { posts } = usePosts();

  return <p>{posts.length} {APP_NAME} found</p>;
};

export default PostResults;
