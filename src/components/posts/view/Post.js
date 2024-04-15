import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import Avatar from "../../avatar/Avatar";

const Post = ({post, onClickCallback, isDisabled}) => {
    return (
        <div className="flex flex-col gap-3 p-4">
            <div className="post--header flex flex-wrap justify-between gap-3 ">
                <div className="flex items-center w-full">
                    
                    <button onClick={() => { onClickCallback() }} className={`post-toogle-link ${ isDisabled ? 'isDisabled' : ''} `} disabled={isDisabled}  >
                        <Avatar firstName={post?.user?.firstName?.charAt(0) || 'X'} lastName={post?.user?.lastName?.charAt(0) || 'X'} />
                    </button>

                    <h4 className="post--header--name ml-2 hover:opacity-75 active:opacity-50 hover:text-body ">
                        <div className="font-medium text-body">{post?.user?.firstName} {post?.user?.lastName}</div>
                    </h4>

                    <span className="hidden sm:inline-block ml-2">{post?.user?.userName}</span>

                    { post?.user?.isFollowing && (
                        <div className="ml-auto bg-blue-500 rounded-xl font-light text-xs p-2 text-white">Following</div>
                    )}
                </div>
                {
                    /* Quote post - It will be create a Quote post */
                }
                <div className={`post--respost ${( post?.typeOfPost === 'repost') || ( post?.typeOfPost === 'quote') ?
                    'flex items-center' : 'hidden'
                    } bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 rounded dark:bg-blue-900 dark:text-blue-300`}>

                    <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                    <span className={`hidden text-xs sm:inline-block`}></span>
                </div>
            </div>
            <div className="poster--body">
                <p className="flex-auto m1-2">{post?.postBody}</p>
            </div>
        </div>
    )
}

export default Post;