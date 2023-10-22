import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup,Input,Col,Row } from "reactstrap";
import { useState } from "react";
import axios from 'axios'
import UserSuccess from '../component/UserSuccess'
const UserRegister =()=>{
   
    const[idData,setIdData]=useState('')
    const[addFlag,setAddFlag]=useState('')

    const[mandatory,setMandatory]= useState(false);

    const[errorMsg,setErrorMsg]=useState("");

    const[successMessage,setSuccessMessage]=useState("");
    
    const[valid,setValid]= useState(false);

    const [state,setState]= useState({
        name:"",
        password:"",
        mobileNumber:"",
        email:"",
        dateOfBirth:"",
        gender:"",
        pincode:"",
        city:"",
        stateC:"",
        country:""
    })

    const [formErrors,setFormErrors]=useState({
        nameError:"",
        passwordError:"",
        mobileError:"",
        emailError:"",
        ageError:"",
        genderError:"",
        pincodeError:"",
        cityError:"",
        stateError:"",
        countryError:""
    })


    const handleSubmit =(e)=>{
        e.preventDefault()  
        setAddFlag(false)
       if(state.name===""||state.password===""||state.email===""|| state.gender===""||state.pincode===""|| state.stateC===""|| state.city===""|| state.country===""|| state.mobileNumber===""){
            setMandatory(true);
       } 
        else{
            
            axios.post('http://localhost:4000/users',state).then((res)=>{
                setIdData(res.data.id)
                setAddFlag(true)
                setSuccessMessage("Coach Added Successfully");
            }).catch((err)=>{
                setErrorMsg("Something went wrong");
            })
            
        }

    }

    const handleChange=(event)=>{
        setValid(false)
        setState({...state,[event.target.name]:event.target.value});
        validateField(event.target.name,event.target.value);
    }

    const validateField = (name,value)=>{

        let errors = formErrors;
        
        switch(name)
        {
            case "name" :
                if(value.length<3|| value.length>50 )
                {
                    errors.nameError= 'Name should have 3 to 50 characters'
                }
                else{
                    errors.nameError="";
                }
                break;

            case "password" :
                if(value.length<5 || value.length>10)
                {
                    errors.passwordError="Password Should have 5 to 10 character"
                }
                else{
                    errors.passwordError="";
                }
                break;

            case "dateOfBirth":
                const age=Math.floor((new Date()-new Date(value).getTime())/3.15575e+10)
                if(age<=20 || age>=100)
                {
                    errors.ageError="Age should be between 20 and 100 year"
                }
                else
                {
                    errors.ageError=""
                }
                break;

            case "mobileNumber":
                if(!/^[0-9]{10,10}$/.test(value))
                {
                    errors.mobileError="Mobile Number Should have 10 digits"
                }
                else{
                    errors.mobileError=""
                }
                break;
            case "email":
                if(value==='')
                {
                    errors.emailError='Email Field is required '
                }
                else
                {
                    errors.emailError="";
                }
                break;
                case "gender":
                    if(value=='')
                    {
                        errors.genderError='Gender is required'
                    }
                    else
                    {
                        errors.genderError="";
                    }
                    break;
                case "pincode":
                    if(!/^[0-9]{6,6}$/.test(value))
                    {
                        errors.pincodeError='Pincode Should have 6 digit'
                    }
                    else
                    {
                        errors.pincodeError="";
                    }
                    break;
                case "city":
                    if(value.length<6 || value.length>20)
                    {
                        errors.cityError='City Should have 6 to 20 Character'
                    }
                    else
                    {
                        errors.cityError="";
                    }
                    break;
                    case "stateC":
                        if(value.length<6 || value.length>20)
                        {
                            errors.stateError='State Should have 6 to 20 Character'
                        }
                        else
                        {
                            errors.stateError="";
                        }
                    break;
                case "country":
                    if(value.length<6 || value.length>20)
                    {
                        errors.countryError='Country Should have 6 to 20 Character'
                    }
                    else
                    {
                        errors.countryError="";
                    }
                    break;
            default:
        }

       setFormErrors(errors)

        if(errors.nameError!=="" || errors.passwordError!=="" || errors.ageError!=="" || errors.mobileError!=="" ||errors.genderError!=="" || errors.pincodeError!==""|| errors.stateError!==""|| errors.emailError!==""|| errors.countryError!=="")
        {
            setValid(true);
        }
    }

    if(addFlag)
    {
        return <UserSuccess data={idData}/>
    }
    return (
    <div className="form">
    <div className ="row form-row">
    <div className="col-12">
    <h1><FontAwesomeIcon icon={faUser}/>Patient Profile</h1>
        <form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <FormGroup>
                    Name: <Input type="text" value={state.name} onChange={handleChange} name="name"/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.nameError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    Password :<Input type="text" value={state.password} onChange={handleChange} name="password"/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.passwordError}</div>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <FormGroup>
                    Mobile Number: <Input type="tel" value={state.mobileNumber} name="mobileNumber" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.mobileError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                     Email :<Input type="text" value={state.email} name="email" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.emailError}</div>
                </Col>
            </Row>


            <Row>
                <Col md={6}>
                    <FormGroup>
                    Date Of Birth: <Input type="date" value={state.dateOfBirth} name="dateOfBirth" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.ageError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        Gender:
                        <div onChange={handleChange}>
                        <input type="radio" value="MALE" name="gender"/> Male &nbsp;
                        <input type="radio" value="FEMALE" name="gender"/> Female
                        </div>
                    </FormGroup>
                    <div className="text-danger">{formErrors.genderError}</div>
                </Col>
            </Row>


            <Row>
                <Col md={6}>
                    <FormGroup>
                    Pin: <Input type="text" value={state.pincode}  name="pincode" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.pincodeError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                     City :<Input type="text" value={state.city}  name="city" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.cityError}</div>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <FormGroup>
                    State: <Input type="text" value={state.stateC} name="stateC" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.stateError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                     Country :<Input type="text" value={state.country} name="country" onChange={handleChange}/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.countryError}</div>
                </Col>
            </Row>

            <Row style={{paddingLeft:"30%", paddingRight :"30%"}}>
                <button className="btn btn-success" disabled={valid}>Register</button>
            </Row>
            {mandatory && <div className="text-danger">{"All Fields Are Mandatory"}</div>}
            {errorMsg &&<div className="text-danger">{errorMsg}</div> }
            {successMessage && <div className="text-success">{successMessage}</div>  }
        </form>
    </div>
    </div>
    
    </div>
    )
}
export default UserRegister;