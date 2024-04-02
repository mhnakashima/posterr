import PostContainer from "../../containers/PostContainer";
import Header from "../Header";

function PostPage() {
    return (
      <>
        <Header hideSearch='true' />
        <PostContainer />
      </>
    );
  }

  export default PostPage;