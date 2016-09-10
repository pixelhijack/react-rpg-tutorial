import React from 'react';
import Inputfield from './components/Inputfield.jsx';
import Textbox from './components/Textbox.jsx';

var App = React.createClass({
	getInitialState: function(){
		return {
			userTyped: 'Hello I am a dummy textbox.'
		};
	},
	onAppKeyUp: function(e){
		this.setState({ userTyped: e.target.value });
	},
	render: function(){
		console.log('State changed, rerendering! State: ', this.state);
		return(
			<div>
				<Textbox text={this.state.userTyped}></Textbox>
				<Inputfield onKeyUp={this.onAppKeyUp}/>
			</div>
		);
	}
});

module.exports = App;