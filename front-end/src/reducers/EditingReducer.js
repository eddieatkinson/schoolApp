export default function(state = false, action){
	switch(action.type){
		case "EDIT_ACTION":
			return true;
		case "STOP_EDIT_ACTION":
			return false;
		default:
			return state;
	}
}