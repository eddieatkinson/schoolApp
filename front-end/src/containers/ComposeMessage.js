import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';
import GetMessageToList from '../actions/GetMessageToList';

class ComposeMessage extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){
		var level = this.props.auth.level;
		var messageTarget = this.props.match.params.messageTarget;
		var status = `${level}s`;
		var whichId = `${level}Id`;
		var userId;
		switch(whichId){
			case "teacherId":
				userId = this.props.auth.teacherId;
				break;
			case "parentId":
				userId = this.props.auth.parentId;
				break;
			case "studentId":
				userId = this.props.auth.studentId;
				break;
		}
	// 	console.log(userId)
	// 	this.props.getInbox(status, userId);
	this.props.getMessageToList(messageTarget, status, userId);
	}

	render(){
		var messageToListContents = this.props.messageToList;
		// console.log(this.props.messageToList);
		// var inboxContents = this.props.inbox;
		var messageToListNames = messageToListContents.map((name, index)=>{
			return(
				<h6>{name.fullName}</h6>
			)
		});
		return(
			<div>
				{messageToListNames}
			</div>
		)
	}
}


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth,
		inbox: state.inbox,
		messageToList: state.messageToList
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getInbox: GetInbox,
		getMessageToList: GetMessageToList
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ComposeMessage);