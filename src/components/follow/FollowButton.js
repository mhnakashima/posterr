import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"

const FollowButton = ({ isFollowing, onClickFollowUser }) => {
    console.log(isFollowing, 'isFollowing');
    return (

        <button
            onClick={() => onClickFollowUser()}
            className={`flex
                ${!isFollowing ? 'bg-blue-500 hover:bg-blue-700 border-blue-800' : 'bg-red-500 hover:bg-red-700 border-red-800'} 
                 text-white font-bold py-2 px-4 border rounded"
            `}
        >

            {
                isFollowing ? (
                    <>
                        <PlusIcon />
                        <span className="ml-2">Unfollow</span>
                    </>
                ) : (
                    <>
                        <MinusIcon />
                        <span className="ml-2">Follow</span>
                    </>
                )
            }

        </button>
    )
}

export default FollowButton;