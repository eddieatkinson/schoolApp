import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Form, Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterAction from '../actions/RegisterAction';


class Register extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		var firstName = document.getElementById('first-name').value;
		var lastName = document.getElementById('last-name').value;
		var email = document.getElementById('email').value;
		var phone = document.getElementById('phone').value;
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		var formData = {
			firstName,
			lastName,
			email,
			phone,
			username,
			password
		}
		// console.log(this);
		// console.log(formData);
		this.props.registerAction(this.props.match.params.status, formData);
	}

	componentWillReceiveProps(newProps) {
		console.log('=======NEW PROPS========');
		console.log(newProps);
		console.log('=======NEW PROPS========');
	}

	render() {
		console.log("You've made it this far!");
		return (
			<div className="container">
				<Form>
					<Row>
						<Input id='first-name' s={3} label="First Name" required />
						<Input id='last-name' s={3} label="Last Name" required />
					</Row>
					<Row>
						<Input id='email' s={3} label="Email" />
						<Input id='phone' s={3} label="Phone Number" />
					</Row>
					<Row>
						<Input id='username' type='email' s={3} label="Username" required />
						<Input id='password' type='password' s={3} label="Password" required />
					</Row>
					<Button onClick={this.handleSubmit} waves="light" type='submit'>Submit</Button>
				</Form>
			</div>
		)
	}
}


function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		registerAction: RegisterAction
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);