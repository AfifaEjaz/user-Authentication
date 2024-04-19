import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Login from '../components/Login';
import Registeration from '../components/Registeration';

const LoginReg = () => {

  const [activeTab, setactiveTab] = useState('login')

  const HandlebarTab = (tab) => {
    setactiveTab(tab)
  }

  const renderForm = () => {
    if (activeTab === 'login') {
      return (
       <Login />
      );
    } else if (activeTab === 'registeration'){
      return (
       <Registeration/>
      );
    }
  }

  return (
    <>
      <div className="container">
        <div className="row" style={{height: '90vh'}}>
          <div className="col-sm-7 d-flex justify-content-center align-items-center">
            <img className="img-fluid" style={{ height: '70vh', width: '70%' }} src="https://connect.redhat.com/sites/default/files/2024-01/digitaltransform-opentech-technology-illustration_keyart-1-transparent.png" alt="loadingg" />
          </div>
          <div className="col-sm-5 ">
            <Navbar expand="lg" className="bg-body-tertiary border-bottom">
              <Container>
                
                  <Nav className="me-auto">
                    <Nav.Link  onClick={()=> HandlebarTab('login')} >Login</Nav.Link>
                    <Nav.Link onClick={()=>HandlebarTab('registeration')}>Registration</Nav.Link>
                  </Nav>
               
              </Container>
            </Navbar>
            <div className="container mt-3">
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginReg;