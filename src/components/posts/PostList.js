import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { usePosts } from "../../context/UserContext";
import UserProfile from "../user/UserProfile";
import PostToolbar from "./PostToolbar";
import Post from "./view/Post";
import Quote from "./view/Quote";
import MessageInfo from "../message/MessageInfo";

const PostList = () => {
  const { profileInfo, posts, collection, onAddPost, onAddQuotedPost } = usePosts();
  const [postCollection, setPostCollection] = useState();
  const { openModal } = useModal();

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
              <Post
                post={post}
                isDisabled={post?.user?.userId === profileInfo?.userId}
                onClickCallback={() => { openModal(<UserProfile userData={post?.user} />) }}
              />
              {
                post?.quotedPost && (
                  <Quote
                    post={post}
                    isDisabled={post?.user?.userId === profileInfo?.userId}
                    onClickCallback={() => { openModal(<UserProfile userData={post?.user} />) }}
                  />
                )
              }

              <PostToolbar
                quotePostCallback={() => { addQuotePost(post) }}
                repostCallback={() => { addRepost(post?.postBody) }} 
              />

              <hr className="block border-t border-gray-200 my-4" />
            </li>
          ))}
        </ul>
      ) : (
        <MessageInfo 
          messageInfoHeaderText={'Information'}
          messageInfoBodyText={"There's no post available. What do you think to click on all posts and see what the community has been posting?"}
        />
      )}
    </>
  );
}

export default PostList;