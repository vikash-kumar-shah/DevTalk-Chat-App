import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "./Login.css"
import { useLogin } from '../../Hooks/useLogin'
import Load from '../Load/Load'
function Login() {
  const [inputData, setInputData] = useState({userName:"",password:""})
  const {login, loading} = useLogin()
  const handleClick = (e) =>{
    e.preventDefault()
    login(inputData)

  }
  return (
    <>
    {loading && <Load/>}
    {!loading && <div className="main">
      <p className='title1'>Login</p>
      <p className='title2'><span style={{color:'#609FEF'}}>Dev</span>Chat</p>
      <form action="" className='form'>
        
        <input type="text" placeholder='Enter Your UserID' onChange={(e)=>{setInputData({...inputData, userName: e.target.value})}}/>
        <input type="password" placeholder='Enter Your Password' onChange={(e)=>{setInputData({...inputData, password: e.target.value})}} />
        <Link to="/signup">Don't have an Account?</Link>
        <button onClick={handleClick}>Login</button>
      </form>
    </div>}
    </>
  )
}

export default Login