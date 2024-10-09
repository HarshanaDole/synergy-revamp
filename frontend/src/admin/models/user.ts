import { createContext } from "react";

export interface User {
  id: string;
  username: string;
}

export interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);
