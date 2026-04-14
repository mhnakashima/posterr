import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { usePosts } from '../../context/PostsContext';
import { useProfile } from '../../context/UserContext';
import { FeedCollection, PostType, type PostData } from '../../types';
import { LABELS, ROUTES } from '../../api/constants';
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
    if (collection === FeedCollection.Following) {
      updatedPosts = posts.filter((post) => post.user?.isFollowing);
    } else if (collection === FeedCollection.Reposts) {
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
      navigate(ROUTES.profile(userId));
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
        <ul aria-label="Posts feed" className="flex flex-col gap-px bg-gray-200/60 dark:bg-gray-800/60">
          {postCollection.map((post, i) => {
            const originalIndex = getOriginalIndex(post);
            const likes = post.likes ?? [];
            const isLiked = likes.includes(profileInfo.userId);
            const repostedBy = post.repostedBy ?? [];
            const isReposted = repostedBy.includes(profileInfo.userId);

            const repostedByLabel = isReposted ? LABELS.repostedBySelf : undefined;

            return (
              <li key={i} className="bg-white dark:bg-gray-900 list-none">
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
                            typeOfPost: PostType.Quote,
                          }}
                          typeOfPost={PostType.Quote}
                        />,
                      );
                    }}
                    repostCallback={() =>
                      onToggleRepost(originalIndex, profileInfo.userId)
                    }
                  />
                </Post>
              </li>
            );
          })}
        </ul>
      ) : (
        <section className="bg-white dark:bg-gray-900 p-4" aria-label="Empty feed">
          <MessageInfo
            messageInfoHeaderText={LABELS.emptyFeedTitle}
            messageInfoBodyText={LABELS.emptyFeedMessage}
          />
        </section>
      )}
    </>
  );
};

export default PostList;
