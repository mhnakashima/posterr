import { POSTERR_LOCAL_STORAGE_KEY, POSTERR_NUM_OF_POSTS } from "../api/constants";
import { faker } from '@faker-js/faker';

function createFakeConfiguration() {
  let userData = JSON.parse(window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY));

  if (!userData) {
    userData = generateFirstUserData();
  }

  return userData;
}

const generateFirstUserData = () => {
  const user = {
    userId: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }

  const posts = Array.from({length: POSTERR_NUM_OF_POSTS}, () => {
    return {
      postBody: faker.hacker.phrase(),
      typeOfPost: faker.helpers.arrayElement(['repost', 'quote', 'post']),
      user: {
        userId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        isFollower: faker.datatype.boolean(),
        isFollowing: faker.datatype.boolean()
      }
    }
  });

  return {
    ...user, posts
  }
}

export { createFakeConfiguration };
