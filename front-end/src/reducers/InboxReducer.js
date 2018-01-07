export default function(state = [], action){
	switch(action.type){
		case "GET_INBOX":
			return action.payload.data;
		default:
			return state;
	}
}