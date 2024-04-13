import { useState } from "react";
import { POSTERR_MIN_INPUT_LENGTH } from "../../api/constants";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

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
    <div className="sm:mb-4" >
      <form className="flex flex-col w-full px-4" onSubmit={handleSubmit}>
        <div className="flex ">
          <div className="w-full">
            <textarea
              className="h-20 w-full p-4 outline-1 focus:outline-none"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`${typeOfPost === 'quote' ? 'Add a comment' : 'Start posterring!!!'}`}
            />
          </div>
        </div>
        <button
          disabled={body.length < 3}
          className={`${body.length < POSTERR_MIN_INPUT_LENGTH ? 'opacity-50 cursor-not-allowed' : ''} flex justify-center items-center ring-1 ring-gray-300 ring-inset enabled:hover:bg-gray-200 enabled:active:bg-gray-300 enabled:hover:ring-gray-200 enabled:active:ring-gray-300 rounded-lg h-12 px-5 w-full relative`}>
          Posterr<PaperAirplaneIcon className="h-6 w-6 ml-2 text-gray-800 " />
        </button>
      </form>
      {/* 
      {!!quotedPost && (
        <div className="post--quoted flex gap-4 p-4">
          <Avatar firstName={quotedPost?.user?.firstName?.charAt(0) || 'X'} lastName={quotedPost?.user?.lastName?.charAt(0) || 'X'} />
          <div className="">
            <h4 className="mb-2 font-semibold">{quotedPost?.user?.firstName} {quotedPost?.user?.lastName}</h4>
            <p className="flex-auto m1-2 pb-4">{quotedPost?.postBody}</p>
          </div>
        </div>
      )}
      */}
      <hr class="block border-t border-gray-200 my-4" />
    </div>
  );
}

export default PostAdd;