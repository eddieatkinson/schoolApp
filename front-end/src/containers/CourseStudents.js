import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-materialize';
import axios from 'axios';

class CourseStudents extends Component{
	constructor(){
		super();
		this.state = {
			courseStudents: []
		}
	}
	componentDidMount(){
		var teacherId = this.props.match.params.teacherId;
		const url = `${window.apiHost}/teachers/students/${teacherId}/get`;
		axios.get(url)
			.then((response)=>{
				var studentInfo = response.data;
				var studentList = studentInfo.map((student, index)=>{
					return(
						<tr key={index}>
							<td><Link to={`/courseInfo/${student.studentId}`}>{`${student.firstName} ${student.lastName}`}</Link></td>
							<td>{student.email}</td>
							<td>{student.phone}</td>
						</tr>
					);
				});
				this.setState({
					courseStudents: studentList
				});
			});
	}	
	// const product = props.product;
	render(){
		return(
			<Table bordered='true' hoverable='true' responsive='true'>
				<thead>
					<tr>
						<th>Student Name</th>
						<th>Student Email</th>
						<th>Student Phone</th>
					</tr>
				</thead>
				<tbody>
					{this.state.courseStudents}
				</tbody>
			</Table>
		);
	}
}

export default CourseStudents;