import Quote from "../view/Quote";
import PostAdd from "./PostAdd";

const PostQuote = ({post}) => {
    return(
        <div>
            <PostAdd quotedPost={post} typeOfPost={post.typeOfPost} />
            <Quote post={post} isDisabled={true}  />
        </div>
    )
}

export default PostQuote;