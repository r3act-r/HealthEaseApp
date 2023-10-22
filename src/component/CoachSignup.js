import { useState } from "react"
import { FormGroup,Input,Label,Col,Row } from "reactstrap";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CoachSuccess from'../component/CoachSuccess'
const CoachSignup=()=>{

    const[idData,setIdData]=useState('');

    const [state,setState]= useState({
        name:"",
        password:"",
        mobileNo:"",
        speciality:"",
        dateOfBirth:"",
        gender:"",
    });

    const [formErrors, setFromErrors]= useState({
        nameError:"",
        passwordError:"",
        dateError:"",
        mobileError:"",
        specialityError:"",
    });

    const[mandatory,setMandatory]= useState(false);

    const[errorMsg,setErrorMsg]=useState("");

    const[successMessage,setSuccessMessage]=useState("");
    
    const[valid,setValid]= useState(false);

    const[addFlag,setAddFlag]=useState(false);

    const addCoaches=(e)=>{
        e.preventDefault()
       
        setAddFlag(false)
        if(state.name===""||state.password===""||state.dateOfBirth===""|| state.gender===""||state.mobileNo==""||state.speciality==="")
        {
            setMandatory(true);
        }
        else{
              
            axios.post('http://localhost:4000/coaches',state).then((res)=>{
                setIdData(res.data.id);
                setAddFlag(true);
                setSuccessMessage("Coach Added Successfully");
            }).catch((err)=>{
                setErrorMsg("Something went wrong");
            })
        }
    }

    const handleChange = (event)=>{
        
        setValid(false)
        setState({...state,[event.target.name]:event.target.value});
        validateField(event.target.name,event.target.value);
        
    }

    const validateField = (name,value)=>{

        let errors = formErrors;
        
        switch(name)
        {
            case "name" :
                if(value.length<3 || value.length>50)
                {
                    errors.nameError="Name should have 3 to 50 Character";
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
                    errors.dateError="Age should be between 20 and 100 year"
                }
                else
                {
                    errors.dateError=""
                }
                break;
            case "mobileNo":
                if(!/^[0-9]{10,10}$/.test(value))
                {
                    errors.mobileError="Mobile Number Should have 10 digits"
                }
                else{
                    errors.mobileError=""
                }
                break;
            case "speciality":
                if(value.length<10 || value.length>50)
                {
                    errors.specialityError="Speciality Should have 10 to 50 Character"
                }
                else
                {
                    errors.specialityError="";
                }
                break;
            default:
        }

        setFromErrors(errors);

        if(errors.nameError!=="" || errors.passwordError!=="" || errors.dateError!=="" || errors.mobileError!=="" ||errors.specialityError!=="")
        {
            setValid(true);
        }
    }

    if(addFlag)
    {
        return <CoachSuccess data={idData}/>
    }
    return(
    <div className="form">
    <div className ="row form-row">
        <div className="col-12">
        <h1><FontAwesomeIcon icon={faUserDoctor}/>Doctor Profile</h1>
           {idData}
        <form onSubmit={addCoaches}> 
            <Row>
                <Col md={6}>
                    <FormGroup>
                    Name: <Input type="text"onChange={handleChange} name="name" value={state.name} />
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
                    Date Of Birth: <Input type="date" value={state.dateOfBirth} onChange={handleChange} name="dateOfBirth"/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.dateError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        Gender:
                        <div onChange={handleChange}>
                        <input type="radio" value="MALE" name="gender"/> Male &nbsp;
                        <input type="radio" value="FEMALE" name="gender"/> Female
                        </div>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                    Mobile Number: <Input type="tel" value={state.mobileNo} onChange={handleChange} name="mobileNo"/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.mobileError}</div>
                </Col>
                <Col md={6}>
                    <FormGroup>
                     Speciality :<Input type="text" value={state.speciality} onChange={handleChange} name="speciality"/>
                    </FormGroup>
                    <div className="text-danger">{formErrors.specialityError}</div>
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
export default CoachSignup