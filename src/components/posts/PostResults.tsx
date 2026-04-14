import { usePosts } from '../../context/PostsContext';

const PostResults = () => {
  const { posts } = usePosts();

  return <p>{posts.length} Posterr found</p>;
};

export default PostResults;
