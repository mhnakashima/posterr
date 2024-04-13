import { memo } from "react";

import Posts from "../components/posts/Posts";
import PostToogle from "../components/posts/PostToogle";

const PostContainer = memo(
    function PostContainer() {
        return (
            <section className="post--container px-4">
                <PostToogle />
                <Posts />
            </section>
        );
    }
);

export default PostContainer;
