import {
  POSTERR_LOCAL_STORAGE_KEY,
  POSTERR_NUM_OF_POSTS,
} from '../api/constants';
import { PostType, type PostData, type UserData } from '../types';

async function createFakeConfiguration(): Promise<UserData> {
  const stored = window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored) as UserData;
    if (parsed && parsed.userId) return parsed;
  }

  const { faker } = await import('@faker-js/faker');
  const userData = generateFirstUserData(faker);
  window.localStorage.setItem(
    POSTERR_LOCAL_STORAGE_KEY,
    JSON.stringify(userData),
  );
  return userData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateFirstUserData = (faker: any): UserData => {
  const user: UserData = {
    userId: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: '',
  };

  user.userName = `@${faker.internet.userName(user.firstName, user.lastName)}`;

  const posts: PostData[] = Array.from(
    { length: POSTERR_NUM_OF_POSTS },
    () => {
      const postUser: UserData = {
        userId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        isFollower: faker.datatype.boolean(),
        isFollowing: false,
        numOfFollowers: faker.datatype.number({ min: 0, max: 150 }),
        numOfFollowing: faker.datatype.number({ min: 0, max: 150 }),
        userName: '',
        posts: Array.from({ length: POSTERR_NUM_OF_POSTS }, () => ({
          postBody: faker.hacker.phrase(),
          typeOfPost: PostType.Post,
          user: {} as UserData,
        })),
      };

      postUser.userName = `@${faker.internet.userName(
        postUser.firstName,
        postUser.lastName,
      )}`;

      return {
        postBody: faker.hacker.phrase(),
        typeOfPost: PostType.Post,
        user: postUser,
      };
    },
  );

  return { ...user, posts };
};

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export { createFakeConfiguration, getInitials };
