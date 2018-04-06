import React, { Component } from 'react';
import { Table, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import AddAssignmentsAction from '../actions/AddAssignmentsAction';

class Assignments extends Component {
	constructor() {
		super();
		this.state = {
			assignments: []
		}
		this.createAssignment = this.createAssignment.bind(this);
	}

	createAssignment() {
		// this.props.history.push(`/teachers/${this.props.match.params.courseId}/addAssignments`);
		// this.props.history.push(`https://www.google.com`);
	}

	componentDidMount() {
		var courseId = this.props.match.params.courseId;
		const url = `${window.apiHost}/teachers/assignments/${courseId}/get`; // route is for everyone, though it specifies "teachers"
		axios.get(url)
			.then((response) => {
				var majorAssStuff = response.data;
				var assStuff = majorAssStuff.map((ass, index) => {
					return (
						<tr key={index}>
							<td>{ass.assName}</td>
							<td>{ass.assDesc}</td>
						</tr>
					);
				});
				this.setState({
					assignments: assStuff
				});
			});
	}
	// const product = props.product;
	render() {
		var addAnAssignment = ''
		console.log(this.props);
		if (this.props.auth.statusId === 1) {
			addAnAssignment = (
				<Link to={`/teachers/${this.props.match.params.courseId}/addAssignments`}><Button className='addAssignment'>New Assignment</Button></Link>
			)
		}
		return (
			<div>
				<Table bordered={true} hoverable={true} responsive={true}>
					<thead>
						<tr>
							<th>Assignment</th>
							<th>Assignment Description</th>
						</tr>
					</thead>
					<tbody>
						{this.state.assignments}
					</tbody>
				</Table>
				{addAnAssignment}
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);