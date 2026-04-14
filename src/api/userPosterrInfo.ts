import type { UserData } from '../types';

export interface UserPosterrInfo {
  joinedDate: Date;
  followers: UserData[];
  following: UserData[];
}
