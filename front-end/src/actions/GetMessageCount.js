import axios from 'axios';

export default function (level, userId) {
	const url = `${window.apiHost}/${level}s/countNewMessages/${userId}/get`; // uses "teachers" Express route but works for everyone
	const axiosPromise = axios.get(url)
	console.log("GET_MESSAGE_COUNT is running!");
	console.log(axiosPromise.data);
	return {
		type: "GET_MESSAGE_COUNT",
		payload: axiosPromise
	}
}
