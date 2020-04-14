import React from 'react';

const style = {
	color: '#3a87ad',
	backgroundColor: '#d9edf7',
	borderColor: '#bce8f1',
};
/*
const Button = props => {
	return <button style={{...style}} onClick={props.action}>{props.children}</button>
};
*/
class Button extends React.Component {
	render() {
		return <button style={{...style}} 
		onClick={this.props.action}>{this.props.children}</button>
	}
}
export default Button;