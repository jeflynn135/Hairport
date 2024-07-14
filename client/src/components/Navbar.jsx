//make sure link to contact me and reviews match

import {useState} from "react";
import {Link} from "react-router-dom";
import {SignUpForm} from "./SignupForm";
import {LogInForm} from "./LoginForm";
import {Auth} from "../utils/auth";
//anything else we need from react bootstrap goes in here
import {Container, Nav, Navbar, Modal, Tab} from "react-bootstrap";

//wtf how to navbar, idk
//log in, log out, reviews, services?

const appNavbar=()=> {
  const [showModal, setShowModal]=useState(false)

    return (
      <>
      <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand as ={Link} to="/">
            Hairport
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
    
                <Nav.Link as={Link} to ="/contactme">Contact Me</Nav.Link>

                <Nav.Link as={Link} to ="/reviews">Reviews</Nav.Link>

                {Auth.loggedIn() ? (
                    <>
                    <Nav.Link as = {Link} to="/services">Services</Nav.Link>

                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                ) : (
                  <>
                    <Nav.Link onClick={() => {
                      setShowModal(true)
                    }}>Login/Sign Up</Nav.Link> 
                    </>
                )}
                
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
                <Modal
                size="lg"
                show={showModal}
                onHide={()=> {setShowModal(false)}}
                aria-labelledby="signup">
                  <Tab.Container defaultActiveKey={"login"}>
                    <Modal.Header
                    closeButton>
                      <Modal.Title id="signup">
                        <Nav variant="pills">
                          <Nav.Item>
                            <Nav.link eventKey="login">
                              Login
                            </Nav.link>
                          </Nav.Item>
                          <Nav.Item></Nav.Item>
                          <Nav.Link eventKey="signup">
                            Sign Up
                          </Nav.Link>
                        </Nav>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Tab.Content>
                        <Tab.Pane eventKey="login">
                        <LoginForm handleModalClose={() => setShowModal(false)} />
                       </Tab.Pane>
                        <Tab.Pane eventKey='signup'>
                      <SignUpForm handleModalClose={() => setShowModal(false)} />
                        </Tab.Pane>
                      </Tab.Content>
                    </Modal.Body>
                  </Tab.Container>

                </Modal>
        </>
      )



}

export default appNavbar;