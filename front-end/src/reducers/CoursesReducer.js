export default function(state = {}, action){
	switch(action.type){
		case "GET_COURSES":
			var stateCopy = {...state};
			stateCopy.list = action.payload.data;
			return stateCopy;
		case "GET_COURSE_INFO":
			var stateCopy2 = {...state};
			stateCopy2.selectedCourse = action.payload.data;
			return stateCopy2;
		default:
			return state;	
	}
}