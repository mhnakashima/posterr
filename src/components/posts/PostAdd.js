import { useState } from "react";
import { usePosts } from "../../context/UserContext";

function PostAdd() {
    const { onAddPost } = usePosts();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    const handleSubmit = function (e) {
      e.preventDefault();
      if (!body || !title) return;
      onAddPost({ title, body });
      setTitle("");
      setBody("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Add post</button>
      </form>
    );
  }

  export default PostAdd;