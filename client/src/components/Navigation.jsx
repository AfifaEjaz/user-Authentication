import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserUpdate from './UserUpdate';

const Navigation = ({ isToken }) => {

  return (
    <>
      <Navbar expand="lg" className="bg-danger">
        <Container>
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>

              {isToken ? (
                <>
                  <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                  <UserUpdate />
                  {/* <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Name</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Email
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3"><UserUpdate /></NavDropdown.Item>
                  </NavDropdown> */}
                </>

              ) : (
                <Nav.Link as={NavLink} to="/loginReg">Login/Registeration</Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation