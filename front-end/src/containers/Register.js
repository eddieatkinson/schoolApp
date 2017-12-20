import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterAction from '../actions/RegisterAction';


class Login extends Component{
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();

	}

	render(){
		return(
			<div className="container">
				<h2></h2>
				<form>
					<Row>
						<Input s={3} label="username" />
						<Input s={3} label="password" />
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
		
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: LoginAction
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);