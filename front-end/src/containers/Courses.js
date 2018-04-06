import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import DataTables from 'material-ui-datatables';

class Courses extends Component {
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps) {
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	render() {

		var dataTable = '';
		// console.log(this.props.courses);
		if (this.props.courses.list !== undefined) {
			dataTable = this.props.courses.list.map((course, index) => {
				return (
					<tr key={index}>
						<td className='courseInfo'>
							<Link to={`/courseInfo/${course.id}`} >{course.courseName}</Link>
						</td>
						<td>
							{course.courseDesc}
						</td>
					</tr>
				)
			});
		}

		// console.log("You've made it this far!");
		// console.log(this.props.courses)
		return (
			<Table bordered={true} hoverable={true} responsive={true}>
				<thead>
					<tr>
						<th data-field="courseName">Course</th>
						<th data-field="description">Course Description</th>
					</tr>
				</thead>
				<tbody>
					{dataTable}
				</tbody>
			</Table>
		);
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
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);