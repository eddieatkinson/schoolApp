export default function(state =[], action){
	switch(action.type){
		case "GET_CALENDAR_EVENTS":
			return action.payload.data;
		default:
			return state;
	}
}