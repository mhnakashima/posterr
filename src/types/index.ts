export type PostType = 'repost' | 'quote' | 'post';

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
