import axios from 'axios';

export default function(teacherId){
	const url = `${window.apiHost}/course/${teacherId}/get`
	console.log("hey")
	axios.get(url)
		.then((response)=>{
			// console.log("hey")
			return{
				type: "GET_COURSES",
				payload: response.data
			}
		})	
}
