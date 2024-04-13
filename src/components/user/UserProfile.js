import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";

const UserProfile = ({ userData }) => {

    const { profileInfo, onAddPost, onAddQuotedPost, onAddFollower } = usePosts();

    const addRepost = (body) => {
        const post = {
            postBody: body,
            user: profileInfo,
            typeOfPost: 'repost'
        }

        onAddPost(post);
    }

    const addQuotePost = (quotedPost) => {
        const post = {
            postBody: quotedPost.postBody,
            user: userData,
            typeOfPost: 'quote'
        }

        onAddQuotedPost(post);
    }

    const onClickFollowUser = (isFollowing) => {
        onAddFollower(userData.userId, isFollowing);
    }

    return (
        <div className="container mx-auto">
            <div className="mx-autobg-white overflow-hidden">
                {/* User Information */}

                <div className="flex p-2 items-center">
                    {/* User Avatar */}
                    <Avatar firstName={userData?.firstName} lastName={userData.lastName} />
                    {/* User Name */}
                    <div className="flex-1 ml-3">
                        <h2 className="text-medium mb-0">{userData.firstName} {userData.lastName}</h2>
                        <span className="inline-block bg-gray-600 text-white text-xs font-semibold rounded-full px-2 py-1">{userData.isFollowing ? 'Following' : 'Not Following'}</span>
                    </div>

                    <div className="flex self-end items-center">
                        {
                            userData.isFollowing ? (
                                <button onClick={() => onClickFollowUser(false)} className="flex bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                    <span className="ml-2">Unfollow</span>
                                </button>
                            ) : (
                                <button onClick={() => onClickFollowUser(true)} className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                    <span className="ml-2">Follow</span>
                                </button>
                            )
                        }
                    </div>
                </div>

                {/* Following, Followers, and Number of Posts Row */}
                <div className="bg-slate-50 p-2 grid grid-cols-3 gap-4">
                    {/* Number of Followers */}
                    <div className="text-center">
                        <span className="font-bold block">{userData.numOfFollowers || 0}</span>
                        <span className="text-gray-700 block">Followers</span>
                    </div>

                    {/* Number of Following */}
                    <div className="text-center">
                        <span className="font-bold block">{userData.numOfFollowing || 0}</span>
                        <span className="text-gray-700 block">Following</span>
                    </div>

                    {/* Number of Posts */}
                    <div className="text-center">
                        <span className="font-bold block">{userData.posts.length || 0}</span>
                        <span className="text-gray-700 block">Posts</span>
                    </div>
                </div>

                {/* User Posts */}
                <div className="h-64 overflow-y-auto">
                    <div className="p-4">
                        <ul>
                            {/* Loop through user posts */}
                            {userData.posts.map((post, index) => (
                                <li key={`post-${userData?.userId}-${index}`} className="user-post bg-gray-100 p-2 rounded-lg shadow sm:mb-4" >
                                    <div className="p-4">
                                        <h4 className="mb-2 font-semibold">{userData?.firstName} {userData.lastName}</h4>
                                        <p className="text-sm text-gray-700">{post.postBody}</p>
                                    </div>
                                    <div className="p-1 flex justify-end gap-2">
                                        <button onClick={() => { addRepost(post?.postBody) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Repost</button>
                                        <button onClick={() => { addQuotePost(post) }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Quote Post</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;