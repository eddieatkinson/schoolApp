import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import GetInbox from '../actions/GetInbox';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'


class Inbox extends Component {
	constructor() {
		super();
		this.state = ({
			show: false
		});
	}

	componentWillReceiveProps(newProps) {
		console.log(this.props);
		console.log(newProps);

		// if(newProps.)
		// var level = this.props.auth.level;
		// var status = `${this.props.auth.level}s`;
		// console.log(status);
		// console.log(this.props.auth);
		// var sent;
		// console.log(this.props.match);
		// if(this.props.match.path === '/sentMessages'){
		// 	sent = true;
		// }else{
		// 	sent = false;
		// }
		// // console.log(sent);
		// // switch(this.props.auth.statusId){
		// // 	case 1:
		// // 		status = 'teacher';
		// // 		break;
		// // 	case 2:
		// // 		status = 'parent';
		// // 		break;
		// // 	case 3:
		// // 		status = 'student';
		// // 		break;
		// // 	default:
		// // 		status = 'ERROR';
		// // }
		// // console.log(status);
		// var whichId = `${level}Id`;
		// console.log(whichId);
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
		// 	default:
		// 		break;	
		// }
		// console.log(userId)
		// this.props.getInbox(status, userId, sent);
		// sent = false;
		// this.props.history.push('/sentMessages');
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount() {
		console.log(this.props.match.params.status)
		if (this.props.match.params.status === "sent") {
			this.setState({
				show: true
			})
		}
		var level = this.props.auth.level;
		var status = `${this.props.auth.level}s`;
		console.log(status);
		console.log(this.props.auth);
		var sent;
		console.log(this.props.match);
		if (this.props.match.path === '/sentMessages') {
			sent = true;
		} else {
			sent = false;
		}
		// console.log(sent);
		// switch(this.props.auth.statusId){
		// 	case 1:
		// 		status = 'teacher';
		// 		break;
		// 	case 2:
		// 		status = 'parent';
		// 		break;
		// 	case 3:
		// 		status = 'student';
		// 		break;
		// 	default:
		// 		status = 'ERROR';
		// }
		// console.log(status);
		var whichId = `${level}Id`;
		console.log(whichId);
		var userId;
		switch (whichId) {
			case "teacherId":
				userId = this.props.auth.teacherId;
				break;
			case "parentId":
				userId = this.props.auth.parentId;
				break;
			case "studentId":
				userId = this.props.auth.studentId;
				break;
			default:
				break;
		}
		console.log(userId)
		this.props.getInbox(status, userId, sent);
		sent = false;
	}

	render() {
		console.log(this.props.match.path);
		console.log(this.props.inbox);
		var level = this.props.auth.level;
		var inboxContents = this.props.inbox;
		var toOrFrom;
		var inboxInfo;
		var getReceiverNames;
		var url;
		var whichId = `${this.props.auth.level}Id`;
		var userId;
		var receiverNameArray = [];
		var receiverName;
		switch (whichId) {
			case "teacherId":
				userId = this.props.auth.teacherId;
				break;
			case "parentId":
				userId = this.props.auth.parentId;
				break;
			case "studentId":
				userId = this.props.auth.studentId;
				break;
			default:
				break;
		}
		if (this.props.match.path === '/sentMessages') {
			toOrFrom = <th>To</th>
			inboxInfo = inboxContents.map((item, index) => {
				console.log(item);
				return (
					<tr key={index}>
						<td>{item.date}</td>
						<td>{item.receiverName}</td>
						<td><Link to={`/${level}s/${item.id}/inboxContents/1`}>{item.subject}</Link></td>
					</tr>
				)
				// url = `${window.apiHost}/receiverNames/${item.id}/${item.receiverStatus}/get`;
				// var getNamePromise = new Promise((resolve, reject)=>{
				// 	axios.get(url)
				// 		.then((response)=>{
				// 			console.log(response.data);
				// 			receiverNameList.push(response.data[0].fullName);
				// 			resolve
				// 		});
				// })

				// console.log(receiverName);
			});
			// console.log(receiverNameList);
		} else {
			toOrFrom = <th>From</th>
			inboxInfo = inboxContents.map((item, index) => {
				return (
					<tr key={index} className={item.messageStatus}>
						<td>{item.date}</td>
						<td>{item.senderName}</td>
						<td><Link to={`/${level}s/${item.id}/inboxContents/0`}>{item.subject}</Link></td>
					</tr>
				)
			});
		}


		var messageToButton = '';
		level = this.props.auth.level;
		if (level === 'teacher') {
			messageToButton = <div>
				<Link to='/compose/students'><Button className='composeMessage'>Compose to Student</Button></Link>
				<Link to='/compose/parents'><Button className='composeMessage'>Compose to Parent</Button></Link>
			</div>
		} else {
			messageToButton = <Link to='/compose/teachers'><Button className='composeMessage'>New Message</Button></Link>
		}
		console.log(this.state.show)
		return (
			<div>
				<SweetAlert
					show={this.state.show}
					title="Status"
					text="Message Sent"
					onConfirm={() => this.setState({ show: false })}
				/>
				{messageToButton}
				<Link to='/sentMessages'><Button className='sentMessage'>Sent Messages</Button></Link>
				<Table bordered={true} hoverable={true} responsive={true}>
					<thead>
						<tr>
							<th>Date</th>
							{toOrFrom}
							<th>Subject</th>
						</tr>
					</thead>
					<tbody>
						{inboxInfo}
					</tbody>
				</Table>
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
		getInbox: GetInbox
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);