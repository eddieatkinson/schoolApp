import React, { Component } from 'react';
import { Table, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import AddAssignmentsAction from '../actions/AddAssignmentsAction';

class Assignments extends Component{
	constructor(){
		super();
		this.state = {
			grades: []
		}
		this.createAssignment = this.createAssignment.bind(this);
	}

	createAssignment(){
		// this.props.history.push(`/teachers/${this.props.match.params.courseId}/addAssignments`);
		// this.props.history.push(`https://www.google.com`);
	}

	componentDidMount(){
		var courseId = this.props.match.params.courseId;
		const url = `${window.apiHost}/teachers/grades/${courseId}/get`;
		axios.get(url)
			.then((response)=>{
				var gradeDataFull = response.data;
				var gradeData = gradeDataFull.map((grade, index)=>{
					return(
						<tr key={index}>
							<td>{`${grade.firstName} ${grade.lastName}`}</td>
							<td>{grade.assName}</td>
							<td>{grade.status}</td>
							<td>{grade.grade}</td>
						</tr>
					);
				});
				this.setState({
					grades: gradeData
				});
			});
	}	
	// const product = props.product;
	render(){
		var addGrade = ''
		// console.log(this.props);
		if(this.props.auth.statusId === 1){
			addGrade = (
				<Link to={`/teachers/${this.props.match.params.courseId}/addAssignments`}><Button>Add grade</Button></Link>
			)
		}

		return(
			<div>
				<Table>
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Assignment Name</th>
							<th>Assignment Status</th>
							<th>Grade</th>
						</tr>
					</thead>
					<tbody>
						{this.state.grades}
					</tbody>
				</Table>
				<div>
					{addGrade}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		studentInfo: state.studentInfo
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addAssignmentsAction: AddAssignmentsAction
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);