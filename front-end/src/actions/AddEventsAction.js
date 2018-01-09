import axios from 'axios';

export default function(eventData){
	console.log("ADD_EVENTS_ACTION is running!")
	// const url = `${window.apiHost}/teachers/courses/${teacherId}/get`;
	// console.log(formData);
	var axiosPromise;
	// console.log(formData);
	axiosPromise = axios({
		url: `${window.apiHost}/teachers/addEvents`,
		method: "POST",
		data: eventData
	});

	return{
		type: "ADD_EVENTS_ACTION",
		payload: axiosPromise
	}
}
