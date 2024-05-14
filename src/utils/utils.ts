import { faker } from '@faker-js/faker';
import { POSTERR_LOCAL_STORAGE_KEY, POSTERR_NUM_OF_POSTS } from '../api/constants';

function createFakeConfiguration() {
  let userData = JSON.parse(window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY) ?? '{}');

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
    userName: '',
  }

  user.userName = `@${faker.internet.userName(user.firstName, user.lastName)}`;

  const posts = Array.from({length: POSTERR_NUM_OF_POSTS}, () => {
    return {
      postBody: faker.hacker.phrase(),
      typeOfPost: faker.helpers.arrayElement(['post']),
      user: {
        userId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        isFollower: faker.datatype.boolean(),
        isFollowing: false,
        numOfFollowers: faker.datatype.number({min: 0, max: 150}),
        numOfFollowing: faker.datatype.number({min: 0, max: 150}),
        userName: '',
        posts: Array.from({length: POSTERR_NUM_OF_POSTS}, () => {
          return {
            postBody: faker.hacker.phrase(),
            typeOfPost: 'post'
          }
        }),
      }
    }
  });

  posts.map(post => {
    post.user = {
      ...post.user, 
      userName: `@${faker.internet.userName(post.user.firstName, post.user.lastName)}`
    }
  })
  

  return {
    ...user, posts
  }
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};


export { createFakeConfiguration, getInitials };
