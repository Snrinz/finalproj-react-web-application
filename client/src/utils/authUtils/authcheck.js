import React, { useEffect, useContext } from 'react';
import history from './history';
import Context from './Context';

const AuthCheck = (props) => {
  const context = useContext(Context)
  // --> (not check the fixing yet) redirect page back to previous location if any, otherwise go to /      
  let location = props.location; //useLocation();    
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
console.log("-----------------location ", location);
//console.log("context ", context);
    
    if(context.authObj.isAuthenticated()) {
      context.handleUserLogin()
      context.handleUserAddProfile(context.authObj.profile)
//      history.replace('/')
      history.replace(from)
    }
    else {
      context.handleUserLogout()
      context.handleUserRemoveProfile()
      // history.replace('/')
    }
  }, [])

  // Redirect to another page; don't need to show anything
  return <></>
}

export default AuthCheck;
