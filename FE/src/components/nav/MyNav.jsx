import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import _ from 'lodash';
export default function MyNav() {
    const [accout, setAccout] = useState({});
    useEffect(() => {
        let session = sessionStorage.getItem('accout');
        if (session) {
            setAccout(JSON.parse(session));
        }
    }, [])
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" variant="dark" data-bs-theme="dark">
                <Container className='my-nav-page'>
                    <Navbar.Brand href="#home">AnhHocBE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {accout && !_.isEmpty(accout) && accout.isAuthenticated ?
                                <>
                                    <Nav.Link href="/users" >Users</Nav.Link>
                                    <Nav.Link href="/projects" >Projects</Nav.Link>
                                </> :
                                <>
                                    <Nav.Link href="/" >Login</Nav.Link>
                                    <Nav.Link href="/register" >Register</Nav.Link>
                                </>
                            }
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
