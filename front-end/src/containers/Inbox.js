import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-materialize';
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
		var level = this.props.auth.level;
		var status = `${this.props.auth.level}s`;
		console.log(status);
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
		console.log(userId)
		this.props.getInbox(status, userId);
	}

	render(){
		console.log(this.props.inbox);
		var inboxContents = this.props.inbox;
		var inboxInfo = inboxContents.map((item, index)=>{
			return(
				<tr>
					<td>{item.date}</td>
					<td>{item.senderName}</td>
					<td><Link to={`/teachers/${item.id}/inboxContents`}>{item.subject}</Link></td>
				</tr>
			)
		});
		return(
			<Table>
				<thead>
					<tr>
						<th>Date</th>
						<th>From</th>
						<th>Subject</th>
					</tr>
				</thead>
				<tbody>
					{inboxInfo}
				</tbody>
			</Table>
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