import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';



class Inbox extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){
		var status;
		switch(this.props.auth.statusId){
			case 1:
				status = 'teacher';
				break;
			case 2:
				status = 'parent';
				break;
			case 3:
				status = 'student';
				break;
			default:
				status = 'ERROR';
		}
		// console.log(status);
		var userId = `${status}id`;
		console.log(userId);
		this.props.getInbox(status, userId);
	}

	render(){
		// console.log(this.props.auth.statusId);
		return(
			<div>
				<h1>Inbox</h1>
			</div>
		)
	}
}


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth,
		inbox: state.inbox
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getInbox: GetInbox
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Inbox);