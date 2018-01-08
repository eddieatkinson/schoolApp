import React, { Component } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
);

// const MyCalendar = props => (
//   <div>
//     <BigCalendar
//       events={}
//       startAccessor='startDate'
//       endAccessor='endDate'
//     />
//   </div>
// );



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
		console.log("You've made it this far!");
		return(
			<div>
				<h1>Calendar</h1>
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