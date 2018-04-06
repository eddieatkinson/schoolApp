import axios from 'axios';

export default function (level, userId) {
	const url = `${window.apiHost}/${level}s/courses/${userId}/get`;
	console.log("GET_COURSES is running!");
	// console.log(teacherId);
	// console.log("//////////////////////")
	const axiosPromise = axios.get(url);
	return {
		type: "GET_COURSES",
		payload: axiosPromise
	}
}
