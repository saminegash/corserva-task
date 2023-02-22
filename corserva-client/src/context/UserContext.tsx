import { ReactNode, createContext, useContext, useState } from "react";

type Role = {
  id: number;
  name: string;
};

type UserContextProviderProps = {
  children: ReactNode;
};
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  token: string;
};
type UserContext = {
  user: User;
  setUser: (user: User) => void;
};
const UserContext = createContext({} as UserContext);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
