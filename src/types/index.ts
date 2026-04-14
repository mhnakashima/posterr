export enum PostType {
  Post = 'post',
  Quote = 'quote',
  Repost = 'repost',
}

export enum FeedCollection {
  All = 'all',
  Following = 'following',
  Reposts = 'reposts',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum FollowTab {
  Followers = 'followers',
  Following = 'following',
}

export enum AvatarSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  isFollower?: boolean;
  isFollowing?: boolean;
  numOfFollowers?: number;
  numOfFollowing?: number;
  posts?: PostData[];
}

export interface PostData {
  postBody: string;
  typeOfPost: PostType;
  user: UserData;
  quotedPost?: PostData;
  likes?: string[];
  repostedBy?: string[];
}
