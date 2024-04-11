import { getInitials } from "../../utils/utils";

const Avatar = ({firstName, lastName}) => {
    return (
        <div className="avatar w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-">
            {getInitials(firstName, lastName)}
        </div>
    )
}

export default Avatar;