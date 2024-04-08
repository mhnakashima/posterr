import { Link } from "react-router-dom";
import { usePosts } from "../../context/UserContext";

function PostList() {
    const { posts } = usePosts();
  
    return (
      <>
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <div className="flex gap-4">
                <Link to={`/profile/${post?.user?.userId}`} className="flex flex-initial bg-blue-500 text-white rounded-full py-2 px-5" >
                  <span className="self-center">{post?.user?.firstName?.charAt(0)}{post?.user?.firstName?.charAt(1)}</span>
                </Link>
                <p className="flex-auto p-4">{post?.postBody}</p>
              </div>
              <div className="flex-initial justify-end">

              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  export default PostList;