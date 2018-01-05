export default function(state =[], action){
	switch(action.type){
		case "GET_STUDENT_INFO":
			return action.payload.data;
		default:
			return state;	
	}
}