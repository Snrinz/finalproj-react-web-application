import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import UserNavBar from './UserNavBar';


const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/"><i className="fab fa-optin-monster" style={{fontSize:"3em", color:"#8b8bff"}} title="Favorite"></i></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <UserNavBar/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Navigation;
