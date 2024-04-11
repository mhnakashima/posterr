import { useState } from "react";
import { POSTERR_MIN_INPUT_LENGTH } from "../../api/constants";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";

const PostAdd = ({ typeOfPost }) => {
  const { profileInfo, quotedPost, onAddPost } = usePosts();
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body) return;

    const post = {
      postBody: body,
      user: quotedPost ? quotedPost.user : profileInfo,
      typeOfPost: typeOfPost || 'post'
    }

    onAddPost(post);
    setBody("");
  };

  return (
    <div className="sm:mb-4 rounded-md bg-gray-100" >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex ">
          <textarea
            className=""
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`${typeOfPost === 'quote' ? 'Add a comment' : 'Start posterring!!!'}`}
          />
        </div>
        <button disabled={body.length < 3} className={`${body.length < POSTERR_MIN_INPUT_LENGTH ? 'opacity-50 cursor-not-allowed' : ''} flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded flex justify-center`}>Add post</button>
      </form>

      {!!quotedPost && (
        <div className="post--quoted flex gap-4 p-4">
          <Avatar firstName={quotedPost?.user?.firstName?.charAt(0) || 'X'} lastName={quotedPost?.user?.lastName?.charAt(0) || 'X'} />
          <div className="">
            <h4 className="mb-2 font-semibold">{quotedPost?.user?.firstName} {quotedPost?.user?.lastName}</h4>
            <p className="flex-auto m1-2 pb-4">{quotedPost?.postBody}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default PostAdd;