import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main className="flex justify-center p-5">
      <h1 className="text-4xl font-bold text-sky-600">Rehacktor</h1>
    </main>
    </>
  )
}

export default App
