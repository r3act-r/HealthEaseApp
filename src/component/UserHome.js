import { useEffect ,useState} from "react"
import axios from'axios'
const UserHome=()=>{
    const[coaches,setCoaches]=useState('')
    useEffect(()=>{
        axios.get('http://localhost:4000/coaches').then((res)=>{
            setCoaches(res.data);
        })
    },[])
    if(coaches.length===0)
    {
        return <h1> No Data</h1>
    }
    return(<>
                {
                    coaches.map(coache=>{
                        return(<li key ={coache.id}>
                        <div className="form">
                        <div className ="row form-row">
                        <div className="col-12">
                            <h3>{coache.name}</h3>
                            <h4>Coach Id :{coache.id}</h4>
                            <h4>MobileNumber :{coache.mobileNo} </h4>
                            <h4>Speciality :{coache.speciality}</h4>
                            <button class="btn btn-success">Book an Appointment</button>
                        </div>
                        </div>
                        </div>
                        </li>)
                        })
                    }
                
            
        </>)          
    
}
export default UserHome
/*
const UserHome=()=>{
    const[coaches,setCoaches]=useState('')
     useEffect(()=>{
        axios.get('http://localhost:4000/coaches').then((res)=>{
            setCoaches(res.data);
        })
    })
    console.log(coaches)
    return(
        <>
                {
                    coaches.map(coache=>{
                        return(<>
                        <div className="form">
                        <div className ="row form-row">
                        <div className="col-12">
                            <h3>{coache.name}</h3>
                            <h4>Coach Id :{coache.id}</h4>
                            <h4>MobileNumber :{coache.mobileNumber} </h4>
                            <h4>Speciality :{coache.speciality}</h4>
                            <botton class="btn btn-success">Book an Appointment</botton>
                        </div>
                        </div>
                        </div>
                        </>)
                        })
                    }
                
            
        </>
    )
}
export default UserHome*/