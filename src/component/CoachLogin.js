import { FormGroup, Input, Row } from "reactstrap"
import { useState } from "react"
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const CoachLogin =(props)=>{
    const[id,setId]=useState('')
    const[password,setPassword]=useState('')
    const[idMsg,setIdMsg]=useState('');
    const[passMsg,setPassMsg]=useState('')
    const[errMsg,setErrMsg]=useState('')
    let navigate= useNavigate()
    const handleLogin=(e)=>{
        e.preventDefault()
        //console.log("id :"+id+ "password+ password")
        setIdMsg('')
        setPassMsg('')
        setErrMsg('')
        if(id==='')
        {
            setIdMsg('Id Field is Required')
        }
        else if( password.length<5 || password.length>10)
        {
            setPassMsg('Password should have 5 to 10 character')
        }
        else{
            axios.get('http://localhost:4000/coaches').then((res)=>{
                let value=res.data
                var result= value.find((val)=>val.id==id && val.password==password)
              //  console.log(result)
                if(result)
                {
                    props.setcoach(result)
                    localStorage.setItem('coachData', JSON.stringify(result.id));
                    navigate('/coachhome')

                }
                else
                {
                    setErrMsg('Invalid credential');
                }
            })
        }
    }
    return(
        <div className="form">
    <div className ="row form-row">
        <div className="col-12">
        <h1><FontAwesomeIcon icon={faUserDoctor}/>Login as a Doctor</h1>
           
        <form onSubmit={handleLogin}> 
            <Row>    
                <FormGroup>
                    Id : <Input type="text"onChange={(e)=>{setId(e.target.value)}} name="id" value={id} />
                </FormGroup>
                <div className="text-danger">{idMsg}</div>   
            </Row>
            <Row>    
                <FormGroup>
                    Password :<Input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password"/>
                </FormGroup>
                <div className="text-danger">{passMsg}</div>    
            </Row>
            
            <Row style={{paddingLeft:"30%", paddingRight :"30%"}}>  
                <button className="btn btn-primary">Login</button>
            </Row>
            
            {errMsg &&<div className="text-danger">{errMsg}</div> }
        </form>
    </div>
    </div>
    
    </div>
    )
}
export default CoachLogin