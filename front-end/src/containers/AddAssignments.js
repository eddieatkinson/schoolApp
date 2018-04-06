import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import axios from 'axios';
import AddAssignmentsAction from '../actions/AddAssignmentsAction';

class AddAssignment extends Component {
	constructor() {
		super();
		// this.state = {
		// 	assignments: []
		// }
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		// var status = this.props.match.params.status;
		// console.log(status);
		var assignmentName = document.getElementById('assignName').value;
		var assignmentDesc = document.getElementById('assignDesc').value;
		var courseId = this.props.match.params.courseId;
		var formData = {
			courseId,
			assignmentName,
			assignmentDesc
		}
		// console.log(this);
		this.props.addAssignmentsAction(formData);
	}

	// const product = props.product;
	render() {
		console.log(this.props.match.params.courseId);
		// var addAssignments = ''
		// if(this.props.auth.statusId === 1){
		// 	addAssignments = (
		// 		<Button onClick={this.createAssignment}>Add assignment!</Button>
		// 	)
		// }
		return (
			<form>
				<Row>
					<Input id='assignName' s={3} label="Assignment Name" />
					<Input id='assignDesc' s={3} label="Description" />
				</Row>
				<Button className='addAssignmentsButton' onClick={this.handleSubmit} waves="light">Add Assignment</Button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		studentInfo: state.studentInfo
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addAssignmentsAction: AddAssignmentsAction
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignment);