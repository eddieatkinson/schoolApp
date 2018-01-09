export default function(state =[], action){
	switch(action.type){
		case "GET_CALENDAR_EVENTS":
		case "ADD_EVENTS_ACTION":
			return action.payload.data;
		default:
			return state;
	}
}