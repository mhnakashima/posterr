import { useState } from "react";
import { usePosts } from "../../context/UserContext";

function PostAdd() {
  const { onAddPost } = usePosts();
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body) return;
    onAddPost({ body });
    setBody("");
  };

  return (
    <div className="mb-4 rounded-md bg-gray-100" >
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Add post</button>
      </form>
    </div>
  );
}

export default PostAdd;