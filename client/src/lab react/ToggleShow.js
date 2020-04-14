import React, {Component} from 'react';

export default class ToggleShow extends Component {
	render() {
		return (
			<div>
			{this.props.isShowed? <div>{this.props.children}</div>: <div />}
			</div>
		);
	}
}