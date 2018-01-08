import { combineReducers } from 'redux';

// import each individual reducer to hand to combineReducers
// first: AuthReducer
import AuthReducer from './AuthReducer';
import CoursesReducer from './CoursesReducer';
import AssignmentsReducer from './AssignmentsReducer';
import StudentInfoReducer from './StudentInfoReducer';
import EditingReducer from './EditingReducer';
import InboxReducer from './InboxReducer';
import MessageToListReducer from './MessageToListReducer';
import MessageCountReducer from './MessageCountReducer';

//combreducers takes an object as an argument, that arg has key:value pair ... will return a value
const rootReducer = combineReducers({	
	auth: AuthReducer,
	courses: CoursesReducer,
	assignments: AssignmentsReducer,
	studentInfo: StudentInfoReducer,
	editing: EditingReducer,
	inbox: InboxReducer,
	messageToList: MessageToListReducer,
	messageCount: MessageCountReducer
});


export default rootReducer;