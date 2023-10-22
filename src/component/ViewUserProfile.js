import { useState,useEffect } from "react"
import axios from 'axios'
const ViewUserProfile=(props)=>{
    const[currUser,setCurrUser]=useState('')
    useEffect(()=>{
        axios.get('http://localhost:4000/users').then((res)=>{
        let value=res.data
        const storedUserData = localStorage.getItem('userData')
        const userData = JSON.parse(storedUserData);
        let result = value.find((val)=>val.id==userData)
        setCurrUser(result)
    })
    },[])
    return(<>
        <div className="form">
            <div className ="row form-row">
                <div className="col-12">
                    <h3>{currUser.name}</h3>
                    <h5>Date Of Birth :{currUser.dateOfBirth}</h5>
                    <h5>Email Id :{currUser.email}</h5>
                    <h5>Mobile No : {currUser.mobileNumber}</h5>
                    <h5>Address :{currUser.city},{currUser.state} </h5>
                    <h5>{currUser.country}</h5>
                    <h5>Pincode: {currUser.pincode}</h5>
                </div>
            </div>
        </div>
    </>)
}
export default ViewUserProfile