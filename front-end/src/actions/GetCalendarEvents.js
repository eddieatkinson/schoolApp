import axios from 'axios';

export default function (level, userId) {
	console.log("GET_CALENDAR_EVENTS is running!");
	var url = `${window.apiHost}/${level}s/${userId}/calendar/get`;
	// console.log(url)
	var axiosPromise = axios.get(url)
	// .then((results)=>{
	// // console.log(results.data)
	// const calEvents = results.data.map((event)=>{
	// 	event.start = new Date(event.start)
	// 	event.end = new Date(event.end)
	// 	return event 
	// 	});
	// // console.log(calEvents)
	// // this.setState({
	// // 	calEventsList: calEvents
	// // })
	// });	

	return {
		type: "GET_CALENDAR_EVENTS",
		payload: axiosPromise
	}
}
