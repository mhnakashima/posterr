import { getInitials } from "../../utils/utils";

const Avatar = ({firstName, lastName}) => {
    return (
        <div className="avatar w-8 h-8 text-sm rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ">
            {getInitials(firstName, lastName)}
        </div>
    )
}

export default Avatar;