import axios from 'axios';

export default function (studentId) {
	const url = `${window.apiHost}/teachers/studentInfo/${studentId}/get`;
	// console.log("hey");
	// console.log(teacherId);
	// console.log("//////////////////////")
	const axiosPromise = axios.get(url);
	return {
		type: "GET_STUDENT_INFO",
		payload: axiosPromise
	}
}
