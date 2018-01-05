import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { Table } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetCourseInfo from '../actions/GetCourseInfo';
import CourseNav from './CourseNav';
import Assignments from './Assignments';
import CourseStudents from './CourseStudents';
// import DataTables from 'material-ui-datatables';

class CourseInfo extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){
		var courseId = this.props.match.params.courseId;
		this.props.getCourseInfo(courseId);
	}

	render(){
		return (
			<div>
				<CourseNav courseId={this.props.match.params.courseId} />
				<Route path='/courseInfo/:courseId/assignments' component={Assignments} />
			</div>
		);
	}
}


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth,
		courses: state.courses,
		assignments: state.assignments
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCourseInfo: GetCourseInfo
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseInfo);