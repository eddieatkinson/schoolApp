import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';
import Courses from './Courses';
import StudentInfo from './StudentInfo';
import Inbox from './Inbox';
import Calendar from './Calendar';
import Logout from './Logout';


class Teachers extends Component{
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
			<Router>
				<div>
					<Row>
						<Col s={2}>
							<Navbar />
						</Col>
						<Col offset='s3' s={9}>
							<Route exact path='/teachers' component={Courses}/>
							<Route path='/teachers/courses' component={Courses}/>
							<Route path='/teachers/studentInfo' component={StudentInfo}/>
							<Route path='/teachers/inbox' component={Inbox}/>
							<Route path='/teachers/calendar' component={Calendar}/>
							<Route path='/logout' component={Logout}/>
						</Col>
					</Row>
				</div>
			</Router>
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

export default connect(mapStateToProps,mapDispatchToProps)(Teachers);