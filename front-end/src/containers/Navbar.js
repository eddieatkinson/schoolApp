import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Input, Button, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogoutAction from '../actions/LogoutAction';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
 
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
 
//specify the base color/background of the parent container if needed 
const MySideNav = () => (
    <div style={{background: '#2c3e50', color: '#FFF', width: 220}}> 
        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>       
            <Nav id='dashboard'>
                <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                <NavText> <Link to='/'>Dashboard</Link> </NavText>
            </Nav>
            <Nav id='sales'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Sales </NavText>
            </Nav>
        </SideNav>
    </div>
)

class Navbar extends Component{
// 	// constructor(){
// 	// 	super();
// 	// }

// 	componentWillReceiveProps(newProps){
// 		// console.log('=======NEW PROPS========');
// 		// console.log(newProps);
// 		// console.log('=======NEW PROPS========');
// 	}

	render(){
		// console.log("You've made it this far!");
		return(
			<MySideNav />
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
		logoutAction: LogoutAction
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);