import { getInitials } from '../../utils/utils';
import { AvatarSize } from '../../types';

const sizeClasses: Record<AvatarSize, string> = {
  [AvatarSize.XS]: 'w-6 h-6 text-[10px]',
  [AvatarSize.SM]: 'w-8 h-8 text-sm',
  [AvatarSize.MD]: 'w-12 h-12 text-lg',
  [AvatarSize.LG]: 'w-16 h-16 text-xl',
};

interface AvatarProps {
  firstName?: string;
  lastName?: string;
  size?: AvatarSize;
}

const Avatar = ({ firstName = '', lastName = '', size = AvatarSize.SM }: AvatarProps) => {
  return (
    <span
      role="img"
      aria-label={`${firstName} ${lastName} avatar`}
      className={`${sizeClasses[size]} rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium shrink-0`}
    >
      {getInitials(firstName, lastName)}
    </span>
  );
};

export default Avatar;
