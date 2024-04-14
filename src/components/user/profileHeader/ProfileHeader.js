import Avatar from "../../avatar/Avatar";

const ProfileHeader = ({firstName, lastName, userName}) => {
    return (
        <div className=" flex items-center">
            {/* User Avatar */}
            <Avatar firstName={firstName || 'x'} lastName={lastName || 'x'} />
            {/* User Name */}
            <div className="ml-2">
                <h2 className="text-medium font-semibold">{firstName || 'x'} {lastName || 'x'}</h2>
            </div>
            <span className="hidden sm:inline-block ml-2">{userName}</span>
        </div>
    )
}

export default ProfileHeader;