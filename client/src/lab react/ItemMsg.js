import React from 'react';
import Button from './Button';

export default class ItemMsg extends React.Component {
  render() {
    return (
      <li>{this.props.msg} 
      	<Button action={this.props.action}>X
{/*      	<span role="img" aria-label="X">&#x274C;</span>
*/}
        </Button></li>
    );
  }
}