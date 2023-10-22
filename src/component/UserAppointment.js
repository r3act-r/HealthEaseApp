import { useState,useEffect} from "react"
import axios from 'axios'
import { Row } from "reactstrap"
const UserAppointment=(props)=>{
    const[booking,setBooking]=useState('')
    const[updateFlag,setUpdateFlag]=useState(false)
    const[dateToBeUpdated,setDateToBeUpdated]=useState('')
    const[slotToBeUpdated,setSlotToBeUpdated]=useState('')
    const[bookingToBeDeleted,setBookingToBeDeleted]=useState('')
    const[deleteFalg,setDeleteFlag]=useState(false)
    const[bookingsToBeUpdated,setBookingsToBeUpdated]=useState({id:0,appointmentDate:'',slot:'',userId:'',coachId:''})
    useEffect(()=>{
        axios.get('http://localhost:4000/bookings').then((res)=>{
            let value= res.data
            const storedUserData = localStorage.getItem('userData')
            const userData = JSON.parse(storedUserData);
            let result= value.filter((val)=>val.userId==userData)
            setBooking(result)
        })
    })
    const handleReschedule =()=>{
        setUpdateFlag(false)
        axios.put('http://localhost:4000/bookings/'+bookingsToBeUpdated.id,bookingsToBeUpdated)
        setBookingsToBeUpdated({id:0,appointmentDate:'',slot:'',userId:'',coachId:''})
        setDateToBeUpdated('')
        setSlotToBeUpdated('')

    }
    if(updateFlag)
    {
        return( <>
        <div className="form">
        <div className ="row form-row">
        <div className="col-12">
            <Row>
                <h3>Reschdule Your Appointment </h3>
            </Row>
            <Row style={{padding :"10px"}}>
                Date Of Appointment : 
                <input type="date"  onChange={(e)=>{setBookingsToBeUpdated({...bookingsToBeUpdated,appointmentDate:e.target.value})}}/>
            </Row>
            <Row style={{padding :"10px"}}>
                Preferred Slot : 
                <div onChange={(e)=>{setBookingsToBeUpdated({...bookingsToBeUpdated,slot:e.target.value})}}>
                    <input type ="radio" value="9 AM to 10 AM" name="slot"/> 9 AM to 10 AM &nbsp;
                    <input type ="radio" value="10 AM to 11 AM" name="slot"/> 10 AM to 11 AM &nbsp;
                    <input type ="radio" value="11 AM to 12 PM" name="slot"/> 11 AM to 12 PM &nbsp;
                    <input type ="radio" value="2 PM to 3 PM" name="slot"/> 2 PM to 3 PM &nbsp;
                    <input type ="radio" value="3 PM to 4 PM" name="slot"/> 3 PM to 4 PM &nbsp;
                    <input type ="radio" value="4 PM to 5 PM" name="slot"/> 4 PM to 5 PM &nbsp;
                 </div>
            </Row>
            <Row style={{padding :"30px"}}>
                <button class="btn btn-success" onClick={handleReschedule}>Confirm Your Appointment </button>
            </Row>
        </div>
        </div>
        </div> </>)
    }
    else
    {
    if(booking.length==0)
    {
        return <h1> No bookings Available</h1>
    }
    return(<>
         {
            booking.map((bookings)=>{
            return(<>
            <div className="form">
            <div className ="row form-row">
            <div className="col-12">
                <h3>Appointment Date :</h3>
                <h3>{bookings.appointmentDate}</h3>
                <h5>Slot: {bookings.slot}</h5>
                <h5>Booking Id : {bookings.id}<br/></h5>
                <h5>User Id:{bookings.userId}</h5>
                <h5>Coach Id:{bookings.coachId}</h5>
                <div style={{padding:"50px"}}>
                <button class="btn btn-primary " onClick={()=>{
                                        let result=booking.find((val)=>val.id==bookings.id)
                                        setBookingsToBeUpdated(result)
                                        setUpdateFlag(true)}}>Reschedule Appointment</button><br/>
                </div>
                
                <button class= "btn btn-danger" onClick={()=>{
                                                        setBookingToBeDeleted(bookings.id)
                                                        axios.delete('http://localhost:4000/bookings/'+bookingToBeDeleted)
                                                    }}>Cancel Appointment </button>
            </div>
            </div>
            </div>
            </>)
        })
        }
    </>)
    }
}
export default UserAppointment