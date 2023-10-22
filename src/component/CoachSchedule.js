import axios from 'axios'
import { useState,useEffect } from 'react'
import NoBookingCoach from './NoBookingCoach'
const CoachSchedule=(props)=>{
const[booking,setBooking]=useState('')
useEffect(()=>{
    axios.get('http://localhost:4000/bookings').then((res)=>{
        let value=res.data
        const storedUserData = localStorage.getItem('coachData')
        const userData = JSON.parse(storedUserData);
        var result=value.filter((val)=>val.coachId===userData)
        setBooking(result)
    }
    )
},[])
if(booking.length===0)
{
    return <NoBookingCoach/>
}
return (<>
        { booking &&
        booking.map((bookings)=>{
            return(
            <li key={bookings.id}>
            <div className="form">
            <div className ="row form-row">
            <div className="col-12" >
                <h1 key={bookings.id}>Appointment Date :</h1>
                <h1 >{bookings.appointmentDate}</h1>
                <h3 >Slot: {bookings.slot}</h3>
                <h5 > Booking Id : {bookings.id}<br/></h5>
                <h5 >User Id:{bookings.userId}</h5>
            </div>
            </div>
            </div>
            </li>
            )
            
        })
        
    
        
        }
   </>)
}
export default CoachSchedule