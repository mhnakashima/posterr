import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"

const FollowButton = ({ 
    isFollowing, 
    onClickFollowUser 
}) => {
    return (

        <button
            onClick={() => onClickFollowUser()}
            className={`flex
                ${!isFollowing ? 'bg-blue-500 hover:bg-blue-700 border-blue-800' : 'bg-red-500 hover:bg-red-700 border-red-800'} 
                 text-white font-bold py-2 px-4 border rounded flex items-center"
            `}
        >

            {
                !isFollowing ? (
                    <div className="flex items-center text-white">
                        <PlusIcon className="w-4 h-4" />
                        <span className="ml-2">Follow</span>
                    </div>
                ) : (
                    <div className="flex items-center text-white">
                        <MinusIcon className="w-4 h-4" />
                        <span className="ml-2">Unfollow</span>
                    </div>
                )
            }

        </button>
    )
}

export default FollowButton;