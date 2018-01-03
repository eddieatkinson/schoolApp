import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
// import Dropdown from './containers/Dropdown';
import Login from './containers/Login';
import Register from './containers/Register';
import Students from './containers/Students';
import Parents from './containers/Parents';
import Teachers from './containers/Teachers';

class App extends Component {
	render() {
	    return (
	      	<Router>
		      	<div>
				    <Route exact path='/' component={Login} />
				    <Route path='/login/:status' component={Login} />
				    <Route path='/register/:status' component={Register} />
				    <Route path='/students' component={Students} />
				    <Route path='/parents' component={Parents} />
				    <Route path='/teachers' component={Teachers} />
		        </div>
	      	</Router>
	    );
	}
}

export default App;
