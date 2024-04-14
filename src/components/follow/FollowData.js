const FollowData = ({numOfFollowers, numOfFollowing, numOfPosts}) => {
    return (
        <div className="bg-slate-50 p-2 grid grid-cols-3 gap-4">
            {/* Number of Followers */}
            <div className="text-center border-r border-gray-200">
                <span className="font-bold block">{numOfFollowers}</span>
                <span className="text-gray-700 block">Followers</span>
            </div>

            {/* Number of Following */}
            <div className="text-center border-r border-gray-200">
                <span className="font-bold block">{numOfFollowing}</span>
                <span className="text-gray-700 block">Following</span>
            </div>

            {/* Number of Posts */}
            <div className="text-center">
                <span className="font-bold block">{numOfPosts}</span>
                <span className="text-gray-700 block">Posts</span>
            </div>
        </div>
    )
}

export default FollowData;