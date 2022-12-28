import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AblyConnect } from './components/ably-connect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AblyConnect/>
    </div>
  )
}

export default App
