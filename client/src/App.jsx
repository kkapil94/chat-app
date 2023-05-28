import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './components/pages/Login'
import "./index.css"
import SignUp from './components/pages/SignUp'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}
