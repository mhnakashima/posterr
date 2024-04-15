import { useModal } from "../../context/ModalContext";
import { usePosts } from "../../context/PostsContext";
import FollowButton from "../follow/FollowButton";
import FollowData from "../follow/FollowData";
import PostQuote from "../posts/post/PostQuote";
import PostToolbar from "../posts/PostToolbar";
import Post from "../posts/view/Post";
import ProfileHeader from "./profileHeader/ProfileHeader";

const UserProfile = ({ userData }) => {

    const {
        onAddPost,
        onAddFollower
    } = usePosts();

    const { openModal, closeModal } = useModal();

    const handleOnClickFollowUser = (isFollowing) => {
        onAddFollower(userData?.userId, isFollowing);
        closeModal();
    }

    const addRepost = (body) => {
        const post = {
            postBody: body,
            user: userData,
            typeOfPost: 'repost'
        }

        onAddPost(post);
    }

    return (
        <>
            <div className="userProfile size-2/4 container mx-auto">
                <div className="px-4">
                    <div className="flex items-center">
                        {/* User Avatar */}
                        <ProfileHeader 
                            firstName={userData?.firstName || 'x'}
                            lastName={userData?.lastName || 'x'}
                            userName={userData?.userName || 'x'}
                        />

                        <div className="ml-auto">
                            <FollowButton
                                isFollowing={userData?.isFollowing}
                                onClickFollowUser={
                                    () => {
                                        handleOnClickFollowUser(userData?.isFollowing)
                                    }
                                }
                            />
                        </div>
                    </div>

                    <FollowData
                        numOfFollowers={userData?.numOfFollowers || 0}
                        numOfFollowing={userData?.numOfFollowing || 0}
                        numOfPosts={userData?.posts.length || 0}
                    />

                    <hr className="block border-t border-gray-200 my-4" />
                </div>

                <div className="h-64 overflow-y-auto mt-4">
                    <div className="px-0 sm:px-4">
                        <ul className="post--list">
                            {userData?.posts?.map((post, index) => (
                                <li
                                    key={`post-${userData?.userId}-${index}`}
                                >
                                    <Post 
                                        post={
                                            {
                                                ...post,
                                                user: {
                                                    firstName: userData?.firstName,
                                                    lastName: userData?.lastName,
                                                    userName: userData?.userName
                                                }
                                            }
                                        } 
                                        isDisabled={true} 
                                    />

                                    <PostToolbar
                                        quotePostCallback={() => {
                                            closeModal();
                                            openModal(<PostQuote
                                              post={{
                                                postBody: post.postBody,
                                                user: {
                                                    firstName: userData?.firstName,
                                                    lastName: userData?.lastName,
                                                    userName: userData?.userName
                                                },
                                                typeOfPost: 'quote'
                                              }} typeOfPost={'quote'} 
                                            />)
                                          }}
                                        repostCallback={() => { addRepost(post?.postBody) }}
                                    />

                                    <hr className="block border-t border-gray-200 my-1" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;