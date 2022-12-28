import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { AblyConnect } from "./components/ably-connect";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-full p-8">
      <div className="bg-green-50 rounded-xl p-8 h-full">
        <AblyConnect />
      </div>
    </div>
  );
}

export default App;
