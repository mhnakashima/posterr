# posterr
/* Poster microblog app */


### Pages

**Homepage**

- The homepage, by default, will show a feed of all posts, from all users - ok
- There is a toggle switch "All / following" that allows you to switch between seeing all posts and just posts by those you follow. For both views, all kinds of posts are expected on the feed (regular posts, reposts, and quote posts) - ok
    - The URL should change when toggling between  "All / following"
    - If you open the page fresh, by typing the URL for "All" or "Following" in the browser, it should show the properly unfiltered or filtered page. ok
- New posts can be written from this page. ok

**User profile page**

- This page should be a modal over the homepage
- The URL should change when visiting this page
- Shows data about the user:
    - Username
    - Date joined Posterr, formatted as such: "March 25, 2021"
    - Number of followers
    - Number following
    - Count of number of posts the user has made (including reposts and quote posts)
- Shows a feed of all posts the user has made (including reposts and quote posts)
- Shows whether you follow the user or not
- Follow/unfollow actions:
    - You can follow the user by clicking "Follow" on their profile
    - You can unfollow the user by clicking "Unfollow" on their profile
- New posts can be written from this page
    - While on the profile page, the profile's user should be the author of any content created (posts, reports, quote-posts)

### More Details

**Users**

- Only alphanumeric characters can be used for username
- Maximum 14 characters for username
- When/if necessary to make your application function, you may hard-code the default user. For example, you may need to do this to implement creating new posts from the home page, following, etc

**Posts**

Posts are the equivalent of Twitter's tweets. They are text-only, user-generated content. Users can write original posts and interact with other users' posts by reposting or quote-posting. For this project, you should implement all three — original posts, reposts, and quote-posting

- Users are not allowed to post more than 5 posts in one day (including reposts and quote posts)
- Posts can have a maximum of 777 characters
- When writing a post, a user should see how many characters he has left
- Users cannot update or delete their posts
- Reposting: Users can repost other users' posts (like Twitter Retweet)
- Quote-post: Users can repost other user's posts and leave a comment along with it (like Twitter Quote Tweet)

**Following**

- Users should be able to follow other users
- Users cannot follow themselves
- Following and unfollowing will be done only on the user profile page

### Extra **feature: Search**

Only work on this extra feature if you have enough time to complete the required features and get through all three phases of the test.

- Implement a search feature that allows users to efficiently search through all posts
- This search feature should not return reposts
- This search feature should return quote posts, but only if the search matches the additional text added (do **not** return matches from the original post that was quoted on top of)
- (For Phase 2) This search feature should return reply-to-posts
