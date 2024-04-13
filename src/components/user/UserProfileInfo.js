import { useEffect, useState } from "react";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";

const UserProfileInfo = () => {

    const { profileInfo, posts } = usePosts();
    const [numOfFollowers, setNumOfFollowers] = useState(0);
    const [numOfFollowing, setNumOfFollowing] = useState(0);
    const [numOfPosts, setNumOfPosts] = useState(0);

    useEffect(() => {
        if (!posts) {
            return;
        }

        setNumOfFollowing(posts?.filter(post => post?.user?.isFollowing).length);
        setNumOfFollowers(posts?.filter(post => post?.user?.isFollower).length);
        setNumOfPosts(posts?.filter(post => post?.user?.userId === profileInfo.userId).length);

    }, [posts, profileInfo])

    return (
        <section className="flex flex-col gap-3 p-4">
            <div className=" flex items-center">
                {/* User Avatar */}
                <Avatar firstName={profileInfo?.firstName} lastName={profileInfo.lastName} />
                {/* User Name */}
                <div className="ml-2">
                    <h2 className="text-medium font-semibold">{profileInfo.firstName} {profileInfo.lastName}</h2>
                </div>
            </div>

            {/* Following, Followers, and Number of Posts Row */}
            <div className="py-2 grid grid-cols-3 gap-4">
                {/* Number of Followers */}
                <div className="text-center border-r border-gray-200">
                    <span className="font-bold block">{numOfFollowers || 0}</span>
                    <span className="text-gray-700 block">Followers</span>
                </div>

                {/* Number of Following */}
                <div className="text-center border-r border-gray-200">
                    <span className="font-bold block">{numOfFollowing || 0}</span>
                    <span className="text-gray-700 block">Following</span>
                </div>

                {/* Number of Posts */}
                <div className="text-center">
                    <span className="font-bold block">{numOfPosts || 0}</span>
                    <span className="text-gray-700 block">Posts</span>
                </div>
            </div>
        </section>
    )
}

export default UserProfileInfo;