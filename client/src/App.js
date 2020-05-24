import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContextState2 from './contextStateRoutes';
// import Dashboard from './Dashboard/Dashboard';

export default class App extends Component {
	render() {
		return (
			// <Router>   
				<body>
					<ContextState2 />

					{/* <Switch>
						<Route path="/dashboard" component={Dashboard} />
					</Switch> */}

				</body>
			// </Router>      
    );
	}
}