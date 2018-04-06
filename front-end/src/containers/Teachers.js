import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';
import CourseInfo from './CourseInfo';
import Courses from './Courses';
import StudentInfo from './StudentInfo';
import Inbox from './Inbox';
import InboxContents from './InboxContents';
import Calendar from './Calendar';
import Logout from './Logout';
import GetCourses from '../actions/GetCourses';
import CourseStudents from './CourseStudents';
import AddAssignments from './AddAssignments';
import ComposeMessage from './ComposeMessage';
import AddEvents from './AddEvents';
// import Assignments from '../components/Assignments';

class Teachers extends Component {
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps) {
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
	}
	componentDidMount() {
		// console.log(this.props.auth)
		this.props.getCourses(this.props.auth.level, this.props.auth.teacherId);
	}

	render() {
		// console.log("You've made it this far!");
		// console.log(this.props.auth.teacherId);
		return (
			<Router>
				<div>
					<Row>
						<Col s={2} style={{ padding: 0 }}>
							<Navbar />
						</Col>
						<Col s={10} style={{ 'marginLeft': 220 }}>
							<Route path='/courseInfo/:courseId' component={CourseInfo} />
							<Route path='/studentInfo/:studentId' component={StudentInfo} />
							<Route exact path='/teachers' component={Courses} />
							<Route path='/teachers/courses' component={Courses} />
							<Route path='/teachers/studentInfo' component={StudentInfo} />
							<Route exact path='/teachers/inbox' component={Inbox} />
							<Route path='/teachers/inbox/:status' component={Inbox} />
							<Route path='/sentMessages' component={Inbox} />
							<Route path='/teachers/:messageId/inboxContents/:doNotChange' component={InboxContents} />
							<Route path='/compose/:messageTarget' component={ComposeMessage} />
							<Route path='/teachers/calendar' component={Calendar} />
							<Route path='/logout' component={Logout} />
							<Route path='/addEvents' component={AddEvents} />
							<Route path='/courseInfo/:teacherId/students' component={CourseStudents} />
							<Route path='/teachers/:courseId/addAssignments' component={AddAssignments} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);