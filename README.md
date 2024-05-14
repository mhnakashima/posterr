# posterr
/* 
    Posterr = Microblog app - Do your posterring  
*/

# How to run
Posterr has been created using React and what do you need to run
the application is: 

- Download the code
- Descompact the zip
- command line on the folder application 
- npm i
- After all packages installed, run npm run start
- The application should run over localhost:3000

P.S: You should have Node / npm installed (consider install NVM to manage Node versions)

# Phase 2 - Planning

## Questions regarding the functionality
- Will it be possible to reply more than 1 user per time?
- Would I able to mentioning more than 1 user?
- How user is going to know when someone has "mentioned" him?
- Are we going to implement a kind of notification to alert when user is mentioned?
- It will be a extra effort, do we have this planned already?
    - Do we have a Real Time database purchased?
    - Is there a dev, stage, prod env keys?
        - If yes, are the keys available?
        - else we are going to use a kind of checking by cycles from how many seconds?  

## About the implementation
- For mentioning it will be necessary to have a real time database to observe any mention that
could be made by some user 
- It should be created a new URL, when it accessed show a list of posts, using the array of posts
that has been created already, it is possible to create a type of post called "mention" filtering
posts when call api by this kind of filter
- When a notification come, indicating that has been created a mention, it should show on notifications
list with a red bullet indicating that is a new notification and listing, when the user clicks, show all mentions.
- It will be created a page component to handle with mention posts, it will should be similar a Post Page.

# Phase 3 - Critique & scaling
- I would like to do changes on components, refactoring, and making minor components to be more generic
- It should be good remove dependencies of calling usePosts context, the components don't need to know what's happening on
contexts, it should deal only with dispatch and receiving information and data.
- Create a better structure for css, tailwind is a reat CSS framework but sometimes not readiable
- Create a User Provider to deal only with User context related content
- Refactor components to dispatch events instead of dealing direct with context
- The first part will be down if the application scale, increased the number of users, it will be related to posts, I was getting all posts from "database" with user informantion, and on this user information, retriving a list of posts made by him, this is not a good perfomance practice
and it removing the responsability of API to deal only to get the necessary information regarding posts.
- It should be created api's to deal with getting posts, users.
- It should be good to CDN or provide cached assets and html / css files.
- It is nice to have a Continuous delivery, with that configurated pipelines to deal with environments that the application is going to use
- This application can be divided in minor parts of code and every part can have its own deploy process
(It might be done using module federalization).
- It's nice to have repo with generic components (Storybook is a good approach)
 