import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './index.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Console from './pages/Console'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Console/>} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App