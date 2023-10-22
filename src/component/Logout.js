import React from 'react'
import {useNavigate } from 'react-router-dom';

function Logout() {
   
  let navigate= useNavigate()
  const handleLogout = ()=>{

    console.log("In logout")
    localStorage.removeItem('coachData');
    localStorage.removeItem('userData');
    navigate('/')
  }
    
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout