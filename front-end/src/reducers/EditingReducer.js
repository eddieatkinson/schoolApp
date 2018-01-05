export default function(state = false, action){
	switch(action.type){
		case "EDIT_ACTION":
			return true;
		default:
			return state;
	}
}