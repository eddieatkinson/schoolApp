import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';
import GetMessageCount from '../actions/GetMessageCount';

class InboxContents extends Component {
	constructor() {
		super();
		this.state = {
			message: []
		}
		this.getMessage = this.getMessage.bind(this);
	}

	getMessage(doNotChange) {
		var messageId = this.props.match.params.messageId;
		var doNotChange = this.props.match.params.doNotChange;
		console.log(doNotChange);
		const url = `${window.apiHost}/teachers/message/${messageId}/${doNotChange}/get`; // uses "teachers" Express route but works for everyone
		axios.get(url)
			.then((response) => {
				this.setState({
					message: response.data
				});
				var userId;
				var level = this.props.auth.level;
				switch (level) {
					case "teacher":
						userId = this.props.auth.teacherId;
						break;
					case "parent":
						userId = this.props.auth.parentId;
						break;
					case "student":
						userId = this.props.auth.studentId;
						break;
					default:
						break;
				}
				this.props.getMessageCount(level, userId);
			});
	}

	componentWillReceiveProps(newProps) {
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount() {
		var doNotChange = this.props.match.params.doNotChange;
		this.getMessage(doNotChange);

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

	render() {
		// console.log(this.props.inbox);
		var messageContents = this.state.message[0];
		var messageDisplay = ''
		console.log(messageContents);
		var senderLevel;
		if (messageContents !== undefined) {
			switch (messageContents.senderStatus) {
				case 1:
					senderLevel = "teachers";
					break;
				case 2:
					senderLevel = "parents";
					break;
				case 3:
					senderLevel = "students";
					break;
			}
			// console.log(messageContents);
			messageDisplay = [
				<div>
					<h5 className='messageTitle'>{messageContents.subject}</h5>
					<hr />
					<div>
						<h5>{messageContents.senderName}&nbsp;&nbsp;&nbsp;&nbsp;<Link to={`/compose/${senderLevel}/${messageContents.senderName}/${messageContents.senderId}`}><Button right>Reply</Button></Link></h5>
					</div>
					<h6>{messageContents.date}</h6>
					<hr />
					<p>{messageContents.body}</p>
				</div>
			]
		}
		// var inboxContents = this.props.inbox;
		// var inboxInfo = inboxContents.map((item, index)=>{
		// 	return(
		// 		<tr key={index}>
		// 			<td>{item.date}</td>
		// 			<td>{item.senderName}</td>
		// 			<td>{item.subject}</td>
		// 		</tr>
		// 	)
		// });
		return (
			<div>
				{messageDisplay}
			</div>
		)
	}
}

function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth,
		inbox: state.inbox
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getInbox: GetInbox,
		getMessageCount: GetMessageCount
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxContents);