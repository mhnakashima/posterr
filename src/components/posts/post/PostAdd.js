import { useCallback, useState } from "react";
import { POSTERR_MAX_CHAR_POST_LENGTH, POSTERR_MIN_INPUT_LENGTH } from "../../../api/constants";
import { usePosts } from "../../../context/UserContext";
import Avatar from "../../avatar/Avatar";
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

  const validateSizeOfBody = useCallback((inputData) => {
    setBody(inputData);
  }, [body]);

  return (
    <div className="sm:mb-4" >
      <form className="flex flex-col w-full px-4" onSubmit={handleSubmit}>
        <div className="flex ">
          <div className="w-full">
            <textarea
              className="h-20 w-full p-4 outline-1 focus:outline-none"
              value={body}
              onChange={(e) => { validateSizeOfBody(e.target.value) }}
              placeholder={`${typeOfPost === 'quote' ? 'Add a comment' : 'Start posterring!!!'}`}
            />
          </div>
        </div>

        <div className="post--add--charbar my-2">
          <div className="bar w-full bg-gray-100 rounded-full h-1 dark:bg-gray-300">
            <div className={`tracking ${(Math.floor(((body.length || 0) / POSTERR_MAX_CHAR_POST_LENGTH) * 100) > 95 ? 'bg-red-500' : 'bg-blue-600')} h-1 rounded-full`} style={{
              width: `${Math.floor(((body.length || 0) / POSTERR_MAX_CHAR_POST_LENGTH) * 100)}%`
            }}>
            </div>
          </div>
        </div>

        <div className="post--add--send">
          <button
            disabled={body.length < 3 || body.length > POSTERR_MAX_CHAR_POST_LENGTH}
            className={`${body.length < POSTERR_MIN_INPUT_LENGTH || body.length > POSTERR_MAX_CHAR_POST_LENGTH ? 'opacity-50 cursor-not-allowed' : ''} flex justify-center items-center ring-1 ring-gray-300 ring-inset enabled:hover:bg-gray-200 enabled:active:bg-gray-300 enabled:hover:ring-gray-200 enabled:active:ring-gray-300 rounded-lg h-12 px-5 w-full relative`}>
            Posterr<PaperAirplaneIcon className="h-6 w-6 ml-2 text-gray-800 " />
          </button>
        </div>
      </form>
      <hr className="block border-t border-gray-200 my-4" />
    </div>
  );
}

export default PostAdd;