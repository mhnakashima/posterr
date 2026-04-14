import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { usePosts } from '../../context/PostsContext';
import { useProfile } from '../../context/UserContext';
import type { PostData } from '../../types';
import PostToolbar from './PostToolbar';
import Post from './view/Post';
import Quote from './view/Quote';
import MessageInfo from '../message/MessageInfo';
import PostQuote from './post/PostQuote';

const PostList = () => {
  const { profileInfo } = useProfile();
  const { posts, collection, onToggleLike, onToggleRepost } = usePosts();
  const [postCollection, setPostCollection] = useState<PostData[]>([]);
  const { openModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    let updatedPosts: PostData[];
    if (collection === 'following') {
      updatedPosts = posts.filter((post) => post.user?.isFollowing);
    } else if (collection === 'reposts') {
      updatedPosts = posts.filter((post) =>
        post.repostedBy?.includes(profileInfo.userId),
      );
    } else {
      updatedPosts = posts;
    }

    setPostCollection(updatedPosts);
  }, [posts, collection, profileInfo.userId]);

  const goToProfile = useCallback(
    (userId: string) => {
      navigate(`/profile/${userId}`);
    },
    [navigate],
  );

  const getOriginalIndex = useCallback(
    (post: PostData) => {
      return posts.indexOf(post);
    },
    [posts],
  );

  return (
    <>
      {postCollection?.length > 0 ? (
        <div className="flex flex-col gap-px bg-gray-200/60 dark:bg-gray-800/60">
          {postCollection.map((post, i) => {
            const originalIndex = getOriginalIndex(post);
            const likes = post.likes ?? [];
            const isLiked = likes.includes(profileInfo.userId);
            const repostedBy = post.repostedBy ?? [];
            const isReposted = repostedBy.includes(profileInfo.userId);

            const repostedByLabel = isReposted ? 'You reposted' : undefined;

            return (
              <div key={i} className="bg-white dark:bg-gray-900">
                <Post
                  post={post}
                  isDisabled={post?.user?.userId === profileInfo?.userId}
                  onClickCallback={() => goToProfile(post.user.userId)}
                  repostedByLabel={repostedByLabel}
                >
                  {post?.quotedPost && (
                    <Quote
                      post={post.quotedPost}
                      isDisabled={post?.user?.userId === profileInfo?.userId}
                      onClickCallback={() => goToProfile(post.user.userId)}
                    />
                  )}

                  <PostToolbar
                    likeCount={likes.length}
                    isLiked={isLiked}
                    onToggleLike={() =>
                      onToggleLike(originalIndex, profileInfo.userId)
                    }
                    isReposted={isReposted}
                    repostCount={repostedBy.length}
                    quotePostCallback={() => {
                      openModal(
                        <PostQuote
                          post={{
                            postBody: post.postBody,
                            user: post?.user,
                            typeOfPost: 'quote',
                          }}
                          typeOfPost="quote"
                        />,
                      );
                    }}
                    repostCallback={() =>
                      onToggleRepost(originalIndex, profileInfo.userId)
                    }
                  />
                </Post>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 p-4">
          <MessageInfo
            messageInfoHeaderText="Information"
            messageInfoBodyText="There's no post available. What do you think to click on all posts and see what the community has been posting?"
          />
        </div>
      )}
    </>
  );
};

export default PostList;
