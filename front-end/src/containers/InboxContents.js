import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Table } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';



class InboxContents extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){
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
		console.log(this.props.inbox);
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
				CONTENTS HERE
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

export default connect(mapStateToProps,mapDispatchToProps)(InboxContents);