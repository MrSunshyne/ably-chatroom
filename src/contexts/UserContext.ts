import { createContext } from "react";

type TUser = {
  name: string | null;
  clientId: string | null;
  activeChannel: string | null;
};

export const defaultUser: TUser = {
  name: null,
  clientId: null,
  activeChannel: "lobby-one"  
};

export const UserContext = createContext({
  user: defaultUser,
  setUser: (user: typeof defaultUser) => {},
  logout: () => {},
  isLogged: false,
  getActiveChannel: () => {},
});
