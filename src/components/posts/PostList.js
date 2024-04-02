import { usePosts } from "../../context/PosterrContext";

function PostList() {
    const { posts } = usePosts();
  
    return (
      <>
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <h3>{post.firstName[0] + post.lastName[0]}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }

  export default PostList;