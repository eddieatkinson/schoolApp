import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetCourseInfo from '../actions/GetCourseInfo';

class CourseNav extends Component{
	constructor(){
		super();
		this.state = {
			courseName: ''
		}
		this.getCourseName = this.getCourseName.bind(this);
	}

	getCourseName(courseId){
		console.log(courseId);
		const url = `${window.apiHost}/teachers/courseInfo/${courseId}/get`;
		const axiosPromise = axios.get(url)
			.then((response)=>{
				console.log(response);
				this.setState({
					courseName: response.data[0].courseName
				});
			});
	}

	componentDidMount(){
		var courseId = this.props.courseId;
		this.getCourseName(courseId);
	}

	render(){
		console.log(this.state);
		return(
			<Navbar className="course-nav" brand={this.state.courseName} left>
				<NavItem>Syllabus</NavItem>
				<NavItem><Link to={`/courseInfo/${this.props.courseId}/assignments`}>Assignments</Link></NavItem>
				<NavItem>Grades</NavItem>
				<NavItem>Students</NavItem>
			</Navbar>
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
		getCourseInfo: GetCourseInfo
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseNav);