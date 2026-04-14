import { getInitials } from '../../utils/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-xl',
};

interface AvatarProps {
  firstName?: string;
  lastName?: string;
  size?: AvatarSize;
}

const Avatar = ({ firstName = '', lastName = '', size = 'sm' }: AvatarProps) => {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium shrink-0`}
    >
      {getInitials(firstName, lastName)}
    </div>
  );
};

export default Avatar;
