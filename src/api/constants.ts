import { FeedCollection } from '../types';

export const APP_NAME = 'Posterr';

export const POSTERR_LOCAL_STORAGE_KEY = 'posterr_local_storage';
export const THEME_STORAGE_KEY = 'posterr-theme';

export const POSTERR_NUM_OF_POSTS = 25;
export const POSTERR_USER_POST_FAKE_RATE = 75;
export const POSTERR_IS_TESTING = true;
export const POSTERR_MIN_INPUT_LENGTH = 5;
export const POSTERR_POST_PER_DAY_LENGTH = 5;
export const POSTERR_MAX_CHAR_POST_LENGTH = 777;

export const CHAR_LIMIT_WARNING_PERCENT = 95;
export const BLUR_COLLAPSE_DELAY_MS = 150;
export const FOLLOWER_AVATAR_PREVIEW_COUNT = 3;

export const DARK_CLASS_NAME = 'dark';
export const PREFERS_DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const MODAL_ROOT_SELECTOR = '#modal-root';
export const AVATAR_FALLBACK_INITIAL = 'X';

export const ROUTES = {
  feed: (collection: FeedCollection) => `/${collection}`,
  profile: (userId: string) => `/profile/${userId}`,
  profilePattern: '/profile/:userId',
  collectionPattern: '/:collection',
  home: `/${FeedCollection.All}`,
} as const;

export const LABELS = {
  repostedBySelf: 'You reposted',
  emptyFeedTitle: 'Information',
  emptyFeedMessage:
    "There's no post available. What do you think to click on all posts and see what the community has been posting?",
  noPostsYet: 'No posts yet.',
  userNotFound: 'User not found.',
  follow: 'Follow',
  unfollow: 'Unfollow',
  quotePost: 'Quote Post',
  repost: 'Repost',
  undoRepost: 'Undo Repost',
  lightMode: 'Light mode',
  darkMode: 'Dark mode',
} as const;
