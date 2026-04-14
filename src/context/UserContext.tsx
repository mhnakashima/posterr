import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { UserData } from '../types';

interface UserContextValue {
  profileInfo: UserData;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserProviderProps {
  user: UserData;
  children: ReactNode;
}

const UserProvider = ({ user, children }: UserProviderProps) => {
  const value = useMemo<UserContextValue>(
    () => ({ profileInfo: user }),
    [user],
  );

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

const useProfile = (): UserContextValue => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('UserContext was used outside of the UserProvider');
  }
  return context;
};

export { useProfile, UserProvider };
