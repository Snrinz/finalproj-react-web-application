/*
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router';
import history from './authUtils/history'
import Context from './authUtils/Context'


const PrivateRoute = ({component: Component, redirectTo, requiredAdmin=false, fromPage }) => {
  const context = useContext(Context);

  const isAdmin = context.profileState && context.profileState.role === 'admin'

  return (
    <Route render={props => (context.authState && (isAdmin || !requiredAdmin))
      ? <Component {...props} />
      : <Redirect to={{pathname: redirectTo, state: { from: fromPage }}} />
    }
    />
  )
}
export default PrivateRoute
*/

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router';
// import history from './authUtils/history'
import Context from './authUtils/Context'
import '../App.css';

const PrivateRoute = ({component: ComposedComponent, redirectTo, requiredAdmin=false, fromPage, ...rest }) => {
  const context = useContext(Context);
  const isAuthenticated = context.authObj.isAuthenticated(); //context.isAuthenticated;
  const isAdmin = context.profileState && context.profileState.role === 'admin';
  class Authentication extends React.Component {
  
      // Redirect if not authenticated; otherwise, return the component inputted into <PrivateRoute /> 
      handleRender = props => {
        if (isAuthenticated && (isAdmin || (isAdmin == requiredAdmin)))
          return <ComposedComponent {...props}/>
        else
          return <Redirect to={{pathname: redirectTo, state: { from: fromPage }}} />
      }

      render() {
        return (
          <Route {...rest} render={this.handleRender}/>
        );
      }
    }

  return <Authentication/>
}

export default PrivateRoute
