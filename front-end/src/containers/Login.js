import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';
import Dropdown from './Dropdown';
import Icon from 'react-icons-kit';
import { unlocked } from 'react-icons-kit/icomoon/unlocked';       

   


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
		console.log(status);
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
		// console.log(this);
		this.props.loginAction(status, formData);
	}

	componentWillReceiveProps(newProps){
		// console.log(newProps);
		if(newProps.auth.msg === "loginStudentSuccess"){
			// this.setState({
			// 	error: "This password doesn not match"
			// });
			this.props.history.push('/students');
		}else if(newProps.auth.msg === "loginParentSuccess"){
			// this.setState({
			// 	error: "We do not have an account for this email"
			// })
			this.props.history.push('/parents');
		}else if(newProps.auth.msg === "loginTeacherSuccess"){
			// newProps.getCart(newProps.auth.token);
			// newProps.history.push('/');
			this.props.history.push('/teachers');
		}else if(newProps.auth.msg === "badPass"){
			this.setState({
				error: "Incorrect Password"
			})
		}else if(newProps.auth.msg === "badLoginId"){
			this.setState({
				error: "Invalid Login"
			});
		}
	}

	render(){
		var inputId = '';
		var inputType = '';
		var button = '';
		var password = '';
		// console.log(this.props.match.params.status);
		if(this.props.match.params.status !== undefined){	
			var status = this.props.match.params.status;
			password = 'password';  
			if(status === 'student'){
				inputId = 'Username';
				inputType = '';
			}else{
				inputId = 'Email';
				inputType = 'email'
			}
			button = <Button className='loginButton'onClick={this.handleSubmit} waves="light">Log in</Button>
		}
		return(
			<div id="container">
				<Dropdown />
				<h4>{this.state.error}</h4>
				<form>
					<Row className='loginForm'>
						<Input id={inputId} s={3} label={inputId} type={inputType} className="validate"/>
						<Input id={password} s={3} label="Password" type="password"/>
						<span>{button}</span>
							<img className='giraffe' src='/giraffe.png'/>	
							<img className='logo' src='/eduCrate_logo.png'/>	
					</Row>
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