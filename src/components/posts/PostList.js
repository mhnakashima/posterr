import { Link } from "react-router-dom";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";
import Message from "../message/Message";
import { useEffect, useState } from "react";

const PostList = () => {
  const { profileInfo, posts, collection, onAddPost, onAddQuotedPost } = usePosts();
  const [postCollection, setPostCollection] = useState();

  const addRepost = (postBody) => {
    const post = {
      postBody,
      user: profileInfo,
      typeOfPost: 'repost'
    }

    onAddPost(post);
  }

  const addQuotePost = (quotedPost) => {
    const post = {
      postBody: quotedPost.postBody,
      user: quotedPost?.user,
      typeOfPost: 'quote'
    }

    onAddQuotedPost(post);
  }

  useEffect(() => {
    let updatedPosts;
    if (collection !== "following") {
      updatedPosts = posts;
    } else {
      updatedPosts = posts.filter(post => post.user?.isFollowing);
    }

    setPostCollection(updatedPosts);
  }, [posts, collection])

  return (
    <>
      {postCollection?.length > 0 ? (
        <ul>
          {postCollection?.map((post, i) => (
            <li className="rounded-md bg-gray-100 p-4 mb-4 hover:bg-gray-50" key={i}>
              <div className={`mb-3 text-sm ${(post?.user?.userId === profileInfo?.userId && post?.typeOfPost === 'repost') ||
                (post?.user?.userId === profileInfo?.userId && post?.typeOfPost === 'quote') ?
                'flex' : 'hidden'
                }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
                <span className={`ml-2`}>You reposterrted</span>
              </div>
              <div className="flex gap-4">
                <Link className={`post-toogle-link ${post?.user?.userId === profileInfo?.userId ? 'isDisabled' : ''} `} disabled={post?.user?.userId === profileInfo?.userId} to={`/profile/${post?.user?.userId}`}  >
                  <Avatar firstName={post?.user?.firstName?.charAt(0) || 'X'} lastName={post?.user?.lastName?.charAt(0) || 'X'} />
                </Link>
                <div className="">
                  <h4 className="mb-2 font-semibold">{post?.user?.firstName} {post?.user?.lastName}</h4>
                  <p className="flex-auto m1-2 pb-4">{post?.postBody}</p>
                </div>
              </div>
              {
                post?.quotedPost && (
                  <div className="flex bg-gray-200 p-4 my-3 rounded-md gap-4">
                    <Avatar firstName={post?.quotedPost?.user?.firstName?.charAt(0) || 'X'} lastName={post?.quotedPost?.user?.lastName?.charAt(0) || 'X'} />
                    <div className="">
                      <h4 className="mb-2 font-semibold">{post?.quotedPost?.user?.firstName} {post?.quotedPost?.user?.lastName}</h4>
                      <p className="flex-auto m1-2 pb-4">{post?.quotedPost?.postBody}</p>
                    </div>
                  </div>
                )
              }
              <div className="p-1 flex justify-end gap-2">
                <button onClick={() => { addRepost(post?.postBody) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Repost</button>
                <button onClick={() => { addQuotePost(post) }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Quote Post</button>
              </div>

            </li>
          ))}
        </ul>
      ) : (
        <Message />
      )}
    </>
  );
}

export default PostList;