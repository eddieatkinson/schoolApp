import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetInbox from '../actions/GetInbox';



class AddEvents extends Component{
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		console.log("You tried to add an event");
		event.preventDefault();
	}

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	componentDidMount(){

	}

	render(){
		return(
			<form>
				<Row className='addEvents'>
					<Input id='title' label='Title'/>
					<Input id='startDate' label="Start Date" type="date"/>
					<Input id='endDate' label="End Date" type="date"/>
					<textarea id='description'></textarea>
					<Button onClick={this.handleSubmit}>Submit</Button>	
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
		inbox: state.inbox
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getInbox: GetInbox
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AddEvents);