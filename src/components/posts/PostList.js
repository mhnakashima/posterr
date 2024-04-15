import React, { useCallback, useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { usePosts } from "../../context/PostsContext";
import UserProfile from "../user/UserProfile";
import PostToolbar from "./PostToolbar";
import Post from "./view/Post";
import Quote from "./view/Quote";
import MessageInfo from "../message/MessageInfo";
import PostQuote from "./post/PostQuote";
import { useProfile } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const { profileInfo } = useProfile();
  const { posts, collection, onAddPost } = usePosts();
  const [postCollection, setPostCollection] = useState();
  const { openModal, isOpenModal } = useModal();
  const navigate = useNavigate();

  const addRepost = (postBody) => {
    const post = {
      postBody,
      user: profileInfo,
      typeOfPost: 'repost'
    }

    onAddPost(post);
  }

  useEffect(() => {
    let updatedPosts;
    if (collection !== "following") {
      updatedPosts = posts;
    } else {
      updatedPosts = posts.filter(post => post.user?.isFollowing);
    }

    setPostCollection(updatedPosts);
  }, [posts, collection, isOpenModal])

  const setProfileRoute = useCallback((profileId) => {
    navigate(`/profile/${profileId}`);
  }, [navigate]);

  return (
    <>
      {postCollection?.length > 0 ? (
        <ul className="post--list">
          {postCollection?.map((post, i) => (
            <li className="px-0" key={i}>
              <Post
                post={post}
                isDisabled={post?.user?.userId === profileInfo?.userId}
                onClickCallback={() => { 
                  setProfileRoute(post?.user?.userId);
                  openModal(<UserProfile userData={post?.user} />) 
                }}
              />
              {
                post?.quotedPost && (
                  <Quote
                    post={post?.quotedPost}
                    isDisabled={post?.user?.userId === profileInfo?.userId}
                    onClickCallback={() => { openModal(<UserProfile userData={post?.user} />) }}
                  />
                )
              }

              <PostToolbar
                quotePostCallback={() => {
                  setProfileRoute(post?.user?.userId);
                  openModal(<PostQuote
                    post={{
                      postBody: post.postBody,
                      user: post?.user,
                      typeOfPost: 'quote'
                    }} typeOfPost={'quote'}
                  />)
                }}
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