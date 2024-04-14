import { ArrowPathRoundedSquareIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const PostToolbar = ({
    quotePostCallback,
    repostCallback
}) => {
    return (
        <div className="post--toolbar flex text-sm h-8 items-center justify-around">
            <button onClick={() => { quotePostCallback() }} className="button flex justify-center items-center hover:opacity-50 active:opacity-25 relative">
                <ChatBubbleLeftRightIcon aria-label="quote" className="h-6 w-6 text-gray-800" />
                <span className="hidden sm:inline-block ml-2 ">Quote Post</span>
            </button>
            <button onClick={() => { repostCallback() }} className="button flex justify-center items-center hover:opacity-50 active:opacity-25 relative">
                <ArrowPathRoundedSquareIcon aria-label="repost" className="h-6 w-6 text-gray-800 " />
                <span className="hidden sm:inline-block ml-2 ">Repost</span>
            </button>
        </div>
    )
}

export default PostToolbar;