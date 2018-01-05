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

		// var dataTable = '';
		// console.log(this.props.courses);
		// if(this.props.courses !== undefined){
		// 	dataTable = this.props.courses.map((course, index)=>{
		// 		return (
		// 			<h1>
		// 		)
		// 	});
		// }
		// // 	const TABLE_COLUMNS = [
		// // 		{
		// 			key: 'name',
		// 			label: 'Course Name',
		// 		}, {
		// 			key: 'description',
		// 			label: 'Description',
		// 		}
		// 	];

		// 	const TABLE_DATA = this.props.courses.map((course, index)=>{
		// 		return {
		// 			name: course.courseName,
		// 			description: course.desc
		// 		}
		// 	});

		// 	var dataTable = (<DataTables
		// 			height={'auto'}
		// 			selectable={false}
		// 			showRowHover={true}
		// 			columns={TABLE_COLUMNS}
		// 			data={TABLE_DATA}
		// 			showCheckboxes={false}
		// 			page={1}
		// 			count={100}
		// 		/>);
		// }

		// console.log("You've made it this far!");
		// console.log(this.props.courses)
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