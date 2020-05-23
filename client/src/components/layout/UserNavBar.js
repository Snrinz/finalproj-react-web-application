import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar'
import Context from '../../utils/authUtils/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
const UnauthenMenu = () => {
    return (
        <Navbar.Collapse>
          <Nav >
              
            <Nav.Link id="title-summary" as={Link} to="/signup">
                <h1 className="heading-label"/> Signup
            </Nav.Link>
            <Nav.Link id="title-summary" as={Link} to="/signin">
                {/* <h1 className="far fa-user-circle" title="Sign in" />  */}
                <h1 className="heading-label"/> SignIn
                {/* <FontAwesomeIcon id="icon" icon={faSignInAlt} /> */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    )
}

const UnauthenMenutest = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                <Nav.Link as={Link} to="/">Home </Nav.Link>
                    {/* <a class="nav-link" href="/">Home </a> */}
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/signup">Signup</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/signin">SignIn</a>
                </li>
                {/* <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li> */}
                </ul>
            </div>
            </nav>
            <br />
        </>
    )
}
const AuthenMenutest = (props) => {
    const context = useContext(Context);
    const profile = context.profileState
    let isAdmin = profile.memberType === 'ADMIN';

    return (<>
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    {/* <a class="nav-link" href="/">Home </a> */}
                    <Nav.Link as={Link} to="/">Home </Nav.Link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">{profile.firstName}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onClick={() => context.handleUserLogout()}> 
                    SignOut</a>
                </li>
                {/* <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li> */}
                </ul>
            </div>
            </nav>
            <br />
    </>)
}
const AuthenMenu = (props) => {
    const context = useContext(Context);
    const profile = context.profileState
    let isAdmin = profile.memberType === 'ADMIN';

    return (<>
        <NavDropdown title={profile.firstName} drop="left" id="basic-nav-dropdown">
            {/* <NavDropdown.Item as={Link} to="/profile">
                Profile {" "}
                <i className="far fa-id-badge"></i>
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/likeImg">
                Like {" "}
                <i className="far fa-heart" title="Like images" />    
            </NavDropdown.Item>
            {isAdmin && 
                <NavDropdown.Item as={Link} to="/addImg">
                <i className="far fa-images"></i>{" "}
                Add Image</NavDropdown.Item>
            } */}
            <NavDropdown.Item onClick={() => context.handleUserLogout()}> 
                Sign out {" "}
                
            </NavDropdown.Item>
        </NavDropdown>
    </>)
}

const UserNavBar = () => {
    const context = useContext(Context);
    return (<>
        {context.authState? <AuthenMenutest />:<UnauthenMenutest />  } 
    </>)
}
export default UserNavBar;