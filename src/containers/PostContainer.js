import { memo } from "react";

import Posts from "../components/posts/Posts";
import PostAdd from '../components/posts/PostAdd';

const PostContainer = memo(
    function PostContainer() {
        return (
            <main>
                <PostAdd />
                <Posts />
            </main>
        );
    }
);

export default PostContainer;
