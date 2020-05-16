import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navigation from './Navigation'
import MainPage from './MainPage';
import DetailMovie from './DetailMovie';
import Register from './Register';
import SignIn from './SignIn';

export default class App extends Component {
	render() {
		return (
			<Router>
				<body>
					<Navigation />
				</body>	

				{/* Because with render you are not passing the default 
                props passed by the router into component
                , like match, history etc.
                When you write this:
                <PageStart key={this.props.location.key} />
                It means no props value in PageStart component.
                Write it like this:
                render = {props => <PageStart {...props} key={this.props.location.key} /> } />
				Now {...props} will pass all the value into PageStart component. 
				https://stackoverflow.com/questions/46197178/cannot-read-property-params-of-undefined-react-router-4*/}
				{/* https://stackoverflow.com/questions/54463073/react-router-match-with-params */}
				<Switch>
                    <Route exact path="/" component={MainPage}  />
					<Route path="/detail-movie/:movie_id" component={DetailMovie} />
					<Route path="/sign-up" component={Register} />
					<Route path="/sign-in" component={SignIn} />
				</Switch>
			</Router>
        
    );
	}
}