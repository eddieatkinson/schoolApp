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
import Calendar from './Calendar';
import Logout from './Logout';
import GetCourses from '../actions/GetCourses';
import CourseStudents from './CourseStudents';
// import Assignments from '../components/Assignments';


class Teachers extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
	}
	componentDidMount(){
		// console.log(this.props.auth)
		this.props.getCourses(this.props.auth.teacherId);
	}

	render(){
		console.log("You've made it this far!");
		console.log(this.props.auth.teacherId);
		return(
			<Router>
				<div>
					<Row>
						<Col s={2} style={{padding: 0}}>
							<Navbar />
						</Col>
						<Col s={10} style={{'marginLeft':220}}>
							<Route path='/courseInfo/:courseId' component={CourseInfo} />
							<Route path='/studentInfo/:studentId' component={StudentInfo} />
							<Route exact path='/teachers' component={Courses}/>
							<Route path='/teachers/courses' component={Courses}/>
							<Route path='/teachers/studentInfo' component={StudentInfo}/>
							<Route path='/teachers/inbox' component={Inbox}/>
							<Route path='/teachers/calendar' component={Calendar}/>
							<Route path='/logout' component={Logout}/>
							<Route path='/courseInfo/:teacherId/students' component={CourseStudents} />
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
		auth: state.auth,
		courses: state.courses
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCourses: GetCourses
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Teachers);