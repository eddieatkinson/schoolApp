import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Table } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Col, Card} from 'react-materialize';
// import DataTables from 'material-ui-datatables';

class ParentCourseView extends Component{
	// constructor(){
	// 	super();
	// }

	componentWillReceiveProps(newProps){
		// console.log('=======NEW PROPS========');
		// console.log(newProps);
		// console.log('=======NEW PROPS========');
	}

	render(){

		var dataTable = '';
		// console.log(this.props.courses);
		if(this.props.courses.list !== undefined){
			dataTable = this.props.courses.list.map((course, index)=>{
				return (
						<div key={index}>
							<Col m={3} s={6}>
								<Card className='blue-grey darken-1' textClassName='white-text' title={<Link to={`/courseInfo/${course.id}`} >{course.courseName}</Link>} actions={[<Link to='/'>Student name(link)</Link>]}>
									{course.assDesc}
								</Card>
							</Col>
						</div>
					)
			});
		}

		console.log("You've made it this far!");
		console.log(this.props.courses)
		return (
			<div>
				{dataTable}
			</div>
		);
	}
}

			


function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth,
		courses: state.courses
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
	}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ParentCourseView);