import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';


class Login extends Component{
	constructor(){
		super();
		this.state = {
			error: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		var status = this.props.match.params.status;
		var loginId;
		if(status === 'student'){
			loginId = document.getElementById('Username').value;
		}else{
			loginId = document.getElementById('Email').value;
		}
		var password = document.getElementById('password').value;
		var formData = {
			loginId,
			password
		}
		console.log(this);
		this.props.loginAction(status, formData);
	}

	componentWillReceiveProps(newProps){
		if(newProps.auth.msg === "loginStudentSuccess"){
			// this.setState({
			// 	error: "This password doesn not match"
			// });
		}else if(newProps.auth.msg === "loginParentSuccess"){
			// this.setState({
			// 	error: "We do not have an account for this email"
			// })
		}else if(newProps.auth.msg === "loginTeacherSuccess"){
			// newProps.getCart(newProps.auth.token);
			// newProps.history.push('/');
		}else if(newProps.auth.msg === "badPass"){
			this.setState({
				error: "Incorrect Password"
			})
		}else if(newProps.auth.msg === "badLoginId"){
			this.setState({
				error: "Invalid Login"
			})
		}
	}

	render(){
		var status = this.props.match.params.status;
		var inputId;
		var inputType;
		if(status === 'student'){
			inputId = 'Username';
			inputType = '';
		}else{
			inputId = 'Email';
			inputType = 'email'
		}
		return(
			<div className="container">
				<h4>{this.state.error}</h4>
				<form>
					<Row>
						<Input id={inputId} s={3} label={inputId} type={inputType} className="validate"/>
						<Input id="password" s={3} label="Password" type="password"/>
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