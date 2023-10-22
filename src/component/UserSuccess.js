import { useNavigate } from "react-router-dom";
const UserSuccess =(props)=>{
    let navigate = useNavigate();
    const handleLogin=()=>{
        navigate('/loginuser')
    }
    return(<div className="formSuccess">
    
        <h1>Account Created Successfully </h1> 
        <h2>Your Id is {props.data}</h2>
        <button type="button" class="btn btn-success" onClick={handleLogin}>Login Now</button>
    </div>)
}
export default UserSuccess