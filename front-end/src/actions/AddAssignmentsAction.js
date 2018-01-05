import axios from 'axios';

export default function(formData){
	// const url = `${window.apiHost}/teachers/courses/${teacherId}/get`;
	console.log(formData);
	var axiosPromise;
	// console.log(formData);
	axiosPromise = axios({
		url: `${window.apiHost}/teachers/addAssignments`,
		method: "POST",
		data: formData
	});

	return{
		type: "ADD_ASSIGNMENTS_ACTION",
		payload: axiosPromise
	}
}
