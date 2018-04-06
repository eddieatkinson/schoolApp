import React, { Component } from 'react';
import { Table, Button, Input } from 'react-materialize';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import AddAssignmentsAction from '../actions/AddAssignmentsAction';
import EditAction from '../actions/EditAction';
import StopEditAction from '../actions/StopEditAction';
import SearchBar from './SearchBar';
import _ from 'lodash';


class Grades extends Component {
	constructor() {
		super();
		this.state = {
			grades: []
		}
		this.changeStatus = this.changeStatus.bind(this);
		this.changeGrade = this.changeGrade.bind(this);
		this.editInformation = this.editInformation.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	changeStatus(event, aid, sid, index) {
		console.log("Change status");
		var newStatus = event.target.previousSibling.childNodes[0].value
		console.log(newStatus);
		console.log("The assignment ID, Eddie!", aid);
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
		}).then((response) => {
			console.log(response.data);
			if (response.data.msg === 'statusUpdated') {
				// make a copy of the grades state var so we can change the student
				// var newGrades = {...this.state.grades};
				var courseId = this.props.match.params.courseId;
				var teacherId = this.props.auth.teacherId;
				const url = `${window.apiHost}/teachers/grades/${courseId}/${teacherId}/get`;
				axios.get(url)
					.then((response) => {
						var gradeDataFull = response.data;
						console.log(gradeDataFull);
						var gradeData = gradeDataFull.map((grade, index) => {
							return (
								<tr key={index}>
									<td>{`${grade.firstName} ${grade.lastName}`}</td>
									<td>{grade.assName}</td>
									<td>{grade.status}</td>
									<td>
										<Input id='newStatus' />
										<Button className='edit' onClick={(event) => {
											this.changeStatus(event, grade.aid, grade.sid, index)
										}}>
											Change
										</Button>
									</td>
									<td>{grade.grade}</td>
									<td><Input id='newGrade' /><Button className='edit' onClick={(event) => {
										this.changeGrade(event, grade.aid, grade.sid, index)
									}}>
										Change
										</Button></td>
								</tr>
							);
						});
						this.setState({
							grades: gradeData
						});
					})
			}
		})
		// this.props.stopEditAction();
	}

	changeGrade(event, aid, sid, index) {
		console.log("Change grade");
		// var newGrade = document.getElementById('newGrade').value;
		var newGrade = event.target.previousSibling.childNodes[0].value;
		// var aid = document.getElementById('newGrade').getAttribute('aid');
		// var studentId = document.getElementById('newGrade').getAttribute('studentId');
		console.log(newGrade);
		var newData = {
			newGrade: newGrade,
			aid: aid,
			sid: sid
		}
		console.log(newData);
		var axiosPromise = axios({
			url: `${window.apiHost}/teachers/changeGrade`,
			method: 'POST',
			data: newData
		}).then((response) => {
			console.log(response.data);
			if (response.data.msg === 'gradeUpdated') {
				// make a copy of the grades state var so we can change the student
				// var newGrades = {...this.state.grades};
				var courseId = this.props.match.params.courseId;
				var teacherId = this.props.auth.teacherId;
				const url = `${window.apiHost}/teachers/grades/${courseId}/${teacherId}/get`;
				axios.get(url)
					.then((response) => {
						var gradeDataFull = response.data;
						console.log(gradeDataFull);
						var gradeData = gradeDataFull.map((grade, index) => {
							return (
								<tr key={index}>
									<td>{`${grade.firstName} ${grade.lastName}`}</td>
									<td>{grade.assName}</td>
									<td>{grade.status}</td>
									<td>
										<Input id='newStatus' />
										<Button className='edit' onClick={(event) => {
											this.changeStatus(event, grade.aid, grade.sid, index)
										}}>
											Change
										</Button>
									</td>
									<td>{grade.grade}</td>
									<td><Input id='newGrade' /><Button className='edit' onClick={(event) => {
										this.changeGrade(event, grade.aid, grade.sid, index)
									}}>
										Change
										</Button></td>
								</tr>
							);
						});
						this.setState({
							grades: gradeData
						});
					})
			}
		})
		// this.props.stopEditAction();
	}

	editInformation() {
		this.props.editAction();
	}

	componentWillReceiveProps(newProps) {
		console.log(newProps);
		var courseId = this.props.match.params.courseId;
		var userId;
		switch (this.props.auth.level) {
			case "teacher":
				userId = this.props.auth.teacherId;
				break;
			case "parent":
				userId = this.props.auth.parentId;
				break;
			case "student":
				userId = this.props.auth.studentId;
				break;
			default:
				break;
		}
		const url = `${window.apiHost}/${this.props.auth.level}s/grades/${courseId}/${userId}/get`;
		axios.get(url)
			.then((response) => {
				var gradeDataFull = response.data;
				if (this.props.editing) {
					var gradeData = gradeDataFull.map((grade, index) => {
						console.log(grade);
						return (
							<tr key={index}>
								<td>{`${grade.firstName} ${grade.lastName}`}</td>
								<td>{grade.assName}</td>
								<td>{grade.status}</td>
								<td>
									<Input id='newStatus' />
									<Button className='edit' onClick={(event) => {
										this.changeStatus(event, grade.aid, grade.sid, index)
									}}>
										Change
									</Button>
								</td>
								<td>{grade.grade}</td>
								<td><Input id='newGrade' /><Button className='edit' onClick={(event) => {
									this.changeGrade(event, grade.aid, grade.sid, index)
								}}>
									Change
										</Button></td>
							</tr>
						);
					});
				} else {
					gradeData = gradeDataFull.map((grade, index) => {
						console.log(grade);
						return (
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

	componentDidMount() {
		var courseId = this.props.match.params.courseId;
		var userId;
		switch (this.props.auth.level) {
			case "teacher":
				userId = this.props.auth.teacherId;
				break;
			case "parent":
				userId = this.props.auth.parentId;
				break;
			case "student":
				userId = this.props.auth.studentId;
				break;
			default:
				break;
		}
		const url = `${window.apiHost}/${this.props.auth.level}s/grades/${courseId}/${userId}/get`;
		axios.get(url)
			.then((response) => {
				var gradeDataFull = response.data;
				if (this.props.editing) {
					var gradeData = gradeDataFull.map((grade, index) => {
						console.log(grade);
						return (
							<tr key={index}>
								<td>{`${grade.firstName} ${grade.lastName}`}</td>
								<td>{grade.assName}</td>
								<td>{grade.status}</td>
								<td>
									<Input id='newStatus' />
									<Button onClick={(event) => {
										this.changeStatus(event, grade.aid, grade.sid, index)
									}}>
										Change Status
									</Button>
								</td>
								<td>{grade.grade}</td>
								<td><Input id='newGrade' /><Button onClick={(event) => {
									this.changeGrade(event, grade.aid, grade.sid, index)
								}}>
									Change Grade
										</Button></td>
							</tr>
						);
					});
				} else {
					gradeData = gradeDataFull.map((grade, index) => {
						console.log(grade);
						return (
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

	handleSearch(searchValue) {
		console.log(searchValue);
		var courseId = this.props.match.params.courseId;
		var userId;
		switch (this.props.auth.level) {
			case "teacher":
				userId = this.props.auth.teacherId;
				break;
			case "parent":
				userId = this.props.auth.parentId;
				break;
			case "student":
				userId = this.props.auth.studentId;
				break;
			default:
				break;
		}
		const url = `${window.apiHost}/${this.props.auth.level}s/grades/${courseId}/${userId}/get`;
		axios.get(url)
			.then((response) => {
				var gradeDataFull = response.data;
				console.log(gradeDataFull)
				var filteredGrades = gradeDataFull.filter((grade) => {
					for (var key in grade) {
						console.log(key, grade)
						if (typeof (grade[key]) === `string`) {
							if (grade[key].indexOf(searchValue) > -1) {
								return true;
							}
						}
					}
				})
				var gradeData = filteredGrades.map((grade, index) => {
					console.log(grade);
					return (
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

	render() {
		// console.log(this.state);
		// var addGrade = '';

		var changeStatusHeader;
		var changeGradeHeader;
		var editButton;
		if (this.props.auth.level === "teacher") {
			if (!this.props.editing) {
				editButton = <Button className='editChanges' onClick={this.editInformation}>Edit</Button>
			} else {
				editButton = <Button className='changes' onClick={this.props.stopEditAction}>Accept Changes</Button>
			}
		} else {
			editButton = '';
		}
		// console.log(this.props);
		// if(this.props.auth.statusId === 1){
		// 	addGrade = (
		// 		<Link to={`/teachers/${this.props.match.params.courseId}/addAssignments`}><Button>Add grade</Button></Link>
		// 	)
		// }
		if (this.props.editing) {
			changeStatusHeader = <th>Change Status</th>;
			changeGradeHeader = <th>Change Grade</th>;
		} else {
			changeStatusHeader = '';
			changeGradeHeader = '';
		}
		return (
			<div>
				<SearchBar handleSearch={this.handleSearch} />
				{editButton}
				<Table bordered={true} hoverable={true} responsive={true} >
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

function mapStateToProps(state) {
	return {
		auth: state.auth,
		studentInfo: state.studentInfo,
		editing: state.editing
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addAssignmentsAction: AddAssignmentsAction,
		editAction: EditAction,
		stopEditAction: StopEditAction
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grades);

