import React, {Component} from 'react';
import MessageBox from './MessageBox';
import ToggleShow from './ToggleShow';
import ItemMsg from './ItemMsg';
import Button from './Button';


export default class FormSample extends Component {
	constructor() {
	    super();
	    this.state = { 
	      msgs: [], 
	      currentMsg: "",
	      isShowed: false,
	    };
	}

	handleInputChange = e => {
	    this.setState({currentMsg: e.target.value})
	}

	handleClick = () => {
		var msg = this.state.currentMsg.trim()
		if (msg.length > 0) {	
		    let msgsCopy = this.state.msgs.slice();
		    msgsCopy.push(this.state.currentMsg);
		    this.setState({msgs: msgsCopy, currentMsg: "", isShowed: (msgsCopy.length>0)})
		}
		else { alert("No message to append!"); }
	}
	deleteMsg = (i) => {
	    let msgsCopy = this.state.msgs.slice();
	    msgsCopy.splice(i,1);
	    this.setState({msgs: msgsCopy, isShowed: (msgsCopy.length>0)})
	}

	render() {
	    let msgList = this.state.msgs.map((e, i) => {
	   		return (
    	    	<ItemMsg key={e.substring(0,3)+i} msg={e} action={() => this.deleteMsg(i)}></ItemMsg>
      		);
    	});

	   return(
		<div>
			<MessageBox className="alert-block alert-error" style={{fontSize:'2em'}}>
				Input New Message
			</MessageBox>
		    <input placeholder="Enter message" value={this.state.currentMsg} 
        			onChange={this.handleInputChange}/>
			<Button block action={this.handleClick}>
				Append
			</Button>
			<hr />
			<ToggleShow isShowed={this.state.isShowed}>
				<MessageBox className="alert-block alert-success" style={{fontSize:'2em'}}>
					Blog Message
				</MessageBox>
				<ul>
				{msgList}
				</ul>
			</ToggleShow>
		</div>
		);
	}
}
