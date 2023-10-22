import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Footer from './component/Footer';
import Navigation from './component/Navigation';
import Home from './component/Home';
import Register from './component/CoachSignup'
import Login from'./component/CoachLogin'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'; 
import CoachHome from './component/CoachHome';
import CoachSchedule from './component/CoachSchedule'
import ViewCoachProfile from './component/ViewCoachProfile'
import UserRegister from './component/UserRegister'
import UserLogin from './component/UserLogin'
import UserHome from './component/UserHome'
import Logout from './component/Logout'
import UserAppointment from './component/UserAppointment'
import ViewUserProfile from './component/ViewUserProfile'
function App() {

  const[coache,setCoche]=useState('')
  const[user,setUser]=useState('')

  const getUser=(data)=>{
    setUser(data)
  }

  const getCoache=(data)=>{ 
    setCoche(data)
  }

  console.log("user "+ user);
  console.log("coache" + coache);

 useEffect(() => {
    // Load user data from localStorage when the component mounts
    //coachData
    const storedCoachData = localStorage.getItem('coachData');
    if (storedCoachData) {
      const userData = JSON.parse(storedCoachData);
      setCoche(userData);
    }

    const storedUserData = localStorage.getItem('userData');
    if(storedUserData)
    {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }

  },[]);


  

  return (
    <BrowserRouter>
    <div class="App">
      <Navigation coachdata={coache} userdata={user}/>
      <br/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/coachsignup' element={<Register/>}/>
            <Route path='/logincoach' element={<Login setcoach={getCoache}/>}/>
            <Route path='/coachhome' element={<CoachHome coachdata={coache}/>}/>
            <Route path='/coachschedule' element={<CoachSchedule coachdata={coache}/>}/>
            <Route path='/coachviewprofile' element={<ViewCoachProfile coachdata={coache}/>}/>
            <Route path='/usersignup' element={<UserRegister/>}/>
            <Route path ='/loginuser' element={<UserLogin setuser={getUser}/>}/>
            <Route path='/userhome' element={<UserHome/>}/>
            <Route path='/userviewprofile' element={<ViewUserProfile userdata={user}/>}/>
            <Route path='/userappointments' element={<UserAppointment userdata={user}/>}/>
            <Route path ='/logout' element={<Logout/>}/>
            
        </Routes>
        <br/>
        <Footer/>
    </div>
    </BrowserRouter>
         
  );
}

export default App;
