function createUserData(numOfPosts) {
    
    const howManyPosts = numOfPosts ? numOfPosts : process.env.NODE_ENV === 'development' ? process.env.POSTERR_DEV_DEFAULT_POSTERR_NUMBER : process.env.POSTERR_PROD_DEFAULT_POSTERR_NUMBER; 
    let userData = JSON.parse(window.localStorage.getItem(POSTERR_LOCAL_STORAGE_KEY));

    if(!userData){

    }
    
    return userData;
  }

  export { createUserData };
  