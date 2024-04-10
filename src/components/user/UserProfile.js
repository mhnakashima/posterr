import Avatar from "../avatar/Avatar";

const UserProfile = ({ userData }) => {
    return (
        <div className="container mx-auto">
            <div className="max-w-sm mx-autobg-white overflow-hidden">
                {/* User Information */}

                <div className="p-2 flex items-center">
                    {/* User Avatar */}
                    <Avatar firstName={userData?.firstName} lastName={userData.lastName} />
                    {/* User Name */}
                    <div>
                        <h2 className="text-xl font-bold mb-0">{userData.firstName} {userData.lastName}</h2>
                        <p className="text-gray-700">{userData.isFollowing ? 'Following' : 'Not Following'}</p>
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
                                <li key={`post-${userData?.userId}-${index}`} className="user-post mb-4" >
                                    <div className="bg-gray-100 p-2 rounded-lg shadow">
                                        <h4 className="font-semibold">{post.title}</h4>
                                        <p className="text-sm text-gray-700">{post.postBody}</p>
                                    </div>
                                    <div className="p-1 flex justify-between">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Repost</button>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Quote Post</button>
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