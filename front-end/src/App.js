import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
import NavBar from './containers/NavBar';
import Login from './containers/Login';
import Register from './containers/Register';

class App extends Component {
	render() {
	    return (
	      	<Router>
		      	<div>
				    <NavBar />
				    <Route exact path='/login' component={Login} />
				    <Route path='/register/:status' component={Register} />
		        </div>
	      	</Router>
	    );
	}
}

export default App;
