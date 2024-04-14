import Avatar from "../../avatar/Avatar";

const Quote = ({ post, onClickCallback, isDisabled }) => {
    return (
        <>
            <div className="flex flex-col gap-3 mx-3 p-3 border border-gray-200 rounded-xl">
                <div className="post--header flex gap-3 items-center">
                    <button
                        onClick={() => { onClickCallback() }}
                        className={`post-toogle-link ${isDisabled ? 'isDisabled' : ''} `}
                        disabled={isDisabled}
                    >
                        <Avatar firstName={post?.quotedPost?.user?.firstName?.charAt(0) || 'X'} lastName={post?.quotedPost?.user?.lastName?.charAt(0) || 'X'} />
                    </button>
                    <div className="post--header--name">
                        <h4 className="font-semibold">{post?.quotedPost?.user?.firstName} {post?.quotedPost?.user?.lastName}</h4>
                    </div>
                </div>
                <div className="poster--body">
                    <p className="flex-auto m1-2 pb-4">{post?.quotedPost?.postBody}</p>
                </div>
            </div>
        </>
    )
}

export default Quote;