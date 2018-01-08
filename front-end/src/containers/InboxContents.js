import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-materialize';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';
import GetMessageCount from '../actions/GetMessageCount';

class InboxContents extends Component{
	constructor(){
		super();
		this.state = {
			message: []
		}
		this.getMessage = this.getMessage.bind(this);
	}

	getMessage(){
		var messageId = this.props.match.params.messageId;
		const url = `${window.apiHost}/teachers/message/${messageId}/get`; // uses "teachers" Express route but works for everyone
		axios.get(url)
			.then((response)=>{
				this.setState({
					message: response.data
				});
			});
	}

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){
		this.getMessage();
		var userId;
		var level = this.props.auth.level;
		switch(level){
			case "teacher":
				userId = this.props.auth.teacherId;
				break;
			case "parent":
				userId = this.props.auth.parentId;
				break;
			case "student":
				userId = this.props.auth.studentId;
				break;
		}
		this.props.getMessageCount(level, userId);
		// var level = this.props.auth.level;
		// var status = `${this.props.auth.level}s`;
		// console.log(status);

		// var whichId = `${level}Id`;
		// var userId;
		// switch(whichId){
		// 	case "teacherId":
		// 		userId = this.props.auth.teacherId;
		// 		break;
		// 	case "parentId":
		// 		userId = this.props.auth.parentId;
		// 		break;
		// 	case "studentId":
		// 		userId = this.props.auth.studentId;
		// 		break;
		// }
		// console.log(userId)
		// this.props.getInbox(status, userId);
	}

	render(){
		// console.log(this.props.inbox);
		var messageContents = this.state.message[0];
		var messageDisplay = ''
		console.log(messageContents);
		if(messageContents !== undefined){
			messageDisplay = [
				<div>
					<h4>{messageContents.subject}</h4>
					<hr />
					<h5>{messageContents.senderName}</h5>
					<h6>{messageContents.date}</h6>
					<hr />
					<p>{messageContents.body}</p>
				</div>
			]
		}
		// var inboxContents = this.props.inbox;
		// var inboxInfo = inboxContents.map((item, index)=>{
		// 	return(
		// 		<tr>
		// 			<td>{item.date}</td>
		// 			<td>{item.senderName}</td>
		// 			<td>{item.subject}</td>
		// 		</tr>
		// 	)
		// });
		return(
			<div>
				{messageDisplay}
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
		getInbox: GetInbox,
		getMessageCount: GetMessageCount
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(InboxContents);