import { useEffect, useState } from "react";
import { usePosts } from "../../context/UserContext";
import Avatar from "../avatar/Avatar";
import FollowData from "../follow/FollowData";

const Profile = () => {

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
                <Avatar firstName={profileInfo?.firstName || 'x'} lastName={profileInfo?.lastName || 'x'} />
                {/* User Name */}
                <div className="ml-2">
                    <h2 className="text-medium font-semibold">{profileInfo?.firstName || 'x'} {profileInfo.lastName || 'x'}</h2>
                </div>
                <span className="ml-2">{profileInfo.userName}</span>
            </div>

            {/* Following, Followers, and Number of Posts Row */}
            <FollowData
                numOfFollowers={numOfFollowers || 0}
                numOfFollowing={numOfFollowing || 0}
                numOfPosts={numOfPosts || 0}
            />

        </section>
    )
}

export default Profile;