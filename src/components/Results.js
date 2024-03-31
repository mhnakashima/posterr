import { usePosts } from "../context/PosterrContext";

function Results() {
    const { posts } = usePosts();

    return <p>🚀 {posts.length} Posterr found</p>;
}

export default Results;