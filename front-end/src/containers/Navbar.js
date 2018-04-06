import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogoutAction from '../actions/LogoutAction';
import GetMessageCount from '../actions/GetMessageCount';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { book } from 'react-icons-kit/icomoon/book';
import { drawer2 } from 'react-icons-kit/icomoon/drawer2';
import { pacman } from 'react-icons-kit/icomoon/pacman';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { exit } from 'react-icons-kit/icomoon/exit';

class Navbar extends Component {
	// constructor(){
	// 	// super();
	// 	// this.state = {
	// 	// 	newMessages: ''
	// 	// }
	// 	// this.countNewMessages = this.countNewMessages.bind(this);
	// }

	// countNewMessages(){
	// 	var level = this.props.auth.level;
	// 	var userId;
	// 	switch(level){
	// 		case "teacher":
	// 			userId = this.props.auth.teacherId;
	// 			break;
	// 		case "parent":
	// 			userId = this.props.auth.parentId;
	// 			break;
	// 		case "student":
	// 			userId = this.props.auth.studentId;
	// 			break;
	// 	}
	// 	const url = `${window.apiHost}/${level}s/countNewMessages/${userId}/get`; // uses "teachers" Express route but works for everyone
	// 	axios.get(url)
	// 		.then((response)=>{
	// 			this.setState({
	// 				newMessages: response.data[0]['COUNT(messageStatus)']
	// 			});
	// 			// console.log(response.data[0]['COUNT(messageStatus)']);
	// 		});
	// }

	componentDidMount() {
		var userId;
		var level = this.props.auth.level;
		switch (level) {
			case "teacher":
				userId = this.props.auth.teacherId;
				break;
			case "parent":
				userId = this.props.auth.parentId;
				break;
			case "student":
				userId = this.props.auth.studentId;
				break;
			default:
				break;
		}
		this.props.getMessageCount(level, userId);
		// console.log(this.state.newMessages)
		// if(this.state.newMessage === 0){
		// 	document.getElementById('numberNewMessages').innerHTML = '';
		// }else{
		// 	document.getElementById('numberNewMessages').innerHTML = `(${this.state.newMessages})`;
		// }
	}

	render() {
		var studentsLink;
		if (this.props.auth.level === "teacher") {
			studentsLink = <Link to={`/courseInfo/${this.props.auth.teacherId}/students`}>
				<Nav id='students'>
					<NavIcon><SvgIcon size={20} icon={pacman} /></NavIcon>
					<NavText> Students </NavText>
				</Nav>
			</Link>
		} else {
			studentsLink = '';
		}

		var numMessages = '';
		if (this.props.messageCount === 0) {
			numMessages = ''
		} else {
			numMessages = `(${this.props.messageCount})`;
		}

		// var newMessages = 3;
		// specify the base color/background of the parent container if needed 
		const MySideNav = () => (
			<div id="nav" style={{ background: '#586e74', color: '#b4881d', width: 220, position: 'fixed', height: '100vh' }}>
				<SideNav highlightColor='#c94b23' highlightBgColor='#fdf6e4' defaultSelected='courses'>
					<Link to={`/${this.props.auth.level}s/courses`} id='courses'>
						<Nav>
							<NavIcon><SvgIcon size={20} icon={book} /></NavIcon>
							<NavText> Courses </NavText>
						</Nav>
					</Link>
					{studentsLink}
					<Link to={`/${this.props.auth.level}s/inbox`}>
						<Nav id='inbox'>
							<NavIcon><SvgIcon size={20} icon={drawer2} /></NavIcon>
							<NavText> Inbox &nbsp;<span id="numberNewMessages">{numMessages}</span> </NavText>
						</Nav>
					</Link>
					<Link to='/teachers/calendar'>
						<Nav id='calendar'>
							<NavIcon><SvgIcon size={20} icon={calendar} /></NavIcon>
							<NavText> Calendar </NavText>
						</Nav>
					</Link>
					<a href='/'>
						<Nav id='logout'>
							<NavIcon><SvgIcon size={20} icon={exit} /></NavIcon>
							<NavText> Log Out </NavText>
						</Nav>
					</a>
				</SideNav>
			</div>
		);
		// console.log("You've made it this far!");
		return (
			<MySideNav />
		);
	}
}


function mapStateToProps(state) {
	// key = this.props.key
	// value = propety of RootReducer
	return {
		auth: state.auth,
		messageCount: state.messageCount
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		logoutAction: LogoutAction,
		getMessageCount: GetMessageCount
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);