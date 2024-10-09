import { useContext } from "react";
import { UserContext, UserContextProps } from "./../models/user";

const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
