import './App.css'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Home from './Pages/Home/Home'
import {Routes,Route, useNavigate} from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
function App() {

  return (
    <>
    <div className='parent'>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Toaster/>
    </div>
    </>
  )
}

export default App
