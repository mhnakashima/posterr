import { usePosts } from "../../context/UserContext";

function PostsSearch() {
    const { searchQuery, setSearchQuery } = usePosts();

    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
        />
    );
}

export default PostsSearch;