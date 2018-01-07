import axios from 'axios';

export default function(status, userId){
	const url = `${window.apiHost}/${status}/inbox/${userId}/get`;
	// // console.log("hey");
	// // console.log(teacherId);
	// // console.log("//////////////////////")
	const axiosPromise = axios.get(url);
	console.log("GET INBOX is running!")

	return{
		type: "GET_INBOX",
		payload: axiosPromise
	}
}
