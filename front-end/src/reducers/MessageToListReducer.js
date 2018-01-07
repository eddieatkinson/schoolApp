export default function(state = [], action){
	switch(action.type){
		case "GET_MESSAGE_TO_LIST":
			return action.payload.data;
		default:
			return state;
	}
}