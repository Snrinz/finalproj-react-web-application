import React, { useContext } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router';
import history from './authUtils/history';
import Context from './authUtils/Context';
import AuthCheck from './authUtils/authcheck';

import HomePage from '../Homepage';
import Navigation from "../components/layout/Navigation";
// import Copyright from "../components/layout/Copyright";
import SignIn from '../components/form/SignIn';
import SignUp from '../components/form/SignUp';
import NotFoundPage from '../components/subComponents/NotFoundPage';
// import PrivateRoute from './PrivateRoute'
import DetailMovie from '../DetailMovie';
import Mostrating from '../Moviepage/Mostrating';
import Comingsoon from '../Moviepage/Comingsoon';
import Onair from '../Moviepage/Onair';
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
              {/* console.log("Routes context ", context.profileState); */}

              <Route path='/authcheck' component={AuthCheck} />

              <Route path='/signin' component={SignIn} />
              <Route exact path="/signup" component={SignUp} />

              {/* <Route exact path="/" component={MainPage}  /> */}
              <Route path="/detail-movie/:movie_id" component={DetailMovie} />
              {/* <Route path="/sign-up" component={Register} />
              <Route path="/sign-in" component={SignIn} /> */}
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route path="/onairpage" component={Onair} />
              <Route path="/comingpage" component={Comingsoon} />
              <Route path="/toppage" component={Mostrating} />
              {/* <PrivateRoute path="/profile" 
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
                                           fromPage="/addImg" /> */}
{/*              <Route path="/addImg" component={AddImgForm} />
              <Route path="/profile" component={Profile} />
  */}
              <Route component={()=><NotFoundPage/>} />
            </Switch>
          </div>
        <hr />
        </Router>
      </div>
  )}


export default Routes;
