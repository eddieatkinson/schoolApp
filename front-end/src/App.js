import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
import NavBar from './containers/NavBar';
import Login from './containers/Login';

class App extends Component {
	render() {
	    return (
	      	<Router>
		      	<div>
				    <NavBar />
				    <Route exact path='/login' component={Login} />
		        </div>
	      	</Router>
	    );
	}
}

export default App;
