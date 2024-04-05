import { POSTERR_LOCAL_STORAGE_KEY, POSTERR_NUM_OF_POSTS, POSTERR_USER_POST_FAKE_RATE } from "../api/constants";
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
      userId: faker.datatype.number({min: 0, max: 100}) >= POSTERR_USER_POST_FAKE_RATE ? user.userId : faker.datatype.uuid(),
      postBody: faker.hacker.phrase(),
      typeOfPost: faker.helpers.arrayElement(['repost', 'quote', 'post'])
    }
  });

  const userPosterrInfo = {
    joinedDate: faker.date.between('2022-01-01T00:00:00.000Z', Date.now()),
    following: posts.filter(post => user.userId !== post.userId).map(post => post.userId),
    followers: posts.filter(post => user.userId !== post.userId).map(post => post.userId),
  }

  return {
    ...user, posts, userPosterrInfo
  }
}

export { createFakeConfiguration };
