export default function(state = 0, action){
	switch(action.type){
		case "GET_MESSAGE_COUNT":
		console.log(action.payload.data[0]['COUNT(messageStatus)'])
			// console.log(action.payload.data[0]);
			return action.payload.data[0]['COUNT(messageStatus)'];
		default:
			return state;
	}
}