export default function(state = [], action){
	switch(action.type){
		case "GET_INBOX":
			return true;
		default:
			return state;
	}
}