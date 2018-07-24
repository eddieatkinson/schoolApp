import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Col, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';
import CourseInfo from './CourseInfo';
import Courses from './Courses';
import Inbox from './Inbox';
import InboxContents from './InboxContents';
import Calendar from './Calendar';
import ComposeMessage from './ComposeMessage';
import GetCourses from '../actions/GetCourses';
import Logout from './Logout';




class Parents extends Component {
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps) {
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}
	componentDidMount() {
		// console.log(this.props.auth)
		this.props.getCourses(this.props.auth.level, this.props.auth.parentId);
	}
	render() {
		console.log("You've made it this far!");
		return (
			<Router>
				<div>
					<Row>
						<Col s={2} style={{ padding: 0 }}>
							<Navbar />
						</Col>
						<Col s={10} style={{ 'marginLeft': 220 }}>
							<Route path='/courseInfo/:courseId' component={CourseInfo} />
							<Route exact path='/parents' component={Courses} />
							<Route path='/parents/courses' component={Courses} />
							<Route exact path='/parents/inbox' component={Inbox} />
							<Route path='/parents/inbox/:status' component={Inbox} />
							<Route path='/parents/:messageId/inboxContents' component={InboxContents} />
							<Route path='/compose/:messageTarget' component={ComposeMessage} />
							<Route path='/teachers/calendar' component={Calendar} />
							<Route path='/logout' component={Logout} />
						</Col>
					</Row>
				</div>
			</Router>
		)
	}
}


function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth,
		courses: state.courses
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCourses: GetCourses
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parents);