import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class NavBar extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<div>
				<p>schoolApp</p>
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