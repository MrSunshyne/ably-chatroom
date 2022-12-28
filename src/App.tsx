import "./App.css";
import { configureAbly } from "@ably-labs/react-hooks";
import { AblyConnect } from "./components/ably-connect";

configureAbly({
  key: import.meta.env.VITE_APP_ABLY_API_KEY,
  clientId: Math.random().toString(36).substring(7),
});

function App() {
  return (
    <div className="App h-full p-8">
      <div className="bg-green-50 rounded-xl p-8 h-full shadow-md shadow-green-100">
        <>
          <AblyConnect />
        </>
      </div>
    </div>
  );
}

export default App;
