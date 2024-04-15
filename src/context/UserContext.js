import { createContext, useContext, useMemo } from "react";

/*
  Context creation
*/
const UserContext = createContext();

const UserProvider = ({ user, children}) => {

  const value = useMemo(() => {
    return {
      profileInfo: user,
    };
  }, [user]);

  return (
    // All chidren should receive values from Post Content Provider
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

const useProfile = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the UserProvider");
  return context;
}

export { useProfile, UserProvider };

