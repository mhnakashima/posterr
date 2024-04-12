import { getInitials } from "../../utils/utils";

const Avatar = ({firstName, lastName}) => {
    return (
        <div className="avatar w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
            {getInitials(firstName, lastName)}
        </div>
    )
}

export default Avatar;