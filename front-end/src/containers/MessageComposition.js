import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Input, Row, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';
import GetMessageToList from '../actions/GetMessageToList';
import SendMessage from '../actions/SendMessage';

class MessageComposition extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		var subject = document.getElementById('subject').value;
		var body = document.getElementById('body').value;
		// var receiver = document.getElementById('to').value;
		var receiverLevel = this.props.match.params.messageTarget;
		receiverLevel = receiverLevel.slice(0, -1); // to remove the "s";
		var receiverStatusId;
		switch (receiverLevel) {
			case "teacher":
				receiverStatusId = 1;
				break;
			case "parent":
				receiverStatusId = 2;
				break;
			case "student":
				receiverStatusId = 3;
				break;
			default:
				break;
		}
		var receiverId = this.props.match.params.messageTargetId;
		var receiverName = this.props.match.params.messageTargetName;
		var senderName = this.props.auth.fullName;
		var senderLevel = this.props.auth.level;
		var senderId;
		switch (senderLevel) {
			case "teacher":
				senderId = "teacherId";
				break;
			case "parent":
				senderId = "parentId";
				break;
			case "student":
				senderId = "studentId";
				break;
			default:
				break;
		}
		senderId = this.props.auth.teacherId;
		var senderStatusId = this.props.auth.statusId;
		console.log(this.props.auth);
		var formData = {
			subject,
			body,
			receiverName,
			receiverId,
			receiverLevel,
			receiverStatusId,
			senderName,
			senderLevel,
			senderStatusId,
			senderId
		}
		console.log(formData);
		this.props.sendMessage(formData);
		this.props.history.push(`/${senderLevel}s/inbox/sent`);
	}

	componentWillReceiveProps(newProps) {
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount() {
		// 	var level = this.props.auth.level;
		// 	var messageTarget = this.props.match.params.messageTarget;
		// 	var status = `${level}s`;
		// 	var whichId = `${level}Id`;
		// 	var userId;
		// 	switch(whichId){
		// 		case "teacherId":
		// 			userId = this.props.auth.teacherId;
		// 			break;
		// 		case "parentId":
		// 			userId = this.props.auth.parentId;
		// 			break;
		// 		case "studentId":
		// 			userId = this.props.auth.studentId;
		// 			break;
		// 	}
		// // 	console.log(userId)
		// // 	this.props.getInbox(status, userId);
		// this.props.getMessageToList(messageTarget, status, userId);
	}

	render() {
		// var messageToListContents = this.props.messageToList;
		// // console.log(this.props.messageToList);
		// // var inboxContents = this.props.inbox;
		// var messageToListNames = messageToListContents.map((name, index)=>{
		// 	return(
		// 		<h6>{name.fullName}</h6>
		// 	)
		// });
		return (
			<div>
				<form>
					<Row>
						<h4>To: <span id="to">{this.props.match.params.messageTargetName}</span></h4>
						<Input id="subject" label="Subject" />
						<textarea id="body" label="Message"></textarea>
					</Row>
					<Button className='sendMessage' onClick={this.handleSubmit}>Send</Button>
				</form>
			</div>
		)
	}
}


function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth,
		inbox: state.inbox,
		messageToList: state.messageToList
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getInbox: GetInbox,
		getMessageToList: GetMessageToList,
		sendMessage: SendMessage
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageComposition);