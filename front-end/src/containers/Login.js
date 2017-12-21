import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';


class Login extends Component{
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		var formData = {
			username,
			password
		}
		var status = this.props.match.params.status;
		console.log(this);
		this.props.loginAction(status, formData);
	}

	componentWillReceiveProps(newProps){
		console.log('=======NEW LOGIN PROPS========');
		console.log(newProps);
		console.log('=======NEW LOGIN PROPS========');
	}

	render(){
		return(
			<div className="container">
				<form>
					<Row>
						<Input id="username" s={3} label="username" />
						<Input id="password" s={3} label="password" type="password"/>
					</Row>
					<Button onClick={this.handleSubmit} waves="light">Submit</Button>
				</form>
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
		loginAction: LoginAction
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);