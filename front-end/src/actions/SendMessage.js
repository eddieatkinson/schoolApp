import axios from 'axios';

export default function (formData) {
	// const url = `${window.apiHost}/teachers/courses/${teacherId}/get`;
	console.log("SEND_MESSAGE is running!");
	var axiosPromise;
	// // console.log(formData);
	axiosPromise = axios({
		url: `${window.apiHost}/${formData.senderLevel}s/sendMessage`,
		method: "POST",
		data: formData
	});

	return {
		type: "SEND_MESSAGE",
		payload: axiosPromise
	}
}
