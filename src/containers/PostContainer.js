import { memo } from "react";

import Posts from "../components/Posts";
import PostAdd from './../components/PostAdd';

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
