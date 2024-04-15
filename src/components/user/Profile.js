import { useEffect, useState } from "react";
import { usePosts } from "../../context/PostsContext";
import FollowData from "../follow/FollowData";
import ProfileHeader from "./profileHeader/ProfileHeader";
import { useProfile } from "../../context/UserContext";

const Profile = () => {

    const { posts } = usePosts();
    const [numOfFollowers, setNumOfFollowers] = useState(0);
    const [numOfFollowing, setNumOfFollowing] = useState(0);
    const [numOfPosts, setNumOfPosts] = useState(0);
    const { profileInfo } = useProfile();

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
            
            <ProfileHeader 
                firstName={profileInfo?.firstName || 'x'}
                lastName={profileInfo?.lastName || 'x'}
                userName={profileInfo?.userName || 'x'}
            />

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