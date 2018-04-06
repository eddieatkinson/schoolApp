import React from 'react';
import { Button, Dropdown, NavItem } from 'react-materialize';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { circleDown } from 'react-icons-kit/icomoon/circleDown';



export default function () {
	return (
		<div className='dropDown'>
			<Dropdown trigger={
				<Button className="dropButton">Select<Icon id='circleDown' icon={circleDown} /></Button>
			}>
				<Link to='/login/parent' data-cy="parent"><NavItem>Parent</NavItem></Link>
				<Link to='/login/teacher' data-cy="teacher"><NavItem>Teacher</NavItem></Link>
				<NavItem divider />
				<Link to='/login/student'data-cy="student"><NavItem>Student</NavItem></Link>
			</Dropdown>
		</div>

	)
}


