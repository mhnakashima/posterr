import { Link } from "react-router-dom";
import { usePosts } from "../../context/UserContext";

const PostToogle = () => {

    const { collection } = usePosts();

    return (
        <div className="w-full border-b border-gray-200">
            <div className="-mb-px flex">
                <Link 
                    to='/all' 
                    disabled={collection === 'all'} 
                    className={`${collection === 'all' ? 'text-indigo-400 border-indigo-400' : ''} post-toogle-link text-center px-5 py-3 outline-0 hover:bg-gray-100 w-full text-primary font-semibold border-b-2`}>
                        All Posts
                </Link>
                <Link 
                    to='/following' 
                    disabled={collection !== 'all'} 
                    className={`${collection !== 'all' ? 'text-indigo-400 border-indigo-400' : ''} post-toogle-link text-center px-5 py-3 outline-0 hover:bg-gray-100 w-full text-primary font-semibold border-b-2`}>
                        Following
                </Link>
            </div>
        </div>
    );
}

export default PostToogle;