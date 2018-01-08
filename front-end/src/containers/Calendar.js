import React, { Component } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';


// The react module wants something to normalize the time based on the 
// current geographic area and formatting. I.e., 24 hour, interational, daylight savings. etc.
// "Moment" is the choice here.
BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
);

// axios.get(events).then((data)=>{
// 	const calEvents = data.map((event)=>{
// 		event.start = new Date(event.start)
// 		return event 
// 	})
// })

const events = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2018, 1, 0),
    end: new Date(2018, 1, 1),
  },
  {
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
  },
  {
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    title: 'Birthday Party',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    title: 'Birthday Party 2',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    title: 'Birthday Party 3',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
]


class Calendar extends Component{
	constructor(){
		super();
	}

// 	componentWillReceiveProps(newProps){
// 		// console.log('=======NEW PROPS========');
// 		// console.log(newProps);
// 		// console.log('=======NEW PROPS========');
// 	}

	render(){
		// This var is for the possible "views" on the upper right part of the calendar.
		// For instance, "month, week, work week, day, agenda"
		var possibleViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])


		return(
			<div>
				<h1>Calendar</h1>
			  <div>
			    <BigCalendar
				    events={events}
				    views={possibleViews}
				    step={60}
				    defaultDate={new Date(2015, 3, 1)}
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