import { POSTERR_LOCAL_STORAGE_KEY, POSTERR_NUM_OF_POSTS } from "../api/constants";
import { faker } from '@faker-js/faker';

function createFakeConfiguration() {
  let userData = JSON.parse(window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY));

  if (!userData) {
    userData = generateFirstUserData();
    window.localStorage.setItem(POSTERR_LOCAL_STORAGE_KEY, JSON.stringify(userData));
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
        isFollowing: false,
        numOfFollowers: faker.datatype.number({min: 0, max: 150}),
        numOfFollowing: faker.datatype.number({min: 0, max: 150}),
        posts: Array.from({length: POSTERR_NUM_OF_POSTS}, () => {
          return {
            postBody: faker.hacker.phrase(),
            typeOfPost: faker.helpers.arrayElement(['repost', 'quote', 'post'])
          }
        }),
      }
    }
  });

  return {
    ...user, posts
  }
}

const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};


export { createFakeConfiguration, getInitials };
