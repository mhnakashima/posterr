import { Link } from "react-router-dom";

function PostToogle() {

    return (
        <div className="my-4 flex flex-wrap sm:content-center md:content-end ">
            <Link to='/all'  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">All Posts</Link>
            &nbsp;
            <Link to='/following' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Following</Link>
        </div>
    );
}

export default PostToogle;