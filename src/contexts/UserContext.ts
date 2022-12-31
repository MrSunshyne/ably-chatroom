import { createContext } from "react";

type User = {
  name: string | null;
  clientId: string | null;
};

export const defaultUser: User = {
  name: null,
  clientId: null,
};

export const UserContext = createContext({
  user: defaultUser,
  setUser: (user: typeof defaultUser) => {},
  logout: () => {},
  isLogged: false,
});
