
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { NavLink} from "react-router-dom";
import { Container, Nav,Navbar} from 'react-bootstrap';
const Navigation=(props)=>{
  
    return(<>
       <Navbar className='navi' expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">HealthEase</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className = "justify-content-end">
            <Nav>
              {
                (props.coachdata || props.userdata) ?(<Nav.Link href = "/logout" className = "me-3 text-white">Logout</Nav.Link>):null
              }
              {
                props.coachdata ?( <NavLink to = '/coachviewprofile' className = " mt-2 me-3 text-white navlink">My Profile</NavLink>):null
              }
              {
                props.coachdata ?( <NavLink to = '/coachschedule' className = " mt-2 me-3 text-white navlink">My Schedule</NavLink>):null
              }
              {
                props.userdata ? (<NavLink to = '/userviewprofile' className = " mt-2 me-3 text-white navlink">My Profile</NavLink>):null
              }
              {
                props.userdata ? (<NavLink to = '/userappointments' className = " mt-2 me-3 text-white navlink">My Appointment</NavLink>):null
              }
              <div>
                <FontAwesomeIcon icon = {faPhone} /> Call Us: 080 2233447
              </div>
            </Nav>
          </Navbar.Collapse>   
          </Container>
    </Navbar> 
    </>)
}
export default Navigation;
