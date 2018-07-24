import axios from 'axios';

export default function (eventData, level, userId) {
	console.log("ADD_EVENTS_ACTION is running!")
	// const url = `${window.apiHost}/teachers/courses/${teacherId}/get`;
	// console.log(formData);
	var finalPromise = new Promise((resolve, reject) => {
		var insertPromise = axios({
			url: `${window.apiHost}/teachers/addEvents`,
			method: "POST",
			data: eventData
		}).then((response) => {
			var url = `${window.apiHost}/${level}s/${userId}/calendar/get`;
			var getPromise = axios.get(url).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			})
		})
	});

	return {
		type: "ADD_EVENTS_ACTION",
		payload: finalPromise
	}
}
