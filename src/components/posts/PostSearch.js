import { usePosts } from "../../context/UserContext";

function PostsSearch() {
    const { searchQuery, setSearchQuery } = usePosts();

    return (
        <div className="flex-1">
            <input
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
            />
        </div>
    );
}

export default PostsSearch;