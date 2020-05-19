import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';

import Context from '../../utils/authUtils/Context';

const UnauthenMenu = () => {
    return (
        <Navbar.Collapse>
          <Nav >
            <Nav.Link as={Link} to="/signup">
                <i className="fa fa-user-plus"/> Signup</Nav.Link>
            <Nav.Link as={Link} to="/signin">
                <i className="far fa-user-circle" title="Sign in" /> Signin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    )
}
const AuthenMenu = (props) => {
    const context = useContext(Context);
    const profile = context.profileState
    let isAdmin = profile.role === 'admin';

    return (<>
        <NavDropdown title={profile.firstName} drop="left" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile">
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
            }
            <NavDropdown.Item onClick={() => context.handleUserLogout()}> 
                Sign out {" "}
                <i className="fas fa-sign-out-alt" />{" "}
            </NavDropdown.Item>
        </NavDropdown>
    </>)
}

const UserNavBar = () => {
    const context = useContext(Context);
    return (<>
        {context.authState? <AuthenMenu />:<UnauthenMenu />  } 
    </>)
}
export default UserNavBar;