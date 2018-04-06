import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';
import CourseInfo from './CourseInfo';
import Courses from './Courses';
import Inbox from './Inbox';
import InboxContents from './InboxContents';
import Calendar from './Calendar';
import GetCourses from '../actions/GetCourses';
import ComposeMessage from './ComposeMessage';
import Logout from './Logout';



class Students extends Component {
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
		this.props.getCourses(this.props.auth.level, this.props.auth.studentId);
	}

	render() {
		// console.log("You've made it this far!");
		return (
			<Router>
				<div>
					<Row>
						<Col s={2} style={{ padding: 0 }}>
							<Navbar />
						</Col>
						<Col s={10} style={{ 'marginLeft': 220 }}>
							<Route path='/courseInfo/:courseId' component={CourseInfo} />
							<Route exact path='/students/inbox' component={Inbox} />
							<Route path='/students/inbox/:status' component={Inbox} />
							<Route exact path='/students' component={Courses} />
							<Route path='/students/courses' component={Courses} />
							<Route path='/students/:messageId/inboxContents' component={InboxContents} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Students);