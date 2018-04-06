import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetStudentInfo from '../actions/GetStudentInfo';

class StudentInfo extends Component {
	// constructor(){
	// 	super();
	// }

	componentDidMount() {
		var studentId = this.props.match.params.studentId;
		console.log(studentId);
		this.props.getStudentInfo(studentId);

	}

	render() {
		var studentParentInfo = this.props.studentInfo.map((info, index) => {
			console.log(info);
			return (
				<tr>
					<td>
						<Link to={`/compose/parents/${info.parentFirstName} ${info.parentLastName}/${info.parentsId}`}>
							{`${info.parentFirstName} ${info.parentLastName}`}
						</Link>
					</td>
					<td>
						{info.parentEmail}
					</td>
					<td>
						{info.parentPhone}
					</td>
				</tr>
			)
		});
		// console.log("You've made it this far!");
		// console.log("The student info is:");
		// console.log(this.props.studentInfo);
		return (
			<Table bordered={true} hoverable={true} responsive={true}>
				<thead>
					<tr>
						<th data-field="parentName">Parent Name</th>
						<th data-field="parentEmail">Email</th>
						<th data-field="parentNumber">Number</th>
					</tr>
				</thead>
				<tbody>
					{studentParentInfo}
				</tbody>
			</Table>
		)
	}
}


function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth,
		studentInfo: state.studentInfo
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getStudentInfo: GetStudentInfo
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfo);