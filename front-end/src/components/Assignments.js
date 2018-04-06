import React, { Component } from 'react';
import { Table } from 'react-materialize';
import axios from 'axios';

class Assignments extends Component {
	constructor() {
		super();
		this.state = {
			assignments: []
		}
	}
	componentDidMount() {
		var courseId = this.props.match.params.courseId;
		const url = `${window.apiHost}/teachers/assignments/${courseId}/get`;
		axios.get(url)
			.then((response) => {
				var majorAssStuff = response.data;
				var assStuff = majorAssStuff.map((ass, index) => {
					return (
						<tr>
							<td>{ass.assName}</td>
							<td>{ass.desc}</td>
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
		return (
			<Table>
				<thead>
					<tr>
						<th>Ass Name</th>
						<th>Ass Description</th>
					</tr>
				</thead>
				<tbody>
					{this.state.assignments}
				</tbody>
			</Table>
		);
	}
}

export default Assignments;