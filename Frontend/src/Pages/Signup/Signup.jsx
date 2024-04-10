import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "./Signup.css"
import useSignup from '../../Hooks/useSignup'
import Load from '../Load/Load'
import toast from 'react-hot-toast'


function Signup() {
  const [password1,setPassword1] = useState("")
  const [password2,setPassword2] = useState("")
  const [input,setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword : "",
    gender: ""
  })
  const {loading , signup} = useSignup()
  const handlechange = (e) =>{
    const pass = document.querySelector("#pass").value
    const confirmpass = document.querySelector("#confirmpass").value
    const cnf_msg = document.querySelector(".cnf-msg") 
    setPassword1(confirmpass)
    setPassword2(pass)
    const name = e.target.name
    const value = e.target.value
    // console.log(name,val)
    setInput({...input,[name]:value})
    const btn = document.querySelector("#btn")
    console.log(pass, confirmpass)
    if(pass !== confirmpass && confirmpass!=="")
    {
      cnf_msg.style.display = "block"
      console.log("Disabled")
      btn.disabled = true
    }
    else{
      cnf_msg.style.display = "none"
      btn.disabled = false
    }
  }

  const handlesubmit =async (e) =>{
    e.preventDefault()
    signup(input)
  }
  return (
    <>
    {loading && <Load/>}
    {!loading && <div className="main">
      <p className='title1'>Join</p>
      <p className='title2'><span style={{color:'#609FEF'}}>Dev</span>Chat</p>
      <form action="" className='form'>
        <input type="text" placeholder='First Name' onChange={(e)=>{setInput({...input,fullName:e.target.value})}} />
        <input type="text" placeholder='UserID' onChange={(e)=>{setInput({...input,userName:e.target.value})}}/>
        <input type="password" placeholder='Password' id="pass" name='password' value={password2} onChange={handlechange}/>
        <input type="password" placeholder='Confirm Password' id="confirmpass" name="confirmPassword" value={password1} onChange={handlechange}/>
        <p className='cnf-msg'>Both Passwords should Match</p>
        <div className='box'>
          <div className='b'>
          <p>Male</p>
          <input type="radio" name="gender" value="male" id="male" onClick={(e)=>{setInput({...input,gender:"male"})}} />
          </div>
          <div className='b'>
          <p>Female</p>
          <input type="radio" name="gender" value="female" id="female" onClick={(e)=>{setInput({...input,gender:"female"})}}/>
          </div>
        </div>
        <Link to="/login">Already have an Account?</Link>
        <button id="btn" onClick={handlesubmit}>Signup</button>
      </form>
    </div>}
    </>
  )
}

export default Signup