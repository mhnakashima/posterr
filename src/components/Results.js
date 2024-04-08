import { usePosts } from "../context/UserContext";

function Results() {
    const { posts } = usePosts();

    return <p>🚀 {posts.length} Posterr found</p>;
}

export default Results;