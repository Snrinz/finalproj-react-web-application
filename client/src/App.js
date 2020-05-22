import React, {Component} from 'react';
import './App.css';
import ContextState2 from './contextStateRoutes';

// Footer material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

export default class App extends Component {
	render() {
		return (
				<body>
					<ContextState2 />
				</body>	        
    );
	}
}