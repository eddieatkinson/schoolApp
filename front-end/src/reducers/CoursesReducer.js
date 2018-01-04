export default function(state =[], action){
	switch(action.type){
		case "GET_COURSES":
			return action.payload.data;
		default:
			return state;	
	}
}