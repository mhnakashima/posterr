import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { POSTERR_LOCAL_STORAGE_KEY } from '../api/constants';
import { FeedCollection, type PostData, type UserData } from '../types';

interface PostsContextValue {
  posts: PostData[];
  quotedPost: PostData | undefined;
  collection: FeedCollection;
  onAddPost: (post: PostData) => void;
  onAddQuotedPost: (post: PostData) => void;
  onClearPosts: () => void;
  onAddFollower: (userId: string, isFollowing: boolean) => void;
  onToggleLike: (postIndex: number, userId: string) => void;
  onToggleRepost: (postIndex: number, userId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCollection: (collection: FeedCollection) => void;
}

const PostsContext = createContext<PostsContextValue | undefined>(undefined);

interface PostsProviderProps {
  userProfile: UserData;
  children: ReactNode;
}

const PostsProvider = ({ userProfile, children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [collection, setCollection] = useState<FeedCollection>(FeedCollection.All);
  const [quotedPost, setQuotedPost] = useState<PostData | undefined>(undefined);
  const [user] = useState<UserData>(userProfile);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const postCollection: PostData[] = parsed?.posts ?? [];
      setPosts(postCollection);
    }
  }, []);

  const searchedPosts = useMemo(() => {
    if (!posts) return [];
    if (searchQuery.length === 0) return posts;
    return posts.filter((post) =>
      post.postBody.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [posts, searchQuery]);

  const saveData = useCallback(
    (updatedPosts: PostData[]) => {
      const objectToSave = { ...user, posts: updatedPosts };
      window.localStorage.setItem(
        POSTERR_LOCAL_STORAGE_KEY,
        JSON.stringify(objectToSave),
      );
    },
    [user],
  );

  const handleAddPost = useCallback(
    (post: PostData) => {
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      saveData(updatedPosts);
    },
    [posts, saveData],
  );

  const handleQuotedPost = (post: PostData) => {
    setQuotedPost(post);
  };

  const handleClearPosts = () => {
    setPosts([]);
  };

  const handleAddFollower = useCallback(
    (userId: string, isFollowing: boolean) => {
      const updatedPosts = posts.map((post) => {
        if (post.user.userId === userId) {
          return {
            ...post,
            user: { ...post.user, isFollowing: !isFollowing },
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      saveData(updatedPosts);
    },
    [posts, saveData],
  );

  const handleToggleLike = useCallback(
    (postIndex: number, userId: string) => {
      const updatedPosts = posts.map((post, i) => {
        if (i !== postIndex) return post;

        const currentLikes = post.likes ?? [];
        const alreadyLiked = currentLikes.includes(userId);

        return {
          ...post,
          likes: alreadyLiked
            ? currentLikes.filter((id) => id !== userId)
            : [...currentLikes, userId],
        };
      });

      setPosts(updatedPosts);
      saveData(updatedPosts);
    },
    [posts, saveData],
  );

  const handleToggleRepost = useCallback(
    (postIndex: number, userId: string) => {
      const updatedPosts = posts.map((post, i) => {
        if (i !== postIndex) return post;

        const current = post.repostedBy ?? [];
        const alreadyReposted = current.includes(userId);

        return {
          ...post,
          repostedBy: alreadyReposted
            ? current.filter((id) => id !== userId)
            : [...current, userId],
        };
      });

      setPosts(updatedPosts);
      saveData(updatedPosts);
    },
    [posts, saveData],
  );

  const value = useMemo<PostsContextValue>(
    () => ({
      posts: searchedPosts,
      quotedPost,
      collection,
      onAddPost: handleAddPost,
      onAddQuotedPost: handleQuotedPost,
      onClearPosts: handleClearPosts,
      onAddFollower: handleAddFollower,
      onToggleLike: handleToggleLike,
      onToggleRepost: handleToggleRepost,
      searchQuery,
      setSearchQuery,
      setCollection,
    }),
    [
      collection,
      quotedPost,
      handleAddPost,
      handleAddFollower,
      handleToggleLike,
      handleToggleRepost,
      searchedPosts,
      searchQuery,
    ],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

const usePosts = (): PostsContextValue => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('PostsContext was used outside of the PostsProvider');
  }
  return context;
};

export { usePosts, PostsProvider };
