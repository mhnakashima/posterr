import Avatar from '../../avatar/Avatar';
import { AVATAR_FALLBACK_INITIAL } from '../../../api/constants';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  userName: string;
}

const ProfileHeader = ({ firstName, lastName, userName }: ProfileHeaderProps) => {
  return (
    <header className="flex items-center">
      <Avatar firstName={firstName || AVATAR_FALLBACK_INITIAL} lastName={lastName || AVATAR_FALLBACK_INITIAL} />
      <div className="ml-2">
        <h2 className="text-medium font-semibold">
          {firstName || AVATAR_FALLBACK_INITIAL} {lastName || AVATAR_FALLBACK_INITIAL}
        </h2>
      </div>
      <span className="hidden sm:inline-block ml-2">{userName}</span>
    </header>
  );
};

export default ProfileHeader;
