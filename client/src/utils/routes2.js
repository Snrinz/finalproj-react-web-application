import React, { useContext } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router';
import history from './authUtils/history';
import Context from './authUtils/Context';
import AuthCheck from './authUtils/authcheck';

import HomePage from '../components/layout/HomePage';
import Navigation from "../components/layout/Navigation";
import Copyright from "../components/layout/Copyright";
import SignIn from '../components/form/SignIn2';
import SignUp from '../components/form/SignUp';
import AddImgForm from '../components/form/AddImgForm';
import GridListImages from '../components/subComponents/GridListImages2'
import NotFoundPage from '../components/subComponents/NotFoundPage';
import Profile from '../components/subComponents/Profile'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
//    const context = useContext(Context)
/*    const [refresh, setRefresh] = React.useState(false)
    if (window.performance) {
      if (performance.navigation.type == 1) {
        alert( "This page is reloaded" );
      } else {
        alert( "This page is not reloaded");
      }
    } 
*/
/*
if (context.authObj.isAuthenticated() && !context.profileState) {
  console.log("Routes context 2", context.profileState);
                context.authObj.getProfile()
                .then(() => {
                    context.handleUserAddProfile(context.profileState)
                    context.handleUserLogin()
                }).catch(err => {
                    console.log(err)
                    history.replace('/signin')
                })
        }
*/
const context = useContext(Context)

/* React.useEffect(async () => {
      console.log("Routes context 1 ", context.profileState);
      if (context.authObj.isAuthenticated() && !context.profileState) {
console.log("Routes context 2", context.profileState);
              await context.authObj.getProfile()
              .then(() => {
                  context.handleUserAddProfile(context.profileState)
                  context.handleUserLogin()
              }).catch(err => {
                  console.log(err)
                  history.replace('/signin')
              })
      }
    },[])
  //console.log(context.authState, context.profileState);
 */

    return(
      <div>
          <Router history={history} >
          <Navigation/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={()=><HomePage />} />
              //console.log("Routes context ", context.profileState);

              <Route path='/authcheck' component={AuthCheck} />

              <Route path='/signin' component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute path="/profile" 
                            component={Profile} 
                            redirectTo="/signin"
                            fromPage="/profile" />

              <PrivateRoute path='/likeImg'
                            component={GridListImages} 
                            redirectTo="/signin"
                            fromPage="/likeImg" />
              <PrivateRoute path="/addImg" component={AddImgForm} 
                                           redirectTo="/"
                                           requiredAdmin={true}
                                           fromPage="/addImg" />
{/*              <Route path="/addImg" component={AddImgForm} />
              <Route path="/profile" component={Profile} />
  */}
              <Route component={()=><NotFoundPage/>} />
            </Switch>
          </div>
        <hr />
        <Copyright/>
        </Router>
      </div>
  )}



export default Routes;
