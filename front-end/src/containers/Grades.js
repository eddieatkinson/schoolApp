import React, { Component } from 'react';
import { Table, Button, Input } from 'react-materialize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import AddAssignmentsAction from '../actions/AddAssignmentsAction';
import EditAction from '../actions/EditAction';

class Grades extends Component{
	constructor(){
		super();
		this.state = {
			grades: []
		}
		this.changeStatus = this.changeStatus.bind(this);
		this.changeGrade = this.changeGrade.bind(this);
		this.editInformation = this.editInformation.bind(this);
	}

	changeStatus(event, aid, sid, index){
		console.log("Change status");
		var newStatus = event.target.previousSibling.childNodes[0].value
		console.log(newStatus);
		console.log("The assignment ID, Eddie!",aid);
		// console.log(this.state);
		var newData = {
			newStatus: newStatus,
			aid: aid,
			sid: sid
		}
		console.log(newData);
		var axiosPromise = axios({
			url: `${window.apiHost}/teachers/changeStatus`,
			method: 'POST',
			data: newData
		}).then((response)=>{
			console.log(response.data);
			if(response.data.msg === 'statusUpdated'){
				// make a copy of the grades state var so we can change the student
				var newGrades = {...this.state.grades};
				var courseId = this.props.match.params.courseId;
				const url = `${window.apiHost}/teachers/grades/${courseId}/get`;
				axios.get(url)
					.then((response)=>{
						var gradeDataFull = response.data;
						console.log(gradeDataFull);
						var gradeData = gradeDataFull.map((grade, index)=>{
							return(
								<tr key={index}>
									<td>{`${grade.firstName} ${grade.lastName}`}</td>
									<td>{grade.assName}</td>
									<td>{grade.status}</td>
									<td>
										<Input id='newStatus' />
										<Button onClick={(event)=>{
											this.changeStatus(event,grade.aid,grade.sid, index)
										}}>
											Change Status
										</Button>
									</td>
									<td>{grade.grade}</td>
									<td><Input id='newGrade' /><Button onClick={this.changeGrade}>Change Grade</Button></td>
								</tr>
							);
						});
					this.setState({
						grades: gradeData
					});
				})
			}
		})
	}

	changeGrade(){
		var newGrade = document.getElementById('newGrade').value;
		var aid = document.getElementById('newGrade').getAttribute('aid');
		var studentId = document.getElementById('newGrade').getAttribute('studentId');
		var newData = {
			newGrade: newGrade,
			aid: aid,
			studentId: studentId
		}
		var axiosPromise = axios({
			url: `${window.apiHost}/teachers/changeGrade`,
			method: 'POST',
			data: newData
		});
		this.props.stopEditAction();
	}

	editInformation(){
		this.props.editAction();
	}

	componentWillReceiveProps(newProps){
		console.log(newProps);
		var courseId = this.props.match.params.courseId;
		const url = `${window.apiHost}/teachers/grades/${courseId}/get`;
		axios.get(url)
			.then((response)=>{
				var gradeDataFull = response.data;
				if(this.props.editing){
					var gradeData = gradeDataFull.map((grade, index)=>{
						console.log(grade);
						return(
							<tr key={index}>
								<td>{`${grade.firstName} ${grade.lastName}`}</td>
								<td>{grade.assName}</td>
								<td>{grade.status}</td>
								<td>
									<Input id='newStatus' />
									<Button onClick={(event)=>{
										this.changeStatus(event,grade.aid,grade.sid, index)
									}}>
										Change Status
									</Button>
								</td>
								<td>{grade.grade}</td>
								<td><Input id='newGrade' aid={grade.aid} studentId={grade.studentId} /><Button onClick={this.changeGrade}>Change Grade</Button></td>
							</tr>
						);
					});
				}else{
					var gradeData = gradeDataFull.map((grade, index)=>{
						console.log(grade);
						return(
							<tr key={index}>
								<td>{`${grade.firstName} ${grade.lastName}`}</td>
								<td>{grade.assName}</td>
								<td>{grade.status}</td>
								<td>{grade.grade}</td>
							</tr>
						);
					});
				}
				this.setState({
					grades: gradeData
				});
			});	
	}

	componentDidMount(){
		var courseId = this.props.match.params.courseId;
		const url = `${window.apiHost}/teachers/grades/${courseId}/get`;
		axios.get(url)
			.then((response)=>{
				var gradeDataFull = response.data;
				if(this.props.editing){
					var gradeData = gradeDataFull.map((grade, index)=>{
						console.log(grade);
						return(
							<tr key={index}>
								<td>{`${grade.firstName} ${grade.lastName}`}</td>
								<td>{grade.assName}</td>
								<td>{grade.status}</td>
								<td>
									<Input id='newStatus' />
									<Button onClick={(event)=>{
										this.changeStatus(event, grade.aid,grade.sid, index)
									}}>
										Change Status
									</Button>
								</td>
								<td>{grade.grade}</td>
								<td><Input id='newGrade' /><Button onClick={this.changeGrade}>Change Grade</Button></td>
							</tr>
						);
					});
				}else{
					var gradeData = gradeDataFull.map((grade, index)=>{
						console.log(grade);
						return(
							<tr key={index}>
								<td>{`${grade.firstName} ${grade.lastName}`}</td>
								<td>{grade.assName}</td>
								<td>{grade.status}</td>
								<td>{grade.grade}</td>
							</tr>
						);
					});
				}
				this.setState({
					grades: gradeData
				});
			});
	}	

	render(){
		// console.log(this.state);
		// var addGrade = '';
		var changeStatusHeader;
		var changeGradeHeader;
		// console.log(this.props);
		// if(this.props.auth.statusId === 1){
		// 	addGrade = (
		// 		<Link to={`/teachers/${this.props.match.params.courseId}/addAssignments`}><Button>Add grade</Button></Link>
		// 	)
		// }
		if(this.props.editing){
			changeStatusHeader = <th>Change Status</th>;
			changeGradeHeader = <th>Change Grade</th>;
		}else{
			changeStatusHeader = '';
			changeGradeHeader = '';
		}
		return(
			<div>
				<Button onClick={this.editInformation}>Click to edit</Button>
				<Table>
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Assignment Name</th>
							<th>Assignment Status</th>
							{changeStatusHeader}
							<th>Grade</th>
							{changeGradeHeader}
						</tr>
					</thead>
					<tbody>
						{this.state.grades}
					</tbody>
				</Table>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		studentInfo: state.studentInfo,
		editing: state.editing
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addAssignmentsAction: AddAssignmentsAction,
		editAction: EditAction
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grades);

