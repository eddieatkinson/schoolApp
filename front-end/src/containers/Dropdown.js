// import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


// class Dropdown extends Component{
// 	// constructor(){
// 	// 	super();
// 	// }
import React from 'react';
import { Button, Dropdown, NavItem } from 'react-materialize';



export default function(){
	return(
		<div className='dropDown'>
			<Dropdown trigger={
			    <Button className="dropButton">Sign in as:</Button>
			  }>
			  <NavItem><Link to='/login/parent'>Parent</Link></NavItem>
			  <NavItem><Link to='/login/teacher'>Teacher</Link></NavItem>
			  <NavItem divider />
			  <NavItem><Link to='/login/student'>Student</Link></NavItem>
			</Dropdown>
		</div>		

	)
}


// 	render(){
// 		return(
// 			<div>
// 				<Link to='/login/parent'>Login Parent</Link>
// 				<Link to='/login/student'>Login Student</Link>
// 				<Link to='/login/teacher'>Login Teacher</Link>
// 			</div>
// 		)
// 	}
// }


// function mapStateToProps(state){
// // key = this.props.key
// // value = propety of RootReducer
// 	return{
		
// 	}
// }
// function mapDispatchToProps(dispatch){
// 	return bindActionCreators({
		
// 	},dispatch);
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Dropdown);