// An action is a JS function that returns an object.
// That object MUST have at least a property of type.
import axios from 'axios';

export default function (status, formData) {
	// console.log('==================');
	// console.log(status);
	// console.log('==================');
	// console.log(formData);
	console.log("Register action is running......so FAST!");
	var axiosPromise;
	// console.log(formData);
	if (status === "teacher") { // REMOVE THIS!!! IT IS FOR DEV PURPOSES ONLY!
		console.log('teacher');
		axiosPromise = axios({
			url: `${window.apiHost}/teacherRegister`,
			method: "POST",
			data: formData
		});
	} else if (status === "parent") {
		console.log('parent');
		axiosPromise = axios({
			url: `${window.apiHost}/parentRegister`,
			method: "POST",
			data: formData
		});
	} else if (status === "student") {
		console.log('student');
		axiosPromise = axios({
			url: `${window.apiHost}/studentRegister`,
			method: "POST",
			data: formData
		});
	}
	// console.log(axiosPromise);
	// Our redux-promise middleware will kick in because the payload value
	// is a promise.
	// Redux-promise will hold up the dispatch until it resolves.
	return {
		type: "REGISTER_ACTION",
		payload: axiosPromise
	}
}