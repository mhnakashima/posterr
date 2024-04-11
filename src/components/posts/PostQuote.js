import PostAdd from "./PostAdd";

const PostQuote = ({typeOfPost}) => {
    return(
        <div>
            <PostAdd typeOfPost={typeOfPost} />
        </div>
    )
}

export default PostQuote;