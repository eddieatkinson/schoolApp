import axios from 'axios';

export default function(status, formData){
	console.log("Login action is running......so FAST!");
	var axiosPromise;
	// console.log(formData);
	if(status === "teacher"){ // REMOVE THIS!!! IT IS FOR DEV PURPOSES ONLY!
		console.log('teacher');
		axiosPromise = axios({
			url: `${window.apiHost}/teacherLogin`,
			method: "POST",
			data: formData
		});
	}else if(status === "parent"){
		console.log('parent');
		axiosPromise = axios({
		url: `${window.apiHost}/parentLogin`,
		method: "POST",
		data: formData
		});
	}else if(status === "student"){
		console.log('student');
		axiosPromise = axios({
		url: `${window.apiHost}/studentLogin`,
		method: "POST",
		data: formData
		});
	}
	return{
		type: "LOGIN_ACTION",
		payload: axiosPromise
	}
}