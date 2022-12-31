import { configureAbly } from "@ably-labs/react-hooks";
import { useContext, useState } from "react";
import { defaultUser, UserContext } from "../contexts/UserContext";

export const AppLogin = () => {
  const { user, setUser, logout, isLogged } = useContext(UserContext);

  const [name, setName] = useState("");

  const generateClientId = Math.random().toString(36).substring(7);

  const handleSetUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUser({
      name: name,
      clientId: generateClientId,
    });

    configureAbly({
      key: import.meta.env.VITE_APP_ABLY_API_KEY,
      clientId: generateClientId,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handleSetUser}
      >
        <div className="text-2xl font-bold text-center">Identify yourself</div>
        {/* input box */}
        <div className="flex flex-col items-center justify-center">
          <input
            className="border-2 border-gray-300 p-2 rounded-lg"
            type="text"
            placeholder="Github Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Join
        </button>
      </form>
    </div>
  );
};
