import { Link } from "react-router-dom";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";
import Message from "../message/Message";
import { useEffect, useState } from "react";
import { ArrowPathRoundedSquareIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

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
        <ul className="post--list">
          {postCollection?.map((post, i) => (
            <li className="px-0" key={i}>
              <div className="flex flex-col gap-3 p-4">
                <div className="post--header flex flex-wrap justify-between gap-3 ">
                  <div className="flex items-center">
                    <Link className={`post-toogle-link ${post?.user?.userId === profileInfo?.userId ? 'isDisabled' : ''} `} disabled={post?.user?.userId === profileInfo?.userId} to={`/profile/${post?.user?.userId}`}  >
                      <Avatar firstName={post?.user?.firstName?.charAt(0) || 'X'} lastName={post?.user?.lastName?.charAt(0) || 'X'} />
                    </Link>

                    <h4 className="post--header--name ml-4 text-body hover:opacity-75 active:opacity-50 hover:text-body font-medium">
                      {post?.user?.firstName} {post?.user?.lastName}
                    </h4>
                  </div>
                  {
                    /* Quote post - It will be create a Quote post */
                  }
                  <div className={`post--respost ${(post?.user?.userId === profileInfo?.userId && post?.typeOfPost === 'repost') ||
                    (post?.user?.userId === profileInfo?.userId && post?.typeOfPost === 'quote') ?
                    'flex items-center' : 'hidden'
                    } bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 rounded dark:bg-blue-900 dark:text-blue-300`}>
                    
                    <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                    <span className={`hidden text-xs sm:inline-block ml-2 `}>You reposterrted</span>
                  </div>
                </div>
                <div className="poster--body">
                  <p className="flex-auto m1-2 pb-4">{post?.postBody}</p>
                </div>
              </div>
              {
                post?.quotedPost && (
                  <>
                    <div className="flex flex-col gap-3 mx-3 p-3 border border-gray-200 rounded-xl">
                      <div className="post--header flex gap-3 items-center">
                        <Link className={`post-toogle-link ${post?.user?.userId === profileInfo?.userId ? 'isDisabled' : ''} `} disabled={post?.user?.userId === profileInfo?.userId} to={`/profile/${post?.user?.userId}`}  >
                          <Avatar firstName={post?.quotedPost?.user?.firstName?.charAt(0) || 'X'} lastName={post?.quotedPost?.user?.lastName?.charAt(0) || 'X'} />
                        </Link>
                        <div className="post--header--name">
                          <h4 className="font-semibold">{post?.quotedPost?.user?.firstName} {post?.quotedPost?.user?.lastName}</h4>
                        </div>
                      </div>
                      <div className="poster--body">
                        <p className="flex-auto m1-2 pb-4">{post?.quotedPost?.postBody}</p>
                      </div>
                    </div>
                  </>
                )
              }
              <div className="post--toolbar flex text-sm h-8 items-center justify-around mt-3">
                <button onClick={() => { addQuotePost(post) }} className="button flex justify-center items-center hover:opacity-50 active:opacity-25 relative">
                  <ChatBubbleLeftRightIcon aria-label="quote" className="h-6 w-6 text-gray-800" />
                  <span className="hidden sm:inline-block ml-2 ">Quote Post</span>
                </button>
                <button onClick={() => { addRepost(post?.postBody) }} className="button flex justify-center items-center hover:opacity-50 active:opacity-25 relative">
                  <ArrowPathRoundedSquareIcon aria-label="repost" className="h-6 w-6 text-gray-800 " />
                  <span className="hidden sm:inline-block ml-2 ">Repost</span>
                </button>
              </div>

              <hr class="block border-t border-gray-200 my-4" />
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