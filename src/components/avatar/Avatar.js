import { getInitials } from "../../utils/utils";

const Avatar = ({firstName, lastName}) => {
    return (
        <div className="avatar w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-">
            {getInitials(firstName, lastName)}
        </div>
    )
}

export default Avatar;