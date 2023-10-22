import axios from 'axios'
import { useState,useEffect } from 'react'
const ViewCoachProfile =(props)=>{
    const [currcoach,setCurrCoach]=useState('')
    useEffect(()=>{
        axios.get('http://localhost:4000/coaches').then((res)=>{
        let value=res.data
        const storedUserData = localStorage.getItem('coachData')
        const userData = JSON.parse(storedUserData);
        var result=value.find((val)=>val.id==userData)
            setCurrCoach(result)
        }
        )
    })
    return (<>
        <div className="form">
            <div className ="row form-row">
                <div className="col-12">
                    <h3>CoachId :{currcoach.id}</h3>
                    <h5>Date Of Birth :{currcoach.dateOfBirth}</h5>
                    <h5>Mobile No : {currcoach.mobileNumber}</h5>
                    <h5> Speciality :{currcoach.speciality} </h5>
                </div>
            </div>
        </div>
    </>
    )
}
export default ViewCoachProfile