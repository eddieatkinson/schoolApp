import axios from 'axios';

export default function (messageTarget, status, userId) {
	const url = `${window.apiHost}/${status}/messageToList/${userId}/${messageTarget}/get`;
	// // console.log("hey");
	// // console.log(teacherId);
	// // console.log("//////////////////////")
	const axiosPromise = axios.get(url);
	console.log("GET MESSAGE TO LIST is running!")

	return {
		type: "GET_MESSAGE_TO_LIST",
		payload: axiosPromise
	}
}
