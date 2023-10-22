import { useNavigate } from "react-router-dom";
const CoachSuccess=(props)=>{
    let navigate = useNavigate();
    const handleLogin=()=>{
        navigate('/logincoach')
    }
    return(<div className="formSuccess">
    
        <h1>You are a Coach Now </h1> 
        <h2>Your Coach Id is {props.data}</h2>
        <button type="button" class="btn btn-success" onClick={handleLogin}>Login</button>
    </div>)
}
export default CoachSuccess;