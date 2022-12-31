import "./App.css";
import { AblyConnect } from "./components/ably-connect";
import { AppChrome } from "./components/app-chrome";
import { AppGuardProvider } from "./components/app-guard-provider";

function App() {
  return (
    <AppGuardProvider>
      <AblyConnect />
    </AppGuardProvider>
  );
}

export default App;
