export default (props)=> {
	var grade = props.grade;
	return(
	 	<tr key={index}>
			<td>{`${grade.firstName} ${grade.lastName}`}</td>
			<td>{grade.assName}</td>
			<td>{grade.status}</td>
			<td>
				<Input id='newStatus' />
				<Button onClick={(event)=>{
					this.changeStatus(event,grade.aid,grade.sid, index)
				}}>
					Change Status
				</Button>
			</td>
			<td>{grade.grade}</td>
			<td><Input id='newGrade' /><Button onClick={this.changeGrade}>Change Grade</Button></td>
		</tr>
	)
}