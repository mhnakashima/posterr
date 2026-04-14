import { usePosts } from '../../context/PostsContext';

const PostSearch = () => {
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <search className="flex-1">
      <input
        className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        aria-label="Search posts"
      />
    </search>
  );
};

export default PostSearch;
