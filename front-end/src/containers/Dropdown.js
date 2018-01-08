// import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { circleDown } from 'react-icons-kit/icomoon/circleDown'; 



import React from 'react';
import { Button, Dropdown, NavItem } from 'react-materialize';



export default function(){
	return(
		<div className='dropDown'>
			<Dropdown trigger={
			    <Button className="dropButton">Select<Icon id='circleDown' icon={circleDown} /></Button>
			  }>
			  <Link to='/login/parent'><NavItem>Parent</NavItem></Link>
			  <Link to='/login/teacher'><NavItem>Teacher</NavItem></Link>
			  <NavItem divider />
			  <Link to='/login/student'><NavItem>Student</NavItem></Link>
			</Dropdown>
		</div>		

	)
}


