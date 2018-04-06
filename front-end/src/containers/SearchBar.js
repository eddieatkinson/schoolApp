
import React, { Component } from 'react';


class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}


	// onChange(event) {
	//    	this.setState({value: event.target.value});
	//  	}
	render() {
		console.log(this.state)
		return (
			<div>
				<form>
					<div class="searchBarInput">
						<input
							value={this.state.data}
							onChange={event => this.props.handleSearch(event.target.value)} />
						<label class="label-icon" for="search"><i class="material-icons">search</i></label>
					</div>
				</form>
			</div>
		)
	}

}

export default SearchBar;