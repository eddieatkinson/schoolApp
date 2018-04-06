import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetCourseInfo from '../actions/GetCourseInfo';

class CourseNav extends Component {
	constructor() {
		super();
		this.state = {
			courseName: ''
		}
		this.getCourseName = this.getCourseName.bind(this);
	}

	getCourseName(courseId) {
		console.log(courseId);
		const url = `${window.apiHost}/teachers/courseInfo/${courseId}/get`;
		axios.get(url)
			.then((response) => {
				console.log(response);
				this.setState({
					courseName: response.data[0].courseName
				});
			});
	}

	componentDidMount() {
		var courseId = this.props.courseId;
		console.log(courseId);
		this.getCourseName(courseId);
	}

	render() {
		// console.log(this.props.auth.teacherId);
		// console.log(this.state);
		// console.log(this.auth);
		var studentItem;
		if (this.props.auth.level === "teacher") {
			studentItem = <NavItem><Link to={`/courseInfo/${this.props.auth.teacherId}/students`}>Students</Link></NavItem>
		} else {
			studentItem = '';
		}
		return (
			<Navbar className="course-nav" brand={this.state.courseName} left>
				<Link to={`/syllabus`}><NavItem>Syllabus</NavItem></Link>
				<Link to={`/courseInfo/${this.props.courseId}/assignments`}><NavItem>Assignments</NavItem></Link>
				<Link to={`/courseInfo/${this.props.courseId}/grades`}><NavItem>Grades</NavItem></Link>
				{studentItem}
			</Navbar>
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
		getCourseInfo: GetCourseInfo
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseNav);

