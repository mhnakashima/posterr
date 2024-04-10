import { Link } from "react-router-dom";

function PostToogle() {

    return (
        <div className="flex gap-2">
            <Link to='/all'  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">All Posts</Link>
            <Link to='/following' className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Following</Link>
        </div>
    );
}

export default PostToogle;