import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'


function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="bg-gray-100 w-[100%] box-border">
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
      </Routes>
    </div>
  )
}

export default App
