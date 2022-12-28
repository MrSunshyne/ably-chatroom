import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { AblyConnect } from "./components/ably-connect";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-screen p-8">
      <div className="bg-gray-100 p-8 h-full">
        <AblyConnect />
      </div>
    </div>
  );
}

export default App;
