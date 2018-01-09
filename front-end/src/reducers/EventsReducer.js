export default function(state =[], action){
	switch(action.type){
		case "ADD_EVENTS":
			return action.payload.data;
		default:
			return state;	
	}
}