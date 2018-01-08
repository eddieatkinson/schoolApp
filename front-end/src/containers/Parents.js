import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Col, Card, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';
import CourseInfo from './CourseInfo';
import Courses from './Courses';
import Inbox from './Inbox';
import InboxContents from './InboxContents';
import Calendar from './Calendar';
import ComposeMessage from './ComposeMessage';
import Logout from './Logout';
import ParentCourseView from './ParentCourseView';



class Parents extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	render(){
		console.log("You've made it this far!");
		return(
			<Router>
				<div>
					<Row>
						<Col s={2} style={{padding: 0}}>
							<Navbar />
						</Col>
						<Col s={10} style={{'marginLeft':220}}>
							<Route path='/courses/:parentId/get' component={ParentCourseView}/>
							<Route path='/parents/inbox' component={Inbox}/>
							<Route path='/parents/:messageId/inboxContents' component={InboxContents} />
							<Route path='/compose/:messageTarget' component={ComposeMessage} />
							<Route path='/teachers/calendar' component={Calendar}/>
							<Route path='/logout' component={Logout}/>
						</Col>
					</Row>
				</div>
			</Router>
		)
	}
}


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Parents);