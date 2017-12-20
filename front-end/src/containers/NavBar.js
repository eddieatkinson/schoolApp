import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class NavBar extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<div>
				<Link to='/login'>Login</Link>
				<Link to='/register/parent'>Register Parent</Link>
				<Link to='/register/student'>Register Student</Link>
				<Link to='/register/teacher'>Register Teacher</Link>
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
		
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);