import { Link } from "react-router-dom";
import { usePosts } from "../../context/UserContext";

const PostToogle = () => {

    const { collection } = usePosts();

    return (
        <div className="flex gap-2">
            <Link to='/all' disabled={collection === 'all'}  className={`${collection === 'all' ? 'isDisabled disabled:opacity-75 bg-blue-500' : 'disabled:opacity-100 bg-blue-600' } post-toogle-link hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}>All Posts</Link>
            <Link to='/following' disabled={collection !== 'all'}  className={`${collection !== 'all' ? 'isDisabled disabled:opacity-75 bg-blue-500' : 'disabled:opacity-100 bg-blue-600' } post-toogle-link hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}>Following</Link>
        </div>
    );
}

export default PostToogle;