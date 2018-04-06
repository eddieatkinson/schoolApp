import axios from 'axios';

export default function (status, userId, sent) {
	var url;
	// console.log(sent);
	if (sent) {
		console.log("It's TRUE!")
		url = `${window.apiHost}/${status}/sentMessages/${userId}/get`;
	} else {
		console.log("EES no true.");
		url = `${window.apiHost}/${status}/inbox/${userId}/get`;
	}
	// // console.log("hey");
	// // console.log(teacherId);
	// // console.log("//////////////////////")
	const axiosPromise = axios.get(url);
	console.log("GET INBOX is running!")

	return {
		type: "GET_INBOX",
		payload: axiosPromise
	}
}
