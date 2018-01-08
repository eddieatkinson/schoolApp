import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
// import DatePickerExample from './DatePicker';


// The react module wants something to normalize the time based on the 
// current geographic area and formatting. I.e., 24 hour, interational, daylight savings. etc.
// "Moment" is the choice here.
BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
);



class Calendar extends Component{
	constructor(){
		super();
		this.state = {
			calEventsList: []
		}
	}

// 	componentWillReceiveProps(newProps){
// 		// console.log('=======NEW PROPS========');
// 		// console.log(newProps);
// 		// console.log('=======NEW PROPS========');
// 	}
	componentDidMount(){
		var userId;
		var level = this.props.auth.level;
		switch(level){
			case "teacher":
				userId = this.props.auth.teacherId;
				break;
			case "parent":
				userId = this.props.auth.parentId;
				break;
			case "student":
				userId = this.props.auth.studentId;
				break;
		}
		var url = `${window.apiHost}/${level}s/${userId}/calendar/get`;
		console.log(url)
		axios.get(url)
		.then((results)=>{
		// console.log(results.data)
		const calEvents = results.data.map((event)=>{
			event.start = new Date(event.start)
			event.end = new Date(event.end)
			return event 
			})
		console.log(calEvents)
		this.setState({
			calEventsList: calEvents
		})
		})	
	}


	render(){
		// This var is for the possible "views" on the upper right part of the calendar.
		// For instance, "month, week, work week, day, agenda"
		var possibleViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

		var addEventsButton;
		if(this.props.auth.level === "teacher"){
			addEventsButton = <Link to='/addEvents'><Button>Add Events</Button></Link>
		}else{
			addEventsButton = '';
		}

		return(
			<div>
				<h1>Calendar</h1>
				{addEventsButton}
			  <div className='container'>
			    <BigCalendar
				    events={this.state.calEventsList}
				    views={possibleViews}
				    step={60}
				    defaultDate={new Date()}
			    />
			  </div>
			 </div>
		)
	}
}


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);