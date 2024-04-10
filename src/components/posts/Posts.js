import PostList from "./PostList";
import PostToogle from "./PostToogle";

function Posts() {
    return (
      <section className="posts rounded-md bg-gray-100 p-4">
        <PostList />
      </section>
    );
  }

  export default Posts;