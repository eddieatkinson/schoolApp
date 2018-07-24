import axios from 'axios';

export default function (courseId) {
	const url = `${window.apiHost}/teachers/courseInfo/${courseId}/get`;
	// console.log("hey");
	// console.log(teacherId);
	// console.log("//////////////////////")
	const axiosPromise = axios.get(url);
	return {
		type: "GET_COURSE_INFO",
		payload: axiosPromise
	}
}
