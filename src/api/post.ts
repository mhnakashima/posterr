/*
    = TODO - the application has been developed using pure ReactJS
    we are not using typescript but this api files is for API reference
*/

type PostType = {
    typeOfPost: 'repost' | 'quote' | 'post';
}

interface Post{
    userId: string;
    postBody?: string;
    typeOfPost: PostType;
}