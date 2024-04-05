import { User } from "./user";

interface UserPosterrInfo {
    joinedDate: Date;
    followers: Array<User>;
    following: Array<User>;
}

export { UserPosterrInfo };