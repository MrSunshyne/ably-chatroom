import "./App.css";
import { AblyConnect } from "./components/ably-connect";
import { isConnected } from "./utils/ably-connection";

function App() {
  return (
    <div className="App h-full p-8">
      <div className="bg-green-50 rounded-xl p-8 h-full shadow-md shadow-green-100">
        <>
          {/* {async () =>
            (await isConnected) ? (
              <div className="text-green-400 uppercase text-sm font-bold">
                Connected
              </div>
            ) : (
              <div className="text-yellow-500 uppercase text-sm font-bold">
                Connecting...
              </div>
            )
          } */}
          <AblyConnect />
        </>
      </div>
    </div>
  );
}

export default App;
