import { AuthContext } from "../../../Context/AuthContext"
import "../Home/Home.css"

import React, { useContext } from 'react'

function Third() {
    const {authUser} = useContext(AuthContext)
  return (
    <div className="third-pre">
        <p className="third-pre-1">Welcome, {authUser.fullName}</p>
        <p className="third-pre-2">Select a Chat to Start Conversation</p>
        <p><i className="fa-solid fa-message third-pre-3"></i></p>
        </div>
  )
}

export default Third