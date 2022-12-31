import React, { useMemo, useState } from "react";
import { defaultUser, UserContext } from "../contexts/UserContext";
import { AppChrome } from "./app-chrome";
import { AppLogin } from "./app-login";

type AppGuardProviderProps = {
  children?: React.ReactNode;
};

export const AppGuardProvider = ({ children }: AppGuardProviderProps) => {
  const [user, setUser] = useState(defaultUser);

  const logout = () => {
    setUser(defaultUser);
  };

  const isLogged = user.name !== null;

  const providerValue = useMemo(
    () => ({ user, setUser, logout, isLogged }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={providerValue}>
      <AppChrome>{isLogged ? <>{children}</> : <AppLogin />}</AppChrome>
    </UserContext.Provider>
  );
};
