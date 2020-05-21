import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import UserNavBar from './UserNavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon id="icon" icon={faHome} />
                {/* <FontAwesomeIcon id="icon" icon={faUser} />
                <FontAwesomeIcon id="icon" icon={faCog} /> */}
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <UserNavBar/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Navigation;
