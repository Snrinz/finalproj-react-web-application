import PropTypes from "prop-types";

import "./App.css";

import Context from './utils/authUtils/Context';
import React, { useReducer } from 'react';
import * as ACTIONS from './utils/store/actions/actions';

// import { withRouter } from "react-router";
import * as AuthReducer from './utils/store/reducers/auth_reducer';

import Auth from './utils/authUtils/auth';
import Routes from "./utils/routes2";


const ContextState2 = () => {
    const auth = new Auth();
    /*
      Auth Reducer
    */

    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer,
                                                               AuthReducer.initialState)

    const handleLogin = () => {
      dispatchAuthReducer(ACTIONS.login_success())
    }

    const handleLogout = () => {
      auth.signout();
      dispatchAuthReducer(ACTIONS.login_failure())
    }

    const handleAddProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.add_profile(profile))
    }

    const handleRemoveProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_profile())
    }

    // *** reset profile to newState
    const handleResetProfile = (newState) => {     
      dispatchAuthReducer(ACTIONS.reset_profile(newState))
    }
  
    return(
      <div>
      <Context.Provider
          value={{
            //Auth Reducer
            authState: stateAuthReducer.is_authenticated,
            profileState:  stateAuthReducer.profile,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),
            handleUserResetProfile: (state) => handleResetProfile(state), //*** reset profile to new state
            // auth object
            authObj: auth
          }}>
        <Routes />
      </Context.Provider>
      </div>
    )
}

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { match, location, history } = this.props;

    return (<>
    <div>You are now at {location.pathname}</div>
    <div>You are now at {JSON.stringify(history)}</div>
    <div>You are now at {JSON.stringify(match)}</div>    
    </>)
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
// const ShowTheLocationWithRouter = withRouter(ShowTheLocation);


export default ContextState2