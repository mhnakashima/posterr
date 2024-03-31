import { usePosts } from "../context/PosterrContext";

function PostList() {
    const { posts } = usePosts();
  
    return (
      <>
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }

  export default PostList;