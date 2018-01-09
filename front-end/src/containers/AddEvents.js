import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Input, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';



class AddEvents extends Component{
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {

		}
	}

	handleSubmit(event){
		console.log("You tried to add an event");
		event.preventDefault();
		var title = document.getElementById('title').value;
		var start = document.getElementById('startDate').value;
		var end = document.getElementById('endDate').value;
		var desc = document.getElementById('description').value;
		var teacherId = this.props.auth.teacherId;

	}

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){
		console.log(this.props.courses.list);
	}

	render(){
		return(
			<form>
				<Row className='addEvents'>
					<Input id='title' label='Title'/>
					<Input id='startDate' label="Start Date" type="date"/>
					<Input id='endDate' label="End Date" type="date"/>
					<textarea id='description'></textarea>
					<Button className='add2Calendar' onClick={this.handleSubmit}>Add</Button>	
				</Row>
			</form>
		)
	}
}


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth,
		inbox: state.inbox,
		courses: state.courses
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getInbox: GetInbox
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AddEvents);