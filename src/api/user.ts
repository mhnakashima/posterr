/*
    = TODO - the application has been developed using pure ReactJS
    we are not using typescript but this api files is for API reference
*/

import './post';
import { UserPosterrInfo } from './userPosterrInfo';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    posts: Array<Post>;
    userPosterrInfo: UserPosterrInfo;
}

type UserId = Pick<User, "userId">;

export { User, UserId };