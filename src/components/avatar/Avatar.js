import { getInitials } from "../../utils/utils";

const Avatar = ({firstName, lastName}) => {
    return (
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-lg">
            {getInitials(firstName, lastName)}
        </div>
    )
}

export default Avatar;