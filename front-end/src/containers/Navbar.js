import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogoutAction from '../actions/LogoutAction';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
 
import { book } from 'react-icons-kit/icomoon/book';
import { drawer2 } from 'react-icons-kit/icomoon/drawer2';
import { pacman } from 'react-icons-kit/icomoon/pacman';   
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { exit } from 'react-icons-kit/icomoon/exit'; 

class Navbar extends Component{

	render(){
		var studentsLink;
		if(this.props.auth.level === "teacher"){
			studentsLink = <Link to={`/courseInfo/${this.props.auth.teacherId}/students`}>
								<Nav id='students'>
									<NavIcon><SvgIcon size={20} icon={pacman}/></NavIcon>
									<NavText> Students </NavText>
								</Nav>
							</Link> 
		}else{
			studentsLink = '';
		}
	// specify the base color/background of the parent container if needed 
		const MySideNav = () => (
			<div id="nav" style={{background: '#586e74', color: '#b4881d', width: 220, position: 'fixed', height: '100vh'}}> 
				<SideNav highlightColor='#c94b23' highlightBgColor='#fdf6e4' defaultSelected='courses'>       
					<Link to={`/${this.props.auth.level}s/courses`} id='courses'>
						<Nav>
							<NavIcon><SvgIcon size={20} icon={book}/></NavIcon>    
							<NavText> Courses </NavText>
						</Nav>
					</Link>
					{studentsLink} 
					<Link to={`/${this.props.auth.level}s/inbox`}>
						<Nav id='inbox'>
							<NavIcon><SvgIcon size={20} icon={drawer2}/></NavIcon>
							<NavText> Inbox </NavText>
						</Nav>
					</Link>
					<Link to='/teachers/calendar'>
						<Nav id='calendar'>
							<NavIcon><SvgIcon size={20} icon={calendar}/></NavIcon>
							<NavText> Calendar </NavText>
						</Nav>
					</Link>
					<a href='/'>
						<Nav id='logout'>
							<NavIcon><SvgIcon size={20} icon={exit}/></NavIcon>
							<NavText> Logout </NavText>
						</Nav>
					</a>
				</SideNav>
			</div>
		);
		// console.log("You've made it this far!");
		return(
			<MySideNav />
		);
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
		logoutAction: LogoutAction
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);