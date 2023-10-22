import axios from 'axios'
import { useState,useEffect } from 'react'
import NoBookingCoach from './NoBookingCoach'
const CoachHome=(props)=>{
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
            return(<li key ={bookings.id}>
            <div className="form">
            <div className ="row form-row">
            <div className="col-12" >
                <h1>Appointment Date :</h1>
                <h1>{bookings.appointmentDate}</h1>
                <h3>Slot: {bookings.slot}</h3>
                Booking Id : {bookings.id}<br/>
                User Id:{bookings.userId}
            </div>
            </div>
            </div>
            </li>)
        })
        
    
        
        }
   </>)
}
export default CoachHome