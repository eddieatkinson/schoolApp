import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import GetCalendarEvents from '../actions/GetCalendarEvents';
import _ from 'lodash';


BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
);



class Calendar extends Component {
	constructor() {
		super();
		// this.state = {
		// 	calEventsList: []
		// }
	}


	componentDidMount() {
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
		console.log("Calendar mounted");
		this.props.getCalendarEvents(level, userId);
		// var url = `${window.apiHost}/${level}s/${userId}/calendar/get`;
		// console.log(url)
		// axios.get(url)
		// .then((results)=>{
		// // console.log(results.data)
		// const calEvents = results.data.map((event)=>{
		// 	event.start = new Date(event.start)
		// 	event.end = new Date(event.end)
		// 	return event 
		// 	});
		// // console.log(calEvents)
		// // this.setState({
		// // 	calEventsList: calEvents
		// // })
		// });	
	}

	componentWillReceiveProps(newProps) {
		const same = (newProps.calEventsList.length === this.props.calEventsList.length);
		console.log(newProps.calEventsList);
		console.log(this.props.calEventsList);
		if (!same) {
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
			this.props.getCalendarEvents(level, userId);
		}
	}



	render() {
		// This var is for the possible "views" on the upper right part of the calendar.
		// For instance, "month, week, work week, day, agenda"
		var possibleViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

		var addEventsButton;
		if (this.props.auth.level === "teacher") {
			addEventsButton = <Link to='/addEvents'><Button className='newEvent'>New Event</Button></Link>
		} else {
			addEventsButton = '';
		}

		// console.log(this.props.calEventsList);

		const calEvents = this.props.calEventsList.map((event) => {
			event.start = new Date(event.start)
			event.end = new Date(event.end)
			return event
		});

		return (
			<div>
				<Row>
					<Col s={4}>
						<img className='logoBlocks' src='/eduCrateblocks.png' alt='' />
					</Col>
				</Row>
				<div className='container'>
					{addEventsButton}
					<BigCalendar
						events={this.props.calEventsList}
						views={possibleViews}
						step={60}
						defaultDate={new Date()}
					/>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		auth: state.auth,
		calEventsList: state.calEventsList
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCalendarEvents: GetCalendarEvents
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);