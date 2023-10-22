import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState} from "react";
import { Row } from "reactstrap";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const UserLogin =(props)=>{
    const[id,setId]=useState('')
    const[password,setPassword]=useState('')
    const[idMsg,setIdMsg]=useState('');
    const[passMsg,setPassMsg]=useState('')
    const[errMsg,setErrMsg]=useState('')
    let navigate=useNavigate()
    const handleLogin=()=>{
        setIdMsg('')
        setPassMsg('')
        setErrMsg('')
        
        if(id=="")
        {
            setIdMsg('Id Is Required')
        }
        else if(password.length<5 || password.length>10)
        {
            setPassMsg('Password should be of 5 to 10 character')
        }
        else
        {
            axios.get('http://localhost:4000/users').then((res)=>{
                let value=res.data
                let result=value.find((val)=>
                    val.id==id && val.password==password
                )
                if(result)
                {
                    props.setuser(result)
                    localStorage.setItem('userData', JSON.stringify(result.id));
                    navigate('/userhome')    
                }
                else{
                    setErrMsg("Invalid credentials")
                }
            })

        }
    }
    return(
        <div className="form">
            <div className ="row form-row">
                <div className="col-12">
                <Row style={{padding : "25px"}}>
                <h3><FontAwesomeIcon icon={faUser}/>Login As a Patient</h3>
                </Row>
                <Row style={{paddingLeft:"10%",paddingRight:"10%",paddingBottom:"10px"}}>
                <input type="text" value={id} placeholder="User id" onChange={(e)=>{setId(e.target.value)}}/>
                <div className="text-danger">{idMsg}</div>
                </Row>
                <Row style={{paddingLeft:"10%",paddingRight:"10%",paddingBottom:"10px"}}>
                <input type="text" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="text-danger">{passMsg}</div>
                </Row>
                <Row style={{paddingLeft:"10%",paddingRight:"10%",paddingBottom:"20px",paddingTop:"20px"}}>
                <button type="button" class="btn btn-primary" onClick={handleLogin}>Login</button>
                </Row>
                <div className="text-danger">{errMsg}</div>
                </div>
            </div>
        </div>
    )
}
export default UserLogin;