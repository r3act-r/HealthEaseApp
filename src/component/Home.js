import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  useEffect(() => {
     document.body.style.background = "url('/assets/Images/medicine-doctor-hand-working-modern-computer-interface-digital-layer-effect-as-medical-network-concept-61710652.webp') no-repeat center center fixed";
     document.body.style.backgroundSize = "cover";
  },[])

  let navigate=useNavigate()

  const handleRegister=()=>{
    navigate('/coachsignup')
  }
  const handleLogin =()=>{
    navigate('/logincoach')
  }
  const handleUserRegister=()=>{
    navigate('/usersignup')
  }
  const handleUserLogin =()=>{
    navigate('/loginuser')
  }
  return (
    <>
      <Container>
        <Row>
          <Col >
            <Card  className="mt-5 navi" text = "light" style = {{'width': '20rem', 'borderRadius': '2.5%' , 'margin':'10px auto'}}>
              <h1>For Doctors</h1>
              <Card.Img className="col-lg-5 offset-5 mt-2" variant="top" class="images" src="\assets\Images\pngtree-doctor-icon-circle-png-image_2055257.png" />
                <h6>Direct connect with patient</h6>
                <h6>Earn without clinical setup</h6>
                <h6>Manage your practice</h6>
                <h6>Enable online consultation</h6>
                <h6>Digitalize your practice</h6>
                <Card.Body>
                  <Button  variant = "primary" onClick = {handleLogin} style={{  'width': '90%',
                      'margin-bottom': '1em','margin-left': '1em'}}>Login as a Doctor</Button><br/>
                  <Button  variant="primary" onClick = {handleRegister} style={{  'width': '90%',
                      'margin-bottom': '1em','margin-left': '1em'}}>Register as a Doctor</Button>
                </Card.Body>
            </Card>
          </Col>
          <Col >
            <Card className="mt-5 navi" text = "light" style = {{'width': '20rem', 'borderRadius': '2.5%', 'margin':'10px auto'}}>
            <h1>For Patients</h1>
            <Card.Img className = "col-lg-5 offset-5 mt-2" variant="top" class="images" src="\assets\Images\patientimage.png" />
              <h6>Find Doctors</h6>
              <h6>Discover Specialist</h6>
              <h6>Book appointment</h6>
              <h6>Read Doctor's profile</h6>
              <h6>Manage your health data</h6>
              <Card.Body>
                <Button  variant = "primary" onClick = {handleUserLogin}  style={{  'width': '90%',
                    'margin-bottom': '1em','margin-left': '1em'}}>Login as a Patient</Button><br/>
                <Button  variant="primary" onClick = {handleUserRegister} style={{  'width': '90%',
                    'margin-bottom': '1em','margin-left': '1em'}}>Register as a Patient</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>   
      </Container>
    </>
  )
}

export default Home