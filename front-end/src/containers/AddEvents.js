import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Input, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';
import AddEventsAction from '../actions/AddEventsAction';



class AddEvents extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.getRadioValues = this.getRadioValues.bind(this);
		// this.state = {
		// 	radioValues = ''
		// }
	}

	getRadioValues(form, name) {
		console.log(form);
		console.log(name);
		var radios = form.elements[name];
		console.log(radios);
		var val;
		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				val = radios[i].value;
				break;
			}
		}
		return val;
	}

	handleSubmit(event) {
		var userId;
		var level = this.props.auth.level;
		switch (level) {
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
		console.log("You tried to add an event");
		event.preventDefault();
		var courseId = this.getRadioValues(document.getElementById('addEventsForm'), "course");
		var title = document.getElementById('title').value;
		var startStamp = Date.parse(document.getElementById('startDate').value);
		var start = new Date(startStamp);
		var endStamp = Date.parse(document.getElementById('endDate').value);
		var end = new Date(endStamp);
		var desc = document.getElementById('description').value;
		var teacherId = this.props.auth.teacherId;
		var eventData = {
			courseId,
			title,
			start,
			end,
			desc,
			teacherId
		}
		console.log(eventData);

		this.props.addEventsAction(eventData, level, userId);
	}

	componentWillReceiveProps(newProps) {
		console.log(newProps.calEventsList)
		console.log(this.props.calEventsList)
		if (newProps.calEventsList.length !== this.props.calEventsList.length) {
			this.props.history.push('/teachers/calendar');
		}
	}

	componentDidMount() {
		console.log(this.props.courses.list);
	}

	render() {
		console.log(this.props.calEventsList)
		var classList = this.props.courses.list.map((course, index) => {
			return (
				<label><Input type="radio" name="course" value={course.id} />{course.courseName}</label>
			)
		});
		return (
			<div>
				<form id="addEventsForm">
					<Row className='addEvents'>
						<Input id='title' label='Title' />
						<Input id='startDate' label="Start Date" type="date" />
						<Input id='endDate' label="End Date" type="date" />
						<textarea id='description'></textarea>
						{classList}
						<Button className='add2Calendar' onClick={this.handleSubmit}>Add</Button>
					</Row>
				</form>
			</div>
		)
	}
}


function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth,
		inbox: state.inbox,
		courses: state.courses,
		calEventsList: state.calEventsList

	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getInbox: GetInbox,
		addEventsAction: AddEventsAction
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvents);