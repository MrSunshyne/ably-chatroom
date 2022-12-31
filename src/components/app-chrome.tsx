import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

type AppChromeProps = {
  children: React.ReactNode;
};

export const AppChrome = ({ children }: AppChromeProps) => {
  const { user, setUser, logout, isLogged } = useContext(UserContext);

  return (
    <div className="App h-full flex flex-col p-8 pt-0">
      <div className="py-2">
        {isLogged ? (
          <div className="flex flex-row items-center justify-between ">
            <div className="text-xl ">hey {user.name} !</div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-2xl font-bold">&nbsp;</div>
        )}
      </div>
      <div className="bg-green-50 rounded-xl p-8 shadow-md flex-grow shadow-green-100">
        {children}
      </div>
    </div>
  );
};
