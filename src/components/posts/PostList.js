import { Link } from "react-router-dom";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";

function PostList() {
    const { posts } = usePosts();
  
    return (
      <>
        <ul>
          {posts.map((post, i) => (
            <li className="border-blue-100 hover:bg-blue-200" key={i}>
              <div className="flex gap-4">
                <Link to={`/profile/${post?.user?.userId}`}  >
                  <Avatar firstName={post?.user?.firstName?.charAt(0) || 'X'} lastName={post?.user?.firstName?.charAt(1) || 'X'} />
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