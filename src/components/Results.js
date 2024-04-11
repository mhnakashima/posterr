import { usePosts } from "../context/UserContext";

const Results = () => {
    const { posts } = usePosts();

    return <p>🚀 {posts.length} Posterr found</p>;
}

export default Results;