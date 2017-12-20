export default function(state = [], action){
	switch(action.type){
		case "AUTH_ACTION":
			return action.payload.data;
		case "LOGOUT":
			return [];
		default:
			return state;
	}
}