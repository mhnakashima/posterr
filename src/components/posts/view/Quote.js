import Avatar from "../../avatar/Avatar";

const Quote = ({ post, onClickCallback, isDisabled }) => {
    return (
        <>
            <div className="flex flex-col gap-3 mx-3 mb-3 p-3 border border-gray-200 rounded-xl">
                <div className="post--header flex gap-3 items-center">
                    <button
                        onClick={() => { onClickCallback() }}
                        className={`post-toogle-link ${isDisabled ? 'isDisabled' : ''} `}
                        disabled={isDisabled}
                    >
                        <Avatar firstName={post?.user?.firstName?.charAt(0) || 'X'} lastName={post?.user?.lastName?.charAt(0) || 'X'} />
                    </button>
                    <div className="post--header--name">
                        <h4 className="font-semibold">{post?.user?.firstName} {post?.user?.lastName}</h4>
                    </div>
                </div>
                <div className="post--body">
                    <p className="flex-auto m1-2 pb-4">{post?.postBody}</p>
                </div>
            </div>
        </>
    )
}

export default Quote;