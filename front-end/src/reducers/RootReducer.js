import { combineReducers } from 'redux';

// import each individual reducer to hand to combineReducers
// first: AuthReducer
import AuthReducer from './AuthReducer';
import CoursesReducer from './CoursesReducer';
import AssignmentsReducer from './AssignmentsReducer';
import StudentInfoReducer from './StudentInfoReducer';
import EditingReducer from './EditingReducer';

//combreducers takes an object as an argument, that arg has key:value pair ... will return a value
const rootReducer = combineReducers({	
	auth: AuthReducer,
	courses: CoursesReducer,
	assignments: AssignmentsReducer,
	studentInfo: StudentInfoReducer,
	editing: EditingReducer
});


export default rootReducer;