import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class Calendar extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

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